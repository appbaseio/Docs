---
id: rangeinput
title: 'RangeInput'
meta_title: 'RangeInput'
meta_description: '`RangeInput` creates a numeric range slider UI component with input fields. It works in the same way as RangeSlider.'
keywords:
    - reactivesearch
    - rangeinput
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-v1-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/v03gpDl.png)

`RangeInput` creates a numeric range slider UI component with input fields. It works in the same way as [RangeSlider](/docs/reactivesearch/vue/v1/range/rangeslider/).

Example uses:

-   filtering products from a price range in an e-commerce shopping experience.
-   filtering flights from a range of departure and arrival times.

## Usage

### Basic Usage
```html
<template>
	<range-input
		dataField="ratings_count"
		componentId="BookSensor"
		title="RangeInput: Ratings"
		:range="{
			start: 3000,
			end: 50000
      }"
	/>
</template>
```

`RangeInput` provides all the props supported by [RangeSlider](/docs/reactivesearch/vue/v1/range/rangeslider/).

### Usage With All Props
```html
<template>
	<range-input
		componentId="RatingsSensor"
		dataField="ratings_count"
		:range="{
			start: 3000,
			end: 50000,
		}"
		:rangeLabels="{
			start: '3K',
			end: '50K',
		}"
		:defaultValue="{
			start: 10000,
			end: 30000
		}"
		title="Ratings Filter"
		:stepValue="1"
		:includeNullValues="true"
		className="component-wrapper"
		:validateRange="validateInputChange"
		:value="this.$data.currentValue"
		@change="handleChange"
		@value-change="handleValueChange"
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
|  `String` |   No   |

unique identifier of the component, can be referenced in other components' `react` prop.

### compoundClause

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use `must`. Setting the compound clause to filter allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. term, geo or range type of queries that act as filters on the data)

This property only has an effect when the search engine is either elasticsearch or opensearch.


> Note: `compoundClause` is supported since 8.16.0 and for all serverless search instances.


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
### range

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

an object with `start` and `end` keys and corresponding numeric values denoting the minimum and maximum possible slider values.
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
|  `Object` |   Yes   |

selects a initial range values using `start` and `end` key values from one of the data elements.
### value

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

controls the current value of the component.It selects the data from the range (on mount and on update). Use this prop in conjunction with `change` event.
### validateRange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function that can be used to validate the range input values before applying it. This function accepts an array of numbers where first element represents the `start` range and second element represents the `end` range. The following example prevents the users to type negative value for start range input.

```html
<template>
	<range-input
		:validateRange="([start, end]) => {
            if(start <= end) {
                return true;
            }
            return false;
        }"
	/>
</template>
```

### rangeLabels

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

    an object with `start` and `end` keys and corresponding `String` labels to show labels near the ends of the `RangeInput` component.
### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

    show the selected item as a filter in the selected filters view. Defaults to `true`.
### snap

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

    makes the slider snap on to points depending on the `stepValue` when the slider is released. Defaults to `true`. When set to `false`, `stepValue` is ignored.
### stepValue

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

    step value specifies the slider stepper. Value should be an integer greater than or equal to `1` and less than `Math.floor((range.end - range.start) / 2)`. Defaults to 1.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.
### includeNullValues

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

    If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. Defaults to `false`.

## Demo

<br/>
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/range-input" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`RangeInput` component supports `innerClass` prop with the following keys:

-   `slider-container`
-   `input-container`

The other `innerClass` properties are the same as supported by [RangeSlider](/docs/reactivesearch/vue/v1/range/rangeslider/#styles).

## Extending

`RangeInput` component can be extended to

1. customize the look and feel with `className`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `valueChange` and `queryChange`,
4. filter data using a combined query context via the `react` prop,
5. as a controlled component using `value` prop and `change` event.

```html
<template>
	<range-input
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
							price: 1000,
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

	> Note:
	> customQuery is called on value changes in the **RangeInput** component as long as the component is a part of
    >`react` dependency of at least one other component.

### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved. For example,

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

### queryChange
    is an event which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This event is handy in cases where you want to generate a side-effect whenever the component's query would change.
### valueChange
    is an event which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This event is handy in cases where you want to generate a side-effect on value selection.For example: You want to show a pop-up modal with the valid discount coupon code when some range is selected in a “Discounted Price” RangeInput.
### change
    is an event which accepts component's current **value** as a parameter. It is called when you are using the value prop and the component's value changes.

  ```jsx
  <template>
      <range-input
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
	
## Examples

See more stories for RangeInput on Vue playground.

<a href="https://reactivesearch-vue-playground.netlify.app/?path=/story/range-components-rangeinput--basic" target="_blank">RangeInput component with basic props</a><br/>
<a href="https://reactivesearch-vue-playground.netlify.app/?path=/story/range-components-rangeinput--with-title" target="_blank">RangeInput component with title</a><br/>
<a href="https://reactivesearch-vue-playground.netlify.app/?path=/story/range-components-rangeinput--with-defaultvalue" target="_blank">RangeInput component with default value</a>
