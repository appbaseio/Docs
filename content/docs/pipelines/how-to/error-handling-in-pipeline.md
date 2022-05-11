---
title: 'Add Error Handling in Pipeline'
meta_title: 'Add Error Handling in Pipeline | Introduction to Appbase.io'
meta_description: 'Learn how to handle various kinds of error in ReactiveSearch Pipelines'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - error
    - custom-error
sidebar: 'docs'
---

Errors are prone to happen, no matter how much we try to get rid of them. This is why it is very important to handle the errors gracefully when they happen.

In ReactiveSearch Pipelines, errors might be thrown by the system as well as user-defined stages can throw error and stop execution as well.

## continueOnError: what is it?

For pre-built stages, ReactiveSearch provides a way to handle errors automatically. This is done by the `continueOnError` field.

This field indicates whether the execution should continue or not when there is an error. This will map to a Boolean value.
The default value of this field is set to **true**.

### Pre-Defined Stage Error Handling

Let's understand this with an example. Let's say we have a stage using the pre-built `reactivesearchQuery` stage. It is defined in the following way:

```yml
- id: reactive search with error
  use: reactivesearchQuery
  continueOnError: false
```

Since the `continueOnError` field is by default set to `true`, we need to explicitly set it to `false` when we want the execution to stop on error.

The above example will **stop** the execution of the pipeline when there is an error in that stage and will return the response body.

### Set response body

Let's say we want to make sure that a custom response body is returned when there is error in the `reactivesearchQuery` stage. For this, we can set the response body before that stage, so that when the error occurs, we can return that body.

This can be done in the following way with a custom user-defined script

```js
function handleRequest() {
  return {
    response: {
      body: JSON.stringify({"message": "error while executing reactivesearch"}),
      code: 500
    }
  }
}
```

```yml
- id: set error
  scriptRef: setError.js
- id: reactive search with error
  use: reactivesearchQuery
  continueOnError: false
```

Now, if there will be an error in the `reactive search with error` step then the response will be the one we set in the `setError.js` script.

## Custom Errors

At times, there might be need to throw custom errors. This can be done by defining a custom stage that **throws** an error.

### Example: Throw error if `query` is not present

Let's understand this with an example. Let's say we want the query field to be present in the request body. If the field is not present, we cannot continue execution and want it to stop. We can do that in the following way with a custom script.

```js
function handleRequest() {
  const requestBody = JSON.parse(context.request.body);

  if requestBody.query == null {
    throw error("query is a required field!");
  }
}
```

We can then use this script in the following way:

```yml
- id: check query field
  scriptRef: checkQueryWithError.js
  continueOnError: false
```

> Note that we are setting the `continueOnError` field because we are throwing an error.

## Complete Pipeline

Now that we have defined the stages we needed, let's get the whole pipeline

```yml
enabled: true
description: Handle errors gracefully

routes:
  - path: /error-pipeline/_reactivesearch
    method: POST
      classify:
        category: reactivesearch

stages:
  - id: Authorize User
    use: authorization
    continueOnError: false
  - id: check query field
    scriptRef: checkQueryWithError.js
    continueOnError: false
  - id: set error
    scriptRef: setError.js
  - id: ReactiveSearch Query
    use: reactivesearchQuery
    continueOnError: false
  - id: ElasticSearch Query
    use: elasticsearchQuery
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_ID/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml" --form "checkQueryWithError.js=checkQueryWithError.js" --form "setError.js=setError.js"
```

## Test the pipeline

We can hit the pipeline with no `query` field to see if the error handling is working in the following way:

```sh
curl -X POST 'CLUSTER_ID/_reactivesearch' -H "Content-Type: application/json" -d '{"settings": {"backend": "elasticsearch"}}'
```

Above request does not contain the `query` field and will make the pipeline throw an error.
