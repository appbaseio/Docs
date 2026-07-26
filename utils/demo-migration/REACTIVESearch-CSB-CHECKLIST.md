# ReactiveSearch CodeSandbox migration checklist

> **Source:** exhaustive grep of Docs repo for `codesandbox.io` URLs referencing `appbaseio/reactivesearch` (130 unique embed paths, 202 iframe occurrences across ~140 files).  
> **Last verified:** 2026-07-26

> **next branch examples migrated 2026-07-26 via reactivesearch PR #2326**

---

## Agent prompt (copy into reactivesearch repo)

```
Migrate CodeSandbox examples in appbaseio/reactivesearch to the new demo backend.

BACKEND
  URL:         https://reactivesearch-api-9-4-0.onrender.com
  Credentials: d03e6f5f33d5:49124674-554e-4343-9ab2-006b2932f5c0
  API path:    /{index}/_reactivesearch          (NOT /_reactivesearch.v3)

REPLACE CHEATSHEET (in each example's config / ReactiveBase props)
  OLD host:  https://appbase-demo-ansible-abxiydt-arc.searchbase.io
             https://arc-cluster-appbase-demo-6pjy6z.searchbase.io
  NEW host:  https://reactivesearch-api-9-4-0.onrender.com

  OLD path:  /recipes-demo/_reactivesearch.v3
             /good-books-ds/_reactivesearch.v3
  NEW path:  /{index}/_reactivesearch

  OLD creds: various demo read-only keys in examples
  NEW creds: d03e6f5f33d5:49124674-554e-4343-9ab2-006b2932f5c0
             (replace with per-index read-only creds before public release)

INDEX HINTS
  good-books-ds  — default for search / chart / AI / preferences demos
  clone-airbeds  — geo / maps / QuerySuggestion (analytics)
  good-books     — multi-index demos (paired with good-books-ds)
  recipes-demo   — facet/list/range demos; retarget to good-books-ds until
                   recipes-demo index import completes on Render ES

PER-EXAMPLE CHANGES
  1. Update app/url, credentials, and index in ReactiveBase (or equivalent).
  2. Drop `.v3` from `_reactivesearch` path suffix.
  3. For recipes-demo examples: use good-books-ds interim OR wait for index.
  4. Skip mongo-examples/* — those use MongoDB Atlas, not Render ES (see below).
  5. vue-maps examples also need a valid Google Maps API key in env.

VERIFICATION (each example)
  [ ] CSB preview loads without console CORS / 401 errors
  [ ] Search returns results for the configured index
  [ ] Facets / geo / charts render (where applicable)
  [ ] No remaining references to searchbase.io or _reactivesearch.v3

P0 ALREADY DONE IN REACTIVESSEARCH (do not re-migrate)
  next/packages/web/examples/MyAwesomeSearchStep1-5
  next/packages/web/examples/SearchBox
  next/packages/web/examples/SearchBoxWithPillSuggestions
  feat/faq-suggestions/packages/web/examples/SearchBoxWithFAQSuggestions
  next/packages/web/examples/ReactiveList
  next/packages/web/examples/SingleList

Work through the checklist below in suggested migration order.
```

---

## Summary

