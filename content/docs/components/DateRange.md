---
id: daterange
title: "DateRange"
layout: docs
sectionid: docs
permalink: docs/basic-components/daterange.html
prev: datepicker.html
prevTitle: "DatePicker"
next: datacontroller.html
nextTitle: "DataController"
---

![Image to be displayed](https://i.imgur.com/Tl2xXNS.png)

`DateRange` creates a calendar view based UI component that is connected to date fields. It is used for filtering results by a date like property.

Example uses:
* picking a date range for booking a hotel room.
* finding search results from a database based on date range.

## Usage

### Basic Usage

```js
<DateRange
  componentId="DateSensor"
  dataField="mtime"
/>
```

### Usage With All Props

```js
<DateRange
  componentId="DateSensor"
  dataField="mtime"
  title="DateRange"
  defaultSelected={{
    start: moment('2017-04-01'),
    end: moment('2017-04-07')
  }}
  numberOfMonths={2}
  allowAllDates={true}
  queryFormat="basic_date"
  extra={{
    "withFullScreenPortal": false,
    "showClearDate": true
  }}
  showFilter={true}
  filterLabel="Date"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String or Array`  
    database field(s) to be connected to the component's UI view.
    * If passed as an `Array` of length 2, the first `String` element is used for the lower bound and the second `String` element is used for the upper bound of the range.
    * If passed as a `String`, the field is used for both lower and upper bounds match based on the selected values from the component UI view.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **defaultSelected** `Object` [optional]  
    pre-select a default date range based on an object having a **start** and **end** [moment](https://github.com/moment/moment/) object representing a date range.
- **numberOfMonths** `Number` [optional]  
    number of months to be shown in the calendar view. Defaults to 2.
- **allowAllDates** `Boolean` [optional]  
    whether to all all dates or dates starting from today. Defaults to `true`, i.e. allowing all dates.
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
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='DateRange docs example' src='//codepen.io/sids-aquarius/embed/prYoRW/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/prYoRW/'>DateRange docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/tEwBtgX.png)

## Extending

`DateRange` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<DataSearch
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  customQuery={
    function(value) {
      return {
        range: {
          lte: "now"
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
    CSS styles to be applied to the **DateRange** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **DateRange** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a particular date range is selected in a DateRange.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='DateRange docs example' src='//codepen.io/sids-aquarius/embed/prYoRW/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/prYoRW/'>DateRange docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [Basic component example](../playground/?knob-title=Date%20Range&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date%20range&knob-defaultSelected=default&knob-queryFormat=date&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDateRange&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [Show more than one month](../playground/?knob-title=Date%20Range&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date%20range&knob-defaultSelected=default&knob-queryFormat=date&knob-numberOfMonths=3&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDateRange&selectedStory=Show%20more%20than%201%20month&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [With default date](../playground/?knob-title=Date%20Range&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date%20range&knob-defaultSelected=default&knob-queryFormat=date&knob-numberOfMonths=3&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDateRange&selectedStory=Default%20date&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Enable days only starting today onwards](../playground/?knob-title=Date%20Range&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date%20range&knob-defaultSelected=default&knob-queryFormat=date&knob-numberOfMonths=3&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=false&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDateRange&selectedStory=Enable%20days%20from%20today%20only&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

5. [An example using `extra` prop](../playground/?knob-title=Date%20Range&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date%20range&knob-defaultSelected=default&knob-queryFormat=date&knob-numberOfMonths=3&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=false&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDateRange&selectedStory=Using%20extra%20prop%20object&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

6. [Playground mode](../playground/?knob-title=Date%20Range&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Date%20range&knob-defaultSelected=default&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-placeholder=Pick%20date&selectedKind=map%2FDateRange&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
