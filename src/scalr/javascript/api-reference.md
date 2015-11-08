{"threeColumns": true, "bigh3": true}

# Javascript API Reference

Appbase.JS is a minimalistic library for data streams.

It can:

* Continuously stream updates to documents, queries or filters over websockets (for browsers) and http-streams.
* Index new documents or update / delete existing ones.
* Is compatible with [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html), which can be used for modifying the ES configurations and for using more esoteric methods.

You can read the [Javascript](http://docs.appbase.io/scalr/javascript/javascript-intro.html) or [Node.JS](http://docs.appbase.io/scalr/javascript/nodejs-intro.html) quick-start guides for installation and basic usage.

## SETUP

### new Appbase()

Returns a new Appbase object (refered to as ``appbaseRef`` in all the following examples) using the ``url``, ``appname`` and ``username``:``password`` credentials.

```js
var appbaseRef = new Appbase({
	"url": "https://scalr.api.appbase.io",
	"appname": <YOUR_APP_NAME>,
	"username": <APP_CREDENTIAL>,
	"password": <APP_SECRET>
})
```

**Usage**

``new Appbase(appData)``

- **appData** ``Object`` - A Javascript object containing the following fields and values

	- **url** ``String`` - URL with the API version, always *https://scalr.api.appbase.io*
	- **appname** ``String`` - name of the app as displayed in the [dashboard](https://appbase.io/scalr)
	- **username** ``String`` - username as displayed in the app dashboard
	- **password** ``String`` - password as displayed in the app dashboard

**Returns**

``Object`` **appbaseRef** *Appbase reference object* - has ``index()``, ``delete()``, ``bulk()``, ``search()``, ``get()``, ``getTypes()``, ``getStream()`` and ``searchStream()`` methods.

## WRITING DATA

### index()

Writes a JSON data object at a given ``type`` and ``id`` location, or updates if an object already exists.

```js
appbaseRef.index({
  type: "tweet",
  id: "aX12c5",
  body: {
    "msg": "writing my first tweet!",
    "by": "jack",
    "using": ["appbase.io", "javascript", "streams"],
    "test": true
  }
}).on('data', function(res) {
  console.log("successfully indexed: ", res);
}).on('error', function(err) {
  console.log("indexing error: ", err);
})
```

**Usage**

``appbaseRef.index(params)``

- **params** ``Object`` - A Javascript object containing the type, id and the JSON data to be indexed

	- **type** ``String`` - The type (aka collection) under which the data will be indexed
	- **body** ``Object`` - Data to be indexed, a valid JSON object
	- **id** ``String`` - Unique ID for the JSON data. ``id`` is auto generated if not specified

### delete()

Delete a JSON data object by ``id``.

```js
appbaseRef.delete({
  type: "tweet",
  id: "aX12c5"
}).on('data', function(res) {
  console.log("successfully deleted: ", res);
}).on('error', function(err) {
  console.log("deletion error: ", err);
})
```

**Usage**

``appbaseRef.delete(params)``

- **params** ``Object`` - A Javascript object containing the ``type`` and ``id`` of the JSON object to be deleted

	- **type** ``String`` - The type (aka collection) of the object to be deleted
	- **id** ``String`` - Unique ID for the JSON data

### bulk()

Apply many index / delete operations together, useful when importing data for the first time.

```js
appbaseRef.bulk({
  type: "tweet",
  body: [
    // action#1 description
    { index: { _id: 2 } },
    // the JSON data to index
    { "msg": "writing my second tweet!",
      "by": "Ev",
      "using": ["appbase.io", "javascript", "streams"],
      "test": true
    },
    // action#2 description
    { delete: { _id: 2 } },
    // deletion doesn't any further input
  ]
}).on('data', function(res) {
  console.log("successful bulk: ", res);
}).on('error', function(err) {
  console.log("bulk failed: ", err);
})
```

**Usage**

``appbaseRef.bulk(params)``

- **params** ``Object`` - A Javascript object containing the ``body`` and optionally a default ``type`` to be used for actions

	- **body** ``String`` - A Javascript array of actions to be performed written as a sequence of action#1, data#1, action#2, data#2, ... action#n, data#n
	- **type** ``String`` - Default document type for actions that don't provide one


## GETTING DATA

### get()

Get the JSON document from a particular ``type`` and ``id``. For subscribing to realtime updates on a document, check out ``getStream()``.

```js
appbaseRef.get({
  "type": "tweet",
  "id": "aX12c5"
}).on('data', function(res) {
  console.log("The document data: ", res);
}).on('error', function(err) {
  console.log("get() method failed with: ", err);
})
```

**Usage**

``appbaseRef.get(params)``

- **params** ``Object`` - A Javascript object containing the ``type`` and ``id`` of the document to retrieve.  
	- **type** ``String`` - Document Type
	- **id** ``String`` - Unique ID of the JSON document

Returns the document at the given ``type`` and ``id``.


### getTypes()

Get all the ``types`` of an appname.

```js
appbaseRef.getTypes().on('data', function(res) {
  console.log("All app types: ", res);
}).on('error', function(err) {
  console.log("getTypes() failed: ", err);
})
```

**Usage**

``appbaseRef.getTypes()``

Returns all the ``types`` as an array.

### search()

Search for matching documents in a type. It's a convenience method for ElasticSearch's ``/_search`` endpoint.  For subscribing to realtime updates on the search query, check out ``searchStream()``.

```js
appbaseRef.search({
  type: "tweet",
  body: {
    query: {
      match_all: {}
    }
  }
}).on('data', function(res) {
  console.log("query result: ", res);
}).on('error', function(err) {
  console.log("search error: ", err);
})
```

**Usage**

``appbaseRef.search(params)``

- **params** ``Object`` - A Javascript object containing the query ``type`` and ``body``.

	- **type** ``String`` - Document type
	- **body** ``String`` - A JSON object specifying a valid query in the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) format

**Returns**

[stream.Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable) ``Object`` with

- ``'data'`` and ``'error'`` event handlers to return the results and any errors.


## STREAMING DATA

### getStream()

Continuously stream new updates to a specific JSON document. If you wish to only fetch the existing value, ``get()`` is sufficient.

```js
appbaseRef.getStream({
  type: "tweet",
  id: "aX12c5",
}).on('data', function(res) {
  console.log("data update: ", res);
}).on('error', function(err) {
  console.log("streaming error: ", err);
})
```

**Usage**

``appbaseRef.getStream(params)``

- **params** ``Object`` - A Javascript object containing the ``type`` and ``id`` of the document to be streamed.

	- **type** ``String`` - Document type
	- **id** ``String`` - Document ID (The ID is always a ``String`` value)

<span class="fa fa-info-circle"></span> The ``streamOnly`` field parameter is deprecated starting v0.9.0 onwards, and is the default for how ``getStream()`` works (previously ``readStream()``).

**Returns**

[stream.Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable) ``Object`` with

- ``'data'`` and ``'error'`` event handlers
- a **stop()** method to stop the stream

```js
var responseStream = appbaseRef.getStream({
  type: "tweet",
  id: 1,
})

responseStream.on('data', function(res) {
  console.log("data update: ", res);
});

responseStream.stop();
```


``Note:`` appbase.js lib uses websockets to stream the updates.

### searchStream()

Continuously stream results of search query on a given ``type``. Search queries can be a variety of things: from simple monitoring queries, finding an exact set of documents, full-text search queries, to geolocation queries.

``searchStream()`` only returns new search results after the query is performed, existing search results can be obtained via ``search()`` method.

```js
appbaseRef.searchStream({
  type: "tweet",
  body: {
    query: {
      match_all: {}
    }
  }
}).on('data', function(res) {
  console.log("query update: ", res);
}).on('error', function(err) {
  console.log("streaming error: ", err);
})
```

**Usage**

``appbaseRef.searchStream(params)``

- **params** ``Object`` - A Javascript object containing the query ``type`` and ``body``

	- **type** ``String`` - Document type
	- **body** ``String`` - A JSON object specifying a valid query in the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) format


<span class="fa fa-info-circle"></span> The ``streamOnly`` field parameter is deprecated starting v0.9.0 onwards, and is the default for how ``searchStream()`` works.

**Returns**

[stream.Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable) ``Object`` with

- ``'data'`` and ``'error'`` event handlers
- a **stop()** method to stop the stream

```js
var responseStream = appbaseRef.searchStream({
  type: "tweet",
  body: {
    query: {
      match_all: {}
    }
  }
})

responseStream.on('data', function(res) {
  console.log("data update: ", res);
});

setTimeout(responseStream.stop, 5000); // stop stream after 5s
```
