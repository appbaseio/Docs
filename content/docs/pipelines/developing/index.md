---
title: 'ReactiveSearch Pipelines: Developing and Debugging'
meta_title: 'Developing/Debugging ReactiveSearch Pipelines'
meta_description: 'Learn how to develop and debug ReactiveSearch Pipelines before deploying them'
keywords:
    - developing
    - debugging
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
sidebar: 'docs'
---

ReactiveSearch provides a nicely built dashboard to develop and debug pipelines. This dashboard has various functionalities to create a pipeline and test it out even before creating the pipeline.

The pipeline view of the dashboard can be found at https://dash.reactivesearch.io/cluster/pipelines . This guide will explain how this dashboard can be used effectively in order to create the pipeline and test it out before deploying it to production.

## Validating a pipeline

ReactiveSearch supports validation of a pipeline before creating the pipeline. This can be found by going over to create a new pipeline at https://dash.reactivesearch.io/cluster/pipelines/new and selecting a template or creating a pipeline from scratch. On the top right of the create pipeline view, there will be a toggle button that will let you switch between `edit` and `validate`.

Clicking on the toggle button will open the **validate** window that will basically mock an API call made to the pipeline in production. The user has the option to create the query body that is sent in the request along with other optional fields (if any are required by the pipeline).

The execution context shown here consists of 3 fields mainly. These are:

- `request`
- `response`
- `envs`

Think of the execution context as an object that will be defined with the above 3 keys but can be extended as per user's needs.

Once the execution context is set for testing a pipeline, clicking on the play icon will play the request. The response of the pipeline will be shown in the next tab which is named `Response Output`.

Besides the two tabs, there are two more tabs in the validate view, these are:

- `Console Logs`
- `Stage Changes`


## Console Logs

Console logs, as the name suggests, are just logs from scripts (if any) run during the execution of the pipeline. ReactiveSearch supports viewing console logs for debug purposes since it makes it easier to debug complex scripts.

In any script that is executed in a ReactiveSearch pipeline, following is an example of how a console log can be triggered:

```js
function handleRequest() {
    /* Do something complex here */
    console.log("Completed the complex part of the function");
    console.log("Just testing out the console log feature of ReactiveSearch pipelines")
}
```

### Logging primitive types

In order to log values of variables such as `int`, `string` etc, it can be done by simply logging the variable name in the following way:

```js
function handleRequest() {
    const varName = "never gonna give you up";
    const intVar = 1;

    console.log("Logging the value of a number: ", intVar);
    console.log("Logging the value of a string: ", varName);
}
```

### Logging objects

Just like plain JavaScript, trying to log an object will not work with ReactiveSearch pipelines. When logging an object in the following way:

```js
function handleRequest() {
    const objValue = {name: "Some Name"};
    console.log(objValue);
}
```

Following is the output from the above:

```sh
[object]
```

In order to get around this issue, the object can be logged by stringify-ing it into JSON in the following way:

```js
function handleRequest() {
    const objValue = {name: "Some Name"};
    console.log(JSON.stringify(objValue));
}
```

Above will work as expected and the output will have the object properly shown.

## Stage Changes

The next tab on the validate view is the `Stage Changes` tab. This also, as the name suggests, shows the changes made to the execution context on a per-stage basis.

As explained previously, the execution context can be thought of as an object inside where there are 3 reserved keys but other keys can be added to the object.

Each stage that runs during a ReactiveSearch Pipeline execution gets the execution context passed to it and it can modify the context. The modified context is then picked up and passed on to the next stage until the last stage is received.

At the end of the execution, whatever the value of `response.body` is inside the object is the final response that is returned from the pipeline.

**Stage Changes** shows the context through each stage of the pipeline and shows what changes were made by each stage into the context. For eg: some stage inject extra values into the context so that other stages can pick those up and so on.

