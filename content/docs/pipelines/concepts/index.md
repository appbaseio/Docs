---
title: 'ReactiveSearch Pipelines: Concepts'
meta_title: 'Concepts for ReactiveSearch Pipelines'
meta_description: 'Learn about the concepts for ReactiveSearch pipelines and understand how to use them'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
sidebar: 'docs'
---

Pipeline Concepts consist of basic concepts that would be useful to understand how pipelines work and how pipelines can be utilized to get the best out of it.

Following is a visualization of how pipelines are executed and how they go from one stage to another.

![Pipeline Concept](/images/concepts/pipeline_concept.png "pipeline execution visualized")

In the above image, the stages can access the global context and modify it. However, the stages with [async] can `get/add` the context which means they cannot modify the already existing values in the context.

Moreover, the context contains `response`, `request` and `envs` during initialization and other fields can be added to them in other stages.

Notice that the `QueryTranslate` step has a check to see if it should continue when an error occurs or not. This is default behaviour and is executed in all stages but is only shown in the case of `queryTranslate` to demonstrate how it works.

This behaviour can be tweaked with the `continueOnError` field.

## Concepts of Pipelines

Following pages explain the concepts in detail with examples:

- [Pipeline Route Matching](execution-process)
- [Pass data between Stages](pass-data-between-stages)
- [Pass inputs to Stage](pass-inputs-to-stage)
- [Run Stage Asychronously](run-stage-async)
- [Wait for Other Stages](wait-for-other-stage)
- [Write to Global Context](write-to-global-context)
- [Pass Environments to Stage](envs-for-stage)
- [Error Handling in Pipelines](error-handling)
- [Pre-Defined vs User-Defined Stages](pre-defined-vs-user-defined)
- [Global Environments](global-envs)
- [Conditional Execution of Stages](conditional-stages)

## Features of ReactiveSearch Pipelines

ReactiveSearch Pipelines comes with a lot of features aimed at developers along with observability.

### Pipeline Metrics

ReactiveSearch provides access to real time logs for pipelines along with features like per stage diffs that shows what exactly happened in each stage. This also helps in checking which stage threw an error and what the error was. How much time did a particular stage take. Everything is provided through logs.

### JavaScript Stages with access to npm packages

ReactiveSearch Pipelines support using JavaScript for custom stages along with access to almost all of public npm packages. This provides the developer full freedom to execute their scripts for whatever task they have in mind.

### Fine Tuned Development Experiance

Since Pipelines are aimed at developer first, it is necessary for developers to be able to test them out without affecting production. We provide exactly that, a simulation where the pipeline is executed through the exact same handler that executes the production pipeline but as a mock!

Pipelines can also be edited through our dashboard directly without worrying about adding a certain file to the form data request. Moreover, JS errors are reported with line numbers so that it is easy for developers to debug it.

[Learn more about developing and debugging pipelines](../developing/)

## How-To Guides

We have curated a list of how-to guides that would be helpful to get started with ReactiveSearch Pipelines.

[Check out the How-To Guides here](../how-to/)
