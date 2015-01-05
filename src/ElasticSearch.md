Appbase uses opensource Elasticsearch in the backend, and provides all the powerful search features of ES, on the data stored in Appbase.

When you want to make some data _searchable_, you have to enable search on a namespace in the _Dashboard_. In the _Data Browser_, enable the search by toggling the <i class="fa fa-eye-slash"></i> switch on the namespace. If search is enabled, you should see this icon <i class="fa fa-eye"></i> next to the namespace. 

Enabling search on a namespace causes all the vertices inside the namespace to be indexed inside Elasticsearch. New vertices created inside this namespace are automatically indexed, and searchable. When the data of a vertex is updated, the indices update automatically and new data is searchable.

## Elasticsearch Introduction

ElasticSearch is powered by Lucene, a powerful open-source full-text search library, under the hood. More than just full-text queries, ES can be used for numeric range queries, geo spatial queries, aggrigation/ordering/grouping search results etc. In addition, we can combine these queries (logical and/or) and search across multiple namespaces and properties. To learn more about Elasticsearch, checkout [this very effective guide](http://exploringelasticsearch.com/).

## Data Mapping

As in Appbase has the concepts of Namespaces, Vertices and Properties, Elasticsearch has Types, Documents, and Fields. Let's see how Appbase data is indexed and how these concepts are mapped.

Purpose | Appbase | ES
--------|---------|----
Combining similar objects | Namespace | Type
JSON Data Containers | Vertex | Document 
JSON Object's Property | Property | Field


In a nutshell, All the _vertices_ of Appbase are stored as _documents_ inside ES, where the _namespace_ of the vertex becomes its _type_. _Properties_ of the vertex can be accessed and filtered as _fields_ inside ES. 

All the examples in this doc ES concepts (Type, Document and Field), as we will be making direct Elasticsearch DSL query, but the query is explained in context the of data in Appbase, so Appbase concepts (Namespace, Vertex and Property) are used.


## Request and Response Format

To do a raw ES query on the data, Appbase provides a [REST API endpoint]() and the Javascript library method [`Appbase.rawSearch()`](). Both of them, accepts similar request Query Object, and gives similar responses. 

### Request

A typical request object defines:

 - __namespaces__ - _array_ : The namespaces on which the query will run
 - __body__ - _object_ : The Elasticsearch Query DSL body

Elasticsearch provides rich Query DSL (Domain Specific Language) based on JSON to define queries. Queries involving major usecases are covered in this documentation, but if you want to know more about DSL, goto [this link](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html).

This is a sample request Query Object: 

```json
{
    "namespaces": ["user", "tweet"],
    "body": {
        "query": {
             "multi_match": {
                 "fields": ["msg", "name"],
                 "query": "hello"
             }
         }
     }
}
```

Do not worry about the `body` of this object for now, we will see how to define it for different use cases in this document.

### Response

We provide an unaltered DSL Response from ES. A typical response includes:

 - __took__ - _number_ : The time it took for the query to run
 - __timeout__ - _boolean_ : If the was query timed out
 - __\_shards__ -  _object_ : Sharding information
 - __hits__ - _object_ : Query results and more
	 - __total__ - _number_: Number of results
	 - __max_score__ - _number_ : The maximum _score_ that matched the query. This score comes into picture when we do a full text query.
	 - __hits__ - _array_ : The results that satisfied the query. Each object inside this array is a JSON object representing a _vertex_,  and has following perperties:
		 - __\_index__ - _string_ : Index inside which the object is stored. Appbase stores all the vertices of a single application inside a single index. So this will equal to the name of Appbase application you are using.
		 - __\_type__ - _string_ : Type of the document. I.E. namespace of the vertex (As explained in the Data Mapping).
		 - __\_id__ - _string_ : Id of the document inside ES.
		 - __\_score__ - _number_ : The score by witch the vertex matched the query
		 - __\_source__ - _object_ : The data inside the document (vertex).

> <sup>Elasticseach sidenote</sup>
> The _score_ of a result describes how close it matches the query.

Example: 

```json
{
	"took": 9,
	"timed_out": false,
	"_shards": {
		"total": 5,
		"successful": 5,
		"failed": 0
	},
	"hits": {
		"total": 2,
		"max_score": 6.41832,
		"hits": [
			{
				"_index": "twitter",
				"_type": "user",
				"_id": "53fa820a5f1f08c11ecb0f95",
				"_score": 6.41832,
				"_source": {
					"timestamp": 1408931734497,
					"rootPath": "user/hello",
					"_id": "53fa820a5f1f08c11ecb0f95",
					"name": "hello"
				}
			},
			{
				"_index": "twitter",
				"_type": "tweet",
				"_id": "546a504316453f340d289d97",
				"_score": 3.7718577,
				"_source": {
					"timestamp": 1416253508159,
					"rootPath": "tweet/244caea78e32401c9b16788219d8efd5",
					"_id": "546a504316453f340d289d97",
					"by": "sid",
					"msg": "hell"
				}
			}
		]
	}
}
```


## Searching

We see one by one, what queries apply in which search use cases, how you can combine them, and harness the full power that Elasticsearch provides. 

In each use case below, it is first described how the data is stored, and what kind of search we are trying to achieve on the data. Let's start with basic use case.

### Simple _Match_

This is the most basic use case we can think of, where you want to just find out vertices which contain a certain _term_, either as a string or a number. 

For example, _"give me all the.."_
	1. users with first name "Andrew"
	2. products priced at "$100"
	3. tweets which say "hello"

We can use the _term filter_ or _term query_ for such cases.

> <sup>Elasticseach sidenote</sup>
> #### ___filter___ vs ___query___  
> A __filter__ in Elasticsearch says Yes or No for a document. I.E. If the document should be present in the results, or not. 
> A __query__ also _scores_ the document (counts the relevance with the desired search term - a heavy operation) and results come sorted according to their score.
> 
> Many filters and queries are similar and can be used interchangeably, but its preferred to use queries only for a full text search based on relevance.
> 
> They can be used together. I.E. Filters are applied first and then on those results, the query is performed calculating the score. They can also be wrapped inside each other. 

> Read more about them [here](http://exploringelasticsearch.com/searching_data.html#sec-searching-filtering).

For all the users with first name as "Andrew",

 - Using the _term __filter___, the request object would be: 
```json
{
    "namespaces": ["user"],
    "body": {
	    "filter" : {
            "term" : { "firstname" : "Andrew" }
        }
	}
}
```

- Using the _term __query___, the request object would be: 
```json
{
    "namespaces": ["user"],
    "body": {
	    "query" : {
            "term" : { "firstname" : "Andrew" }
        }
	}
}
```

 The _term_ filter can also be used for other datatypes, for e.g:

```json
{
    "namespaces": ["product"],
    "body": {
	    "filter" : {
            "term" : { "price" : 100 }
        }
	}
}
```

Another useful query is a _match query_. It allows to define a string of terms and it will find the documents which contains any of these terms. The more matching terms a vertex contains, the higher its score and higher it will be in the sorted results.

```json
{
    "namespaces": ["tweet"],
    "body": {
	    "query" : {
            "match" : { "message" : "hello world" }
        }
	}
}
```

The above search request would find tweets which contains terms "hello" or "world" or both. This behavior can be controlled with `operator`. Its value defaults to "or", but we can set to "and" as well. 

```json
{
    "namespaces": ["tweet"],
    "body": {
	    "query" : {
            "match" : {
	            "message" : {
		            "query" : "hello world",
		            "operator" : "and"
	            }
            }
        }
	}
}
```

The above search request would find tweets which contains terms "hello" and "world", both.

> <sup>Elasticseach sidenote</sup>
> #### ___match___ _query_ and ___terms___ _filter_
> The equivalent filter for a _match query_ is the _terms filter_.
> Read more about them: 
>  -  [_match query_ documentation](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)
>  -  [_terms filter_ documentation](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-terms-filter.html)
>  
#### Searching on multiple properties

The _multi\_match_ query can search on multiple fields (properties) and returned if _any_ of those properties match _any_ of the terms.

The below query would search for users with either first name or last name, being "Andrew" or "Garlic". I.E. also the users with first name as "Garlic" would be included, and vice versa.

```json
{
    "namespaces": ["user"],
    "body": {
	    "query" : {
            "multi_match" : {
	            "query": "Andrew Garlic", 
			    "fields": ["firstname", "lastname"] 
            }
        }
	}
}
```

For more fine tuned searches, like on the users with first name as "Andrew" and last name as "Garlic", we have to combine queries/filters. We see that later in this document.

### Fuzzy

### Numeric-range

### Geo spatial

### Grouping, ordering and aggregation

### Combining queries

### Next steps


# Old document, just kept here for a quick lookup

```js
var query = {text: "ola", properties: ["msg"]};
Appbase.ns('tweet').search(query, function(error, arrayOfVertices) {
  //display vertices
});
```

This simple query searches for all the vertices in the *tweet* namespace, which has a *message* property with its value fuzzily matching the text "ola". This search with also return "ol", "hla", "ole" etc.