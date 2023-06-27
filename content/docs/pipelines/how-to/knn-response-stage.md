---
title: 'Implement Vector Search using kNN with OpenAI'
meta_title: 'Implement Vector Search using kNN with OpenAI | Introduction to Appbase.io'
meta_description: 'Learn how to re rank the results of a search using k Nearest Neighbor with OpenAI'
keywords:
    - concepts
    - appbase.io
    - opensearch
    - pipelines
    - kNN
    - vector
sidebar: 'docs'
---

Vector Search has become a very appreciated method for searching recently. By using ReactiveSearch pipelines, we can add stages to rearrange results using kNN with just a few extra lines.

## Example Scenario: Rearrange first 10 results using kNN

Let's say we have an endpoint that searches for some data. Now, what we want is to utilize k-Nearest Neighbor (kNN) to rearrange the first 10 results to make them more suitable.

We can easily do that through ReactiveSearch pipelines.

We will create a pipeline that overrides the `/{index}/_reactivesearch` endpoint and add a stage to add kNN rearrangement of response data based on our inputs.

## Index Requirements

There are some requirements that need to be satisfied in order to be able to use `kNN` with ElasticSearch or OpenSearch. These include keeping a field or fields in the index that will be of a certain type and contain vector data.

For the sake of example, let's say we will have a field in our index named `vector_data` that will contain the vector data for the fields `Summary` and  `Text`.

[For more details about indexing vector data, read this how-to guide](./knn-indexing)

## Assumptions

There are various algorithms that can be run on top of a data to get vector representation of it. In this case, for the sake of example, we will be using [OpenAI's Embeddings](https://platform.openai.com/docs/guides/embeddings) algorithm to find the vector representation of the data. It is important that we use the same algorithm while indexing the data as well as while searching the data.

This means, while indexing, we will have to run the fields that we want to store as vector (in our case, the `Summary` and `Text` fields) through this algorithm. We will also need to run the search query through this algorithm to get the vector representation of the query.

## Pre Setups

Now that we know how we are going to implement kNN response manipulation, let's define the basic things in the pipeline.

As explained above, we will override the `_reactivesearch` endpoint which will invoke our pipeline if a `POST` method is defined.

The file will be defined in the following way:

```yaml
enabled: true
routes:
- path: "/amazon_reviews/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch

envs:
  openAIApiKey: <your-api-key>

```

### Environment Variables

We are passing the Open AI API Key through envs so that it can be used in any stage necessary. This is the `openAIApiKey` variable.

## Stages

Now that we have the basic pipeline defined, let's get started with the stages. We will have a few pre-built stages and some custom stages in this pipeline.

> Pre-Built stages are provided by ReactiveSearch to utilize functions from ReactiveSearch API, like hitting ElasticSearch or translating an RS Query to ES Query.

We will have the following stages defined:

1. authorization
2. fetch embeddings
3. reactivesearch query
4. es query

### Authorization

This is one of the most important steps in the pipeline. Using this stage we will make sure the user is passing proper credentials to hit the endpoint they are trying to access.

The is a `pre-built` stage provided by ReactiveSearch and can be leveraged in the following way:

```yaml
- id: authorize user
  use: authorization
```

Yes, just one line will authorize the user, it's as simple as that!

### Fetch Embeddings

Fetch the embeddings for the passed query. In order to achieve this, we can use the `openAIEmbeddings` pre-built stage that takes care of fetching the vector representation of the query and injecting the representation into the request body directly.

```yaml
- id: fetch embeddings
  use: openAIEmbeddings
  inputs:
    apiKey: "{{openAIApiKey}}"
    useWithReactiveSearchQuery: true
  continueOnError: false
```

In the above, we are passing the `openAIApiKey` as input since that's a required value in order for the stage to work properly. Besides that, the `useWithReactiveSearchQuery` field is passed as `true`. This field triggers the stage to iterate over the request body which is a ReactiveSearch Query body and finds out all the queries that have the `vectorDataField` field set. Whichever queries has this field set, the stage will extract the `value` passed in that query and generate the embedding for it using OpenAI's API. Once the embedding is generated, it is injected into the `queryVector` field of the same query so that it can be utilized in the next stage.

> NOTE that if `value` is not preferred for the vector embedding, a static value can be passed through inputs to this stage by specifying the value in the `text` field.

### Reactive Search

Now, we can use the pre-built stage `reactivesearchQuery` to convert the ReactiveSearch query into ElasticSearch query in order to find the search results.

We can do that in the following way:

```yaml
- id: reactivesearch
  use: reactivesearchQuery
  needs:
    - fetch embeddings
  continueOnError: false
```

### Elastic Search

The final stage is to hit ElasticSearch with the translated query and get the response. This can be done by using the pre-built stage `elasticsearchQuery`

This stage can be defined in the following way:

```yaml
- id: elastic search
  use: elasticsearchQuery
  continueOnError: false
```

## Complete Pipeline

Now that all stages are defined, we can have a look at the completed pipeline at once.

```yaml
enabled: true
routes:
- path: "/amazon_reviews/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch

envs:
  openAIApiKey: <your-api-key>

stages:
- id: authorize user
  use: authorization
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
- use: elasticsearchQuery
  continueOnError: false
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_ID/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml"
```

## Testing the Pipeline

We can hit the pipeline and see if response contains rearranged results based on vector data. We just need to hit a `/_reactivesearch` endpoint.

> NOTE that there should be some valid data before trying to run the pipeline. More can be found about indexing vector data in the [Indexing with kNN doc](./knn-indexing.md)

For instance, let's hit the `amazon_reviews` index in the following way:

```sh
curl -X POST CLUSTER_ID/amazon_reviews/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["Name", "Description"], "vectorDataField": "vector_data"}]}'
```

