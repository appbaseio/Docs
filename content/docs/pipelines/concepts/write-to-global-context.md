---
title: 'Write to Global Context'
meta_title: 'Write to Global Context | Introduction to Appbase.io'
meta_description: 'Learn how to write data to the global context from a stage'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

Contexts are accessible to every stage and it is also modifiable by every stage with a few exceptions. In this article we will understand how context can be modified from a stage.

## Modify Context

In order to modify a context, we will have to update the `context` variable. Every script that runs in the pipeline is populated with a `context` variable. This variable is a JavaScript `Object` that contains various details about the pipeline being executed.

These details include:

- `request`
- `response`
- `envs`

We can modify the context pretty easily with a simple JS line. Let's say we want to add the `customData` field to the context and set the value of this field to an array of numbers.

We can define a JavaScript script to do exactly that in the following way:

```js
function handleRequest() {
    return {
        customData: [
            1, 2, 4, 6, 7
        ]
    }
}
```

## Things to Note

As mentioned above, almost all stages can modify the context with some exceptions. There is just one exception, it is that stages that are run asynchronously cannot modify the already existsing fields in the context.

This means, if the `async` flag in a stage is set to `True` then it cannot modify pre-existing fields like `request`, `response` etc.

It can, however, **add** new fields to the context. This is very useful when an async stage is used to hit some external API to get some data and then this data needs to be used in another stage.