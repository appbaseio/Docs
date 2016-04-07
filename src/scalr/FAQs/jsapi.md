{"bigh3":true}

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
    // handle new updates, one at a time.
    console.log(res);
});
```

Unsubscribing from the ``responseStream`` is simple: using ``stop()`` method.

```js
setTimeout(function() {responseStream.stop()}, 10000); // unsubscribes after 10s timeout
```

> <span class="fa fa-info-circle"></span> The same is true for all other methods (like ``index()``, ``getStream()``) as well, data is returned asynchronously via the 'data' event handler.

## Pause a streaming query

[Pausing a response stream object](https://nodejs.org/api/stream.html#stream_readable_pause) prevents new data responses from emitting. The stream can be resumed again via conveniently named ``responseStream.resume()``.

```js
responseStream.pause();
```

> <span class="fa fa-info-circle"></span> **pause()** vs **stop()** - pause() merely prevents emitting new responses in the 'data' event handler, all the response stream object buffers the new events emitted by the ``searchStream()`` method. When resume() is called, all these responses are returned by the 'data' event handler. 

By contrast, ``stop()`` unsubscribes from the query and kills the response stream object.

> <span class="fa fa-star"></span> Check out more things you can do with streams here -  http://www.sitepoint.com/basics-node-js-streams/.

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
    console.log(res._source);   // a newly inserted document just matched the range query 
})
```

## Change the default results in a search query

Appbase returns 10 objects in the initial response to ``searchStream()`` method. Sometimes, we need to return more objects. We can do this by specifying the ``size`` attribute inside our query like this:

```
var responseStream = appbaseRef.searchStream({
      type: "items",
      size: 100,
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

The ``responseStream`` object will now return max(total_objects_matching_our_query, 100) objects on the ``'data'`` event handler.

> <span class="fa fa-star"></span> The ``size`` attribute can specify a maximum of 1000 objects to return in one response.

> <span class="fa fa-info-circle"></span> ``size`` attribute can be applied on both ``searchStream()`` and ``search()`` methods.


## Scroll results in a search query

While the ``size`` attribute inside the query can allow you to control the number of results to return initially, it does not let you implement a scroll like functionality: i.e. showing results from a particular offset in correspondence with user's navigation behavior. The ``from`` parameter comes handy here.

```
var response = appbaseRef.search({
      type: "items",
      size: 100,
      from: 50,
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

The ``response`` object will now return up to 100 objects starting from the 51<sup>st</sup> object.

> <span class="fa fa-info-circle"></span> ``from`` attribute is effective for the ``search()`` method, but not for the ``searchStream()`` method as the latter only returns one result at a time.
