---
id: textfield
title: "TextField"
layout: docs
sectionid: docs
permalink: docs/basic-components/textfield.html
redirect_from:
    - "docs"
    - "docs/basic-components"
next: togglebutton.html
nextTitle: "ToggleButton"
---

![Image to be displayed](https://i.imgur.com/0fnMNaz.png)

`TextField` creates a simple text input field component that is optionally data connected. It can be further extended by specifying a user defined query on the input data.

## Usage

### Basic Usage

```js
<TextField
  componentId="NameTextSensor"
  dataField="name"
/>
```

### Usage With All Props

```js
<TextField
  componentId="NameTextSensor"
  dataField="name"
  title="TextField"
  defaultSelected="volvo"
  placeholder="Type a car name"
  showFilter={true}
  filterLabel="Car"
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
- **defaultSelected** `Number` [optional]  
    preset some value in the text field.
- **placeholder** `String` [optional]  
    placeholder to be displayed in the text field when it has no value.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the text field. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='TextField docs example' src='//codepen.io/sids-aquarius/embed/OjqJbN/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/OjqJbN/'>TextField docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/EeShH2p.png)

## Extending

`TextField` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. add the following [synthetic events](https://reactjs.org/docs/events.html) to the underlying `input` element:
    - onBlur
    - onFocus
    - onKeyPress
    - onKeyDown
    - onKeyUp
    - autoFocus

```js
<TextField
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
    CSS styles to be applied to the **TextField** component.
- **customQuery** `Function`
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **TextField** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for something in the TextField.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='TextField docs example' src='//codepen.io/sids-aquarius/embed/OjqJbN/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/OjqJbN/'>TextField docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [Text field  with default props](../playground/?knob-title=Number%20of%20Guests&knob-defaultSelected=Nissan&knob-data=%7B"start"%3A1%2C"end"%3A16%2C"label"%3A"Guests"%7D&knob-labelPosition=right&knob-queryFormat=exact&selectedKind=search%2FTextField&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [Text field with a default selected value](../playground/?knob-title=Number%20of%20Guests&knob-defaultSelected=Nissan&knob-data=%7B"start"%3A1%2C"end"%3A16%2C"label"%3A"Guests"%7D&knob-labelPosition=right&knob-queryFormat=exact&selectedKind=search%2FTextField&selectedStory=DefaultSelected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [Playground (with all knob actions)](../playground/?knob-title=TextField%3A%20Car%20Search&knob-defaultSelected=nissan&knob-data=%7B"start"%3A1%2C"end"%3A16%2C"label"%3A"Guests"%7D&knob-labelPosition=right&knob-queryFormat=exact&knob-placeholder=Type%20a%20car%20name&selectedKind=search%2FTextField&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
