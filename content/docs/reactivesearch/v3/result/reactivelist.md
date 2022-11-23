---
title: 'ReactiveList'
meta_title: 'ReactiveList'
meta_description: '`ReactiveList` creates a data-driven result list UI component. This list can reactively update itself based on changes in other components or changes in the database itself.'
keywords:
    - reactivesearch
    - reactivelist
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/iY2csRm.png)

`ReactiveList` creates a data-driven result list UI component. This list can reactively update itself based on changes in other components or changes in the database itself.

Example uses:

-   showing a feed of results based on the applied search criteria.


## Usage

### Basic Usage
```jsx
<ReactiveList
	componentId="SearchResult"
	react={{
		and: ['CitySensor', 'SearchSensor'],
	}}
	renderItem={res => <div>{res.title}</div>}
/>
```

### Usage With All Props
```jsx
<ReactiveList
    componentId="SearchResult"
    dataField="ratings"
    pagination={false}
    paginationAt="bottom"
    pages={5}
    sortBy="desc"
    size={10}
    loader="Loading Results.."
    showResultStats={true}
    renderItem={res => <div>{res.title}</div>}
    renderResultStats={function(stats) {
    	return `Showing ${stats.displayedResults} of total ${stats.numberOfResults} in ${
    		stats.time
    	} ms`;
    }}
    highlight={true}
    highlightConfig={{
        'pre_tags': ['<mark>'],
        'post_tags': ['</mark>'],
        'fields': {
            text: {},
            title: 'sws'
        },
        'number_of_fragments': 0,
    }}
    react={{
    	and: ['CitySensor', 'SearchSensor'],
    }}
    endpoint={{
      url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
      headers:{
        // relevant headers
      },
      method: 'POST'
    }}    
/>
```

## Props

### componentId

| Type | Optional |
|------|----------|
|  `String`  |    No    |

unique identifier of the component, can be referenced in other components' `react` prop.
### endpoint 

| Type | Optional |
|------|----------|
|  `Object`  |    Yes   |

endpoint prop provides the ability to query a user-defined backend service for this component, overriding the data endpoint configured in the ReactiveBase component. Works only when `enableAppbase` is `true`.
Accepts the following properties:
-   **url** `String` [Required]
    URL where the data cluster is hosted.
-   **headers** `Object` [optional]        
    set custom headers to be sent with each server request as key/value pairs.
-   **method** `String` [optional]    
    set method of the API request.
-   **body** `Object` [optional]    
    request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.

> - Overrides the endpoint property defined in ReactiveBase.
> - If required, use `transformResponse` prop to transform response in component-consumable format.

### dataField

| Type | Optional |
|------|----------|
|  `String`  |    No    |

data field to be connected to the component's UI view. It is useful for providing a sorting context.
### aggregationField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data). It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html). You can access `aggregationData` using render prop as shown:

```jsx
<ReactiveList
    aggregationField="original_title.keyword"
    render={({aggregationData}) => {...}}
/>
```

> If you are using an app with elastic search version less than 6, then defining this prop will result in error and you need to handle it manually using **renderError** prop.

> It is possible to override this query by providing `defaultQuery`.

> Note: This prop has been marked as deprecated starting v3.18.0. Please use the `distinctField` prop instead.

### aggregationSize
To set the number of buckets to be returned by aggregations.

> Note: This prop is only applicable when `enableAppbase` is set to `true`.
### excludeFields

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |

fields to be excluded in search results.
### includeFields

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |

fields to be included in search results.
### scrollTarget

| Type | Optional |
|------|----------|
|  `String` or `Object` |   Yes   |

accepts `id` or the dom node of the container you wish to apply infinite loading on. **Note:** The container should be scrollable.
### scrollOnChange

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Enables you to customise the window scrolling experience on query change. Defaults to `true` i.e. The window will scroll to top in case of the query change, which can be triggered by change in pagination, change in filters or search value, etc. When set to `false`, scroll position will stay intact.
### pagination

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `false`, When set to `true`, a pagination based list view with page numbers will appear.
### infiniteScroll

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `true`, When set to `true`, an infinite scroll based view will appear.
### paginationAt

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Determines the position where to show the pagination, only applicable when **pagination** prop is set to `true`. Accepts one of `top`, `bottom` or `both` as valid values. Defaults to `bottom`.
### pages

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

