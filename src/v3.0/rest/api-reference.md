{"threeColumns": true}
# Introduction

The Appbase API is based on REST principles. All operations including creation of new documents and references, fetching document (JSON) and references, deleting a document or a reference as well as searching through documents are RESTful.

### Resource Types

- ``Collection`` - A container of JSON documents
- ``Document`` - A JSON object, can contain embedded documents
- ``Reference`` - A reference is an alias to another document
- ``Path`` - A path consists of a document and one or more references

### Allowed HTTP Request Types

- ``PATCH`` - Partial Updates to an Existing Resource OR Creates a new resource
- ``POST`` - Creates a new resource at the resource path
- ``GET`` - Fetches a resource
- ``DELETE`` - Delete a resource


### Authorization

Appbase accepts one of the two methods of authorizations.

1. Header based authorization (preferred) - Add a HTTP header "Appbase-Secret" to each request, with value as the app's *secret key*.
2. Add a field "secret" : "&lt;secret-key>" in the JSON body of the request.

In this document, we will be using the 1. method since it makes authorization distinct from the request data.


### Base URI

Base URI is the fixed URI that is common for all the API request endpoints and is prefix to all the API requests. A base URI has two path variables: **appname** and **api_version**. A typical base URI looks like https://v3.api.appbase.io/&lt;appname>/.



# API Reference

## Introduction

The Appbase API endpoints are divided between three types of different resources.

1. ``Collection`` - A container of JSON documents
2. ``Document`` - A JSON object, can contain embedded documents
3. ``Reference`` - A reference is an alias to another document

#### Path: New Concept

A path consists of a document and one or more references. It's similar to how symlinks work in *nix filesystems.

## Global

### Server Time

> **Example Request**
```curl
curl -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
  'https://v3.api.appbase.io/rest_test/~timestamp'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns server timestamp in milliseconds.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">GET</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/~timestamp
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
1427598163417
</code>
</pre>

### List collections

> **Example Request**
```curl
curl -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
  'https://v3.api.appbase.io/rest_test/~collections'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an array with collection names.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">GET</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/~collections
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
["Materials", "newName", "user", "calls", "HXH"]
</code>
</pre>

### Search collections

Search documents across one or more collections. *Returns* a JSON body matching the **ElasticSearch response format**. The matching search results are inside the ``hits.hits`` field as an array of documents. For more details, see other queries that can be done with this [endpoint](http://docs.appbase.io/#/v3.0/search/use-cases), including fuzzy search, numeric-range, geospatial and aggregation queries.

> **Example Request**
```curl
curl -X POST -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     -d '{
            "query": {
                "multi_match": {
                    "fields": ["foo"],
                    "query": "bar"
                }
            }
        }' \
'https://v3.api.appbase.io/rest_test/~search'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``collections`` - An array of the collection names across which search should be applied.</li>
		<li>``body.query`` - A JSON object representing the search query and the properties to be used for the matching criteria.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an array of documents which match the search query. Each document is returned as an object with all the **properties** (both matching and non-matching), a server ``timestamp`` when the document was last updated, the collection name ``_collection`` to which the document belongs and the document key as ``_id`` (unique to the collection).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">POST</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/~search
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
        "query": {
                "multi_match": {
                    "fields": ["foo"],
                    "query": "bar"
                }
	}
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
    "took":126,
    "timed_out":false,
    "_shards":{
    	"total":5,
    	"successful":5,
    	"failed":0
    },
    "hits": {
    	"total":1,
    	"max_score":8.6468315,
    	"hits":[
    		{
    			"_index":"rest_test",
    			"_type":"Materials",
    			"_id":"5510233f328410803792d1cb",
    			"_score":8.6468315,
    			"_source":{
    				"lol":"cat",
    				"timestamp":1427120959524,
    				"rootPath":"Materials/Es"
    			}
    		}
    	]
    }
}
</code>
</pre>

## Collection

### List all documents

List the documents in the collection. *Returns* an array of documents in the given collection.

> **Example Request**
```curl
curl -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
  'https://v3.api.appbase.io/rest_test/Materials/~documents'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* identifier can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an array of documents. Each document is returned as an object with a server ``_timestamp`` when the document was last updated, the collection name ``_collection`` to which the document belongs and the document key as ``_id`` (unique to the collection).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">GET</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/~documents
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
[
    {
        "foo":"bar1",
        "_id":"Ice",
        "_collection":"Materials",
        "_timestamp":1427654841414
    },
    {
        "lol":"cat",
        "_id":"Es",
        "_collection":"Materials",
        "_timestamp":1427120959524
    }
]
</code>
</pre>

### Search Documents by property(ies)

Search documents by one or more document properties. *Returns* a JSON body matching the **ElasticSearch response format**. The matching search results are inside the ``hits.hits`` field as an array of documents. For more details, see other queries that can be done with this [endpoint](http://docs.appbase.io/#/v3.0/search/use-cases), including fuzzy search, numeric-range, geospatial and aggregation queries.

> **Example Request**
```curl
curl -X POST -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     -d '{
        "query": {
            "multi_match": {
                "fields": ["foo"],
                "query": "bar"
            }
        }
     }' \
'https://v3.api.appbase.io/rest_test/Materials/~search'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* identifier can contain all ascii characters except for white spaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``query`` - A JSON object representing the search query and the properties to be used for the matching criteria.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns an array of documents which match the search query. Each document is returned as an object with all the **properties** (both matching and non-matching), a server ``timestamp`` when the document was last updated, the collection name ``_collection`` to which the document belongs and the document key as ``_id`` (unique to the collection).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">POST</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/~search
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
        "query": {
            "multi_match": {
                "fields": ["foo"],
                "query": "bar"
            }
        }
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
    "took":126,
    "timed_out":false,
    "_shards":{
    	"total":5,
    	"successful":5,
    	"failed":0
    },
    "hits": {
    	"total":1,
    	"max_score":8.6468315,
    	"hits":[
    		{
    			"_index":"rest_test",
    			"_type":"Materials",
    			"_id":"5510233f328410803792d1cb",
    			"_score":8.6468315,
    			"_source":{
    				"lol":"cat",
    				"timestamp":1427120959524,
    				"rootPath":"Materials/Es"
    			}
    		}
    	]
    }
}
</code>
</pre>


## Document Properties

All data operations on a document happen via **Document Properties** endpoint.

### Create / Update Document Properties

Create a new document with some properties or update the properties of an existing document.

> **Example Request**
```curl
curl -X PATCH -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     -d '{
		"foo":"bar"
     }' \
'https://v3.api.appbase.io/rest_test/Materials/Ice/~properties'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>``data`` - A JSON object representing the properties to be set on the document (can contain nested object, arrays). In case of a conflict (read existing property), the property value will be overwritten.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns updated properties and values, a server ``_timestamp`` when the update happened, the collection name ``_collection`` to which the document belongs and the document key as ``_id`` (unique to the collection).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">PATCH</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/~properties
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "foo": "bar"
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
  "foo": "bar",
  "_timestamp": 1413403738268,
  "_id": "Ice",
  "_collection": "Materials"
}
</code>
</pre>

