---
title: 'REST Examples for Solr'
meta_title: 'Examples using REST API for Solr'
meta_description: 'Interactive examples using ReactiveSearch REST API for Solr'
keywords:
    - REST
    - examples
    - appbase
    - reactivesearch
    - solr
    - fusion
sidebar: 'api-reference'
---

Interactive Examples using the ReactiveSearch REST API

While appbase.io maintains 100% API compatibility with Solr, it also provides a declarative API to query Elasticsearch. This is the recommended way to query via web and mobile apps as it prevents query injection attacks. It lets you make use of appbase.io features like caching, query rules, server-side search settings, and analytics.


## ReactiveSearch API Examples

You can read the API reference for the ReactiveSearch API over [here](/docs/search/reactivesearch-api/reference). In the following section, we will show interactive examples for using the API.

### Basic Usage

This is just a basic usage example for Solr. The following query translates to Solr and gets the results accordingly.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/6hAfrxKKZCULrXYj1ptR"></iframe>

### Search + Facet

In this example, we will see how to apply a search and a facet query together. This makes use of two queries.

We also introduce a concept for executing a query that depends on another query using the react and execute properties. Here, the search query also utilizes the value of the facet query while returning the documents.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/eHTNzbiY8juxwmpYtdCs"></iframe>

### Search + Facet + Result

In this example, we will be using three queries: search + facet + result. If you had a UI, visualize a scenario where the user has entered something in the searchbox and selected a value in the facet filter. These two should inform the final results that get displayed.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/xk1ECQ0N1VNRVzAEKcs2"></iframe>

> Note: execute property's usage shows whether we expect the particular query to return a response. It's set to true only for the results (books) query, as a result, only that key is returned back.

### Search + Facet + Result + Range

In this example, we will see a more complex use-case where an additional range filter is also applied.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/r8dfWUVYyhwBxov2UgjW"></iframe>

### Use Solr Query

In this example, we show how to use Solr's query using the defaultQuery property. This provides the flexibility of overriding the ReactiveSearch API completely for advanced use-cases.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/gd1N8h3quPXIg3ukUjh4"></iframe>


### Combining ReactiveSearch API with Solr Query

In this example, we show how to use Solr's query for writing a term query using the customQuery property. This query is then applied to the search results query, which is composed using the ReactiveSearch API.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/rPUT7N2HhE7nsRAhrBDV"></iframe>

### Configuring Search Settings

In this example, we see usage of advanced search settings that show how to record custom analytics events, pass custom data, and enable cache (per request).

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/tr17HUK5wHCQlkXEso8y"></iframe>

### Search + Geo

In this example, we will see an application of a search query along with a geo query. We are searching for houses within 1000000km distance of a particular location co-ordinate.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/k123UjA2kaDTPFpcXrMX"></iframe>

### Search on Multiple Indices

In this example, we make two search queries - each on a different index.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/ste5gaALLxEW78hXezHX"></iframe>
