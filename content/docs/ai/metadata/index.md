---
title: 'Metadata Enrichment'
meta_title: 'Metadata Enrichment'
meta_description: 'Learn how to enrich metadata in already existing indexes'
keywords:
    - reactivesearch.io
    - metadata enrichment
    - chatgpt
    - search engine
    - opensearch
    - elasticsearch
sidebar: 'docs'
---

Metadata enrichment is a way to enrich the already existing data and cover synonyms of that. It is most useful when used with single word fields.

## Example Scenario

Say we have a dataset of users where there is a field that contains the mood of the person. Let's say the name of the field is `mood` and it can contain a single word string, like `happy`, `sad`, `flushed` etc.

Let's say we want to be able to search on this field but we want to provide searching based on synonyms as well. For eg, if someone searches for `unhappy`, it should match `sad` and not `happy` however doing a direct text match in this case will return 0 results and doing a query will lead to `happy` being one of the results.

This is where metadata enrichment comes in. This script will take the word `happy`, generate synonyms for it and store it in a different field. Later on the search can be made on the field that contains the synonyms.

This works perfectly with the above example since getting synonyms for `sad` will probably contain `unhappy` or something similar and searching in the list of synonyms will give us a match leading to `sad` being one of the results and `happy` not being in the results
