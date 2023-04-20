---
title: 'ReactiveSearch with kNN search'
meta_title: 'ReactiveSearch with kNN search'
meta_description: 'Learn about kNN based searching and how to use it with ReactiveSearch'
keywords:
    - reactivesearch.io
    - knn
    - chatgpt
    - search engine
    - opensearch
    - elasticsearch
sidebar: 'docs'
---

Searching through data is one of the most important features of a search engine. The usual way to search data is text search however in order to get more relevant results, other, more sophisticated methods of searching can be used. One of such methods is kNN based searching.

## What is kNN?

kNN stands for k-Nearest Neighbor where `k` is a variable and while searching it considers `k` neighbors nearby to find relevant results.

![Vector search visulaized](https://cdn.hashnode.com/res/hashnode/image/upload/v1679920183365/979801f9-8d2c-4998-ba19-0ddcdc6f094f.png "Vector search visualized")

kNN is based on the idea of storing vector representation of text (or other types of) data and then searching by passing vectors as well.

This means during indexing, certain fields will have to be used for generating a vector representation. This representation can be thought of as an unique ID that will identify various features of the input fields.

These unique features will be checked against while searching.

Again, while searching, the search query will have to be converted into vector representation as well and then an algorithm can be used between the input query vector and all the stored vector data. This is where kNN comes in. kNN is the algorithm that takes care of finding the most relevant search results based on the input vector and the stored vectors.

> NOTE that the model used to convert the text into vector should be the same while indexing and searching.

## Before starting

If you have an indexed dataset that does not have vector representation, ReactiveSearch provides a script to convert that dataset with vector representation.

[Refer to this doc in order to learn more about enriching the data with vectors](../ai-answer/indexing#enriching-with-vector-data)

## Querying with kNN

![Querying visualized with kNN](../../../images/concepts/knn_search_querying.png "Querying visualized with kNN")

ReactiveSearch makes it very easy to query data with kNN. kNN based searching is supported out of the box so a simple query like following will do the job:

```json
{
    "query": [
        {
            "id": "knn",
            "vectorDataField": "vector_data",
            "value": "some movie",
            "queryVector": [0.2, -0.5, 1.2, ...]
        }
    ]
}
```

In the above, two fields are specified and these two fields are essential for vector based searching:

- **vectorDataField**: Field to indicate the dataField where the vector representation is stored.
- **queryVector**: Vector representation of the input query

Though the above is simple enough, generating the `queryVector` is a non-trivial task since it requires hitting an AI model with the input.

This is where ReactiveSearch pipelines can make the job easy. ReactiveSearch pipelines come with pre-built stages that can automatically generate the  `queryVector` from the `value` field and inject it into the query body.

Following is an example stage that does that:

```yaml
- id: fetch embeddings
  use: openAIEmbeddings
  inputs:
    apiKey: "{{openAIApiKey}}"
    useWithReactiveSearchQuery: true
  continueOnError: false
- use: reactivesearchQuery
  needs:
  - fetch embeddings
  continueOnError: false
```

The pre-built stage `openAIEmbeddings` takes care of injecting the `queryVector`.

[Read more about this pipeline and how to use it](../../pipelines/how-to/knn-response-stage)