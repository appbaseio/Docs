---
title: 'ReactiveChart'
meta_title: 'ReactiveChart'
meta_description: '`ReactiveChart` creates chart UI connected to a database field.'
keywords:
    - reactivesearch
    - reactivechart
    - appbase
    - elasticsearch
    - pie
    - bar
    - line
    - scatter
    - histogram
    - chart
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/4TxrKmi.png)

`ReactiveChart` is a generic component to render any chart UI supported by [Echarts](https://echarts.apache.org/). Additionally, it supports pre-built charts (`pie`, `bar`, `line`, `histogram` and `scatter`) to cover some most common chart use-cases which can be configured using declarative props.

Example uses:

-   A histogram chart to display the price distribution in an e-commerce app, range selection can filter the products,
-   A custom stacked bar chart to display the distribution of multiple data fields, 
-   A pie chart to show the language distribution for a book store app, section selection can filter the books.

## Usage

### Basic Usage

```jsx
    <ReactiveChart
        // unique id for component
        componentId="language"
        // Chart title
        title="Languages"
        // Query to fetch chart data
        defaultQuery={() => ({
            aggs: {
                years: {
                    terms: {
                        field: 'release_year',
                    },
                },
            },
        })}
        // Define E-chart options
        setOption={({ rawData }) => {
            const buckets = (rawData && rawData.aggregations && rawData.aggregations.years.buckets) || [];
            return ({
                xAxis: {
                    data: buckets.map(bucket => bucket.key),
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: buckets.map(bucket => bucket.doc_count),
                    },
                ],
            });
        }}
    />
```

### Usage With All Props

```jsx
    <ReactiveChart
        title="Custom Chart"
        componentId="custom_chart"
        useAsFilter={true}
        defaultQuery={() => ({
            aggs: {
                years: {
                    terms: {
                        field: 'release_year',
                    },
                },
            },
        })}
        setOption={({ rawData }) => {
            const buckets = (rawData && rawData.aggregations && rawData.aggregations.years.buckets) || [];
            return ({
                xAxis: {
                    data: buckets.map(bucket => bucket.key),
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: buckets.map(bucket => bucket.doc_count),
                    },
                ],
            });
        }}
        // When useAsFilter is `true` then we have to define customQuery
        customQuery={
            value => (value ? {
						query: {
							term: {
								release_year: value.mainLabel,
							},
						},
                    } : 
            { 
                query: { 
                    match_all: {} 
                } 
            }
        )}         
    />
```

## Props

### componentId `String`
unique identifier of the component, can be referenced in other components' `react` prop.
<br />

### defaultQuery `Function`
takes **value** and **props** as parameters and **returns** the data query to retrieve the chart data, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
Read more about it [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).

### setOption `Function`
`ReactiveChart` uses the [Echarts](https://echarts.apache.org/) library to render the UI. `ReactiveChart` component connects the search backend to retrieve the chart data. The `setOption` prop allows you to define the custom chart option support by [Echarts](https://echarts.apache.org/) to render any kind of chart UI. It accepts the an object containing the following properties:
- `aggregationData` An array of aggregation buckets
- `data` An array of search hits
- `rawData` Search backend data in raw form
- `value` Current selected value in chart UI

### customQuery `Function` [optional*] (Required when `useAsFilter` is `true`)
is a callback function which accepts component's current **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.

> Note: customQuery is called on value changes in the **ReactiveChart** component as long as the component is a part of `react` dependency of at least one other component.

### endpoint `Object` [optional] 
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

### dataField `String` [optional*]

data field to be connected to the component's UI view. The chart data is filtered by a database query on this field. This field is used for doing an aggregation and returns the result.

> Note: The `dataField` property is only required when using pre-built charts.

### chartType `String`

Pre-built chart types supported by `ReactiveChart`. Valid options are: `pie`, `line`, `bar`, `histogram`, `scatter` and `custom` (default).

### useAsFilter `Boolean` [optional]
If set to `false` then data selection on chart UI would not filter the results. Defaults to `true`.

### loader `String or JSX` [optional]

to display an optional loader while fetching the options.

### showFilter `Boolean` [optional]

show as filter when a value is selected in a global selected filters view. Defaults to `true`.

### filterLabel `String` [optional]

An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.

### URLParams `Boolean` [optional]

enable creating a URL query string parameter based on the selected value of the chart. This is useful for sharing URLs with the component state. Defaults to `false`.

### renderError `String or JSX or Function` [optional]
can be used to render an error message in case of any error.

```jsx
    renderError={(error) => (
            <div>
                Something went wrong!<br/>Error details<br/>{error}
            </div>
        )
    }
```
### index `String` [optional]
The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

> Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

## Demo

### Custom Chart
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ReactiveChart/StackedBarChart" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
<br />

### Pre-Built Chart (Pie)
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ReactiveChart/Pie" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
<br />

## Extending

`ReactiveChart` component can be extended to

1. specify how chart data should be filtered or updated using `react` prop.
### react `Object`
specify dependent components to reactively update **ReactiveChart's** options.
-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.
