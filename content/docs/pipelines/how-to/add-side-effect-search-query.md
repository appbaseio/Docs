---
title: 'Add Side Effect to Search Query'
meta_title: 'Add Side Effect to Search Query | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a side effect with ReactiveSearch Pipelines'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
    - side effect
sidebar: 'docs'
---

# Side Effect to a Search Query

At times, we might need to add some side effects to a search query. Side effects can be anything that are invoked when a search query is hit. By using the ReactiveSearch Pipelines, we can easily implement something like this.

We can override the `/{index}/_reactivesearch` endpoint and add a step that adds some side effect before the query is completed.

## Example Scenario: Save a search query before the query

At times, we might want to keep track of the search query body everytime the `_reactivesearch` endpoint is hit. We can implement this behaviour pretty easily with a pipeline.

## Pre Setup

Before we get started with the stages, let's go over the basic details of the pipeline. As explained above, we will override the `_reactivesearch` endpoint. This endpoint is invoked when the endpoint gets a `POST` method.

The file will be defined in the following way.

```yaml
enabled: true
description: Pipeline to save search to an Elasticsearch index
routes:
- path: "/side-effect/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch

envs:
  saved_search_index: savedsearch
  saved_search_credentials: foo:bar
```

### Environment Variables

Since we will be making an internal request to ElasticSearch (in order to save the search request), we need to pass some environment variables so that we can use them in the script.

We are storing the following variables:

- `saved_search_index`: The saved search index to save the request to
- `saved_search_credentials`: The credentials to hit the API with.

## Stages

We will have a few stages in the pipeline. We will be mostly using pre-built stages except one custom stage. We will utilize the custom stage to save the search request to the saved search index.

> Pre-Built stages are provided by ReactiveSearch to utilize functions from ReactiveSearch API, like hitting ElasticSearch or translating an RS Query to ES Query.

The following stages will be used in the pipeline:

1. Authorize User
2. Save Search
3. Reactive Search Query
4. Elastic Search Query

### Authorize User

This is one of the most important steps in the pipeline. Using this stage we will make sure the user is passing proper credentials to hit the endpoint they are trying to access.

The is a `pre-built` stage provided by ReactiveSearch and can be leveraged in the following way:

```yaml
- id: "authorize user"
  use: "authorization"
```

Yes, just one line will authorize the user, it's as simple as that!

### Save Search

Before we translate the query, lets create the side effect to store the search. We will use a custom JavaScript script that will execute asynchronously.

The script needs to run asynchronously because it will be making external API calls and we need to _await_ the response.

We will pass the `async: true` flag to make the script run asynchronously.

It can be defined in the following way:

```yaml
- id: "save search"
  async: true
  scriptRef: "saveSearch.js"
```

In the above stage, we are referencing the `saveSearch.js` file. We will have to define the script in the following way:

```js
async function handleRequest() {
    try {
        const res = await fetch(
            `http://${context.envs.origin}/${context.envs.saved_search_index}/_doc`,
            {
                method: 'POST',
                body: context.request.body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(context.envs.saved_search_credentials)}`
                }
            });
    } catch (e) { console.log('error', e); } return {};
}
```

This stage will use the environment variables to store the request body by making a **POST** request to the `/_doc` endpoint.

### Reactive Search Query

We will use the pre-built stage `reactivesearchQuery` for this stage. We will be converting the RS Query to ES Query in this stage.

Since the above stage is async, we also need to make sure that that stage is completed before this stage so that the request is actually properly stored.

We can define this stage in the following way:

```yaml
- id: reactive search query
  use: reactivesearchQuery
  needs:
    - save search
```

### Elastic Search Query

The final stage, we make the ES call and return the response accordingly. At this stage, the request body should be converted to the ES body so that ES can understand it.

We will be using the pre-built stage `elasticsearchQuery` at this stage.

We can define this stage in the following way:

```yaml
- id: elastic search query
  use: elasticsearchQuery
```

## Complete Pipeline

Now that all the stages are defined, let's take a look at the whole pipeline at once:

```yaml
enabled: true
description: Pipeline to save search to an Elasticsearch index
routes:
- path: "/side-effect/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch

envs:
  saved_search_index: savedsearch
  saved_search_credentials: foo:bar

stages:
  - id: "authorize user"
    use: "authorization"
  - id: "save search"
    async: true
    scriptRef: "saveSearch.js"
  - id: reactive search query
    use: reactivesearchQuery
    needs:
      - save search
  - id: elastic search query
    use: elasticsearchQuery
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'http://APPBASE_id/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml" --form "saveSearch.js=saveSearch.js"
```

## Testing the Pipeline

We can hit the pipeline and see if the request is being saved to the index. We just need to hit a `/_reactivesearch` endpoint and the request will be saved.

For instance, let's hit the `app-store-data` index in the following way:

```sh
curl -X POST CLUSTER_URL/side-effect/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["Name", "Description"]}]}'
```