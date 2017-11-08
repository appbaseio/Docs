---
id: singlelist
title: "SingleList"
layout: docs
sectionid: docs
permalink: docs/basic-components/singlelist.html
prev: togglebutton.html
prevTitle: "ToggleButton"
next: multilist.html
nextTitle: "MultiList"
---

![Image to be displayed](https://i.imgur.com/hFKkYws.png)

`SingleList` creates a single selection based list UI component that is connected to a database field.

Example uses:
* select a category item from a list of categories in an e-commerce website.
* select a cuisine item from a list of cuisine items in a food delivery app.

## Usage

### Basic Usage

```js
<SingleList
  componentId="CitySensor"
  dataField="group.group_city.raw"
  title="Cities"
/>
```

### Usage With All Props

```js
<SingleList
  componentId="CitySensor"
  dataField="group.group_city.raw"
  title="Cities"
  size={100}
  sortBy="count"
  defaultSelected="London"
  selectAllLabel="All Cities"
  showRadio={true}
  showCount={true}
  showSearch={true}
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
    data field to be connected to the component's UI view. The list items are filtered by a database query on this field.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **size** `Number` [optional]  
    control how many items to display in the List. Defaults to 100.
- **sortBy** `String` [optional]  
    sort the list items by one of `count`, `asc`, `desc`. Defaults to `count`, which sorts the list by the frequency of count     value, most first.
- **defaultSelected** `string` [optional]  
    pre-select an item from the list.
- **selectAllLabel** `String` [optional]  
    add an extra `Select all` item to the list with the provided label string.
- **showRadio** `Boolean` [optional]  
    show radio button icon for each list item. Defaults to `true`.
- **showCount** `Boolean` [optional]  
    show count value of the number of occurences besides a list item. Defaults to `true`.
- **showSearch** `Boolean` [optional]  
    whether to show a searchbox to filter the list items locally. Defaults to true.
- **placeholder** `String` [optional]  
    placeholder to be displayed in the searchbox, only applicable when the `showSearch` prop is set to true. When applicable, the default placeholder value is set to "Search".
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

<iframe height='500' scrolling='no' title='SingleList docs example' src='//codepen.io/sids-aquarius/embed/zdbOLE/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/zdbOLE/'>SingleList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/tDrawXi.png)


## Extending

`SingleList` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. specify how options should be filtered or updated using `react` prop.

```js
<SingleList
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
    CSS styles to be applied to the **SingleList** component.
- **customQuery** `Function`  
    is a callback function which accepts component's current **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **SingleList** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a list item is selected in a "Discounted Price" SingleList.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
- **react** `Object`  
    specify dependent components to reactively update **SingleList's** options.
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

<iframe height='500' scrolling='no' title='SingleList docs example' src='//codepen.io/sids-aquarius/embed/zdbOLE/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/zdbOLE/'>SingleList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [List with all the default props](../playground/?selectedKind=map%2FSingleList&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [List without search UI](../playground/?selectedKind=map%2FSingleList&selectedStory=Without%20Search&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [List with pre-selected items](../playground/?selectedKind=map%2FSingleList&selectedStory=Default%20Selected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [List with a custom sort order](../playground/?selectedKind=map%2FSingleList&selectedStory=Custom%20Sort&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

5. [List with a 'Select All' item](../playground/?selectedKind=map%2FSingleList&selectedStory=With%20Select%20All&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

6. [Playground (with all knob actions)](../playground/?knob-title=SingleList%3A%20City%20Filter&knob-size=100&knob-sortBy=count&knob-defaultSelected=San%20Francisco&knob-showCount=true&knob-showSearch=true&knob-placeholder=Search%20City&knob-selectAllLabel=All%20cities&selectedKind=map%2FSingleList&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
