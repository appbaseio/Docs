# {"title": "Introduction", "threeColumns": true}

The Appbase v3.0 API is based on REST principles. All operations including creating documents and references, fetching a specific document, deleting a document or searching through documents are RESTful. The only non-RESTful operation is realtime event streams, which works with the Websocket protocol, via sockjs.

# API Quick Reference


Endpoint | Method | Action
-------- | ------ | ------ 
/ | GET | list of existing collections
/~search | GET | Elastic search query
/{collection_id} | GET | Get/Query a list of documents
/{collection_id} | PUT | Create a collection, if doesn't exist
/{collection_id}/~search | GET | Quick full text Search
/{collection_id} | DELETE | Delete a collection
/{collection_id} | POST | create a new document inside collection with uuid
/{collection_id}/{document_id}/{path} | GET | get/listen properties, Query references
/{collection_id}/{document_id}/{path} | PATCH | create object; partially update properties; put-remove a reference
/{collection_id}/{document_id}/{path} | DELETE | delete the whole document
/{collection_id}/{document_id}/{path} | POST | insert a JSON, create a new document for it, and it as a  reference, optionally creating a uuid in the name

## HTTP Status Codes

 - 200 (Success): for every request that succeeds, also the create/delete ones
 - 404 (not found): when the path doesn't exist
 - 401 (Unauthorized): when secret or token is not present, or is invalid
 - 500 (Server error): internal server errors, like when ES indexing failed or something
 - 501 (Not Implemented) : When trying to use a wrong HTTP method on the endpoint
 - 400 (Bad Req): 
 - 403 (Forbidden): a thing to keep in mind for the next backend - When the security rules do not allow the access
 - 409 (Conflict) : for commitData

## Errors

On top of HTTP status code, we return a json document for errors. the document looks like: 
```json
{
	error: <number>
	message: <string>
}
```

Each error has a error-no, and here are the errors:
TBD
 - 1x: request format related
 - 2x: auth and security related
 - 3x: data related: path do not exist, commitData related