### Read Document Properties

Read the existing document properties.

> **Example Request**
```curl
curl -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
'https://v3.api.appbase.io/rest_test/Materials/Ice/~properties'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns a **document** with all the properties, a ``_timestamp`` value when the document was last updated, the collection name ``_collection`` to which the document belongs and the document key as ``_id`` (unique to the collection).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">GET</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/~properties
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
  "foo": "bar",
  "green": "leaf",
  "_id": "Ice",
  "_collection": "Materials",
  "_timestamp": 1418488108255
}
</code>
</pre>

### Delete document properties

Delete specific (or all) data properties of a document.

> **Example Request**
```curl
curl -X DELETE -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     -d '{
         "properties": ["foo"]
     }' \
'https://v3.api.appbase.io/rest_test/Materials/Ice/~properties'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting all properties</b>
	<ul>
		<li>A JSON object with the field ``properties`` set as the boolean value **true**.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting specific properties</b>
	<ul>
		<li>A JSON object with the property ``properties`` set as an array of property names to be deleted.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns the **document** object with the deleted properties set to "", a ``_timestamp`` value when the document was last updated, the collection name ``_collection`` to which the document belongs and the document key as ``_id`` (unique to the collection).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">DELETE</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/~properties
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "properties": ["foo"]
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
  "foo": "",
  "_timestamp": 1418486072705,
  "_id": "Ice",
  "_collection": "Materials"
}
</code>
</pre>

## Document References

### Create / Update Document References

Create a new reference or update the existing reference(s). A **priority**, which acts as an index can optionally be set on the reference.

> **Example Request**  
```curl
curl -X PATCH -H "Appbase-Secret:193dc4d2440146082ea734f36f4f2638" \
     -d '{
	         "aReference": {
	             "path": "Materials/Iron"
	         },
	         "anotherReference": {
	             "path": "Materials/Ice",
	             "priority": 500.6
	         }
     }' \
'https://v3.api.appbase.io/rest_test/Materials/Ice/~references'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>A JSON object representing the reference(s) to be created from the document. In case of a conflict (read an existing reference), the original reference will be updated.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns updated references, a server ``_timestamp`` for each reference when the update happened, and a unique identifier for each reference resource ``t_id`` (used by the server internally).</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">PATCH</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/~references
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "aReference": {
      "path": "Materials/Iron"
    },
    "anotherReference": {
      "path": "Materials/Ice",
      "priority": 500.6
    }
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
    "aReference": {
      "t_id": "Materials`5488ccab3b87a791550d81b7",
      "_timestamp": 1418261314605
    },
    "anotherReference": {
      "t_id": "Materials`547059ce69528db30aa7ae90",
      "priority": 500.6,
      "_timestamp": 1418261314605
    }
}
</code>
</pre>

