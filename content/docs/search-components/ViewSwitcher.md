---
id: viewswitcher
title: "ViewSwitcher"
layout: docs
sectionid: docs
permalink: docs/search-components/viewswitcher.html
prev: resultlist.html
prevTitle: "ResultList"
---

![Image to be displayed](https://i.imgur.com/n52BX8F.png)

`ViewSwitcher` creates a switchable UI component which can toggle different views, suited for showing same data in different ways for example a swtichable view for `ResultCard` and `ResultList`.

Example uses:

* showing e-commerce search results in a switchable card layout which can be switched to a list layout.

## Usage

```js
<ViewSwitcher
	data={[
		{
			label: "Grid",
			value: "rbc-resultcard"
		},
		{
			label: "List",
			value: "rbc-resultlist"
		}
	]}
	defaultSelected="rbc-resultcard"
/>
```

## Props

- **data** `Array`  
    an array of objects each with a **label** and **value** to define different views.
- **defaultSelected** `String` [optional]
    the default view for the ViewSwitcher, matches the **value** in an object in the `data` array.

## Syntax

<br>

<iframe height='500' scrolling='no' title='ViewSwitcher docs example' src='//codepen.io/divyanshu013/embed/xLoQjX/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/divyanshu013/pen/xLoQjX/'>ViewSwitcher docs example</a> by Divyanshu (<a href='https://codepen.io/divyanshu013'>@divyanshu013</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/n52BX8F.png)

## Extending

`ViewSwitcher` component can be extended to
1. customize the look and feel with `className`, `style`,

```js
<ViewSwitcher
  ...
  className="custom-class"
  // specify any number of custom styles.
  style={{"paddingBottom": "10px"}}
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS Styles to be applied to the **ResultCard** component.

## Examples

<br>

<iframe height='500' scrolling='no' title='ViewSwitcher docs example' src='//codepen.io/divyanshu013/embed/xLoQjX/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/divyanshu013/pen/xLoQjX/'>ViewSwitcher docs example</a> by Divyanshu (<a href='https://codepen.io/divyanshu013'>@divyanshu013</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [ViewSwitcher basic usage](../playground/?selectedKind=search%2FViewSwitcher&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
