---
title: 'Run a stage asynchronously'
meta_title: 'Run a stage asynchronously | Introduction to Appbase.io'
meta_description: 'Learn how to run a stage asynchronously and when it is useful'
keywords:
    - concepts
    - appbase.io
    - async
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

At times, we might have the need to run stages asynchronously. This can have various uses. One of the most common uses is when a script needs to hit an external API and the response is _awaited_, the script needs to be executed asynchronously.

This is possible in ReactiveSearch pipelines. It is very easy to implement an async stage using the flag `async` while defining the pipeline.

## What is the `async` field

The `async` field, as explained above, allows users to define stages that are supposed to run asyncrhonously. Let's say we have a stage that defines a custom JavaScript script that is supposed to hit an external API, fetch a field from the response and update it to the context.

Now, hitting an external API and awaiting the response means the script will have to run asynchronously. This can be achieved in the following way:

```yml
- id: async stage
  scriptRef: 'asyncCall.js'
  async: true
```

In the above stage definition, we are refering to a script reference with the name `asyncCall.js`. We can define that file in the following way:

```js
async function hitExternal() {
    const response = await fetch("http://mockbin.com/request", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "foo": "bar"
            }
        });
    responseJSON = JSON.parse(response);
    return {
        customResponse: responseJSON
    }
}
```

The above script will run fine and it will add a new field to the context. [Read more about context modifications here](./write-to-global-context).