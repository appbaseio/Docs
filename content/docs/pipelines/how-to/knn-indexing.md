---
title: 'Implement Vector Indexing for passed data'
meta_title: 'Implement Vector Indexing | Introduction to Appbase.io'
meta_description: 'Learn how to index incoming data and store it as a vector'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - kNN
    - vector
sidebar: 'docs'
---

Vector Search has become a very appreciated method for searching recently. By using ReactiveSearch pipelines, we can add stages to rearrange results using kNN with just a few lines of code.

## Before we start, why this?

This pipeline is required to index vector data without asking the user for the data. Imagine a case where index data consists of various fields like `Name`, `Age` etc. Now, our requirement is that when an indexing request comes, we want to convert the `Name` to a vector and store it in the index request as `name_vector`.

The question is why is a vector even necessary? Well, a vector can help us build pipelines [like the kNN search one](./knn-response-stage) where the search requests use the vector data to find the results.

## Index Requirements

In order for the data to be stored in the index, the index should know that the `name_vector` field will be of type vector. Not just that, the dimensions of the vector field also needs to be specified.

The dimensions can differ for the vector field. It depends on the utility that converts the string (or any other type) of data to vector. In this example, we will use [clip-as-service](https://clip-as-service.jina.ai/) and their dimensions are `768` (as of now). So in this example, we need to set the dimension of the vector field as that.

It can be set by sending the following request to ES mapping endpoint of the index:

```json
{
    "mappings": {
        "properties": {
            "name_vector": {
                "type": "dense_vector",
                "dims": 768,
                "index": true,
                "similarity": "cosine"
            }
        }
    }
}
```

### ElasticSearch

For ElasticSearch, we will have to make the type of the field `dense_vector`. This is necessary so that ElasticSearch understands that the field we are storing vector data to **can** actually contain vector data. Moreover, the `kNN` algorithm requires the field to be of `dense_vector` type in order to sucessfully run.

### OpenSearch

For OpenSearch, we will have to make the type of the field `knn_vector`. This is essentially the `dense_vector` equivalent for OpenSearch and indicates that we will be storing vector data in this field. It is important that the field that we will run `kNN` over be of type `knn_vector`.

## Assumptions

There are various algorithms that can be run on top of a data to get vector representation of it. In this case, for the sake of example, we will be using BERT algorithm to find the vector representation of the data. It is important that we use the same algorithm while indexing the data as well as while searching the data.

This means, while indexing, we will have to run the fields that we want to store as vector (in our case, the `Name` field) through this algorithm. We will also need to run the search query through this algorithm to get the vector representation of the query.

[BERT is developed by Google. Read more about it here](https://blog.google/products/search/search-language-understanding-bert/)

### Running bert-as-service

There are various options out there to run `bert` locally. In our case we will run [clip-as-service](https://clip-as-service.jina.ai/) and use their API to find the vector representation.

## Pre Setups

Now that we know how we are going to implement kNN index, let's start with the basic setup. We will override the `_doc` endpoint for the index `test-index`.

> The `_doc` endpoint is the endpoint that ElasticSearch/OpenSearch accepts indexing requests to.

The file will be defined in the following way:

```yaml
enabled: true
description: Index pipeline to store vectorized data

routes:
  - path: /lyrics-app-data/_doc
    method: POST
    classify:
      category: elasticsearch
      acl: index

envs:
  bertURL: "https://demo-cas.jina.ai:8443"
  method: POST
```

### Environment Variables

We are passing the `clip-as-service` URL through envs so that it can be used in the stages. This is passed through the `bertURL` variable.

## Stages

Now that we have the basic pipeline defined, let's get started with the stages. We will have a few pre-built stages and some custom stages in this pipeline.

> Pre-Built stages are provided by ReactiveSearch to utilize functions from ReactiveSearch API, like hitting ElasticSearch or translating an RS Query to ES Query.

We will have the following stages defined:

1. authorization
2. add body for vector request
3. name_vector
4. merge vector
5. index data

### Authorization

This is one of the most important steps in the pipeline. Using this stage we will make sure the user is passing proper credentials to hit the endpoint they are trying to access.

The is a `pre-built` stage provided by ReactiveSearch and can be leveraged in the following way:

```yaml
- id: "authorize user"
  use: "authorization"
```

### Add Body for vector request

This is just a patch script that will extract the body from the incoming request and generate the body for the vector request so it can be accessed directly in the next step where an http request is made.

The script should be named as `addBody.js` and defined in the following way:

```js
function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    return {
        "nameBody": getBody(requestBody.Name)
    }
}

function getBody(data) {
    return JSON.stringify({
        data: [{ text: data }],
        execEndpoint: "/"
    })
}
```

Then we can use the script in the stage in the following way:

```yaml
- id: add body for vector request
  scriptRef: "addBody.js"
```

### Name Vector

This stage will make the http request by using the `httpRequest` stage and get the vector data for the `Name` field.

> Since the script will run `async`hronously, the response will be stored in the context with the key being the `id` of the stage, thus the id is `name_vector`.

We will fetch the vector in the following way:

```yaml
- id: name_vector
  use: httpRequest
  async: true
  inputs:
    url: "{{bertURL}}/post"
    method: POST
    headers:
      "Content-Type": "application/json"
    body: "{{nameBody}}"
  continueOnError: false
```

### Merge Vector

Now that we have the vector data for the field `Name`, we will update the request body with the vector data so that it can be indexed properly. We can do that by using a custom script with the name `mergeVector.js` in the following way:

```js
function handleRequest() {
    const requestBody = JSON.parse(context.request.body)
    const lyricVector = JSON.parse(context["name_vector"])

    return {
        request: {
            ...context.request,
            body: JSON.stringify({
                ...requestBody,
                "name_vector": lyricVector.data[0].embedding
            })
        }
    }
}
```

> This stage is required because `async` stages cannot directly modify a few fields in context like `request`.

Once we have the script, we can use it in the following way:

```yaml
- id: merge vector
  scriptRef: "mergeVector.js"
```

### Index Data

Now that we have the vector data ready and merged in the request body, we can send the index request to ElasticSearch. This can be done by using the pre-built stage `elasticsearchQuery`.

```yaml
- id: index data
  use: elasticsearchQuery
  needs:
    - merge vector
```

## Complete Pipeline

The complete pipeline is defined as follows

```yaml
enabled: true
description: Index pipeline to store vectorized data

routes:
  - path: /lyrics-app-data/_doc
    method: POST
    classify:
      category: elasticsearch
      acl: index

envs:
  bertURL: "https://demo-cas.jina.ai:8443"
  method: POST

stages:
  - id: "authorize user"
    use: "authorization"
  - id: add body for vector request
    scriptRef: "addBody.js"
  - id: name_vector
    use: httpRequest
    async: true
    inputs:
      url: "{{bertURL}}/post"
      method: POST
      headers:
        "Content-Type": "application/json"
      body: "{{nameBody}}"
    continueOnError: false
  - id: merge vector
    scriptRef: "mergeVector.js"
  - id: index data
    use: elasticsearchQuery
    needs:
     - merge vector
```