number of user selectable pages to be displayed when pagination is enabled. Defaults to 5.
### currentPage

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

can be used to set the default page number for initial render.
### sortBy

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

sort the results by either `asc` or `desc` order. It is an alternative to `sortOptions`, both can't be used together.
### sortOptions

| Type | Optional |
|------|----------|
|  `Object Array` |   Yes   |

an alternative to the `sortBy` prop, `sortOptions` creates a sorting view in the ReactiveList component's UI. Each array element is an object that takes three keys:
-   `label` - label to be displayed in the UI.
-   `dataField` - data field to use for applying the sorting criteria on.
-   `sortBy` - specified as either `asc` or `desc`.
### defaultSortOption

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

accepts the label of the desired sort option to set default sort value from given `sortOptions` array.
### size

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

number of results to show per view. Defaults to 10.
### loader

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |

display to show the user while the data is loading, accepts `String` or `JSX` markup.
### showLoader

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

defaults to `true`, if set to `false` then the ReactiveList will not display the default loader.
### showResultStats

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to show result stats in the form of results found and time taken. Defaults to `true`.
### showExport

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

renders UI that lets exporting data into a CSV and JSON document. Defaults to `true`. 
The export options' UI can be styled by passing `export` key in `innerClass` prop.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

a dependency object defining how this component should react based on the state changes in the sensor components.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

when set adds the current page number to the url. Only works when `pagination` is enabled.
### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

applies a default query to the result component. This query will be run when no other components are being watched (via React prop), as well as in conjunction with the query generated from the React prop. The function should return a query.
Read more about it [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).
### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

returns a list element object to be rendered based on the `res` data object. This callback function prop is called for each data item rendered in the **ReactiveList** component's view. For example,
```jsx
renderItem = {
    function(res) {
        return (
            <a className="full_row single-record single_record_for_clone" key={res._id}>
                <div className="text-container full_row" style={{ paddingLeft: '10px' }}>
                    <div className="text-head text-overflow full_row">
                        <span className="text-head-info text-overflow">
                            {res.name ? res.name : ''} - {res.brand ? res.brand : ''}
                        </span>
                        <span className="text-head-city">{res.brand ? res.brand : ''}</span>
                    </div>
                    <div className="text-description text-overflow full_row">
                        <ul className="highlight_tags">
                            {res.price ? `Priced at $${res.price}` : 'Free Test Drive'}
                        </ul>
                    </div>
                </div>
            </a>
        );
    },
};
```
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

