---
id: numberbox
title: "NumberBox"
layout: docs
sectionid: docs
permalink: docs/basic-components/numberbox.html
prev: rangeslider.html
prevTitle: "RangeSlider"
next: datasearch.html
nextTitle: "DataSearch"
---

![Image to be displayed](https://i.imgur.com/0Xfg8pM.png)

`NumberBox` creates a box (or button) based numeric UI component. It is used for filtering results based on a numeric query.

Example uses:
* filtering hotel listings based on the number of guests,
* filtering movies or products by ratings.

## Usage

### Basic Usage

```js
<NumberBox
  componentId="NumberBoxSensor"
  dataField="guests"
  data={{ "label": "Guests", "start": 0, "end": 5 }}
  title="NumberBox component"
/>
```

### Usage With All Props

```js
<NumberBox
  componentId="NumberBoxSensor"
  dataField="guests"
  data={{ "label": "Guests", "start": 0, "end": 5 }}
  title="NumberBox component"
  defaultSelected={0}
  labelPosition="left"
  queryFormat="gte"
  showFilter={true}
  filterLabel="City"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    DB data field to be mapped with the component's UI view. The selected box value creates a database query on this field.
- **data** `Object`  
    an object with `start` and `end` values and optionally an associated `label` to be displayed in the UI.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **defaultSelected** `Number` [optional]  
    preset a valid value within the [start, end] range.
- **labelPosition** `String` [optional]  
    position where label is shown, one of "left", "top", "right", "bottom". Defaults to `left`.
- **queryFormat** `String` [optional]  
    type of query to perform, one of `exact`, `gte` and `lte`:
    * `exact` implies a query match with the exact value as the one selected in the UI view,
    * `gte` implies a query match that satisfies all values that are greater than or equal to the one selected in the UI view.
    * `lte` implies a query match that satisfies all values that are less than or equal to the one selected in the UI view.  

    Defaults to `gte`.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the number. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='NumberBox docs example' src='//codepen.io/sids-aquarius/embed/qXvBag/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/qXvBag/'>NumberBox docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/DV7hKyN.png)


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
    CSS styles to be applied to the **NumberBox** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **NumberBox** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a number is selected in a NumberBox.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.


## Examples

<br>

<iframe height='500' scrolling='no' title='NumberBox docs example' src='//codepen.io/sids-aquarius/embed/qXvBag/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/qXvBag/'>NumberBox docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [A NumberBox component with defaults](../playground/?knob-title=Number%20of%20Guests&knob-defaultSelected=2&selectedKind=search%2FNumberBox&selectedStory=With%20defaultSelected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [Playground (with all knob actions)](../playground/?knob-title=Number%20of%20Guests&knob-defaultSelected=3&knob-data=%7B"start"%3A1%2C"end"%3A16%2C"label"%3A"Guests"%7D&knob-labelPosition=right&knob-queryFormat=exact&selectedKind=search%2FNumberBox&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
