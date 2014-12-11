# Introduction

The Appbase API is based on REST principles. All operations including creating vertices and edges, fetching vertex properties (data) and edges, deleting a vertex or an edge as well as searching through vertices are RESTful. The only non-RESTful operation is realtime event streams, which works with the Websocket protocol.


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



# API endpoints

## Introduction

The Appbase API endpoints are divided between three types of different resources.

1. ``Vertex`` - A *vertex* contains two distinct resources - **Properties** and **Edges**. A vertex URI consists of either &lt;namespace>/&lt;vertex>/ format or &lt;namespace>/&lt;vertex1>/&lt;vertex2>/.../&lt;vertexn>/ format. Except ``DELETE``, all operations on the *vertex* resource happens with either *properties* or *edges*.
2. ``Vertex Properties`` - *Vertex Properties* are stored as a JSON object. The suffix ``~properties`` is used with the resource URI of the vertex to operate on the *properties* resource.
3. ``Edges`` - *Edges* of a vertex are stored as JSON object. The suffic ``~edges`` is used with the resource URI of the vertex to operate on the *edge* resource.

## API Reference

### Create / Update Vertex Properties

Create a new vertex with some properties or update the properties of an existing vertex.

> **Example Request**
```curl
curl --include \
     --request PATCH \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary "    {
        \"data\":{\"foo\":\"bar\"}
    }" \
https://api.appbase.io/rest_test/v2/Materials/Ice/~properties
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
content-type: application/json
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

### Create / Update Vertex Edges

Create a new (directed) edge or update the existing edge(s) of a vertex to another vertex. An **order**, which acts as an index can optionally be set on the edge.

> **Example Request**
```curl
curl --include \
     --request PATCH \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     --data-binary "    {
        \"data\": {
            \"anEdge\": {
                \"path\": \"Materials/Iron\"
            },
            \"anotherEdge\": {
                \"path\": \"Materials/Ice\",
                \"order\": 500.6
            }
        }
    }" \
https://api.appbase.io/rest_test/v2/Materials/Ice/~edges
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
