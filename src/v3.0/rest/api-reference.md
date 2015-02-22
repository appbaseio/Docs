# {"title": "Introduction", "threeColumns": true}

The Appbase v3.0 API is based on REST principles. All operations including creating documents and references, fetching a specific document, deleting a document or searching through documents are RESTful. The only non-RESTful operation is realtime event streams, which works with the Websocket protocol, via sockjs.

# API Quick Reference


Endpoint | Method | Action
-------- | ------ | ------ 
/ | GET | list of existing collections
/{collection_id}/ | GET | Get/Query a list of documents
/{collection_id}/ | PATCH | Create a collection, if doesn't exist
/{collection_id}/ | DELETE | Delete a collection
/{collection_id}/ | POST | create a new document inside collection with an auto generated id
/{collection_id}/{document_id}/{path}/ | GET | get/listen properties, Query references
/{collection_id}/{document_id}/{path}/ | PATCH | create object; partially update properties; put-remove a reference
/{collection_id}/{document_id}/{path}/ | DELETE | delete the whole document
/{collection_id}/{document_id}/{path}/ | POST | insert a new reference document with an auto generated id

## HTTP Status Codes

 - 200 (Success): for every request that succeeds, also the create/delete ones
 - 404 (not found): when the path doesn't exist
 - 401 (Unauthorized): when secret or token is not present, or is invalid
 - 500 (Server error): internal server errors, like when ES indexing failed or something
 - 501 (Not Implemented) : When trying to use a wrong HTTP method on the endpoint
 - 400 (Bad Request): 
 - 403 (Forbidden): a thing to keep in mind for the next backend - When the security rules do not allow the access
 - 409 (Conflict): for commitData

## Errors

On top of HTTP status code, we return a json document for errors. the document looks like: 
```js
{
	error: <number>
	message: <string>
}
```

# API Reference

### Document Resource Notes:

- properties - that can not be used by the developer:
 
	- _id - uuid of the document
	- _timestamp - used for internal timestamping
	- _collection - collection where it belongs
	- _deleted - keeping track of deleted documents
    - deprecated in this version:
	    - rootPath <-replaced by id and collection


---

## Collection

Operate on documents inside a collection.

### __Write__ ``POST``

Push a JSON and create a new document out of it. It will be given a UUID as its doc id by default.

```
curl -i -X POST \  
-d '{
		"name": "john"
	}
}' \  
'https://api.appbase.io/rest_test/v3/user/'
```

Note:
 -  (Unsure) If an `_id` field is provided inside the JSON object, that id will be used as the document's id in Appbase. Making it fully compatible with other NoSQL stuff - Dane and Patrick both had this problem. 

### __Write__ ``PATCH``

Create a new collection if it doesn't exist. This is NOT a required step to create documents inside that collection. Collections are created automatically.

```
curl -i -X PATCH \  
'https://api.appbase.io/rest_test/v3/Materials'
```


### __Delete__ ``DELETE``
Delete the collection and all its documents.

```
curl -i -X DELETE \  
'https://api.appbase.io/rest_test/v3/Materials'
```


### __Read__ `GET`

Receive all the documents inside, provide a `query=` url parameter for querying the documents.

```
curl -i \    
'https://api.appbase.io/rest_test/v3/Materials
```

Response:

`200`

```json
{
	_query: { size: 50, query: {match_all: {}}},
	_timestamp: 0,
	_received: 2,
	_documents: [
		{
			"_id": "abc",
			"_collection": "Materials"
			"_timestamp": 2021692,
			"foo": "bar"
		},
		{
			"_id": "abc",
			"_collection": "asas"
			"_timestamp": 2021692,
			"foo": "foo"
		}
	]
}

```

Note:
 - If a `timestamp` is provided in the url parameter, it will work as a _sync_ and only the documents updated after that will be returned.
 - response also include the request url parameters (query, timestamp etc) 
 - By default, at most `50` documents are returned. To fetch more, provide a proper `query`.
 
## Document

### __Create / Update Document__ ``PATCH``
Update the document properties, or create a new document when the path exists. 

> **Example Request**
```curl
curl -i -X PATCH \
-d '{"foo": "bar"}' \
'https://api.appbase.io/rest_test/v3/Materials/Ice/'
```

Response: 
 Return the whole updated document.

`200`
Content-Type: application/json
```json
{
	"_id": "Ice"
	"_collection": "Materials",
	"_timestamp": 12535265236,
	"foo": "bar"
}
```
Note:

 - If timestamp is provided in the url parameter, it will only update the document when the request timestamp matches the stored timestamp. (commitData)
 - only updates properties which are provided in the request
 - patch properties with `null` to remove them
 - to update a nested field, provide nested properties with a dot (Mongo and ES convention)
	- eg: 
```js
{
	"authoredBy.profile.firstName" = 52
}
```

### __Creating References__ `PATCH`


Update/create references, one at a time. This is an overloaded endpoint. One can update either properties or one reference.

> **Example Request**
```curl
curl -i -X PATCH \  
-d '{ 
	"/tweetedBy":  {
		"_path": "user/sagar",
		"_priority:" 5820352232
	}
}' \  
'https://api.appbase.io/rest_test/v3/Materials/Ice/'
```

Response: 
`200`
Receive the whole document, with the reference which was just updated. `_deleted` will be true for reference which just got deleted.

```json
{
	"ref_name": {
		"_priority": 5354842,
		"_timestamp": 096240962,
		"_deleted": true,
		"_json": {
			"_id": "abc",
			"_collection": "asas"
			"_timestamp": 2021692,
			"foo": "bar"
		}
	}
}
``` 

Note:
 - provide a `null` for a reference name to delete a reference.


### __Delete__ `DELETE`

Delete (Destroy) Document

```
curl -i -X DELETE \
'https://api.appbase.io/rest_test/v3/Materials/Ice'
```

Response: (get the whole document which was just deleted - omitting references) 

`200`
Content-Type: application/json
```json
{
	"_id": "Ice",
	"_collection": "Materials",
	"_timestamp": 12535265236,
	"_deleted": true,
	"foo": "bar"
}
```

### __Read Document__ ``GET`` 

Fetch document's properties and references

> **Example Request**
```curl
curl -i \  
'https://api.appbase.io/rest_test/v3/Materials/Ice'
```

Response:

`200`
```
{
	"_query": {"size": 50, "query": {"match_all":{}}},
	"_fromTimestamp": 0,	
	"_received": 2,
	"_refs": [
		{
			"_name": "ref_name",
			"_priority": 251413
			"_document" : {
				"_id": "abc",
				"_collection": "Materials"
				"_timestamp": 2021692,
				"foo": "bar"
			}
		},
		{
			"_name": "ref_name2",
			"_priority": 2514132351
			"_document" : {
				"_id": "pqr",
				"_collection": "user"
				"_timestamp": 202169512,
				"beer": "bar"
			}
		}
	]
}
```

Note:
 - references are included as well, unless `deep=false` provided in URL parameter
 - JSON of the referenced document is returned as well.
 - `query` is a url paramter, that filter references.
 - if a `timestamp` is provided in the url parameter, it will work as a _sync_ and refs changed after that timestamp will be returned. 
 - request url parameters are included in the response
 - By default, only 50 reference are returned.
