{"threeColumns": true}
# Introduction

The Appbase API is based on REST principles. All operations including creating vertices and edges, fetching vertex properties (data) and edges, deleting a vertex or an edge as well as searching through vertices are RESTful. The only non-RESTful operation is realtime event streams, which works with the Websocket protocol, using socket.io.


### Allowed HTTP Request Types

- ``PATCH`` - Creates or updates a resource
- ``POST`` - Fetches a resource
- ``DELETE`` - Delete a resource


### HTTP Header(s)

All API requests require a JSON body to specify additional options. The following header is necessary for all the API requests.

"Content-Type": "application/json"


### Authorization

Appbase accepts one of the two methods of authorizations.

1. Header based authorization - Add a HTTP header "Appbase-Secret" to each request, with value as the app's *secret key*.
2. Add a field "secret" : "&lt;secret-key>" in the JSON body of the request.

In this document, we will be using the 1. method since it makes authorization distinct from the request data.


### Base URI

Base URI is the fixed URI that is common for all the API request endpoints and is prefix to all the API requests. A base URI has two path variables: **appname** and **api_version**. A typical base URI looks like https://api.appbase.io/&lt;appname>/v2/.



# API Reference

## Introduction

The Appbase API endpoints are divided between three types of different resources.

1. ``Vertex`` - A *vertex* contains two distinct resources - **Properties** and **Edges**. A vertex URI consists of either &lt;namespace>/&lt;vertex>/ format or &lt;namespace>/&lt;vertex1>/&lt;vertex2>/.../&lt;vertexn>/ format. Except ``DELETE``, all operations on the *vertex* resource happens with either *properties* or *edges*.
2. ``Vertex Properties`` - *Vertex Properties* are stored as a JSON object. The suffix ``~properties`` is used with the resource URI of the vertex to operate on the *properties* resource.
3. ``Edges`` - *Edges* of a vertex are stored as JSON object. The suffic ``~edges`` is used with the resource URI of the vertex to operate on the *edge* resource.

## Namespace

### List all vertices

List the vertices in the namespace. *Returns* an array of vertices in the namespace.

> **Example Request**
```curl
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
  'https://api.appbase.io/rest_test/v2/Materials/~list'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* identifier can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an array of vertices. Each vertex is returned as an object with a server ``timestamp`` when the vertex was last updated, the shortest path to the vertex resource aka ``rootPath``, and a unique identifier of the vertex properties resource ``_id`` (used by the server internally).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">POST</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/~list
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Sat, 13 Dec 2014 17:13:37 GMT
content-length: 267
connection: keep-alive
<span class="inline-heading">BODY</span>
[
  {
    "_id": "547059ce69528db30aa7ae90",
    "timestamp": 1418488108255,
    "rootPath": "Materials/Ice"
  },
  {
    "_id": "5488ccab3b87a791550d81b7",
    "timestamp": 1418464098508,
    "rootPath": "Materials/Iron"
  },
  {
    "_id": "5488cce73b87a791550d81bb",
    "timestamp": 1418251495670,
    "rootPath": "Materials/Fire"
  }
]</code>
</pre>

### Search Vertices by property(ies)

Search vertices by one or more vertex properties. *Returns* an array of vertices that match the search criteria.

``Note:`` Search should be enabled for the respective namespace from the databrowser interface before performing this query.

> **Example Request**
```curl
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "query": {
            "text": "bar",
            "properties":["foo"]
        }
    }' \
'https://api.appbase.io/rest_test/v2/Materials/~search'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* identifier can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``data`` - A JSON object representing the search query and the properties to be used for the matching criteria.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an array of vertices which match the search query. Each vertex is returned as an object with all the **properties** (both matching and non-matching), a server ``timestamp`` when the vertex was last updated, the shortest path to the vertex resource aka ``rootPath``, and a unique identifier of the vertex properties resource ``_id`` (used by the server internally).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">POST</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/~search
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
  "query": {
    "text": "bar",
    "properties": [
      "foo"
    ]
  }
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Sat, 13 Dec 2014 17:26:52 GMT
content-length: 126
connection: keep-alive
<span class="inline-heading">BODY</span>
[
  {
    "_id": "Materials`547059ce69528db30aa7ae90",
    "timestamp": 1418488108255,
    "rootPath": "Materials/Ice",
    "green": "leaf",
    "foo": "bar"
  }
]
</code>
</pre>


