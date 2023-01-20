---
title: 'MultiDropdownList'
meta_title: 'MultiDropdownList'
meta_description: 'MultiDropdownList creates a multiple selection based list UI component that is connected to a database field.'
keywords:
    - reactivesearch
    - multidropdownlist
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/OUjsjxH.png)

`MultiDropdownList` creates a dropdown based multiple selection list UI component that is connected to a database field. It is used for filtering results based on the current selection from a list of items.

> Note
>
> This component is exactly like the [MultiList](/docs/reactivesearch/react/list/multilist/) component except the UI is based on a dropdown, ideal for showing additional UI filters while conserving screen space.

Example uses:

-   create an e-commerce facet like search experience.
-   create a filter for airlines to fly by in a flight booking experience.

## Usage

### Basic Usage

```jsx
<MultiDropdownList componentId="CitySensor" dataField="group.group_city.raw" title="Cities" />
```

### Usage (with all props)

```jsx
<MultiDropdownList
    componentId="CitySensor"
    dataField="group.group_city.raw"
    title="Cities"
    size={100}
    sortBy="count"
    defaultValue={['London']}
    showCount={true}
    placeholder="Search City"
    react={{
    	and: ['CategoryFilter', 'SearchFilter'],
    }}
    showFilter={true}
    filterLabel="City"
    URLParams={false}
    loader="Loading ..."
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

```jsx
function Index(props) {
	const [values, setValues] = useState([]);
	return (
		<MultiDropdownList
			componentId="BookSensor"
			dataField="original_series.raw"
			size={100}
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

DB data field to be mapped with the component's UI view. The dropdown list items are filtered by a database query on this field. This field is used for doing an aggregation and returns the result. We're using a `.raw` multifield here. You can use a field of type `keyword` or `not_analyzed` depending on your Elasticsearch cluster.
### nestedField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
### loader

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |


to display an optional loader while fetching the options.
### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |


title of the component to be shown in the UI.
### size

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |


number of list items to be displayed.
> Note: 
> 1. Appbase users should use the `aggregationSize` prop instead. The `size` prop would only set the size for `hits` not the `aggregations`.
> 2. We recommend Appbase users to not use the `size` prop unless they are using `hits` because it can impact the query performance.

### aggregationSize
To set the number of buckets to be returned by aggregations.
 
### sortBy

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


property that decides on how to sort the list items, accepts one of `count`, `asc` or `desc` as valid values.
-   `count` sorts the list based on the count occurences, with highest value at the top.
-   `asc` sorts the list in the ascending order of the list item (Alphabetical).
-   `desc` sorts the list in the descending order of the term. Defaults to `count`.
### defaultValue

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |


select one or more options from the dropdown list on mount. Accepts an `Array` object containing the items that should be selected.
### value

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |


controls the current value of the component. It selects the item from the list (on mount and on update). Use this prop in conjunction with `onChange` function.
### queryFormat

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


queries the selected items from the list in one of two modes: `or`, `and`.
-   Defaults to `or` which queries for results where any of the selected list items are present.
-   In `and` mode, the applied query filters results where all of the selected items are present.
### showCount

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show count of number of occurences besides an item. Defaults to `true`.
### showSearch

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


whether to show a searchbox to filter the list items locally. Defaults to `false`.
### showClear

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


whether to show a clear button to clear the entered text in the searchbox. Defaults to `false`.    
### transformData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


allows transforming the data to render inside the list. You can change the order, remove, or add items, tranform their values with this method. It provides the data as param which is an array of objects of shape `{ key: <string>, doc_count: <number> }` and expects you to return the array of objects of same shape.
### showMissing

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


defaults to `false`. When set to `true` it also retrives the aggregations for missing fields under the label specified by `missingLabel`.
### missingLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


defaults to `N/A`. Specify a custom label to show when `showMissing` is set to `true`.
### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


placeholder to be displayed in the select box. It'll be only applicable when no value is selected.
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
### showLoadMore

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


defaults to `false` and works only with elasticsearch >= 6 since it uses [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation/). This adds a "Load More" button to load the aggs on demand combined with the `size` prop. Composite aggregations are in beta and this is an experimental API which might change in a future release.

> Note:
>
> Composite aggregations do not support sorting by `count`. Hence with `showLoadMore`, you can only sort by: `asc` or `desc` order. `sortBy` prop defaults to `asc` when `showLoadMore` prop is used.
### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


customize the rendered list via a function which receives the item label, count & isSelected and expects a JSX or String back. For example:
```jsx
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

-   **`loading`**: `boolean`
    indicates that the query is still in progress
-   **`error`**: `object`
    An object containing the error info
-   **`data`**: `array`
    An array of results obtained from the applied query.
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
-   **`value`**: `array`
    current selected values.
-   **`handleChange`**: `function`
    A callback function can be used to mark the list value as selected.
-   **`downshiftProps`**: `object`
    provides all the control props from `downshift` which can be used to bind list items with click/mouse events.
    Read more about it [here](https://github.com/downshift-js/downshift#children-function).

```jsx
<MultiDropdownList
	render={({ loading, error, data, handleChange }) => {
		if (loading) {
			return <div>Fetching Results.</div>;
		}
		if (error) {
			return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
		}
		return data.map(item => (
			<div onClick={() => handleChange(item.key)} key={item.key}>
                <span>{item.key}</span>
                <span>{item.doc_count}</span>
			</div>
		));
	}}
/>
```

Or you can also use render function as children

```jsx
<MultiDropdownList>
    {
        ({
            loading,
            error,
            data,
            value,
            handleChange,
            downshiftProps
        }) => (
            // return UI to be rendered
        )
    }
</MultiDropdownList>
```

### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |


can be used to render an error message in case of any error.
```jsx
renderError={(error) => (
        <div>
            Something went wrong!<br/>Error details<br/>{error}
        </div>
    )
}
```
### renderNoResults

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


can be used to render a message in case of no list items.
```jsx
renderNoResults={() => <p>No Results Found!</p>}
```

### renderLabel

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


can be used to change the label of the dropdown. Useful for adding highlighting/styling to or translating the label.
 ```jsx
renderLabel={(items) => Object.values(items).map((item) => (
  <div>
    <MyTranslationComponent key={item} />
  </div>
))}
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
### isOpen

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

 When set to `true` the dropdown is displayed on the initial render. Defaults to `false`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiDropdownList" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`MultiDropdownList` component supports `innerClass` prop with the following keys:

-   `title`
-   `select`
-   `list`
-   `icon`
-   `count`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).

## Extending

`MultiDropdownList` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`, `defaultQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. specify how options should be filtered or updated using `react` prop.

```jsx
<MultiDropdownList
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
  // specify how and which options are filtered using `react` prop.
  react={
    "and": ["pricingFilter", "dateFilter"],
    "or": ["searchFilter"]
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

CSS styles to be applied to the **MultiDropdownList** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **MultiDropdownList** component as long as the component is a part of `react` dependency of at least one other component.
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

```jsx
beforeValueChange = values => {
    // The update is accepted by default
    if (values.includes('Dirk Pitt')) {
        // To reject the update, throw an error
        throw Error('Selected values should not include Dirk Pitt.');
    }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when list item(s) is/are selected in a "Discounted Price" MultiDropdownList.
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

specify dependent components to reactively update **MultiDropdownList's** options.
-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=List%20components%2FMultiDropdownList" target="_blank">MultiDropdownList with default props</a>
