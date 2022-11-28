---
title: 'DateRange'
meta_title: 'DateRange'
meta_description: '`DateRange` creates a calendar view based UI component that is connected to date fields. It is used for filtering results by a date like property.'
keywords:
    - reactivesearch
    - daterange
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/4c94MBh.png)

`DateRange` creates a calendar view based UI component that is connected to date fields. It is used for filtering results by a date like property.

Example uses:

-   picking a date range for booking a hotel room.
-   finding search results from a database based on date range.

## Usage

### Basic Usage
```js
<DateRange componentId="DateSensor" dataField="mtime" />
```

### Usage With All Props
```js
<DateRange
    componentId="DateSensor"
    dataField="mtime"
    title="DateRange"
    defaultValue={{
    	start: new Date('2017-04-01'),
    	end: new Date('2017-04-07'),
    }}
    placeholder={{
    	start: 'Start Date',
    	end: 'End Date',
    }}
    focused={true}
    numberOfMonths={2}
    queryFormat="date"
    autoFocusEnd={true}
    showClear={true}
    showFilter={true}
    filterLabel="Date"
    URLParams={false}
    endpoint={{
        url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory,
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
|  `String or Array`  |    No    |

database field(s) to be connected to the component's UI view.
-   If passed as an `Array` of length 2, the first `String` element is used for the lower bound and the second `String` element is used for the upper bound of the range.
-   If passed as a `String`, the field is used for both lower and upper bounds match based on the selected values from the component UI view.
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

selects a initial date range based on an object having a **start** and **end** `date` object value.
### value

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

controls the current value of the component.It selects the range based on the data provided (on mount and on update).Use this prop in conjunction with `onChange` function.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
### focused

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to display the calendar view on initial load. Defaults to `true`.
### autoFocusEnd

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

focus the end date field after the starting date is selected. Defaults to `true`.
### numberOfMonths

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

number of months to be shown in the calendar view. Defaults to 2.
### queryFormat

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

sets the date format to be used in the query, can accept one of the following:

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

### initialMonth

| Type | Optional |
|------|----------|
|  `Date object` |   Yes   |

if provided sets the initial visible month when nothing is selected and the calendar is pulled up. For example, passing `new Date('2017-04-01')` will open the calendar on January 1st, 2017.
### dayPickerInputProps

| Type | Optional |
|------|----------|
|  `object` |   Yes   |

accepts an object which is passed to the underlying [React Day Picker Input](http://react-day-picker.js.org/docs/input) component. Find the props [here](http://react-day-picker.js.org/api/DayPickerInput).
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

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/DateRange" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`DateRange` component supports `innerClass` prop with the following keys:

-   `title`
-   `input-container`
-   `daypicker-container`
-   `daypicker-overlay-wrapper`
-   `daypicker-overlay`

Read more about it [here](/docs/reactivesearch/v4/theming/classnameinjection/).

## Extending

`DateRange` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<DateRange
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  customQuery={
    function(value, props) {
      return {
        query: {
            range: {
                lte: "now"
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

CSS styles to be applied to the **DateRange** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **DateRange** component as long as the component is a part of `react` dependency of at least one other component.
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
    const compareDate = Date.parse('2012-11-01');
    const dateValue = Date.parse(value.start);
    if (dateValue < compareDate) {
        // To reject the update, throw an error
        throw Error("Start date must be greater than or equal to '2012-11-01'.");
    }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a particular date range is selected in a DateRange.
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

<a href="https://opensource.appbase.io/playground/?selectedKind=Range%20components%2FDateRange" target="_blank">DateRange with default props</a>
