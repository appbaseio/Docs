---
title: 'Stored Queries'
meta_title: 'Stored Queries'
meta_description: 'Stored Queries prevent script injections by only passing the parameters to your search query rather than passing the query itself over a network request.'
keywords:
    - security
    - appbaseio
    - reactivesearch
    - stored-queries
    - opensearch
    - elasticesearch
sidebar: 'docs'
---

**Note:** This guide applies when using ReactiveSearch with Elasticsearch or OpenSearch only.

Stored Queries prevent script injections by only passing the parameters to your search query rather than passing the query itself over a network request.

![](https://imgur.com/0MeCEyb.png)

Since Elasticsearch's query DSL is quite powerful, exposing it over the network can lead to:
- **Denial of Service attacks:** where anyone can run an expensive query or aggregation against your cluster
- **Unintended access of data:** Exposing the entire DSL can allow an actor to access your search data in unintended ways
- **Expose your business logic:** An actor can access your search query request to see the details of your search request.

Using stored queries instead and disabling use of direct DSL queries avoids all of these scenarios.

## How Stored Queries Work

Stored queries allow parameterizing the query DSL with template variables `{{variable}}` that can be injected in the DSL (can be primitives like string, or a JSON object or JSON array as well).

Once a stored query is created, it creates a REST API endpoint that can be invoked by passing these parameters but not the DSL itself. In effect, stored queries prevent script injection by encapsulating the query logic from the environment it is invoked from (typically web and mobile apps).

While stored queries come with a dashboard UI, one can also use them directly using the REST APIs over [here](https://api.reactivesearch.io/#e7885812-3137-46bc-ae0e-397d04e9d44d).

![](https://i.imgur.com/xqBnHfM.png)

> **Note:** Stored query is a feature available for all appbase.io users. 

### Create or edit Stored Query

Let's start with creating a stored query. To create a stored query, you need to define the `query` key in the elasticsearch query DSL format. It can contain the entire Elasticsearch Query DSL (query, aggs, sort, source include/exclude) and supports parameterization over it.

![](https://i.imgur.com/NS3LJJU.png)

```json
{
    "query": { // the top-level query key can contain the entire query DSL
        "_source": "{{fieldsToReturn}}",
        "query": {
            "terms": {
                "vendor.keyword": "{{brands}}"
            }
        }
    },
    "params": { // params help test rendering and execution of query, however, they're optional
        "brands": [
            "ADIDAS",
            "Nike"
        ],
        "fieldsToReturn": [
            "title",
            "vendor",
            "price"
        ]
    },
    "index": "commerce-app" // An index or an index pattern is required when defining a stored query and is validated against at the time of invocation.
}
```


#### Render Query

You can render a query in a response with given parameters using the `Render` option. The above query would get rendered as:

```json
{
    "_source": [
        "title",
        "vendor",
        "price"
    ],
    "query": {
        "terms": {
            "vendor.keyword": [
                "ADIDAS",
                "Nike"
            ]
        }
    }
}
```

Rendering lets you test if the variable substitution is happening as intended.

#### Execute Query

You can also execute the stored query, i.e. test the response similar to how it will perform when invoked at a later point. The above query will return a repsonse as follows:

```json
{
    "took": 94,
    "timed_out": false,
    "_shards": {
        "total": 3,
        "successful": 3,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 4,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "commerce-app",
                "_type": "_doc",
                "_id": "5789372219548",
                "_score": 1,
                "_source": {
                    "vendor": "ADIDAS",
                    "title": "ADIDAS | KID'S STAN SMITH"
                }
            },
            {
                "_index": "commerce-app",
                "_type": "_doc",
                "_id": "5789370941596",
                "_score": 1,
                "_source": {
                    "vendor": "ADIDAS",
                    "title": "ADIDAS | SUPERSTAR 80S"
                }
            },
            {
                "_index": "commerce-app",
                "_type": "_doc",
                "_id": "5789372579996",
                "_score": 1,
                "_source": {
                    "vendor": "ADIDAS",
                    "title": "ADIDAS | CLASSIC BACKPACK"
                }
            },
            {
                "_index": "commerce-app",
                "_type": "_doc",
                "_id": "5789372678300",
                "_score": 1,
                "_source": {
                    "vendor": "ADIDAS",
                    "title": "ADIDAS | CLASSIC BACKPACK | LEGEND INK MULTICOLOUR"
                }
            }
        ]
    }
}
```

Executing a query with some defined params can help test for correctness.

#### Review and Save

Saving a query generates a REST API endpoint for the stored query. The dashboard provides an overview of the changes you've made prior to saving a query, which can be helpful if you're editing a live query.

![](https://imgur.com/wUSBCbz.png)

### Invoking A Stored Query

From the stored queries dashboard view, click on `Copy as cURL` button to see the query's URL and request body.

![](https://i.imgur.com/lMYjST7.png)


You can use `Copy as CURL` option to copy the request in your clipboard.<br/>

```bash
curl -X POST https://your-cluster.searchbase.io/_storedquery/search-by-brand-query/execute -H 'Content-Type: application/json' -H 'Authorization: Basic ********************' -d'
{
	"params": {
		"brands": [
			"ADIDAS",
			"Nike"
		],
		"fieldsToReturn": [
			"title",
			"vendor",
			"price"
		]
	}
}
'
```

[Here is the REST API reference](https://api.reactivesearch.io/#55a3e150-34d4-4a43-bdd3-01fb6d424654) for the same.

### Access Control For Stored Queries

Once you're using stored queries, we recommend you to disable allowing of direct DSL queries. 

You can only allow `Stored Queries` category to allow all Stored query endpoints to work. However, a typical use-case for a user is to also have a search related category enabled. In this case, your API credential should have `ReactiveSearch` and `Stored Queries` categories enabled, and you should restrict the ReactiveSearch API usage to not allow direct DSL queries:

![](https://i.imgur.com/U7XPrpT.png)

This will prevent all forms of script injections to your search API.

### Using Stored Queries with ReactiveSearch API

Here is an example of how you can use stored query with ReactiveSearch API. You can pass it as part of the `defaultQuery` (or `customQuery`) property.

<iframe src=https://play.reactivesearch.io/embed/IdZBCNUJv328zU6tW8ML     style="width:100%; height:100%; border:0;  overflow:hidden;min-height: 400px;"     title=rs-playground-zv7NAz7Y472KCBvfKcYy   ></iframe>


### Using Stored Queries with ReactiveSearch

ReactiveSearch and Searchbox FE libraries support passing `defaultQuery` and `customQuery` properties as part of each component. You can pass a stored query instead of passing a query DSL.

```js
defaultQuery={() => ({
	query: {
		term: {
			"author.keyword": "J. K. Rowling"
		}
	}
})}
```

Once you've created a stored query for the above in the appbase.io dashboard or via REST API, you can replace the usage of the above query as:

```js
defaultQuery={() => ({
	id: "good-books-ds",
	params: {
		author: "J. K. Rowling"
	}
})}
```

Here's a codesandbox demo showing the same:

<iframe src="https://codesandbox.io/embed/condescending-jasper-q0mlz?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="condescending-jasper-q0mlz"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
