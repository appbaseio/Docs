Appbase uses opensource Elasticsearch in the backend, and provides all the powerful search features of ES, on the data stored in Appbase.

When you want to make some data _searchable_, you have to enable search on a namespace in the _Dashboard_. In the _Data Browswr_, enable the search by toggling the <i class="fa fa-eye-slash"></i> switch on the namespace. If search is enabled, you should see this icon <i class="fa fa-eye"></i> next to the namespace. 

Enabling search on a namespace causes all the vertices inside the namespace to be indexed inside Elasticsearch. New vertices created inside this namespace are automatically indexed, and searchable. When the data of a vertex is updated, the indices update automatically and new data is searchable.


## Data Mapping

As in Appbase has the concepts of Namespaces, Vertices and Properties, Elasticsearch has Types, Documents, and Fields. Let's see how Appbase data is indexed and how these concepts are mapped.

Purpose | Appbase | ES
--------|---------|----
Combining similar objects | Namespace | Type
JSON Data Containers | Vertex | Document 
JSON Data Property | Property | Field


In a nutshell, All the _vertices_ of Appbase are stored as _documents_ inside ES, where the _namespace_ of the vertex becomes its _type_. _Properties_ of the vertex can be accessed and filtered as _fields_ inside ES. 

All the examples in this doc ES concepts (Type, Document and Field), as we will be making direct Elasticsearch DSL query, but the query is explained in context the of data in Appbase, so Appbase concepts (Namespace, Vertex and Property) are used.

## Elasticsearch Basics

ElasticSearch is powered by Lucene, a powerful open-source full-text search library, under the hood. Although ES is mainly used for full-text queries, we can use it for number of things, like numeric range queries, geo spatial queries, aggrigation/ordering/grouping search results etc. In addition, we can combine these queries (logical and, or) and search across multiple namespaces and properties. To know more about Elasticsearch, checkout (this link)[].

We see one by one, what queries apply in which use cases, how you can combine them later, and harness the full power that Elasticsearch provides. Let's start with basic usecase

### Equality Queries

### Full-text fuzzy search

### Numeric-range

### Geo spatial

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

You can control this behaviour, and search on multiple namespaces at once, as well as do many powerful things, as we are providing access to all the search features of ElasticSearch as a REST endpoint and a method in Appbase JS Lib.

The query uses DSL syntax of ElasticSearch. A sample query looks something like this:
```js
var query = {
    "namespaces":["user", "tweet"],
    "body": {
        "query": {
             "multi_match": {
                 "fields": ["msg", "name"],
                 "query": "hello",
                 "minimum_should_match": "75%",
                 "fuzziness": "AUTO"
             }
         }
     }
};

Appbase.rawSearch(query, function(error, dslReponse) {
 // ....
});
```
This query would search for the vertices, where either of the properties *name* or *msg* fuzzily matches the text *"hello"*, inside namespaces *tweet* and *user*. I.E., it would search for users named *hello* and the tweets which say *hello*. 

We provide an unaltered DSL Response from ES:
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

The DSL sample query we discussed above, is exactly what we use for `Appbase.ns().search()`, except that it only works on a single namespace.

We are using ElasticSearch 1.3.5. Know more about its DSL [here](http://www.elasticsearch.org/guide/en/elasticsearch/reference/1.x/query-dsl.html).
