---
title: 'MultiList'
meta_title: 'MultiList'
meta_description: '`MultiList` creates a multiple selection based list UI component that is connected to a database field.'
keywords:
    - reactivesearch
    - multilist
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/2OFmUsk.png)

`MultiList` creates a multiple selection based list UI component that is connected to a database field. It is similar to a [SingleList](/docs/reactivesearch/vue/list/SingleList/) except it can support multiple item selections.

Example uses:

-   select category items from a list of categories in an e-commerce website.
-   selecting airlines to fly by in a flight booking experience.

## Usage

### Basic Usage

```html
<template>
	<multi-list
		componentId="CitySensor"
		dataField="group.group_city.raw"
		title="Cities"
	/>
</template>
```

### Usage With All Props

```html
<template>
	<multi-list
		componentId="CitySensor"
		dataField="group_city.raw"
		title="Cities"
		sortBy="asc"
		queryFormat="or"
		selectAllLabel="All Cities"
		placeholder="Search City"
		filterLabel="City"
		:showFilter="true"
		:showCheckbox="true"
		:showCount="true"
		:showSearch="true"
		:defaultSelected="['San Francisco']"
		:react="{ and: ['CategoryFilter', 'SearchFilter'] }"
		:size="100"
		:URLParams="false"
	/>
</template>
```

## Props

-   **componentId** `String`
    unique identifier of the component, can be referenced in other components' `react` prop.
-   **dataField** `String`
    data field to be connected to the component's UI view. This field is used for doing an aggregation and returns the result. We're using a `.raw` multifield here. You can use a field of type `keyword` or `not_analyzed` depending on your Elasticsearch cluster.
-   **nestedField** `String` [optional]
    use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
-   **title** `String or JSX` [optional]
    title of the component to be shown in the UI. Defaults to no title being shown.
-   **size** `Number` [optional]
    number of list items to be displayed. Defaults to showing a `100` items. Max value for this prop can be `1000`.
-   **sortBy** `String` [optional]
    sort the list items by one of `count`, `asc`, or `desc`. Defaults to `count`, which sorts the list by the frequency of count value, most first.
-   **defaultSelected** `Array` [optional]
    pre-select one or more list items. Accepts an `Array` object containing the items that should be selected. It is important for the passed value(s) to exactly match the field value(s) as stored in the DB.
-   **queryFormat** `String` [optional]
    queries the selected items from the list in one of two modes: `or`, `and`.
    -   Defaults to `or` which queries for results where any of the selected list items are present.
    -   In `and` mode, the applied query filters results where all of the selected items are present.
-   **selectAllLabel** `String` [optional]
    add an extra `Select all` item to the list with the provided label string.
-   **showCheckbox** `Boolean` [optional]
    show checkbox icon for each list item. Defaults to `true`.
-   **showCount** `Boolean` [optional]
    show a count of the number of occurences besides each list item. Defaults to `true`.
-   **showFilter** `Boolean` [optional]
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
-   **filterLabel** `String` [optional]
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
-   **renderItem** `Function|slot-scope` [optional]
    customize the rendered list via a function or slot-scope which receives the item label, count and isChecked & expects a JSX or String back. For example:

<!-- prettier-ignore -->
```html
<multi-list>
	<div
        slot="renderItem" 
        slot-scope="{ label, count }"
    >
		{{label}}
		<span :style="{ marginLeft: 5, color: 'dodgerblue' }">
			{{count}}
		</span>
	</div>
</multi-list>
```

-   **render** `Function|slot-scope` [optional]
    an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
    <br/>
    It accepts an object with these properties:

    -   **`loading`**: `boolean`
        indicates that the query is still in progress
    -   **`error`**: `object`
        An object containing the error info
    -   **`data`**: `array`
        An array of results obtained from the applied query.
    -   **`value`**: `array`
        current selected values.
    -   **`handleChange`**: `function`
        A callback function can be used to mark the list value as selected.

You can use render as a slot as shown below:

