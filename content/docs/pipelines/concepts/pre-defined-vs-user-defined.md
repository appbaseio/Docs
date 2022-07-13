---
title: 'Pre Defined vs User Defined Stages'
meta_title: 'Pre Defined vs User Defined Stages | Introduction to Appbase.io'
meta_description: 'Learn the difference between pre-defined and user-defined stages and when to use them or not to'
keywords:
    - concepts
    - appbase.io
    - pre-defined
    - user-defined
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

Stages are one of the most important concepts of ReactiveSearch pipelines. A pipeline major part of the execution process is defined by its stages.

## Types of Stages

ReactiveSearch Pipelines consist of two types of stages:

- Pre-Defined
- User-Defined

### Pre-Defined Stages

Pre-Defined stages, as the name suggests, are pre-defined. We have carefully curated all the stages that a developer might need into pre-defined ones so that they can use them right out of the box and define a pipeline real quick.

> Pre-Defined stages are also referred to as pre-built stages.

These stages are exposed through an unique name and can be used in a particular stage of the pipeline by utilizing the `use` key.

Following is a simple example where a stage is defined to use the `authorization` stage.

```yml
stages:
  - id: Authorize using the pre-built authorize stage
    use: authorization
```

The `id` field in the above example is optional (to minimize the pipeline defining time for the developer).

### User-Defined Stages

User-Defined stages are defined by the user (duh!).

At times, there might be need for a stage that does something non-trivial. In such cases, ReactiveSearch pipelines allows the developer to define a custom stage with all the freedom in the world (not literally!).

Custom stages are, however, restricted to JavaScript (JS) as of now. The user can pass a chunk of code written in JS and the stage will execute it.

#### Things to note

When a custom stage is defined, the JS code is passed to the stage through one of the following fields:

- `script`: inline string that contains the JS code.
- `scriptRef`: filename passed in the requests form data. (Useful when large chunk of code is to be passed)

#### Example: A stage that adds a new field to the request body

Let's say there is a requirement to add a new field to the request body passed by the user to the endpoint. In a case like this, a stage can be user-defined in the following way with an external JS script.

> We will use the `scriptRef` field in the following example. Let's say the following JS script is named `save.js`

```js
function handleRequest() {
  const requestBody = JSON.parse(context.request.body);

  requestBody.newField = "this is a test field";

  return {
    "request": {
      ...context.request,
      "body": JSON.stringify(requestBody)
    }
  }
  
}
```

And the yml can be defined in the following way:

```yml
stages:
  - id: custom user defined stage
    scriptRef: save.js
```

> Note that above yml is not enough to define a pipeline, it's just a **chunk** of the pipeline.

The `scriptRef` can then be passed in the following way:

```sh
curl -X POST $CLUSTER_URL/_pipeline -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yml" --form "save.js=save.js"
```
