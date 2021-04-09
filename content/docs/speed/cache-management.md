---
title: 'Cache Management'
meta_title: 'Cache Management - Core Concepts'
meta_description: 'Caching search queries boost the search speed.'
keywords:
    - concepts
    - appbaseio
    - cache
    - api
sidebar: 'docs'
---

## Overview
Caching the search requests is helpful to minimize the elasticsearch interactions for frequent queries. It has the following benefits:
- Superior performance, it can shave up to 100ms of search latencies for many of the expensive searches,
- Improve the search throughput for the same kinds of queries, as they never need to hit the server.

## Cache Preferences
![alt cache preferences GUI](https://i.imgur.com/L7P3NYx.png)

### Enable/Disable Caching
By default the caching is disabled for clusters, there are two ways to enable request caching:
1. Set the caching to `true` in cache preferences,
2. Use the [useCache](/docs/search/reactivesearch-api/reference/#usecache) property as `true` in the [settings](/docs/search/reactivesearch-api/reference/#settings-properties) object of the ReactiveSearch API. It has the higher precedence and if set then cache preferences would be ignored.

### Cache Duration
The time to live for a cached request in seconds. The default value is 360s. Cache Duration must be in a range of 60s to 3600s(1 hr).

### Memory Limit
The memory limit for the cached requests in MB(s). The default value is 128MB. It can go up to 4000MB(4GB). Appbase.io uses a cache eviction policy to remove costly requests automatically once it reaches the memory limit.

### Whitelist indices
It allows you to define which index/indices should be considered to cache the search queries.

## Clear Cache
The `Evict Cache` action allows you to free up the memory by deleting cached requests instantly.

## How to identify cached responses?
Appbase.io sets the `x-request-cache` header as `true` for cached responses. To identify the cached responses you just need to check the presence of `x-request-cache` in the response headers of the request.
