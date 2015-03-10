# {"title": "Introduction", "threeColumns": true}

The Appbase v3.0 API is based on REST principles. All operations including creating documents and references, fetching a specific document, deleting a document or searching through documents are RESTful. The only non-RESTful operation is realtime event streams, which works with the Websocket protocol, via sockjs.

# API Quick Reference


Endpoint | Method | Action
-------- | ------ | ------ 
/ | GET | list of existing collections, current time as an object
/{collection_id}/ | GET | Get a list of documents
/{collection_id}/ | PATCH | Create a collection, if doesn't exist
/{collection_id}/ | DELETE | Delete a collection
/{collection_id}/ | PUT | create a new document inside collection with an auto generated id
/{collection_id}/ | POST | queries
/{collection_id}/{document_id}/{path}/ | GET | get/listen properties
/{collection_id}/{document_id}/{path}/ | PATCH | create object; partially update properties; put-remove a reference
/{collection_id}/{document_id}/{path}/ | PUT | push a JSON to create a new object and a reference
/{collection_id}/{document_id}/{path}/ | DELETE | delete the whole document
/{collection_id}/{document_id}/{path}/ | POST | queries

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

# Headers

 - appbase-secret
 - content-type: "application/json"
 - http-method-override - https://www.firebase.com/docs/rest/api/#section-method-override


# API Reference

## http://api.appbase.io/appname/v3 - Global

### `GET`
```js
{
	_time: {
		"_timestamp": 346274526,
		"_timezone": "UTC", // always - infact server's own system time is in UTC - simplifies Elasticsearch's relative time features
		"_ISOString": "2015-02-27T02:51:50.968Z",
	},
	_collections: ["user", "tweet"]
}
```

### Document Resource Notes:

- properties - that can not be used by the developer:
 
	- _id - uuid of the document - unique across the collection - also represents the document's path: `collection/id`
	- _timestamp - used for internal timestamping
	- _collection - collection where it belongs
	- _deleted - keeping track of deleted documents
    - deprecated in this version:
	    - rootPath <-replaced by id and collection


---

## Collection

Operate on namespaces.

### __Create__ ``PATCH``

Create a new collection if it doesn't exist. This is NOT a required step to create documents inside that collection. Collections are created automatically.

```
curl -i -X PATCH \  
'https://api.appbase.io/rest_test/v3/Materials'
```

Reponse: (when the collection is newly created)
```js
{
	"_collection": "Materials",
	"_created": true, // as it is a new collection
	"_createdAt": 2301249092 //timestamp in UTC
}
```

(when the collection already exists)
```js
{
	"_collection": "Materials",
	"_createdAt": 2301249092 //timestamp in UTC
}
```

### __Delete__ ``DELETE``
Delete the collection and all its documents.

```
curl -i -X DELETE \  
'https://api.appbase.io/rest_test/v3/Materials'
```
Response: 
```js
{
	"_collection": "Materials",
	"_createdAt": 2301249092, //timestamp in UTC
	"_deleted": true
}
```

### __Push JSON to a new document__ ``PUT``

Push a JSON and create a new document out of it in a collection. It will be given a UUID as its doc id by default.

```
curl -i -X PUT \  
-d '{
		"name": "lanny"
	}
}' \  
'https://api.appbase.io/rest_test/v3/user/'
```

Response:

```js
{
	"asd34234": {
		"_id" : "asd34234" //random id
		"name": "lanny"
	}
}
```

Note:
 -  If an `_id` field is provided inside the JSON object, that id will be used as the document's id in Appbase. Making it fully compatible with other NoSQL stuff. For eg.

```
curl -i -X PUT \  
-d '{
		"_id": "john"
		"name": "john mcclane"
	}
}' \  
'https://api.appbase.io/rest_test/v3/user/'
```

Response:
```js
{
	"john": {
		"_id": "john"
		"name": "john mcclane"
	}
}
```

