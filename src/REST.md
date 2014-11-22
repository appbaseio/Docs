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

<pre>
<code>
<b>Request</b>

Content-Type: application/json
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

{
  "data": {
    "foo": "bar"
  }
}

<b>Response</b>

200

Content-Type: application/json
access-control-allow-credentials: true
cache-control: no-cache
content-type: application/json
date: Wed, 15 Oct 2014 20:08:58 GMT
content-length: 112
connection: keep-alive

{
  "foo": "bar",
  "timestamp": 1413403738268,
  "rootPath": "namespace/vertex",
  "_id": "namespace`543ed45a4c0b62550662563b"
}
</code>
</pre>
