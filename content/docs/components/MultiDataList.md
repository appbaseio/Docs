---
id: multidatalist
title: "MultiDataList"
layout: docs
sectionid: docs
permalink: docs/basic-components/multidatalist.html
prev: singledatalist.html
prevTitle: "SingleDataList"
next: singledropdownlist.html
nextTitle: "SingleDropdownList"
---

![Image to be displayed](https://i.imgur.com/cEAUorS.png)

`MultiDataList` creates a multiple checkbox list UI component that is connected to a database field. It is used for filtering results based on the current selection(s) from a list of data items.

> Note
>
> This component behaves similar to the [MultiList](/docs/basic-components/multilist.html) component except the list items are user defined with the `data` prop, ideal for showing curated items in a list layout.

Example uses:
* select one or multiple items from a list of categories for filtering e-commerce search results.
* filtering restaurants by one or more cuisine choices.

## Usage

### Basic Usage

```js
<MultiDataList
  componentId="MeetupTops"
  dataField="group.group_topics.topic_name_raw.raw"
  data={
    [{
      label: "Social",
      value: "Social"
    }, {
      label: "Travel",
      value: "Travel"
    }, {
      label: "Outdoors",
      value: "Outdoors"
    }]
  }
  title="Meetups"
/>
```

### Usage With All Props

```js
<MultiDataList
  componentId="MeetupTops"
  dataField="group.group_topics.topic_name_raw.raw"
  data={
    [{
      label: "Social",
      value: "Social"
    }, {
      label: "Travel",
      value: "Travel"
    }, {
      label: "Outdoors",
      value: "Outdoors"
    }]
  }
  title="Meetups"
  showSearch={true}
  showCheckbox={true}
  placeholder="Filter meetups"
  defaultSelected={["Social"]}
  selectAllLabel="All meetups"
  showFilter={true}
  filterLabel="Price"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    data field to be connected to the component's UI view.
- **data** `Object Array`  
    collection of UI `labels` with associated `value` to be matched against the database field.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **showSearch** `Boolean` [optional]  
    whether to display a searchbox to filter the data list. Defaults to `false`.
- **showCheckbox** `Boolean` [optional]  
    whether to display a checkbox button beside the list item. Defaults to `true`.
- **placeholder** `String` [optional]  
    placeholder to be displayed in the searchbox. Defaults to "Search".
- **defaultSelected** `String Array` [optional]  
    default selected value(s) pre-selects option(s) from the list.
- **selectAllLabel** `String` [optional]  
    if provided displays an additional option to selct all list values.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='MultiDataList docs example' src='//codepen.io/sids-aquarius/embed/vJPYBw/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/vJPYBw/'>MultiDataList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/IYGEhao.png)

## Extending

`MultiDataList` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<MultiDataList
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
    CSS styles to be applied to the **MultiDataList** component.
- **customQuery** `Function`
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **MultiDataList** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when list item(s) is/are selected in a "Discounted Price" MultiDataList.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='MultiDataList docs example' src='//codepen.io/sids-aquarius/embed/vJPYBw/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/vJPYBw/'>MultiDataList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [List with all the default props](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=Social&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FMultiDataList&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [List with a 'Select All' option](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=Social&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FMultiDataList&selectedStory=With%20selectAllLabel&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [List with pre-selected options](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FMultiDataList&selectedStory=With%20defaultSelected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Playground (with all knob actions)](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=or&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-showCheckbox=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FMultiDataList&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
