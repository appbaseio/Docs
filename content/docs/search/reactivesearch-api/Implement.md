---
title: 'Implement ReactiveSearch API'
meta_title: 'ReactiveSearch API - Implementation guide'
meta_description: 'ReactiveSearch API - Implementation guide. Learn more about the API concepts and see examples of each type of API.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
sidebar: 'docs'
---

## Concepts

The `ReactiveSearch` API is derived from the `ReactiveSearch` library. If you're already using `ReactiveSearch` in your projects, then you will feel right at home because API maintains a 100% prop parity with the library. Even if you haven't worked with `ReactiveSearch` before, you should be able to follow along as we'll cover all aspects of `ReactiveSearch API` in this document.

### Query Identifier(ID)

Every query made via the `RS API` must have an `id` property defined. `id` is a unique identifier for each query. The `id` property is also useful to access the response for a particular query if multiple queries are defined within a single ReactiveSearch API call. The id can be referenced in the `react` property of any other queries that wish to also apply this query. We'll talk more about the usage of `react` property later and will explain how to reference an `id` in `react` property to combine multiple queries.

### Type of Queries

`ReactiveSearch API` has four types of queries, each serving a different use-case. You can decide which query has to be used by defining the `type` property in the query object.

#### Search (default)

Search queries allow you to find documents for which the `value` matches in any of the fields specified in its `dataField` property. Search queries can take into account the text analysis process, partial words, as-you-type queries, can handle typo tolerance, offer response highlighting and search on synonyms. All of these are configurable by the search query's properties.

Example uses:

- Searching for a rental listing by name or description field.
- Creating an e-commerce search box for finding products by their listing properties.

**Example**

The below query returns all the books for which `original_title` & `original_description` fields match with the value as `harry`.

```js
{
    id: "book_search",
    dataField: ["original_title.keyword", "original_description.keyword"],
    value: "harry"
}
```


#### Term

