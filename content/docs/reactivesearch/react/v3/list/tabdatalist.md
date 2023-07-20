---
title: 'TabDataList'
meta_title: 'TabDataList'
meta_description: 'TabDataList creates a multiple selection based list UI component that is connected to a search index field.'
keywords:
    - reactivesearch
    - tabdatalist
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-v3-reactivesearch'
---

`TabDataList` creates a tabbed list UI component. It is used for filtering results based on the current selection from a list of data items.

This component is similar to `SingleDataList`. It just renders a tab list instead of radio buttons incase of `SingleDataList`.

Example uses:

-   select a category from a list of categories for filtering e-commerce search results.
-   display result tabs based on a value classification

## Usage

### Basic Usage

```js
<TabDataList
	componentId="MeetupTops"
	dataField="group.group_topics.topic_name_raw.raw"
	title="Meetups"
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
/>
```

### Render
as a vertical list
We can pass the `displayAsVertical` to be true to render the list vertically.

```jsx
<TabDataList
    {...props}
    displayAsVertical
/>
```

### Show
no. of documents
When we want to show the no. of documents for each category(tab) then we can pass `showCount` prop.

```jsx
<TabDataList
    {...props}
    showCount
/>
```

### Usage (with all props)

```js
<TabDataList
	componentId="MeetupTops"
	dataField="group.group_topics.topic_name_raw.raw"
	title="Meetups"
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
	selectAllLabel="All"
    showCount={true}
    showRadio={true}
    showSearch={true}
    displayAsVertical={true}
	placeholder="Filter meetups"
	defaultValue="Social"
    selectAllLabel="All meetups"
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

Supported since 8.16.0 and for all serverless search instances.
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
|  `string` |   Yes   |

data field to be connected to the component's UI view.
### data

| Type | Optional |
|------|----------|
|  `Object Array` |   Yes   |

collection of UI `labels` with associated `value` to be matched against the database field.
### title

| Type | Optional |
|------|----------|
|  `string or JSX` |   Yes   |


title of the component to be shown in the UI.
### placeholder

| Type | Optional |
|------|----------|
|  `string` |   Yes   |


placeholder to be displayed in the searchbox. Defaults to "Search". Applicable only when `showSearch` is true.
### defaultValue

| Type | Optional |
|------|----------|
|  `string` |   Yes   |


selects an initial item from the list on mount.
### value

| Type | Optional |
|------|----------|
|  `string` |   Yes   |


controls the current value of the component. It selects the item from the list (on mount and on update). Use this prop in conjunction with `onChange` function.
### selectAllLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


if provided displays an additional option to select all list values.
### showCount

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show a count of the number of occurences besides each list item. Defaults to `false`.
### displayAsVertical

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


layout tabs vertically. Defaults to `false`.
### showSearch

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


filter tabs using a search bar
### showRadio

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show radio buttons just as we are using a `SingleDataList`
### selectAllLabel

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

 
	If set, an additional option to select all the values is displayed
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
```js
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
-   **`value`**: `string`
    current selected value.
-   **`handleChange`**: `function`
    A callback function can be used to mark the list value as selected.

```js
<TabDataList
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
<TabDataList>
        {
            ({
                data,
                value,
                handleChange,
            }) => (
                // return UI to be rendered
            )
        }
</TabDataList>
```
## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/TabDataList" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Extending

`TabDataList` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`, `defaultQuery`,

```js
<TabDataList
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  defaultQuery={
    function(value, props) {
      return {
        timeout: "1s"
      }
    }
  }
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

CSS styles to be applied to the **TabDataList** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **TabDataList** component as long as the component is a part of `react` dependency of at least one other component.
### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
Read more about it [here](/docs/reactivesearch/react/v3/advanced/customqueries/#when-to-use-default-query).
### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.
> Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

