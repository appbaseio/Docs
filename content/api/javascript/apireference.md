---
title: 'API Reference'
meta_title: 'API Reference Javascript'
meta_description: 'Appbase-js is a universal JavaScript client library for working with the ReactiveSearch API.'
keywords:
    - apireference
    - javascript
    - appbase
    - elasticsearch
sidebar: 'api-reference'
---

[appbase-js](https://github.com/appbaseio/appbase-js) is a universal JavaScript client library for working with the ReactiveSearch API.

## INSTANTIATION

### Appbase()

Returns an Appbase object (refered to as `appbaseRef` in all the following examples) using the `url`, `app` and `username`:`password` credentials.

```js
var appbaseRef = Appbase({
	url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
	app: 'good-books-demo',
	credentials: 'c84fb24cbe08:db2a25b5-1267-404f-b8e6-cf0754953c68',
});
```

**Usage**

`Appbase(appData)`

-   **appData** `Object` <br>A JavaScript object containing the following fields and values

    -   **url** `String` <br>Elasticsearch Cluster URL _<https://appbase-demo-ansible-abxiydt-arc.searchbase.io>_
    -   **app** `String` <br>name of the index as displayed in the [dashboard](https://dashboard.reactivesearch.io)
    -   **username** `String` <br>username as displayed in the [access control dashboard](/docs/security/credentials/)<br/>
    -   **password** `String` <br>password as displayed in the [access control dashboard](/docs/security/credentials/)<br/>
    -   **credentials** `String` <br>Api key as displayed in the [access control dashboard](/docs/security/credentials/)<br/>
	- 	**enableTelemetry** `Boolean` <br>when set to false, disables telemetry. Defaults to `true`.</br> 

**Note**: Either you can use a combination of `username` & `password` or use `credentials`.

**Returns**

`Object` **appbaseRef** _Appbase reference object_ - has `index()`, `update()`, `delete()`, `bulk()`, `search()` and `get()` methods.

## WRITING DATA

### index()

Writes a JSON data object at a given `type` and `id` location, or replaces if an object already exists.

```js
appbaseRef
	.index({
		id: 'aX12c5',
		body: {
			msg: 'writing my first tweet!',
			by: 'jack',
			using: ['appbase.io', 'javascript'],
			test: true,
		},
	})
	.then(function(res) {
		console.log('successfully indexed: ', res);
	})
	.catch(function(err) {
		console.log('indexing error: ', err);
	});
```

**Usage**

`appbaseRef.index(params)`

-   **params** `Object` <br>A JavaScript object containing the type, id and the JSON data to be indexed

    -   **body** `Object` <br>Data to be indexed, a valid JSON object
    -   **id** `String` <br>Unique ID for the JSON data. `id` is auto generated if not specified

### update()

Partially updates an existing document at a given `type` and `id` location. The important difference with the index() method is that the latter replaces the existing data values wholesale, while update() only replaces the values that are specified in the `body.doc` field.

```js
appbaseRef
	.update({
		id: 'aX12c5',
		body: {
			doc: {
				msg: 'editing my first tweet!',
				by: 'ev',
			},
		},
	})
	.then(function(res) {
		console.log('successfully updated: ', res);
	})
	.catch(function(err) {
		console.log('update document error: ', err);
	});
```

**Usage**

`appbaseRef.update(params)`

-   **params** `Object` <br>A JavaScript object containing the type, id, and the partial JSON data to be updated

    -   **body.doc** `Object` <br>Partial doc JSON to be updated (all the JSON data can only reside under the body.doc field)
    -   **id** `String` <br>Unique ID of the JSON document to be updated. `id` here is mandatory and should match an existing object.

### delete()

Delete a JSON data object by `id`.

```js
appbaseRef
	.delete({
		id: 'aX12c5',
	})
	.then(function(res) {
		console.log('successfully deleted: ', res);
	})
	.catch(function(err) {
		console.log('deletion error: ', err);
	});
```

**Usage**

`appbaseRef.delete(params)`

-   **params** `Object` <br>A JavaScript object containing the `type` and `id` of the JSON object to be deleted

    -   **id** `String` <br>Unique ID for the JSON data

### bulk()

Apply many index / update / delete operations in bulk.

```js
appbaseRef
	.bulk({
		body: [
			// action#1 description
			{ index: { _id: 2 } },
			// the JSON data to index
			{
				msg: 'writing my second tweet!',
				by: 'Ev',
				using: ['appbase.io', 'javascript'],
				test: true,
			},
			// action#2 description
			{ update: { _id: 2 } },
			// JSON data to update under the `doc` key, this only modifies the mentioned fields
			{
				doc: {
					msg: 'editing my second tweet!',
				},
			},
			// action#2 description
			{ delete: { _id: 2 } },
			// deletion doesn't any further input
		],
	})
	.then(function(res) {
		console.log('successful bulk: ', res);
	})
	.catch(function(err) {
		console.log('bulk failed: ', err);
	});
```

**Usage**

`appbaseRef.bulk(params)`

-   **params** `Object` <br>A JavaScript object containing the `body` and optionally a default `type` to be used for actions

    -   **body** `Array` <br>A JavaScript array of actions to be performed written as a sequence of action#1, data#1, action#2, data#2, ... action#n, data#n

## GETTING DATA

### get()

Get the JSON document from a particular `type` and `id`.

```js
appbaseRef
	.get({
		id: 'aX12c5',
	})
	.then(function(res) {
		console.log('The document data: ', res);
	})
	.catch(function(err) {
		console.log('get() method failed with: ', err);
	});
```

**Usage**

`appbaseRef.get(params)`

-   **params** `Object` <br>A JavaScript object containing the `type` and `id` of the document to retrieve.

Returns the document at the given `type` and `id`.

### getMappings()

Get the mapping scheme of an app. You can read more about mappings [over here](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/mapping.html#mapping).

```js
appbaseRef
	.getMappings()
	.then(function(res) {
		console.log('Mapping scheme is: ', res);
	})
	.catch(function(err) {
		console.log('getMappings() failed: ', err);
	});
```

**Usage**

`appbaseRef.getMappings()`

Returns the current app's mapping scheme as an object.

### search()

Search for matching documents in a type. It's a convenience method for Elasticsearch's `/_search` endpoint. 

```js
appbaseRef
	.search({
		body: {
			query: {
				match_all: {},
			},
		},
	})
	.then(function(res) {
		console.log('query result: ', res);
	})
	.catch(function(err) {
		console.log('search error: ', err);
	});
```

**Usage**

`appbaseRef.search(params)`

-   **params** `Object` <br>A JavaScript object containing the query `type` and `body`.

    -   **body** `Object` <br>A JSON object specifying a valid query in the [Elasticsearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) format

**Returns**
Promise.

### msearch()

Multi Search to allow execution of several search requests with same API. It's a convenience method for Elasticsearch's `/_msearch` endpoint.

```js
appbaseRef
	.msearch({
		body: [{}, { query: { match_all: {} } }, {}, { query: { match: { _id: 1 } } }],
	})
	.then(function(res) {
		console.log('query result: ', res);
	})
	.catch(function(err) {
		console.log('search error: ', err);
	});
```

**Usage**

`appbaseRef.msearch(params)`

-   **params** `Object` <br>A JavaScript object containing the query `type` and `body`.

    -   **body** `Array` <br>An array specifying search requests in header followed by body order for each request.

**Returns**
Promise.

### reactiveSearch()

ReactiveSearch method allows you to execute the search requests securely with the help of newly launched `ReactiveSearch` API. You can read about `ReactiveSearch` API [here](/docs/search/reactivesearch-api/).

```js
appbaseRef
	.reactiveSearch(
		[
			{
				id: 'book_search',
				dataField: ['original_title'],
				size: 10,
				value: 'harry',
			},
		],
		{
			userId: 'jon@appbase.io',
		},
	)
	.then(function(res) {
		console.log('query result: ', res);
	})
	.catch(function(err) {
		console.log('search error: ', err);
	});
```

**Usage**

`appbaseRef.reactiveSearch(params)`

-   **params** It accepts two params:
    -   `query`, an array of objects where each object represents a ReactiveSearch query. Read more at [here](/docs/search/reactivesearch-api/reference/#query-properties)
    -   `settings`, an object consisting of the properties to control your search experience. Read more at [here](/docs/search/reactivesearch-api/reference/#settings-properties)

**Returns**
Promise.

**Usage to fetch suggestions** 
```js
appbaseRef
  .reactiveSearch(
    [
      {
        id: "suggestions-demo",
        type: "suggestion",
        enableRecentSuggestions: true,
        enablePopularSuggestions: true,
        recentSuggestionsConfig: {
          size: 5,
          min_hits: 2,
          min_char: 4,
        },
        popularSuggestionsConfig: {
          size: 5,
          showGlobal: true,
        },
        size: 5,
        value: "cable",
      },
    ],
    {
      userId: "jon@appbase.io",
      recordAnalytics: true,
    }
  )
  .then(function (res) {
    console.log("res", res);
  })
  .catch(function (err) {
    console.log("suggestions error: ", err);
  });
```
> Note
> Recent suggestions work when `value` is empty.
