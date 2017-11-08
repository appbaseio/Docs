---
id: multirange
title: "MultiRange"
layout: docs
sectionid: docs
permalink: docs/basic-components/multirange.html
prev: singlerange.html
prevTitle: "SingleRange"
next: rangeslider.html
nextTitle: "RangeSlider"
---

![Image to be displayed](https://i.imgur.com/XqRjLSS.png)

`MultiRange` creates a multiple checkbox based numeric range UI component.

> Note
>
> It is similar to a [MultiList](/docs/basic-components/multilist.html) component but for numeric data fields.

Example uses:
* filtering search results by prices in an e-commerce or food delivery experience.
* browsing movies by a ratings filter.

## Usage

### Basic Usage

```js
<MultiRange
  componentId="PriceSensor"
  dataField="price"
  data={
    [{"start": 0, "end": 10, "label": "Cheap"},
     {"start": 11, "end": 20, "label": "Moderate"},
     {"start": 21, "end": 50, "label": "Pricey"},
     {"start": 51, "end": 1000, "label": "First Date"}]
  }
  title="Prices"
/>
```

### Usage With All Props

```js
<MultiRange
  componentId="PriceSensor"
  dataField="price"
  data={
    [{"start": 0, "end": 10, "label": "Cheap"},
     {"start": 11, "end": 20, "label": "Moderate"},
     {"start": 21, "end": 50, "label": "Pricey"},
     {"start": 51, "end": 1000, "label": "First Date"}]
  }
  title="Prices"
  defaultSelected={["Cheap", "Moderate"]}
  showCheckbox={true}
  showFilter={true}
  filterLabel="Prices"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    data field to be connected to the component's UI view. The range items are filtered by a database query on this field.
- **data** `Object Array`  
    collection of UI `labels` with associated `start` and `end` range values.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **defaultSelected** `Array` [optional]  
    pre-select one or more labels from the `data` array.
- **showCheckbox** `Boolean` [optional]  
    show checkbox icon for each range item. Defaults to `true`.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected values of the ranges. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='MultiRange docs example' src='//codepen.io/sids-aquarius/embed/WEmNvo/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/WEmNvo/'>MultiRange docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/m3uFfKj.png)

## Extending

`MultiRange` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<MultiRange
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
    CSS styles to be applied to the **MultiRange** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **MultiRange** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code(s) when range item(s) is/are selected in a "Prices" MultiRange.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='MultiRange docs example' src='//codepen.io/sids-aquarius/embed/WEmNvo/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/WEmNvo/'>MultiRange docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [Range with all the default props](../playground/?knob-title=MultiDropdownRange%3A%20Earthquake%20Magnitude&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=City%20filter&knob-defaultSelected%5B0%5D=London&knob-defaultSelected%5B1%5D=Melbourne&knob-selectAllLabel=All%20Cities&knob-showFilter=true&knob-sortBy=count&knob-size=100&knob-showCount=true&knob-placeholder=Search%20places&selectedKind=map%2FMultiRange&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [Range with pre-selected items](../playground/?knob-title=MultiDropdownRange%3A%20Earthquake%20Magnitude&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=City%20filter&knob-defaultSelected%5B0%5D=Major&knob-defaultSelected%5B1%5D=Moderate&knob-selectAllLabel=All%20Cities&knob-showFilter=true&knob-sortBy=count&knob-size=100&knob-showCount=true&knob-placeholder=Search%20places&selectedKind=map%2FMultiRange&selectedStory=With%20Default%20Selected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [Playground (with all knob actions)](../playground/?knob-title=MultiRange%3A%20Filter&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Earthquake%20range%20filter&knob-defaultSelected%5B0%5D=Major&knob-defaultSelected%5B1%5D=Moderate&knob-selectAllLabel=All%20Cities&knob-showFilter=true&knob-sortBy=count&knob-showCheckbox=true&knob-size=100&knob-showCount=true&knob-placeholder=Search%20places&selectedKind=map%2FMultiRange&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
