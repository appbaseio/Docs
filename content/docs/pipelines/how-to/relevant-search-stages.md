---
title: 'Implement Relevant Search with Pipelines'
meta_title: 'Relevant Search Pipeline | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a relevant search pipeline with ReactiveSearch'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - relevant
sidebar: 'docs'
---

ReactiveSearch provides quite a lot of options to modify the search query before it reaches ElasticSearch. There are functionality like replace search, remove words etc. These are all provided in pipelines as well through pre-built stages.

In this guide, we will build a pipeline that overrides the `_reactivesearch` endpoints and uses pre-built stages to manipulate the query before it reaches ElasticSearch.

## Pretext

Before pipelines, this functionality was provided through Query rules. These rules can be created by the user and they take effect in order to manipulate certain queries before it reaches ElasticSearch. This is useful in cases like when there are certain terms that needs to be filtered out.

## Relevant Search

In order to build a pipeline that implements _relevant_ search, we will utilize the following pre-built stages. Here's a brief description of what each one of them will do:

- `searchRelevancy`: This stage provides support to apply settings to the ReactiveSearch API body. This is useful to apply default setting to fields like `dataField` which otherwise will throw an error on not being passed from the client.
- `replaceSearchTerm`: This stage provides functionality to replace the search term entered by the user.
- `removeWords`: As the name suggests, this stage allows removing words from the search term.
- `replaceWords`: This stage allows replacing words in the search term.
- `addFilter`: Add filter allows adding filters to the search query.
- `promotResults`: This stage allows _injecting_ results to certain positions in the response.
- `hideResults`: This stage allows hiding certain results based on the `_id` field matched.
- `customData`: This stage allows adding custom data to the response body

Now that we briefly know about the stages that can help us make search more relevant, let's go through the assumptions.

## Assumptions

For the purpose of example, we will be working with an index called `good-books-ds` that contains data about books. It is important to understand what index we will be working with in order to understan the stages being applied.

While overriding the `_reactivesearch`, we will specify to override just the `good-books-ds` index and the method will be **POST** that will invoke the pipeline.

## Pre Setup

Let's define the basics of the pipeline. It will be in the following way:

```yml
enabled: true
description: Pipeline to implement relevant search
routes:
- path: good-books-ds/_reactivesearch
  method: POST
  classify:
    category: reactivesearch
envs:
  category: reactivesearch
  index:
  - good-books-ds
```

Note that we have also set the `envs.index` field as `good-books-ds`. This is an _optional_ step but is good practice. The ElasticSearch step reads the index from this step as a fallback.

We are also setting the `envs.category` as `reactivesearch` for reference.