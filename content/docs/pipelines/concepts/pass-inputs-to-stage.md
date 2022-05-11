---
title: 'Pass inputs to a stage'
meta_title: 'Pass inputs to a stage | Introduction to Appbase.io'
meta_description: 'Learn how to pass inputs to a stage and when not to do that'
keywords:
    - concepts
    - appbase.io
    - async
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

ReactiveSearch provides quite a lot of pre-built stages in order to make pipelines useful. Most of these stages accept some inputs from the user.

## What are inputs

Inputs are like parameters in a function. If we have a function that is doing something there are a few things that we absolutely need from the user who's calling this function. This is where inputs come in.

### How to pass

Inputs can be passed with the `inputs` field in the stage definition. `inputs` field will be accessed only if the pre-built stage uses the data else it will be ignored without any error.

## Example: replace words

Let's take the example of the pre-built stage `replaceWords` that provides an way to replace words in the search term. Let's say we want to replace the word `test` in the search term with `no test`.

We can do that by passing this stage an input. This can be done in the following way:

```yml
- id: replace words
  use: replaceWords
  inputs:
    data:
      - test: no test
```

This particular stage expects the `inputs.data` field to contain the data for this stage to work properly. This field differs based on the pre-built stage being used.

For example, for the stage `searchRelevancy` the `inputs.search` field can be passed or `inputs.suggestion` field can be passed.

## Dynamic inputs

ReactiveSearch Pipelines also support dynamic inputs to stages. Let's say the input for a stage is generated in a stage prior to this stage. We can then pass the input dynamically by using the `context.

What we have to do is write a new field in the context and access that field in the `inputs` field.

Let's say in the above example of `replaceWords`, we want to pass a dynamic value for the `inputs.data` field.

Say, we populate a field called `wordDetails` in the context. We can then access this field in the following way:

```yml
- id: replace words
  use: replaceWords
  inputs:
    data: "{{wordDetails}}"
```

That's it, the pipeline will take care of substituting the dynaimc input by accessing it from the context.