A function returning the UI you want to render based on your results. This function receives a list of parameters and expects to return a `JSX`.
Read more about it [here](#extending).
> Note:
>
> Either `renderItem` or `render` is required in ReactiveList for rendering the data.
### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can be used to render an error message in case of any error.
```jsx
renderError={(error) => (
        <div>
            Something went wrong!<br/>Error details<br/>{error}
        </div>
    )
}
```
### renderResultStats

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

renders custom result stats using a callback function that takes `stats` object as parameter and expects it to return a string or JSX. `stats` object contains following properties
-   **`numberOfResults`**: `number`
    Total number of results found
-   **`numberOfPages`**: `number`
    Total number of pages found based on current page size
-   **`currentPage`**: `number`
    Current page number for which data is being rendered
-   **`time`**: `number`
    Time taken to find total results (in ms)
-   **`displayedResults`**: `number`
    Number of results displayed in current view
-   **`hidden`**: `number`
    Total number of hidden results found
-   **`promoted`**: `number`
    Total number of promoted results found
```jsx
renderResultStats = {
    function(stats) {
        return `Showing ${stats.displayedResults} of total ${stats.numberOfResults} in ${
            stats.time
        } ms`;
    },
};
```
### renderNoResults

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

show custom message or component when no results found.
### renderPagination

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can be used to render custom pagination.

-   **`pages`**: `number`
    Number of pages to be displayed
-   **`totalPages`**: `number`
    Total number of pages found based on current page size
-   **`currentPage`**: `number`
    Current page number for which data is being rendered
-   **`setPage`**: `function`
    Function use to set the currentPage
-   **`fragmentName`**: `string`
    `componentId` of the Result component for setting url params for eg:

    ```jsx
    <a href={`?${fragmentName}=${pageNumber}`}>{pageNumber}</a>
    ```

```jsx
renderPagination={({ pages, totalPages, currentPage, setPage, setSize }) => {
        const selectPage = Number.isFinite(totalPages) && (
            <select
                value={currentPage + 1}
                onChange={e => setPage(parseInt(e.target.value, 10))}
            >
                {new Array(totalPages).fill(0).map((_, i) => (
                <option value={i}>{i + 1}</option>
                ))}
            </select>
        );
        return selectPage;
}
```
### renderExport

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

renders custom export options UI using a callback function that takes a object parameter as parameter and expects it to return a string or JSX. The parameter object contains following properties
-   **`triggerExportCSV`**: `function`
    callback to trigger export of data to a CSV document.
-   **`triggerExportJSON`**: `function`
    callback to trigger export of data to a JSON document.        
```jsx
renderExport={
    ({ 
        triggerExportCSV, 
        triggerExportJSON
    }) =>   (<div> Custom Export
                <button onClick={triggerExportCSV}>CSV 🔢</button>
                <button onClick={triggerExportJSON}>JSON ❤️</button>
            </div>)
    }
```
### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

gets triggered after data changes, which returns an object with these properties: `data`, `promotedData`, `customData`, `rawData`, `settings` & `resultStats`.
### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.
### onPageChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

executes when the current page is changed. If not defined, `window` will be scrolled to the top of the page.
### onPageClick

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

accepts a function which is invoked with the updated page value when a pagination button is clicked. For example if 'Next' is clicked with the current page number as '1', you would receive the value '2' as the function parameter.

> Note:
>
> The fundamental difference between `onPageChange` and `onPageClick` is that `onPageClick` is only called on a manual interaction with the pagination buttons, whereas, `onPageChange` would also be invoked if some other side effects caused the results to update which includes updating filters, queries or changing pages. The behaviour of these two may change in the future versions as we come up with a better API.

### distinctField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

This prop returns only the distinct value documents for the specified field. It is equivalent to the `DISTINCT` clause in SQL. It internally uses the collapse feature of Elasticsearch. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).


### distinctFieldConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

This prop allows specifying additional options to the `distinctField` prop. Using the allowed DSL, one can specify how to return K distinct values (default value of K=1), sort them by a specific order, or return a second level of distinct values. `distinctFieldConfig` object corresponds to the `inner_hits` key's DSL.  You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

```jsx
<ReactiveList
	....
	distinctField="authors.keyword"
	distinctFieldConfig={{
		inner_hits: {
			name: 'most_recent',
			size: 5,
			sort: [{ timestamp: 'asc' }],
		},
		max_concurrent_group_searches: 4,
	}}
/>
```

> Note: In order to use the `distinctField` and `distinctFieldConfig` props, the `enableAppbase` prop must be set to true in `ReactiveBase`.

### highlight

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Whether highlighting should be enabled in the returned results. Defaults to `false`.
### highlightConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

a function which returns the custom [highlight settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html). For example,

```jsx
<ReactiveList
    componentId="title"
    highlight
    highlightConfig={{
        'pre_tags': ['<mark>'],
        'post_tags': ['</mark>'],
        'fields': {
            'text': {},
            'title': {},
        },
        'number_of_fragments': 0,
    }}
/>
```

## Sub Components