## Vertex Property

All data operations on a vertex happen via **Vertex Property** endpoints.

### Create / Update Vertex Properties

Create a new vertex with some properties or update the properties of an existing vertex.

> **Example Request**
```curl
curl --include \
     --request PATCH \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "data":{"foo":"bar"}
    }' \
'https://api.appbase.io/rest_test/v2/Materials/Ice/~properties'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">vertex</span> - vertex identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* and *vertex* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``data`` - A JSON object representing the properties to be set on the vertex (can contain nested object, arrays). In case of a conflict (read existing property), the property value will be overwritten.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns updated properties and values, a server ``timestamp`` when the update happened, the shortest path to the vertex resource aka ``rootPath``, and a unique identifier of the vertex properties resource ``_id`` (used by the server internally).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">PATCH</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/<span class="path-var">vertex</span>/~properties
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
  "data": {
    "foo": "bar"
  }
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Wed, 15 Oct 2014 20:08:58 GMT
content-length: 112
connection: keep-alive
<span class="inline-heading">BODY</span>
{
  "foo": "bar",
  "timestamp": 1413403738268,
  "rootPath": "Materials/Ice",
  "_id": "Materials`543ed45a4c0b62550662563b"
}
</code>
</pre>

### Read Vertex Properties

Read the existing vertex properties.

> **Example Request**
```curl
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "all": true
    }' \
'https://api.appbase.io/rest_test/v2/Materials/Ice/~properties'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">vertex</span> - vertex identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* and *vertex* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``data`` - A JSON object with the property ``all`` set as the boolean value **true**.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns a **vertex** object with all the properties, a ``timestamp`` value when the vertex was last updated, the shortest path to the vertex resource aka ``rootPath``, a unique identifier of the vertex properties resource ``_id`` (used by the server internally), along with an **optype** field equaling "RETR" - indicating a retrieval operation.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">POST</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/<span class="path-var">vertex</span>/~properties
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
  "all": true
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Sat, 13 Dec 2014 16:28:36 GMT
content-length: 151
connection: keep-alive
<span class="inline-heading">BODY</span>
{
  "vertex": {
    "_id": "Materials`547059ce69528db30aa7ae90",
    "timestamp": 1418488108255,
    "rootPath": "Materials/Ice",
    "foo": "bar",
    "green": "leaf"
  },
  "optype": "RETR"
}
</code>
</pre>

### Delete vertex properties

Delete specific (or all) data properties of a vertex.

> **Example Request**
```curl
curl --include \
     --request DELETE \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "data": ["foo"]
    }' \
'https://api.appbase.io/rest_test/v2/Materials/Ice/~properties'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">vertex</span> - vertex identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* and *vertex* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting all properties</b>
	<ul>
		<li>``data`` - A JSON object with the property ``all`` set as the boolean value **true**.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting specific properties</b>
	<ul>
		<li>``data`` - A JSON object with the property ``data`` set as an array of property names to be deleted.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns the **vertex** object with the deleted properties set to "", a ``timestamp`` value when the vertex was last updated, the shortest path to the vertex resource aka ``rootPath``, and a unique identifier of the vertex properties resource ``_id`` (used by the server internally).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">DELETE</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/<span class="path-var">vertex</span>/~properties
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "data": ["foo"]
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Wed, 15 Oct 2014 20:08:58 GMT
content-length: 112
connection: keep-alive
<span class="inline-heading">BODY</span>
{
  "foo": "",
  "_id": "Materials`547059ce69528db30aa7ae90",
  "timestamp": 1418486072705,
  "rootPath": "Materials/Ice"
}
</code>
</pre>

