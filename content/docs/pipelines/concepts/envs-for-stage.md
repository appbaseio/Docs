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

## Environment values provided by ReactiveSearch

There are certain values that the pipeline cannot access but would be necessary for it's execution. Hence, we provide these values as environment variables. The values are generated during the initialization of the context and then passed on to every stage.

Following is the structure that indicates the environment values present in a pipeline:

```json
{
  "category": "docs",
  "acl": "bulk",
  "ipv6": "::1",
  "ipv4": "0.0.0.0",
  "isTLS": false,
  "method": "GET",
  "origin": "localhost:8000",
  "path": "/basic-envs/_reactivesearch",
  "query": "harry",
  "referrer": "https://my-search.domain.com/path?q=hello",
  "urlValues": {"q": "test"},
  "index": []
}
```

Above values are summarized in the following table:

| Name | Description | Type |
|---|---|---|
| `category` | Category of ReactiveSearch defined for the path | String |
| `acl` | ACL for the path matched if defined in the pipeline | String |
| `ipv6` | The ipv6 address of the host that is serving the API | String |
| `ipv4` | The ipv4 address of the host that is serving the API | String |
| `isTLS` | Whether or not TLS is enabled | Boolean |
| `method` | Method of the current request | String |
| `origin` | Origin passed in the request | String |
| `path` | Path matched for the current request | String |
| `query` | The `value` field from the first query in the `query` array in the request, if passed | String |
| `referrer` | The referrer passed in the request header | String |
| `urlValues` | Query Parameters passed in the request | Object |
| `index` | Index matched in the request, if matched | Array |

## Global Envs

Global environments are injected into the `context.envs` object, however the user passed values are given priority over the global envs.

Eg: If `USER_INDEX` is present in the envs and there is a global env with the key `USER_INDEX` then the value will not be replaced in the `context.envs` object.
