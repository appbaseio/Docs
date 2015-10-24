{"threeColumns": false}
# Quick Start to the ![Scalr](http://i.imgur.com/Eppz2lz.png?1) Node.JS API

[Appbase.JS](https://github.com/appbaseio/appbase-js) is a minimalistic library for data streams.  

It can:

* Continuously stream updates to documents, queries or filters over ``websockets`` (for browsers) and ``http-streams``.
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

We will fetch and install the **appbase-js** lib via [npm](https://www.npmjs.com/package/appbase-js), current version should be v0.8.0.

```js
npm install appbase-js
```

Requiring the lib takes one line:

```js
var Appbase = require('appbase-js');
```

To write data or stream updates from [appbase.io](https://appbase.io), we need to first create a reference object. We do this by passing the API URL, appname, and a username:password combination into the ``Appbase`` constructor:

```js
var appbase = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'createnewtestapp01',
  username: 'RIvfxo1u1',
  password: 'dee8ee52-8b75-4b5b-be4f-9df3c364f59f'
});

```

**OR**

```js
var appbase = new Appbase({
  url: 'https://RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f@scalr.api.appbase.io',
  appname: 'createnewtestapp01'
 })
```

Alternatively, username:password can be passed as a part of the API URL in the constructor.



## Step 2: Storing Data

Once we have the reference object (called ``appbase`` in this tutorial), we can insert any JSON object into it with the ``index()`` method.


```js
var jsonObject = {
    "department_name":"Books",
    "department_name_analyzed":"Books",
    "department_id":1,
    "name":"A Fake Book on Network Routing",
    "price":5595
}
```
```
appbase.index({
    type: 'books',
    id: '1',
    body: jsonObject
}).on('data', function(response) {
    console.log(response);
}).on('error', function(error) {
    console.log(error);
});
```

where ``type: 'books'`` indicates the collection (or table) inside which the data will be stored and the``id: '1'`` is an optional unique identifier.

The ``index()`` method (and all the other ``appbase`` methods) return a [stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) object. A 'data' event handler can be used on the returned object (or in a chained fashion) for listening to all the data changes.

> <span class="fa fa-info-circle"></span> If you have noticed, SCALR uses the same APIs and data modeling conventions as [ElasticSearch](https://www.elastic.co/products/elasticsearch). A **type** is equivalent to a *collection in MongoDB* or a *table in SQL*, and a document is similar to the document in MongoDB and equivalent to a *row in SQL*.

## Step 3: <s>GETing</s> err, Streaming Data

Now that we are able to store data, let's try to get the data back from [appbase.io](https://appbase.io) with the ``readStream()`` method.

```js
appbase.readStream({
      type: 'books',
      id: '1'
}).on('data', function(response) {
      console.log(response)
}).on('error', function(error) {
      console.log(error)
})


INITIAL RESPONSE
{
  "_index": "app`248",
  "_type": "books",
  "_id": "1",
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

Everytime there is a document update, our 'data' event handler will emit the document with the final value.

### 3.a: Modify the Document

Let's see this in action. We will modify the book price in our original ``jsonObject`` variable from 5595 to 6034.

```js
var jsonObject = {
    "department_name":"Books",
    "department_name_analyzed":"Books",
    "department_id":1,
    "name":"A Fake Book on Network Routing",
    "price":6034
  }
```

### 3.b: Observe the Streams

```js
RESPONSE AFTER 3.a
{
  "_type": "books",
  "_id": "1",
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

``Note:`` Appbase always streams the final state of an object, and not the diff b/w the old state and the new state. You can compute diffs on the client side by keeping the state using the composition of (_type, _id) fields.


## Step 4: Streaming Rich Queries

Streaming document updates are great for building messaging systems or notification feeds on individual objects. What if we were interested in continuously listening to a broader set of data? The ``searchStream()`` method scratches this itch perfectly. 

In the example below, we will see it in action with a ``match_all`` query that returns any time a new document is added to the type 'books' or when any of the existing documents are modified.

```js
appbase.searchStream({
    type: 'books',
    body: {
        query: {
            match_all: {}
        }
    }
}).on('data', function(response) {
    console.log(response);
}).on('error', function(error) {
    console.log("caught a stream error", error)
})

INITIAL RESPONSE
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 1,
    "hits": [
      {
        "_index": "app`248",
        "_type": "books",
        "_id": "1",
        "_score": 1,
        "_source": {
          "price": 6034,
          "department_name": "Books",
          "department_name_analyzed": "Books",
          "department_id": 1,
          "name": "A Fake Book on Network Routing"
        }
      }
    ]
  }
}
```

In this tutorial, we learned how to index new data and stream 1.) individual data document and 2.) results of a data query. [Appbase.io](https://appbase.io) supports a wide range of queries.

For next steps, check out our [Javascript API reference](http://docs.appbase.io/scalr/javascript/api-reference.html) or take a look at the <span class="fa fa-external-link-square"></span>[ElasticSearch JS reference](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html) for a deeper dive.
