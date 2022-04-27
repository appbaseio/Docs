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