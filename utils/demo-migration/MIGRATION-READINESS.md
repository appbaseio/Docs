# Docs Migration Readiness Report

**New backend:** `https://reactivesearch-api-9-3-0.onrender.com` (`rs-demo` / `rs-password`)  
**Elasticsearch:** Aiven OpenSearch  
**Last updated:** 2026-07-07

## Executive summary

| Area | Status |
|------|--------|
| RS API health | ✅ OpenSearch 3.3.2 reachable |
| `good-books-ds` search | ✅ Verified via `_reactivesearch` |
| `recipes-demo` | ⏳ Importing (~17k / 222k on Aiven; see investigation below) |
| Indexes migrated | 5 of 8 complete; 2 importing |
| Docs hostname updates | ~130+ occurrences, ~120 files |
| Playground embeds | ~248 iframes, ~90–120 unique IDs |
| CodeSandbox embeds | ~200+ iframes in ~167 files (external repos) |

## Indexes on Aiven

| Index | Docs | Status |
|-------|------|--------|
| `good-books-ds` | 9,418 | ✅ |
| `clone-airbeds` | 427 | ✅ |
| `earthquakes` | 3,646 | ✅ |
| `docs-demo` | 1,883 | ✅ |
| `good-books` | 180 | ✅ |
| `recipes-demo` | ~17k → 222,286 (10% sample) | ⏳ Import-only running (PID ~99797); export complete (444,572 bulk lines) |
| `best-buy-dataset` | ~8.5k → 114,928 | ⏳ Import-only running (PID ~17522); export complete (229,856 bulk lines) |
| `good-books-authors` | — | ⏭️ Not on source cluster |

## Replace cheatsheet

```
OLD: https://appbase-demo-ansible-abxiydt-arc.searchbase.io
OLD: https://arc-cluster-appbase-demo-6pjy6z.searchbase.io
NEW: https://reactivesearch-api-9-3-0.onrender.com

OLD: /recipes-demo/_reactivesearch.v3
NEW: /good-books-ds/_reactivesearch   # interim until recipes-demo migrated
```

## P0 pages updated (2026-07-07)

Backend: `https://reactivesearch-api-9-3-0.onrender.com` / `rs-demo:rs-password`

- `content/docs/reactivesearch/react/overview/quickstart.md`
- `content/docs/reactivesearch/vue/overview/QuickStart.md`
- `content/docs/reactivesearch/searchbase/overview/QuickStart.md`
- `content/docs/reactivesearch/react-searchbox/quickstart.md`
- `src/pages/docs/reactivesearch/react/overview/Showcase.js`
- `src/pages/docs/reactivesearch/vue/overview/Showcase.js`
- `content/docs/reactivesearch/react/search/searchbox.md`
- `content/docs/reactivesearch/react/result/reactivelist.md`
- `content/docs/reactivesearch/react/list/singlelist.md`
- `content/api/javascript/quickstart.md`


| Path | Why |
|------|-----|
| `/docs/reactivesearch/react/overview/quickstart` | React onboarding |
| `/docs/reactivesearch/vue/overview/QuickStart` | Vue onboarding |
| `/docs/reactivesearch/searchbase/overview/QuickStart` | SearchBase entry |
| `/docs/reactivesearch/react-searchbox/quickstart` | SearchBox onboarding |
| `/docs/reactivesearch/react/overview/Showcase` | Live `clone-airbeds` demo |
| `/docs/reactivesearch/react/search/searchbox` | Top component |
| `/docs/reactivesearch/react/result/reactivelist` | Top component + CSB |
| `/docs/reactivesearch/react/list/singlelist` | Facet demo (recipes-demo gap) |
| `/api/javascript/quickstart` | API quickstart |

## P1 playground-heavy pages

- `/docs/search/reactivesearch-api/reference/opensearch` (44 embeds)
- `/docs/search/reactivesearch-api/reference/elasticsearch` (44 embeds)
- `/docs/reactivesearch/atlas-search/search-examples-with-react`
- `/docs/reactivesearch/autocomplete-plugin/guides` (needs `best-buy-dataset`)
- `/docs/pipelines/how-to/open-ai`
- `/docs/analytics/popular-recent-suggestions`
- `/api/examples/rest`

**Note:** `play.reactivesearch.io` backends live in saved playground state, not iframe URLs alone.


## Import investigation (2026-07-07 ~15:00 IST)

**What happened**

- Exports are **complete** on disk: `recipes-demo` 222,286 docs (162 MB NDJSON), `best-buy-dataset` 114,928 docs (759 MB).
- Earlier full runs **did not finish**: `best-buy-dataset` export died at ~20k docs with `ConnectionResetError` from the source cluster; initial wrapper logs show start only (no completion).
- Index create on Aiven previously failed on private OpenSearch settings until `build_create_payload()` stripped `index.history` (and related keys). Current script includes that fix.
- **`--force` import does not delete** an existing index; it bulk-loads into it (same `_id` overwrites). The drop from “~50%” to ~5k is explained by **import-only restarts after the destination index was missing/recreated** (log: `creating best-buy-dataset…` at 09:17 UTC) and fresh bulk from line 1—not by a silent partial crash of the current run.
- **best-buy** had **four** import-only starts (09:13, 09:17, 09:19, 09:22 UTC); only one Python importer per index is active now. No `bulk errors` in `logs/`.

**Current Aiven `_count` (rising)**

| Index | Count | Target | Notes |
|-------|------:|-------:|-------|
| `recipes-demo` | ~16.9k | 222,286 | Import-only since ~09:13 UTC |
| `best-buy-dataset` | ~8.5k | 114,928 | Import-only since ~09:22 UTC (slower bulk) |

**Processes**

- `migrate-demo-indexes.py --import-only --force` running for both indexes (no `run-migration.sh` wrapper on the active PIDs).
- **Do not start additional import-only jobs** until these finish (avoids competing bulk and confusing counts).

**ETA (rough)**

- `recipes-demo`: ~1–1.5 h at observed ~50–100 docs/s.
- `best-buy-dataset`: ~2–3 h (larger docs, slower observed rate).

## Migration tooling

- `migrate-demo-indexes.py` — export/import; strips private settings (`history.uuid`, etc.)
- `run-migration.sh` — logged wrapper (`logs/{index}-{timestamp}.log`, redacted URLs)
- Wrapper jobs: `logs/best-buy-dataset-20260707T073843Z.log`, `logs/recipes-demo-20260707T073843Z.log`

## Migration order

1. Create per-index read-only RS credentials (replace root `rs-demo` in public docs)
2. Configure CORS on Render for docs, CodeSandbox, playground, storybook origins
3. Bulk-replace hostnames in Docs + credentials
4. Retarget `recipes-demo` demos → `good-books-ds` OR migrate subset
5. Finish `best-buy-dataset` migration
6. Update external repos: `reactivesearch`, `searchbox`, `autocomplete-suggestions-plugin`
7. Bulk-update `play.reactivesearch.io` saved states
8. P0 → P1 → P2 manual test pass

## External repos (not Docs)

- `appbaseio/reactivesearch` — web/vue/maps examples + storybook
- `appbaseio/searchbox` — react-searchbox examples
- `appbaseio/autocomplete-suggestions-plugin` — blocked on `best-buy-dataset`
- `opensource.appbase.io/playground`, `reactivesearch-vue-playground.netlify.app`

## recipes-demo options

| Option | Tradeoff |
|--------|----------|
| Migrate ~10k doc subset | Enough for facet demos |
| Retarget demos → `good-books-ds` | Fastest; different field schema |
| Static screenshots | Lowest effort |
