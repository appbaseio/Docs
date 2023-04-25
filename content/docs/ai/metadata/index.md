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

## How it works

![Metadata enrichment visualized](/content/images/concepts/metadata_enrichment.png "Metadata enrichment visualized")

Metadata enrichment script uses OpenAI in order to fetch the synonyms. It iterates through all the existing data, generates the synonyms and injects them into the index. It also takes care of managing the mappings of the index.

<div style="position: relative; padding-bottom: 64.98194945848375%; height: 0;"><iframe src="https://www.loom.com/embed/407e6f84db364785ae1fb5e391867f55" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Metadata Script

![Metadata Script in action](https://i.imgur.com/bHm3DTr.png "Metadata script in action")

[Check out the script over here](https://github.com/appbaseio/ai-scripts/tree/master/metadata)

To get started with the script, `python3` should be installed.

Once `python3` is installed and available, run the following command and the script will take care of the rest:

```sh
curl -s https://raw.githubusercontent.com/appbaseio/ai-scripts/master/get-ai-script.py --output get-ai.py && python3 get-ai.py metadata
```
