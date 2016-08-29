{"threeColumns": false, "bigh3": true}

# Quick Start to the ![Scalr](http://i.imgur.com/Eppz2lz.png?1) JS API

[Appbase.JS](https://github.com/appbaseio/appbase-js) is a minimalistic library for data streams.  

It can:

* Continuously stream updates to documents, queries or filters over ``websockets``.
* Index new documents or update / delete existing ones.

It can't:  

* Configure mappings, change analyzers, or capture snapshots. All these are provided by [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) - the official ElasticSearch JS client library.

[Appbase](https://appbase.io) is opinionated about the cluster setup and doesn't support the ElasticSearch devops APIs.

This is a quick start guide to whet the appetite with the possibilities of data streams.

## Step 0: Creating an App

<a href="https://imgflip.com/gif/opgl9"><img src="https://i.imgflip.com/opgl9.gif"/></a>  
Log in to <span class="fa fa-external-link"></span> [Appbase Dashboard](http://appbase.io/scalr/), and create a new app.

For this tutorial, we will use an app called "createnewtestapp01". The &lt;username>:&lt;password> combination for this app is RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f.

> SCALR uses *HTTP Basic Auth*, a widely used protocol for a simple username/password authentication.

## Step 1: Lib Setup

We will fetch and install the **appbase-js** lib using [bower](http://bower.io). We will use ``v0.10.1`` for specificity. 

```js
bower install appbase-js#0.10.1
```

Requiring the lib takes just one line of html script injection:

```html
<script src="bower_components/appbase-js/browser/appbase.js"></script>
```

To write data or stream updates from [appbase.io](https://appbase.io), we need to first create a reference object. We do this by passing the API URL, appname, and a username:password combination into the ``Appbase`` constructor:

```js
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'createnewtestapp01',
  username: 'RIvfxo1u1',
  password: 'dee8ee52-8b75-4b5b-be4f-9df3c364f59f'
});

```

**OR**

```js
var appbaseRef = new Appbase({
  url: 'https://RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f@scalr.api.appbase.io',
  appname: 'createnewtestapp01'
 });
```

Alternatively, username:password can be passed as a part of the API URL in the constructor.



## Step 2: Storing Data

Once we have the reference object (called ``appbaseRef`` in this tutorial), we can insert any JSON object into it with the ``index()`` method.


```js
var jsonObject = {
    "department_name":"Books",
    "department_name_analyzed":"Books",
    "department_id":1,
    "name":"A Fake Book on Network Routing",
    "price":5595
};
```
```js
appbaseRef.index({
    type: 'books',
    id: 'X1',
    body: jsonObject
}).on('data', function(response) {
    console.log(response);
}).on('error', function(error) {
    console.log(error);
});
```

where ``type: 'books'`` indicate the collection (or table) inside which the data will be stored and the``id: '1'`` is an optional unique identifier.

The ``index()`` method (and all the other ``appbase`` methods) return a [stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) object. A 'data' event handler can be used on the returned object (or in a chained fashion) for listening to all the data changes.

> <span class="fa fa-info-circle"></span> If you have noticed, SCALR uses the same APIs and data modeling conventions as [ElasticSearch](https://www.elastic.co/products/elasticsearch). A **type** is equivalent to a *collection in MongoDB* or a *table in SQL*, and a document is similar to the document in MongoDB and equivalent to a *row in SQL*.

## Step 3: <s>GETing</s> vs Streaming Data

Unlike typical databases that support GET operations (or Read) for fetching data and queries, Appbase.io operates on both GET and stream modes. We will first apply the GET mode to read our just inserted object.

Now that we are able to store data, let's try to get the data back from [appbase.io](https://appbase.io) with the ``get()`` method.

```js
appbaseRef.get({
      type: 'books',
      id: 'X1'
}).on('data', function(response) {
      console.log(response)
}).on('error', function(error) {
      console.log(error)
});


GET() RESPONSE
{
  "_index": "createnewtestapp01",
  "_type": "books",
  "_id": "X1",
  "_version": 5,
  "found": true,
  "_source": {
    "department_name": "Books",
    "department_name_analyzed": "Books",
    "department_id": 1,
    "name": "A Fake Book on Network Routing",
    "price": 5595
  }
}
```

Even though ``get()`` returns a single document data, appbase.io returns it as a stream object with the 'data' event handler.


Let's say that we are interested in subscribing to all the state changes that happen on a document. Here, we would use the ``getStream()`` method over ``get()``, which keeps returning new changes made to the document.

### 3.a: Subscribing to document stream

```js
appbaseRef.getStream({
      type: 'books',
      id: 'X1'
}).on('data', function(response) {
      console.log("new document update: ", response)
}).on('error', function(error) {
      console.log("getStream() failed with: ", error)
});
```

Don't be surprised if you don't see anything printed, ``getStream()`` only returns when new updates are made to the document.

### 3.b: Observe the updates in realtime

Let's see live updates in action. We will modify the book price in our original ``jsonObject`` variable from 5595 to 6034 and apply ``index()`` again.

For brevity, we will not show the ``index()`` operation here.

```js
GETSTREAM() RESPONSE
{
  "_type": "books",
  "_id": "X1",
  "_source": {
    "department_id": 1,
    "department_name": "Books",
    "department_name_analyzed": "Books",
    "name": "A Fake Book on Network Routing",
    "price": 6034
  }
}
```

In the new document update, we can see the price change (5595 -> 6034) being reflected. Subsequent changes will be streamed as JSON objects.

``Note:`` Appbase always streams the final state of an object, and not the diff b/w the old state and the new state. You can compute diffs on the client side by persisting the state using a composition of (_type, _id) fields.


## Step 4: Streaming Rich Queries

Streaming document updates are great for building messaging systems or notification feeds on individual objects. What if we were interested in continuously listening to a broader set of data changes? The ``searchStream()`` method scratches this itch perfectly. 

In the example below, we will see it in action with a ``match_all`` query that returns any time a new document is added to the type 'books' or when any of the existing documents are modified.

```js
appbaseRef.searchStream({
    type: 'books',
    body: {
        query: {
            match_all: {}
        }
    }
}).on('data', function(response) {
    console.log("searchStream(), new match: ", response);
}).on('error', function(error) {
    console.log("caught a searchStream() error: ", error)
});

RESPONSE WHEN NEW DATA MATCHES
{
  "_type": "books",
  "_id": "X1",
  "_version": 5,
  "found": true,
  "_source": {
    "department_name": "Books",
    "department_name_analyzed": "Books",
    "department_id": 1,
    "name": "A Fake Book on Network Routing",
    "price": 6034
  }
}
```

``Note:`` Like ``getStream()``, ``searchStream()`` subscribes to the new matches. For fetching existing search results, check out [``search()``](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-getting-data-search).

**v0.10.0** introduces a new method [``searchStreamToURL()``](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-streaming-data-searchstreamtourl) that streams results directly to a URL instead of streaming back.

In this tutorial, we have learnt how to index new data and stream both individual data and results of an expressive query. [Appbase.io](https://appbase.io) supports a wide range of queries.

For next steps, check out our [Javascript API reference](http://docs.appbase.io/scalr/javascript/api-reference.html).
