---
id: multilevelmenu
title: "MultiLevelMenu"
layout: docs
sectionid: docs
permalink: docs/search-components/multilevelmenu.html
prev: categorysearch.html
prevTitle: "CategorySearch"
next: dynamicrangeslider.html
nextTitle: "DynamicRangeSlider"
---

![Image to be displayed](https://i.imgur.com/pyJzImP.png)

A `MultiLevelMenu` component creates a multi-level menu UI sensor. It is useful for displaying prominent items by categories.

Example uses:
* Show prominent items on an e-commerce app's front page.

## Usage

### Basic Usage

```js
<MultiLevelMenu
  componentId="CategorySensor"
  dataField={["brand.raw", "vehicleType.raw", "model.raw"]}
  data={[
    {label: "Volkswagen", value: "volkswagen"},
    {label: "BMW", value: "bmw"},
    {label: "Audi", value: "audi"},
    {label: "Nissan", value: "nissan"},
    {label: "Fiat", value: "fiat"}
  ]}
/>
```

### Usage With All Props

```js
<MultiLevelMenu
  componentId="CategorySensor"
  dataField={["brand.raw", "vehicleType.raw", "model.raw"]}
  data={[
    {label: "Volkswagen", value: "volkswagen"},
    {label: "BMW", value: "bmw"},
    {label: "Audi", value: "audi"},
    {label: "Nissan", value: "nissan"},
    {label: "Fiat", value: "fiat"}
  ]}
  maxCategories={10}
  maxItems={4}
  blacklist={["other", "misc"]}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `Array`  
    data fields to be mapped with the component's UI view. MultiLevelMenu component supports three (3) fields passed as an Array for Outer List > Category List > Items Sub List, in that order.
- **data** `Object Array`  
    an object array of {label:label, value:value} key-value pairs representing the outer list, `label` is displayed in the UI and `value` is its corresponding field value in the database.
- **maxCategories** `Number` [optional]  
    control how many items to display in the category list. Defaults to 10.
- **maxItems** `Number` [optional]  
    control how many items to display in the items sub list. Defaults to 4.
- **blacklist** `String Array`  
    hides all the matching values in category list and the items sub list.

## Syntax

<br>

<iframe height='500' scrolling='no' title='MultiLevelMenu docs example' src='//codepen.io/sids-aquarius/embed/jLdgzd/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/jLdgzd/'>MultiLevelMenu docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/GHJnKsB.png)

## Extending

`MultiLevelMenu` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. specify how search suggestions should be filtered using `react` prop.

```js
<MultiLevelMenu
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
  // specify how and which suggestions are filtered using `react` prop.
  react={
    "and": ["pricingFilter", "dateFilter"],
    "or": ["searchFilter"]
  }
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`
    CSS styles to be applied to the **MultiLevelMenu** component.
- **customQuery** `Function`
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **MultiLevelMenu** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product in a MultiLevelMenu.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
- **react** `Object`  
    specify dependent components to reactively update **MultiLevelMenu's** suggestions.
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

<iframe height='500' scrolling='no' title='MultiLevelMenu docs example' src='//codepen.io/sids-aquarius/embed/jLdgzd/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/jLdgzd/'>MultiLevelMenu docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [MultiLevelMenu with all the default props](../playground/?knob-title=NestedList%3A%20Car%20Filter&knob-data=%5B%7B"label"%3A"Volkswagen"%2C"value"%3A"volkswagen"%7D%2C%7B"label"%3A"BMW"%2C"value"%3A"bmw"%7D%5D&knob-filterLabel=Cars&knob-defaultSelected%5B0%5D=bmw&knob-defaultSelected%5B1%5D=x%20series&knob-blacklist%5B0%5D=&knob-maxCategories=10&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&filterBy=ReactiveSearch&knob-maxItems=4&knob-size=100&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&selectedKind=search%2FMultiLevelMenu&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [MultiLevelMenu with a blacklist](../playground/?knob-title=NestedList%3A%20Car%20Filter&knob-data=%5B%7B"label"%3A"Volkswagen"%2C"value"%3A"volkswagen"%7D%2C%7B"label"%3A"BMW"%2C"value"%3A"bmw"%7D%5D&knob-filterLabel=Cars&knob-defaultSelected%5B0%5D=bmw&knob-defaultSelected%5B1%5D=x%20series&knob-blacklist%5B0%5D=golf&knob-blacklist%5B1%5D=unknown&knob-maxCategories=10&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&filterBy=ReactiveSearch&knob-maxItems=4&knob-size=100&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&selectedKind=search%2FMultiLevelMenu&selectedStory=With%20Blacklist&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [MultiLevelMenu with maxCategories set](../playground/?knob-title=NestedList%3A%20Car%20Filter&knob-data=%5B%7B"label"%3A"Volkswagen"%2C"value"%3A"volkswagen"%7D%2C%7B"label"%3A"BMW"%2C"value"%3A"bmw"%7D%5D&knob-filterLabel=Cars&knob-defaultSelected%5B0%5D=bmw&knob-defaultSelected%5B1%5D=x%20series&knob-blacklist%5B0%5D=golf&knob-blacklist%5B1%5D=unknown&knob-maxCategories=6&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&filterBy=ReactiveSearch&knob-maxItems=4&knob-size=100&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&selectedKind=search%2FMultiLevelMenu&selectedStory=With%20maxCategories&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [MultiLevelMenu with maxItems set](../playground/?knob-title=NestedList%3A%20Car%20Filter&knob-data=%5B%7B"label"%3A"Volkswagen"%2C"value"%3A"volkswagen"%7D%2C%7B"label"%3A"BMW"%2C"value"%3A"bmw"%7D%5D&knob-filterLabel=Cars&knob-defaultSelected%5B0%5D=bmw&knob-defaultSelected%5B1%5D=x%20series&knob-blacklist%5B0%5D=golf&knob-blacklist%5B1%5D=unknown&knob-maxCategories=6&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&filterBy=ReactiveSearch&knob-maxItems=3&knob-size=100&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&selectedKind=search%2FMultiLevelMenu&selectedStory=With%20maxItems&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

5. [Playground (with all knob actions)](../playground/?knob-title=NestedList%3A%20Car%20Filter&knob-data=%5B%7B"label"%3A"Volkswagen"%2C"value"%3A"volkswagen"%7D%2C%7B"label"%3A"BMW"%2C"value"%3A"bmw"%7D%5D&knob-filterLabel=Cars&knob-defaultSelected%5B0%5D=bmw&knob-defaultSelected%5B1%5D=x%20series&knob-blacklist%5B0%5D=golf&knob-blacklist%5B1%5D=unknown&knob-maxCategories=10&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&filterBy=ReactiveSearch&knob-maxItems=4&knob-size=100&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&selectedKind=search%2FMultiLevelMenu&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
