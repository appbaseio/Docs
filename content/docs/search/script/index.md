---
title: 'Overview: Scripts'
meta_title: 'Concepts and use-cases for scripts | Query Rules'
meta_description: 'Scripts (Javascript) are user defined functions that can be executed during the request or response cycle of a search query, while indexing data or as a cron job.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
    - script
    - query-rules
    - pipeline
sidebar: 'docs'
---

## What Are Scripts

A script is a user defined JavaScript function typically executed during the request or response cycle of a search query or when indexing data. A script can also be invoked with a cron trigger. Scripts are available as an action with query rules.

> **Note:** Conceptually, a script is run in a [V8 engine isolate](https://v8.dev/), and it is architecturally similar to how a Cloudflare worker operates.

Scripts run on the same machine that hosts the `reactivesearch-api` service (and Elasticsearch if it is hosted with appbase.io) and can make use of storage and state persistence using Elasticsearch.

## Use-cases of scripts

Typical use-cases of scripts are:

### To modify a request before querying the Elasticsearch

- Create a script for `search` type of requests to pre-process the search query using NLP.
- A script to add calculated fields to Elasticsearch index requests, for e.g. calculate `age` field from date of birth.

### To modify the response

- To promote/hide a result for search type of requests.

### To create side-effects

- A script for `search` type of requests to read the search query and call a third party API asynchronously to record a search (saved search).
- To use a third party API(synchronously) to correct the misspelled words for search type of requests.

### To run at intervals

A script can also be run in **cron** mode, where it is invoked at specific intervals. Here, the use-cases can be to:

- Regularly update the search index with data from a primary data source,
- Enrich data in the search index, e.g. performing named entity recognition,
- Perform classification of data, e.g. unsupervised clustering.

## Why Use Scripts

Since scripts are architecturally similar to Cloudflare Workers and serve similar use-cases to popular FaaS services such as AWS Lambda, Azure Cloud Functions, et al, it's important to address when `reactivesearch-api` scripts are useful v/s using these external services.

In the world of search, milliseconds matter. If you're providing an autocomplete / autosuggest experience to your end-users, then you want to optimize for performance. Scripts are designed with this in mind, typically running in less than 10ms (whereas other services take anywhere from 20ms to 200ms to run).

Scripts are purposefully designed to serve search use-cases. They come with global packages like `fetch`, `compromise`, `crypto.js`, `lodash` to help with request and response manipulation.

## Core Concepts

Based on the execution type, a script can be defined in two ways:
- `Request` scripts get executed before querying the Elasticsearch, which means request manipulation would get applied to final request made to Elasticsearch.
- `Response` scripts get invoked after getting the response from Elasticsearch. It can be used to modify the response that would be returned as the final response.

A script function has access to the execution context(read-only) which has all the information about request, response and environments variables.

Query rules are useful to define the trigger conditions for a script, for example, a query rule to execute a script only for the search requests made to `products` index.

Script affects the search latency so it is advisable to avoid time-consuming tasks. You can measure the script performance by looking at the `script_took` value in the response.
