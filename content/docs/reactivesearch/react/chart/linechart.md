---
title: 'Line Chart'
meta_title: Line Chart'
meta_description: '`Line Chart` example using ReactiveChart'
keywords:
    - reactivesearch
    - appbase
    - elasticsearch
    - chart
    - pie
    - reactivechart
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/DQvhVov.png)

The following guide explains the [ReactiveChart](/docs/reactivesearch/react/chart/reactivechart) usage with line chart.

## Usage

### Basic Usage
```jsx
    <ReactiveChart
        // pre-built chart type
        chartType="line"
        // unique id for component
        componentId="language"
        // Database field to connect
        dataField="language_code.keyword"
        // Chart title
        title="Languages"
    />
```

### Usage With All Props
```jsx
    <ReactiveChart
        componentId="Language"
        compoundClause="filter"
        dataField="language_code.keyword"
        chartType="line"
        title="Languages"
        size={100}
        index="good-books-ds"
        sortBy="count"
        react={{
            and: ['SearchFilter'],
        }}
        useAsFilter={true}
        showFilter={true}
        filterLabel="Language"
        URLParams
        loader="Loading ..."
        renderError={error => <div>Something went wrong! {error}</div>}
        // event callbacks
        onClick={(item) => {}}
        onDblClick={(item) => {}}
        onMouseDown={(item) => {}}
        onMouseUp={(item) => {}}
        onMouseMove={(item) => {}}
        onMouseOut={(item) => {}}
        onGlobalOut={(item) => {}}
        onContextMenu={(item) => {}}
        onError={(error) => {}}
    />
```

## Props

### componentId

| Type | Optional |
|------|----------|
|  `String` |   No   |

unique identifier of the component, can be referenced in other components' `react` prop.

### compoundClause

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use `must`. Setting the compound clause to filter allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. term, geo or range type of queries that act as filters on the data)

This property only has an effect when the search engine is either elasticsearch or opensearch.


> Note: `compoundClause` is supported with v8.16.0 (server) as well as with serverless search.

### dataField

| Type | Optional |
|------|----------|
|  `String` |   No   |

data field to be connected to the component's UI view. The chart data is filtered by a database query on this field. This field is used for doing an aggregation and returns the result.

### chartType

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Pre-built chart types supported by `ReactiveChart`. Valid options are: `pie`, `line`, `bar`, `histogram`, `scatter` and `custom` (default).

### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |


title of the component to be shown in the UI.

### loader

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |


to display an optional loader while fetching the options.

### size

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

number of items to be displayed.

> Note: 
> 1. Appbase users should use the `aggregationSize` prop instead. The `size` prop would only set the size for `hits` not the `aggregations`.
> 2. We recommend Appbase users to not use the `size` prop unless they are using `hits` because it can impact the query performance.

### aggregationSize
To set the number of buckets to be returned by aggregations.



### sortBy

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


sort the items by one of `count`, `asc`, `desc`. Defaults to `count`, which sorts the by the frequency of count value, most first.

### showMissing

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


defaults to `false`. When set to `true` it also retrives the aggregations for missing fields under the label specified by `missingLabel`.

### missingLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


defaults to `N/A`. Specify a custom label to show when `showMissing` is set to `true`.

### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show as filter when a value is selected in a global selected filters view. Defaults to `true`.

### filterLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.

### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


enable creating a URL query string parameter based on the selected value of the chart. This is useful for sharing URLs with the component state. Defaults to `false`.

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
### value

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

controls the current value of the component. It selects the item from the chart UI (on mount and on update). Use this prop in conjunction with `onChange` function.

### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` props and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms/#controlled-components) behavior.

### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.

### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.


### xAxisName

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Label for x axis line
### yAxisName

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Label for y axis line
### useAsFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If set to `false` then data selection on chart UI would not filter the results. Defaults to `true`.
## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ReactiveChart/Line" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Extending

`ReactiveChart` component can be extended to

1. Customize the chart UI using `setOption`,
2. update the underlying DB query with `customQuery`, `defaultQuery`,
3. specify how options should be filtered or updated using `react` prop.

```jsx
    <ReactiveChart
        // To customize the query to fetch chart data
        defaultQuery={(value, props) => ({
            "aggs": {
                "language_code": {
                    "terms": {
                        "field": "language_code"
                    }
                }
            }
        })}
         // To customize the query to filter results based on value selection
        customQuery={(value, props) => ({
            "query": {
                "term": {
                    [props.dataField]: value
                }
            }
        })}
        // Customize the chart UI, set custom echart option
        setOption={({ aggregationData }) => ({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: aggregationData.map(item => ({
                        value: item.doc_count,
                        name: item.key,
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        })}
        // specify how and which options are filtered using `react` prop.
        react={
            "and": ["pricingFilter", "dateFilter"],
            "or": ["searchFilter"]
        }
    />
```

### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **ReactiveChart** component as long as the component is a part of `react` dependency of at least one other component.
### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
Read more about it [here](/docs/reactivesearch/react/advanced/customqueries/#when-to-use-default-query).
### setOption

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

`ReactiveChart` uses the [Echarts](https://echarts.apache.org/) library to render the UI. `ReactiveChart` component connects the search backend to retrieve the chart data. The `setOption` prop allows you to define the custom chart option support by [Echarts](https://echarts.apache.org/) to render any kind of chart UI. It accepts the an object containing the following properties:
- `aggregationData` An array of aggregation buckets
- `data` An array of search hits
- `rawData` Search backend data in raw form
- `value` Current selected value in chart UI
For example,
```js
    setOption={({ data, aggregationData, rawData, value }) => ({
        title: {
            text: "Languages"
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: aggregationData.map(item => ({
                    value: item.doc_count,
                    name: item.key,
                })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    })}
```
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

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
