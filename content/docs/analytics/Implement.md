---
title: 'Implement Analytics'
meta_title: 'Implementing Appbase analytics - Core Concepts'
meta_description: 'A short guide on how to setup analytics and track search terms and queries.'
keywords:
    - concepts
    - appbase
    - analytics
    - implement
sidebar: 'docs'
---

On this page you will learn about how to implement Appbase.io analytics in your application.

## Implement
Analytics is one of the core features of Appbase.io stack, all the search libraries support it well and provide an easy to use API. It is also possible to record analytics with REST API that gives you the freedom to record search and click analytics from any platform.

### Appbase.io UI Libraries
 If you're already consuming any of the below libraries to build your search UI then you don't need any extra setup. Most of the libraries have a prop named `analytics` which can be set to `true` to enable the recording of search analytics.

| Usage                |  Variant    | Docs                                               |
| -------------------- | ----------  | -----------------------------------------------------------|
| **`ReactiveSearch`** | `React`     | [Learn](/docs/reactivesearch/v3/advanced/analytics)    |
| **`ReactiveSearch`** | `Vue`       | [Learn](/docs/reactivesearch/vue/advanced/analytics/)  |
| **`SearchBox`**      | `VanillaJS` | [Learn](/docs/reactivesearch/searchbox/api/)  |
| **`SearchBox`**      | `React`     | [Learn](/docs/reactivesearch/react-searchbox/apireference/)  |
| **`SearchBox`**      | `Vue`       | [Learn](/docs/reactivesearch/vue-searchbox/apireference/)  |
| **`SearchBase`**     | `VanillaJS` | [Learn](/docs/reactivesearch/searchbase/overview/apireference/)  |

