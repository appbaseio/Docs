# appbase.js
JavaScript Wrapper for Appbase Rest API


1. Appbase Global Object
-----------

The Appbase object is responsible for instantiating Apps.


----------
### Methods  
**Appbase.app(appname, secret)**  
Used to create a new instance of a App  
Parameters:
 ```
 - appname: String - The name of the app on your appbase dashboard
 - secret: String - The secret of the app
 ```
#### Example
```javascript
    var restTestApp = Appbase.app("rest_test", "193dc4d2440146082ea734f36f4f2638");
```
 
----------

2. App Class
-----------
The App class has utility methods to manage the App's collections.

----------
###Methods  
 **App.search(query)**  
This method searches the App's collections with the given query.  
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-global-search-collections)    
Parameters:  
 ```
 - query: Object - A JS Object to query the collections.
 ```
 Example
 ```javascript
    AppTest.search({
        match_all : {}
    })
    .then(function(response){
       response.hits.hits.forEach(console.log.bind(console)); // hits.hits - Contains all matched objects, limited by the query or by default 10
       console.log(response.hits.total); // hits.total - Total number of objects matched
    });
 ```
 
  **AppTest.listCollections()**  
This method retrieves all the collections of the app.  
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-global-list-collections)  

```javascript
    AppTest.listCollections() // Returns a promise
    .then(function(collections) {
        collections.forEach(function(collection) { // The collections variable is a array of Collection
            console.log(collection.name);
        });
    });
 ```

**AppTest.serverTime()**  
Returns the server timestamp in milliseconds.  
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-global-server-time)  

```javascript
    AppTest.serverTime() // Returns a promise
    .then(function(time) {
        console.log(time); // 1430941365939
    });
```

**AppTest.collection(name)**  
Returns a Collection object for the provided name  

Parameters:  
 ```
 - name: String - The name of the collection, should already exists in your dashboard.  
 ```
 
```javascript
var userCollection = AppTest.collection('user');
```

3. Collection Class
-----------
Provides an interface to the Appbase's REST endpoints to manage your collections.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference)

----------
## Properties
```
name String - The name of the collection
```

## Methods

**collection.search(query)**
Searches the collection's documents with the provided query.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-collection-search-documents-by-propertyies)    
Parameters:  
 ```
 - query: Object - A JS Object to query the collection.
 ```

```javascript
    userCollection.search({ // Returns a promise
        filter : {
            term : {
                foo : 'bar'
            }
        }
    }).then(function(response) {
        console.log(response.hits.hits)
    });
```

**collection.insert(entry)**
Create a new document in the collection
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-properties-create-update-document-properties)

Parameters:  
 ```
 - entry: Object - A JS Object to be added to the collection.
 ```

```javascript
    userCollection.insert({ // Returns a promise
        foo : 'bar',
        name : 'aName'
    }).then(function(response) {
        console.log(response)
        /*
            {
                "foo": "bar",
                "name": "aName",
                "_id": "c12c7649-53e3-44bf-bbe8-f23769885eb0",
                "_collection": "calls",
                "_timestamp": 1430943009686
            }
        */
    });
```

**collection.set(key, entry)**
Create or update a new document in the collection, with the provided key as the id of that object.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-properties-create-update-document-properties)

Parameters:  
 ```
 - key: String - A unique key.
 - entry: Object - A JS Object to be added to the collection.
 ```

```javascript
    userCollection.set('12345', { // Returns a promise
        foo : 'bar',
        name : 'aName'
    }).then(function(response) {
        console.log(response)
        /*
            {
                "foo": "bar",
                "name": "aName",
                "_id": "12345",
                "_collection": "calls",
                "_timestamp": 1430943009686
            }
        */
    });
```

**collection.unset(key, properties)**
Delete specific (or all) data properties of a document.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-properties-delete-document-properties)

Parameters:  
 ```
 - key: String - Document's unique key.
 - entry: Array<String> - A array of Strings with the name of the properties tobe removed.
 ```

```javascript
    userCollection.unset('12345', ['bar']).then(function(response) { // Returns a promise
        console.log(response)
        /*
            {
                "foo": "", // Notice that foo is now empty
                "name": "aName",
                "_id": "12345",
                "_collection": "calls",
                "_timestamp": 1430943009686
            }
        */
    });
```

**collection.get(key)**
Read the existing document properties.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-properties-read-document-properties)

Parameters:  
 ```
 - key: String - Document's unique key.
 ```

```javascript
    userCollection.get('12345').then(function(response) { // Returns a promise
        console.log(response)
        /*
            {
                "foo": "",
                "name": "aName",
                "_id": "12345",
                "_collection": "calls",
                "_timestamp": 1430943009686
            }
        */
    });
```

**collection.getAll([filters])**
List the documents in the collection. Returns an array of documents in the given collection.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-collection-list-all-documents)

