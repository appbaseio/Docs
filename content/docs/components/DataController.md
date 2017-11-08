---
id: datacontroller
title: "DataController"
layout: docs
sectionid: docs
permalink: docs/basic-components/datacontroller.html
prev: daterange.html
prevTitle: "DateRange"
next: reactivelist.html
nextTitle: "ReactiveList"
---

![Image to be displayed](https://i.imgur.com/Lj5O2qg.png)

As the name suggests, a `DataContoller` component creates a UI optional component connected with a custom database query.

There are many cases where filtering of results is controlled by query preferences not visible in the view. A Data Controller comes in handy there.

Example uses:

* Showing personalized feeds based on user's global preferences that are not visible in the current UI view, like in meetup.com's recommendations to users.
* Extending the existing UI components to perform a user defined database query.

## Usage

### Basic Usage

```js
<DataController
  componentId="DataControllerSensor"
/>
```

### Usage With All Props

```js
<DataController
  componentId="DataControllerSensor"
  title="Data Controller Component"
  visible={true}
  dataLabel={
    <p>A customizable UI widget</p>
  }
  defaultSelected="default"
  showFilter={true}
  filterLabel="Venue filter"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique id of the sensor, can be referenced in another component's **react** prop.
- **title** `String or HTML` [optional]  
    Sets the title of the component to be shown in the UI, applicable when **visible** is set to `true`.
- **visible** `Boolean` [optional]  
    whether to show the UI for the component. Defaults to `false`.
- **dataLabel** `String or HTML` [optional]  
    set the UI markup. Accepts a string or an HTML element. This prop is only applicable when **visible** is set to `true`.
- **defaultSelected** `string` [optional]  
    pre-select a value in the data controller.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='DataController docs example' src='//codepen.io/sids-aquarius/embed/QMoWqM/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/QMoWqM/'>DataController docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated Image](http://i.imgur.com/ow7MEdG.png)

## Extending

`DataController` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<DataController
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
    CSS styles to be applied to the **DataController** component. This prop is only applicable when **visible** prop is set to `true`.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **DataController** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product via a DataController.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='DataController docs example' src='//codepen.io/sids-aquarius/embed/QMoWqM/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/QMoWqM/'>DataController docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [DataController with all the default props](../playground/?knob-visible=true&selectedKind=map%2FDataController&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
2. [DataController with UI](../playground/?knob-visible=true&selectedKind=map%2FDataController&selectedStory=With%20UI&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
3. [Playground (with all knob actions)](../playground/?knob-visible=true&knob-title=DataController&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-defaultSelected=default&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-showFilter=true&knob-filterLabel=Custom%20Filter%20Name&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&selectedKind=map%2FDataController&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
