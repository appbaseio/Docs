{"threeColumns": false}
# Quick Start to the ![Scalr](http://i.imgur.com/Eppz2lz.png?1) Node.JS API

[Appbase.JS](https://github.com/appbaseio/appbase-js) is a minimalistic library for data streams.  

It can:

* Continuously stream documents, apply filters and query results over ``http-streams``.

It can't:  

* Index documents, configure mappings, change analyzers. All these are provided by [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) - the official ElasticSearch JS client library, which we will be using in this guide. 

This is a quick start guide to whet the appetite with the possibilities of data streams.

## Step 0: Creating an App

<a href="https://imgflip.com/gif/opgl9"><img src="https://i.imgflip.com/opgl9.gif"/></a>  
Log in to <span class="fa fa-external-link"></span> [Appbase Dashboard](http://appbase.io/scalr/), and create a new app.

For this tutorial, we will use an app called "createnewtestapp01". The &lt;username>:&lt;password> combination for this app is RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f.

> SCALR uses *HTTP Basic Auth*, a widely used protocol for simple username/password authentication.

## Step 1: Lib Setup

1. Setting up [appbase-js](https://www.npmjs.com/package/appbase-js) is easy.

  ```
  npm install appbase-js
  ```

2. For this tutorial, we will use [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) - the official ElasticSearch client for indexing data.

  ```js
  npm install elasticsearch
  ```

3. Code setup:

  ```js
  // app and authentication configurations  
  const HOSTNAME = "scalr.api.appbase.io"
  const APPNAME = "createnewtestapp01"
  const USERNAME = "RIvfxo1u1"
  const PASSWORD = "dee8ee52-8b75-4b5b-be4f-9df3c364f59f"

  // load 'appbase' and 'elasticsearch' modules
  var appbase = require("appbase-js")
  var elasticsearch = require('elasticsearch')
  
  // elasticsearch client. we use it for indexing, mappings, search settings, etc.
  var client = new elasticsearch.Client({
    host: 'https://'+USERNAME+":"+PASSWORD+"@"+HOSTNAME,
  });
  
  // we will instantiate 'appbase' client when we need streams.
  ```

``HOSTNAME`` for SCALR API always points to "scalr.api.appbase.io". Values of ``APPNAME``, ``USERNAME`` and ``PASSWORD`` are taken from Step 0.

> <span class="fa fa-info-circle"></span> Setting ``USERNAME`` and ``PASSWORD`` are necessary, as SCALR API only allows authenticated requests.

### 1.a: Lib Test

We send a HEAD request to https://scalr.api.appbase.io/?hello=appbase and allow up to 10 seconds for it to complete.

```js
client.ping({
  requestTimeout: 10000,
  hello: "appbase" // appended as query string
}).then(function (body) {
    console.log('All is well');
  }, function(error) {
    console.error('elasticsearch cluster is down!', error);
  }
);
```

If we are doing things correctly, we should see the console beeping "All is well".

## Step 2: Storing Data

Let's insert a JSON object. We create a **type** ``books`` inside our app and add a JSON document ``1`` with a ``.index`` request.

```js
var jsonObject = {
    "department_name":"Books",
    "department_name_analyzed":"Books",
    "department_id":1,
    "name":"A Fake Book on Network Routing",
    "price":5595
  }
client.index({
  index: 'createnewtestapp01',
  type: 'books',
  id: '1',
  body: jsonObject
}).then(function(response) {
    console.log(response);
  }, function(error) {
    console.log(error);
  }
);
```

where ``index: 'createnewtestapp01'`` uses the appname we created in Step 0. 

> <span class="fa fa-external-link-square"></span> Check out the [ES API reference](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html) for more client methods.

> <span class="fa fa-info-circle"></span> If you have noticed, SCALR uses the same APIs as [ElasticSearch](https://www.elastic.co/products/elasticsearch). A **type** is equivalent to a *collection in MongoDB* or a *table in SQL*, and a document is similar to the document in MongoDB and equivalent to a *row in SQL*.

## Step 3: <s>GETing</s> err, Streaming Data

Getting live updates to a document using the ``streamDocument`` method. It's so awesome that we recommend using this as the default way instead of the [``client.get()``](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get) method supported by elasticsearch.js.

```js
// we instantiate appbase client here. We use it for streaming data updates.
var streamingClient = appbase.newClient({
    url: 'https://'+HOSTNAME,
    appname: APPNAME,
    username: USERNAME,
    password: PASSWORD
});

streamingClient.streamDocument({
      type: 'books',
      id: '1'
}).on('data', function(res) {
      // client would emit "data" event every time there is a document update.
      console.log(res)
}).on('error', function(err) {
      console.log(err)
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

Now everytime there is a document update, ``streamingClient.streamDocument(...)`` will emit the "data" event and we will print the parsed JSON on the console.

### 3.a: Modify the Document

Let's modify the book price to 6034.

```js
var jsonObject = {
    "department_name":"Books",
    "department_name_analyzed":"Books",
    "department_id":1,
    "name":"A Fake Book on Network Routing",
    "price":6034
  }
client.index({
  index: 'createnewtestapp01',
  type: 'books',
  id: '1',
  body: jsonObject
}).then(function(response) {
    console.log(response);
  }, function(error) {
    console.log(error);
  }
);
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

## Step 4: Streaming Search

Streaming document updates seems straightforward, can we apply rich filters and queries to our streams? Yes, we can. We can specify any ElasticSearch Query DSL request, and get responses via streams using the ``streamSearch`` method.

We will see it here with a ``match_all`` query request.

```js
streamingClient.streamSearch({
    type: 'books',
    body: {
        query: {
            match_all: {}
        }
    }
}).on('data', function(res) {
    console.log(res);
}).on('error', function(err) {
    console.log("caught a stream error", err)
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
