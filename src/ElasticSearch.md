With ElasticSearch's powerful APIs in the backend, Appbase supports full-text fuzzy search queries on namespaces. A sample query on a namespace looks something like this: 

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
