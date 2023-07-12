---
title: 'SearchBase API Reference'
meta_title: 'API Reference for SearchBase'
meta_description: 'SearchBase is a provider component that provides the search context to the child components.'
keywords:
    - api-reference
    - searchbase
    - elasticsearch
    - search-ui
sidebar: 'docs'
nestedSidebar: 'vue-searchbox-reactivesearch'
---

## How does it work?

`SearchBase` is a provider component that provides the [SearchBase](/docs/reactivesearch/searchbase/overview/quickstart/) context to the child components. It binds the backend app (data source) with the UI view components (elements wrapped within SearchBase), allowing a UI component to be reactively updated every time there is a change in the data source or in other UI components.

# Props

## To configure the Appbase environments
### index

| Type | Optional |
|------|----------|
|  `string`  |    No    |

Refers to an index of the Elasticsearch cluster.

`Note:` Multiple indexes can be connected to by specifying comma-separated index names.

### url

| Type | Optional |
|------|----------|
|  `string`  |    No    |

URL for the Elasticsearch cluster

### credentials

| Type | Optional |
|------|----------|
|  `string`  |    No    |

Basic Auth credentials if required for authentication purposes. It should be a string of the format `username:password`. If you are using an appbase.io cluster, you will find credentials under the `Security > API credentials` section of the appbase.io dashboard.

### appbaseConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:

-   **recordAnalytics** `Boolean` allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
-   **enableQueryRules** `Boolean` If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
-   **enableSearchRelevancy** `Boolean` defaults to `true`. It allows you to configure whether to apply the search relevancy or not.   
-   **userId** `string` It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
-   **useCache** `Boolean` This property when set allows you to cache the current search query. The `useCache` property takes precedence irrespective of whether caching is enabled or disabled via the dashboard. 
-   **customEvents** `Object` It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.
-   **enableTelemetry** `Boolean` When set to `false`, disable the telemetry. Defaults to `true`.

## To customize the query execution

### headers 

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

set custom headers to be sent with each server request as key/value pairs.

### transformRequest

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables transformation of network request before
execution. This function will give you the request object as the param and expect an updated request in return, for execution.

```html
<template>
    <search-base
        index="gitxplore-app"
        url="https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io"
        credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
        :transformRequest="transformRequest"
    />
</template>
<script>
export default {
    name: "App",
    methods: {
        transformRequest(elasticsearchResponse) {
            return Promise.resolve({
                ...request,
                credentials: include,
            })
        }
    }
}
</script>
```

### transformResponse

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables transformation of search network response before  
rendering them. It is an asynchronous function which will accept an Elasticsearch response object as param and is expected to return an updated response as the return value.

```html
<template>
    <search-base
        index="gitxplore-app"
        url="https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io"
        credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
        :transformResponse="transformResponse"
    />
</template>
<script>
export default {
    name: "App",
    methods: {
        async transformResponse(elasticsearchResponse) {
            const ids = elasticsearchResponse.hits.hits.map(item => item._id);
            const extraInformation = await getExtraInformation(ids);
            const hits = elasticsearchResponse.hits.hits.map(item => {
                const extraInformationItem = extraInformation.find(
                    otherItem => otherItem._id === item._id,
                );
                return {
                    ...item,
                    ...extraInformationItem,
                };
            });

            return {
                ...elasticsearchResponse,
                hits: {
                    ...elasticsearchResponse.hits,
                    hits,
                },
            };
        }
    }
}
</script>
```

> Note: transformResponse function is expected to return data in the following structure.

```javascript
{
    // Elasticsearch hits response
    hits: {
        hits: [...],
        total: 100
    },
    // Elasticsearch aggregations response
    aggregations: {

    }
    took: 1
}
```

## Advanced Usage

While the `vue-searchbox` library should give you good controls out of the box to build the powerful search UIs, there can be times when you need access to the state (context) of the components.

**Example Use Cases**

One would need to use the state (context) of the search components, e.g. to show a list of all active user query inputs including the ability to unselect an input to affect the particular search component's input as well.

Another use can be to create a saved query feature where it's important persist the state of all the search and filter components.


**Basic Usage**
 ```html
 <script>
  export default {
     name: "App",
     inject: ['searchbase'],
     render() {
         console.log("component instance", this.searchbase.getComponent('component-id'))
         return null
     }
 }
 </script>
 ```

## **Properties**

### getComponents

| Type | Optional |
|------|----------|
|  `Function: () => Object<string, Object>` |   Yes   |

returns an object, which is a list of all `SearchComponent` instances contained within the `SearchBase` Context as key-value pairs with `key` as component ids.

### getComponent

| Type | Optional |
|------|----------|
|  `Function: (String) => Object` |   Yes   |

returns an object contained within the `SearchBase` Context, which is the `SearchComponent` instance for the provided component `id`.


**Example**
The below example renders the active filters using a separate `<selected-filters />` component, which uses the `searchbase` context injected in the component.
<iframe src="https://codesandbox.io/embed/appbaseio-vue-searchbox-advanced-example-vymk4?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="@appbaseio/vue-searchbox: advanced example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
