---
title: 'Create a pipeline with caching and recording analytics'
meta_title: 'Create a pipeline with caching and recording analytics | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a pipeline that supports caching and recording analytics.'
keywords:
    - concepts
    - appbase.io
    - pipelines
    - caching
    - analytics
sidebar: 'docs'
---

ReactiveSearch Pipelines exposes quite a lot of useful stages as pre-built stages. One of them is support for using cache and recording analytics.

**[Deploy this pipeline with one-click](https://dashboard.reactivesearch.io/deploy?template=https://raw.githubusercontent.com/appbaseio/pipelines-template/master/cache_analytics/pipeline_oneclick.json)**

## Pre Setup

Let's define the basics of the pipeline. It will be in the following way:

```yml
enabled: true
description: Pipeline to show how to use cache and record analytics
routes:
  - path: good-books-ds-pipeline/_reactivesearch
    method: POST
    classify:
      category: reactivesearch

envs:
  category: reactivesearch
  index:
    - good-books-ds-pipeline
  urlValues:
    cache: true
```

Note that we have also set the `envs.index` field as `good-books-ds`. This is an _optional_ step but is good practice. The ElasticSearch step reads the index from this step as a fallback.

We are also setting the `envs.category` as `reactivesearch` for reference.

## Stages

Now that we have the pre setup out of the way, let's define the stages for the pipeline.

## Authorization

We need to make sure that the requests made to this endpoint are authenticated. To do this, we can use the pre-built stage `authorization`. We can define it in the following way:

```yml
- id: authorize request
  use: authorization
```

It's as simple as that, we don't need to do anything else, rest will be taken care of by the pipeline.

### Use Cache

This stage will utilize the pre-built stage `useCache` to enable caching. This can be done in the following way:

```yml
- id: enable caching
  use: useCache
```

It is as simple as that. We can just add a stage and forget about it, everything else is taken care of automatically.

### Reactive Search Query

We will use the pre-built stage `reactivesearchQuery` for this stage. We will be converting the RS Query to ES Query in this stage.

We can define this stage in the following way:

```yaml
- id: reactive search query
  use: reactivesearchQuery
```

### Elastic Search Query

The final stage, we make the ES call and return the response accordingly. At this stage, the request body should be converted to the ES body so that ES can understand it.

We will be using the pre-built stage `elasticsearchQuery` at this stage.

We can define this stage in the following way:

```yaml
- id: elastic search query
  use: elasticsearchQuery
```

### Record Analytics

Now that the ES request is complete, we can start recording the analytics. This can be done by using the pre-built stage `recordAnalytics`.

It can be used in the following way:

```yml
- id: record analytics
  use: recordAnalytics
```

## Complete Pipeline

Now that all the stages are defined, let's take a look at the whole pipeline at once:

```yml
enabled: true
description: Pipeline to show how to use cache and record analytics
routes:
  - path: good-books-ds-pipeline/_reactivesearch
    method: POST
    classify:
      category: reactivesearch

envs:
  category: reactivesearch
  index:
    - good-books-ds-pipeline
  urlValues:
    cache: true

stages:
  - use: authorization
  - use: useCache
  - use: reactivesearchQuery
    continueOnError: false
  - use: elasticsearchQuery
    continueOnError: false
  - use: recordAnalytics
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

We can hit the pipeline and see if cache is being applied and the analytics being recorded. Following request will probably cache the request because it is a ReactiveSearch request.

> NOTE: Cache should not be disabled and should be a valid feature.

```sh
curl -X POST CLUSTER_URL/good-books-ds-pipeline/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["Name", "Description"]}]}'
```

Continuously hitting the above endpoint will start returning the response way quicker (not noticeable through bare eyes, but `time_took` will indicate that).