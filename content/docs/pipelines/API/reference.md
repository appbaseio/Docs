---
title: 'API Reference | ReactiveSearch Pipelines'
meta_title: 'ReactiveSearch Pipelines API Reference'
meta_description: 'ReactiveSearch Pipelines API Reference. Learn about all the properties of ReactiveSearch Pipelines API'
keywords:
    - concepts
    - appbase
    - pipelines
    - api
    - reactivesearch
sidebar: 'docs'
---

This guide explains all the properties for the ReactiveSearch Pipelines API and how to use them to get the best out of the Pipelines API.



## Description

Description of pipeline.

This can be a brief explanation of what the pipeline does, this is useful for better understanding of what the pipeline is actually doing.

## Enable Pipeline

Set as 'false' to disable a Pipeline. Defaults to 'true'.

This field can be used to disable a pipeline to test some effect or in scenarios where the pipeline might need to be disabled.

## Pipeline Environments

Useful to define custom environment variables which could be accessed by stages during pipeline execution.

[Read more about pipeline environments over here](/docs/pipelines/concepts/envs-for-stage)

## Global Envs

Global Envs will be saved to the cluster and can be used in the pipeline.

### created_at

### Description

Description of the global variable to indicate what exactly this variable is for.

### Variable ID

Unique Identifier for the Global variable.

### Key

Key of the global variable. This key can be used to use this global variable in the pipeline.

### Label

Name of the global variable for reference and to be shown in the UI.

### updated_at

### Validate

To validate the entered value of the global variable. This field can be used to validate the value entered for the current variable by following the specified validators.

#### Body

At times, there might be the need to pass the body in a response in order to get the `expected_status`. This is also supported by passing the body in the `body` field.

The body should be passed as a **string**. If JSON, this should be a stringified JSON.

#### Expected Status

The `expected_status` field is used to make sure the validation was successful. It is an integer that should match the status code of the validate request when it is successful.

#### Headers

Headers can be essential to alter the response received from hitting a particular URL. Headers can be passed during validating by using the `headers` field.

For eg, a `Content-Type` header can be passed in the following way:

```yml
global_envs:
  - label: ES URL
    key: ES_URL
    value: http://localhost:9200
    validate:
      headers:
        "Content-Type": "application/json"
```

#### Method

It might be important to specify the method field in order to get the `expected_status`. This can be done by passing the method as a string. By default the value is set to `GET`.

Some of the other valid options are:

- `POST`
- `PUT`
- `PATCH`

#### URL

The `url` field is used to specify the URL that is supposed to be hit during validating the global environment before adding it.

### Value

Value of the global variable. This can be considered the most important field of the global variable since this will contain the value of the global variable.

## Pipeline ID

Auto-generated unique identifier for pipeline.

## Priority

In case of a conflict in pipeline routes, the pipeline with highest priority would get invoked.

Priority is an important and useful field. This can be used to set the order in which pipelines with same route can be executed when a request comes.

## Routes

**This is a required field**

**This is a required field**

Pipeline routes.

Routes is an array of route which essentially indicates which routes the pipeline will be listening to. In other words, which routes will trigger the pipeline can be defined using this field.

Following is an example of routes:

```yml
routes:
  - path: good-books-ds-pipeline/_reactivesearch
    method: POST
    classify:
      category: reactivesearch
```

Above code indicates that the pipeline will be triggered if the route is `good-books-ds-pipeline/_reactivesearch` and the method is `POST`.

### Classify Route

Useful to categorize the route. This is extremely useful to understand what kind of request is being sent through the route is suggested to be used in all pipeline definitions as ReactiveSearch way better when this is defined properly.

#### ACL

It a sub-category of category.

This can be thought of as narrowing down the type of route. For eg, if category is the type of fruits, sub category can be type of a particular fruit. So Apple can be considered a category and Red or Green apples can be considered ACL's of Apple.

**Following values are supported for this field**

`cat`, `bulk`, `cluster`, `search`, `remote`, `create`, `count`, `scripts`, `delete`, `doc`, `source`, `field_caps`, `close`, `analyze`, `exists`, `get`, `template`, `explain`, `indices`, `alias`, `aliases`, `delete_by_query`, `cache`, `index`, `mapping`, `flush`, `forcemerge`, `upgrade`, `settings`, `open`, `recovery`, `mappings`, `rollover`, `refresh`, `segments`, `shrink`, `split`, `shard_stores`, `stats`, `ingest`, `validate`, `msearch`, `mget`, `nodes`, `mtermvectors`, `reindex`, `update_by_query`, `render`, `rank_eval`, `search_shards`, `snapshot`, `tasks`, `termvectors`, `update`

