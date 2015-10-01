{"threeColumns": true}

# Javascript API Reference

Appbase.JS is a minimalistic library for data streams.

It can:

* Continuously stream updates to documents, queries or filters over websockets (for browsers) and http-streams.
* Index new documents or update / delete existing ones.
* Is compatible with [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html), which can be used for modifying the ES configurations and for using more esoteric methods.

## SETUP

### new Appbase()

Returns a new Appbase object (refered to as ``appbaseObj`` in all the following examples) using the ``url``, ``appname`` and ``username``:``password`` credentials.

```js
var appbaseObj = new Appbase({
	"url": "https://scalr.api.appbase.io",
	"appname": <YOUR_APP_NAME>,
	"username": <APP_CREDENTIAL>,
	"password": <APP_SECRET>
})
```

**Usage**

``new Appbase(appData)``

- **appData** ``Object`` - A Javascript object containing the following fields and values

	- **url** ``String`` - URL with the API version, always ``https://scalr.api.appbase.io``
	- **appname** ``String`` - name of the app as displayed in the [dashboard](https://appbase.io/scalr)
	- **username** ``String`` - username as displayed in the app dashboard
	- **password** ``String`` - password as displayed in the app dashboard

**Returns**

``Object`` **appbaseObj** *Appbase reference object* - has ``index()``, ``delete()``, ``bulk()``, ``search()``, ``streamDocument()`` and ``streamSearch()`` methods.

## WRITING DATA

### index()

Writes a JSON data object at a given ``type`` and ``id`` location, or updates if an object already exists.

```js
appbaseObj.index({
  type: "tweet",
  id: "1",
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

``appbaseObj.index(params)``

- **params** ``Object`` - A Javascript object containing the type, id and the JSON data to be indexed

	- **type** ``String`` - The type (aka collection) under which the data will be indexed
	- **body** ``Object`` - Data to be indexed, a valid JSON object
	- ***id** ``String`` - ID for the JSON data. ``id`` is auto generated if not specified

### delete()

Delete a JSON data object by ``id``.

```js
appbaseObj.index({
  type: "tweet",
  id: "1"
}).on('data', function(res) {
  console.log("successfully deleted: ", res);
}).on('error', function(err) {
  console.log("deletion error: ", err);
})
```

**Usage**

``appbaseObj.delete(params)``

- **params** ``Object`` - A Javascript object containing the ``type`` and ``id`` of the JSON object to be deleted

	- **type** ``String`` - The type (aka collection) of the object to be deleted
	- **id** ``String`` - ID for the JSON data

### bulk()

Apply many index / delete operations together, useful when importing data for the first time.

```js
appbaseObj.bulk({
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

``appbaseObj.bulk(params)``

- **params** ``Object`` - A Javascript object containing the ``body`` and optionally a default ``type`` to be used for actions

	- **body** ``String`` - A Javascript array of actions to be performed written as a sequence of action#1, data#1, action#2, data#2, ... action#n, data#n
	- ***type** ``String`` - Default document type for actions that don't provide one


## STREAMING DATA

### streamDocument()

Continuously stream a specific JSON document.

```js
appbaseObj.streamDocument({
  type: "tweet",
  id: 1
}).on('data', function(res) {
  console.log("data update: ", res);
}).on('error', function(err) {
  console.log("streaming error: ", err);
})
```

**Usage**

``appbaseObj.streamDocument(params)``

- **params** ``Object`` - A Javascript object containing the ``type`` and ``id`` of the document to be streamed

	- **type** ``String`` - Document type
	- **id** ``String`` - Document ID

``Note:`` appbase.js lib uses websockets (on the browser) and http-streams (on node.js) to stream the updates.

### streamSearch()

Continuously stream results of search query on a ``type``.

```js
appbaseObj.streamSearch({
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

``appbaseObj.streamSearch(params)``

- **params** ``Object`` - A Javascript object containing the ``type`` and ``id`` of the document to be streamed

	- **type** ``String`` - Document type
	- **body** ``String`` - A JSON object specifying a valid query in the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) format

``Note:`` appbase.js lib uses websockets (on the browser) and http-streams (on node.js) to stream the updates.
