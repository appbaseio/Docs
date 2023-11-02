---
title: 'Cache Management'
meta_title: 'Cache Management - Core Concepts'
meta_description: 'Blazing ⚡️ search engine performance with ReactiveSearch cache.'
keywords:
    - concepts
    - reactivesearch
    - appbaseio
    - cache
    - api
sidebar: 'docs'
---

## Overview

Elasticsearch and OpenSearch provide for limited caching of search queries. ReactiveSearch cache aims to improve the search performance by caching the most frequent search queries made to these search engines. It offers the following benefits:
- Better Latency: It saves the time to query Elasticsearch. In our benchmarks for a search use-case, we see over 100ms saved,
- Improves the search throughput for the same patterns of search queries without requiring them to hit the search engine everytime.

Below is a benchmark showing the search performance with cache enabled and without cache enabled. For this benchmark, we performed 10K search requests over a period of 5 minutes. We assume 50 unique search terms, i.e. most search queries are different users searching for some of the most common thing (to simulate an e-commerce search scenario).

![](https://i.imgur.com/vhayxVU.png)

With ReactiveSearch cache, the end-to-end network latency drops to an average of 47ms (a 120ms improvement). While the absolute numbers depend on factors such as geographic distance between the client (who's requesting for data) and the server, their connection stability, etc, the comparison between the two doesn't. The key take away is that users can expect to see their latencies drop by the same time that Elasticsearch itself takes to compute the search queries.

### Why

So why doesn't Elasticsearch itself cache the search queries? This is a design decision made within Elasticsearch. It does offer limited caching. We will take some examples to see what gets cached and what doesn't:
- When a search query that contains a filter context (a `term` type of query), the filter context itself is eligible to be cached, but the search query as a whole isn't.
- When a search query is fetching aggregations, it is cached. This caching is done at a shard level. However, if the same query is also fetching hits, it is not cached.
- Any query that needs its responses to be sorted by relevance isn't cached as a whole by Elasticsearch.

ReactiveSearch cache works for any requests that make use of the ReactiveSearch API. If you use the Elasticsearch DSL directly, ReactiveSearch doesn't cache those requests.


## Cache Preferences
![alt cache preferences GUI](https://i.imgur.com/p1ZRR3v.png)

### Enable/Disable Caching
By default the caching is disabled for clusters, there are two ways to enable request caching:
1. Set the caching to `true` in cache preferences,
2. Use the [useCache](/docs/search/reactivesearch-api/reference/#usecache) property as `true` in the [settings](/docs/search/reactivesearch-api/reference/#settings-properties) object of the ReactiveSearch API. It has the higher precedence and if set then cache preferences would be ignored.

### Cache Duration
The time to live for a cached request in seconds. The default value is 300s. Cache Duration must be in a range of 60s to 3600s(1 hr).

### Memory Limit
The memory limit for the cached requests in MB(s). The default value is 128MB. It can go up to 4000MB(4GB).

ReactiveSearch.io uses [Ristretto](https://github.com/dgraph-io/ristretto) for cache management, which uses a sampled LFU policy to free up the cache. Performance for sampled LFU is on par with exact LRU.

### Whitelist indices
It allows you to define which index/indices should be considered to cache the search queries.

## Evict Cache
The `Evict Cache` action allows you to free up the cache by removing all the cached searches instantly.


## How to identify cached responses?
reactivesearch.io sets the `X-Request-Cache` header as `true` for cached responses, i.e. when caching is enabled and the request is also found within the cache. See the below screenshot for an example response.

![cache header](https://i.imgur.com/CRi0KIs.png)

## External Cache Configuration

While ReactiveSearch.io's default cache is fast and suitable for many use cases, there might be scenarios where you need a more persistent and flexible caching solution. For such cases, ReactiveSearch.io allows the configuration of an external Redis compatible cache.

### When to Use External Cache vs Default Cache

Here's a comparison to help you decide when to use an external cache over the internal Ristretto cache:

| Feature | Internal Cache (Ristretto) | External Cache (Redis) |
|---------|-----------------------------|------------------------|
| Persistence | Memory-only, not persisted to disk | Can be persisted to disk |
| Durability | Resets with server restart | Survives server restarts |
| Scalability | Local to a single node | Can scale with primary/replica setups and cluster mode |
| Data Eviction | LFU (Least Frequently Used) policy | Configurable policies including LRU (Least Recently Used) |
| High Availability | Not applicable | Supports failover and backup |

### Configuring Redis Cache

To configure an external Redis cache, you need to provide the Redis server address, password (if required), and the database index. This configuration can be done within the cache preferences section of your ReactiveSearch.io dashboard.

![Screenshot 2566-11-03 at 00 25 50](https://github.com/appbaseio/Docs/assets/630042/1ed1d8de-da74-420a-b080-e929baa6a008)


By opting for an external Redis cache, you gain the benefits of Redis' advanced features such as data persistence, automatic failover, backup capabilities, and fine-grained control over how the data is stored and retrieved.

