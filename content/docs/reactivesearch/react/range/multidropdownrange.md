---
title: 'MultiDropdownRange'
meta_title: 'MultiDropdownRange'
meta_description: '`MultiDropdownRange` creates a dropdown based multiple numeric range UI component that is connected to a database field.'
keywords:
    - reactivesearch
    - multidropdownrange
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/VdWiHD3.png)

`MultiDropdownRange` creates a dropdown based multiple numeric range UI component that is connected to a database field.

> Note
>
> It is exactly like the [MultiRange](/docs/reactivesearch/react/range/multirange/) component but displayed in a dropdown, ideal for showing additional UI filters while conserving screen space

Example uses:

-   filtering search results by prices in an e-commerce or food delivery experience.
-   browsing movies by a ratings filter.

## Usage

### Basic Usage
```js
<MultiDropdownRange
	componentId="PriceSensor"
	dataField="price"
	data={[
		{ start: 0, end: 10, label: 'Cheap' },
		{ start: 11, end: 20, label: 'Moderate' },
		{ start: 21, end: 50, label: 'Pricey' },
		{ start: 51, end: 1000, label: 'First Date' },
	]}
	title="Prices"
/>
```

### Usage With All Props
```js
<MultiDropdownRange
  componentId="PriceSensor"
  dataField="price"
  data={[
  	{ start: 0, end: 10, label: 'Cheap' },
  	{ start: 11, end: 20, label: 'Moderate' },
  	{ start: 21, end: 50, label: 'Pricey' },
  	{ start: 51, end: 1000, label: 'First Date' },
  ]}
  title="Prices"
  defaultValue={['Cheap', 'Moderate']}
  placeholder="Select price ranges"
  showFilter={true}
  filterLabel="Price"
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

### Usage as a controlled component
```js
function Index(props) {
	const [values, setValues] = useState([]);
	return (
		<MultiDropdownRange
			componentId="BookSensor"
			dataField="average_rating"
			data={[
				{
					start: 0,
					end: 3,
					label: 'Rating < 3',
				},
				{
					start: 3,
					end: 4,
					label: 'Rating 3 to 4',
				},
				{
					start: 4,
					end: 5,
					label: 'Rating > 4',
				},
			]}
			value={values}
			onChange={setValues}
		/>
	);
}
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

endpoint prop provides the ability to query a user-defined backend service for this component, overriding the data endpoint configured in the ReactiveBase component. 
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

data field to be connected to the component's UI view. The range items are filtered by a database query on this field.
### data

| Type | Optional |
|------|----------|
|  `Object Array` |   Yes   |

collection of UI `labels` with associated `start` and `end` range values.
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
|  `Array` |   Yes   |

selects initial items from the data range on mount.
### value

| Type | Optional |
|------|----------|
|  `Array` |   Yes   |

controls the current value of the component.It selects the item from the data (on mount and on update).Use this prop in conjunction with `onChange` function.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

placeholder to be displayed in the select box. It'll be only applicable when no value is selected. Defaults to `Select a value`.
### searchPlaceholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

placeholder to be displayed in the search box. Defaults to `Type here to search...`.
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

enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.
### renderLabel

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

can be used to change the label of the dropdown. Useful for adding highlighting/styling to or translating the label.
```js
renderLabel={(items) => Object.values(items).map((item) => (
  <div>
    <MyTranslationComponent key={item} />
  </div>
))}
```
### includeNullValues

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. Defaults to `false`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiDropdownRange" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`MultiDropdownRange` component supports `innerClass` prop with the following keys:

-   `title`
-   `select`
-   `list`
-   `icon`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).

## Extending

`MultiDropdownRange` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<MultiDropdownRange
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
  onValueChange={
    function(value) {
      console.log("current value: ", value)
      // set the state
      // use the value with other js code
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

CSS styles to be applied to the **MultiDropdownRange** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **MultiDropdownRange** component as long as the component is a part of `react` dependency of at least one other component.
### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

> Note:
>
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

```js
beforeValueChange = value => {
    // The update is accepted by default
  const valueIndex = value.findIndex(val => val.start < 4);
  if (valueIndex > -1) {
    // To reject the update, throw an error
    throw Error('Rating should be greater than or equal to 4.');
  }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code(s) when range item(s) is/are selected in a "Prices" MultiDropdownRange.
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


## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=Range%20components%2FMultiDropdownRange" target="_blank">MultiDropdownRange with default props</a>