Now fetching that document:
```
curl -i -X \  
'https://api.appbase.io/rest_test/v3/user/john'
```

Note:
If `_id` points to an existing document, it works as a `PATCH`.



### __Read__ `GET`


```
curl -i \    
'https://api.appbase.io/rest_test/v3/Materials?timestamp=235234'
```

Response:

`200`

```js
{
	
	"abc" : {
		"_id": "abc",
		"_collection": "Materials"
		"_timestamp": 2021692,
		"foo": "bar"
	},
	"pqr": null // deleted
}
```
Note:
 - If a `timestamp` is provided in the url parameter, it will work as a _sync_ and only the documents updated after that will be returned. Documents that are deleted will be returned too, with `"/doc_id": null`. 
 - By default, we only provide 1000 documents in the request. If required more, use the queries.


### __Query__ `POST`

Elastic search queries on the documents.

For now, the query format, and the response format is kept exactly the same as elasticsearch.

```
curl -XPOST 'https://api.appbase.io/rest_test/v3/user/' \
-d '//DslQueryJSONObject'
```

the query object example:

```js
{
    size: 0,
    query: {
      filtered: {
        filter: {
            bool: {must: [
                {"exists" : { "field" : "bucket" }}, // leave it as it is
                {"exists" : { "field" : "_user" }}, // leave it as it is
                {"range": {"startTime": range("2015-02-28 2015-02-28")}} // date range
            ]}
        }
      }
    },
    aggs: { // creating buckets for hours
      byTime: {
        terms: {
          field: "bucket.hour",
          size: 2
        }
      }
    }
  }
}
```

Response:

Direct elastic search results.

```js
{
  "took": 7,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 2491,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "byTime": {
      "buckets": [
        {
          "key": 9,
          "doc_count": 398
        },
        {
          "key": 8,
          "doc_count": 358
        }
      ]
    }
  }
}
```


Note: 
Pagination becomes a part of the elasticsearch query.

https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html

## Document

Operate on documents inside a collection.