| Metric | Count |
|--------|------:|
| Unique CSB embed paths (reactivesearch repo) | 130 |
| **P0 done** (excluded from checklist) | 10 |
| **next branch done** (PR #2326, 2026-07-26) | 71 |
| **Remaining checklist items** | 49 |
| P1 (atlas-search + analytics) | 10 |
| `mongo-examples` (defer / separate track) | 9 |
| `recipes-demo` dependents (interim → good-books-ds) | ~61 |

### By branch

| Branch | Checklist items |
|--------|----------------:|
| `next` | 71 ✅ (migrated PR #2326) |
| `feat/just-for-csb-002` | 23 |
| `feat/vue-showcase` | 2 |
| `feat/faq-suggestions` | 1 |
| `dev` | 4 |
| `v3` | 5 |
| `vue-maps` | 4 |

### By package

| Package | ES examples | Mongo (defer) |
|---------|------------:|--------------:|
| `packages/web` (`@appbaseio/reactivesearch`) | 44 | 3 |
| `packages/vue` (`@appbaseio/reactivesearch-vue`) | 22 + 26 on stale branches | 3 |
| `packages/maps` | 5 | 3 |
| `vue-maps` (legacy Google Maps) | 4 | — |

### Suggested migration order

1. **Stale branches** — `dev` (4), `v3` (5), `vue-maps` (4), `feat/just-for-csb-002` (23), `feat/*` showcase (3)
2. **`next` bulk** — web (44) → vue (22) → maps (5)
3. **`recipes-demo` dependents** — list/range/facet examples (~61); retarget to `good-books-ds` until `recipes-demo` index is on Render ES
4. **`mongo-examples`** — skip or separate MongoDB Atlas migration (9 examples)

---

## P0 — already migrated ✅

These 10 examples are **done** in the reactivesearch repo (Docs PR already points at Render ES for the corresponding pages). No further work unless regression found.

- `next/packages/web/examples/MyAwesomeSearchStep1`
- `next/packages/web/examples/MyAwesomeSearchStep2`
- `next/packages/web/examples/MyAwesomeSearchStep3`
- `next/packages/web/examples/MyAwesomeSearchStep4`
- `next/packages/web/examples/MyAwesomeSearchStep5`
- `next/packages/web/examples/SearchBox`
- `next/packages/web/examples/SearchBoxWithPillSuggestions`
- `feat/faq-suggestions/packages/web/examples/SearchBoxWithFAQSuggestions`
- `next/packages/web/examples/ReactiveList`
- `next/packages/web/examples/SingleList`

**Docs inline vs CSB (optional follow-up):** `singlelist.md` and `reactivelist.md` inline `endpoint` snippets still use `/recipes-demo/_reactivesearch` on 9-4-0; embedded CSB examples on `next` use `good-books-ds`. Align inline snippets when verifying those pages.

---

## P1 — atlas-search + analytics (10)

Docs pages: `/docs/reactivesearch/atlas-search/search-examples-with-react`, `search-examples-with-vue`, `/docs/analytics/popular-recent-suggestions`.

> **Note:** 9 of 10 use `mongo-examples/*` (MongoDB Atlas). Only `QuerySuggestion` uses Render ES. Migrate `QuerySuggestion` now; defer mongo block unless Atlas connection strings are also being updated.

### P1 checklist

- [ ] `next/packages/maps/examples/mongo-examples/GeoDistanceDropdown` — MongoDB Atlas — defer
- [ ] `next/packages/maps/examples/mongo-examples/GeoDistanceSlider` — MongoDB Atlas — defer
- [ ] `next/packages/maps/examples/mongo-examples/ReactiveMap` — MongoDB Atlas — defer
- [ ] `next/packages/vue/examples/mongo-examples/data-search` — MongoDB Atlas — defer
- [ ] `next/packages/vue/examples/mongo-examples/multi-list` — MongoDB Atlas — defer
- [ ] `next/packages/vue/examples/mongo-examples/range-input` — MongoDB Atlas — defer
- [ ] `next/packages/web/examples/QuerySuggestion` — clone-airbeds
- [ ] `next/packages/web/examples/mongo-examples/DataSearch` — MongoDB Atlas — defer
- [ ] `next/packages/web/examples/mongo-examples/MultiList` — MongoDB Atlas — defer
- [ ] `next/packages/web/examples/mongo-examples/RangeInput` — MongoDB Atlas — defer

---

## `recipes-demo` dependents

`SingleList` is P0 ✅. **~61 checklist items** below (in branch sections) historically used `recipes-demo/_reactivesearch.v3`. Until the `recipes-demo` index finishes importing to Render ES, retarget to **`good-books-ds`** (field schema differs — verify facets still work). Items are marked `recipes-demo → good-books-ds (interim)` in the branch checklists.

**React web:** `MultiList`, `MultiListAntd`, `MultiDataList`, `MultiDropdownList`, `SingleDataList`, `SingleDropdownList`, `TabDataList`, `TreeList`, `TreeListWithCustomSelectedFilters`, `TagCloud`, `ToggleButton`, `RangeInput`, `RangeSlider`, `SingleRange`, `MultiRange`, `DynamicRangeSlider`, `NumberBox`, `DatePicker`, `DateRange`, `RatingsFilter`, `SingleDropdownRange`, `MultiDropdownRange`, `ResultCard`, `ResultList`

**Vue (`next` + `feat/just-for-csb-002`):** `multi-list`, `single-list`, `multi-dropdown-list`, `single-dropdown-list`, `tree-list`, `toggle-button`, `range-input`, `range-slider`, `single-range`, `multi-Range`, `dynamic-range-slider`, `reactive-component`, `reactive-component-with-custom-query`, `reactive-list`, `reactivelist-with-aggregation`, `reactivelist-without-aggregation`, `result-card`, `result-list`, `selected-filters-custom`

**Dev branch:** `ReactiveComponent`, `SelectedFilters`

---

## Other — grouped by branch

## Branch: `next` — `packages/web/examples`

- [x] `next/packages/web/examples/AIAnswer` — good-books-ds
- [x] `next/packages/web/examples/CategorySearch` — good-books-ds
- [x] `next/packages/web/examples/DataSearch` — good-books-ds
- [x] `next/packages/web/examples/DataSearchWithAggregation` — good-books-ds
- [x] `next/packages/web/examples/DatePicker` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/DateRange` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/DynamicRangeSlider` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/ErrorBoundary` — good-books-ds
- [x] `next/packages/web/examples/MultiDataList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/MultiDropdownList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/MultiDropdownRange` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/MultiIndexFacet` — good-books-ds + good-books
- [x] `next/packages/web/examples/MultiIndexSearch` — good-books-ds + good-books
- [x] `next/packages/web/examples/MultiList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/MultiListAntd` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/MultiRange` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/NumberBox` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/PathBasedRouting` — good-books-ds
- [x] `next/packages/web/examples/Preferences` — good-books-ds
- [x] `next/packages/web/examples/RangeInput` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/RangeSlider` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/RatingsFilter` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/ReactiveChart/Bar` — good-books-ds
- [x] `next/packages/web/examples/ReactiveChart/Histogram` — good-books-ds
- [x] `next/packages/web/examples/ReactiveChart/Line` — good-books-ds
- [x] `next/packages/web/examples/ReactiveChart/Pie` — good-books-ds
- [x] `next/packages/web/examples/ReactiveChart/Scatter` — good-books-ds
- [x] `next/packages/web/examples/ReactiveChart/StackedBarChart` — good-books-ds
- [x] `next/packages/web/examples/ReactiveListWithAggregation` — good-books-ds
- [x] `next/packages/web/examples/ResultCard` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/ResultList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/RichSnippets` — good-books-ds
- [x] `next/packages/web/examples/SavedSearch` — good-books-ds
- [x] `next/packages/web/examples/SearchBoxWithFeaturedSuggestions` — good-books-ds
- [x] `next/packages/web/examples/SingleDataList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/SingleDropdownList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/SingleDropdownRange` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/SingleRange` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/TabDataList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/TagCloud` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/ToggleButton` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/TreeList` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/TreeListWithCustomSelectedFilters` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/web/examples/ssr` — good-books-ds

## Branch: `next` — `packages/vue/examples`

- [x] `next/packages/vue/examples/ai-answer` — good-books-ds
- [x] `next/packages/vue/examples/analytics-with-hook` — good-books-ds
- [x] `next/packages/vue/examples/dynamic-range-slider` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/multi-Range` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/multi-dropdown-list` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/multi-list` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/preferences` — good-books-ds
- [x] `next/packages/vue/examples/range-input` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/range-slider` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/reactive-component` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/reactive-component-with-custom-query` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/reactive-list` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/result-card` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/result-list` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/saved-search` — good-books-ds
- [x] `next/packages/vue/examples/search-box` — good-books-ds
- [x] `next/packages/vue/examples/selected-filters-custom` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/single-dropdown-list` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/single-list` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/single-range` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/toggle-button` — recipes-demo → good-books-ds (interim)
- [x] `next/packages/vue/examples/tree-list` — recipes-demo → good-books-ds (interim)

## Branch: `next` — `packages/maps/examples`

- [x] `next/packages/maps/examples/GeoDistanceDropdown` — clone-airbeds
- [x] `next/packages/maps/examples/GeoDistanceSlider` — clone-airbeds
- [x] `next/packages/maps/examples/QuickStartStep1` — clone-airbeds
- [x] `next/packages/maps/examples/QuickStartStep2` — clone-airbeds
- [x] `next/packages/maps/examples/ReactiveMap` — clone-airbeds

## Branch: `dev` (4)

- [ ] `dev/packages/vue/examples/with-ssr` — good-books-ds
- [ ] `dev/packages/web/examples/ReactiveComponent` — recipes-demo → good-books-ds (interim)
- [ ] `dev/packages/web/examples/SelectedFilters` — recipes-demo → good-books-ds (interim)
- [ ] `dev/packages/web/examples/ssr` — good-books-ds

## Branch: `v3` (5) — legacy MyAwesomeSearch duplicate

Legacy quickstart embeds on `/docs/reactivesearch/react/v3/overview/quickstart`. Prefer consolidating to `next` branch examples.

- [ ] `v3/packages/web/examples/MyAwesomeSearchStep1` — good-books-ds (legacy `v3` duplicate)
- [ ] `v3/packages/web/examples/MyAwesomeSearchStep2` — good-books-ds (legacy `v3` duplicate)
- [ ] `v3/packages/web/examples/MyAwesomeSearchStep3` — good-books-ds (legacy `v3` duplicate)
- [ ] `v3/packages/web/examples/MyAwesomeSearchStep4` — good-books-ds (legacy `v3` duplicate)
- [ ] `v3/packages/web/examples/MyAwesomeSearchStep5` — good-books-ds (legacy `v3` duplicate)

## Branch: `vue-maps` (4)

Legacy Google Maps examples; require Google Maps API key in addition to backend migration.

- [ ] `vue-maps/packages/vue/examples/reactive-google-map` — clone-airbeds (+ Google Maps API key)
- [ ] `vue-maps/packages/vue/examples/reactive-google-map-aggregations` — clone-airbeds (+ Google Maps API key)
- [ ] `vue-maps/packages/vue/examples/reactive-google-map-default-query` — clone-airbeds (+ Google Maps API key)
- [ ] `vue-maps/packages/vue/examples/reactive-google-map-nuxt` — clone-airbeds (+ Google Maps API key)

## Branch: `feat/just-for-csb-002` (23) — Vue v1 CodeSandbox branch

Stale branch used by `/docs/reactivesearch/vue/v1/*` pages. Consider merging into `next` after migration.

- [ ] `feat/just-for-csb-002/packages/vue/examples/analytics-with-hook` — good-books-ds
- [ ] `feat/just-for-csb-002/packages/vue/examples/data-search` — good-books-ds
- [ ] `feat/just-for-csb-002/packages/vue/examples/dynamic-range-slider` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/multi-Range` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/multi-dropdown-list` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/multi-list` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/preferences` — good-books-ds
- [ ] `feat/just-for-csb-002/packages/vue/examples/range-input` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/range-slider` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/reactive-component` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/reactive-component-with-custom-query` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/reactive-list` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/reactivelist-with-aggregation` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/reactivelist-without-aggregation` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/result-card` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/result-list` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/saved-search` — good-books-ds
- [ ] `feat/just-for-csb-002/packages/vue/examples/search-box` — good-books-ds
- [ ] `feat/just-for-csb-002/packages/vue/examples/selected-filters-custom` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/single-dropdown-list` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/single-list` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/single-range` — recipes-demo → good-books-ds (interim)
- [ ] `feat/just-for-csb-002/packages/vue/examples/toggle-button` — recipes-demo → good-books-ds (interim)

## Branch: `feat/faq-suggestions` (non-P0)

- [ ] `feat/faq-suggestions/packages/vue/examples/search-showcase/faq-suggestions` — good-books-ds

## Branch: `feat/vue-showcase` (2)

- [ ] `feat/vue-showcase/packages/vue/examples/search-showcase/featured-suggestions` — good-books-ds
- [ ] `feat/vue-showcase/packages/vue/examples/search-showcase/searchbox-inline-ai-response` — good-books-ds

---

## `mongo-examples` — separate migration or skip

These 9 CodeSandbox embeds connect to **MongoDB Atlas**, not the Render OpenSearch backend. Do **not** apply the Render ES replace cheatsheet. Options:

1. **Skip** until a dedicated Mongo demo backend is provisioned
2. **Separate ticket** to update Atlas connection strings / credentials
3. **Retarget** docs to ES equivalents on `next` (non-mongo) examples where they exist

| Path | Docs reference |
|------|----------------|
| `next/packages/maps/examples/mongo-examples/GeoDistanceDropdown` | `atlas-search/search-examples-with-react` |
| `next/packages/maps/examples/mongo-examples/GeoDistanceSlider` | `atlas-search/search-examples-with-react` |
| `next/packages/maps/examples/mongo-examples/ReactiveMap` | `atlas-search/search-examples-with-react` |
| `next/packages/vue/examples/mongo-examples/data-search` | `atlas-search/search-examples-with-vue` |
| `next/packages/vue/examples/mongo-examples/multi-list` | `atlas-search/search-examples-with-vue` |
| `next/packages/vue/examples/mongo-examples/range-input` | `atlas-search/search-examples-with-vue` |
| `next/packages/web/examples/mongo-examples/DataSearch` | `atlas-search/search-examples-with-react` |
| `next/packages/web/examples/mongo-examples/MultiList` | `atlas-search/search-examples-with-react` |
| `next/packages/web/examples/mongo-examples/RangeInput` | `atlas-search/search-examples-with-react` |

---

## Appendix — other CodeSandbox repos (not this checklist)

These appear in Docs but live in **other** repos. Track separately.

### `appbaseio/vue-quick-start` (6 embeds)

`/docs/reactivesearch/vue/overview/QuickStart` — steps 1–5 + final. P0 Docs pages already use Render ES inline; CSB repo may still point at old backend.

### `appbaseio/searchbox` (~30+ embeds)

- `packages/react-searchbox/examples/*` — react-searchbox docs, atlas-search searchbox examples, analytics popular suggestions
- `packages/vue-searchbox/examples/*` — vue-searchbox docs, atlas-search
- `packages/searchbox/examples/*` — searchbox quickstart / API
- `packages/searchbase/examples/with-facet` — searchbase QuickStart

### `appbaseio/searchbase` (2 embeds)

- `packages/searchbase/examples/with-react`
- `packages/searchbase/examples/with-vanilla`

---

## Verification grep (Docs repo)

Re-run after reactivesearch migration to confirm no stale hosts remain **in reactivesearch CSB URLs**:

```bash
rg 'codesandbox.io.*appbaseio/reactivesearch' content/ src/
rg 'searchbase\.io|_reactivesearch\.v3' content/ src/   # broader stale-host scan
```
