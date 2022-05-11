---
title: 'Overview: ReactiveSearch Scripts'
meta_title: 'Concepts and use-cases for ReactiveSearch Scripts | Query Rules'
meta_description: 'ReactiveSearch Scripts (Javascript) are user defined functions that can be executed during the request or response cycle of a search query, while indexing data or as a cron job.'
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

## ReactiveSearch Scripts

![](https://i.imgur.com/evlfAGN.png)

A ReactiveSearch script is a user defined JavaScript function typically executed during the request or response cycle of a search query or when indexing data. A script can also be invoked with a cron trigger. Scripts are available as an action with query rules.

> **Note:** Conceptually, a script is run in a [V8 engine isolate](https://v8.dev/), and it is architecturally similar to how a Cloudflare worker operates.

Scripts run on the same machine that hosts the `reactivesearch-api` service (and Elasticsearch if it is hosted with appbase.io) and can make use of storage and state persistence using Elasticsearch.

## Use-cases for ReactiveSearch Scripts

Typical use-cases of scripts are:

### Modify a request before querying Elasticsearch

- Use script to pre-process the user search query using NLP techniques
- Add dynamic  fields to an Elasticsearch indexing request, for e.g. calculate age field from date of birth and add it to the document being indexed

### Transform the search response

- Promote or hide search results based on a dynamic criterion
- Use an external API call to return additional context with the search response (e.g. implement a did you mean functionality)

### Create side effects

- Implement a saved search functionality by posting search query to an external API (asynchronously)
- Log indexing requests or search queries that match a set criterion
- Send e-mail alerts based on a certain set of search queries

### Run periodically

A script can also be run in a cron mode, where it is invoked at specific intervals.

- Regularly update the search index with data from a primary data source (e.g. Sync updated data from Postgres or MongoDB),
- Enrich data in the search index, e.g. perform named entity recognition,
- Perform classification of data, e.g. unsupervised clustering

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

> NOTE: For cron scripts the `context` will contain just the `envs` that the user passed while creating the rule.