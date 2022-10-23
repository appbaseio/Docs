---
title: 'ReactiveBase'
meta_title: 'ReactiveBase'
meta_description: 'ReactiveMaps is a complimentary library to ReactiveSearch.'
keywords:
    - reactivesearch
    - reactivebase
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

**ReactiveBase** is a container component that wraps all the `ReactiveSearch` components together. It binds the backend app (data source) with the UI view components (elements wrapped within ReactiveBase), allowing a UI component to be reactively updated every time there is a change in the data source or in other UI components.

This is the first component you will need to add when using `ReactiveSearch`.

### Usage

```js
<ReactiveBase
  app="appname"
  credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456"
>
    <Component1 .. />
    <Component2 .. />
</ReactiveBase>
```

### Props

### app `String`
app name as it appears on the dashboard. Refers to an index if you're using your own Elasticsearch cluster. (Multiple indexes can be connected to by specifying comma-separated index names)
### type `String` [optional]
types on which the queries should run on. Multiple types can be passed as comma-separated values. The default behavior here is to search on all the app types.
### credentials `String` [optional]
app credentials as they appear on the dashboard. It should be a string of the format "username:password" and is used for authenticating the app. If you are not using an appbase.io app, credentials may not be necessary - although having an open-access Elasticsearch cluster is not recommended.
### url `String` [optional]
URL where the Elasticsearch cluster is hosted, only needed if your app uses a non-appbase.io URL.
### enableAppbase `boolean` [optional]
Defaults to `false`. You can set this to `true` when you're using appbase.io alongside `Elasticsearch`. It enables the following features:
-   Recording of analytics events - search and clicks. [Read more](/docs/reactivesearch/v3/advanced/analytics/).
-   Query generation happens on server side - protecting against security concerns around query injection.
-   Apply query rules and functions for search queries. [Read more](/docs/search/rules/).
-   Apply additional security controls to requests: authenticate via RBAC (via JWTs) or Basic Auth, ACL based access control, IP based rate limits, IP/HTTP Referers whitelisting, fields filtering. [Read more](/docs/security/role/).
### headers `Object` [optional]
set custom headers to be sent with each server request as key/value pairs. For example:

```js{4-6}
<ReactiveBase
  app="appname"
  credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456"
  headers={{
      secret: 'reactivesearch-is-awesome'
  }}
>
    <Component1 .. />
    <Component2 .. />
</ReactiveBase>
```

### endpoint `Object` [optional] 
endpoint prop provides the ability to query a user-defined backend service for ReactiveBase and its children components. This service is typically a ReactiveSearch backend pipeline or any other API handler that works with the ReactiveSearch API references. This property works only when `enableAppbase` is set to `true`.
Accepts the following properties:
### url `String` [Required]
    URL where the data cluster is hosted.
### headers `Object` [optional]        
    set custom headers to be sent with each server request as key/value pairs.
### method `String` [optional]    
    set method of the API request.
### body `Object` [optional]    
    request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.

> Top level props - `url`, `app` and `credentials` are optional and overridden in the final request when `endpoint` prop is defined.

```js{4-6}
<ReactiveBase
    enableAppbase
    endpoint={{
        url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
        headers: {
            // put relevant headers
        }
        method: 'POST'
    }}
>
    <Component1 .. />
    <Component2 .. />
</ReactiveBase>
```

