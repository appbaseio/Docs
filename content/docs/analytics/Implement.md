---
title: 'Implement Analytics'
meta_title: 'Implementing Appbase.io analytics - Core Concepts'
meta_description: 'A short guide on how to setup analytics and track search terms and queries.'
keywords:
    - concepts
    - appbase
    - analytics
    - implement
sidebar: 'docs'
---

In this page, you will learn about how to implement Appbase.io analytics for your stack and use-case.

### Prerequite: Deploying Appbase.io

Appbase.io Analytics requires a deployment of appbase.io alongside your ElasticSearch cluster. You can deploy appbase.io as:
1. A hosted offering: (Recommended) for a complete end-to-end managed experience. [Learn More](https://appbase.io/clusters/)
2. Deploy as a Docker image: Run anywhere, including with your Kubernetes ElasticSearch cluster. [Learn More](https://docs.appbase.io/docs/hosting/BYOC/#using-docker)
3. Amazon Machine Image (AMI): Deploy within your VPC alongside AWS ElasticSearch. [Learn More](https://docs.appbase.io/docs/hosting/BYOC/#using-ami)

![Diagram showing how appbase.io works with ElasticSearch](/images/byoc.png)


## How To Track Analytics

Appbase.io offers turnkey search analytics for ElasticSearch. No matter how your search is implemented today, it's easy to integrate analytics in a matter of minutes.


### With Appbase.io UI Libraries

 If you're already consuming any of the below libraries to build your search UI, then you don't need any additional setup. These libraries support a prop called `analytics` which when set to `true` enables the recording of search analytics. They also come with additional configs to track custom events. You can go to the specific library that you're using to learn more.

| Library                |  Variant    | Docs                                               |
| -------------------- | ----------  | -----------------------------------------------------------|
| **`ReactiveSearch`** | `React`     | [Learn More](/docs/reactivesearch/v3/advanced/analytics)    |
| **`ReactiveSearch`** | `Vue`       | [Learn More](/docs/reactivesearch/vue/advanced/analytics/)  |
| **`SearchBox`**      | `VanillaJS` | [Learn More](/docs/reactivesearch/searchbox/api/)  |
| **`SearchBox`**      | `React`     | [Learn More](/docs/reactivesearch/react-searchbox/apireference/)  |
| **`SearchBox`**      | `Vue`       | [Learn More](/docs/reactivesearch/vue-searchbox/apireference/)  |
| **`SearchBase`**     | `VanillaJS` | [Learn More](/docs/reactivesearch/searchbase/overview/apireference/)  |

### With any JavaScript
If you're not using any of the above search UI libraries or need more freedom to record clicks and conversions from any place in your application, then we recommend using [analytics.js](https://github.com/appbaseio/analytics). Analytics.js can be used to integrate Appbase.io analytics with any JavaScript based solution (client or server) and it covers all aspects of Appbase.io analytics from recording a search event to recording custom events and clicks. You can read more about it [here](https://github.com/appbaseio/analytics.js#api-reference).

### With REST API

Analytics REST APIs allow you to record search and click analytics from any platform (mobile, server-side) of your choice.

There are three types of analytics:

1. Search Analytics,
2. Click Analytics and
3. Conversion Analytics


<b>1. Search Analytics</b>

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

API reference over [here](https://arc-api.appbase.io/?version=latest#63470390-374f-447f-b854-70b5ab0fe92f).

<b>2. Click Analytics</b>

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

API reference over [here](https://arc-api.appbase.io/?version=latest#df88a85a-c31d-4376-b22b-485a9d1021b8).

<b>3. Conversion Analytics</b>

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

API reference over [here](https://arc-api.appbase.io/?version=latest#f8ee22c6-ba15-4b9e-83d8-34cc2953f245).

> Note:
>
> Recording custom events is available as an enterprise feature. You need to have at least `Production-I` plan or an `Arc Enterprise` plan to avail this.

### Appbase.io Apps

If you are using appbase.io apps (legacy), you can implement analytics in the following manner:

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


## Advanced Settings


### How To Enable / Disable Empty Query
By default, a library like ReactiveSearch shows you a set of results. even if the search hasn't been performed. Technically it calls the `match_all` query which can be considered as an empty query. By default, we record the analytics for empty queries too. You can find out about it in the Appbase.io dashboard with the `<empty_query>` key.

You can disable this behavior in `ReactiveSearch` by defining the `appbaseConfig` prop in the `ReactiveBase` and set the `emptyQuery` as `false`.

## How An Analytics Session Works

An analytics session is driven by the `X-Search-Query` header or `query` field if you're using the REST API. It is the user's responsibility to define the search query to trigger an analytics session. One analytics session can be considered as one search count.

Don't worry! `ReactiveSearch` handles this for you. You just need to set the `analytics` prop as `true` in the `ReactiveBase` component. [Read more about how to configure analytics in ReactiveSearch](/docs/reactivesearch/v3/advanced/analytics).

### How Are Searches Counted

- When a user types something in sequence, for example: `b→bo→boo→book`, we understand the context and instead of creating different search sessions, we count it as a search session with search key stored as `book`.
- By default, the search context is valid for up to `30s`. For example, `b→bo→boo...30 seconds...->book` will be recorded as two different searches with keys as `boo` & `book`.

## How Do We Record A User Session?
- A user session starts when someone hits the Appbase.io search request from any platform.
- A user session automatically ends after `30` minutes but if someone is continuously interacting with the search then we change the end duration to the next `30` minutes from the last interaction. 

For example:

=> Bob made the first request at `10:00` then the session will end at `10:30`,

=> If Bob has made some click or searched for a new term at `10:05` then the session will be extended till `10:35`.

- We keep track of user sessions with the help of `IP` address. However, if you're using the `User ID` in the `search` request then it'll be used instead of `IP`. So, a change in the `User ID` in the search request will start a new session.
- A user session defaults to `30` minutes but if you want to track users accurately then we recommend ending it wisely based on your use-cases. If you're using any of the appbase.io front-end libraries for your search UI then you don't need to worry about the session handling, they cover the most common use-cases. A session will automatically get canceled when the following conditions met:
1. On tab close
2. On window close
3. On redirect

You can use the [API](https://arc-api.appbase.io/?version=latest#ae6de2db-1e01-4b0d-a7d2-f8c0d1bc45fd) to end the user session for some custom scenarios, for example:
1. End the user session if a user logs out.
2. End the current session if a user logs in, so logged in user can be tracked in a new session.

```bash
curl --location --request POST 'http://{{user}}:{{password}}@{{host}}/{{index}}/_analytics/end_user_session'
```

## What Is A Bounce For Appbase.io Search Users?

> Bounce represents the percentage of visitors who enter the site and then leave ("bounce") rather than continuing to view other pages within the same site.

That's what [wikipedia](https://en.wikipedia.org/wiki/Bounce_rate) says about `Bounce Rate` but if we talk about it in the context of appbase.io which is all about `search` then a `Bounce` user can be defined as the `user` who visited your search page (the page which makes at least one search request to the appbase.io) and then leave without doing any further interactions with **search**.

A search interaction can be defined as:
- A new search request with a different search term, for example, user visited the search page and then searched for `books`.
- A click has been made on the search `suggestions` or search `results`.
- A new filter has been selected by a user.

So, basically a user will be considered as the `bounce` user if they don't perform any of the above tasks.

The bounce rate represents the percentage of users who have visited your search page and left without performing any search action.

> Bounce Rate = Number of `bounce` user sessions / Total user sessions * 100 
