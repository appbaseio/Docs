---
id: selectedfilters
title: "SelectedFilters"
layout: docs
sectionid: docs
permalink: docs/basic-components/selectedfilters.html
prev: multidropdownrange.html
prevTitle: "MultiDropdownRange"
---

![Image to be displayed](https://i.imgur.com/DyW5jJ2.png)

`SelectedFilters` creates a selectable filter UI view displaying the current selected values from other components. This component is useful for improving selection accessibility of other components.

Example uses:
* displaying all the user selected facet filters together in the main view area for better accessibility.
* building mobile responsive views where it is not practical to show all the UI components in the main view.

## Usage

### Basic Usage

```js
<SelectedFilters />
```

### Props

The `SelectedFilters` component itself doesn't have any props.

Facet type components have a prop `showFilter` (defaults to `true`) which can be used to control whether the component's selected state appears in the SelectedFilters component. There is also a `filterLabel` prop which controls how that component is displayed.

As an example, check [MultiList usage](/docs/basic-components/multilist.html#usage) to see how `showFilter` and `filterLabel` can be used.

### Syntax

<br>

<iframe height='500' scrolling='no' title='SelectedFilters docs example' src='//codepen.io/divyanshu013/embed/ayMNZW/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/divyanshu013/pen/ayMNZW/'>SelectedFilters docs example</a> by Divyanshu (<a href='https://codepen.io/divyanshu013'>@divyanshu013</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/DzFn900.png)

## Extending

`SelectedFilters` component can be extended to customize the look and feel with `className`, `style`.

```js
<SelectedFilters
  className="custom-class"
  style={{"paddingBottom": "10px"}}
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`
    CSS styles to be applied to the **SelectedFilters** component.

### Examples

<br>

<iframe height='500' scrolling='no' title='SelectedFilters docs example' src='//codepen.io/divyanshu013/embed/ayMNZW/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/divyanshu013/pen/ayMNZW/'>SelectedFilters docs example</a> by Divyanshu (<a href='https://codepen.io/divyanshu013'>@divyanshu013</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [Filters with all the default props](../playground/?selectedKind=search%2FSelectedFilters&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [List component with filters disabled](../playground/?knob-showFilter=false&selectedKind=search%2FSelectedFilters&selectedStory=With%20no%20filter&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [List component with custom filterLabel](../playground/?knob-showFilter=false&knob-filterLabel=City%20filter&selectedKind=search%2FSelectedFilters&selectedStory=With%20filterLabel&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Playground (with all knob actions)](../playground/?knob-showFilter=true&knob-filterLabel=City%20filter&selectedKind=search%2FSelectedFilters&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
