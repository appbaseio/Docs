---
title: 'Error handling within Pipelines'
meta_title: 'Error handling within pipelines | Introduction to Appbase.io'
meta_description: 'Learn how to handle errors in the pipeline or throw errors in custom stages'
keywords:
    - concepts
    - appbase.io
    - errors
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

Errors are always prone to happen. Be it a properly defined bit of code or a handcrafted book. Here, we will learn how to handle errors in an user defined pipeline when it occurs at a particular stage or even on a pre-built stage.

First of all, let's understand the field `continueOnError` that is exposed for every stage by ReactiveSearch pipelines.

## What is continueOnError

`continueOnError` is a field accepted on a per stage basis. This field tells the pipeline whether or not to **continue** when there is an error at the stage.

By default, it is set to `true` which means even if there is an error at a certain stage, it will be ignored and the execution will move on to the next stage.

While defining the pipeline, this field can be set to `false` to make sure that the execution does not continue when there is an error and it is shown back to the user.

### continueOnError example

Let's take the example of the pre-built stage `reactivesearchQuery`. Let's say we are passing a body to reactive search query that is not valid. This is in the sense that the body does not contain some required fields.

By default, this error will be ignored and the execution will go to the next stage (which in most cases is `elasticsearchQuery`). However, the thing to note here is that the `elasticsearchQuery` stage will fail.

To get around this issue, we can use the `coninueOnError` flag in the following way:

```yml
- id: reactive search
  use: reactivesearchQuery
  # Make sure the execution stops if error occurs
  # at this stage.
  continueOnError: false
- id: elastic search
  use: elasticsearchQuery
```

## Custom Stage Errors

Let's say there is a custom stage that is running a JavaScript script and we want to make sure that if the script fails then the execution should not continue. As explained above, by default the execution will **not stop** even if there is an error at any stage.

Let's now say, we have the following script:

```js
function handleRequest() {
    const a = 5;
    // Zero division error
    return a / a - 5;
}
```

Above script will fail because it will raise a zero division error but we will have to explicitly tell the pipeline to stop execution in the following way:

```yml
- id: custom script
  scriptRef: custom.js
  continueOnError: false
```

When we define the stage in the above way, it will stop execution if there is an error in the script.

### Throwing errors from scripts

Now, let's say there is a script that utilizes an environment variable. This script will not work if the env variable is not present. So we can add a check in the script to determine if the variable is present or not and accordingly throw an error. This can be achieved in the following way:

```js
function handleRequest() {
    if (context.envs.requiredKey == undefined) {
        throw Error('requiredKey is a required environment key!');
    } 
}
```

With the above script, if the key is not passed and the `continueOnError` is set to `false`, the stage will fail with the error as thrown from the script.