### Read References

Fetch the document references.

> **Example Request**
```curl
curl -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
'https://v3.api.appbase.io/rest_test/Materials/Ice/~references'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">URL PARAMETERS</span>
	<ul>
		<li>URL parameters can be passed to retrieve references by querying on priority. The valid url parameters are startAt, endAt, limit and skip</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns a **references** object with the filtered references as an array, each reference having a ``_timestamp`` value when the reference was last updated, a unique identifier of the reference resource ``t_id`` (used by the server internally), along with an ``id`` identifier of the reference on which this operation is performed.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">GET</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/~references
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
[
    {
        "anotherReference":
        {
            "_timestamp":1427746003602,
            "_json": 
            {
                "_id":"Ice",
                "foo":"bar",
                "_collection":"Materials",
                "_timestamp":1427745945520
            },
            "priority":500.6
        }
    },
    {
        "aReference":
        {
             "_timestamp":1427746003602,
             "_json":
             {
                 "_id":"Iron",
                 "density":"2.0",
                 "_collection":"Materials",
                 "_timestamp":1427745992545
             }
        }
    }
]
</code>
</pre>

### Delete References

Delete specific (or all) document references.

> **Example Request**
```curl
curl -X DELETE -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     -d '{
        "references": ["edge1", "edgen"]
     }' \
'https://v3.api.appbase.io/rest_test/Materials/Ice/~references'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting all references</b>
	<ul>
		<li>A JSON object with the field ``references`` set as the boolean value **true**.</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span> <b>For deleting specific references</b>
	<ul>
		<li>A JSON object with the field ``references`` set as an array of reference identifiers to be deleted.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">DELETE</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/~references
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "references": ["edge1", "edgen"]
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
</code>
</pre>

## Delete Document

Deletes the document (including all properties, references), the document path itself will not resolve after this operation, i.e. a retrieval will result in a *101: Resource does not exist* error.

> **Example Request**
```curl
curl -X DELETE -H "Appbase-Secret: 193dc4d2440146082ea734f36f4f2638" \
     -d '{
         "all": true
     }' \
'https://v3.api.appbase.io/rest_test/Materials/Ice/'
```
**Usage**:
<ul>
<li><span class="inline-heading">URL VARIABLES</span>
	<ul>
		<li><span class="path-var">appname</span> - application name, as set in the Dashboard.</li>
		<li><span class="path-var">collection</span> - collection identifier, will create one if it doesn't exist.</li>
		<li><span class="path-var">document</span> - document identifier, will create one if it doesn't exist.</li>
		> ``Note:`` *collection* and *document* identifiers can contain all ascii characters except for whitespaces, ‘/’, ‘:’, and ‘~’.
	</ul>
</li>
<li><span class="inline-heading">REQUEST HEADERS</span>
	<ul>
		<li>Appbase-Secret - Application secret key, unique to the application</li>
	</ul>
</li>
<li><span class="inline-heading">REQUEST BODY (JSON)</span>
	<ul>
		<li>A JSON object with the field ``all`` set as the boolean value **true**.</li>
	</ul>
</li>
<li><span class="inline-heading">RESPONSE</span>
	<ul>
		<li><span class="inline-heading">STATUS</span> - ``200`` if success.</li>
		<li><span class="inline-heading">BODY (JSON)</span> - Returns the **document** object with the fields "_deleted" set to true, and ``_timestamp`` field set for the time of deletion.</li>
	</ul>
</li>
</ul>

<pre>
<code>
<b>Request</b>
<span class="inline-heading">URL</span>
<span class="request-type">DELETE</span> https://v3.api.appbase.io/<span class="path-var">appname</span>/<span class="path-var">collection</span>/<span class="path-var">document</span>/
<span class="inline-heading">HEADERS</span>
Appbase-Secret: 193dc4d2440146082ea734f36f4f2638
<span class="inline-heading">BODY</span>
{
    "all": true
}

<b>Response</b>
<span class="inline-heading">STATUS</span>
200
<span class="inline-heading">BODY</span>
{
  "_deleted": "true",
  "_timestamp": 1431324814057,
  "_id": "Ice",
  "_collection": "Materials"
}
</code>
</pre>
