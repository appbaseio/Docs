---
id: multidropdownlist
title: "MultiDropdownList"
layout: docs
sectionid: docs
permalink: docs/basic-components/multidropdownlist.html
prev: singledropdownlist.html
prevTitle: "SingleDropdownList"
next: singledropdownrange.html
nextTitle: "SingleDropdownRange"
---

![Image to be displayed](https://i.imgur.com/ZZ0MG6N.png)

`MultiDropdownList` creates a  dropdown based multiple selection list UI component that is connected to a database field. It is used for filtering results based on the current selection from a list of items.

> Note
>
> This component is exactly like the [MultiList](/docs/basic-components/multilist.html) component except the UI is based on a dropdown, ideal for showing additional UI filters while conserving screen space.

Example uses:
* create an e-commerce facet like search experience.
* create a filter for airlines to fly by in a flight booking experience.

## Usage

### Basic Usage

```js
<MultiDropdownList
  componentId="CitySensor"
  dataField="group.group_city.raw"
  title="Cities"
/>
```

### Usage With All Props

```js
<MultiDropdownList
  componentId="CitySensor"
  dataField="group.group_city.raw"
  title="Cities"
  size={100}
  sortBy="count"
  defaultSelected={["London"]}
  showCount={true}
  placeholder="Search City"
  initialLoader="Loading cities list.."
  react={{
    and: ["CategoryFilter", "SearchFilter"]
  }}
  showFilter={true}
  filterLabel="City"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    DB data field to be mapped with the component's UI view. The dropdown list items are filtered by a database query on this field.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **size** `Number` [optional]  
    control how many items to display in the List. Defaults to 100.
-  **sortBy** `String` [optional]  
    property that decides on how to sort the list items, accepts one of `count`, `asc` or `desc` as valid values.
    * `count` sorts the list based on the count occurences, with highest value at the top.
    * `asc` sorts the list in the ascending order of the list item (Alphabetical).
    * `desc` sorts the list in the descending order of the term. Defaulted to `count`.
- **defaultSelected** `Array` [optional]  
    pre-select one or more options from the dropdown list. Accepts an `Array` object containing the items that should be selected. It is important for the passed value(s) exactly match with the field value(s) as stored in appbase.io app.
- **queryFormat** `String` [optional]  
    queries the selected items from the list in one of two modes: `or`, `and`.
    * Defaults to `or` which queries for results where any of the selected list items are present.
    * In `and` mode, the applied query filters results where all of the selected items are present.
- **showCount** `Boolean` [optional]  
    show count of number of occurences besides an item. Defaults to `true`.
- **placeholder** `String` [optional]  
    placeholder to be displayed in the dropdown searchbox.
- **initialLoader** `String or HTML` [optional]  
    display text while the data is being fetched, accepts `String` or `HTML` markup.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='MultiDropdownList docs example' src='//codepen.io/sids-aquarius/embed/NvJKQN/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/NvJKQN/'>MultiDropdownList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/TqKvRhF.png)

## Extending

`MultiDropdownList` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. specify how options should be filtered or updated using `react` prop.

```js
<MultiDropdownList
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
  // specify how and which options are filtered using `react` prop.
  react={
    "and": ["pricingFilter", "dateFilter"],
    "or": ["searchFilter"]
  }
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS styles to be applied to the **MultiDropdownList** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **MultiDropdownList** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when list item(s) is/are selected in a "Discounted Price" MultiDropdownList.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
- **react** `Object`  
    specify dependent components to reactively update **MultiDropdownList's** options.
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

<iframe height='500' scrolling='no' title='MultiDropdownList docs example' src='//codepen.io/sids-aquarius/embed/NvJKQN/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/NvJKQN/'>MultiDropdownList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [List with all the default props](../playground/?selectedKind=map%2FMultiDropdownList&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [List with a placeholder](../playground/?knob-placeholder=Select%20Cities&selectedKind=map%2FMultiDropdownList&selectedStory=With%20Placeholder&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [List with a 'Select All' option](../playground/?knob-placeholder=Select%20Cities&knob-selectAllLabel=All%20Cities&selectedKind=map%2FMultiDropdownList&selectedStory=With%20Select%20All&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [List with pre-selected options](../playground/?knob-placeholder=Select%20Cities&knob-selectAllLabel=All%20Cities&knob-defaultSelected%5B0%5D=London&knob-defaultSelected%5B1%5D=Melbourne&selectedKind=map%2FMultiDropdownList&selectedStory=With%20Default%20Selected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

5. [Playground (with all knob actions)](../playground/?knob-title=MultiDropdownList&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=City%20filter&knob-defaultSelected%5B0%5D=London&knob-defaultSelected%5B1%5D=Melbourne&knob-selectAllLabel=All%20Cities&knob-showFilter=true&knob-sortBy=count&knob-size=100&knob-showCount=true&knob-placeholder=Select%20Cities&selectedKind=map%2FMultiDropdownList&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