### With your JS
If you're not using any of the above search UI libraries or need more freedom to record clicks and conversions from any place in your application then it's best to use [analytics.js](https://github.com/appbaseio/analytics). AnalyticsJS can be used to integrate Appbase.io analytics with any javascript-based solution(client or server), it covers all aspects of Appbase.io analytics from recording a search event to recording custom events and clicks. You can read more about it [here](https://github.com/appbaseio/analytics#api-reference).

### With REST API

Analytics REST APIs allow you to record search and click analytics from any platform of your choice.

There are three types of analytics:

1. Search Analytics,
2. Click Analytics and
3. Conversion Analytics

#### Clusters Plan or Arc
The following APIs are only available for the users who are using the Appbase.io `cluster` or `Arc`.

<b>Search Analytics</b>

Use [PUT /:index/_analytics/search](https://arc-api.appbase.io/?version=latest#63470390-374f-447f-b854-70b5ab0fe92f) endpoint to record a search event.

```bash
curl --location --request PUT 'http://{{USERNAME}}:{{PASSWORD}}@{{CLUSTER_URL}}/{{INDEX}}/_analytics/search' \
--header 'Content-Type: application/json' \
--data-raw '{
	"query": "iphone",
	"user_id": "jon_snow",
	"event_data": {
		"platform": "mac"
	},
	"filters": {
		"year": "2018"
	},
	"hits": [{
	    "id": "12345678",
	    "source": {
	    	"title": "iphoneX"
	    },
	    "type": "_doc"
	}]
}'
```

<b>Click Analytics</b>

Use [PUT /:index/_analytics/click](https://arc-api.appbase.io/?version=latest#df88a85a-c31d-4376-b22b-485a9d1021b8) endpoint to record a click event.

```bash
curl --location --request PUT 'http://{{USERNAME}}:{{PASSWORD}}@{{CLUSTER_URL}}/{{INDEX}}/_analytics/click' \
--header 'Content-Type: application/json' \
--data-raw '{
    "query_id": "89c14471-2df5-4414-8b17-33479ef71bc0",
    "click_type": "suggestion",
    "click_on": {
        "iphone_1234": 2
    },
    "user_id": "kuldeep-2",
    "event_data": {
        "user_segment": "paid"
    }
}'
```

<b>Conversion Analytics</b>

Use [PUT /:index/_analytics/conversion](https://arc-api.appbase.io/?version=latest#f8ee22c6-ba15-4b9e-83d8-34cc2953f245) endpoint to record a conversion event.


```bash
curl --location --request PUT 'http://{{USERNAME}}:{{PASSWORD}}@{{CLUSTER_URL}}/{{INDEX}}/_analytics/conversion' \
--header 'Content-Type: application/json' \
--data-raw '{
    "query_id": "e3840c97-dd30-4696-8781-f355f40dd0f4",
    "conversion_on": [
        "iphone_1234"
    ],
    "event_data": {
        "user_segment_2": "free"
    }
}'
```

#### Appbase.io

If you intend to build your own search UI, here's how you can implement analytics on your own for Appbase.io hosted `apps`.

<b>Search Analytics</b>

When using the REST API to make a search query, you can pass along the following headers:

`X-Search-Query` -> The value here represents the search query term (the input value in DataSearch, CategorySearch if you are using ReactiveSearch).

Whenever an `X-Search-Query` header is passed, the API returns a response header for the search Id called as `X-Search-Id`. This can be passed further as a request header to associate other search attributes (filters, clicks) with the same original query. Think of `X-Search-Id` as a search session.

`X-Search-Id` -> An existing Id (aka search session) on which to apply the search query. This is returned as a response header by the backend for each search query.

`X-Search-Filters` -> This header should contain the value in the format: "key1=value1,key2=value2,..." where the key represents the filter component and value represents the selected value. (If the same filter has multiple values selected, they should be passed as "key1=value1,key1=value2,...").


<b>Click/Conversion Analytics</b>

There is a [POST /:app/\_analytics](https://rest.appbase.io/#fe48f095-2122-bacb-6574-d081448dd0f9) endpoint which can be used to record click analytics.

For example:

```bash
curl --location --request POST "https://scalr.api.appbase.io/{APP_NAME}/_analytics" \
    --header "X-Search-Id: replace-with-real-search-id" \
    --header "X-Search-Click: true" \
    --header "X-Search-ClickPosition: 5" \
    --header "X-Search-Conversion: true" \
    --header "Authorization: replace-with-basic-auth-credentials"
```

The above endpoints accept the following values as headers:

`X-Search-Click` -> value is of type true / false,

`X-Search-ClickPosition` -> value is of type Number (e.g. 1, 2 denoting the result item being clicked)

`X-Search-Conversion` -> value is of type true / false.

## Advanced Analytics

### How to implement custom events
Custom events allow you to build your own analytics on top of the appbase.io analytics. For example, you might be interested to know the platform used by a user to make the search request. There can be plenty of scenarios the choice is yours that how you want to use it.

All the front-end libs and AnalyticsJS have the support for custom events but if you want to implement it your own then you can follow the below methods:

<b>Using `X-Search-CustomEvent` header</b>

The `X-Search-CustomEvent` header allows you to define the custom events for your search requests.

`X-Search-CustomEvent` -> It accepts the value in the following format: "key1=value1,key2=value2,..." where key represents the event name and value represents the event value. For e.g `X-Search-CustomEvent="platform=android"`

<b>REST API</b>

The `X-Search-CustomEvent` header only allows you to record the custom events with search analytics, if you want to record custom events with `clicks` and `conversion` then you have to use the [REST API](#).

> Note:
>
> The custom events feature is only available for Appbase.io `clusters` or `Arc`.



### How to enable / disable Empty Query
By default, the ReactiveSearch shows you the default UI even if the search hasn't been performed. Technically it calls the `match_all` query which can be considered as the empty query. By default we record the analytics for empty queries too, you can find it out in the Appbase.io dashboard with the `<empty_query>` key.

You can disable this behavior in `ReactiveSearch` by defining the `analyticsConfig` prop in the `ReactiveBase` and set the `emptyQuery` as `false`. 
If you're not using the `ReactiveSearch` then just don't send the `X-Search-Query` header while performing a `match_all` request.

## How An Analytics Session Works
An analytics session is driven by the `X-Search-Query` header or `query` field if using the REST API. It's the user's responsibility to define the search query to trigger an analytics session. One analytics session can be considered as one search count.

Don't worry `ReactiveSearch` handles it well, you just need to set the `analytics` prop as `true` in the `ReactiveBase` component. [Read more about how to configure analytics in ReactiveSearch](/docs/reactivesearch/v3/advanced/analytics).

### How we count searches
- When a user types something equals to `b→bo→boo→book→boo`, we understand the context and instead of creating the different search sessions we count it as one search with key as `book`.
- A search context is only valid for a maximum of the `30s` i.e `b→bo→boo...30 seconds...->book` will be recorded as two different searches with keys as `boo` & `book`.