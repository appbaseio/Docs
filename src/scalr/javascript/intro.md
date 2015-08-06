{"threeColumns": false}
# Quick Start to the ![Scalr](http://i.imgur.com/Eppz2lz.png?1) JS API

[Appbase.JS](https://github.com/appbaseio/appbase-js) is a minimalistic library for data streams.  

It can:

* Continuously stream documents, apply filters and query results over ``http-streams``.

It can't:  

* Index documents, configure mappings, change analyzers. All these are provided by [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) - the official ElasticSearch JS client library, which we will be using in this guide. 

This is a quick start guide to whet the appetite with the possibilities of data streams.

## Step 0: Creating an App

<a href="https://imgflip.com/gif/opgl9"><img src="https://i.imgflip.com/opgl9.gif"/></a>  
Log in to <span class="fa fa-external-link"></span> [Appbase Dashboard](http://appbase.io/developer/), and create a new app.

For this tutorial, we will use an app called "createnewtestapp01". The &lt;username>:&lt;password> combination for this app is RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f.

> SCALR uses *HTTP Basic Auth*, a widely used protocol for simple username/password authentication.

## Step 1: Lib Setup

Setting up [Appbase.js](https://github.com/appbaseio/appbase-js/blob/master/browser/appbase.js) (or it's [minified counterpart](https://github.com/appbaseio/appbase-js/blob/master/browser/appbase.min.js)) is just one line of html script injection.

```html
<script src="https://cdn.appbase.io/scalr/appbase.js"></script>
```

``appbase`` is the global object exposed by the appbase.js lib. We instantiate a streaming client by passing the Appbase URL which is always of the form 'https://'+username+':'+password+'@scalr.api.appbase.io' and the appname.

```js
var streamingClient = appbase.newClient({
  url: 'https://RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f@scalr.api.appbase.io',
  appname: 'createnewtestapp01'
});

```

For this tutorial, we will use [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) - the official ElasticSearch client for indexing data.

```js
bower install elasticsearch
```

The ``elasticsearch`` lib comes in two flavors.

1. Angular Build

    ```html
    <script src="bower_components/elasticsearch/elasticsearch.angular.js"></script>
    ```

    Include the ``elasticsearch`` module inside your app.

    ```js
    var myApp = angular.module('myApp', ['elasticsearch']);
    ```

    Create a client instance and register it as a service. 
    
    ```js
    module.service('client', function (esFactory) {
      return esFactory({
        host: 'https://RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f@scalr.api.appbase.io',
        // ...
      });
    });
    ```

1. jQuery Build

    ```html
    <script src="bower_components/elasticsearch/elasticsearch.jquery.js"></script>
    ```
    
    Create a client with the jQuery build. 
    ```js
    var client = new $.es.Client({
      hosts: 'https://RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f@scalr.api.appbase.io'
    });
    ```

> <i class="fa fa-info-circle"></i> CORS headers need to enabled on the server side for allowing access from the origin URL. If you are using ElasticSearch via Appbase, we've got you covered here!


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

> <i class="fa fa-external-link-square"></i> Check out the [ES API reference](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html) for more client methods.

> <i class="fa fa-info-circle"></i> If you have noticed, SCALR uses the same APIs as [ElasticSearch](https://www.elastic.co/products/elasticsearch). A **type** is equivalent to a *collection in MongoDB* or a *table in SQL*, and a document is similar to the document in MongoDB and equivalent to a *row in SQL*.

## Step 3: <s>GETing</s> err, Streaming Data

Getting live updates to a document using the ``streamDocument`` method. It's so awesome that we recommend using this as the default way instead of the [``client.get()``](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get) method supported by elasticsearch.js.

```js
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

Appbase.io keeps an open connection so that every time there is an update in the ``/$app/books/1`` document, it is streamed via the connection.

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
streamingClient.streamDocument({
      type: 'books',
      id: '1'
}).on('data', function(res) {
      // client would emit "data" event every time there is a document update.
      console.log(res)
}).on('error', function(err) {
      console.log(err)
})

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
}).on('data', function(res, err) {
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
