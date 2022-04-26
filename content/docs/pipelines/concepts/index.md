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

![Pipeline Concept](/images/concepts/pipeline_concept.png "Pipeline Execution Visualized")

In the above image, the stages can access the global context and modify it. However, the stages with [async] can `get/add` the context which means they cannot modify the already existing values in the context.

Moreover, the context contains `response`, `request` and `envs` during initialization and other fields can be added to them in other stages.

Notice that the `QueryTranslate` step has a check to see if it should continue when an error occurs or not. This is default behaviour and is executed in all stages but is only shown in the case of `queryTranslate` to demonstrate how it works.

This behaviour can be tweaked with the `continueOnError` field.

Following pages explain the concepts in detail with examples:

- [Pass data between Stages](pass-data-between-stages)
- [Pass inputs to Stage](pass-inputs-to-stage)
- [Run Stage Asychronously](run-stage-async)
- [Wait for Other Stages](wait-for-other-stage)
- [Write to Global Context](write-to-global-context)
- [Pass Environments to Stage](envs-for-stage)
- [Error Handling in Pipelines](error-handling)