Term queries can be used to get the documents that contain an `exact` term in a provided `dataField`. You can use the term query to find documents based on a precise value such as a price, a product ID, or a username. Term queries can be used to `filter` the search results with the help of [react](/docs/search/reactivesearch-api/APIReference#react) property. For example, display the books by particular `authors` in a book search app. 

Term queries can also be used to get the `aggregated data` for a particular `dataField`. For example, to display the list of `authors` for a book store app.

Example uses:

- Select category items from a list of categories on an e-commerce website.
- Selecting airlines to fly by in a flight booking experience.

**Example**

The below query returns all the books for which `authors` field value is `J.K. Rowling`. Please note that the `term` query has been used as a filter to the `search` query so we set `execute` as `false` i.e apply the filter without executing the query.

```js
[
    {
        id: "book_search",
        dataField: ["authors.keyword"],
        react: [{
            and: "author_search"
        }]
    },
    {
        id: "author_search",
        type: "term",
        dataField: ["authors.keyword"],
        value: "J.K. Rowling",
        execute: false
    }
]
```

#### Range
Range queries are useful when you want to get the documents that contain terms within a provided range.

Example uses:

- Filtering products from a price range in an e-commerce shopping experience.
- Filtering flights from a range of departure and arrival times.

**Example**

The below query returns all the books for which the `price` field has a value between `200` to `4200`.

```js
    {
        id: "book_search",
        type: "range",
        dataField: ["price"],
        value: {
            start: 200,
            end: 4200
        },
    }
```

#### Geo
Geo queries allow you to filter the documents that include only hits that exist within a specific distance from a geo point.

Example uses:

- Finding restaurants within walking distance from your location.
- Discovering things to do near a landmark.

**Example**

The below query returns all the restaurants within the `50` miles to the selected location by comparing the `location` field.

```js
    {
        id: "restaurant_search",
        type: "geo",
        dataField: ["location"],
        value: {
            "distance": 50,
            "unit": "mi",
            "location": "22.3184816, 73.17065699999999"
        }
    }
```

### How to define a query?
 Let's have a look at the simple search query with `ReactiveSearch` API to retrieve all the results for which the `title` field matches with `iphone`.

```js
{
    query: [{
        id: "phone-search", // Unique identifier for the query
        dataField: ["title"], // data field in the database
        value: "iphone", // search term
        size: 10 // sizes of the documents to retrieve
    }]
}
```

In the above example, you can observe that instead of defining the query DSL we just need to define some properties and rest of things will be handled by Appbase. The above query will return `10` documents for which the `title` fields match with the search term `iphone`. The response will have the following structure:

```js
{
    "phone-search": {
        "hits": {
            "hits": [
                {
                    ....
                },
                {
                    ....
                },
                ....
            ]
            "max_score": 6.967817,
            "total": {
                "relation": "eq",
                "value": 25
            }
        },
        "status": 200,
        "timed_out": false,
        "took": 362
    },
    "settings": { // reserved key
        "took": 369
    }
}
```

### How do multiple queries work?
It's simple to define multiple queries with `RS API`, check the below example which executes two different queries in a single `ReactiveSearch` query similar to the `multi-search` request of `Elasticsearch`. The first query is a `search` query and the second query is a `term` query to return the aggregated results for the `launched_year` field.

```js
{
    query: [
        {
            id: "phone-search",
            dataField: ["title"],
            value: "iphone", // search term
            size: 10 // size of the documents to retrieve
        },
        {
            id: "launch-year",
            type: "term", 
            dataField: ["launched_year"],
            size: 10 // size of the aggregations to retrieve
        }
    ]
}
```

The above query will return the response in the following shape:

```js
{
    "phone-search": {
        "hits": {
            "hits": [
                {
                    ....
                },
                {
                    ....
                },
                ....
            ]
            "max_score": 6.967817,
            "total": {
                "relation": "eq",
                "value": 25
            }
        },
        "status": 200,
        "timed_out": false,
        "took": 362
    },
    "launch-year": {
        "aggregations": {
            "launched_year": {
                ...
            }
        },
        "hits": {
            "hits": [],
            "max_score": null,
            "total": {
                "relation": "eq",
                "value": 10
            }
        },
        "status": 200,
        "timed_out": false,
        "took": 56
    },
    "settings": { // reserved key
        "took": 369
    }
}
```

### How to combine multiple queries?
Earlier we have discussed an example to define the multiple queries in `RS API`, what if we want to combine two queries together, for example, consider a scenario where we want to get the documents for which the `title` field matches with `iphone` and `launched_year` is `2020`. We can implement this query with the help of `react` property. For example:

```js
{
    query: [
        {
            id: "phone-search",
            dataField: ["title"],
            value: "iphone",
            size: 10, 
            react: { // `react` property defines a dependency on the `launch-year` query
                and: "launch-year"
            }
        },
        {
            id: "launch-year",
            type: "term", 
            dataField: ["launched_year"],
            size: 10,
            execute: false // Set `execute` property to false to prevent un-necessary execution of the query
        }
    ]
}
```

### Custom and Default Queries
Although `RS API` covers most of the common use-cases for search but sometimes it may require that you want to customize the query. Query customization is possible with the help of `customQuery` and `defaultQuery` properties. You can read more about it in the ReactiveSearch [API Reference](/docs/search/reactivesearch-api/APIReference).


## How to implement?

### REST API

[POST /:index/_reactivesearch.v3](https://arc-api.appbase.io/?version=latest#1aef5770-2211-4607-b1f1-176de3e129ef) endpoint allows you to execute the `ReactiveSearch` queries from any platform of your choice. 

For example: 

```bash
curl --location --request POST 'http://{{user}}:{{password}}@{{host}}/{{index}}/_reactivesearch.v3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "query": [
        {
            "id": "book_search",
            "dataField": [
                "original_title"
            ],
            "value": "harry",
            "size": 10
        }
    ]
}'
```
### Frontend libraries

We have a set of frontend libraries for different platforms that can be used directly to consume the `ReactiveSearch API`. Most of the libraries have a property called `enableAppbase` which can be set to `true` to use the `RS API` instead of `Elasticsearch API`.

Here is a list of all front-end libraries available for different platforms:

| Library                |  Variant    | Docs                                               |
| -------------------- | ----------  | -----------------------------------------------------------|
| **`ReactiveSearch`** | `React`     | [Learn More](/docs/reactivesearch/v3/overview/quickstart/)    |
| **`ReactiveSearch`** | `Vue`       | [Learn More](/docs/reactivesearch/vue/overview/QuickStart/)  |
| **`SearchBox`**      | `VanillaJS` | [Learn More](/docs/reactivesearch/searchbox/api/)  |
| **`SearchBox`**      | `React`     | [Learn More](/docs/reactivesearch/react-searchbox/apireference/)  |
| **`SearchBox`**      | `Vue`       | [Learn More](/docs/reactivesearch/vue-searchbox/apireference/)  |
| **`SearchBase`**     | `VanillaJS` | [Learn More](/docs/reactivesearch/searchbase/overview/apireference/)  |