### __Create / Update Document__ ``PATCH``
Update the document properties, or create a new document when the path exists. The document and collection, are automatically created if they don't exist.

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
```js
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
 eg:
```
curl -i -X PATCH \
-d '{"foo": "bar"}' \
'https://api.appbase.io/rest_test/v3/Materials/Ice/'
```
Response: 
```js
{
	"_id": "Ice"
	"_collection": "Materials",
	"_timestamp": 12535265236,
	"foo": null // null appears only in this request, as this property is removed. in subsequent requests, this property will simply be omitted 
}
```

 - to update a nested field, provide nested properties with a dot (Mongo and ES convention)
	- eg: 
```js
{
	"authoredBy.profile.firstName" = 52
}
```

- it is possible to patch a non-existent deeper document using patch too. the ancestors must exist. eg.
```
curl -i -X PATCH \
-d '{"foo": "bar", "_collection": "Song"}' \
'https://api.appbase.io/rest_test/v3/Materials/Ice/IceBaby'
```

Note that `_collection` must be provided in the request, where the object will be created.
If `_id` is provided too, it will be used as the id for the new document.

Response: 
```js
{
	"_id": "sddfvdav", // random, if not provided in the request 
	"_collection": "Song",
	"_timestamp": 12535265236,
	"foo": null // null appears only in this request, as this property is removed. in subsequent requests, this property will simply be omitted 
}
```

### __Delete__ `DELETE`

Delete (Destroy) Document

```
curl -i -X DELETE \
'https://api.appbase.io/rest_test/v3/Materials/Ice'
```

Response: (get the whole document which was just deleted - omitting references) 

`200`
Content-Type: application/json
```js
{
	"_id": "Ice",
	"_collection": "Materials",
	"_timestamp": 12535265236,
	"_deleted": true,
	"foo": "bar"
}
```



### Creating References 


### __with a Reference Name__ `PATCH`

Update/create references, one at a time. This is an overloaded endpoint. One can update either properties or one reference.

> **Example Request**
```curl
curl -i -X PATCH \  
-d '{
	"/tweetedBy": "user/sagar"
}' \  
'https://api.appbase.io/rest_test/v3/Materials/Ice/'
```

Response: 
`200`
Receive the reference with its data. Receive basic properties of the document, id collection and timestamp. 

```js
{
	"_id": "Ice",
	"_collection": "Materials",
	"_timestamp": 12535265236,
	"/tweetedBy": {
		"_id": "abc",
		"_collection": "asas"
		"_timestamp": 2021692,
		"foo": "bar"
	}
}
``` 

Note:
 - provide a `null` for a reference name to delete a reference.

Eg: 


> **Example Request**
```curl
curl -i -X PATCH \  
-d '{
	"/tweetedBy": null
}' \  
'https://api.appbase.io/rest_test/v3/Materials/Ice/'
```

Response: 
`200`
Receive the deleted reference, set as null. Receive basic properties of the document, id collection and timestamp. 

```js
{
	"_id": "Ice",
	"_collection": "Materials",
	"_timestamp": 12535265236,
	"/tweetedBy": null
}
```

Note:

- references don't have any meta data. No priority/timestamp.

### __without a Reference Name__ `PUT`

This is a way to work with web-hooks or events from other systems and services, where there may not be a control over what kind of JSON object is received.

This endpoint allows pushing pure JSON data to an document URL, and it creates a new document out of it, adding it as a reference inside the document.

Works similar to PUT on a collection.

eg.

> **Example Request**
```curl
curl -i -X PUT \  
-d '{
	"message": "this is a tweet"
}' \  
'https://api.appbase.io/rest_test/v3/Materials/Ice?collection=tweet'
```

Response:

```js
{
	"/141fsddvf": { //random generate reference name
		"_id": "wasvt33463", //random generated id for the new document
		"_collection": "tweet"
		"message": "this is a tweet"
	}
}
```
Note: 

- `collection=` is necessary in the URL, where the new document will be created.

### __Read Document__ ``GET`` 

Fetch document's properties and references

> **Example Request**
```curl
curl -i \  
'https://api.appbase.io/rest_test/v3/Materials/Ice'
```

Response:

`200`
```js
{
	"_id": "Ice",
	"_collection": "Material",
	"foo": "bar",
	"_timestamp": 23491400,
	"/tweetedBy": {
		"_id": "3193v1934n",
		"_collection": "user",
		"name": "yo",
		"_timestamp": 23491400
	}
}
```

Note:
 - references are included as well, unless `references=false` provided in URL parameter
 - if a `timestamp` is provided in the url parameter, it will work as a _sync_ and refs changed after that timestamp will be returned: `"/ref_name": null`
 - by default, only 1000 references will be returned. If required more, use the queries.



### __Query__ `POST`

Elastic search queries on the documents.

For now, the query format, and the response format is kept exactly the same as elasticsearch.

```
curl -XPOST 'https://api.appbase.io/rest_test/v3/user/sagar/calls' \
-d '//DslQueryJSONObject'
```

the query object example:

```js
{
    size: 0,
    query: {
      filtered: {
        filter: {
            bool: {must: [
                {"exists" : { "field" : "bucket" }}, // leave it as it is
                {"exists" : { "field" : "_user" }}, // leave it as it is
                {"range": {"startTime": range("2015-02-28 2015-02-28")}} // date range
            ]}
        }
      }
    },
    aggs: { // creating buckets for hours
      byTime: {
        terms: {
          field: "bucket.hour",
          size: 2
        }
      }
    }
  }
}
```

Response:

Direct elastic search results.

```js
{
  "took": 7,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 2491,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "byTime": {
      "buckets": [
        {
          "key": 9,
          "doc_count": 398
        },
        {
          "key": 8,
          "doc_count": 358
        }
      ]
    }
  }
}
```

Note: 
Pagination becomes a part of the elasticsearch query.

https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html
