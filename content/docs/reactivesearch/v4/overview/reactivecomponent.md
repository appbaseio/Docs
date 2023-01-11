---
title: 'ReactiveComponent'
meta_title: 'ReactiveComponent'
meta_description: 'ReactiveComponent lets you connect any React UI component with an Elasticsearch query or an aggregation seamlessly.'
keywords:
    - reactivesearch
    - reactivecomponent
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

ReactiveComponent lets you connect any React UI component with an Elasticsearch query or an aggregation seamlessly. It can be used as a standalone component to integrate Elasticsearch queries into your frontend UI declaratively. It can also be used in conjunction with other ReactiveSearch components. Read more [here](/docs/reactivesearch/v4/advanced/reactivecomponent/).

> How does this work?
>
> `ReactiveComponent` supports a defaultQuery prop, which can take any Elasticsearch Query DSL object, and provides a callback onData prop which is called on successful query execution by Elasticsearch and can be used to create a side-effect in your app. There is also a render prop which can be used to render any React UI component of your choice which will have access to the hits and aggregations from the defaultQuery.

### Usage
Let's suppose - we are building an e-commerce store for cars which displays a list of cars and 5 popular car brands in tabs UI as the user selects a tab the result gets updated with the cars of selected brand. Now if the user wants to select other brand from tab, the results should be updated to new selected brand. In this case, `ReactiveComponent` can be used with `defaultQuery` to achieve the desired behavior easily.

After selecting value from `ReactiveComponent` we will need to update result component with items satisfying the value, to achieve this we can take use of `react` prop. You can read more about the prop [here](/docs/reactivesearch/v4/advanced/reactprop/).

Check demo [here](https://codesandbox.io/s/7zrj740oj6).

```js
<ReactiveComponent
	componentId="Brand"
	showFilter
	defaultQuery={() => ({
		aggs: {
			'brand.keyword': {
				terms: {
					field: 'brand.keyword',
					order: {
						_count: 'desc',
					},
					size: 5,
				},
			},
		},
	})}
	render={data => {
		return <TabComponent dataField="brand.keyword" {...data} />;
	}}
/>
```

Here `TabComponent` is responsible to render the Tabs UI and handle the switching between tabs and displaying selected filters. We are using `render` prop to display the component which provides an object with different parameters that can be used in rendering the UI and dispatching a new query. Fow switching the tab we will use `onClick` event to fire a new query. We will make use of the following paramateres provided by `render` method:

### aggregations

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

`aggregations` prop contains the results from `aggs` Elasticsearch query of the component.
### setQuery

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

`setQuery` function sets the query of the component. It takes an object param of shape:

```javascript
{
    query: {}, // query of the component
    value: ''  // value of the component
}
```

### value

| Type | Optional |
|------|----------|
|  `any` |   Yes   |

`value` contains the current value of the component (which can be set via `setQuery()` function). This is used for URLParams and SelectedFilters.

**SelectedFilters with ReactiveComponent**
For showing selected filters we will use [`SelectedFilters`](/docs/reactivesearch/v4/advanced/selectedfilters/). When we use `ReactiveComponent` we will need to maintain `SelectedFilters` value manually. To clear the selected value of `ReactiveComponent` use `onClear` prop on `SelectedFilter` and pass `null` in `setQuery`.

**ReactiveComponent and React context**
If the CustomComponent contains multiple react components which need to access Elasticsearch data we can take use of react [`context`](https://reactjs.org/docs/context.html) in order to pass data through the component tree without having to pass props down manually at every level. We can refactor the above example to use multiple child components and pass the data using context. You can check the refactored app demo [here](https://codesandbox.io/s/o9popzr47y).

**ReactiveComponent with Ant Design Component**
You can also easily connect component from design system to index data using `ReactiveComponent`. Check the example [here](https://codesandbox.io/s/mmkjv990nj) which connects `Dropdown` component of `Antd` with index data.

**ReactiveComponent Query using helper method**

You can also take advantage of various ReactiveSearch components static method for generating query. So we our basically selecting a single tab so we can use `SingleList` static method to generate query as follow:

```js
<ReactiveComponent
	componentId="Brand"
	showFilter
	defaultQuery={() => ({
		...SingleList.generateQueryOptions({
			dataField: 'brand.keyword',
			size: 5,
			sortBy: 'count',
		}),
	})}
	render={data => {
		return <TabComponent dataField="brand.keyword" {...data} />;
	}}
/>
```

## Props
### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### style

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

CSS styles to be applied to the **DataSearch** component.
### distinctField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data). It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html). You can access `aggregationData` using `render` or `onData` prop as shown:

```javascript
<ReactiveComponent
    distinctField="original_title.keyword"
    render={({aggregationData}) => {...}}
    onData={({aggregationData}) => {...}}
/>
```

> If you are using an app with elastic search version less than 6, then defining this prop will result in error.

> It is possible to override this query by providing `defaultQuery` or `customQuery`.

### aggregationSize
To set the number of buckets to be returned by aggregations.

> Note: This is a new feature and only available for appbase versions >= 7.41.0.

### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

**returns** the default query to be applied to the component, as defined in Elasticsearch Query DSL.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

**returns** the custom query to be applied to the component, as defined in Elasticsearch Query DSL.
Custom query can be used to change the component's behavior for its subscribers.
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

callback function which provides `data`, `rawData`, `aggregationData` and `aggregations` as function params.
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
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

`react` prop is available in components whose data view should reactively update when on or more dependent components change their states, e.g. [`ReactiveMap`](/docs/reactivesearch/v4/map/reactivegooglemap/), [`ReactiveList`](/docs/reactivesearch/v4/result/reactivelist/).

-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.

### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.
### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.


### endpoint

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

endpoint prop provides the ability to query a user-defined backend service for this component, overriding the data endpoint configured in the ReactiveBase component. 

Accepts the following properties:
- url `String` [Required]
    URL where the data cluster is hosted.
- headers `Object` [optional]        
    set custom headers to be sent with each server request as key/value pairs.
- method `String` [optional]    
    set method of the API request.
- body `Object` [optional]    
    request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.

> - Overrides the endpoint property defined in ReactiveBase.
> - If required, use `transformResponse` prop to transform response in component-consumable format.
    

### Demo
**ReactiveComponent with defaultQuery**
<br/>

<iframe src="https://codesandbox.io/embed/7zrj740oj6" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

**ReactiveComponent with defaultQuery and React context**
<br/>

<iframe src="https://codesandbox.io/embed/o9popzr47y" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

**ReactiveComponent with defaultQuery and Antd component**
<br/>

<iframe src="https://codesandbox.io/embed/mmkjv990nj" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<a href="https://opensource.appbase.io/playground/?selectedKind=Base%20components%2FReactiveComponent&selectedStory=A%20custom%20component" target="_blank">A custom component using ReactiveComponent</a>
