# How to

## unsubscribe from a streaming query

The JS API methods for the [``appbaseRef``](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-setup-new-appbase) object implement a **streams** interface. Let's see an example:

```js
// responseStream implements the streams interface.
var responseStream = appbaseRef.streamSearch({
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

``Note:`` The same is true for all other methods (like ``index()``, ``streamDocument()``) as well, data is returned asynchronously via the 'data' event handler.

## pause a streaming query

[Pausing a response stream object](https://nodejs.org/api/stream.html#stream_readable_pause) prevents new data responses from emitting. The stream can be resumed again via conveniently named ``responseStream.resume()``.

```js
responseStream.pause();
```

``Note:`` **pause()** vs **stop()** - pause() merely prevents emitting new 'data' event handlers, the response stream object still continues to capture the new events emitted by the streamQuery() method. In contrast, stop() unsubscribes from the query and kills the response stream object.


## stream results of a range query

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
var responseStream = appbaseRef.streamSearch({
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
