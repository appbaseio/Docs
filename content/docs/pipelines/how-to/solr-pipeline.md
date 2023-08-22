---
title: 'Create a pipeline with Solr as Backend'
meta_title: 'Create a pipeline with Solr as Backend | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a pipeline that uses Solr as a backend'
keywords:
    - concepts
    - appbase.io
    - pipelines
    - fusion
    - solr
sidebar: 'docs'
---

ReactiveSearch supports Solr as a valid backend. This means, instead of using ElasticSearch, Solr can also be used and all the features of ReactiveSearch can be used along with that.

**[Deploy this pipeline with one-click](https://dashboard.reactivesearch.io/deploy?template=https://raw.githubusercontent.com/appbaseio/pipelines-template/master/solr/pipeline_oneclick.json)**

## Pre Setup

Let's define the basics of the pipeline. It will be in the following way:

```yml
enabled: true
routes:
- path: "/_solr/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch
- path: "/_solr/_reactivesearch.v3"
  method: POST
  classify:
    category: reactivesearch

envs:
  FUSION_CREDS: ${{FUSION_CREDS}}
  FUSION_HOST: ${{FUSION_HOST_IP}}
```

Note that we have set `FUSION_CREDS` and `FUSION_HOST` as environment variables because these values are required for Solr to work properly.

## Stages

Now that we have the pre setup out of the way, let's define the stages for the pipeline.

### Authorization

We need to make sure that the requests made to this endpoint are authenticated. To do this, we can use the pre-built stage `authorization`. We can define it in the following way:

```yml
- id: auth
  use: authorization
```

It's as simple as that, we don't need to do anything else, rest will be taken care of by the pipeline.

### Extract app and profile

Fusion also requires an `app` and `profile` value in order to work properly. These values can be passed by the user through the `metadata` field in the root of the body.

It can be passed in the following way:

```json
{
    "query": [{"id": "test"}],
    "metadata": {
        "app": "someApp",
        "profile": "someProfile"
    }
}
```

The values are extracted from the request and set in the context so that they can be accessed directly in the inputs.

A custom JS script is used to do that. It is defined in the following way:

```js
function handleRequest() {
    const body = JSON.parse(context.request.body);
    const metadata = body.metadata;
    if (metadata == undefined || metadata.app == undefined || metadata.profile == undefined) {
        throw Error('`metadata.app` and`metadata.profile`are required fields!');
    } return {
        fusionApp: metadata.app, fusionProfile: metadata.profile
    }
}
```

This file should be saved in the same directory as the pipeline with the name `extractMetadata.js` and then referenced in the pipeline in the following way:

```yml
- id: extract metadata and profile
  scriptRef: "extractMetadata.js"
  continueOnError: false
```

### Extract Environments

Since the environments are used, we need to set them in context so they can be used directly as inputs. Following JS script can be used to convert the environments and set them in the context.

```js
function handleRequest() {
    return {
        "fusionHost": context.envs.FUSION_HOST,
        "fusionCreds": context.envs.FUSION_CREDS
    }
}
```

The above script can be used with a `scriptRef` in the following way:

```yml
- id: set environments
  scriptRef: setEnvironment.js
  continueOnError: false
```

Note that the above script should be saved as `setEnvironment.js` in order for the pipeline to understand the scriptRef.

### ReactiveSearch Query

Now that the values are extracted, we can use the reactivesearch stage to convert the request body into it's Solr equivalent. This can be done by just passing the `inputs.backend` field to the stage as `solr`.

It can be defined in the following way:

```yml
- id: reactivesearch query
  use: reactivesearchQuery
  inputs:
    backend: solr
  continueOnError: false
```

### Solr Query

Once that the request is converted, it can now be hit accordingly and the response can be fetched. This can be done by using the pre-built stage `solrQuery` in the following way:

```yml
- id: solr query
  use: solrQuery
  continueOnError: false
  inputs:
    protocol: http
    host: "{{fusionHost}}"
    app: "{{fusionApp}}"
    profile: "{{fusionProfile}}"
    credentials: "{{fusionCreds}}"
```

The values are passed dynamically through context and hence have the braces around them for automatic resolution.

## Complete Pipeline

Now that all the stages are defined, let's take a look at the whole pipeline at once:

```yml
enabled: true
routes:
- path: "/_solr/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch
- path: "/_solr/_reactivesearch.v3"
  method: POST
  classify:
    category: reactivesearch

envs:
  FUSION_CREDS: ${{FUSION_CREDS}}
  FUSION_HOST: ${{FUSION_HOST_IP}}

stages:
- id: auth
  use: authorization
- id: extract app and profile
  scriptRef: 'extractMetadata.js'
  continueOnError: false
- id: extract fusion host and credentials
  scriptRef: 'setEnvironment.js'
  continueOnError: false
- id: rs
  use: reactivesearchQuery
  inputs:
    backend: solr
  continueOnError: false
- id: solr_query
  use: solrQuery
  continueOnError: false
  inputs:
    protocol: http
    host: "{{fusionHost}}"
    app: "{{fusionApp}}"
    profile: "{{fusionProfile}}"
    credentials: "{{fusionCreds}}"
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_ID/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml" --form "setEnvironment.js=setEnvironment.js" --form "extractMetadata.js=extractMetadata.js"
```

## Testing the Pipeline

We can hit the pipeline endpoint now to see Solr working live. Use the following request to hit Solr and get the response in the ReactiveSearch format.

```sh
curl -X POST CLUSTER_URL/good-books-ds-pipeline/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["name_s"]}]}'
```

Above request should return a response with search results (considering there are results matching the search term) in the ReactiveSearch format.