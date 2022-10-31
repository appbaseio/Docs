---
title: 'ReactiveBase'
meta_title: 'ReactiveBase'
meta_description: 'ReactiveBase is a container component that wraps all the `ReactiveSearch` components together.'
keywords:
    - reactivesearch
    - quickstart
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

**ReactiveBase** is a container component that wraps all the `ReactiveSearch` components together. It binds the backend app (data source) with the UI view components (elements wrapped within ReactiveBase), allowing a UI component to be reactively updated every time there is a change in the data source or in other UI components.

This is the first component you will need to add when using `ReactiveSearch`.

### Usage
```html
<template>
	<reactive-base app="appname" credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456">
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
```

## Props
### app

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

app name as it appears on the dashboard. Refers to an index if you're using your own Elasticsearch cluster. (Multiple indexes can be connected to by specifiying comma separated index names)
### type

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

types on which the queries should run on. Multiple types can be passed as comma separated values. The default behavior here is to search on all the app types.
### credentials

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

app credentials as they appear on the dashboard. It should be a string of the format "username:password" and is used for authenticating the app. If you are not using an appbase.io app, credentials may not be necessary - although having an open-access Elasticsearch cluster is not recommended.
### url

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

URL where Elasticsearch cluster is hosted, only needed if your app uses a non appbase.io URL.
### enableAppbase

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

Defaults to `false`. You can set this to `true` when you're using appbase.io alongside `Elasticsearch`. It enables the following features:
-   Recording of analytics events - search and clicks. [Read more](/docs/reactivesearch/vue/advanced/analytics/).
-   Query generation happens on server side - protecting against security concerns around query injection.
-   Apply query rules and functions for search queries. [Read more](/docs/search/rules/).
-   Apply additional security controls to requests: authenticate via RBAC (via JWTs) or Basic Auth, ACL based access control, IP based rate limits, IP/HTTP Referers whitelisting, fields filtering. [Read more](/docs/security/role/).
### headers

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

set custom headers to be sent with each server request as key/value pairs. For example:

```html
<template>
	<reactive-base
		app="appname"
		credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456"
		:headers="{ secret: 'reactivesearch-is-awesome' }"
	>
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
```
### endpoint

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

endpoint prop provides the ability to query a user-defined backend service for ReactiveBase and its children components. This service is typically a ReactiveSearch backend pipeline or any other API handler that works with the ReactiveSearch API references. This property works only when `enableAppbase` is set to `true`.
Accepts the following properties:
-   **url** `String` [Required]
	URL where the data cluster is hosted.
-   **headers** `Object` [optional]        
	set custom headers to be sent with each server request as key/value pairs.
-   **method** `String` [optional]    
	set method of the API request.
-   **body** `Object` [optional]    
	request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.

> Top level props - `url`, `app` and `credentials` are optional and overridden in the final request when `endpoint` prop is defined.

```html
<template>
	<reactive-base
		:enableAppbase="true"
		:endpoint="{
			url: 'https://appbase-demo-ansible-abxiydt-arc	searchbase.io/recipes-demo/_reactivesearch.v3',
			headers: {
			    // put relevant headers
			},
			method: 'POST'
		}"
	>
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
```

### appbaseConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

