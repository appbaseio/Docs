---
title: 'Add External Search Results'
meta_title: 'Add External Search Results | Introduction to Appbase.io'
meta_description: 'Learn how to add external search results for a query'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - external
    - search
sidebar: 'docs'
---

# External Search Results

ReactiveSearch already provides a lot of flexibility for searching indexes. However, leveraging the ReactiveSearch Pipelines, we can even add external search results to a querys response and return them to the user accordingly.

ReactiveSearch provides the `/{index}/_reactivesearch` endpoint that users can use to get search results. We will build on top of this endpoint.

## Example Scenario: Add results from Googles Knowledge Graph

Let's say we want to override the `/_reactivesearch` endpoint to add Googles Knowledge Graph data to the final response that is being returned to the user.

We can do that very easily using the Pipelines. We just need to have a stage that will hit Knowledge Graph API and fetch the results and before the response is returned, we add the results to that response.

## Pre Setup

Before we get started with the pipeline stages, let's define the route first. As explained above, we will override the `_reactivesearch` endpoint. This endpoint expects a `POST` so we will make the route be invoked when a POST method is sent.

The file will be defined in the following way

```yaml
enabled: true
description: Add Knowledge Graph Data to response

routes:
  - path: /{index}/_reactivesearch
    method: POST
    classify:
      category: reactivesearch

envs:
  knowledgeGraphAPIKey: "someAPIkey"
```

In the above file, we are also defining an `envs.knowledgeGraphAPIKey` that is being used to hit the Knowledge Graph API. This is necessary to be able to use the API properly.

## Stages

Let's get started with the stages. We will have a few stages that will be explained below. We will start with the most important stage: `authorization`.

The following stages will be used in this pipeline:

1. authorize user
2. reactivesearch
3. google knowledge graph
4. es query
5. merge response

### Authorize User

This is the first step and is important whenever we define a pipeline. This is because the `authorization` stage will make sure that the credentials passed can access the operation that is being done.

We can use the pre-built stage `authorization` for this stage. That can be done in the following way:

```yaml
- id: authorze user
  uses: authorization
```

Yes, that's it. We will take care of the authorization in just two lines of code.

### ReactiveSearch

Now that we know the user has access to this endpoint, let's convert the request body. This stage will convert the passed request body to the equivalent ElasticSearch body so that it can be hit in the following stages.

We can use the pre-built stage `reactivesearchQuery` for this stage. That can be done in the following way:

```yaml
- id: reactivesearch
  uses: reactivesearchQuery
```

Above stage will automatically update the body in the context as well as update the URL that the elasticsearch stage will use. This is an essential step.

### Google Knowledge Graph

We are finally at the stage where we will hit Google's Knowledge Graph API. Before we start defining this stage, there are a few things we need to keep in mind:

#### Things to Note

- This stage will be run asynchronously because external calls will be made that needs to be awaited. The `async: true` field will be used to do so.
- This stage will utilize the `knowledgeGraphAPIKey` key from the `envs` to make the request.


This stage can be defined in the following way

```yaml
- id: google knowledge graph
  scriptRef: "knowledgeGraph.js"
  async: true
```

In the above stage, we are refering to a JavaScript file `knowledgeGraph.js`. We will need to define this file with some JavaScript code. When this stage will be executed, this file will be invoked.

```js
async function handleRequest() {
    try {
        const URL = `https://kgsearch.googleapis.com/v1/entities:search?query=${context.envs.query}&key=${context.envs.knowledgeGraphAPIKey}&limit=1&indent=True`;
        const responseBody = await fetch(URL);
        const response = JSON.parse(responseBody);
        return { knowledge_graph: response }
    } catch (e) { } return context;
}
```

In the above script, as described, we are hitting the knowledge graph API. Once we have the response, we are adding that to the context with the key `knowledge_graph`.

> Note that async stages are not allowed to update already exisiting fields in the context. They can however, add new fields to the context.

### ElasticSearch Query

Let's now hit ElasticSearch to get the response from ES. As explained before, we have already updated the request body to make it acceptable by ElasticSearch.

We can now use the pre-built stage `elasticsearchQuery` to hit Elastic Search.

We can do that in the following way:

```yaml
- id: es query
  uses: elasticsearchQuery
```

It's as straightforward as that to hit ElasticSearch. This will automatically update the `context.response` field with whatever ElasticSearch returns.

## Merge Response

Now that we have both knowledge graph and Elastic Search response, we can finally merge the responses together so that the user gets both of them.

We can do that by defining a script. Note that this script will run synchronously so it **will** be able to update the `response` body.

We will define the stage in the following way:

```yaml
- id: merge response
  scriptRef: "mergeResponse.js"
  needs:
    - es query
    - google knowledge graph
```

In the above, we are using the `needs` property to indicate that this stage will be executed only after the _needed_ stages are completed.

We are refering to a `mergeResponse.js` that we will define in the following way

```js
function handleRequest() {
    const esResponse = JSON.parse(context.elasticsearchQuery);
    const knowledgeGraph = context['knowledge_graph'];
    return {
        ...context, response: {
            ...context.response,
            body: JSON.stringify({ ...esResponse, knowledgeGraph })
        }
    }
}
```

In the above script, we are merging the responses from Elastic Search and Knowledge Graph and completing the final stage. Now the response will contain both responses inside.

## Complete Pipeline

Now that all stages are complete, let's take look at the complete pipeline at once

```yaml
enabled: true
description: Add Knowledge Graph Data to response

routes:
  - path: /{index}/_reactivesearch
    method: POST
    classify:
      category: reactivesearch

envs:
  knowledgeGraphAPIKey: "someAPIkey"

stages:
  - id: authorze user
    uses: authorization
  - id: reactivesearch
    uses: reactivesearchQuery
  - id: google knowledge graph
    scriptRef: "knowledgeGraph.js"
    async: true
  - id: es query
    uses: elasticsearchQuery
  - id: merge response
    scriptRef: "mergeResponse.js"
    needs:
      - es query
      - google knowledge graph
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'http://APPBASE_id/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml" --form "knowledgeGraph.js=knowledgeGraph.js" --form "mergeResponse.js=mergeResponse.js"
```

## Testing the pipeline

Now that we have the pipeline in place, let's try it out. Following cURL request sends a search query to the `/app-store-data/_reactivesearch` endpoint.

```sh
curl -X POST 'http://localhost:8000/app-store-data/_reactivesearch' -H "Content-Type: application/json" -d '{"query": [{"id": "test search", "value": "sudoku", "dataField": ["Name", "Description"], "includeFields": ["Name", "Description"]}]}' 
```

Above, cURL requests response should include a `knowledge_graph` field with the search results inside.
