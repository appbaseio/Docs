---
title: 'SingleDropdownRange'
meta_title: 'SingleDropdownRange'
meta_description: '`SingleDropdownRange` creates a dropdown based numeric range UI component.'
keywords:
    - reactivesearch
    - singledropdownrange
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/xiwVBBU.png)

`SingleDropdownRange` creates a dropdown based numeric range UI component.

> Note
>
> This component is exactly like the [SingleRange](/docs/reactivesearch/v3/range/singlerange/) component except the UI is based on a dropdown, ideal for showing additional UI filters while conserving screen space.

Example uses:

-   filtering search results by prices in an e-commerce or food delivery experience.
-   browsing movies by a ratings filter.

## Usage

### Basic Usage

```js
<SingleDropdownRange
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
<SingleDropdownRange
  componentId="PriceSensor"
  dataField="price"
  data={[
  	{ start: 0, end: 10, label: 'Cheap' },
  	{ start: 11, end: 20, label: 'Moderate' },
  	{ start: 21, end: 50, label: 'Pricey' },
  	{ start: 51, end: 1000, label: 'First Date' },
  ]}
  title="Prices"
  defaultValue="Cheap"
  placeholder="Select price range"
  showFilter={false}
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

## Props

### componentId `String`
unique identifier of the component, can be referenced in other components' `react` prop.
### endpoint `Object` [optional] 
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
      
-   **dataField** `String`
data field to be connected to the component's UI view. The range items are filtered by a database query on this field.
### data `Object Array`
collection of UI `labels` with associated `start` and `end` range values.
### nestedField `String` [optional]
use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
### title `String or JSX` [optional]
title of the component to be shown in the UI.
### defaultValue `String` [optional]
select initial item from the data array on mount.
### value `String` [optional]
controls the current value of the component. It selects the item from the data (on mount and on update). Use this prop in conjunction with `onChange` function.
### onChange `function` [optional]
is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
### placeholder `String` [optional]
placeholder to be displayed in the select box. It'll be only applicable when no value is selected. Defaults to `Select a value`.
### searchPlaceholder `String` [optional]
placeholder to be displayed in the search box. Defaults to `Type here to search...`.
### showFilter `Boolean` [optional]
show as filter when a value is selected in a global selected filters view. Defaults to `true`.
### filterLabel `String` [optional]
An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
### URLParams `Boolean` [optional]
enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.
### renderLabel `Function` [optional]
can be used to change the label of the dropdown. Useful for adding highlighting/styling to or translating the label.
```jsx
renderLabel={(items) => Object.values(items).map((item) => (
  <div>
    <MyTranslationComponent key={item} />
  </div>
))}
```
### includeNullValues `Boolean` [optional]
If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. Defaults to `false`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/SingleDropdownRange" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`SingleDropdownRange` component supports `innerClass` prop with the following keys:

-   `title`
-   `select`
-   `list`
-   `icon`

Read more about it [here](/docs/reactivesearch/v3/theming/classnameinjection/).

## Extending

`SingleDropdownRange` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<SingleDropdownRange
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

### className `String`
CSS class to be injected on the component container.
### style `Object`
CSS styles to be applied to the **SingleDropdownRange** component.
### customQuery `Function`
takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **SingleDropdownRange** component as long as the component is a part of `react` dependency of at least one other component.
### beforeValueChange `Function`
is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

> Note:
>
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

```js
beforeValueChange = value => {
    // The update is accepted by default
  if (value.start < 4) {
    // To reject the update, throw an error
    throw Error('Rating must be greater than or equal to 4.');
  }
};
```

### onValueChange `Function`
is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a range item is selected in a "Prices" SingleDropdownRange.
### onQueryChange `Function`
is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### index `String` [optional]
The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

> Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=Range%20components%2FSingleDropdownRange" target="_blank">SingleDropdownRange with default props</a>