allows you to customize the analytics experience when appbase.io is used as a backend.
Read more about it over [here](/docs/reactivesearch/vue/advanced/analytics/#configure-the-analytics-experience).
### initialQueriesSyncTime

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

allows you to define a wait time in milliseconds. We wait for `initialQueriesSyncTime` time to combine the individual component queries to a single network request at initial load. This prop is helpful to optimize the performance when you have a lot of filters on the search page, using a wait time of `100-200` milliseconds would merge the multiple requests into a single request.
### as

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

allows to use a custom html element tag, defaults to `div`.
### getSearchParams

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables you to customize the evaluation of query-params-string from the url (or) any other source. If this function is not set, the library will use `window.location.search` as the search query-params-string for parsing selected-values. This can come handy if the URL is using hash values.
### setSearchParams

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables you to customize setting of the query params string in the url by providing the updated query-params-string as the function parameter. If this function is not set, the library will set the `window.history` via `pushState` method.
### theme

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

allows over-writing of default styles by providing the respective key/values. You can read more about its usage [here](/docs/reactivesearch/vue/theming/Overview/)
### transformRequest

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables transformation of network request before execution. This function will give you the request object as the param and expect an updated request in return, for execution. Note that this is an experimental API and will likely change in the future.
> Note:
>
> From v3.0.1 it is possible to define `transformRequest` as an `async` method which will return a promise which resolves the modified request options.

If you need to include credentials (credentials are cookies, authorization headers or TLS client certificates), you can do it this way:

```html
<template>
	<reactive-base
		app="appname"
		:transformRequest="(props)=> ({
            ...props,
            credentials: 'include',
        })"
	>
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
```

You can also modify the request `URL` in that way:

```html
<template>
	<reactive-base
		app="appname"
		:transformRequest="(props)=> ({
            ...props,
            url: props.url.replace('_msearch', '_search'),
        })"
	>
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
```

The above example will change the default `_msearch` request to `_search` request.

### tranformResponse

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables transformation of search network response before rendering them. This asynchronous function will give you elasticsearch response object and componentId as params and expects an updated response in return in the similar structure of elasticsearch. You can use `componentId` to conditionally transform response for a particular reactivesearch component only.

```html
<template>
	<reactive-base
		app="appname"
		credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456"
		:headers="{ secret: 'reactivesearch-is-awesome' }"
		:transformResponse="transformResponse"
	>
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
<script>
	...,
	methods: {
	    getExtraInformation(ids) {
	        ...
	    },
	    async transformResponse(elasticsearchResponse, _componentId) {
	            const ids = elasticsearchResponse.responses[0].hits.hits.map(
	                item => item._id
	            );
	            const extraInformation = await this.getExtraInformation(ids);
	            const hits = elasticsearchResponse.responses[0].hits.hits.map(
	                (item) => {
	                    const extraInformationItem = extraInformation.find(
	                        otherItem => otherItem._id === item._id
	                    );
	                    return {
	                        ...item,
	                        ...extraInformationItem
	                    };
	                }
	            );
	            return {
	                response: [
	                    {
	                        ...elasticsearchResponse.responses[0],
	                        hits: {
	                            ...elasticsearchResponse.responses[0].hits,
	                            hits
	                        }
	                    }
	                ]
	            };
	        }
	}
</script>
```

> Note
>
> `transformResponse` function is expected to return data in following structure.

```js
{
    response: [
        {
            hits: {
                hits: [...],
                total: 100
            },
            took: 1
        }
    ]
}
```

### Connect to Elasticsearch
> Note
>
> An **app** within ReactiveSearch's context refers to an **index** in Elasticsearch.

ReactiveSearch works out of the box with an Elasticsearch index hosted anywhere. You can use the `url` prop of the **ReactiveBase** component to connect the child ReactiveSearch components to your own index. For example,

```html
<template>
	<reactive-base app="appname" url="http://your-elasticsearch-cluster">
		<component1 .. />
		<component2 .. />
	</reactive-base>
</template>
```

It's also possible to secure your Elasticsearch cluster's access with a middleware proxy server that is connected to ReactiveSearch. This allows you to set up custom authorization rules, prevent misuse, only pass back non-sensitive data, etc. Here's an example app where we show this using a Node.JS / Express middleware:

-   [Proxy Server](https://github.com/appbaseio-apps/reactivesearch-proxy-server/tree/vue)
-   [Proxy Client](https://github.com/appbaseio-apps/reactivesearch-proxy-client/tree/vue)

> Note
>
> If you are using the **url** prop for an Elasticsearch cluster, ensure that your ReactiveSearch app can access the cluster. Typically, you will need to configure CORS in **elasticsearch.yml** to enable access.

```yaml
http.cors.enabled: true
http.cors.allow-credentials: true
http.cors.allow-origin: 'http://reactive-search-app-domain.com:port'
http.cors.allow-headers: X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept
```

> Note
>
> If you are using Elasticsearch on AWS, then the recommended approach is to connect via the middleware proxy as they don't allow setting the Elasticsearch configurations.

### Next Steps
Once you have added the **ReactiveBase** component, you can get started with adding other components as its children.

-   List specific components can be found [here](/docs/reactivesearch/vue/list/SingleList/).
-   Range specific components can be found [here](/docs/reactivesearch/vue/range/SingleRange/).
-   Search specific components can be found [here](/docs/reactivesearch/vue/search/DataSearch/).
-   Result specific components can be found
    [here](/docs/reactivesearch/vue/result/ResultList/).

You can read more about when to use which components in the overview guide [here](/docs/reactivesearch/vue/overview/Components/).
