---
title: 'Overview'
meta_title: 'Concepts and use-cases for scripts'
meta_description: 'Script is an event-driven server side function to perform side effects.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
    - script
    - pipeline
sidebar: 'docs'
---

## What are scripts?
A `Script` is an event-driven server side function to perform side effects. The script function has to be defined and managed by DevOps team (Appbase.io customers) with a trigger event to execute the script, such as an API call to search. The concept of script is similar to AWS Lambda, Microsoft Azure Functions and Google Cloud Functions.

> Note: Currently, we only support `Javascript` which gets executed in a [v8 engine](https://v8.dev/).

## Use-cases of scripts
Script has the following use-cases:

### To modify a request before querying the Elasticsearch.
- Create a script for `search` type of requests to pre-process the search query using NLP.
- A script to add calculated fields to Elasticsearch index requests, for e.g. calculate `age` field from date of birth.

### To modify the response. 
- To promote/hide a result for search type of requests.

### To create side effects
- A script for `search` type of requests to read the search query and call a third party API asynchronously to record a search (saved search).
- To use a third party API(synchronously) to correct the misspelled words for search type of requests.

## Core Concepts
Based on the execution type, a script can be defined in two ways:
- `Pre-Request` scripts get executed before querying the Elasticsearch, which means request manipulation would get applied to final request made to Elasticsearch.
- `Post-Request` scripts get invoked after getting the response from Elasticsearch. It can be used to modify the response that would be returned as the final response.

A script function has access to the execution context(read-only) which has all the information about request, response and environments variables.

Query rules are useful to define the trigger conditions for a script, for example, a query rule to execute a script only for the search requests made to `products` index.

Script affects the search latency so it is advisable to avoid time-consuming tasks. You can measure the script performance by looking at the `script_took` value in the response.