#### Category

**This is a required field**

Route category.

This indicates the category of the route. This is useful for the internal functioning of the pipeline.

**Following values are supported for this field**

`docs`, `search`, `indices`, `cat`, `clusters`, `misc`, `user`, `permission`, `analytics`, `streams`, `rules`, `suggestions`, `auth`, `reactivesearch`, `searchrelevancy`, `synonyms`, `searchgrader`, `uibuilder`, `logs`, `cache`, `storedquery`, `sync`, `pipelines`, `ai`

### Method

**This is a required field**

HTTP method for route.

This indicates the method which if it hits the route then the pipeline will be triggered.

### Path

**This is a required field**

Route path. For example, '/books-search'.

[More can be read about the route matching process here](/docs/pipelines/concepts/execution-process).

### Record Logs

If set to 'true', then Appbase would record logs for the pipeline route. Defaults to 'false'.

## Stages

**This is a required field**

**This is a required field**

Pipeline stages.

Stages can be thought of as steps of the pipeline that are executed (not always in the order of specification).

Following is an example of pipeline stages:

```yml

stages:
  - use: authorization
  - use: useCache
  - id: echo something
    script: "console.log(\'Echoing something from a JS script instead of shell!\');"
  - use: reactivesearchQuery
    continueOnError: false
  - use: elasticsearchQuery
    continueOnError: false
  - use: recordAnalytics
```

Above uses some pre-built stages as well as a stage where the `script` field is used to just run some custom JavaScript. More can be read about the pre-built stages in the following section.

### Execute Asynchronously

If set to 'true', then stage would get executed in parallel to other stages. Async stages can not modify the global 'request' and 'response' properties. Although, you can define a synchronous stage to consume the data of async stage (would be present in global context with stage id) to modify the global request/response.

### Continue on Error

If set to 'false' and an error occurs in stage execution, then Pipeline execution would stop immediately with an error.

### Description

User-defined description for stage.

### Enabled

Set to 'false' to disable a stage. Defaults to 'true'.

### Stage Id

User-defined unique identifier for stages. It is useful to define stage dependencies using 'needs' property.

### Stage Inputs

Inputs required for a pre-built stage execution. The inputs structure may vary for each stage.

### Needs

Useful to define the dependencies among stages. For example, if stage 'A' depends on stages 'B' and 'C' then stage 'A' would define 'needs' property as ['B', 'C']. Stage 'A' would only get executed once the stages 'B' and 'C' are completed.

### Script

Custom script to modify the request/response. You can also write custom variables to global context which can be consumed by other stages.

### Script Reference

Path to script file.

This is similar to _script_, except that it accepts a path to a file instead of an inline string. This is useful for cases where there is a very large JS script that needs to be used in one or more stages of a pipeline.

### Trigger

Trigger will indicate whether or not to trigger the stage.

#### Trigger Expression

Custom trigger expression. You can read more at [here](https://docs.reactivesearch.io/docs/search/rules/#advanced-editor).

### Pre-built Stage

Use a pre-built stage from Appbase.

**Following values are supported for this field**

`authorization`, `elasticsearchQuery`, `reactivesearchQuery`, `useCache`, `recordAnalytics`, `promoteResults`, `hideResults`, `customData`, `replaceSearchTerm`, `addFilter`, `removeWords`, `replaceWords`, `searchRelevancy`, `kNN`, `httpRequest`, `mongoDBQuery`, `solrQuery`, `zincQuery`, `recordClick`, `recordConversion`, `recordFavorite`, `recordSaveSearch`, `searchboxPreferences`, `boost`, `openAIEmbeddings`, `openAIEmbeddingsIndex`, `AIAnswer`

## Trigger Expression

Trigger expression is to define the condition of Pipeline invocation. For example, only execute pipeline if query is \'mobile phone\'. Check the documentation at [here](https://docs.reactivesearch.io/docs/search/rules/#configure-if-condition).

Following is an example trigger for a pipeline that searches for mobile phones:

```yml
trigger:
  type: always
  expression: $query exactlyMatches "iphone x"
```

Above trigger will **always** run and execute the expression provided to it.

### Trigger Expression

Custom trigger expression. You can read more at [here](https://docs.reactivesearch.io/docs/search/rules/#advanced-editor).

### Timeframe

To define the valid timeframe for trigger expression.

#### end_time

#### start_time

### Trigger Type

Type of trigger expression. You can read more at [here](https://docs.reactivesearch.io/docs/search/rules/#configure-if-condition).

**Following values are supported for this field**

`always`, `filter`, `index`, `query`, `cron`

## validateContext