## Vertex Edge

### Create / Update Vertex Edges

Create a new (directed) edge or update the existing edge(s) of a vertex to another vertex. An **order**, which acts as an index can optionally be set on the edge.

> **Example Request**
```curl
curl --include \
     --request PATCH \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "data": {
            "anEdge": {
                "path": "Materials/Iron"
            },
            "anotherEdge": {
                "path": "Materials/Ice",
                "order": 500.6
            }
        }
    }' \
'https://api.appbase.io/rest_test/v2/Materials/Ice/~edges'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">vertex</span> - vertex identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* and *vertex* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``data`` - A JSON object representing the edge(s) to be created from the vertex. In case of a conflict (read an existing edge), the link will be updated.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns updated edge links to outvertices, a server ``timestamp`` for each edge when the update happened, and a unique identifier for each edge resource ``t_id`` (used by the server internally).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">PATCH</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/<span class="path-var">vertex</span>/~edges
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
  "data": {
    "anEdge": {
      "path": "Materials/Iron"
    },
    "anotherEdge": {
      "path": "Materials/Ice",
      "order": 500.6
    }
  }
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
content-type: application/json
date: Wed, 15 Oct 2014 20:08:58 GMT
content-length: 235
connection: keep-alive
<span class="inline-heading">BODY</span>
{
  "_id": "Materials`547059ce69528db30aa7ae90",
  "edges": {
    "anEdge": {
      "t_id": "Materials`5488ccab3b87a791550d81b7",
      "timestamp": 1418261314605
    },
    "anotherEdge": {
      "t_id": "Materials`547059ce69528db30aa7ae90",
      "order": 500.6,
      "timestamp": 1418261314605
    }
  }
}
</code>
</pre>

### Read Vertex Edges

Fetch the outgoing edges of a vertex..

> **Example Request**
```curl
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "filters": {}
    }' \
'https://api.appbase.io/rest_test/v2/Materials/Ice/~edges'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">vertex</span> - vertex identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* and *vertex* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``filters`` - A filters JSON object, set as {} to not apply any filters.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an **edges** object with the filtered edges as an array, each edge having a ``timestamp`` value when the edge was last updated, a unique identifier of the edge resource ``t_id`` (used by the server internally), along with an ``id`` identifier of the vertex on which this operation is performed and an **optype** field equaling "RETR" - indicating a retrieval operation.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">POST</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/<span class="path-var">vertex</span>/~edges
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
  "filters": {}
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Sat, 13 Dec 2014 16:55:14 GMT
content-length: 203
connection: keep-alive
<span class="inline-heading">BODY</span>
{
  "edges": {
    "anEdge": {
      "t_id": "Materials`5488ccab3b87a791550d81b7",
      "timestamp": 1418489847292
    },
    "anotherEdge": {
      "t_id": "Materials`547059ce69528db30aa7ae90",
      "timestamp": 1418489847292,
      "order": 500.6
    }
  },
  "optype": "RETR",
  "_id": "Materials`547059ce69528db30aa7ae90"
}
</code>
</pre>

### Delete vertex edges

Delete specific (or all) edges of a vertex.

