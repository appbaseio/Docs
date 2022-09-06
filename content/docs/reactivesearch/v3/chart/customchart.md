---
title: 'Custom Chart'
meta_title: Custom Chart'
meta_description: '`Custom Chart` example using ReactiveChart'
keywords:
    - reactivesearch
    - appbase
    - elasticsearch
    - chart
    - reactivechart
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/4TxrKmi.png)

The following guide explains the [ReactiveChart](docs/reactivesearch/v3/chart/reactivechart) usage with `custom` chart.

We can edit pre-defined charts using `setOption` and other methods available. But to have full-control over rendering charts and interactions such as (`onClick`) then we can set `chartType` as `custom`.

## Usage

### Basic Usage

```jsx
    <ReactiveChart
        chartType="custom"
        componentId="custom_chart"
        // By default useAsFilter is true
        useAsFilter={false}
        // Required when chartType is custom
        defaultQuery={()=>({})}
        setOption={()=>({})}
    />
```

### Usage With All Props

```jsx
    <ReactiveChart
        chartType="custom"
        componentId="custom_chart"
        // Required when chartType is custom
        defaultQuery={()=>({})}
        setOption={()=>({})}
        useAsFilter={true}
        // When useAsFilter we have to define customQuery
        customQuery={()=>({})}
    />
```

## Validations

- When `chartType` is `custom` we need to set `defaultQuery` and `setOption`. If they are `undefined` then it is considered as an error.
- When `chartType` is `custom` and we also set `useAsFilter` to `true` then we need to defined `customQuery`, otherwise it's an error.

## Props

-   **componentId** `String`

    unique identifier of the component, can be referenced in other components' `react` prop.
    <br />

-   **chartType** `String`

    Pre-built chart types supported by `ReactiveChart`. Should be set to `custom`.

-   **useAsFilter** `Boolean` [optional]
    If set to `false` then data selection on chart UI would not filter the results. Defaults to `true`.

-   **defaultQuery** `Function`
    takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
    Read more about it [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).

-   **setOption** `Function`
    `ReactiveChart` uses the [Echarts](https://echarts.apache.org/) library to render the UI. `ReactiveChart` component connects the search backend to retrieve the chart data. The `setOption` prop allows you to define the custom chart option support by [Echarts](https://echarts.apache.org/) to render any kind of chart UI. It accepts the an object containing the following properties:
    - `aggregationData` An array of aggregation buckets
    - `data` An array of search hits
    - `rawData` Search backend data in raw form
    - `value` Current selected value in chart UI

-   **customQuery** `Function` [Optional] (Required when `useAsFilter` is `true`)
    is a callback function which accepts component's current **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
    `Note:` customQuery is called on value changes in the **ReactiveChart** component as long as the component is a part of `react` dependency of at least one other component.


## Demo

<br />
Here is a complete example using all the options.

```js
    <ReactiveChart
        componentId="stackedBarChart"
        dataField="release_year"
        chartType="custom"
        filterLabel="Language"
        URLParams
        title="Languages"
        defaultQuery={() => ({
            aggs: {
                years: {
                    terms: {
                        field: 'release_year',
                    },
                    aggs: {
                        genres: {
                            terms: {
                                field: 'genres_data.keyword',
                            },
                        },
                    },
                },
            },
        })}
        setOption={({ rawData }) => {
            const releaseYearGenresTable = {};
            const genresReleaseYearTable = {};
            const aggs = rawData ? rawData.aggregations : null;
            // eslint-disable-next-line no-unused-expressions
            if (aggs) {
                aggs.years.buckets.forEach((doc) => {
                    const releaseYear = doc.key;
                    releaseYearGenresTable[releaseYear] = {};
                    doc.genres.buckets.forEach((genres) => {
                        genres.key.split(',').forEach((genre) => {
                            // genres might be a comma separated value
                            if (releaseYearGenresTable[releaseYear][genre]) {
                                releaseYearGenresTable[releaseYear][genre]
                                    += genres.doc_count;
                            } else {
                                releaseYearGenresTable[releaseYear][genre] = 0;
                                releaseYearGenresTable[releaseYear][genre]
                                    = genres.doc_count;
                            }
                        });
                    });
                });
                Object.keys(releaseYearGenresTable).forEach((year) => {
                    Object.keys(releaseYearGenresTable[year]).forEach((genre) => {
                        if (!genresReleaseYearTable[genre]) {
                            genresReleaseYearTable[genre] = {};
                        }
                        genresReleaseYearTable[genre][year]
                            = releaseYearGenresTable[year][genre];
                    });
                });
            }
            return {
                legend: {},
                xAxis: {
                    data: Object.keys(releaseYearGenresTable).map(k => k),
                },
                yAxis: {},
                series: Object.keys(genresReleaseYearTable).map(genre => ({
                    data: Object.keys(genresReleaseYearTable[genre])
                        .sort()
                        .map(year => genresReleaseYearTable[genre][year]),
                    stack: 'x',
                    type: 'bar',
                    name: genre,
                })),
            };
        }}
        customQuery={value =>
            (value && value.secondaryLabel && value.mainLabel
                ? {
                    query: {
                        bool: {
                            must: [
                                {
                                    term: {
                                        release_year: value.mainLabel,
                                    },
                                },
                                {
                                    term: {
                                        'genres_data.keyword': value.secondaryLabel,
                                    },
                                },
                            ],
                        },
                    },
                    }
                : {
                    query: {
                        match_all: {},
                    },
                    })
        }
    />
```

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ReactiveChart/StackedBarChart" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
