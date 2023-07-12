---
title: 'DynamicRangeSlider'
meta_title: 'DynamicRangeSlider'
meta_description: '`DynamicRangeSlider` creates a numeric range slider UI component.'
keywords:
    - reactivesearch
    - dynamicrangeslider
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-v1-reactivesearch'
---

![DynamicRangeSlider Image](https://i.imgur.com/Dd5cPaS.png)

`DynamicRangeSlider` creates a numeric range slider UI component. It is used for granular filtering of numeric data.

Example uses:

-   filtering products from a price range in an e-commerce shopping experience.
-   filtering flights from a range of departure and arrival times.

## Usage

### Basic Usage
```html
<template>
	<dynamic-range-slider
		dataField="books_count"
		componentId="BookSensor"
		title="DynamicRangeSlider: Ratings"
	/>
</template>
```

While `DynamicRangeSlider` only requires the above props to be used, it comes with many additional props for pre-setting default range values, setting the step value of the range slider, specifying labels for the range endpoints, etc.

### Usage With All Props
```html
<template>
	<dynamic-range-slider
		dataField="books_count"
		componentId="BookSensor"
		title="DynamicRangeSlider: Ratings"
		:defaultValue="function(min, max){
		  return {
		      start: min + 1000,
		      end: max - 1000,
		  }
		}"
		:rangeLabels="function(min, max){
		  return {
		      start: min + ' Books',
		      end: max + ' Books',
		  }
		}"
		:showFilter="true"
		:URLParams="false"
		:endpoint="{
			url:'https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3',
			headers: {
				// put relevant headers
			},
			method: 'POST'
		}"		
	/>
</template>
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
|  `Object` |   Yes   |

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

DB data field to be mapped with the component's UI view. The selected range creates a database query on this field.
### nestedField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |

title of the component to be shown in the UI.
### defaultValue

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

a function that accepts `min` and `max` range values as parameters and returns an object representing current selection from the range with `start` and `end` keys.
### value

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

sets the current value of the component. It sets the value(an object with `start` and `end` keys), on mount and on update. Use this prop in conjunction with the `change` event.
### rangeLabels

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

a function that accepts `min` and `max` range values as parameters and returns an object representing labels with `start` and `end` keys.
### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show the selected item as a filter in the selected filters view. Defaults to `true`.
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

> Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

## Demo

<br/>
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/dynamic-range-slider" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`DynamicRangeSlider` component supports `innerClass` prop with the following keys:

-   `title`

Read more about it [here](/docs/reactivesearch/vue/v1/theming/classnameinjection/).

## Extending

`DynamicRangeSlider` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `value-change` and `query-change`.

```html
<template>
	<dynamic-range-slider
		className="custom-class"
		:customQuery="getCustomQuery"
		:react="react"
		:beforeValueChange="handleBeforeValueChange"
		@value-change="handleValueChange"
		@query-change="handleQueryChange"
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

### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **DynamicRangeSlider** component as long as the component is a part of `react` dependency of at least one other component.
### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

> Note:
>
> If you're using Reactivesearch version >= `1.1.0`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

```js
beforeValueChange = value => {
	// The update is accepted by default
	if (value.start > 3000) {
		// To reject the update, throw an error
		throw Error('Start value must be less than or equal to 3000.');
	}
};
```

## Events

### change
is an event that accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This event is useful to control the value updates of search input.

```jsx
<template>
	<dynamic-range-slider
		// ...other props
		value="value"
		@change="handleChange"
	/>
</template>

<script>
export default {
name: 'app',
	data() {
		return {
			value: {
				start: 3000,
				end: 50000
			}
		}
	},
	methods: {
		handleChange(value) {
			this.value = value;
		}
	}
};
</script>
```

### query-change
is an event which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This event is handy in cases where you want to generate a side-effect whenever the component's query would change.
### value-change
is an event which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This event is handy in cases where you want to generate a side-effect on value selection.For example: You want to show a pop-up modal with the valid discount coupon code when some range is selected in a “Discounted Price” DynamicRangeSlider.