> **Example Request**
```curl
curl --include \
     --request DELETE \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary '{
        "data": ["edge1", "edgen"]
    }' \
'https://api.appbase.io/rest_test/v2/Materials/Ice/~edges'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">namespace</span> - namespace identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">vertex</span> - vertex identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *namespace* and *vertex* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Content-Type - application/json (always)</li>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting all edges</b>
	<ul>
		<li>``data`` - A JSON object with the property ``all`` set as the boolean value **true**.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting specific edges</b>
	<ul>
		<li>``data`` - A JSON object with the property ``data`` set as an array of edge names to be deleted.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``204`` if success.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">DELETE</span> https://api.appbase.io/<span class="path-var">appname</span>/v2/<span class="path-var">namespace</span>/<span class="path-var">vertex</span>/~edges
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "data": ["edge1", "edgen"]
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
204
<span class="inline-heading">HEADERS</span>
Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
date: Wed, 15 Oct 2014 20:08:58 GMT
content-length: 112
connection: keep-alive
</code>
</pre>

# Socket.io API Endpoints

Socket.io is a powerful realtime engine, and we are using it in the backend to provide realtime streams of data. Socket.io has client libraries for almost popular languages and platforms, and you can follow the API endpoints given below to fetch the data as realtime streams. Examples here use Javascript Language, but you can use the same methods on any other platform.

## Creating the Client

The API server can be reached form `http://api.appbase.io:80` or `https://api.appbase.io:443`. Make sure that the ports are properly defined in the server URL itself.

```js
ioClient = io("http://api.appbase.io:80");
```

## Requesting for data

As vertices and namespace are represented using paths, you request for data on a path. Vertices and Namespaces are fundamentally different, and they also differ in terms of what resources you can listen to. But, they share the same Request format, with minor changes for special cases.

### Request Format

The request object looks something like this:
```json
{
	"appname": <string>,
	"secret": <string>,
	"token": <string>,
	"namespace": <string>,
	"key": <string>,
	"obj_path": <string>,
	"filters": {
		"limit": <natural number>,
		"skip": <natural number>,
		"startAt": <natural number>,
		"endAt": <natural number>
	},
	"listener_id": <string>,
	"timestamp": <natural number>
}
```
- **appname** - The name of the application
- **secret** - Application secret
- **token** - Appbase Auth Token returned using the OAuth flow
  Only any one of _secret_ or _token_ needs to be present in the request.
- **namespace** - The namespace from where the path starts
  E.g. for path _user/andy/machod/bhenchod_, the namespace would be _user_.
- **key** - The vertex key in the path
  For the path _user/andy/machod/bhenchod_, the key would be _andy_.
  For _user/_ (only the namespace), it would be `undefined`.
- **obj_path** - The path of the vertex that follows the key
  For the path _user/andy/machod/bhenchod_, the obj_path would be _machod/bhenchod_.
  For _user/andy_, it would be `undefined`.
- **filters** - edge filters, applies only when listening for edges on a vertex
- **timestamp** - specify milliseconds since epoch, from where to start 'syncing' data
  When there's a reconnection with the server, due to network connectivity problems, this handy option allows you to 'resume' listening and sync the changes happend after that timestamp
- **listener_id** - a unique string that will be used in your application to distuinguish Socket.IO listeners

### Vertex

When the path you are pointing to is a vertex, you can listen to:
- Properties of the Vertex. I.e. fetch existing properties of the vertx, and get updates when they change.
- Edges of the Vertex. I.e. fetch existing edges, and get updates when edges are added, removed or replaced.

Sample request object, pointing to the path: _user/andy/bhenchod/machod_, for application _chat_app_.
```json
{
	"appname": "chat_app",
	"secret": "dskfhyr987r09g8w00309309",
	"namespace": "user",
	"key": "andy",
	"obj_path": "bhenchod/machod",
	"listener_id": "sdfkgjohabioahdfk"
}
```

#### Properties
To turn on the listening:
```js
ioClient.emit('properties', requestObj);
```

To turn the listening off:
```js
ioClient.emit('properties off', requestObj);
```

#### Edges
Turn it on:
```js
ioClient.emit('edges', requestObj);
```

Turn off:
```js
ioClient.emit('edges off', requestObj);
```

### Namespace
When your path points to a namespace, you can listen to the Vertices in the Namespace. It means that you will be able to fetch existing vertices, and get updates like addition and removal of vertices.

To listen on the vertices in namespace the namespace _user_, the sample request would be:
```json
{
	"appname": "chat_app",
	"secret": "dskfhyr987r09g8w00309309",
	"namespace": "user",
	"listener_id": "asasasfasaef324"
}
```

Turn it on:
```js
ioClient.emit('new vertices', requestObj);
```

