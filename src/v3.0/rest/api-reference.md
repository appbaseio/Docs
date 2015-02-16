# {"title": "Introduction", "threeColumns": true}

The Appbase v3.0 API is based on REST principles. All operations including creating documents and references, fetching a specific document, deleting a document or searching through documents are RESTful. The only non-RESTful operation is realtime event streams, which works with the Websocket protocol, via sockjs.

# API Reference


Endpoint | Method | Action
-------- | ------ | ------ 
/ | GET | list of existing collections
/~search | POST | Elastic search query
/{collection} | GET | Get a list of documents
/{collection} | PUT | Create a collection
/{collection}/~search | POST | Quick full text Search
/{collection} | DELETE | Delete a collection
/{collection} | POST | create a new document inside collection with uuid
/{collection}/{document_id}/{path} | GET | get properties
/{collection}/{document_id}/{path} | PUT | create object/update properties
/{collection}/{document_id}/{path} | PATCH | create object/partially update properties
/{collection}/{document_id}/{path} | DELETE | delete document
/{collection}/{document_id}/{path} | POST | insert a reference without a name
/{collection}/{document_id}/{path}/~refs | GET | get refs
/{collection}/{document_id}/{path}/~refs | PUT | put refs
/{collection}/{document_id}/{path}/~refs | PATCH | patch refs
