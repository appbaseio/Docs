---
title: 'RatingsFilter'
meta_title: 'RatingsFilter'
meta_description: '`RatingsFilter` creates a Ratings Filter UI component. It is used for filtering results based on a ratings score.'
keywords:
    - reactivesearch
    - ratingsfilter
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-v3-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/7GHyqJp.png)

`RatingsFilter` creates a Ratings Filter UI component. It is used for filtering results based on a ratings score.

Example uses:

-   filtering movie listings by their ratings.
-   filtering items in an e-commerce search listing based on its ratings.

## Usage

### Basic Usage
```js
<RatingsFilter
	componentId="ratingsSensor"
	dataField="ratings"
	data={[
		{ start: 4, end: 5, label: '4 & up' },
		{ start: 3, end: 5, label: '3 & up' },
		{ start: 1, end: 5, label: 'All' },
	]}
/>
```

### Usage With All Props
```js
<RatingsFilter
    componentId="CarCategorySensor"
    compoundClause="filter"
    dataField="ratings"
    title="Ratings Filter"
    data={[
    	{ start: 4, end: 5, label: '4 & up' },
    	{ start: 3, end: 5, label: '3 & up' },
    	{ start: 1, end: 5, label: 'All' },
    ]}
    defaultValue={{
    	start: 4,
    	end: 5,
    }}
    URLParams={false}
    includeNullValues
    endpoint={{
      url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
      headers:{
        // relevant headers
      },
      method: 'POST'
    }}           
/>
```

### Usage With Custom Icons
```js
<RatingsFilter
	componentId="RatingsSensor"
	dataField="average_rating_rounded"
	title="RatingsFilter"
	icon={<Star style={{ color: 'yellow' }} />}
	dimmedIcon={<Star style={{ color: 'grey' }} />}
	data={[
		{ start: 4, end: 5, label: '4 stars and up' },
		{ start: 3, end: 5, label: '3 stars and up' },
		{ start: 2, end: 5, label: '2 stars and up' },
		{ start: 1, end: 5, label: '> 1 stars' },
	]}
/>
```

### Usage with Custom Data
Let's say you want data for `ratings with 4 stars and up` and also include `unrated results`

```js
<RatingsFilter
	componentId="RatingsSensor"
	dataField="average_rating_rounded"
	title="RatingsFilter"
	icon={<Star style={{ color: 'yellow' }} />}
	dimmedIcon={<Star style={{ color: 'grey' }} />}
	data={[
		{ start: 4, end: 5, label: '4 stars and up', includeUnrated: true },
		{ start: 3, end: 5, label: '3 stars and up' },
		{ start: 2, end: 5, label: '2 stars and up' },
		{ start: 1, end: 5, label: '> 1 stars' },
	]}
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


### endpoint

| Type | Optional |
|------|----------|
|  `Object`  |    No    |


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

data field to be mapped with the component's UI view.
### data

| Type | Optional |
|------|----------|
|  `Object Array` |   Yes   |

collection of UI `label` with associated with `start` and `end` ratings values.
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
### icon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

to render custom active icon.
### dimmedIcon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

to render custom inactive icon.
### defaultValue

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

selects a initial ratings value using `start` and `end` key values from one of the data elements.
### value

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

controls the current value of the component. It selects the item from the data (on mount and on update). Use this prop in conjunction with `onChange` function.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

enable creating a URL query string parameter based on the selected rating. This is useful for sharing URLs with the component state. Defaults to `false`.
### includeNullValues

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. Defaults to `false`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/RatingsFilter" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`RatingsFilter` component supports `innerClass` prop with the following keys:

-   `title`

Read more about it [here](/docs/reactivesearch/react/v3/theming/classnameinjection/).

## Extending

`RatingsFilter` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<RatingsFilter
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  customQuery={
    function(value, props) {
      return {
        query: {
            match: {
                data_field: "this is a test"
            }
        }
      }
    }
  }
  beforeValueChange={
    function(value) {
      // called before the value is set
      // returns a promise
      return new Promise((resolve, reject) => {
        // update state or component props
        resolve()
        // or reject()
      })
    }
  }
  onQueryChange={
    function(prevQuery, nextQuery) {
      // use the query with other js code
      console.log('prevQuery', prevQuery);
      console.log('nextQuery', nextQuery);
    }
  }
  onValueChange={
    function(value) {
      console.log("current value: ", value)
      // set the state
      // use the value with other js code
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

CSS styles to be applied to the **RatingsFilter** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **RangeFilter** component as long as the component is a part of `react` dependency of at least one other component.
### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

> Note:
>
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

```js
beforeValueChange = values => {
    // The update is accepted by default
    if (values[0] < 4) {
        // To reject the update, throw an error
        throw Error('Rating must be greater than or equal to 4.');
    }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product with a specific rating in a RatingsFilter.
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

See more stories for RatingsFilter on playground.

<a href="https://opensource.appbase.io/playground/?selectedKind=Range%20components%2FRatingsFilter" target="_blank">RatingsFilter with default props</a>