<!-- prettier-ignore -->
```html
<multi-list 
    :showSearch="false" 
    componentId="BookSensor" 
    data-field="original_series.raw"
>
	<div 
        class="suggestions" 
        slot="render" 
        slot-scope="{ data, handleChange }"
    >
		<ul>
			<li
				style="{ background-color: highlightedIndex ? 'grey' : 'transparent' }"
				v-for="suggestion in (data || [])"
				:key="suggestion._id"
				v-on:click="handleChange(suggestion.key)"
			>
				{{ suggestion.key }}
			</li>
		</ul>
	</div>
</multi-list>
```

-   **renderError** `String|Function|slot-scope` [optional]
    can be used to render an error message in case of any error.

<!-- prettier-ignore -->
```html
<template 
    slot="renderError" 
    slot-scope="error"
>
	<div>Something went wrong!<br />Error details<br />{{ error }}</div>
</template>
```

-   **transformData** `Function` [optional]
    allows transforming the data to render inside the list. You can change the order, remove, or add items, transform their values with this method. It provides the data as param which is an array of objects of shape { key: <string>, doc_count: <number> } and expects you to return the array of objects of same shape.
-   **showMissing** `Boolean` [optional]
    defaults to `false`. When set to `true` it also retrives the aggregations for missing fields under the label specified by `missingLabel`.
-   **missingLabel** `String` [optional]
    defaults to `N/A`. Specify a custom label to show when `showMissing` is set to `true`.
-   **showSearch** `Boolean` [optional]
    whether to show a searchbox to filter the list items locally. Defaults to true.
-   **placeholder** `String` [optional]
    placeholder to be displayed in the searchbox, only applicable when the `showSearch` prop is set to `true`. When applicable, the default placeholder value is set to "Search".
-   **URLParams** `Boolean` [optional]
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/multi-list" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`MultiList` component supports `innerClass` prop with the following keys:

-   `title`
-   `input`
-   `list`
-   `checkbox`
-   `label`
-   `count`

Read more about it [here](/docs/reactivesearch/vue/theming/ClassnameInjection).

## Extending

`MultiList` component can be extended to

1. customize the look and feel with `className`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `valueChange` and `queryChange`,
4. specify how options should be filtered or updated using `react` prop.

```html
<template>
	<multi-list
		className="custom-class"
		:customQuery="getCustomQuery"
		:react="react"
		:beforeValueChange="handleBeforeValueChange"
		@valueChange="handleValueChange"
		@queryChange="handleQueryChange"
	/>
</template>
<script>
	export default {
		name: 'app',
		methods: {
			getCustomQuery: (value, props) => {
				return {
					query: {
						match: {
							data_field: 'this is a test',
						},
					},
				};
			},
			handleBeforeValueChange: value => {
				// called before the value is set
				// returns a promise
				return new Promise((resolve, reject) => {
					// update state or component props
					resolve();
					// or reject()
				});
			},
			handleValueChange: value => {
				console.log('current value: ', value);
				// set the state
				// use the value with other js code
			},
			handleQueryChange: (prevQuery, nextQuery) => {
				// use the query with other js code
				console.log('prevQuery', prevQuery);
				console.log('nextQuery', nextQuery);
			},
		},
		computed: {
			react() {
				return {
					and: ['pricingFilter', 'dateFilter'],
					or: ['searchFilter'],
				};
			},
		},
	};
</script>
```

-   **className** `String`
    CSS class to be injected on the component container.
-   **customQuery** `Function`
    takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
    `Note:` customQuery is called on value changes in the **MultiList** component as long as the component is a part of `react` dependency of at least one other component.
    `Note:` When extending with customQuery, the `queryFormat` prop has no affect.
-   **defaultQuery** `Function`
    takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL.
    `Note:` defaultQuery doesn't get leaked to other components.
-   **beforeValueChange** `Function`
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
-   **react** `Object`
    specify dependent components to reactively update **MultiList's** options.
    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.

## Events

-   **queryChange**
    is an event which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This event is handy in cases where you want to generate a side-effect whenever the component's query would change.
-   **valueChange**
    is an event which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This event is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a list item is selected in a "Discounted Price" SingleList.

-   **error**
    gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.

## Examples

<a href="https://reactivesearch-vue-playground.netlify.com/?selectedKind=List%20Components%2FMulitList&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0" target="_blank">MulitList with default props</a>
