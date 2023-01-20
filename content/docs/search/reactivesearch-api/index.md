---
title: 'ReactiveSearch API: Overview'
meta_title: 'ReactiveSearch API - Overview'
meta_description: 'ReactiveSearch API provides a declarative interface to query Elasticsearch. Learn about the benefits of using it.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - opensearch
    - mongodb
    - solr
    - reactivesearch
sidebar: 'docs'
---

## Overview


While ReactiveSearch Cloud maintains 100% API compatibility with Elasticsearch and OpenSearch, it also provides a declarative API to query Elasticsearch, OpenSearch and other Lucene based search engines. This is the recommended way to query via web and mobile apps as it prevents query injection attacks. It composes well with the search engine's query DSL, and lets you make use of ReactiveSearch Cloud features like caching, query rules, server-side search settings, and analytics.

### Why build ReactiveSearch API?

Elasticsearch's query DSL is imperative in nature. Enabling the whole DSL to be accessible from a web or mobile frontend opens a can of security worms. The query DSL's imperative nature also makes it hard to enrich, transform or apply access controls to search requests. We saw these problems as earlier versions of ReactiveSearch UI kit only supported the Elasticsearch query DSL.

### Benefits

- ReactiveSearch Cloud magic: Accelerate, enrich, and transform your search requests using features such as query rules, search relevance, caching, analytics
- Easy to secure: As ReactiveSearch API doesn't expose Elasticsearch APIs directly, it prevents the possibility of DSL based injection attacks
- Composable: Easily composes with Elasticsearch's query DSL for advanced use-cases
- Encapsulate business logic: Don't want to expose sensitive fields to web and mobile clients? Set the fields to return with ReactiveSearch dashboard once and avoid declaring them as part of the network requests.
- If you're an existing user of ReactiveSearch UI libraries, you can switch to using ReactiveSearch API with no code changes. Simply set `enableAppbase` prop to true. Searchbox libraries already come with a native support for the ReactiveSearch API.

> **Note**: Starting ReactiveSearch React v4.x (latest) release, and ReactiveSearch Vue v3.x (latest) release, setting this prop isn’t needed. These frontend UI kits only use the ReactiveSearch API.