Parameters:  
 ```
 - filters: Object - Optional Object to paginate the collection's documents, you may specify limit and skip.
 ```

```javascript
    userCollection.getAll({ // Returns a promise
        limit : 3, // Get 3 objects
        skip : 2   // Start by the second
    }).then(function(response) {
        console.log(response)
        /*
            [
                {
                    "foo": "bar",
                    "_collection": "user",
                    "_id": "4fcaaab1636e48ca988ffe075ec820b5",
                    "_timestamp": 1427918110979
                },
                {
                    "foo": "bar",
                    "_collection": "user",
                    "_id": "77623095cf284c4c8768a0393e40aacf",
                    "_timestamp": 1427920330170
                },
                {
                    "name": "sid",
                    "name1": "sagar",
                    "_collection": "user",
                    "_id": "sid",
                    "_timestamp": 1428103822887
                }
            ]
        */
    });
```

**collection.on(key, callback[, errorCallback])**
Listen to changes on the Document with the provided key.


Parameters:  
 ```
 - key: String - Document's unique key.
 - callback: Function - A function to be called whenever a change occurs to the Document.
 - errorCallback: Function - A function to be called whenever a error occurs in the call, may be called more than once.
 ```

```javascript
    userCollection.on('12345', function(response) {
        console.log(response); // Will log the object every time it has a change
    });
```


**collection.onDocuments(callback[, errorCallback])**
Listen to the creation or changes on any Document in the collection.

Parameters:  
 ```
 - callback: Function - A function to be called whenever a new Document is created or a change occurs to a Document.
 - errorCallback: Function - A function to be called whenever a error occurs in the call, may be called more than once.
 ```

```javascript
    userCollection.onDocuments(function(response) {
        console.log(response); // Will log the object every time it has a new or changed Document
    });
```

**collection.onRef(key, callback[, errorCallback])**
Listen to the creation or changes of References on the Document that has the provided key.

Parameters:  
 ```
 - key: String - Document's unique key.
 - callback: Function - A function to be called whenever a new Reference is created or a changes in a Document.
 - errorCallback: Function - A function to be called whenever a error occurs in the call, may be called more than once.
 ```

```javascript
    userCollection.onRef('12345', function(response) {
        console.log(response); // Will log the object every time it has a new or changed Ref in the Document
        /*
        {
            "friend": {
                "_timestamp": 1431040446952,
                "_json": {
                    "_id": "sagar",
                    "name1": "sagar",
                    "name": "1123",
                    "_collection": "user",
                    "_timestamp": 1429562388858
                }
            }
        } */
    });
```


**collection.setRef(key, ref, path[, priority])**
Listen to the creation or changes of References on the Document that has the provided key.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-references-create-update-document-references)

Parameters:  
 ```
 - key: String - Document's unique key.
 - callback: Function - A function to be called whenever a new Reference is created or a changes in a Document.
 - errorCallback: Function - A function to be called whenever a error occurs in the call, may be called more than once.
 ```

```javascript
    userCollection.setRef('12345', 'friend', 'user/sagar').then(function(response) { // Returns a promise
        console.log(response);
        /*
        {
            "friend": {
                "timestamp": 1431040446952
            }
        }
        */
    });
```

**collection.getRefs(key[, filters])**
Get all the References of the Document with the provided key.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-references-read-references)

Parameters:  
 ```
 - key: String - Document's unique key.
 - filters: Object - Optional Object to paginate the documents's References, you may specify limit and skip.
 ```

```javascript
    userCollection.getRefs('12345', { // Returns a promise
        limit : 3, // Get 3 objects
        skip : 2   // Start by the second
    }).then(function(response) {
        console.log(response);
        /*
        [
            {
                "friend": {
                    "_timestamp": 1431040446952,
                    "_json": {
                        "_id": "sagar",
                        "name1": "sagar",
                        "name": "1123",
                        "_collection": "user",
                        "_timestamp": 1429562388858
                    }
                }
            }
        ]
        */
    });
```

**collection.unsetRefs(key, references)**
Removes the provided References from the Document with the provided key.
[View in the REST API Docs](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-references-delete-references)

Parameters:  
 ```
 - key: String - Document's unique key.
 - references: Array<String> - Names of References to be removed from the object.
 ```

```javascript
    userCollection.unsetRefs('12345', ['friend']).then(function(response) { // Returns a promise
        console.log(response);
    });
```


**collection.delete(key)**
Removes the Document with the provided key from the collection.

Parameters:  
 ```
 - key: String - Document's unique key.
 ```

```javascript
    userCollection.delete('12345').then(function(response) { // Returns a promise
        console.log(response);
        /*
        {
            "_collection": "user",
            "_id": "4fcaaab1636e48ca988ffe075ec820b5",
            "_timestamp": 1431042743261,
            "_deleted": true
        }
        */
    });
```










