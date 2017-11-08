---
id: singledatalist
title: "SingleDataList"
layout: docs
sectionid: docs
permalink: docs/basic-components/singledatalist.html
prev: reactiveelement.html
prevTitle: "ReactiveElement"
next: multidatalist.html
nextTitle: "MultiDataList"
---

![Image to be displayed](https://i.imgur.com/pAnNBmo.png)

`SingleDataList` creates a radio select list UI component. It is used for filtering results based on the current selection from a list of data items.

> Note
>
> This component is like the [SingleList](/docs/basic-components/singlelist.html) component except the filters are set based on the `data` prop, ideal for showing custom UI filters in a list layout.

Example uses:
* select a category from a list of categories for filtering e-commerce search results.
* filtering restaurants by a cuisine choice.

## Usage

### Basic Usage

```js
<SingleDataList
  componentId="MeetupTops"
  dataField="group.group_topics.topic_name_raw.raw"
  title="Meetups"
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
/>
```

### Usage With All Props

```js
<SingleDataList
  componentId="MeetupTops"
  dataField="group.group_topics.topic_name_raw.raw"
  title="Meetups"
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
  showSearch={true}
  showRadio={true}
  placeholder="Filter meetups"
  defaultSelected="Social"
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
- **showRadio** `Boolean` [optional]  
    whether to display a radio button beside the list item. Defaults to `true`.
- **placeholder** `String` [optional]  
    placeholder to be displayed in the searchbox. Defaults to "Search".
- **defaultSelected** `String` [optional]  
    default selected value pre-selects an option from the list.
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

<iframe height='500' scrolling='no' title='SingleDataList docs example' src='//codepen.io/sids-aquarius/embed/wqOvwM/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/wqOvwM/'>SingleDataList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/ept36MO.png)

## Extending

`SingleDataList` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<SingleDataList
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
    CSS styles to be applied to the **SingleDataList** component.
- **customQuery** `Function`
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **SingleDataList** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a list item is selected in a "Discounted Price" SingleDataList.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='SingleDataList docs example' src='//codepen.io/sids-aquarius/embed/wqOvwM/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/wqOvwM/'>SingleDataList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [List with all the default props](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=Social&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FSingleDataList&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [List with a 'Select All' option](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=Social&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FSingleDataList&selectedStory=With%20selectAllLabel&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [List with pre-selected options](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=Social&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FSingleDataList&selectedStory=With%20defaultSelected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Playground (with all knob actions)](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected=Social&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=epoch_millis&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FSingleDataList&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
