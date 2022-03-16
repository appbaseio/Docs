---
title: 'Create an indexing pipeline'
meta_title: 'Create an indexing pipeline | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create an indexing pipeline with ReactiveSearch'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - indexing
sidebar: 'docs'
---

# Indexing Pipeline

ElasticSearch provides endpoints like `/_doc` to index documents. ReactiveSearch API exposes these endpoints for external use directly (given you have proper credentials).

However, let's say we want to build an indexing endpoint on steroids. Something that lets the users send a request body to be indexed and then, some fields are added to this body before it reaches ElasticSearch.

## How?

ReactiveSearch Pipelines makes it very easy to override any endpoint. We just need to add a pipeline that gets invoked by the endpoint that we want to override and voila, we have a custom endpoint that works exactly how we want it to work.

## Example Scenario: Add location details based on passed IP

Let's take an example. We want to index data of an user. This users data also includes an `ip` field that indicates the IP address from where they signed up. We want to extract their location details and save it to the index as well.

So our pipeline will basically _intercept_ the document to be indexed, add a new field to it and then send it to ElasticSearch.

## Pre Setup

Before we start with the pipeline stages, let's setup the routes and other prerequisites of a pipeline. We want this pipeline to be invoked whenever data is to be indexed to the `user-info` index. So we can define it in the following way

```yaml
enabled: true
description: Index data into user-info with a location field

routes:
  - path: /user-info/_doc
    method: POST
      classify:
        category: elasticsearch
        acl: index
```

We are setting the category as `elasticsearch` because this will eventually lead to an elasticsearch call. Think of `acl` like a nested category that specifies exactly what the operation is. Here `index` as `acl` works perfectly as we are creating an indexing pipeline.

## Stages

We will have a few stages in this pipeline. We will start with the most important stage: `authorization`. Following stages will be executed:

1. authorise user
2. get location details
3. add details to body
3. index data

### Authorise User

This is one of the most important stages while defining a pipeline. We want to use the pre-built `authorization` stage which will make sure that the request contains credentials to access the endpoint being invoked.

This is important to make sure only the proper credentials can index data into the pipeline.

We can use this stage in the following way:

```yaml
- id: authorise user
  uses: authorization
```

Yes, as simple as that, we will take care of the rest.