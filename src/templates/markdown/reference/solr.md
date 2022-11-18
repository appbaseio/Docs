---
title: 'ReactiveSearch API for Solr'
meta_title: 'ReactiveSearch API Reference | Solr'
meta_description: 'ReactiveSearch API Reference for the Solr search engine'
keywords:
    - concepts
    - appbase
    - search-relevance
    - solr
    - reactivesearch
sidebar: 'docs'
---

This guide helps you to learn more about the each property of `ReactiveSearch` API and explains that how to use those properties to build the query for different use-cases.

This guide only contains the fields supported for the **Solr** search engine.

`ReactiveSearch API` request body can be divided into two parts, `query` and `settings`. The `query` key is an `Array` of objects where each object represents a `ReactiveSearch` query to retrieve the results. Settings(`settings`) is an optional key which can be used to control the search experience. Here is an example of the request body of `ReactiveSearch` API to get the results for which the `title` field matches with `iphone`.

```js
{
    query: [{
        id: "phone-search",
        dataField: "title",
        size: 10,
        value: "iphone"
    }],
    settings: { // optional
        recordAnalytics: true, // to enable the analytics
        enableQueryRules: true, // to enable the query rules
    }
}
```

## Query parameters

Reactivesearch API supports all the [query parameters supported by solr search API](https://solr.apache.org/guide/8_11/common-query-parameters.html).