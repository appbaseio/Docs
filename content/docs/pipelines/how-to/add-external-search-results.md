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

# Add External Search Results

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
