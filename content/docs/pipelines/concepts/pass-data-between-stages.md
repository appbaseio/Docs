---
title: 'Pass data between stages'
meta_title: 'Pass data between stages | Introduction to Appbase.io'
meta_description: 'Learn how to pass data between pipeline stages'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

Passing data between stages can be considered one of the most essential parts of pipelines. Since we provide quite a lot of pre-built stages, it is essential that the data between them is shared in some way and is passable from one stage to another.

This can be achieved by writing the data to the `context` and accessing them through the `context`.

## What is Context

Every stage in the pipeline has access to a `context` variable. `context` is a JSON object that contains details about the pipeline being executed. Some of the keys that are populated in the context are:

- `request`
- `response`
- `envs`

Here's an example context:

```json
{
    "request": {
        "body": "{\"query\": [{\"id\": \"some ID\", \"value\": \"search term\", \"dataField\": [\"text\"]}]}",
        "headers": {
            "Content-Type": "application/json"
        }
    },
    "envs": {
        "someEnvKey": "test"
    },
    "response": {
        "body": ""
    }
}
```

Note that `envs` key will contain an object where key and values are populated from the pipeline config or per stage `envs`.

> `request.body` and `response.body` are stringified JSON. This is because some ElasticSearch endpoints support non JSON data like nd-json.

## How to write/access context data

### Writing to context

Anything can be written to the context. Since it is just a JSON object, it can be easily modified from a custom JavaScript stage.

Let's say we want to add a field `customData` to the context with the value `{'test': 'nothing here'}`. We can do that with the following JavaScript script:

```js
function handleRequest() {
    return {
        customData: {
            test: "nothing here"
        }
    }
}
```

Once we have the script defined, we can just define the stage like this:

```yml
- id: add custom data
  scriptRef: addCustom.js
```

> Assuming the above JS script is named as `addCustom.js`.

### Accessing from context

Field can be easily accessed from the context. Let's say we have a script that needs to access the `customData` field from above, that can be done in the following way:

```js
customData = context.customData;
```

> Every script that is running is populated with a `context` variable that contains the latest updated context in that stage of the pipeline.

### Things to note

All stages can modify context but stages that run asychronously come with a downside. Stages can be run asynchronously by setting the `async: true` flag while defining the pipeline.

However, stages that run with the above flag are not allowed to update **already existing** fields in the context. This means that if a stage has a script that runs asynchronously, it cannot modify the `request.body` value or any value that exists in the context from before.

It can, however, **add new fields** to the context that can be accessed in further stages.

## Example Scenario: Dynamic input

Let's take the example of the `replaceWords`. We have to pass the input to `replaceWords` through the `inputs.data` field.

Following is how we replace the term `test` with `not test` in the search term:

```yml
- id: replace search term
  use: replaceWords
  inputs:
    data:
      test: not test
```

This is pretty straight forward, however, if we want to make the input dynamic, we can do that through context. Let's say before the above stage runs we have another stage that adds a `replaceWordDetails` field to the context:

```yml
- id: populate details
  script: "function handleRequest() { return { replaceWordDetails: {'test': 'not test'} } }"
```

We can then directly pass this context field to the `replaceWords` stage as an input in the following way:

```yml
- id: replace search term
  needs:
    - populate details
  inputs:
    data: "{{replaceWordDetails}}"
```

> Note that we are using the `needs` field to make sure that the populate details stage runs before the replace search term stage in order to have the `replaceWordDetails` field populated.