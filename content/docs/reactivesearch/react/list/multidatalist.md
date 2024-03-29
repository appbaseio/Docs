---
title: 'MultiDataList'
meta_title: 'MultiDataList'
meta_description: 'MultiDataList creates a multiple selection based list UI component that is connected to a database field.'
keywords:
    - reactivesearch
    - multidatalist
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/9snfajo.png)

`MultiDataList` creates a multiple checkbox list UI component that is connected to a database field. It is used for filtering results based on the current selection(s) from a list of data items.

> Note
>
> This component behaves similar to the [MultiList](/docs/reactivesearch/react/list/multilist/) component except the list items are user defined with the `data` prop, ideal for showing curated items in a list layout.

Example uses:

-   select one or multiple items from a list of categories for filtering e-commerce search results.
-   filtering restaurants by one or more cuisine choices.

## Usage

### Basic Usage

```js
<MultiDataList
	componentId="MeetupTops"
	dataField="group.group_topics.topic_name_raw.raw"
	data={[
		{
			label: 'Social',
			value: 'Social',
		},
		{
			label: 'Travel',
			value: 'Travel',
		},
		{
			label: 'Outdoors',
			value: 'Outdoors',
		},
	]}
	title="Meetups"
/>
```

### Usage (with all props)

```js
<MultiDataList
	componentId="MeetupTops"
	compoundClause="filter"
	dataField="group.group_topics.topic_name_raw.raw"
	data={[
		{
			label: 'Social',
			value: 'Social',
		},
		{
			label: 'Travel',
			value: 'Travel',
		},
		{
			label: 'Outdoors',
			value: 'Outdoors',
		},
	]}
	title="Meetups"
	showSearch={true}
	showCheckbox={true}
	placeholder="Filter meetups"
	defaultValue={['Social']}
	selectAllLabel="All meetups"
	showFilter={true}
	filterLabel="Price"
	URLParams={false}
    endpoint={{
      url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
      headers:{
        // relevant headers
      },
      method: 'POST'
    }}        
/>
```

### Usage (as a controlled component)

```js
function Index(props) {
	const [values, setValues] = useState([]);
	return (
		<MultiDataList
			title="MultiDataList"
			componentId="CitySensor"
			dataField="group.group_topics.topic_name_raw.raw"
			data={[
				{
					label: 'Open Source',
					value: 'Open Source',
				},
				{
					label: 'Social',
					value: 'Social',
				},
				{
					label: 'Adventure',
					value: 'Adventure',
				},
				{
					label: 'Music',
					value: 'Music',
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
|  `Object` |   Yes   |

 
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
|  `String` |   No   |

data field to be connected to the component's UI view.
### data

| Type | Optional |
|------|----------|
|  `Object Array` |   Yes   |

collection of UI `labels` with associated `value` to be matched against the database field.
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
### showSearch

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


whether to display a searchbox to filter the data list. Defaults to `false`.
### showCheckbox

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


whether to display a checkbox button beside the list item. Defaults to `true`.
### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


placeholder to be displayed in the searchbox. Defaults to "Search".
### defaultValue

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |


selects initial items from the list on mount.
### value

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |


controls the current value of the component. It selects the item from the list (on mount and on update). Use this prop in conjunction with `onChange` function.
### selectAllLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


if provided displays an additional option to select all list values.
### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show as filter when a value is selected in a global selected filters view. Defaults to `true`.
### showCount

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show a count of the number of occurences besides each list item. Defaults to `false`.
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
### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


customize the rendered list via a function which receives the item label, count & isSelected and expects a JSX or String back. For example:
```jsx
<MultiDataList
    renderItem={(label, count, isSelected) => (
        <div>
            {label}
            <span style={{
                marginLeft: 5, color: isSelected ? 'red' : 'dodgerblue'
            }}>
                {count}
            </span>
        </div>
    )}
/>
```
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
<br/>
It accepts an object with these properties:
-   **`data`**: `array`
    An array of results obtained from the applied query.
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
-   **`value`**: `array`
    current selected values.
-   **`handleChange`**: `function`
    A callback function can be used to mark the list value as selected.

```js
<MultiDataList
	render={({ data, handleChange }) =>
		data.map(item => (
			<div onClick={() => handleChange(item.key)} key={item.key}>
				<span>{item.key}</span>
				<span>{item.doc_count}</span>
			</div>
		))
	}
/>
```

Or you can also use render function as children

```js
<MultiDataList>
        {
            ({
                data,
                value,
                handleChange,
            }) => (
                // return UI to be rendered
            )
        }
</MultiDataList>
```

### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |


can be used to render an error message in case of any error.
```js
<MultiDataList
    renderError={(error) => (
            <div>
                Something went wrong!<br/>Error details<br/>{error}
            </div>
        )
    }
>
```
### renderNoResults

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


can be used to render a message in case of no list items.

```js
<MultiDataList
    renderNoResults={() => <p>No Results Found!</p>}
/>
```

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


## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiDataList" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`MultiDataList` component supports `innerClass` prop with the following keys:

-   `title`
-   `input`
-   `list`
-   `checkbox`
-   `label`
-   `count`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).

## Extending

`MultiDataList` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`, `defaultQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<MultiDataList
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
  defaultQuery={
    function(value, props) {
      return {
          timeout: '1s'
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

CSS styles to be applied to the **MultiDataList** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **MultiDataList** component as long as the component is a part of `react` dependency of at least one other component.
### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
    Read more about it [here](/docs/reactivesearch/react/advanced/customqueries/#when-to-use-default-query).
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
	if (values.includes('Social')) {
		// To reject the update, throw an error
		throw Error('Selected values should not include Social.');
	}
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when list item(s) is/are selected in a "Discounted Price" MultiDataList.
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=List%20components%2FMultiDataList" target="_blank">MultiDataList with default props</a>
