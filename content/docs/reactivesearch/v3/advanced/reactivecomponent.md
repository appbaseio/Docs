---
title: 'ReactiveComponent'
meta_title: 'ReactiveComponent'
meta_description: 'With `ReactiveComponent`, you can convert any React Component into a Reactivesearch component.'
keywords:
    - reactivesearch
    - reactivecomponent
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

We have built this library keeping you, the developer, in mind. If you're here, it is obvious that you want to create a custom component that is reactive in nature. Perhaps, you already have a component in your design kit and want it to work seamlessly with Reactivesearch.

With `ReactiveComponent`, you can convert any React Component into a Reactivesearch component i.e. your react component will be able to talk to other Reactivesearch components and connect with your elasticsearch cluster seamlessly.

> How does this work?
>
> `ReactiveComponent` is a wrapper component that allows you to connect custom component(s) (passed as children) with the Reactivesearch ecosystem.

### Usage with defaultQuery

For example, let's suppose that we are building an e-commerce store where we have a react component called `ColorPicker` which renders the `colors` passed to it as tiles, allowing us to filter the products by their colors.

![ColorPicker](https://i.imgur.com/wuKhCTT.png)

```javascript{2}
<ColorPicker
    colors={['#000', '#666', '#fff']}
    onChange={this.handleColorChange}
>
```

Now, let's assume that we have all these hex-codes stored as `keywords` in an Elasticsearch index. To display each unique color tile, we can run a `terms` aggregations query. The `defaultQuery` prop of ReactiveComponent allows us to do this and pass the results to a child component.

```javascript
<ReactiveComponent
	componentId="myColorPicker" // a unique id we will refer to later
	defaultQuery={() => ({
		aggs: {
			color: {
				terms: {
					field: 'color',
				},
			},
		},
	})}
	render={({ aggregations, setQuery }) => (
		<ColorPickerWrapper aggregations={aggregations} setQuery={setQuery} />
	)}
/>
```

> Note
>
> It is also possible to use render function as children

The above snippet runs the `defaultQuery` passed to the ReactiveComponent when the component gets mounted and consequently pass the query results to the `ColorPickerWraper` component (i.e. child component of ReactiveComponent) as the following two props: `data` and `aggregations`.

```javascript
class ColorPickerWrapper extends React.Component {
	render() {
		let colors = [];

		if (
			// checking for when component gets the aggregation results
			this.props.aggregations &&
			this.props.aggregations.colors &&
			this.props.aggregations.colors.buckets.length
		) {
			colors = this.props.aggregations.map(color => color.key);
		}

		return (
			<ColorPicker
				colors={colors}
				onChange={() => {
					// handles color change
					// we will define this in the next step
				}}
			/>
		);
	}
}
```

Up until this point, we have figured out how to display the colored tiles by running an Elasticsearch query and passing the results to our `ColorPickerWrapper` component.

But we also need to be able to filter the products by a color tile when selected by the end-user. This is where `setQuery()` prop comes in handy. It takes an object param of shape:

```javascript
{
    query: {},
    value: ''
}
```

where,

-   **query** - is the query of the component,
-   **value** - can be an array, string or number (This will be shown in selected filters and URLParams if active. In our case, this is the hex-code of the selected color tile)

In our current example, we would simply have to call `this.props.setQuery()` with the updated query and value of the component:

```javascript
class ColorPickerWrapper extends React.Component {
	render() {
		let colors = [];

		if (
			// checking for when component gets the aggregation results
			this.props.aggregations &&
			this.props.aggregations.colors &&
			this.props.aggregations.colors.buckets.length
		) {
			colors = this.props.aggregations.map(color => color.key);
		}

		return (
			<ColorPicker
				colors={colors}
				onChange={newColor => {
					// handles color change
					const query = {
						query: {
							term: { color: newColor },
						},
					};

					this.props.setQuery({
						query,
						value: newColor,
					});
				}}
			/>
		);
	}
}
```

Now, the components which will have `myColorPicker` present in their `react` prop can react to the changes in the ColorPicker component based on the query passed to the setQuery method. You can check a [similar example implementation here](https://github.com/appbaseio/reactivesearch/blob/dev/packages/web/examples/ReactiveComponent/src/index.js).

### Usage with customQuery

Let's suppose - we are building an e-commerce store for cars which displays a list of cars of a particular brand on their separate page as `example.com/cars/nissan`. Now, we want all the filters on that page (like pricing, type of car, model, year, etc) to only show the data relevant to the given brand (i.e. `nissan`). In this case, `ReactiveComponent` can be used with `customQuery` to achieve the desired behavior easily.

We can then use the given ReactiveComponent to be watched by all the filters (via `react` prop) to avail the desired brand based filtering for all the filters.

Check demo [here](https://codesandbox.io/s/3ylrrr0r5q).

#### Parameters available in render prop function

-   **loading** `boolean`
    indicates that the query is still in progress
-   **error**: `object`
    An object containing the error info
-   **data** `Array`
    `data` prop is an array of parsed results(promoted + hits) from the Elasticsearch query of the component.
-   **rawData** `Object`
    An object of raw response as-is from elasticsearch query.
-   **promotedData**: `array`
    An array of promoted results obtained from the applied query. [Read More](/docs/search/rules/).
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
-   **aggregations** `Object`
    `aggregations` prop contains the results from `aggs` Elasticsearch query of the component.
-   **setQuery** `function`
    `setQuery` function sets the query of the component. It takes an object param of shape:

```javascript
    {
        query: {}, // query of the component
		value: '',  // value of the component
		options: {}, // query options for e.g size, timeout & includeFields etc.
    }
```

-   **value** `any`
    `value` contains the current value of the component (which can be set via `setQuery()` function). This is used for URLParams and SelectedFilters.

### Props

-   **className** `String`
    CSS class to be injected on the component container.
-   **style** `Object`
    CSS styles to be applied to the **DataSearch** component.
-   **aggregationField** `String` [optional]
    One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data). It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
    You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html). You can access `aggregationData` using `render` or `onData` prop as shown:

    ```javascript
    <ReactiveComponent
        aggregationField="original_title.keyword"
        render={({aggregationData}) => {...}}
        onData={({aggregationData}) => {...}}
    />
    ```

    > If you are using an app with elastic search version less than 6, then defining this prop will result in error.

    > It is possible to override this query by providing `defaultQuery` or `customQuery`.

	> Note: This prop has been marked as deprecated starting v3.18.0. Please use the `distinctField` prop instead.

-   **aggregationSize**
    To set the number of buckets to be returned by aggregations.

    > Note: This is a new feature and only available for appbase versions >= 7.41.0.
-   **defaultQuery** `Function`
    **returns** the default query to be applied to the component, as defined in Elasticsearch Query DSL.
-   **customQuery** `Function`
    **returns** the custom query to be applied to the component, as defined in Elasticsearch Query DSL.
    Custom query can be used to change the component's behavior for its subscribers.
-   **onQueryChange** `Function`
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
-   **onData** `Function`
    callback function which provides `data`, `rawData`, `promotedData`, `aggregationData`, `resultStats` and `aggregations` as function params.
-   **showFilter** `Boolean` [optional]
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
-   **filterLabel** `String` [optional]
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
-   **react** `Object`
    `react` prop is available in components whose data view should reactively update when on or more dependent components change their states, e.g. [`ReactiveMap`](/docs/reactivesearch/v3/map/reactivegooglemap/), [`ReactiveList`](/docs/reactivesearch/v3/result/reactivelist/).

    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.

-   **URLParams** `Boolean` [optional]
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

-   **distinctField** `String` [optional]
	This prop returns only the distinct value documents for the specified field. It is equivalent to the `DISTINCT` clause in SQL. It internally uses the collapse feature of Elasticsearch. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).


-   **distinctFieldConfig** `Object` [optional]
	This prop allows specifying additional options to the `distinctField` prop. Using the allowed DSL, one can specify how to return K distinct values (default value of K=1), sort them by a specific order, or return a second level of distinct values. `distinctFieldConfig` object corresponds to the `inner_hits` key's DSL.  You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

```jsx
<ReactiveComponent
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

-   **endpoint** `Object` [optional] 
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
        

### Examples

**ReactiveComponent with defaultQuery**
<br/>

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/dev/packages/web/examples/ReactiveComponent" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

**ReactiveComponent with customQuery**
<br/>

<iframe src="https://codesandbox.io/embed/3ylrrr0r5q" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

See storybook for ReactiveComponent on playground.

<a href="https://opensource.appbase.io/playground/?selectedKind=Base%20components%2FReactiveComponent&selectedStory=A%20custom%20component" target="_blank">A custom component using ReactiveComponent</a>
