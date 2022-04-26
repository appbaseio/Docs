---
title: 'Pass envs to stage'
meta_title: 'Pass envs to stage | Introduction to Appbase.io'
meta_description: 'Learn how to pass envs on a per stage basis and when to use inputs instead'
keywords:
    - concepts
    - appbase.io
    - envs
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

Environments can be passed through the global envs using the `envs` key in the pipeline. `envs` is an object that can contain key value pairs.

## How to pass envs

Envs can be passed using the `envs` key in the following way:

```yml
envs:
  - testKey: test value
```

These envs will be exposed through the `context` to the user. These envs can be accessed in a custom script using `context.envs` field. `envs` will be an object that will contain the values passed when the pipeline was created.

## Are inputs alternative to envs?

Inputs are not an alternative to environments. Instead inputs can be thought of as parameters to a function whereas envs are just _environments_ which are set once and accessed multiple times.

Inputs should be used when the data is directly accessed by the stage. Inputs are used in the case of pre-built stages that expect certain values from the user.

On the other hand, custom stages that run JS scripts might need certain values to be passed from the user. In this case, `envs` can be used.

Another important thing to note is, `envs` should be used when there is a value that might be sensitive to just pass or keep in code.