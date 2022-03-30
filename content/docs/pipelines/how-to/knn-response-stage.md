---
title: 'Implement Vector Search using kNN'
meta_title: 'Implement Vector Search using kNN | Introduction to Appbase.io'
meta_description: 'Learn how to re rank the results of a search using k Nearest Neighbor'
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

### Things to Note

The structure of OpenSearch and ElasticSearch is mostly similar with some exceptions. We have a dedicated part at the end that explains the differences for `opensearch`.

## Example Scenario: Rearrange first 10 results using kNN

Let's say we have an endpoint that searches for some data. Now, what we want is to utilize k-Nearest Neighbor (kNN) to rearrange the first 10 results to make them more suitable.

We can easily do that through ReactiveSearch pipelines.

We will create a pipeline that overrides the `/{index}/_reactivesearch` endpoint and add a stage to add kNN rearrangement of response data based on our inputs.

## Index Requirements

There are some requirements that need to be satisfied in order to be able to use `kNN` with ElasticSearch or OpenSearch. These include keeping a field or fields in the index that will be of a certain type and contain vector data.

For the sake of example, let's say we will have a field in our index named `name_vector` that will contain the vector data for the field `Name`.

### ElasticSearch

For ElasticSearch, we will have to make the type of the field `dense_vector`. This is necessary so that ElasticSearch understands that the field we are storing vector data to **can** actually contain vector data. Moreover, the `kNN` algorithm requires the field to be of `dense_vector` type in order to sucessfully run.

### OpenSearch

For OpenSearch, we will have to make the type of the field `knn_vector`. This is essentially the `dense_vector` equivalent for OpenSearch and indicates that we will be storing vector data in this field. It is important that the field that we will run `kNN` over be of type `knn_vector`.

## Assumptions

There are various algorithms that can be run on top of a data to get vector representation of it. In this case, for the sake of example, we will be using BERT algorithm to find the vector representation of the data. It is important that we use the same algorithm while indexing the data as well as while searching the data.

This means, while indexing, we will have to run the fields that we want to store as vector (in our case, the `Name` field) through this algorithm. We will also need to run the search query through this algorithm to get the vector representation of the query.

[BERT is developed by Google. Read more about it here](https://blog.google/products/search/search-language-understanding-bert/)

### Running bert-as-service

There are various options out there to run `bert` locally. In our case we will run [bert-as-service](https://github.com/hanxiao/bert-as-service) and use their API to find the vector representation.

## Pre Setups

Now that we know how we are going to implement kNN response manipulation, let's define the basic things in the pipeline.

As explained above, we will override the `_reactivesearch` endpoint which will invoke our pipeline if a `POST` method is defined.

The file will be defined in the following way:

```yaml
enabled: true
routes:
- path: "/{index}/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch
envs:
  bertURL: http://localhost:8125
```

### Environment Variables

We are passing the `bert-as-service` URL through envs so that it can be used in the stages. This is passed through the `bertURL` variable.

## Stages

Now that we have the basic pipeline defined, let's get started with the stages. We will have a few pre-built stages and some custom stages in this pipeline.

> Pre-Built stages are provided by ReactiveSearch to utilize functions from ReactiveSearch API, like hitting ElasticSearch or translating an RS Query to ES Query.

We will have the following stages defined:

1. authorization
2. generate vector
3. kNN Response
4. reactivesearch query
5. es query

### Authorization

This is one of the most important steps in the pipeline. Using this stage we will make sure the user is passing proper credentials to hit the endpoint they are trying to access.

The is a `pre-built` stage provided by ReactiveSearch and can be leveraged in the following way:

```yaml
- id: "authorize user"
  use: "authorization"
```

Yes, just one line will authorize the user, it's as simple as that!

### Generate Vector

Now to the custom stage, as discussed above, we will have to pass the query value through a vector representation algorithm. In this case, we will do just that by using the `bertURL` to convert the passed `query.value` field and save it to context for later use.

We will define this stage using custom JavaScript.

```yaml
- id: generate vector
  scriptRef: "generateVector.js"
  async: true
  continueOnError: false
```

In the above, we have set the following stage fields:

- `async: true`: This indicates that the passed script will run asynchronously. This is important because we will make external API calls through JS.
- `scriptRef`: This field indicates the script files name to execute the content of that file.
- `continueOnError: false`: We are making sure that the execution does not continue when there is an error. This is important because without the vector representation, we won't be able to use the kNN stage.

We can define the `generateVector.js` script in the following way:

```js
async function handleRequest() {
    const requestBody = JSON.parse(context.request.body);
    const vectoredQuery = await getVectorForData(requestBody.query[0].value);
    return { queryVector: vectoredQuery }
}

async function getVectorForData(data) {
    const url = `${context.envs.bertURL}/encode`; const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content - Type': 'application/ json'
        },
        body: JSON.stringify({
            id: 1, texts: [data], is_tokenized: false
        })
    });

    const jsonResponse = JSON.parse(response);
    return jsonResponse.result[0];
}
```

### kNN Response

Now that we have the vector representation of the query value, we can use that in the kNN response stage.

For this, we will use the pre-built `kNN` stage. We can define it in the following way:

```yaml
- id: kNN Response
  use: kNN
  inputs:
    search:
      queryVector: "{{queryVector}}"
      vectorDataField: name_vector
    backend: elasticsearch
    candidates: 10
    script: "cosineSimilarity(params.queryVector, params.dataField) + 1.0"
  needs:
    - generate vector
```

To the `kNN` stage, we are the required data through inputs. These are:

- `search.queryVector`: This is the vector representation of the search query itself.
- `search.vectorDataField`: The field that contains the vector representation of the indexed data. As explained above, this is `name_vector` in our case.
- `backend`: The backend to run this one. This can be either `elasticsearch` or `opensearch`.
- `candidates`: The number of candidates to rearrange. By default set to 10.
- `script`: The script to use in order to determine the kNN. [More on this below](#script-for-knn)

### Reactive Search

Now, we can use the pre-built stage `reactivesearchQuery` to convert the ReactiveSearch query into ElasticSearch query in order to find the search results.

We can do that in the following way:

```yaml
- id: reactivesearch
  use: reactivesearchQuery
```

### Elastic Search

The final stage is to hit ElasticSearch with the translated query and get the response. This can be done by using the pre-built stage `elasticsearchQuery`

This stage can be defined in the following way:

```yaml
- id: elastic search
  use: elasticsearchQuery
```

## Complete Pipeline

Now that all stages are defined, we can have a look at the completed pipeline at once.

```yaml
enabled: true
routes:
- path: "/{index}/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch
envs:
  bertURL: http://localhost:8125

stages:
  - id: "authorize user"
    use: "authorization"
  - id: generate vector
    scriptRef: "generateVector.js"
    async: true
    continueOnError: false
  - id: kNN Response
    use: kNN
    inputs:
      search:
      queryVector: "{{queryVector}}"
      vectorDataField: name_vector
      backend: elasticsearch
      candidates: 10
      script: "cosineSimilarity(params.queryVector, params.dataField) + 1.0"
    needs:
      - generate vector
  - id: reactivesearch
    use: reactivesearchQuery
  - id: elastic search
    use: elasticsearchQuery
```

## Testing the Pipeline

We can hit the pipeline and see if response contains rearranged results based on vector data. We just need to hit a `/_reactivesearch` endpoint and the request will be saved.

For instance, let's hit the `app-store-data` index in the following way:

```sh
curl -X POST http://localhost:8000/app-store-data/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["Name", "Description"]}]}'
```

