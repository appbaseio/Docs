---
id: datepicker
title: "DatePicker"
layout: docs
sectionid: docs
permalink: docs/basic-components/datepicker.html
prev: datasearch.html
prevTitle: "DataSearch"
next: daterange.html
nextTitle: "DateRange"
---

![Image to be displayed](https://i.imgur.com/HnZexE9.png)

`DatePicker` creates a calender view based UI component that is connected to a database date field. It is used for filtering results by a date like property.

Example uses:
* finding flights departing on a particular day.
* picking your date of birth for an online application form.

## Usage

### Basic Usage

```js
<DatePicker
  componentId="DateSensor"
  dataField="mtime"
/>
```

### Usage With All Props

```js
<DatePicker
  componentId="DateSensor"
  dataField="mtime"
  title="DatePicker"
  defaultSelected={moment('2017-04-01')}
  focused={true}
  numberOfMonths={1}
  allowAllDates={true}
  queryFormat="basic_date"
  extra={{
    "withFullScreenPortal": false,
    "showClearDate": true
  }}
  placeholder="Pick date"
  showFilter={true}
  filterLabel="Date"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    data field to be connected to the component's UI view.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **defaultSelected** `Object of Moment` [optional]  
    pre-select a default date based on a [moment](https://github.com/moment/moment/) object representing a date.
- **focused** `Boolean` [optional]  
    whether to display the calendar view on initial load. Defaults to `true`.
- **numberOfMonths** `Number` [optional]  
    number of months to be shown in the calendar view. Defaults to 1.
- **allowAllDates** `Boolean` [optional]  
    whether to allow selecting all dates or dates starting from today. Defaults to `true`, i.e. allowing all dates.
- **queryFormat** `String` [optional]  
    sets the date format to be used in the query, can accept one of the following:
    * `epoch_millis` (default) date is expressed as **milliseconds** since epoch.
    * `epoch_seconds` date is expressed as **seconds** since epoch.
    * `date` date expressed in `yyyy-MM-dd` format.
    * `date_time` date expressed using a combination of date and time separated by **T**: `yyyy-MM-ddTHH:mm:ss.SSSZ`.
    * `date_time_no_millis` date expressed using a combination of date and time without milliseconds separated by **T**: `yyyy-MM-ddTHH:mm:ssZ`.
    * `basic_date` date expressed in `yyyyMMdd` format.
    * `basic_date_time` date expressed in `yyyyMMddTHH:mm:ss.SSSZ` format.
    * `basic_date_time_no_millis` date expressed in `yyyyMMddTHH:mm:ssZ` format.
    * `basic_time` date expressed as just time in the `HHmmss.SSSZ` format.
    * `basic_time_no_millis` date expressed as just time but without milliseconds in the `HHmmssZ` format.
- **extra** `Object` [optional]  
    supports the full gauntlet of props as defined in airbnb's [react-dates](https://github.com/airbnb/react-dates) component.
    An example `extra` prop object would look like:

    ```js
    extra={{
      "withFullScreenPortal": true,
      "showClearDate": true
    }}
    ```
- **placeholder** `String` [optional]  
    placeholder to be shown in the field when no date is selected. Defaults to "Select Date".
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='DatePicker docs example' src='//codepen.io/sids-aquarius/embed/VzRwmJ/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/VzRwmJ/'>DatePicker docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/bSei4w3.png)

## Extending

`DatePicker` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<DatePicker
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  customQuery={
    function(value) {
      return {
        match: {
          data_field: "this is a test"
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

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS styles to be applied to the **DatePicker** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **DatePicker** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a particular date is selected in a DatePicker.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='DatePicker docs example' src='//codepen.io/sids-aquarius/embed/VzRwmJ/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/VzRwmJ/'>DatePicker docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [Basic component example](../playground/?knob-visible=true&knob-title=DataController&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-defaultSelected=default&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-showFilter=true&knob-filterLabel=Custom%20Filter%20Name&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&selectedKind=map%2FDatePicker&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [Show more than one month](../playground/?knob-title=DataController&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=default&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-visible=true&selectedKind=map%2FDatePicker&selectedStory=Show%20more%20than%201%20month&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [Start with a default date](../playground/?knob-title=DataController&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=default&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-visible=true&selectedKind=map%2FDatePicker&selectedStory=Default%20date&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Enable days from today only](../playground/?knob-title=DataController&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=default&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=false&knob-visible=true&selectedKind=map%2FDatePicker&selectedStory=Enable%20days%20from%20today%20only&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

5. [An example using `extra` prop](../playground/?knob-title=DataController&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=default&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=false&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&selectedKind=map%2FDatePicker&selectedStory=Using%20extra%20prop%20object&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

6. [Playground mode](../playground/?knob-title=Date%20Picker&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date&knob-defaultSelected=default&knob-queryFormat=epoch_millis&knob-numberOfMonths=1&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-extra=%7B"withFullScreenPortal"%3Afalse%2C"showClearDate"%3Afalse%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDatePicker&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
