---
title: 'Integrating OpenAI into ReactiveSearch'
meta_title: 'Integrating OpenAI into ReactiveSearch'
meta_description: 'Learn how to integrate OpenAI into ReactiveSearch using pipelines and OpenAI API'
keywords:
    - open-ai
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
sidebar: 'docs'
---

In this guide, we explain how OpenAI can be integrated into ReactiveSearch to take things above and beyond. ReactiveSearch in itself is capable of handling things like indexing data into OpenSearch/ElasticSearch as well as searching data.

Integrating OpenAI with ReactiveSearch adds the functionality to support kNN based searching/indexing on the data thus increasing the accuracy of the search results. In this guide, we will explain how [OpenAI's Embeddings API](https://beta.openai.com/docs/guides/embeddings) is being leveraged to make search better than ever.

## Overview of Workflow

The basic workflow is divided into two sub-flows:

1. Indexing data: In this, we use OpenAI's API to generate vector representation of the input fields and store them as vector data accordingly in order to use them during search.
2. Searching data: In this, we use OpenAI's API to generate vector representation of the search query passed by the user in order to use kNN search against the vector data field.

### Indexing Data

Indexing is done in two steps:

- Use OpenAI's API to get the vector representation of the fields that are to be stored as vector
- Index the data into OpenSearch along with the newly injected vector data field

### Searching Data

Searching the data is done in:

- Use OpenAI's API to get the vector representation of the query value
- Take the resulting vector and send it to OpenSearch/ElasticSearch
- Return the response received from OpenSearch/ElasticSearch back to the user

