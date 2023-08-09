---
title: 'NumberBox'
meta_title: 'NumberBox'
meta_description: '`NumberBox` creates a box (or button) based numeric UI component. It is used for filtering results based on a numeric query.'
keywords:
    - reactivesearch
    - numberbox
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-v3-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/Cnx17Nj.png)

`NumberBox` creates a box (or button) based numeric UI component. It is used for filtering results based on a numeric query.

Example uses:

-   filtering hotel listings based on the number of guests,
-   filtering movies or products by ratings.

## Usage

### Basic Usage
```js
<NumberBox
	componentId="NumberBoxSensor"
	dataField="guests"
	data={{ label: 'Guests', start: 0, end: 5 }}
	title="NumberBox component"
/>
```

### Usage With All Props
```js
<NumberBox
    componentId="NumberBoxSensor"
    compoundClause="filter"
    dataField="guests"
    data={{ label: 'Guests', start: 0, end: 5 }}
    title="NumberBox component"
    defaultValue={0}
    labelPosition="left"
    queryFormat="gte"
    endpoint={{
      url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
      headers:{
        // relevant headers
      },
      method: 'POST'
    }}
    URLParams={false}
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

> - Overrides the endpoint property defined in ReactiveBase.
> - If required, use `transformResponse` prop to transform response in component-consumable format.

### dataField

| Type | Optional |
|------|----------|
|  `String`  |    No    |

DB data field to be mapped with the component's UI view. The selected box value creates a database query on this field.
### data

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

an object with `start` and `end` values and optionally an associated `label` to be displayed in the UI.
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
|  `Number` |   Yes   |

sets a initial valid value within the [start, end] range on mount.
### value

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

controls the current value of the component (on mount and on update).Use this prop in conjunction with `onChange` function.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
### labelPosition

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

position where label is shown, one of "left", "top", "right", "bottom". Defaults to `left`.
### queryFormat

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

type of query to perform, one of `exact`, `gte` and `lte`:

-   `exact` implies a query match with the exact value as the one selected in the UI view,
-   `gte` implies a query match that satisfies all values that are greater than or equal to the one selected in the UI view.
-   `lte` implies a query match that satisfies all values that are less than or equal to the one selected in the UI view.

Defaults to `gte`.

### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

enable creating a URL query string parameter based on the selected value of the number. This is useful for sharing URLs with the component state. Defaults to `false`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/NumberBox" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`NumberBox` component supports `innerClass` prop with the following keys:

-   `title`
-   `label`
-   `button`

Read more about it [here](/docs/reactivesearch/react/v3/theming/classnameinjection/).

## Extending

`NumberBox` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<NumberBox
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

CSS styles to be applied to the **NumberBox** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **NumberBox** component as long as the component is a part of `react` dependency of at least one other component.
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
    if (value > 10) {
        // To reject the update, throw an error
        throw Error('No of persons must be less than or equal to 10.');
    }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a number is selected in a NumberBox.
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

See more stories for NumberBox on playground.

<a href="https://opensource.appbase.io/playground/?selectedKind=Range%20components%2FNumberBox" target="_blank">NumberBox with default props</a>
