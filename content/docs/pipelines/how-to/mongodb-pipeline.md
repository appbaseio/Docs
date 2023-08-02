---
title: 'Create a pipeline with MongoDB as Backend'
meta_title: 'Create a pipeline with MongoDB as Backend | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a pipeline that uses MongoDB as a backend'
keywords:
    - concepts
    - appbase.io
    - pipelines
    - mongoDB
    - reactivesearch
sidebar: 'docs'
---

ReactiveSearch supports MongoDB as a valid backend. This means, instead of using ElasticSearch, Solr can also be used and all the features of ReactiveSearch can be used along with that.

**[Deploy this pipeline with one-click](https://dashboard.reactivesearch.io/deploy?template=https://raw.githubusercontent.com/appbaseio/pipelines-template/master/mongodb/pipeline_oneclick.json)**

## Pre Setup

Let's define the basics of the pipeline. It will be in the following way:

```yml
enabled: true
description: Pipeline to use mongo db as search backend
routes:
- path: mongo-db-example/_reactivesearch
  method: POST
  classify:
    category: reactivesearch

envs:
  category: reactivesearch
  MONGO_DB: ""
  MONGO_COLLECTION: ""
  MONGO_HOST: ""
  MONGO_CREDS: ""
```

We are setting some of the sensitive input data as environment variables so that they can be reused in the `inputs` part of MongoDB Query. The values are:

- `MONGO_HOST`: The host address of the mongoDB instance. This can be an IP address or a domain.
- `MONGO_DB`: The name of the database to connect to in the MongoDB instance.
- `MONGO_COLLECTION`: The collection to use after connecting to MongoDB.
- `MONGO_CREDS`: Credentials in order to access the mongoDB instance. This should be in the format of `<username>:<password>` without the `<`, `>`.

We are setting the `envs.category` as `reactivesearch` for reference.

## Stages

Now that we have the pre setup out of the way, let's define the stages for the pipeline.

### Authorization

We need to make sure that the requests made to this endpoint are authenticated. To do this, we can use the pre-built stage `authorization`. We can define it in the following way:

```yml
- id: authorization
  use: authorization
  continueOnError: false
```

It's as simple as that, we don't need to do anything else, rest will be taken care of by the pipeline.

### ReactiveSearch Query

We can start with reactivesearch query to convert the request body into it's MongoDB equivalent. The only difference here is that we will need to pass the `inputs.backend` value as `mongodb`.

This can be done in the following way:

```yml
- use: reactivesearchQuery
  inputs:
    backend: mongodb
  continueOnError: false
```

### Extract Envs

Since there are a few dynamic fields, these will need to be extracted from the environment directly. This can be done with a script. The script can be passed in the pipeline using `scriptRef` functionality.

```yml
- id: extract envs to context
  scriptRef: "extractEnvs.js"
```

The file should be saved as `extractEnvs.js` and can contain some code like this:

```js
function handleRequest() {
    return {
        mongoHost: context.envs.MONGO_HOST,
        mongoCreds: context.envs.MONGO_CREDS,
        mongoDb: context.envs.MONGO_DB,
        mongoCollection: context.envs.MONGO_COLLECTION
    }
}
```

### MongoDB Query

Now that we have the required values extracted and set in the context, we can use the `mongoDBQuery` stage to execute the converted request and get the response. This can be done in the following way:

```yml
- use: mongoDBQuery
  inputs:
    host: "{{mongoHost}}"
    credentials: "{{mongoCreds}}"
    db: "{{mongoDb}}"
    collection: "{{mongoCollection}}"
    connectionOptions: authSource=admin&readPreference=primary&ssl=true
  continueOnError: false
```

## Complete Pipeline

Now that all the stages are defined, let's take a look at the whole pipeline at once:


```yml
enabled: true
description: Pipeline to use mongo db as search backend
routes:
- path: mongo-db-example/_reactivesearch
  method: POST
  classify:
    category: reactivesearch

envs:
  category: reactivesearch
  MONGO_DB: ""
  MONGO_COLLECTION: ""
  MONGO_HOST: ""
  MONGO_CREDS: ""

stages:
- use: authorization
  continueOnError: false
- use: reactivesearchQuery
  inputs:
    backend: mongodb
  continueOnError: false
- id: extract envs to context
  scriptRef: "extractEnvs.js"
- use: mongoDBQuery
  inputs:
    host: "{{mongoHost}}"
    credentials: "{{mongoCreds}}"
    db: "{{mongoDb}}"
    collection: "{{mongoCollection}}"
    connectionOptions: authSource=admin&readPreference=primary&ssl=true
  continueOnError: false
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_ID/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml" --form "extractEnvs.js=extractEnvs.js"
```

## Testing the Pipeline

We can hit the pipeline endpoint now to see MongoDB working live. Use the following request to hit MongoDB and get the response in the ReactiveSearch format.

```sh
curl -X POST CLUSTER_URL/good-books-ds-pipeline/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["name_s"]}]}'
```

Above request should return a response with search results (considering there are results matching the search term) in the ReactiveSearch format.

