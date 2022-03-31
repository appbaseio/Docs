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

## Stages

Now that we have the pre setup out of the way, let's define the stages for the pipeline.

## Authorization

We need to make sure that the requests made to this endpoint are authenticated. To do this, we can use the pre-built stage `authorization`. We can define it in the following way:

```yml
- id: authorize request
  use: authorization
```

It's as simple as that, we don't need to do anything else, rest will be taken care of by the pipeline.

### Search Relevancy

As explained above, this stage lets us set default values for fields so that even if those are not passed in the request body, they are automatically applied. ReactiveSearch pipelines provides this as a pre-built stage in the name `searchRelevancy`.

We will define this stage in the following way:

```yml
- id: search relevancy
  use: searchRelevancy
  inputs:
    search:
      dataField:
        - original_title
      size: 1
    suggestion:
      dataField:
        - original_title
      enablePopularSuggestions: true
      size: 3
      popularSuggestionsConfig:
        size: 1
      enableRecentSuggestions: true
      recentSuggestionsConfig:
        size: 1
  continueOnError: false
```

In the above, we are passing the following fields as inputs:

- `search.dataField`: The field present in the index to be set as `dataField` in the request body.
- `search.size`: The `size` value to be set in the request body if it's not already passed.
- `suggestion.dataField`: This is similar to the above search field but it is applied for `suggestion` type of requests.
- `suggestion.enablePopularSuggestions`: This fields sets the `enablePopularSuggestion` field in the request body if it's not already passed.
- `suggestion.size`: Same as above except this is for `suggestion` type of requests.
- `suggestion.popularSuggestionsConfig.size`: As the name suggests, sets the `size` field for `popularSuggestionsConfig` if it's not already passed in the request body.
- `suggestion.enableRecentSuggestions`: This field indicates whether or not to enable recent suggestions and is set if not already passed in the request body.
- `suggestions.recentSuggestionsConfig.size`: Similar as above except for recent suggestions.

Besides this, we are also setting the `continueOnError` as `false` which indicates that the execution of the pipeline should not continue if this stage fails. This is important since without applying these fields, the request will not be properly translated to the equivalent ElasticSearch request.

### Replace Search Term

At times, we might have the need to replace the search term with something different. This can be achieved by using the pre-built stage `replaceSearchTerm`. We can define it in the following way:

```yml
- id: replace search term
  use: replaceSearchTerm
  inputs:
    data: harry potter
```

We can pass the new search term through the `inputs.data` field.

### Remove Words

At times, we might even want to remove certain words from the search term entered by the user. We can use the pre-built stage `replaceWords` in a situation like this. We can define it in the following way:

```yml
- id: replace words
  use: replaceWords
  inputs:
    data:
      - test
      - rick astley
```

We can pass the words to be removed in the `inputs.data` field. This field should be an array of strings and every word that occurs in this array will be removed from the search term.

### Replace Words

Sometimes, we might have the need to replace certain words with some other words. This can be for any number of reasons like improving search relevancy for the user and so.

We can do that in the following way using the pre-built stage `replaceWords`:

```yml
- id: replace words
  use: replaceWords
  inputs:
    data:
      harry: harry potter
```

We can pass whatever field we want to replace in the `inputs.data` field as an object. Every word matching the `key` in the data field will be replaced with the value passed along with it.

### Add Filter

Adding filter is sometimes an useful function in order to improve the search results. Let's say we want to add a filter to set the `authors` field to `Agatha Christie`. We can do that using the pre-built stage `addFilter`.

That can be achieved in the following way:

```yml
- id: add filter
  use: addFilter
  inputs:
    data:
      authors: Agatha Christie
```

In the above case, we can pass the data through `inputs.data` field. This field should be an object where every key is the field we want to add filter for with the value being the value.

### Reactive Search

Now that we have applied most query rules, let's finally make the ReactiveSearch call. We can do that by using the `reactivesearchQuery`

This can be defined in the following way:

```yml
- id: reactive search query
  use: reactivesearchQuery
```

### Elastic Search Query

Once we have executed the reactivesearch query, we can continue and hit Elastic Search with the **translated** query now. This can be done by using the pre-built stage `elasticsearchQuery` in the following way:

```yml
- id: elasticsearch query
  use: elasticsearchQuery
```
