---
title: 'ReactiveSearch API: Overview'
meta_title: 'ReactiveSearch API - Core Concepts'
meta_description: 'ReactiveSearch API allows you to search securely.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
sidebar: 'docs'
---

## Overview

At Appbase we're determined to make the search experience better and continuously working on to make it more secure and powerful. While working with the Elasticsearch we found some challenges which were restricting us to provide some built-in features to customize your search because it is hard to parse the Elasticsearch query DSL and modify(customize) it because of its non-declarative nature.

Many users also reported that security is a big concern for them with Elasticsearch because of the following reasons:
1. Possibilities of Query injection with the Elasticsearch query DSL.
2. They don't feel comfortable exposing their business logic from the client applications while executing the search requests.

Although Elasticsearch has search templates to fix the security issues it requires some extra efforts, for example, you have to write queries for yourself and you also need to build the UI from scratch (not possible to use the existing search UI solutions like `ReactiveSearch` or `SearchKit`).

To fix the above issues we introduced a new declarative API aka `ReactiveSearch API` on top of the Elasticsearch which allows you to execute the Elasticsearch queries without writing the whole query DSL logic. The name of the API has been derived from your favorite search UI library named `ReactiveSearch` because we don't want that our users need to learn a new terminology so we have designed the API based on the `ReactiveSearch` having the same naming conventions for the properties with the same customization ability.


## Why?
ReactiveSearch API helps us to serve you better and it also provides you the out of the box security on top of the Elasticsearch, here are some points which will help you to decide on whether to choose `ReactiveSearch API` or not:

- Prevents `Query Injection` because you don't need to define the query DSL in the front-end. We'll build the query for you based on your inputs.
- Declarative API allows us to provide more powerful query rules, read more about it [here](/docs/search/Rules/).