Turn off:
```js
ioClient.emit('new vertices off', requestObj);
```

## Attaching/Removing Data Listeners

Socket.io allows you to attach callbacks to events, and these callbacks are called everytime the event it fired, i.e. when some data is arrived. The data starts arriving on these callbacks once you request for some data as described above, and it stops when you do an 'off' request.

You should _always_ attach the listeners first and then request for data, otherwise you will miss the initial data that arrives.

`ioClient.on()` is the method we will use to attach listeners.

It is possible to listen to _connection status_ events as well, as in, when a disconnection or reconnectio happens. See _Handling Disconnection and Reconnection_ in this doc.

### Format

We saw that we build a specific _requestObject_ to do a data request. We will use the same object to attach lieteners.
```js
delete requestObject.timestamp;
var event = JSON.stringify(requestObject), callback;
ioClient.on(event, callback = function(data) {
	// do something with the data
});
```

The event on which we are listening to is just the stringified version of the _requestObject_ we used, while requesting for data. This way you can listen to all the resources on which you request the data.

Notice that we deleted the `timestamp` from request object. This is necessary and it is kept that way on purpose. We will see how and why, in _Handling Disconnection and Reconnection_ section of this documentation.

The following code will remove the callback.
```js
ioClient.removeListener(event, callback);
```

## Parsing the Data

The data that arrives on listener callbacks is different for different resources. It is even different for the same resource, when different events happen. Let's see how the data looks like on all these cases.

```js
ioClient.on(event, function(data) {
	// what this `data` looks like?
});
```

### Vertex
As we saw earlier, on a vertex you can listen to two kinds of resources: properties and edges.

#### Properties

Suppose you are listening to the properties of the vertex at _user/andy_. We will try to understand what are the cases when data will arrive and how it would look like.

Start listening:
```js
var request = {
	"appname": "chat_app",
	"secret": "dskfhyr987r09g8w00309309",
	"namespace": "user",
	"key": "andy",
	"listener_id": "asasjhsd335f324"
};

ioClient.on(JSON.stringify(request), function(data) {
	// ...
});

ioClient.emit('properties', request);
```

##### 1. Retrieval

When you request for data for the first time, all the existing properties are retrieved. The data looks like this:
```json
{
	"optype":"RETR",
	"vertex": {
		"_id":"user`542094995fd2217414d7cec4",
		"timestamp":1419000935812,
		"name": "Andy Dufresne",
		"height_m": 1.96
	}
}
```

Notice that the `data.optype` of the data is _"RETR"_ - retrieval. You get all the properties inside `data.vertex`, additionally the timestamp when the vertex was changed and the internal __id_ of the vertex.

##### 2. Property change

Whenever a new property is added or an existing property is replaced, the data would be:
```json
{
	"optype":"UPDATE",
	"vertex": {
		"_id":"user`542094995fd2217414d7cec4",
		"timestamp":1419001116911,
		"cast": "Tim Robbins"
	}
}
```

The `data.optype` is _"UPDATE"_, and you will get only the changed properties inside `data.vertex` and the updated timestamp of the vertex.

##### 3. Property removal
A property removal causes arrivel of the following object:

```json
{
	"optype":"REMOVE",
	"vertex": {
		"_id":"user`542094995fd2217414d7cec4",
		"timestamp":1419001116911,
		"cast": ""
	}
}
```
`data.optype` is _"REMOVE"_ and `data.vertex` includes empty property `cast`. It means that the property `cast` has been removed.


##### 4. Do an "Off" request

When you do a `ioClient.emit('properties off', requestObj)` to turn off the data listening, you receive a string as data. The value of this string is `"STOPPED"`. It simply tells you that the callback will never be called again, unless you request for the data again.

##### 5. Error

Whenever an error occurs, the data will be a string, containing the error message.

#### Edges
Suppose you want to listen to edges of the vertex _user/andy_. Here's the code:
```js
var request = {
	"appname": "chat_app",
	"secret": "dskfhyr987r09g8w00309309",
	"namespace": "user",
	"key": "andy",
	"listener_id": "asasasfasaef324"
};