### ResultCardsWrapper
A wrapper component for `ResultCard` components to render a card based layout.
Read more about the usage [here](/docs/reactivesearch/v3/result/resultcard/#usage).
### ResultListWrapper
A wrapper component for `ResultList` components to render a list based layout.
Read more about the usage [here](/docs/reactivesearch/v3/result/resultlist/#usage).

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ReactiveList" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`ReactiveList` component supports `innerClass` prop with the following keys:

-   `resultsInfo`
-   `sortOptions`
-   `resultStats`
-   `noResults`
-   `button`
-   `pagination`
-   `active`
-   `list`
-   `poweredBy`
-   `export`

Read more about it [here](/docs/reactivesearch/v3/theming/classnameinjection/).

## Extending

`ReactiveList` component can be extended to

1. customize the look and feel with `className`, `style`,
2. render individual result data items using `renderItem`,
3. render the entire data using `render`.
4. connect with external interfaces using `onQueryChange`.

```jsx
<ReactiveList
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  renderItem={
    function(res) {
      return(
        <div>
          { res.data }
        </div>
      )
    }
  }
  onQueryChange={
    function(prevQuery, nextQuery) {
      // use the query with other js code
      console.log('prevQuery', prevQuery);
      console.log('nextQuery', nextQuery);
    }
  }
/>
```

### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### style

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

CSS Styles to be applied to the **ReactiveList** component.
### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

a callback function where user can define how to render the view based on the data changes.
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
<br/>

It accepts an object with these properties:
-   **`loading`**: `boolean`
    indicates that the query is still in progress
-   **`error`**: `object`
    An object containing the error info
-   **`data`**: `array`
    An array of results obtained from combining `promoted` results along with the `hits`.
-   **`aggregationData`** `array`
    An array of aggregations buckets. Each bucket would have a `top_hits` property if you're using Elasticsearch top hits aggregations in `defaultQuery` prop.
    -   **`promotedData`**: `array`
    An array of promoted results obtained from the applied query. [Read More](/docs/search/rules/)
    > Note:
    >
    > `data` and `promotedData` results has a property called `_click_id` which can be used with triggerClickAnalytics to register the click analytics info.
-   **`customData`** `object`
    Custom data set in the query rule when appbase.io is used as backend. [Read More](/docs/search/rules/#custom-data)
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
-   **`settings`** `object`
    The settings object returned in ReactiveSearch API response which would contain the `queryId` property to record clicks and conversions analytics.
-   **`resultStats`**: `object`
    An object with the following properties which can be helpful to render custom stats:
    -   **`numberOfResults`**: `number`
        Total number of results found
    -   **`numberOfPages`**: `number`
        Total number of pages found based on current page size
    -   **`currentPage`**: `number`
        Current page number for which data is being rendered
    -   **`time`**: `number`
        Time taken to find total results (in ms)
    -   **`displayedResults`**: `number`
        Number of results displayed in current view
    -   **`hidden`**: `number`
        Total number of hidden results found
    -   **`promoted`**: `number`
        Total number of promoted results found
-   **`loadMore`**: `function`
    A callback function to be called to load the next page of results into the view. The callback function is only applicable in the case of infinite loading view (i.e. `infiniteScroll` prop set to `true`).
-   **`triggerClickAnalytics`**: `function`
    A function which can be called to register a click analytics. [Read More](docs/reactivesearch/v3/advanced/analytics/)
-   **`triggerExportCSV`**: `function`
    callback to trigger export of data to a CSV document.
-   **`triggerExportJSON`**: `function`
    callback to trigger export of data to a JSON document.  

```jsx
<ReactiveList
	showLoader={false} // Hides the default loader
	render={({ loading, error, data }) => {
		if (loading) {
			return <div>Fetching Results.</div>;
		}
		if (error) {
			return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
		}
		return (
			<ul>
				{data.map(item => (
					<li>
						{item.title}
						{/* Render UI */}
					</li>
				))}
			</ul>
		);
	}}
/>
```

Or you can also use render function as children

```jsx
<ReactiveList>
    {
        ({
            loading,
            error,
            data,
            promotedData,
            rawData,
            resultStats,
            handleLoadMore,
            triggerClickAnalytics
        }) => (
            // return UI to be rendered
        )
    }
</ReactiveList>
```


### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

> Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=Result%20components%2FReactiveList" target="_blank">ReactiveList with default props</a>
