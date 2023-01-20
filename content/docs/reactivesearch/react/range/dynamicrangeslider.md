---
title: 'DynamicRangeSlider'
meta_title: 'DynamicRangeSlider'
meta_description: '`DynamicRangeSlider` creates a numeric range slider UI component. It is used for granular filtering of numeric data.'
keywords:
    - reactivesearch
    - dynamicrangeslider
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/SkutEkT.png)

`DynamicRangeSlider` creates a numeric range slider UI component. It is used for granular filtering of numeric data.

Example uses:

-   filtering products from a price range in an e-commerce shopping experience.
-   filtering flights from a range of departure and arrival times.

> Note
>
> This component behaves similar to the [RangeSlider](/docs/reactivesearch/react/range/rangeslider/) except that the range is computed dynamically based on actual data.

## Usage

### Basic Usage
```js
<DynamicRangeSlider componentId="DynamicRangeSensor" dataField="guests" />
```

While `DynamicRangeSlider` only requires the above props to be used, it comes with many additional props for pre-selecting range values, setting the step value of the range slider, specifying labels for the range endpoints, whether to display histogram etc.

### Usage With All Props
```js
<DynamicRangeSlider
    componentId="DynamicRangeSensor"
    dataField="guests"
    title="Guests"
    defaultValue={(min, max) => ({
    	start: min,
    	end: Math.min(min + 5, max),
    })}
    rangeLabels={(min, max) => ({
    	start: min + ' guest',
    	end: max + ' guests',
    })}
    stepValue={1}
    showHistogram={true}
    showFilter={true}
    interval={2}
    react={{
    	and: ['CategoryFilter', 'SearchFilter'],
    }}
    URLParams={true}
    loader="Loading ..."
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

### componentId

| Type | Optional |
|------|----------|
|  `String`  |    No    |

unique identifier of the component, can be referenced in other components' `react` prop.
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

DB data field to be mapped with the component's UI view.The selected range creates a database query on this field.
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

controls the current value of the component.It selects the item from the dynamic range (on mount and on update).Use this prop in conjunction with `onChange` function.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
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
### tooltipTrigger

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

trigger the tooltip according to the value specified. Can be `hover`, `focus`, `always` and `none`. Defaults to `none`.
### renderTooltipData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

customize the rendered tooltip content via a function which receives the tooltip content and expects a JSX or String back. For example:

```js
renderTooltipData={data => (
    <h5 style={{
        color: 'red',
        textDecoration: 'underline'
    }}>
        {data}
    </h5>
)}
```

### showHistogram

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to display the range histogram or not. Defaults to `true`.
### interval

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

set the histogram bar interval, applicable when _showHistogram_ is `true`. Defaults to `Math.ceil((props.range.end - props.range.start) / 100) || 1`.
### loader

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |

to display an optional loader while fetching the histogram stats.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

enable creating a URL query string parameter based on the selected range of the slider. This is useful for sharing URLs with the component state. Defaults to `false`.
### includeNullValues

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. Defaults to `false`.    
### queryFormat

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Set the date format to be used for querying data, default value is set to `date`. It can accept one of the following values: 

<br />

|              <p style="margin: 0px;" class="table-header-text">queryFormat</p> | <p style="margin: 0px;" class="table-header-text">Representation as [elasticsearch date](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html#built-in-date-formats)</p> |
| ---------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `epoch_millis` **(default)** |                                                                       `epoch_millis`                                                                       |
|               `epoch_second` |                                                                       `epoch_second`                                                                       |
|                 `basic_time` |                                                                       `HHmmss.SSSZ`                                                                        |
|       `basic_time_no_millis` |                                                                         `HHmmssZ`                                                                          |
|                       `date` |                                                                        `yyyy-MM-dd`                                                                        |
|                 `basic_date` |                                                                         `yyyyMMdd`                                                                         |
|            `basic_date_time` |                                                                  `yyyyMMdd'T'HHmmss.SSSZ`                                                                  |
|  `basic_date_time_no_millis` |                                                                    `yyyyMMdd'T'HHmmssZ`                                                                    |
|        `date_time_no_millis` |                                                                 `yyyy-MM-dd'T'HH:mm:ssZZ`                                                                  |



> Note: `queryFormat` is mandatory to pass when dealing with date types.

### calendarInterval

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

    It sets the interval for aggreation-data when dealing with date-types. Default value is calculated internally based on the range - `start` and `end` values. It can accept one of the following: `year`, `quarter`, `month`, `week`, `day`, `hour`, and `minute`. 

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/DynamicRangeSlider" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`DynamicRangeSlider` component supports `innerClass` prop with the following keys:

-   `title`
-   `slider`
-   `label`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).

## Extending

`DynamicRangeSlider` component can be extended to

1. customize the look and feel with `className`, `style`.
2. update the underlying DB query with `customQuery`.
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. filter data using a combined query context via the `react` prop.

```js
<DynamicRangeSlider
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
  react={{
    "and": ["ListSensor"]
  }}
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

CSS styles to be applied to the **DynamicRangeSlider** component.
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
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

```js
beforeValueChange = value => {
    // The update is accepted by default
    if (value.start > 3000) {
        // To reject the update, throw an error
        throw Error('Start value must be less than or equal to 3000.');
    }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user selects a particular range in a DynamicRangeSlider.
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

specify dependent components to reactively update **DynamicRangeSlider's** data view.
-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.
### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.


## Examples

See more stories for DynamicRangeSlider on playground.

<a href="https://opensource.appbase.io/playground/?selectedKind=Range%20components%2FDynamicRangeSlider" target="_blank">DynamicRangeSlider with default props</a>
