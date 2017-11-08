---
id: reactiveelement
title: "ReactiveElement"
layout: docs
sectionid: docs
permalink: docs/basic-components/reactiveelement.html
prev: reactivelist.html
prevTitle: "ReactiveList"
next: singledatalist.html
nextTitle: "SingleDataList"
---

![Image to be displayed](https://i.imgur.com/hwjCLss.png)

`ReactiveElement` is a user defined data-driven UI component. It allows the user to define a custom UI for displaying the results, and can reactively update its UI on data changes in other components.

Example uses:

* showing current trending topics based on the incoming data.
* showing a chart of financial stocks data.

## Usage

### Basic Usage

```js
<ReactiveElement
  react={{
    or: ["CitySensor", "SearchSensor"]
  }}
/>
```

### Usage With All Props

```js
<ReactiveElement
  componentId="ReactiveElementID"
  title="Reactive Element"
  stream={false}
  from={0}
  size={10}
  initialLoader="Loading Results.."
  noResults="No Results Found!"
  showResultStats={true}
  onResultStats={(total, took) => {
    return "found " + total + " results in " + took + "ms."
  }}
  react={{
    or: ["CitySensor", "SearchSensor"]
  }}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **title** `String or HTML` [optional]  
    title of the component, to be shown in the UI.
- **stream** `Boolean` [optional]  
    whether to stream new results in the UI based on the database updates. Defaults to `false`.
- **from** `Number` [optional]  
    starting point from where to fetch the results. Useful in a pagination context. Defaults to 0.
- **size** `Number` [optional]  
    number of results to show per view. Defaults to 20.
- **initialLoader** `String or HTML` [optional]  
    display to show the user while the data is loading, accepts `String` or `HTML` markup.
- **noResults** `String or HTML` [optional]  
    display to show the user when no results are found, accepts `String` or `HTML` markup.
- **showResultStats** `Boolean` [optional]  
    whether to show result stats in the form of results found and time taken. Defaults to `true`.
- **onResultStats** `Function` [optional]  
    show custom result stats using a function that takes two parameters for `time_taken` and `total_results` and returns a string.
- **react** `Object` [optional]  
    a dependency object defining how this component should react based on the state changes in the sensor components.

## Syntax

<br>

<iframe height='500' scrolling='no' title='ReactiveElement docs example' src='//codepen.io/divyanshu013/embed/EvBoRO/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/divyanshu013/pen/EvBoRO/'>ReactiveElement docs example</a> by Divyanshu (<a href='https://codepen.io/divyanshu013'>@divyanshu013</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image]()

## Extending

`ReactiveElement` component can be extended to
1. customize the look and feel with `className`, `style`,
2. render individual result data items using `onData`,
3. render the entire result data using  `onAllData`.

`onData` prop registers a function callback which is triggered every time there is a change in the data results so that the user can render the `ReactiveElement` component's UI view.

```js
// Register a callback function with the `onData` prop.
<ReactiveElement
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  onData={
    function(res) {
      return(
        <div>
          { res._source }
        </div>
      )
    }
  }
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS styles to be applied to the **ReactiveElement** component.
- **onData** `Function`  
    takes one parameter which contains the result object and returns a HTML element to be rendered in the component view.
- **onAllData** `Function`  
    an extension of the onData() function which contains the entire result data and returns an array of HTML elements to be rendered in the component view.

## Examples

<br>

<iframe height='500' scrolling='no' title='ReactiveElement docs example' src='//codepen.io/divyanshu013/embed/EvBoRO/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/divyanshu013/pen/EvBoRO/'>ReactiveElement docs example</a> by Divyanshu (<a href='https://codepen.io/divyanshu013'>@divyanshu013</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [ReactiveElement with all the default props with a single sensor filter](../playground/?knob-title=ReactiveElement&selectedKind=search%2FReactiveElement&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [ReactiveElement with a search and a filter sensor](../playground/?knob-title=ReactiveElement&selectedKind=search%2FReactiveElement&selectedStory=With%20title&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [ReactiveElement that shows streaming updates](../playground/?knob-title=ReactiveElement&knob-placeholder=Select%20city%20from%20the%20list&knob-showResultStats=false&selectedKind=search%2FReactiveElement&selectedStory=Stream&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Playground (with all knob actions)](../playground/?knob-title=ReactiveElement&knob-placeholder=Select%20city%20from%20the%20list&knob-showResultStats=true&knob-from=0&knob-size=5&knob-initialLoader=Loading%20results..&knob-noResults=No%20results%20found%21%20Try%20a%20different%20filter%20duh..&knob-stream=false&selectedKind=search%2FReactiveElement&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
