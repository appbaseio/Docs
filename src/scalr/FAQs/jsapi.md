# How to

## Unsubscribe from a streaming query

The JS API methods for the [``appbaseRef``](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-setup-new-appbase) object implement a **streams** interface. Let's see an example:

```js
// responseStream implements the streams interface.
var responseStream = appbaseRef.searchStream({
    type: "tweet",
    body: {
        query: {
            match_all: {}
        }
    }
})

// You can attach a 'data' handler to responseStream and get new events
// when documents match the query
responseStream.on("data", function(res) {
    if (res.hits) { 
        // handle initial data
    } else {
        // handle new updates, one at a time.
    }
});
```

Unsubscribing from the ``responseStream`` is simple: using ``stop()`` method.

```js
setTimeout(function() {responseStream.stop()}, 10000); // unsubscribes after 10s timeout
```

``Note:`` The same is true for all other methods (like ``index()``, ``readStream()``) as well, data is returned asynchronously via the 'data' event handler.

## Pause a streaming query

[Pausing a response stream object](https://nodejs.org/api/stream.html#stream_readable_pause) prevents new data responses from emitting. The stream can be resumed again via conveniently named ``responseStream.resume()``.

```js
responseStream.pause();
```

``Note:`` **pause()** vs **stop()** - pause() merely prevents emitting new 'data' event handlers, the response stream object still continues to capture the new events emitted by the searchStream() method. In contrast, stop() unsubscribes from the query and kills the response stream object.


## Stream results of a range query

Appbase.io implements a streaming interface for the entire [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl.html) supported by ElasticSearch. So if we can compose a range query, making it return continuous results is easy.

Let's say we have a **type** called *items* which contains items with their corresponding value. An example document inside the *items* type looks like:

```json
{
    "item": "socks",
    "value": "255",
    "visible": true
}
```

Composing the query:

```js
var responseStream = appbaseRef.searchStream({
      type: "items",
      body: {
          query: {
              range: {
                  value: {
                      lte: 300,
                      gte: 200
                  }
              }
          }
      }
})
```

The default state of ``responseStream`` object is paused. As soon as attach a data handler to it, it will start streaming the responses.

```js
responseStream.on("data", function(res) {
    if (res.hits) {
        console.log(res.hits.hits); // returns an array of initially matching objects
    } else {
        console.log(res._source);   // a newly inserted document just matched the range query 
    }
})
```

## Update mapping without losing data

We are often asked to update a mapping of a field. But once the data is indexed in to ES it cannot be modified. Appbase is built on Elastic search. According to elastic search doc [here](https://www.elastic.co/blog/changing-mapping-with-zero-downtime):

> You can only find that which is stored in your index. In order to make your data searchable, your database needs to know what type of data each field contains and how it should be indexed. If you switch a field type from e.g. a string to a date, all of the data for that field that you already have indexed becomes useless. One way or another, you need to reindex that field.

> This applies not just to Elasticsearch, but to any database that uses indices for searching. And if it isn't using indices then it is sacrificing speed for flexibility.

###Althought adding a new field does not require you to reindex your database.

    A segment only contains indices for fields that actually exist in the documents for that segment. This means that you can add new fields for free, using the put_mapping API. There is no need to reindex.

###Reindexing your data
The process for reindexing your data is quite simple. First, create a new index with the new mapping and settings:

    curl -XPUT localhost:9200/new_index -d '
    {
        "mappings": {
            "my_type": { ... new mapping definition ...}
        }
    }'

Then, pull the documents in from your old index, using a scrolled search and index them into the new index using the bulk API. Many of the client APIs provide a reindex() method which will do all of this for you. Once you are done, you can delete the old index.

Note: make sure that you include search_type=scan in your search request. This disables sorting and makes “deep paging" efficient.

The problem with this approach is that the index name changes, which means that you need to change your application to use the new index name

###Reindexing your data with zero downtime
Index aliases give us the flexibility to reindex data in the background, making the change completely transparent to our application. An alias is like a symbolic link which can point to one or more real indices.

The typical workflow is as follows. First, create an index, appending a version or timestamp to the name:

    curl -XPUT localhost:9200/my_index_v1 -d '
    { 
	    ... mappings ... 
	}'

Create an alias which points to the index:

    curl -XPOST localhost:9200/_aliases -d '
    {
        "actions": [
            { "add": {
                "alias": "my_index",
                "index": "my_index_v1"
            }}
        ]
    }'

Now your application can speak to my_index as if it were a real index.

When you need to reindex your data, you can create a new index, appending a new version number:

    curl -XPUT localhost:9200/my_index_v2 -d '
    { 
	    ... mappings ...
	}'

Reindex data from my_index_v1 to the new my_index_v2, then change the myindex alias to point to the new index, in a single atomic step:

    curl -XPOST localhost:9200/_aliases -d '
    {
        "actions": [
            { "remove": {
                "alias": "my_index",
                "index": "my_index_v1"
            }},
            { "add": {
                "alias": "my_index",
                "index": "my_index_v2"
            }}
        ]
    }'

And finally, delete the old index:

    curl -XDELETE localhost:9200/my_index_v1

You have successfully reindexed all of your data in the background without any downtime. Your application is blissfully unaware that the index has changed.

Reference: [Elastic Search blog](https://www.elastic.co/blog/changing-mapping-with-zero-downtime)
