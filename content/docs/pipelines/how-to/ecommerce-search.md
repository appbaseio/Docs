---
title: 'Build E-commerce Search with ReactiveSearch Pipelines'
meta_title: 'E-commerce Search | ReactiveSearch Pipelines'
meta_description: 'A concise, code-first guide to build an e-commerce search pipeline with ReactiveSearch: ranking, typo fallback, and AI answers.'
keywords:
  - reactivesearch
  - elasticsearch
  - pipelines
  - e-commerce
  - search
  - opensearch
sidebar: 'docs'
---

# E-commerce Search with ReactiveSearch Pipelines

This guide shows how to implement an e-commerce search pipeline that:

- reshapes incoming ReactiveSearch queries for better ranking,
- runs an ES query,
- re-ranks results using `globalRank` / `categoryRank` when there **are** hits,
- and **falls back** to a fuzzy “second pass” search when hits are missing—then re-queries ES—plus an optional AI answer stage.

---

## What the pipeline does (at a glance)

- **Stage: `generateRequest` (script)**  
  Enriches `suggestion` / `search` queries with weighted `dataField`s, `includeFields`, a `distinctField` for grouping, toggles suggestion behavior based on query length, may enable AI for long question-like queries, and injects a `defaultQuery` that filters & boosts price/rank segments.

- **Stage: `es_query` (built-in)**  
  Issues the first ES request.

- **Stage: `typo check` (script)**  
  If both `search` and `result` have hits, re-scores items using `globalRank` / `categoryRank`. If not, sets per-query `fuzziness` (1–2) and flips `envs.research = true` to trigger a **second-pass** RS→ES query.

- **Stages: `researchQuery` → `research_es_query` (built-ins, conditional)**  
  Run only when `envs.research == true` (the fallback path).

- **Stage: `answerAI` (built-in)**  
  Optional AI answer stage using top docs’ names as context.

**Bottom line:** ES is **run again** when the first pass lacks hits (or one of the paired queries has none). The fallback increases `fuzziness` and re-queries; when there **are** hits, the pipeline re-ranks by business signals.

---

## Route & envs (JSON)

```json
{
  "enabled": true,
  "description": "Best Buy Search Pipeline",
  "routes": [
    {
      "path": "/best-buy-set-pipeline/_reactivesearch",
      "method": "POST",
      "classify": { "category": "reactivesearch" }
    },
    {
      "path": "/best-buy-set-2023-pipeline/_reactivesearch",
      "method": "POST",
      "classify": { "category": "reactivesearch" }
    }
  ],
  "envs": {
    "index": ["best-buy-set-2023"]
  }
}
```

---

## Stages (JSON snippets)

### 1) Authorize

```json
[
  { "id": "auth", "use": "authorization" }
]
```

### 2) Normalize request (custom script)

- Adds weighted fields, includes, distinct grouping by `class.keyword`.
- Suggestion toggles by query length (popular/featured/recent).
- Enables AI for long, question-like queries.
- Injects a `defaultQuery` to demote certain classes and boost price/rank.

```json
[
    {
        "id": "generateRequest",
        "scriptRef": "generateRequest",
        "continueOnError": true
    }
]
```

### 3) First pass: RS → ES

