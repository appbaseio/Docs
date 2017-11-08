---
id: datasearch
title: "DataSearch"
layout: docs
sectionid: docs
permalink: docs/basic-components/datasearch.html
prev: numberbox.html
prevTitle: "NumberBox"
next: datepicker.html
nextTitle: "DatePicker"
---

![Image to be displayed](https://i.imgur.com/dLeyahL.png)

`DataSearch` creates a search box UI component that is connected to one or more database fields.

Example uses:
* Searching for a rental listing by its `name` or `description` field.
* Creating an e-commerce search box for finding products by their listing properties.

## Usage

### Basic Usage

```js
<DataSearch
  componentId="SearchSensor"
  dataField={["group_venue", "group_city"]}
/>
```

### Usage With All Props

```js
<DataSearch
  componentId="SearchSensor"
  dataField={["group_venue", "group_city"]}
  title="Search"
  defaultSelected="Songwriting"
  searchWeight={[1, 3]}
  placeholder="Search for cities or venues"
  autoSuggest={true}
  initialSuggestions={[{label: "Songwriting", value: "Songwriting"}, {label: "Musicians", value: "Musicians"}]}
  highlight={true}
  highlightField="group_city"
  queryFormat="or"
  fuzziness={0}
  react={{
    and: ["CategoryFilter", "SearchFilter"]
  }}
  showFilter={true}
  filterLabel="Venue filter"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String or Array`  
    database field(s) to be connected to the component's UI view. DataSearch accepts an Array in addition to String, useful for applying search across multiple fields.
- **title** `String or HTML` [optional]  
    set the title of the component to be shown in the UI.
- **defaultSelected** `string` [optional]  
    preset the search query text in the search box.
- **searchWeight** `Array` [optional]  
    set the search weight for the database fields, useful when dataField is an Array of more than one field. This prop accepts an array of numbers. A higher number implies a higher relevance weight for the corresponding field in the search results.
- **placeholder** `String` [optional]  
    set the placeholder text to be shown in the searchbox input field. Defaults to "Search".
- **autoSuggest** `Boolean` [optional]  
    set whether the autosuggest functionality should be enabled or disabled. Defaults to `true`.
- **defaultSuggestions** `Array` [optional]
    preset search suggestions to be shown on focus when the search box does not have any search query text set. Accepts an array of objects each having a **label** and **value** property. The label can contain either String or an HTML element.
- **highlight** `Boolean` [optional]  
    whether highlighting should be enabled in the returned results.
- **highlightField** `String or Array` [optional]  
    when highlighting is enabled, this prop allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to applying highlights on the field(s) specified in the **dataField** prop.
- **queryFormat** `String` [optional]
    Sets the query format, can be **or** or **and**. Defaults to **or**.
    * **or** returns all the results matching **any** of the search query text's parameters. For example, searching for "bat man" with **or** will return all the results matching either "bat" or "man".
    * On the other hand with **and**, only results matching both "bat" and "man" will be returned. It returns the results matching **all** of the search query text's parameters.
- **fuzziness** `String or Number` [optional]
    Sets a maximum edit distance on the search parameters, can be **0**, **1**, **2** or **"AUTO"**. Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, **fox** can become **box**. Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html).
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='DataSearch docs example' src='//codepen.io/sids-aquarius/embed/rzRNWv/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/rzRNWv/'>DataSearch docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated Image](https://i.imgur.com/ysbmr3Gg.png)

## Extending

`DataSearch` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. specify how search suggestions should be filtered using `react` prop,
5. add the following [synthetic events](https://reactjs.org/docs/events.html) to the underlying `input` element:
    - onBlur
    - onFocus
    - onKeyPress
    - onKeyDown
    - onKeyUp
    - autoFocus

```js
<DataSearch
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
    CSS styles to be applied to the **DataSearch** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **DataSearch** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product in a DataSearch.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
- **react** `Object`  
    specify dependent components to reactively update **DataSearch's** suggestions.
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

<iframe height='500' scrolling='no' title='DataSearch docs example' src='//codepen.io/sids-aquarius/embed/rzRNWv/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/rzRNWv/'>DataSearch docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [DataSearch with all the default props](../playground/?selectedKind=map%2FDataSearch&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
2. [DataSearch with autoSuggest disabled](../playground/?knob-autoSuggest=false&selectedKind=map%2FDataSearch&selectedStory=Without%20autoSuggest&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
3. [Playground (with all knob actions)](../playground/?knob-autoSuggest=true&knob-title=DataSearch%3A%20Places&knob-placeholder=Search%20Places&knob-defaultSelected=&knob-weights%5B0%5D=1&knob-weights%5B1%5D=3&knob-fuzziness=1&selectedKind=map%2FDataSearch&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
