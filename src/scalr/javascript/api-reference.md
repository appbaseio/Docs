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

``Object`` **appbaseObj** *Appbase reference object* - has ``index()``, ``update()``, ``delete()``, ``bulk()``, ``search()``, ``streamDocument()`` and ``streamSearch()`` methods.

## WRITING DATA

### index()

Writes (or overwrites) a JSON data object at a given ``type`` and ``id`` location.

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
