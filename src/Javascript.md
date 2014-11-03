# Introduction

The Appbase JS library allows developers to create realtime multi-user apps using a graph data model and realtime smart-search capabilities.

The Appbase library exposes the ``Appbase`` object. The methods in the JS lib rely on three main objects.

1. **Appbase**
2. **Namespace Reference** (referred as ``nsref`` in this doc)
3. **Vertex Reference** (referred as ``vref`` in this doc)

# Appbase

**Appbase** is the global object exposed the JS library. It has the following four methods: ``credentials()``, ``ns()``, ``uuid()``, and ``serverTime()``.

## credentials()

Authorize the app credentials using the appname and appsecret identifiers, as they appear in the [Dev Console](//appbase.io/developer).

```js
var register = Appbase.credentials('aphrodite', '4d8d0072580912343cd74aa0015cd217');
if (register === true)
  console.log("app successfully registered");
```
**Usage**

``Appbase.credentials(appname, appsecret [, onComplete])``

- **appname** ``String`` — App name
- **appsecret** ``String`` — App secret key

**TBD**

## ns()

Get the namespace reference with the passed *string identifier*. It creates a new namespace if one doesn't already exist, else returns reference to the existing namespace.

```js
var nsref = Appbase.ns("Domains");
```

**Usage**

``Appbase.ns(namespace)``

* **namespace** ``String`` — Namespace identifier (can contain all ascii characters except for whitespaces, `` `, ~, :, /`` characters.)

**Returns**

``Object`` **nsref** *Namespace Reference*

## uuid()

Returns a 32-character uuid.

```js
console.log(Appbase.uuid());  // 32-character string
```

**Usage**

``Appbase.uuid()``

**Returns**

``String`` UUID

## serverTime()

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
  - **time** `Number` — points to the same path on which the method is called.


# Namespace Reference

Namespace Reference Object or ``nsref`` has methods for creating vertices, searching vertices, and event listeners to the addition and destruction of vertices.

## v()

Creates a new vertex or obtains a reference to an existing vertex.

```js
nsref = Appbase.ns("Domains");
vref1 = nsref.v("www.appbase.io"); // will return the vertex at path "Domains/www.appbase.io". Will create one if it does not exist.
vref2 = nsref.v("www.appbase.io/subdomains"); // will return the vertex at path "Domains/www.appbase.io/subdomains". Will only return if the vertex at the path exists.
```

**Usage**

``nsref.v(path)``

- **path** `String` — Relative path of the vertex reference. If creating a new vertex, this is the vertex identifier. ``/`` character is used for separating path variables. The path can contain all ascii characters except for any whitespaces, `` `, ~, :`` characters.

**Returns**

**vref** ``Object`` *Vertex Reference*

``Note:`` Use a string identifier if you are creating a new vertex. A new vertex cannot be created recursively, avoid using non-existent paths.

## search()

Powerful realtime search on vertices inside a namespace, with options to search using one or more data properties. It returns not just matched strings, but all the matching vertices.

>**Note:** Search has to be manually enabled on the namesapces using the [Developer Dashboard](http://appbase.io/developer).

>1. Enable the search by toggling the <i class="fa fa-eye-slash fa-2x"></i> switch in your app's preferred namespace. If search is enabled, you should see an this icon <i class="fa fa-eye fa-2x"></i> next to the namespace.
>2. Second and final step, use this code snippet on the enabled namespace and have a full-text search widget.

```js
// Suppose there is a "tweets" namespace containing vertices with a property "message".
Appbase.ns('tweets').search({text:'hello', properties: ['message']}, function(error, array) {
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
	

## on()

Listens for addition / destruction of vertices in the namespace.

```js
var domain = Appbase.ns("Domain"); // get reference to the namespace 'Domain'

domain.on('vertex_added', function onComplete(err, vref) {
   if (err) console.log(err);
   else {
   	 console.log(vref.URL()); 
   }
);

setTimeout(function(){
    domain.v('www.appbase.io');
}, 2000);

/* After 2s, it adds the newly added vertex's URL -
'http://api.appbase.io/<appname>/v2/Domain/www.appbase.io/' */
```

**Usage**

``nsref.on(eventType [, callback])``

- **eventType** ``String`` — Either "vertex_added" or "vertex_destoyed"
- **callback** ``Function`` (optional) — will be passed two arguments:

  - **error** `String` / `null` — *String* containing the error message, *null* if event listening is successful
  - **vref** `Vertex Reference` — of the newly added vertex.
  
``Note:`` ``vertex_added`` event listener returns the existing vertices in the namespace when listening for the first time.

## off()

Turn off the listeners on a given namespace reference.

``nsref.off([eventType])``

- **eventType** ``String`` (optional) — Either "vertex_added" or "vertex_destroyed". Turns off all listeners on the reference if this argument is not passed.

## path()

Returns the path of the current reference.

```js
var path = nsref.path() // path equals "Domains"
```

**Usage**

``nsref.path()``

The method accepts no arguments, and returns a path of the ``nsref`` resource. Since namespaces are top-level objects, the path for a namespace is just the *namesapce identifier*.

**Returns**

**path** ``String`` Path of the ``nsref`` is usually the namespace identifier.
 
## URL()

Appbase URL of the current reference.

```js
var url = nsref.URL() // url equals "api.appbase.io/appname/v2/Domains"
```

**Usage**

``nsref.URL()``

The method accepts no arguments, and returns a URL of the ``nsref`` resource.

**Returns**

**url** ``String`` Data URL of the namespace reference. The format of the URL is ``api.appbase.io/:appname/:version/nsref``.

# Vertex Reference

Vertex Reference Object or ``vref`` has the methods for setting data, creating links to other vertices, and different listeners to notify about data changes, link changes, etc.

## setData()

Set one or more data properties on this vertex reference.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
data = {
  "tld": "io",
  "registered": "2013"
}
vref.setData(data, function(error, abVertexRef) {
  if (!error) console.log("data successfully set.");
});
```

**Usage**

``vref.setData(dataObject [, onComplete])``

- **dataObject** ``Object`` — A valid JSON object. Can contain a nested object, or arrays.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``setData()`` worked successfully.
	- **vref** ``Object`` — *Vertex Reference* of the vertex on which ``setData()`` has been applied.

## removeData()

Removes one or more data properties from this vertex reference.

```js
vref.removeData(["registered"], function(error, vref) {
  if (!error) console.log("property removed successfully");
});
```

**Usage**

``vref.removeData(propertyNames [, onComplete])``

- **propertyNames** ``Array`` — One or more property names to be deleted.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``removeData()`` worked successfully.
	- **vref** ``Vertex Reference`` —  of the vertex on which ``removeData()`` has been applied.

## setEdge()

Create a link to another vertex. You can optionally set priority to links.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
vref.setEdge("subdomains"); // Creates an edge from vref to "subdomains"
```

**Usage**

``vref.setEdge(edgeName [, outVertex, priority, onComplete])``

- **edgeName** ``String`` — Identifier for the outVertex. The identifier can contain all ascii characters except whitespaces, `, \, ~, : or /. You can use ``Appbase.uuid()`` for setting a unique identifier.
- **outVertex** ``Vertex Reference`` (optional) — If passed, ``setEdge()`` will create a link from ``vref`` to the ``outVertex``. Otherwise, it will create a new vertex and create a link from ``vref`` to it.
- **priority** ``Number`` (optional) — If passed, the link will be assigned the priority. By default, the timestamp of edge creation is used as it's priority.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``setEdge()`` worked successfully.
	- **vref** ``Vertex Reference`` — of the vertex on which ``setEdge()`` has been applied.

## removeEdge()

Remove a link from the current vertex.

```js
vref = Appbase.ns("Domains").v("www.appbase.io");
vref.removeEdge("subdomains", function(error, vref) {
  if (!error) console.log("vertex removed successfully");
});
```

**Usage**

``vref.removeEdge(edgeName [, onComplete])``

- **edgeName** ``String`` — The edge name to be deleted.
- **onComplete** ``Function`` (optional) — will be passed two arguments:

	- **error** ``String`` / ``null`` — *String* containing the error message, *null* if ``removeEdge()`` worked successfully.
	- **vref** ``Vertex Reference`` —  of the vertex on which ``removeEdge()`` has been applied.
