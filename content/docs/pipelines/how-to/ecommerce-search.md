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

Script: generateRequest.js

```js
function handleRequest() {
  const queryTerm = context.envs.query;

  /* verifying that format of query is as expected before modifying */
  const requestBody = JSON.parse(context.request.body);

  if (!requestBody.query || requestBody.query.length == 0) {
    /* Update the queries with the defaultQuery */
    requestBody.query.forEach((queryEach, queryIndex) => {
      console.log("query id each: ", queryEach["id"]);
      if (
        queryEach.type == "suggestion" ||
        queryEach.type == "search" ||
        queryEach.type == undefined ||
        queryEach.type == "term"
      ) {
        requestBody.query[queryIndex] = injectDefaultQuery(queryEach);
      }
    });

    return {
      request: { body: JSON.stringify(requestBody) }
    };
  }

  /* If there is only one query and it is a suggestion type of
   * query, we need to inject a `result` id query where there will
   * be the defaultQuery and the current `search` query will react to
   * it.
   **/
  if (
    requestBody.query.length == 1 &&
    requestBody.query[0].type == "suggestion" &&
    requestBody.query[0].id == "search"
  ) {
    requestBody.query[0].id = "result";
    requestBody.query[0].execute = false;
    let resultQuery = {
      ...requestBody.query[0],
      id: "search",
      react: { and: ["result"] },
      execute: true
    };
    requestBody.query.push(resultQuery);
  }

  /* Iterate through and if there is a suggestion or search query, update it
   * with the extra fields.
   **/
  console.log("query length: ", requestBody.query.length);
  requestBody.query.forEach((queryEach, queryIndex) => {
    console.log("query id: ", queryEach["id"]);

    /* If there is a term query of id result, change it to `search` type */
    if (queryEach.id == "result" && queryEach.type == "term") {
      queryEach.type = "search";
    }

    if (queryEach.type == "suggestion") {
      console.log("query id: ", queryEach["id"]);
      requestBody.query[queryIndex] = updateSuggestionsQuery(queryTerm, queryEach);
    } else if (queryEach.type == "search") {
      requestBody.query[queryIndex] = updateSearchQuery(queryTerm, queryEach);
      console.log(JSON.stringify(requestBody.query[queryIndex]));
    }

    /* Inject the defaultQuery
     *
     * If there is only one query, we don't want defaultQuery to
     * be injected since that will override the main query.
     */
    console.log(queryEach.id, ": ", queryEach.type);
    if (
      requestBody.query.length > 1 &&
      (queryEach.type == "suggestion" ||
        queryEach.type == "search" ||
        queryEach.type == undefined ||
        queryEach.type == "term")
    ) {
      requestBody.query[queryIndex] = injectDefaultQuery(queryEach);
    }
  });

  return {
    request: { body: JSON.stringify(requestBody) }
  };
}

function updateSuggestionsQuery(queryTerm, suggestionQuery) {
  if (!queryTerm) queryTerm = "";
  const queryLength = queryTerm.length;

  const dataFields = [
    { field: "longDescription", weight: 0.5 },
    { field: "name",            weight: 3   },
    { field: "name.autosuggest",weight: 0.1 },
    { field: "name.search",     weight: 0.01},
    { field: "class",           weight: 5   },
    { field: "class.search",    weight: 1   }
  ];

  suggestionQuery["dataField"] = dataFields;
  suggestionQuery["queryFormat"] = "and";
  suggestionQuery["includeFields"] = [
    "class", "globalRank", "categoryRank", "name",
    "shortDescription", "longDescription", "salePrice", "image"
  ];
  suggestionQuery["distinctField"] = "class.keyword";
  suggestionQuery["distinctFieldConfig"] = {
    inner_hits: {
      name: "rel",
      size: 2,
      _source: [
        "class", "globalRank", "categoryRank", "name",
        "shortDescription", "longDescription", "salePrice", "image"
      ]
    }
  };

  console.log("query id: ", suggestionQuery["id"]);

  /* Responding to the user intent based on the query length */
  if (queryLength <= 4) {
    // user is perhaps checking out the search
    suggestionQuery.enablePopularSuggestions  = true;
    suggestionQuery.enableFeaturedSuggestions = true;
    suggestionQuery.enableRecentSuggestions   = true;
  } else if (queryLength >= 5 && queryLength <= 9) {
    // user is looking for something specific
    suggestionQuery.enablePopularSuggestions  = false;
    suggestionQuery.enableFeaturedSuggestions = false;
    suggestionQuery.enableRecentSuggestions   = true;
  } else if (queryLength >= 10) {
    // user is definitely looking for something specific
    suggestionQuery.enableRecentSuggestions   = false;
    suggestionQuery.enablePopularSuggestions  = false;
    suggestionQuery.enableFeaturedSuggestions = false;
  }

  return suggestionQuery;
}

function updateSearchQuery(queryTerm, searchQuery) {
  const dataFields = [
    { field: "longDescription", weight: 1   },
    { field: "name",            weight: 3   },
    { field: "name.autosuggest",weight: 0.2 },
    { field: "name.delimiter",  weight: 1   },
    { field: "name.search",     weight: 0.1 },
    { field: "class",           weight: 5   },
    { field: "class.search",    weight: 1   }
  ];

  searchQuery["dataField"] = dataFields;
  searchQuery["queryFormat"] = "and";
  searchQuery["includeFields"] = [
    "class", "globalRank", "categoryRank", "name",
    "shortDescription", "longDescription", "salePrice", "image"
  ];
  searchQuery["distinctField"] = "class.keyword";
  searchQuery["distinctFieldConfig"] = {
    inner_hits: {
      name: "rel",
      size: 2,
      _source: [
        "class", "globalRank", "categoryRank", "name",
        "shortDescription", "longDescription", "salePrice", "image"
      ]
    }
  };

  /*searchQuery['sortField'] = ['globalRank', 'categoryRank'];
    searchQuery['sortBy'] = 'asc'; */

  console.log("query is: ", searchQuery["id"]);
  console.log("datafields are: ", JSON.stringify(searchQuery["dataField"]));

  if (!queryTerm) return searchQuery;

  const queryLength = queryTerm.length;
  if (!queryTerm || queryLength === 0) return searchQuery;

  if (
    queryLength >= 20 &&
    queryTerm.split(" ").length >= 4 &&
    queryTerm[queryTerm.length - 1] == "?"
  ) {
    searchQuery["enableAI"] = true;
    searchQuery["execute"]  = true;
  }

  return searchQuery;
}

function injectDefaultQuery(query) {
  /* Use exists query to boost score of results that contain
     either globalRank or categoryRank */
  console.log("existing default query: ", JSON.stringify(query.defaultQuery));
  if (
    (!query.defaultQuery || JSON.stringify(query.defaultQuery) == "{}") &&
    query.execute
  ) {
    query.defaultQuery = {
      query: {
        bool: {
          must_not: [
            { match: { class: "ACCY"        } },
            { match: { class: "APPLECARE"   } },
            { match: { class: "ACCESSORIES" } },
            { match: { class: "ACCESS."     } },
            { match: { class: "IPAD MONTHLY"} },
            { match: { class: "SVC FEE"     } }
          ],
          should: [
            { range: { salePrice:   { gte: 499, boost: 5 } } },
            { range: { salePrice:   { gte: 299, boost: 5 } } },
            { range: { salePrice:   { gte:  99, boost: 4 } } },
            { range: { categoryRank:{ lte:  10, boost: 2 } } },
            { range: { categoryRank:{ lte:   5, boost: 2 } } },
            { range: { categoryRank:{ lte:   1, boost: 1 } } },
            { range: { globalRank:  { lte:  10, boost: 5 } } },
            { range: { salePrice:   { gte:  50, boost: 0.01 } } }
          ]
        }
      }
    };
  }
  return query;
}
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

Script: checkTypo.js

```js
function handleRequest() {
  const queryTerm = context.envs.query;

  if (queryTerm && queryTerm.length < 5) {
    return {};
  }

  const globalRankWeight = 0.2;
  const categoryRankWeight = 0.5;

  const responseBody = JSON.parse(context.response.body);
  if (
    responseBody.search?.hits?.hits?.length != 0 &&
    responseBody.result?.hits?.hits?.length != 0
  ) {
    /* We have hits: re-score using rank signals */
    const results = responseBody.result?.hits?.hits;
    if (results) {
      results.forEach((hitEach, hitIndex) => {
        if (!hitEach._source.categoryRank && !hitEach._source.globalRank) {
          hitEach._source.categoryRank = 10;
        }

        let isGlobalRank = false;

        if (hitEach._source.globalRank) {
          const ogScore = hitEach._score;
          results[hitIndex]._score =
            ogScore - globalRankWeight * hitEach._source.globalRank;
          isGlobalRank = true;
        }

        if (hitEach._source.categoryRank && !isGlobalRank) {
          const ogScore = hitEach._score;
          results[hitIndex]._score =
            ogScore - categoryRankWeight * hitEach._source.categoryRank;
        }
      });

      /* Sort descending by updated score */
      results.sort((a, b) => b._score - a._score);
      responseBody.result.hits.hits = results;

      return {
        response: { body: JSON.stringify(responseBody) }
      };
    }
    return {};
  }

  /* No hits: enable fuzzy fallback and trigger research pass */
  const rsBody = JSON.parse(context.envs["ORIGINAL_RS_BODY"]);

  let fuzziness = 1;
  if (queryTerm.length >= 5 && queryTerm.length <= 9) {
    fuzziness = 1;
  } else {
    fuzziness = 2;
  }

  rsBody.query?.forEach((queryEach, queryIndex) => {
    queryEach.fuzziness = fuzziness;
    rsBody.query[queryIndex] = queryEach;
  });

  return {
    request: { body: JSON.stringify(rsBody) },
    envs: { research: true, ...context.envs }
  };
}
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
