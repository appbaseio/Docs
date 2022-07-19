---
title: 'Conditional Execution of Stages'
meta_title: 'Conditional Execution of Stages | Introduction to Appbase.io'
meta_description: 'Learn how to use triggers to conditionally execute pipeline stages'
keywords:
    - concepts
    - appbase.io
    - conditional
    - pipelines
    - reactivesearch
    - stages
sidebar: 'docs'
---

Pipeline stages can also be executed conditionally depending on a trigger. There is a syntax that needs to be followed for this to work as expected.

## Syntax

The syntax for the expression will be of [expr language](https://github.com/antonmedv/expr/blob/master/docs/Language-Definition.md). This is a simple language that can be thought of as a mix between Python and Golang.

## Triggers

Triggers can be passed on a per stage basis in the following way:

```yaml

envs:
  - SOME_KEY: false

stages:
  - id: auth
    use: authorization
    trigger:
      expression: "envs.SOME_KEY == true"
```

In the above example the `SOME_KEY` value from envs is used to determine whether or not the stage should be executed.

## Trigger Expression Context

The trigger expression can access a lot of things related to the pipeline including the request body, the environments values, the inputs etc. Following are the things that are passed in the root of the context for expression resolution:

- `envs`: Environments of the pipeline. This includes both `global_envs` as well as `envs`. This is directly fetched from `context.envs`
- `context`: The context passed to every stage. Can be useful to access data for a previous stage.
- `inputs`: Inputs for the current stage, if any are passed.

Out of the above, the `envs` object contains the details about the request.

### Envs

The `envs` field maps to an object and this object contains various fields:

- `body`: Request body
- `urlValues`: Query Params for the URL
- `path`: Path of the URL
- `method`: Method of the current request
- `origin`: Origin of the request
- `ipv4`: IPv4 of the request
- `ipv6`: IPv6 of the request
- `category`: Category of the path.
- `acl`: ACL of the path, if any is provided during definition of the pipeline


Using all the above values, stages can be executed conditionally in various ways.

## Things to note

ReactiveSearch Pipelines support dependencies for stages. Say there are two stages defined in the following way:

```yaml

stages:
  - id: stage 1
    use: authorization
    trigger:
      expression: "2 != 2"
  - id: stage 2
    use: elasticsearchQuery
    needs:
      - stage 1
```

In the above example, the `stage 2` stage requires the `stage 1` in order to execute. However, in the above case, the `stage 1` will be marked as `skipped` because it's trigger will resolve to `false`.

When this happens, the `stage 2` stage will also be marked as `skipped` during execution.

The following line sums up the above behavior in a sentence and should be kept in mind during writing pipelines since it can lead to weird behavior.

**If one or more dependent stages of a stage is `skipped` due to trigger resolution, that stage will be skipped as well**