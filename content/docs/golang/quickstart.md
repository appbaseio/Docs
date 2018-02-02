---
id: quickstart
title: "Golang Quick Start"
layout: docs
sectionid: quickstart
permalink: golang/quickstart.html
---

[go-appbase](https://github.com/appbaseio/go-appbase) is a universal Golang client library for working with the appbase.io database.

It can:

* Index new documents or update / delete existing ones.
* Stream updates to documents, queries or filters using ``http-streams``.

It can't:  

* Configure mappings, change analyzers, or capture snapshots. These are provided by Elasticsearch client libraries. We recommend the golang [elastic](https://olivere.github.io/elastic/) library by Olivere.

[Appbase.io - the database service](https://appbase.io) is opinionated about cluster setup and hence doesn't support the ElasticSearch devops APIs. See (rest.appbase.io)[https://rest.appbase.io] for a full reference on the supported APIs.

This is a quick start guide to whet the appetite with the possibilities of data streams.

## Creating an App

![](https://i.imgur.com/r6hWKAG.gif)

Log in to <span class="fa fa-external-link"></span> [appbase.io dashboard](https://dashboard.appbase.io/), and create a new app.

For this tutorial, we will use an app called `newstreamingapp`. The credentials for this app are `meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda`.

> Note <i class="fa fa-info-circle"></i>
>
> SCALR uses **HTTP Basic Auth**, a widely used protocol for a username:password based authentication.

## Import go-appbase

We will fetch and install the **go-appbase** lib using git.

```
    go get -t github.com/appbaseio/go-appbase
```

Adding it in the project should be a one line import syntax.

```
    import "github.com/appbaseio/go-appbase"
```


To write data or stream updates from [appbase.io](https://appbase.io), we need to first create a reference object. We do this by passing the appbase.io API URL, app name, and credentials into the ``Appbase`` constructor:

```js
    client, _ = NewClient("https://scalr.api.appbase.io", "meqRf8KJC", "65cc161a-22ad-40c5-aaaf-5c082d5dcfda", "newstreamingapp")
    err := client.Ping()
    if err != nil {
        log.Println(err)
    }
    // Import `fmt` package before printing
    fmt.Println("Client created")

```



## Storing Data

Once we have the reference object (called ``client`` in this tutorial), we can insert any JSON object into it with the ``Index()`` method.


```go
    const jsonObject = `{
	"department_name": "Books",
	"department_name_analyzed": "Books",
	"department_id": 1,
	"name": "A Fake Book on Network Routing",
	"price": 5595
	}`
```
```go
    result, err := client.Index().Type("books").Id("1").Body(jsonObject).Do()
	if err != nil {
	    log.Println(err)
	    return
	}
    fmt.Println("Data Inserted. ID: ", result.ID)
```

where ``type: 'books'`` indicate the collection (or table) inside which the data will be stored and the``id: "1"`` is an unique identifier.

> Note <span class="fa fa-info-circle"></span>
>
> If you have noticed, SCALR uses the same APIs and data modeling conventions as [ElasticSearch](https://www.elastic.co/products/elasticsearch). A **type** is equivalent to a collection in MongoDB or a table in SQL, and a **document** is similar to the document in MongoDB and equivalent to a row in SQL.

## <s>GETing</s> vs Streaming Data

Unlike typical databases that support GET operations (or Read) for fetching data and queries, Appbase.io operates on both GET and stream modes. We will first apply the GET mode to read our just inserted object.

Now that we are able to store data, let's try to get the data back from [appbase.io](https://appbase.io) with the ``get()`` method.

```js
    response, err := client.Get().Type("books").Id("1").Do()
    if err != nil {
        log.Println(err)
        return
    }
    document, err := response.Source.MarshalJSON()
    if err != nil {
        log.Println(err)
        return
    }
    fmt.Println("Document: ",string(document), ", ", "ID: ", response.Id)


Output:
    {
        "Document": {
            "department_name": "Books",
            "department_name_analyzed": "Books",
            "department_id": 1,
            "name": "A Fake Book on Network Routing",
            "price": 5595
        },
        ID: "1"
    }
```

Even though ``get()`` returns a single document data, appbase.io returns it as a stream object with the 'data' event handler.


Let's say that we are interested in subscribing to all the state changes that happen on a document. Here, we would use the ``getStream()`` method over ``get()``, which keeps returning new changes made to the document.

### Subscribing to document stream

```js
    response,_ := client.GetStream().Type(testtype).Id("1").Do()
    for {
            data, _ := response.Next()
            document, _ := data.Source.MarshalJSON()
            fmt.Println("Document: ",string(document), ", ID: ", data.Id)
            }
```

Don't be surprised if you don't see anything printed, ``getStream()`` only returns when new updates are made to the document.

### Observe the updates in realtime

Let's see live updates in action. We will modify the book price in our original ``jsonObject`` variable from 5595 to 6034 and apply ``index()`` again.

For brevity, we will not show the ``Index()`` operation here.

```js
GETSTREAM() RESPONSE
    {
        "Document": {
            "department_name": "Books",
            "department_name_analyzed": "Books",
            "department_id": 1,
            "name": "A Fake Book on Network Routing",
            "price": 6034
        },
        ID: "1"
    }
```

In the new document update, we can see the price change (5595 -> 6034) being reflected. Subsequent changes will be streamed as JSON objects.

``Note:`` Appbase always streams the final state of an object, and not the diff b/w the old state and the new state. You can compute diffs on the client side by persisting the state using a composition of (\_type, \_id) fields.


## Streaming Rich Queries

Streaming document updates are great for building messaging systems or notification feeds on individual objects. What if we were interested in continuously listening to a broader set of data changes? The ``searchStream()`` method scratches this itch perfectly.

In the example below, we will see it in action with a ``match_all`` query that returns any time a new document is added to the type 'books' or when any of the existing documents are modified.

```js
	const matchAllQuery string = `{"query":{"match_all":{}}}`
	const anotherBook string = `{"department_name": "Books", "department_name_analyzed": "Books", "department_id": 2, "name": "A Fake Book on Load balancing", "price": 7510}`
	response, err := client.SearchStream().Type(testtype).Body(matchAllQuery).Do()
	if err != nil {
		log.Println(err)
		return
	}

	_, err = client.Index().Type("books").Id("3").Body(anotherBook).Do()
	if err != nil {
		log.Println(err)
		return
	}

	data, err := response.Next()
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println("ID: ", data.Id)

	document,_ := data.Source.MarshalJSON()
	fmt.Println("Document : ", string(document))
```
```
RESPONSE WHEN NEW DATA MATCHES
{
        ID: "3"
        "Document": {
            "department_name": "Books",
            "department_name_analyzed": "Books",
            "department_id": 2,
            "name": "A Fake Book on Load balancing",
            "price": 7510
        }
}
```

## Streaming Rich Queries to an URL

This method was introduced in **v0.10.0**. ``searchStreamToURL()`` streams results directly to a URL instead of streaming back. In the example below we will see with a ``match_all`` query that sends anytime a new document is added to the type 'books' to an URL.

```js
    // Similar to NewClient, we will instiate a webhook instance with appbase.NewWebhook()
	webhook := appbase.NewWebhook()

	// Webhook instancess need to have a URL, method and body (which can be string or a JSON object)
	webhook.URL = "https://www.mockbin.org/bin/cd6461ab-468f-42f5-865f-4eed22daae95"
	webhook.Method = "POST"
	webhook.Body = "hellowebhooks"
	const matchAllQuery string = `{"query":{"match_all":{}}}`

	response, err := client.SearchStreamToURL().Type("books").Query(matchAllQuery).AddWebhook(webhook).Do()
	if err != nil {
		log.Println(err)
		return
	}

	stopSearchStream, err := response.Stop()
	if err != nil {
		log.Println(err)
		return
    }
    fmt.Println(response.Id == stopSearchStream.Id)
```

```
searchStreamToURL() response
{
    true
}
```


``Note:`` Like ``getStream()``, ``searchStream()`` subscribes to the new matches.

**v0.10.0** introduces a new method [``searchStreamToURL()``](#streaming-rich-queries-to-an-url) that streams results directly to a URL instead of streaming back.

In this tutorial, we have learnt how to index new data and stream both individual data and results of an expressive query. [Appbase.io](https://appbase.io) supports a wide range of queries.
