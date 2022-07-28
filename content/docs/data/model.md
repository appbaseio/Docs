---
title: 'Data Model'
meta_title: 'Data Model with Elasticsearch and ReactiveSearch'
meta_description: 'How to model data with Elasticsearch and ReactiveSEarch'
keywords:
    - dataschema
    - appbase
    - reactivesearch
    - datamodel
    - opensearch
    - elasticsearch
sidebar: 'docs'
---

In this post, we will provide a primer on how to model data in Elasticsearch or OpenSearch.

![](https://i.imgur.com/aaxqnN2.png)

The ReactiveSearch.io stack provides a supercharged experience for building search UIs for search engines such as Elasticsearch, OpenSearch, MongoDB and Solr. This guide is specific to data modeling and indexing of data and applies to Elasticsearch and OpenSearch engines only.

As far as data modeling is concerned, it's Elasticsearch all the way!

## Cluster

A [ReactiveSearch cluster](/docs/hosting/clusters/) is equivalent to an Elasticsearch cluster. You can use Reactivesearch to:
- deploy Elasticsearch and ReactiveSearch together as a hosted service or,
- deploy ReactiveSearch along with [your own Elasticsearch cluster](/docs/hosting/byoc/).

Elasticsearch (or OpenSearch) is a distributed search and analytics engine built on top of Apache Lucene.


### Index

A cluster is composed of indexes. An index in ReactiveSearch is equivalent to an index in Elasticsearch. Sometimes, the index is also referred to as an app (legacy notation).

An index is an optimized collection of documents that are related to each other.


## Document

A **document** is how the actual data is stored in an app (or index). A document is a `JSON` object, and can be thought of as an equivalent to a **record** in SQL.

A document is a collection of fields. Each field has a data type (known as a mapping type) that can either be set at the outset or can be inferred dynamically when a new field gets indexed. Here's an example of a document:

```json
{
	"type": "data",
	"life": 42,
	"object": {
		"how's this": "one nested value"
	}
}
```

Depending on the data types, Elasticsearch uses specialized data structures for indexing each field. Apart from data types themselves, Elasticsearch being a search engine has a notion of **analysis**.

A field that contains analyzed text uses a data structure called an [**inverted index**](https://en.wikipedia.org/wiki/Inverted_index), which is designed to allow very fast full-text searches. An inverted index (unlike a forward index) creates a map of every unique word to its location within the document(s) the word occurs in as well as its frequency of occurrence across the entire index.

A non-analyzed text field is identified as a [keyword](https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html) type. Numbers, geo points, dates are all non-analyzed. The concept of analysis only applies to a text data type. Non-analyzed data is treated in a very similar way as other databases treat them, and it's used for making exact queries.

During the indexing process, Elasticsearch stores documents and builds an inverted index to make the document data searchable in near real-time. Indexing is initiated with the [index API](https://rest.appbase.io/?version=latest#81149466-4ba5-8214-56f6-6a0d2f3bebcc), through which you can add or update a JSON document in a specific index.

## Multi Fields

Since the notion of analysis is relevant for search engines, a user may wish to index a field as both analyzed and non-analyzed to handle both the use-cases of:
- Searching (perform a typo-tolerant full-text search),
- Aggregating (creating facets, sorting, performing exact queries).

In addition, you may also want to analyze the same field in different ways for better relevance.

Elasticsearch supports creation of [multi fields](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html) for both of these scenarios.

ReactiveSearch takes an opinionated approach to power search and aggregations in a universal manner.

When setting the use-case as `Search` within ReactiveSearch dashboard's [Schema UI](/docs/search/relevancy/#schema), a field will have the following multi-fields added. This covers all the search scenarios, from handling autosuggestions, partial search, a language specific search to a synonyms driven search.

| <p style="margin: 0px;" class="table-header-text">Field</p> | <p style="margin: 0px;" class="table-header-text">Description</p> | <p style="margin: 0px;" class="table-header-text">When To Use</p> |
|-------|-------------|-------------|
| `${field}` | Analyzed field using a standard analyzer. | A good default field to search on. |
| `${field}.keyword` | Non-analyzed field. | Useful for finding exact matches. |
| `${field}.search` | Analyzed field using a {2, 9} n-gram analyzer. | This is useful for partial word matches. |
| `${field}.autosuggest` | Analyzed field using a {2, 20} edge n-gram analyzer. | This is useful for longer partial word matches, typically suited for an autosuggest search. |
| `${field}.lang` | Analyzed field using the user provided language. | This is useful when searching on text in a specific language, e.g. Spanish. |
| `${field}.synonyms` | Analyzed field for handling synonyms at search time. | This is useful when synonyms are enabled. |

## Querying

Once data is indexed, it can be queried using the [Elasticsearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html).

Here's an example of a `match` query:

```json
GET /:index/_search
{
    "query": {
        "match" : {
            "type" : {
                "query" : "data"
            }
        }
    }
}
```

This query will return all the documents whose field `type` contains the value "data".

Elasticsearch uses an imperative Query DSL, like most search engines two. This requires users to learn the process of analysis, setting mappings and the JSON Query DSL of Elasticsearch to be able to effectively leverage Elasticsearch. Further, this typically needs to be exposed over a REST API -- allowing a client to specify Query DSL is a security risk as it allows script injections and DoS scenarios.

ReactiveSearch.io offers a declarative Query API for querying Elasticsearch to address these issues - [ReactiveSearch API](/docs/search/reactivesearch-api/). This same API is used by UI libraries such as [ReactiveSearch](https://github.com/appbaseio/reactivesearch) and [Searchbox](https://github.com/appbaseio/searchbox) - which are used by thousands of projects for building their Search UIs.

Whenever possible, we recommend using ReactiveSearch API over Elasticsearch's Query DSL to build search apps with predictable performance that are easier to write and safe by design.