### appbaseConfig `Object` [optional]
allows you to customize the analytics experience when appbase.io is used as a backend.
Read more about it over [here](/docs/reactivesearch/v3/advanced/analytics/#configure-the-analytics-experience).
### analytics `Boolean` [optional]
allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.<br/>
Check the [analytics recipe](/docs/reactivesearch/v3/advanced/analytics/) for click analytics implementation.
> Note:
> This prop has been marked as deprecated. Please use the `recordAnalytics` property in the `appbaseConfig` prop instead.
### analyticsConfig `Object` [optional]
allows you to customize the analytics experience when appbase.io is used as a backend.
Read more about it over [here](/docs/reactivesearch/v3/advanced/analytics/#configure-the-analytics-experience).
> Note:
> This prop has been marked as deprecated. Please use the `appbaseConfig` prop instead.
### initialQueriesSyncTime `Number` [optional]
allows you to define a wait time in milliseconds. We wait for `initialQueriesSyncTime` time to combine the individual component queries to a single network request at initial load. This prop is helpful to optimize the performance when you have a lot of filters on the search page, using a wait time of `100-200` milliseconds would merge the multiple requests into a single request.
### as `String` [optional]
allows to use the custom html element tag, defaults to `div`.
### theme `Object` [optional]
allows over-writing of default styles by providing the respective key/values. You can read more about its usage [here](/docs/reactivesearch/v3/theming/overview/)
### themePreset `String` [optional]
allows over-writing of default styles by providing a preset value. Supported values are `light` (default) and `dark`. You can read more about its usage [here](/docs/reactivesearch/v3/theming/overview/)
### getSearchParams `Function` [optional]
Enables you to customize the evaluation of query-params-string from the url (or) any other source. If this function is not set, the library will use `window.location.search` as the search query-params-string for parsing selected-values. This can come handy if the URL is using hash values.
### setSearchParams `Function` [optional]
Enables you to customize setting of the query params string in the url by providing the updated query-params-string as the function parameter. If this function is not set, the library will set the `window.history` via `pushState` method.
### transformRequest `Function` [optional]
Enables transformation of network request before execution. This function will give you the request object as the param and expect an updated request in return, for execution. Note that this is an experimental API and will likely change in the future.
> Note:
>
> From v3.0.1 it is possible to define `transformRequest` as an `async` method which will return a promise which resolves the modified request options.

If you need to include credentials (credentials are cookies, authorization headers or TLS client certificates), you can do it this way:

```js{3-6}
<ReactiveBase
  app="appname"
  transformRequest={props => ({
    ...props,
    credentials: "include",
  })}
>
    <Component1 .. />
    <Component2 .. />
</ReactiveBase>
```

You can also modify the request `URL` in that way:

```js{3-6}
<ReactiveBase
  app="appname"
  transformRequest={props => ({
    ...props,
    url: props.url.replace('_msearch', '_search')
  })}
>
    <Component1 .. />
    <Component2 .. />
</ReactiveBase>
```

The above example will change the default `_msearch` request to `_search` request.

### graphQLUrl `String` [optional]
Allows user to query from GraphqQL server instead of `Elasticsearch` REST api. [graphql-compose-elasticsearch](https://github.com/graphql-compose/graphql-compose-elasticsearch) helps in transforming `GraphQL` queries into `Elasticsearch` rest api. Here is an example of `GraphQL` server which acts as proxy for `Elasticsearch`.
-   [GraphQL Server for books application](https://github.com/appbaseio-apps/graphql-elasticsearch-server)
### transformResponse `Function` [optional]
Enables transformation of search network response before rendering them. This asynchronous function will give you elasticsearch response object and componentId as params and expects an updated response in return in the similar structure of elasticsearch. You can use `componentId` to conditionally transform response for a particular reactivesearch component only.

```js{7-34}
    <ReactiveBase
        app="appname"
        credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456"
        headers={{
            secret: 'reactivesearch-is-awesome'
        }}
        transformResponse={async (elasticsearchResponse, componentId) => {
            const ids = elasticsearchResponse.responses[0].hits.hits.map(
                item => item._id
            );
            const extraInformation = await getExatraInformation(ids);
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
        }}
    >
        <Component1 .. />
        <Component2 .. />
    </ReactiveBase>
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


> 💡 &nbsp; Use below props when using [ReactiveMaps 🗺️ ](https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/) &nbsp; library.
### mapKey `String` [optional]     
accepts the secret key to load google script.
### mapLibraries `Array<String>` [optional]     
accepts the list of addiotional maps libraries to load. The following are available according to [Google Docs](https://developers.google.com/maps/documentation/javascript/libraries):
- `drawing`
- `geometry`
- `localContext`
- `places`
- `visualization`

```jsx
<ReactiveBase
    mapKey="<YOUR_MAP_KEY>"
    mapLibraries={['visualization', 'places']}
    // ...other props
/>
```

> Mandatorily pass ***`mapLibraries={['places']}`*** when using either or both of GeoDistanceDropdown/ GeoDistanceSlider components from [ReactiveMaps 🗺️ ](https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/).

### preferences `Object` [optional]
accepts an object to configure the search settings for components. The `preferences` property allows configuring the search settings for your components in one place. The preferences object must follow the following structure:

```ts
{
    componentSettings: {
        [componentId]: {
            // If disabled, the component would not get rendered and would not constitute the search query
            enabled: true,
            rsConfig: {
                // props supported by reactivesearch components
            }
            // can have additional keys to store meta data for components
            // the preference object for a component can be accessed using the 
            // `SearchPreferencesContext` context.
            // For e.g custom property to control the collapsible property for a facet
            isCollapsible: true,
        }
    }
}
```
To connect a ReactiveSearch component to a preference, use the `componentId` prop. The following example has defined the `preferences` object for `bookSearch` component, the `DataSearch` component is using the same componentId (`bookSearch`).

```jsx
    <ReactiveBase preferences={{
        componentSettings: {
            bookSearch: {
                rsConfig: {
                    dataField: 'original_title',
                    title: 'Search for Books',
                    size: 5,
                }
            }
        }
    }}>
        <DataSearch componentId="bookSearch" />
    </ReactiveBase>
```
Additionally, the ReactiveSearch components support `preferencesPath` prop which is helpful to define the path of preference object for a component. It is helpful when you have to use conflicting component Ids. The following example defines the preferences for `home` and `search` pages, components have defined the `preferencesPath` prop to connect to preferences.

```jsx
    <ReactiveBase preferences={{
        pages: {
            home: {
                bookSearch: {
                    rsConfig: {
                        dataField: 'original_title',
                        title: 'Search for Books',
                        size: 5,
                    }
                }
            },
            search: {
                bookSearch: {
                    rsConfig: {
                        dataField: ['original_title', 'authors', 'publishers'],
                        title: 'Search for Books, Authors, Publishers',
                        size: 10,
                    }
                }
            }
        }
    }}>
        {/** home page */}
        <DataSearch 
            preferencesPath="pages.home.bookSearch" 
            componentId="bookSearch" 
        />
         {/** search page */}
        <DataSearch 
            preferencesPath="pages.search.bookSearch" 
            componentId="bookSearch" 
        />
    </ReactiveBase>
```
> Note:
>
> Preferences is meant to be a one time configuration for components. We don't recommend to mutate it as it can cause performance issues.

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/Preferences" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Connect to Elasticsearch

> Note
>
> An **app** within ReactiveSearch's context refers to an **index** in Elasticsearch.

ReactiveSearch works out of the box with an Elasticsearch index hosted anywhere. You can use the `url` prop of the **ReactiveBase** component to connect the child ReactiveSearch components to your own index. For example,

```jsx
<ReactiveBase
  app="your-elasticsearch-index"
  url="http://your-elasticsearch-cluster"
>
    <Component1 .. />
    <Component2 .. />
</ReactiveBase>
```

It's also possible to secure your Elasticsearch cluster's access with a middleware proxy server that is connected to ReactiveSearch. This allows you to set up custom authorization rules, prevent misuse, only pass back non-sensitive data, etc. Here's an example app where we show this using a Node.JS / Express middleware:

-   [Proxy Server](https://github.com/appbaseio-apps/reactivesearch-proxy-server)
-   [Proxy Client](https://github.com/appbaseio-apps/reactivesearch-proxy-client)

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

-   List specific components can be found [here](/docs/reactivesearch/v3/list/singlelist/).
-   Range specific components can be found [here](/docs/reactivesearch/v3/range/singlerange/).
-   Search specific components can be found [here](/docs/reactivesearch/v3/search/datasearch/).
-   Result specific components can be found
    [here](/docs/reactivesearch/v3/result/reactivelist/).

You can read more about when to use which components in the overview guide [here](/docs/reactivesearch/v3/overview/components/).
