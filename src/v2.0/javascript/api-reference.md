{"threeColumns": true}
# Introduction

The Appbase JS library allows developers to create realtime multi-user apps using a graph data model and realtime smart-search capabilities.

To use it in the browser, use this link: https://cdn.appbase.io/latest/appbase.js

To use it with nodejs, do `npm install appbasejs`

The Appbase library exposes the ``Appbase`` object. The methods in the JS lib rely on three main objects.

1. **Appbase**
2. **Namespace Reference** (referred as ``nsref`` in this doc)
3. **Vertex Reference** (referred as ``vref`` in this doc)

# Appbase

**Appbase** is the global object exposed the JS library. It has the following four methods: ``credentials()``, 
``ns()``, ``uuid()``, and ``serverTime()``.

## Setting up

### credentials()

Authorize the app credentials using the appname and appsecret identifiers, as they appear in the [Dev Console](//appbase.io/developer).

```js
Appbase.credentials('aphrodite',
'4d8d0072580912343cd74aa0015cd217',
function(error, isAuthorized) {
  if (!error && isAuthorized)
    console.log("app successfully registered");
});
```
**Usage**

``Appbase.credentials(appname, [appsecret , onComplete])``

- **appname** ``String`` — App name
- **appsecret** ``String`` (optional) — App secret key
    While using Appbase clientside, app secret should not be used, as it will be exposed in the Javascript file. [User Authentication](http://docs.appbase.io/#/v2.0/javascript/oauth) is recommended in the clientside use of Appbase Library.
- **onComplete** ``Function`` — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if event listening is successful
	- **isAuthorized** ``Boolean`` — Whether the credentials are correct or not
	
## Namespaces

### ns()

Get the namespace reference with the passed *string identifier*. It creates a new namespace if one doesn't already exist, else returns reference to the existing namespace. See _Namespace Reference_ docs for how namespaces work.

```js
var nsref = Appbase.ns("Domains");
```

**Usage**

``Appbase.ns(namespace)``

* **namespace** ``String`` — Namespace identifier (can contain all ascii characters except for whitespaces, '/', ':', and '~'.)

**Returns**

``Object`` **nsref** *Namespace Reference*


## Fantastic Search

### rawSearch()

Appbase uses ElasticSearch in the backend. To completely understand how it works, please refer to [this page](http://docs.appbase.io/docs/elasticsearch.html).

## Utility

### uuid()

Returns a 32-character uuid.

```js
console.log(Appbase.uuid());  // 32-character string
```

**Usage**

``Appbase.uuid()``

**Returns**

``String`` UUID

### serverTime()

Obtain the current time in *milliseconds* since epoch.

```js
var abref = Appbase.serverTime(
  function onComplete(error, time) {
    if (error === null) { // confirming no errors
      console.log(time);  // 1413133493597
    }
  });
```

**Usage**

``Appbase.serverTime(onComplete)``

- **onComplete** ``Function`` will be passed with two arguments.

  - **error** `String` / `null` — *String* containing the error message, *null* if `serverTime()` returns successfully.
  - **time** `Number` — the current time of server in  milliseconds since epoch

# Namespace Reference

Namespace Reference Object or ``nsref`` has methods for creating vertices, searching vertices, and event listeners to the addition and removal of vertices.

## Vertices

### v()

Creates a new vertex or obtains a reference to an existing vertex.

```js
nsref = Appbase.ns("Domains");
// will return the vertex at path "Domains/www.appbase.io"
// will create one if it does not exist.
vref1 = nsref.v("www.appbase.io");
// will return the vertex at path "Domains/www.appbase.io/subdomains"
// Will only return if the vertex at the path exists.
vref2 = nsref.v("www.appbase.io/subdomains");
```

**Usage**

``nsref.v(path)``

- **path** `String` — Relative path of the vertex reference. If creating a new vertex, this is the vertex identifier. ``/`` character is used for separating path variables. The path can contain all ascii characters except for whitespaces, ':', and '~'.

**Returns**

**vref** ``Object`` *Vertex Reference*

``Note:`` Use a string identifier if you are creating a new vertex. A new vertex cannot be created recursively, avoid using non-existent paths.


## Search

### search()

Powerful realtime search on vertices inside a namespace, with options to search using one or more data properties. It returns not just matched strings, but all the matching vertices.

**Note:** Search has to be manually enabled on the namesapces using the [Developer Dashboard](http://appbase.io/developer).

1. Enable the search by toggling the <span class="fa fa-eye-slash fa-2x"></span> switch in your app's preferred namespace. If search is enabled, you should see an this icon <span class="fa fa-eye fa-2x"></span> next to the namespace.
2. Second and final step, use this code snippet on the enabled namespace and have a full-text search widget.

```js
// Suppose there is a "tweets" namespace
// containing vertices with a property "message".
Appbase.ns('tweets')
.search({text:'hello',
properties: ['message']},
function(error, array) {
    if (!error) {
    	console.log(array);
    }
});
```

**Usage**

``nsref.search(queryObj, onComplete)``

- **queryObj** ``Object`` — A Javascript Object containing the following fields and values

	- **text** ``String`` — Search query string
	- **properties** ``Array`` — One or more properties on which to apply the search.

- **onComplete** ``Function`` — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if event listening is successful
	- **results** ``Array`` — Search results as an Array of matching vertices.
	
## Retrieving Data

### on()

Retrieve existing vertices, and listen to addition or removal of vertices.

```js
// get reference to the namespace 'Domain'
var domain = Appbase.ns("Domain");

domain.on('vertex_added', function (err, vref, vsnap) {
   if (err) console.log(err);
   else {
   	 console.log(vref.URL(), vsnap.properties()); 
   }
}, function() {
  console.log('Existing vertices retrieved.');
});

setTimeout(function(){
    domain.v('www.appbase.io');
}, 2000);

/* After 2s, it adds the newly added vertex's URL -
'http://api.appbase.io/yourAppName/v2/Domain/www.appbase.io/' */
```

**Usage**

``nsref.on(eventType , callback [, onComplete])``

- **eventType** ``String`` — Either "vertex_added" or "vertex_removed"
- **callback** ``Function`` (optional) — is called when with existing vertices, and when ever a new vertex is added. It will be passed two arguments:

  - **error** `String` / `null` — *String* containing the error message, *null* if event listening is successful
  - **vref** `Vertex Reference` — of the newly added vertex.
  - **snapObj** `Property Snapshot` -- Snapshot of the data stored in the vertex. Take a look at the documentation of `Property Snapshot` on this page
- **onComplete** ``Function`` - Called when all the existing vertices have been retrieved. It will be called only once, with arguments:

  - **nsref** ``Namespace Reference`` — of the vertex where the edge is added.

``Note:`` ``vertex_added`` event listener returns the existing vertices in the namespace when listening for the first time.

### off()

Turn off the listeners on a given namespace reference.

``nsref.off([eventType])``

- **eventType** ``String`` (optional) — Either "vertex_added" or "vertex_removed". Turns off all listeners on the reference if this argument is not passed.

## Utility


### name()

Returns the name of the current reference.

```js
var nsref = Appbase.ns('user')
var name = nsref.name(); // name = 'user'
```

**Usage**

``nsref.name()``

**Returns**

**name** ``String`` Name of the ``nsref``.

### path()

Returns the path of the current reference.

```js
var path = nsref.path() // path equals "Domains"
```

**Usage**

``nsref.path()``

The method accepts no arguments, and returns a path of the ``nsref`` resource. Since namespaces are top-level objects, the path for a namespace is just the *namesapce identifier*.

**Returns**

**path** ``String`` Path of the ``nsref`` is usually the namespace identifier.
 
### URL()

Appbase URL of the current reference.

```js
// url equals "api.appbase.io/appname/v2/Domains"
var url = nsref.URL() 
```

**Usage**

``nsref.URL()``

The method accepts no arguments, and returns a URL of the ``nsref`` resource.

**Returns**

**url** ``String`` Data URL of the namespace reference. The format of the URL is ``api.appbase.io/:appname/:version/namespace``.

# Vertex Reference

Vertex Reference Object or ``vref`` has the methods for setting data, creating links to other vertices, and different listeners to notify about data changes, link changes, etc.

## Storing Data

### setData()

Set one or more data properties on this vertex reference.

```js
var vref = Appbase.ns("Domains").v("www.appbase.io");
data = {
  "tld": "io",
  "registered": "2013",
  "visits": 0
}
vref.setData(data, function(error, vref) {
  if (!error) console.log("data successfully set.");
});
```

**Usage**

``vref.setData(dataObject [, onComplete])``

- **dataObject** ``Object`` — A valid JSON object. Can contain a nested object, or arrays.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``setData()`` worked successfully.
	- **vref** ``Object`` — *Vertex Reference* of the vertex on which ``setData()`` has been applied.


### commitData()

Atomically modify properties of the vertex. Unlike setData(), which just overwrites the properties regardless of their previous values, commitData() is used to modify the existing value to a new value, ensuring there are no conflicts with other clients writing to the same location at the same time.

```js
var vref = Appbase.ns("Domains").v("www.appbase.io");
vref.commitData(function(previousData) {
  var newData = {
    visits: previousData.visits
  };
  newData.visits += 1;
  return newData;
}, function(error, vref) {
  if (!error) console.log("data successfully commited.");
});
```

**Usage**

``vref.commitData(applyFunction [, onComplete])``

- **applyFunction** ``Function`` — is used to transform the current value into a new value. It will be passed the current data as a JSON object and it is supposed to return the new data as a JSON object. Note: only the properties defined in the new JSON object is commited to the server, others are persisted.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``commitData()`` worked successfully.
	- **vref** ``Object`` — *Vertex Reference* of the vertex on which ``commitData()`` has been applied.

`applyFunction` is called once and the new data is sent to the server for write. If another client writes to the vertex before your new value is successfully written, the `applyFunction` will be called again with the new current value, and the write will be retried.

### removeData()

Removes one or more data properties from this vertex reference.

```js
vref.removeData("registered", function(error, vref) {
  if (!error) console.log("property removed successfully");
});
```

**Usage**

``vref.removeData(propertyName [, onComplete])``

- **propertyName** ``String`` / ``Array`` — One or more property names to be deleted.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``removeData()`` worked successfully.
	- **vref** ``Vertex Reference`` —  of the vertex on which ``removeData()`` has been applied.

### setEdge()

Create a link to another vertex. You can optionally set priority to links.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
// Creates an edge "subdomains" to a new vertex
vref.setEdge("subdomains"); 
```

**Usage**

``vref.setEdge(edgeName [, outVertex, priority, onComplete])``

- **edgeName** ``String`` — Identifier for the outVertex. The identifier can contain all ascii characters except  whitespaces, ':', '/' and '~'. You can use ``Appbase.uuid()`` for setting a unique identifier.
- **outVertex** ``Vertex Reference`` (optional) — If passed, ``setEdge()`` will create a link from ``vref`` to the ``outVertex``. Otherwise, it will create a new vertex and create a link from ``vref`` to it.
- **priority** ``Number`` (optional) — If passed, the link will be assigned the priority. By default, the timestamp of edge creation is used as it's priority.
- **onComplete** ``Function`` (optional) — will be passed three arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``setEdge()`` worked successfully.
	- **vref** ``Vertex Reference`` — of the vertex on which ``setEdge()`` has been applied.
    - **outVertexRef** ``Vertex Reference`` - of the vertex which is added as an edge.

### removeEdge()

Remove a link from the current vertex.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
vref.removeEdge("subdomains", function(error, vref) {
  if (!error) console.log("vertex removed successfully");
});
```

**Usage**

``vref.removeEdge(edgeName [, onComplete])``

- **edgeName** ``String`` / ``Array`` — One or more edge names to be deleted.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``removeEdge()`` worked successfully.
	- **vref** ``Vertex Reference`` —  of the vertex on which ``removeEdge()`` has been applied.

### destroy()

Destroys a vertex from Appbase. All edges pointing to this vertex are also removed. This causes **vertex_removed** to be fired on the namespace where this vertex belongs.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
vref.destroy(function(error, vref) {
  if (!error) console.log("vertex destroyed.");
});
```

**Usage**

``vref.destroy([, onComplete])``

- **onComplete** ``Function`` (optional) — will be passed the argument:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``removeEdge()`` worked successfully.

## Retrieving Data

### on('properties')

Fetch current properties, and listen to changes in the properties of a vertex.


```js
var vref = Appbase.ns("Domains").v("www.appbase.io");

vref.on('properties', function(err,ref,snap){
   console.log(snap.properties().visits); 
);

// It would print the current number of visits,
// and also every time the number changes.
```

**Usage**

``vref.on('properties', callback)``

- **callback** ``Function`` --- will be passed these as arguments:
    - **error** `String` / `null` -- *String* containing the error message, *null* if :function-name:`on('properties')` listening is successful
    - **abref** `Appbase Vertex Reference` -- points to the path on which the event is fired
    - **snapObj** `Property Snapshot` -- Snapshot of the data stored in the vertex. Take a look at the documentation of `Property Snapshot` on this page

### once('properties')

As the name suggests, it works exactly like `on("properties")` except that it will be fired only once. When you want to fetch only the current properties and don't want to listen to changes, you can use `once()`.

**Usage**

``vref.once('properties', callback)``

### on('edge_added')

Get existing edges added at a location, and listen to new ones.

**Usage**

``vref.on('edge_added' [, filters ],  callback [, onComplete])``

- **filters** `JSON Object` - Allows filtering of edges, and supports `startAt`, `endAt`, `limit`, `skip` and `onlyNew` filters
- **callback** `Function` - will be passed these as arguments:
    - **error** `String` / `null`
    - **edgeRef** `Appbase Vertex Reference` - pointing to path of the edge
    - **snapObj** `Edge Snapshot` - Snapshot of the edge. Take a look at the documentation of `Edge Snapshot` on this page
- **onComplete** ``Function`` - Called when all the existing edges have been retrieved. It will be called only once, with argments:
    - **vref** ``Vertex reference`` - of the vertex where edges are being added

With edge filters, it is possible to fetch only certain edges. It comes handy when there are large number of edges and you want to paginate them.

When more than one filter is provided, they work as logical `AND` and only the edges matchihg all filters will be fetched. This is what each filter means:

 1. **startAt** `Number` - Edges having priorities equal or more than this
 2. **endAt** `Number` - Edges having priorities equal or less than this
 3. **limit** `Number` - Only this number of edges
 4. **skip** `Number` - Skipping certain number of edges, which match all the other filters
 5. **onlyNew** `Boolean` - return only newly created edges

Notice that:
 - Filters are a way to fetch existing edges, thus they work only with _edge_added_ event
 - Edges are always returned ordered according to their priorities
 - When *endAt* < *startAt*, edges are returned in reverse order
 - You can NOT apply all the numeric filters (first four) to newly created edges, they are only for existing edges and it is NOT possible to apply filters to newly created edges in realtime
	- This means that the numeric filters can not be used with *onlyNew* set to be `true`
	- *Newly created* edges will NOT be fired when any of the numeric filter is applied, i.e. only the existing edges will be returned

```js
var belasTweets = Appbase.ns("user").v("bela/tweets");
belasTweets.on('edge_added', function(error, eRef, eSnap) {
	console.log("Added: ", eSnap.properties(),
  "with priority", eSnap.priority());
});
```

### on('edge_removed')

Listen to removal of edges. 

**Usage**

``vref.on('edge_removed', callback)``

- **callback** `Function` - will be passed these as arguments:
    - **error** `String` / `null` --
    - **edgeRef** `Appbase Vertex Reference` - pointing to path of the edge.
    - **snapObj** `Edge Snapshot` - Snapshot of the edge. Take a look at the documentation of `Edge Snapshot` on this page

```js
var belasTweets = Appbase.ns("user").v("bela/tweets");
belasTweets.on('edge_removed', function(error, eRef, eSnap) {
  console.log(eRef.name(), eSnap.properties(), "removed");
});
```

### on('edge_changed')

When ever an edge is replaced, i.e. `setEdge()` is called with an existing edge name, this event is fired.

**Usage**

``vref.on('edge_changed', callback)``

- **callback** `Function` - will be passed these as arguments:
    - **error** `String` / `null` --
    - **edgeRef** `Appbase Vertex Reference` - pointing to path of the edge.
    - **snapObj** `Edge Snapshot` - Snapshot of the edge. Take a look at the documentation of `Edge Snapshot` on this page

```js
var belasTweets = Appbase.ns("user").v("bela/tweets");
belasTweets.on('edge_changed', function(error, eRef, eSnap) {
  console.log(eRef.name(), eSnap.properties(), "replaced");
});
```

## Utility

### outVertex()

Reference to the corresponding ``outVertex`` with the given name.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
// Returns the vertex reference to "Domains/www.appbase.io/subdomains".
outVertex = vref.outVertex("subdomains");
```

**Usage**

``vref.outVertex(edgeName)``

- **edgeName** ``String`` -- outVertex identifier.

**Returns**

- **vref** ``Vertex Reference`` of the outVertex.

### inVertex()

Reference to the corresponding ``inVertex`` from the current vertex.

```js
vref = Appbase.ns("Domains").v("www.appbase.io/subdomains");
// Returns the vertex reference to "Domains/www.appbase.io".
inVertex = vref.inVertex();  
```

**Usage**

``vref.inVertex()``

``Note:`` Since vertices are accessed via a path, there is only one ``inVertex`` for each vertex. Calling this method on the root vertex such as ``Appbase.ns("Domains").v("www.appbase.io") will thrown an error.

**Returns**

- **vref** ``Vertex Reference`` of the inVertex.


### path()

Returns the path of the current reference.

```js
var path = vref.path() // path equals "Domains"
```

**Usage**

``vref.path()``

The method accepts no arguments, and returns a path of the ``vref`` resource.

**Returns**

**path** ``String`` Path of the ``vref`` is a UNIX style path of the format namespace/:vertex1/:vertex2/vref.

### name()

Returns the name of the current reference.

```js
var vref = Appbase.ns('user').v('andy/tools/rockhammer')
var name = vref.name(); // name = 'rockhammer'
```

**Usage**

``vref.name()``

**Returns**

**name** ``String`` Name of the ``vref``.
 
### URL()

Appbase URL of the current reference.

```js
// url equals "api.appbase.io/appname/v2/Domains"
var url = vref.URL();
```

**Usage**

``vref.URL()``

The method accepts no arguments, and returns a URL of the ``vref`` resource.

**Returns**

**url** ``String`` Data URL of the namespace reference. The format of the URL is ``api.appbase.io/:appname/:version/ns/:vertex1/:vertex2``.


# Data Snapshots

Data snapshots are immutable copies of the data stored at `Appbase References`_. There are two kinds of snapshots: `Property Snapshot`_ and `Edge Snapshot`_, fired when listening to on('properties') or one of the edge listeners.

### Property Snapshot

It holds the property data of a vertex in Appbase. It has the following methods to obtain the changes in the Appbase Reference.

| Method              | Returns                                                        |
|----------------     |----------------                                                |
| properties()        | data properties as a Javascript object                         |
| prevProperties()    | data properties before data change as a Javascript object      |

### Edge Snapshot

It holds the edge data. It has the following methods to obtain the edge related changes in the Appbase Reference.


| Method             | Returns                                                       |
|--------------------|---------------------------------------------------------------|
| name()             | name of the edge                                              |
| priority()         | current priority of the edge                                  |
| prevPriority()     | previous priority of the edge (``null`` if not set)           |
| properties()       | data properties as a Javascript object                        |
| prevProperties()   | data properties before data change as a Javascript object     |

