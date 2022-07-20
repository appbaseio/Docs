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



## Pipeline ID 

Auto-generated unique identifier for pipeline.

## Enable Pipeline 

Set as 'false' to disable a Pipeline. Defaults to 'true'.

## Description 

Description of pipeline.

## Priority 

In case of a conflict in pipeline routes, the pipeline with highest priority would get invoked.

## Routes  *required

Pipeline routes.

### Path  *required

Route path. For example, '/books-search'

### Method  *required

HTTP method for route.

### Record Logs 

If set to 'true', then Appbase would record logs for the pipeline route. Defaults to 'false'.

### Classify Route 

Useful to categorize the route.

#### Category  *required

Route category.

**Following values are supported for this field**

`docs`, `search`, `indices`, `cat`, `clusters`, `misc`, `user`, `permission`, `analytics`, `streams`, `rules`, `suggestions`, `auth`, `reactivesearch`, `searchrelevancy`, `synonyms`, `searchgrader`, `uibuilder`, `logs`, `cache`, `storedquery`, `sync`, `pipelines`

#### ACL 

It a sub-category of category.

**Following values are supported for this field**

`cat`, `bulk`, `cluster`, `search`, `remote`, `create`, `count`, `scripts`, `delete`, `doc`, `source`, `field_caps`, `close`, `analyze`, `exists`, `get`, `template`, `explain`, `indices`, `alias`, `aliases`, `delete_by_query`, `cache`, `index`, `mapping`, `flush`, `forcemerge`, `upgrade`, `settings`, `open`, `recovery`, `mappings`, `rollover`, `refresh`, `segments`, `shrink`, `split`, `shard_stores`, `stats`, `ingest`, `validate`, `msearch`, `mget`, `nodes`, `mtermvectors`, `reindex`, `update_by_query`, `render`, `rank_eval`, `search_shards`, `snapshot`, `tasks`, `termvectors`, `update`

## Pipeline Environments 

Useful to define custom environment variables which could be accessed by stages during pipeline execution.

## Trigger Expression 

Trigger expression is to define the condition of Pipeline invocation. For example, only execute pipeline if query is 'mobile phones'. Check the documentation at [here](https://docs.appbase.io/docs/search/rules/#configure-if-condition).

### Trigger Type 

Type of trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#configure-if-condition).

**Following values are supported for this field**

`always`, `filter`, `index`, `query`, `cron`

### Trigger Expression 

Custom trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#advanced-editor).

### Timeframe 

To define the valid timeframe for trigger expression.

#### start_time 

#### end_time 

## Stages  *required

Pipeline stages

### Pre-built Stage 

Use a pre-built stage from Appbase.

**Following values are supported for this field**

`authorization`, `elasticsearchQuery`, `reactivesearchQuery`, `useCache`, `recordAnalytics`, `promoteResults`, `hideResults`, `customData`, `replaceSearchTerm`, `addFilter`, `removeWords`, `replaceWords`, `searchRelevancy`, `kNN`, `httpRequest`, `mongoDBQuery`, `solrQuery`

### Stage Id 

User-defined unique identifier for stages. It is useful to define stage dependencies using 'needs' property.

### Enabled 

Set to 'false' to disable a stage. Defaults to 'true'.

### Execute Asynchronously 

If set to 'true', then stage would get executed in parallel to other stages. Async stages can not modify the global 'request' and 'response' properties. Although, you can define a synchronous stage to consume the data of async stage (would be present in global context with stage id) to modify the global request/response.

### Script 

Custom script to modify the request/response. You can also write custom variables to global context which can be consumed by other stages.

### Script Reference 

Path to script file.

### Continue on Error 

If set to 'false' and an error occurs in stage execution, then Pipeline execution would stop immediately with an error.

### Stage Inputs 

Inputs required for a pre-built stage execution. The inputs structure may vary for each stage.

### Needs 

Useful to define the dependencies among stages. For example, if stage 'A' depends on stages 'B' and 'C' then stage 'A' would define 'needs' property as ['B', 'C']. Stage 'A' would only get executed once the stages 'B' and 'C' are completed.

### Description 

User-defined description for stage.

### Trigger 

Trigger will indicate whether or not to trigger the stage.

#### Trigger Expression 

Custom trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#advanced-editor).

## Global Envs 

Global Envs will be saved to the cluster and can be used in the pipeline.

### id 

### label 

### key 

### value 

### description 

### validate 

#### url 

#### method 

#### body 

#### headers 

#### expected_status 

### created_at 

### updated_at 