```json
[
    {
        "id": "query",
        "use": "reactivesearchQuery",
        "continueOnError": false
    },
    {
        "id": "es_query",
        "use": "elasticsearchQuery",
        "continueOnError": false
    }
]
```
```

### 4) Typo / fallback (custom script)

- If **hits exist**, re-score by `globalRank`/`categoryRank` and sort by updated score.  
- Else, set `fuzziness` = 1 (len 5–9) or 2 (otherwise), and set `envs.research = true` to trigger second pass.

```json
[
    {
        "id": "typo check",
        "scriptRef": "checkTypo",
        "continueOnError": false
    }
]
```

### 5) Second pass (conditional)

```json
[
  {
    "id": "researchQuery",
    "use": "reactivesearchQuery",
    "continueOnError": false,
    "trigger": { "expression": "context.envs.research == true" }
  },
  {
    "id": "research_es_query",
    "use": "elasticsearchQuery",
    "continueOnError": false,
    "trigger": { "expression": "context.envs.research == true" }
  }
]
```

### 6) AI Answer (optional)

Uses top 3 docs’ `source.name` as context and a simple question template.

```json
[
  {
    "id": "answerAI",
    "use": "AIAnswer",
    "inputs": {
      "topDocsForContext": 3,
      "docTemplate": "${source.name}",
      "queryTemplate": "Can you tell me about: ${value}",
      "apiKey": "{{ context.envs.openAIConfig.open_ai_key }}"
    }
  }
]
```

---

## Complete pipeline (JSON)

```json
{
  "enabled": true,
  "description": "Best Buy Search Pipeline",
  "routes": [
    { "path": "/best-buy-set-pipeline/_reactivesearch", "method": "POST", "classify": { "category": "reactivesearch" } },
    { "path": "/best-buy-set-2023-pipeline/_reactivesearch", "method": "POST", "classify": { "category": "reactivesearch" } }
  ],
  "envs": { "index": ["best-buy-set-2023"] },
  "stages": [
    { "id": "auth", "use": "authorization" },
    { "id": "generateRequest", "scriptRef": "generateRequest", "continueOnError": true },
    { "id": "query", "use": "reactivesearchQuery", "continueOnError": false },
    { "id": "es_query", "use": "elasticsearchQuery", "continueOnError": false },
    { "id": "typo check", "scriptRef": "checkTypo", "continueOnError": false },
    {
      "id": "researchQuery",
      "use": "reactivesearchQuery",
      "continueOnError": false,
      "trigger": { "expression": "context.envs.research == true" }
    },
    {
      "id": "research_es_query",
      "use": "elasticsearchQuery",
      "continueOnError": false,
      "trigger": { "expression": "context.envs.research == true" }
    },
    {
      "id": "answerAI",
      "use": "AIAnswer",
      "inputs": {
        "topDocsForContext": 3,
        "docTemplate": "${source.name}",
        "queryTemplate": "Can you tell me about: ${value}",
        "apiKey": "{{ context.envs.openAIConfig.open_ai_key }}"
      }
    }
  ]
}
```

---

## Script references (what to upload)

- **`generateRequest`** (from `generateRequest.js`)  
  Adds fields/weights, toggles suggestions, enables AI for long Q-like queries, injects `defaultQuery` (demotes certain classes; boosts price & rank ranges).

- **`checkTypo`** (from `checkTypo.js`)  
  Re-ranks when hits exist; otherwise sets `fuzziness` 1–2, flips `envs.research = true`, and rewrites the RS body for a second pass.

> Name your multipart form fields to match `scriptRef` values (e.g., `generateRequest`, `checkTypo`).

---

## Create the pipeline

```bash
curl -X POST 'CLUSTER_ID/_pipeline'   -H 'Content-Type: multipart/form-data'   --form 'pipeline=pipeline.json'   --form 'generateRequest=generateRequest.js'   --form 'checkTypo=checkTypo.js'
```

---

## Test

**First pass request** (hits pipeline route):

```bash
curl -X POST 'CLUSTER_ID/best-buy-set-2023-pipeline/_reactivesearch'   -H 'Content-Type: application/json'   -d '{
    "query": [
      { "id": "search", "type": "suggestion", "value": "iphone 15 case" }
    ]
  }'
```

**Expected behavior**

- If there are hits: results are re-ranked by `globalRank` / `categoryRank`.  
- If not: `fuzziness` is added (1–2) and a second RS→ES pass runs (`research*` stages).

---

## Notes for e-commerce tuning

- **Ranking signals:** ensure `globalRank` / `categoryRank` (or your analogs) are present in `_source` to enable re-ranking.  
- **Default query:** adjust filters/boosts (price thresholds, excluded classes) to fit your catalog.  
- **Long Q&A:** if you want AI answers, supply a valid `openAI` key and keep the `enableAI` heuristics (or refine them).
