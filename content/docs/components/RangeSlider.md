---
id: rangeslider
title: "RangeSlider"
layout: docs
sectionid: docs
permalink: docs/basic-components/rangeslider.html
prev: multirange.html
prevTitle: "MultiRange"
next: numberbox.html
nextTitle: "NumberBox"
---

![Image to be displayed](https://i.imgur.com/OYUWZHL.png)

`RangeSlider` creates a numeric range slider UI component. It is used for granular filtering of numeric data.

Example uses:

* filtering products from a price range in an e-commerce shopping experience.
* filtering flights from a range of departure and arrival times.

## Usage

### Basic Usage
```js
<RangeSlider
  componentId="RangeSliderSensor"
  dataField="guests"
  title="Guests"
  range={{
    "start": 0,
    "end": 10
  }}
/>
```

While `RangeSlider` only requires the above props to be used, it comes with many additional props for pre-setting default range values, setting the step value of the range slider, specifying labels for the range endpoints, whether to display histogram etc.

### Usage With All Props
```js
<RangeSlider
  componentId="RangeSliderSensor"
  dataField="guests"
  title="Guests"
  range={{
    "start": 0,
    "end": 10
  }}
  defaultSelected={{
    "start": 1,
    "end": 5
  }}
  rangeLabels={{
    "start": "Start",
    "end": "End"
  }}
  stepValue={1}
  showHistogram={true}
  interval={2}
  initialLoader="Rendering the histogram.."
  react={{
    and: ["CategoryFilter", "SearchFilter"]
  }}
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    DB data field to be mapped with the component's UI view. The selected range creates a database query on this field.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **range** `Object` [optional]  
    an object with `start` and `end` keys and corresponding numeric values denoting the minimum and maximum possible slider values.
- **defaultSelected** `Object` [optional]  
    an object with `start` and `end` keys and corresponding numeric values denoting the pre-selected range values.
- **rangeLabels** `Object` [optional]  
    an object with `start` and `end` keys and corresponding `String` labels to show labels near the ends of the `RangeSlider` component.
- **stepValue** `Number` [optional]  
    step value specifies the slider stepper. Value should be an integer between 1 and floor(#total-range/2). Defaults to 1.
- **showHistogram** `Boolean` [optional]  
    whether to display the range histogram or not. Defaults to `true`.
- **interval** `Number` [optional]  
    set the histogram bar interval, applicable when *showHistogram* is `true`. Defaults to `(range.end - range.start) / 10`.
- **initialLoader** `String or HTML` [optional]  
    display text while the data is being fetched, accepts `String` or `HTML` markup.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='RangeSlider docs example' src='//codepen.io/sids-aquarius/embed/mModrd/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/mModrd/'>RangeSlider docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/jXeI9W1.png)

## Extending

`RangeSlider` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. filter data using a combined query context via the `react` prop.

```js
<RangeSlider
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
  react={{
    "and": ["ListSensor"]
  }}
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS styles to be applied to the **RangeSlider** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **RangeSlider** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when some range is selected in a "Discounted Price" RangeSlider.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
- **react** `Object`  
    specify dependent components to reactively update **RangeSlider's** data view.
    - **key** `String`  
        one of `and`, `or`, `not` defines the combining clause.
        - **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        - **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        - **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    - **value** `String or Array or Object`  
        - `String` is used for specifying a single component by its `componentId`.
        - `Array` is used for specifying multiple components by their `componentId`.
        - `Object` is used for nesting other key clauses.

## Examples

<br>

<iframe height='500' scrolling='no' title='RangeSlider docs example' src='//codepen.io/sids-aquarius/embed/mModrd/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/mModrd/'>RangeSlider docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See more stories for RangeSlider on playground.

1. [Range with all the default props](../playground/?knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-title=ToggleButton%3A%20Meetup%20Categories&knob-multiSelect=true&selectedKind=map%2FRangeSlider&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [Range with a default selection](../playground/?knob-defaultSelected=%7B"start"%3A0%2C"end"%3A2%7D&knob-title=ToggleButton%3A%20Meetup%20Categories&knob-multiSelect=true&selectedKind=map%2FRangeSlider&selectedStory=With%20Default%20Selected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [Range without histogram](../playground/?knob-defaultSelected=%7B"start"%3A0%2C"end"%3A2%7D&knob-title=ToggleButton%3A%20Meetup%20Categories&knob-multiSelect=true&knob-showHistogram=false&selectedKind=map%2FRangeSlider&selectedStory=Without%20histogram&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [With Range Labels](../playground/?knob-defaultSelected=%7B"start"%3A0%2C"end"%3A2%7D&knob-title=ToggleButton%3A%20Meetup%20Categories&knob-multiSelect=true&knob-showHistogram=false&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&selectedKind=map%2FRangeSlider&selectedStory=With%20Range%20Labels&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

5. [Playground (with all knob actions)](../playground/?knob-defaultSelected=%7B"start"%3A0%2C"end"%3A2%7D&knob-title=RangeSlider%3A%20Guest%20RSVPs&knob-multiSelect=true&knob-showHistogram=true&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&knob-range=%7B"start"%3A0%2C"end"%3A5%7D&knob-stepValue=1&knob-interval=20&selectedKind=map%2FRangeSlider&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
