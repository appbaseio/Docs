---
id: getting-started
title: "REST API Quick Start"
layout: docs
sectionid: getting-started
permalink: rest/getting-started.html
---

This is a quick start guide to working with the [appbase.io REST API](https://rest.appbase.io).

## Create an App

<a href="https://imgflip.com/gif/opgl9"><img src="https://i.imgur.com/r6hWKAG.gif"/></a>  
Log in to <span class="fa fa-external-link"></span> [Appbase Dashboard](https://appbase.io/scalr/), and create a new app.

For this tutorial, we will use an app called `newstreamingapp`. The credentials for this app are `meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda`.

> Note <i class="fa fa-info-circle"></i>
>
> SCALR uses *HTTP Basic Auth*, a widely used protocol for simple username/password authentication. This is similar to how GitHub's authentication works over ``https``, just imagine every repository (app in our context) having it's unique &lt;username>:&lt;password> combination, found under the **Credentials** tab of the dashboard.

> The full REST API reference is available at https://rest.appbase.io.

## Setup

Here's an example authenticated ``GET`` request. We will set the app name, username and password as bash variables and reuse them in the requests.

```js
SET BASH VARIABLES
credentials="meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda"
app="newstreamingapp"

curl https://$credentials@scalr.api.appbase.io/$app

RESPONSE
{
    status: 200,
    message: "You have reached /newstreamingapp/ and are all set to make API requests"
}
```

## Storing Data

Let's insert a JSON object. We create a **type** ``books`` inside our app and add a JSON document ``1`` with a PUT request.

```js
curl -XPUT https://$credentials@scalr.api.appbase.io/$app/books/1 --data-binary '{  
   "department_name":"Books",
   "department_name_analyzed":"Books",
   "department_id":1,
   "name":"A Fake Book on Network Routing",
   "price":5595
}'
```

> Note <i class="fa fa-info-circle"></i>
>
> If you have noticed, SCALR uses the same APIs as [ElasticSearch](https://www.elastic.co/products/elasticsearch). A **type** is equivalent to a *collection in MongoDB* or a *table in SQL*, and a document is similar to the document in MongoDB and equivalent to a *row in SQL*.

## <s>GETing</s> err, Streaming Data

Getting live updates to a document is as simple as suffixing ``?stream=true`` to a GET request. It's so awesome that we recommend using this as the default way to GET things.

```js
curl -N https://$credentials@scalr.api.appbase.io/$app/books/1?stream=true

INITIAL RESPONSE
{
  "_index": "app`248",
  "_type": "books",
  "_id": "1",
  "_version": 5,
  "found": true,
  "_source": {
    "department_name": "Books",
    "department_name_analyzed": "Books",
    "department_id": 1,
    "name": "A Fake Book on Network Routing",
    "price": 5595
  }
}
```

Appbase.io keeps an open connection so that every time there is an update in the ``/$app/books/1`` document, it is streamed via the connection.

### Modify the Document

Let's modify the book price to 6034.

```js
curl -XPUT https://$credentials@scalr.api.appbase.io/$app/books/1 --data-binary '{  
   "price":6034,
   "department_name":"Books",
   "department_name_analyzed":"Books",
   "department_id":1,
   "name":"A Fake Book on Network Routing"
}'
```

### Observe the Streams

```js
curl -N https://$credentials@scalr.api.appbase.io/$app/books/1?stream=true

RESPONSE AFTER 2.a
{
  "_index": "app`248",
  "_type": "books",
  "_id": "1",
  "_version": 5,
  "found": true,
  "_source": {
    "department_name": "Books",
    "department_name_analyzed": "Books",
    "department_id": 1,
    "name": "A Fake Book on Network Routing",
    "price": 5595
  }
}
{
  "_type": "books",
  "_id": "1",
  "_source": {
    "department_id": 1,
    "department_name": "Books",
    "department_name_analyzed": "Books",
    "name": "A Fake Book on Network Routing",
    "price": 6034
  }
}
```

In the new document update, we can see the price change (5595 -> 6034) being reflected. Subsequent changes will be streamed to the resonse as raw JSON objects. As we see, there are no delimiters between between two consecutive JSON responses.

> For every ``?stream=true`` request, Appbase.io keeps an open connection up to a max of 6 hrs.

## Streaming Search

Streaming document updates seems straightforward, can we apply rich filters and queries to our streams? Yes, we can. We can specify any ElasticSearch Query DSL request, and get responses via streams.

We will see it here with a ``match_all`` query request.

```js
curl -N -XPOST https://$credentials@scalr.api.appbase.io/$app/books/_search?stream=true --data-binary '{"query": {"match_all":{}}}'

INITIAL RESPONSE
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 1,
    "hits": [
      {
        "_index": "app`248",
        "_type": "books",
        "_id": "1",
        "_score": 1,
        "_source": {
          "price": 6034,
          "department_name": "Books",
          "department_name_analyzed": "Books",
          "department_id": 1,
          "name": "A Fake Book on Network Routing"
        }
      }
    ]
  }
}
```

# REST API Reference

The full API reference with example snippets in cURL, Ruby, Python, Node, PHP, Go, jQuery can be browsed at [rest.appbase.io](https://rest.appbase.io).
