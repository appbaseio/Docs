---
title: 'Wait for other stages before executing'
meta_title: 'Wait for other stages before executing | Introduction to Appbase.io'
meta_description: 'Learn how to make a stage wait for some other stages before it executes'
keywords:
    - concepts
    - appbase.io
    - needs
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

At times, we might have stages that are _fetching_ data and stages that are _utilizing_ this data. In a case like this, we would want the latter stage to wait until the former stage is completed.

We can do this by using the `needs` keyword.

## What is the `needs` keyword?

`needs` is a keyword provided while defining the stage. `needs` accepts an array of strings where every string should be a valid stage ID in the pipeline.

When `needs` is specified at any stage, this stage will not execute until all the stages passed in the `needs` field have completed execution.

Following is how `needs` can be defined for a stage:

```yml
- id: some independent stage
  script: "function handleRequest() {return {'customField': 'just some text'}}"
- id: dependent stage
  needs:
    - some independent stage
  use: reactivesearchQuery
```

Note that in the above case, we have two stages defined:

- `some independent stage`
- `dependent stage`

As the ID's suggest, the `dependent stage` requires the stage with ID `some independent stage` in order to run. When this is the case, the `needs` keyword will make sure that all the stages mentioned in the `needs` field are executed first before the stage itself gets executed.

## A stage that depends on multiple other stages

Let's say we want to define a stage that depends on multiple other stages, we can do that by the `needs` field as well.

Let's say our stage needs stages with ID's `stage_1`, `stage_2` and `stage_3` to execute before it actually executes.

We can make this happen with the following syntax:

```yml
- id: final stage
  needs:
    - stage_1
    - stage_2
    - stage_3
```