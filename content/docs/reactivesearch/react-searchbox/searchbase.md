---
title: 'SearchBase API Reference'
meta_title: 'API Reference for SearchBase'
meta_description: 'SearchBase is a provider component that provides the search context to the child components.'
keywords:
    - apireference
    - searchbase
    - elasticsearch
    - search library
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

## How does it work?

`SearchBase` is a provider component that provides the [SearchBase](/docs/reactivesearch/searchbase/overview/QuickStart/) context to the child components. It binds the backend app (data source) with the UI view components (elements wrapped within SearchBase), allowing a UI component to be reactively updated every time there is a change in the data source or in other UI components.

## Props

### To configure the Appbase environments

-   **index** `string` [Required]
    Refers to an index of the Elasticsearch cluster.

    `Note:` Multiple indexes can be connected to by specifying comma-separated index names.

-   **url** `string` [Required]
    URL for the Elasticsearch cluster

-   **credentials** `string` [Required]
    Basic Auth credentials if required for authentication purposes. It should be a string of the format `username:password`. If you are using an appbase.io cluster, you will find credentials under the `Security > API credentials` section of the appbase.io dashboard. If you are not using an appbase.io cluster, credentials may not be necessary - although having open access to your Elasticsearch cluster is not recommended.

-   **appbaseConfig** `Object`
    allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:

    -   **recordAnalytics** `boolean` allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
    -   **enableQueryRules** `boolean` If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
    -   **userId** `string` It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
    -   **customEvents** `Object` It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.
    -   **enableTelemetry** `Boolean` When set to `false`, disable the telemetry. Defaults to `true`.

### To customize the query execution

-   **headers** `Object` [optional] set custom headers to be sent with each server request as key/value pairs.

-   **transformRequest** `Function` Enables transformation of network request before
    execution. This function will give you the request object as the param and expect an updated request in return, for execution.

```jsx
<SearchBase
    index="gitxplore-app"
    url="https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    transformRequest={request =>
        Promise.resolve({
            ...request,
            credentials: include,
        })}
/>
```

-   **transformResponse** `Function` Enables transformation of search network response before  
    rendering them. It is an asynchronous function which will accept an Elasticsearch response object as param and is expected to return an updated response as the return value.

```jsx
<SearchBase
    index="gitxplore-app"
    url="https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    transformResponse={async elasticsearchResponse => {
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
    }}
/>
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

While the `react-searchbox` library should be enough to build the powerful search UIs out of the box, there can be times where you need access to the state (context) of the components.

**Example Use Cases**

One would need to use the state (context) of the search components, e.g. to show a list of all active user query inputs including the ability to unselect an input to affect the particular search component's input as well.

Another use can be to create a saved query feature where it's important persist the state of all the search and filter components.


**Basic Usage**

```jsx
import { SearchContext } from '@appbaseio/react-searchbox';

class AdvancedComponent extends React.Component {
    static contextType = SearchContext;
    render() {
        console.log(this.context.searchbase.getComponent('component-id'));
        return null;
    }
}
```

**Properties**

- **getComponents** `Function: () => Object<string, Object>` returns an object, which is a list of all `SearchComponent` instances contained within the `SearchBase` context as key value pairs with component ids as the `key` names.

- **getComponent** `Function: (String) => Object` returns the `SearchComponent` instance object contained within the `SearchBase` context for the provided component `id`.


**Example** 
The below example renders the active filters using a separate `<SelectedFilters />` component, which uses the `SearchContext` to access various `SearchComponent` instances.
<iframe src="https://codesandbox.io/embed/appbaseio-react-searchbox-advanced-usage-kwu49?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="@appbaseio/react-searchbox : advanced usage"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>