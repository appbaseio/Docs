---
title: 'StateProvider'
meta_title: 'StateProvider'
meta_description: 'StateProvider allows you to access the current state of your components along with the search results.'
keywords:
    - reactivesearch
    - stateprovider
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

`StateProvider` component allows you to access the current state of your components along with the search results. For instance, you can use this component to create results/no results or query/no query pages.

## Usage

```html
<template>
    <state-provider>
        <div slot-scope="{ searchState }">
           Search State: {{ JSON.stringify(searchState) }}
        </div>
    </state-provider>
</template>
```

Search state is an object with component id as key and state as value.<br/>
For example:

```js
 {
  	BooksSearch: {
		value: 'A song of Ice and Fire',
		hits: [],
		error: null,
  	},
  	RatingsFilter: {
		value: {
			start: 4,
			end: 5,
			label: "★★★★ & up"
		},
		aggregations: [],
		hits: [],
		error: null
  	}
 }
```

### Setting custom state

`setSearchState()` is a function which can be used to set custom search state of the app, takes one argument which is a custom state object.

```html
<template>
    <state-provider>
        <div slot-scope="{ setSearchState }">
           <button @click="() => setSearchState(this.searchState)">Replay Search</button>
        </div>
    </state-provider>
</template>
<script>
export default {
	data() {
	    return {
	        searchState: { 
                // custom state
                // [componentId]: component_value
                'result': null,
                'search': 'Netherlands'
        }
    }
  }
}
</script>
```

Custom state is an object with component id as key and component's value as value.<br/>
For example:

```js
 {
  	BooksSearch: 'A song of Ice and Fire',
  	RatingsFilter:  {
            start: 4,
            end: 5,
            label: "★★★★ & up"
	}
 }
```

#### Example

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/saved-search?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="saved-search-support"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Props

-   **componentIds** `string|string[]` [optional]
    By default `StateProvider` watches the state of all the components, you can restrict this behavior by defining the component id(ids) for which you want to listen for.

> Note
>
> You can avoid the unnecessary re-renders of `StateProvider` component by defining the componentIds.

-   **includeKeys** `string[]` [optional]
    defaults set to `['value', 'hits', 'aggregations', 'error']` which means that by default your search state for a particular component will only contains these keys. Although the default search state fulfills most of your common use cases but you can also control it by defining your custom keys with the help of `includeKeys` prop.<br/><br/>
    For example:

```html
<state-provider
	:includeKeys="['value']"
/>
```

<strong>Returned State:</strong>

```js
{
    BooksSearch: {
            value: 'A song of Ice and Fire',
    },
    RatingsFilter: {
            value: {
                start: 4,
                end: 5,
                label: "★★★★ & up"
            },
    }
}
```

Here is a list of all the valid keys:

-   **isLoading** `true` if the component's query is in executing mode
-   **error** returns the error
-   **hits** An array of hits obtained from the applied query.
-   **aggregations** An array of aggregations obtained from the applied query.
-   **promotedData** An array of promoted results obtained from the applied query. [Read More](/docs/search/rules/).
-   **customData** Custom data set in the query rule when appbase.io is used as backend. [Read More](/docs/search/rules/#custom-data)
-   **rawData** An object of raw response as-is from elasticsearch query.
-   **resultStats**: `object`
    An object with the following properties which can be helpful to render custom stats:

    -   **`numberOfResults`**: `number`
        Total number of results found
    -   **`time`**: `number`
        Time taken to find total results (in ms)
    -   **`hidden`**: `number`
        Total number of hidden results found
    -   **`promoted`**: `number`
        Total number of promoted results found

-   **query** returns the component's query in Elaticsearch Query DSL format.
-   **react** returns the `react` property of the components
-   **componentType** string constant to tell the type of the reactivesearch component is being used.
-   **dataField** data field to be connected to the component’s UI view.
-   **includeFields** query option
-   **excludeFields** query option
-   **size** query option
-   **sortBy** query option
-   **sortOptions** query option
-   **pagination** `true` means result components are using pagination in UI
-   **autoFocus** property of search components
-   **autosuggest** property of search components
-   **debounce** property of search components
-   **defaultValue** default value of components
-   **defaultSuggestions** default suggestions set by user
-   **fieldWeights** property of search components
-   **filterLabel** filter label set for components
-   **fuzziness** property of search components
-   **highlight** property of search components
-   **highlightField** property of search components
-   **nestedField** returns the `nestedField` prop set by user
-   **placeholder** placeholder set for search components
-   **queryFormat** returns the `queryFormat` set for the components
-   **categoryField** property of search components
-   **strictSelection** property of search components
-   **selectAllLabel** property of list components
-   **showCheckbox** property of list components
-   **showFilter** property of list components
-   **showSearch** property of list components
-   **showCount** property of list components
-   **showLoadMore** property of list components
-   **loadMoreLabel** property of list components
-   **showMissing** property of list components
-   **missingLabel** property of list components
-   **data** property of list components
-   **showRadio** property of list components
-   **multiSelect** property of list components
-   **interval** property of range components
-   **showHistogram** property of range components
-   **snap** property of range components
-   **stepValue** property of range components
-   **range** property of range components
-   **showSlider** property of range components

> Note
>
> The existence of a key in component's search state depends on the type of component is being used.

## Events

-   **change** `function` [optional]
    is a callback function called when the search state changes and accepts the previous and next search state as arguments.
    <br/><br/>
    For example:

```html
<template>
    <state-provider
        @change="handleChange"
    />
</template>
<script>
export default {
	name: 'app',
	methods: {
		handleChange: (prevState, nextState) => {
			console.log('Old State', prevState);
			console.log('New State', nextState);
		},
	},
};
</script>
```