ioClient.on(JSON.stringify(request), function(data) {
	// ...
});

ioClient.emit('edges', request);
```

Whenever you listen for edges of a vertex, you first get all the existing edges and later on you keep getting the updates.

If you apply filters, you only get the edges which match the filters, and you NEVER get any further changes in edges.

##### 1. Retrieval
```json
{
	"optype":"RETR",
	"_id":"user`54943c863b87a791550d835a",
	"edges":{
		"abcd":{
			"t_id":"misc`54943c893b87a791550d835e",
			"timestamp":1419000969730,
			"order":1
		},
		"pqrs":{
			"t_id":"misc`54943c883b87a791550d835d",
			"timestamp":1419000968929,
			"order":234245
		}
	}
}
```

`data.optype` is _"RETR"_. `data.edges` are all the existing edges of the vertex. Each edge has a `timestamp` which describes when the timestamp was last changed, and `order` is the priority of the edge. `t_id` of each edge displays the internal id of the vertex it points to.

##### Edge addition or replacement
The data that arrives is:
```json
{
	"optype":"RETR",
	"_id":"user`54943c863b87a791550d835a",
	"edges":{
		"pqrs":{
			"t_id":"misc`5w5rgfhfrtu5835",
			"timestamp":1419000999913,
			"order":23341
		}
	}
}
```

`data.optype` is _"UPDATE"_ and only the edges which are replaced or added, are present here.


##### 3. Edge removal

```json
{
	"optype":"REMOVE",
	"edges": {
		"pqrs": {
			"t_id": "",
			"timestamp":1419001116911
		}
	}
}
```
`data.optype` is _"REMOVE"_ and `data.edges` includes edges which are deleted. Notice that `t_id` of the edge is empty and now it doesn't point to any vertex.


##### 4. Do an "Off" request

When you do a `ioClient.emit('edges off', requestObj)` to turn off the data listening, you receive a string as data. The value of this string is `"STOPPED"`. It simply tells you that the callback will never be called again, unless you request for the data again.

##### 5. Error

Whenever an error occurs, the data will be a string, containing the error message.

### Namespace
Suppose that you are listening on the namespace _user_, so you build a _requestObject_, attached a callback and you requested for the data.
```js
var request = {
	"appname": "chat_app",
	"secret": "dskfhyr987r09g8w00309309",
	"namespace": "user",
	"listener_id": "asasasfasaef324"
};

ioClient.on(JSON.stringify(request), function(data) {
	// ...
});

ioClient.emit('new vertices', request);
```

When you listen on a namespace, you first get all the existing vertices, and then as vertices are added or removed, you get the changes.

##### 1. Retrieval
Intially, all the vertices are retrieved as an array,

```json
[
	{
		"_id":"53f7785324ebdb4878cb677b",
		"rootPath":"user/andy",
		"timestamp":1408727123813
	},
	{
		"_id":"549454913b87a791550d836e",
		"timestamp":1419007121579,
		"rootPath":"user/red"
	}
]
```

You do NOT get the properties of the vertices, you just get thier timestaps, internal ids, and root-paths. Using the root-path, you can again listen on their properties if you want.

##### 2. Addition
```
{
	"optype":"UPDATE",
	"vertex":{
		"timestamp":1419007153037,
		"rootPath":"user/blue",
		"_id":"user`549454b13b87a791550d836f"
	}
}
```
`data.optype` is _"UPDATE"_, and `data.vertex` is the newly added vertex in the namespace.

##### 3. Removal (Destruction)

```json
{
	"optype":"DESTROY",
	"vertex": {
		"_id":"user`549454b13b87a791550d836f",
		"timestamp":1419007160898,
		"rootPath":"user/red"
	}
}
```

`data.optype` is _"REMOVE"_, and `data.vertex` is the vertex which got destroyed.
