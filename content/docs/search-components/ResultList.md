---
id: resultlist
title: "ResultList"
layout: docs
sectionid: docs
permalink: docs/search-components/resultlist.html
prev: resultcard.html
prevTitle: "ResultCard"
next: viewswitcher.html
nextTitle: "ViewSwitcher"
---

![Image to be displayed](https://i.imgur.com/X3WPi1k.png)

`ResultList` creates a result list UI component to display results in a list layout, suited for data that needs a compact display.

Example uses:

* showing e-commerce search listings.
* showing filtered hotel booking results.

> Note
>
> An alternative layout to ResultList is a [**ResultCard**](/docs/search-components/resultcard.html), which displays result data in a card layout.

## Usage

### Basic Usage

```js
<ResultList
  react={{
    "and": ["PriceFilter", "SearchFilter"]
  }}
  onData={this.onData}
/>
```

### Pagination Usage With All Props

```js
<ResultList
  componentId="ResultList01"
  dataField="ratings"
  title="Result List"
  stream={true}  
  sortBy="desc"
  from={0}
  size={8}
  pagination={true}
  paginationAt="bottom"
  pages={5}
  showResultStats={true}
  placeholder="Select a rating"
  initialLoader="Loading Results.."
  noResults="No Matching Results Found!"
  react={{
    and: ["PriceFilter", "SearchFilter"]
  }}
  onData={this.onData}
/>
```

### Infinite Scroll Usage With All Props

```js
<ResultList
  componentId="ResultList01"
  dataField="ratings"
  title="Result List"
  stream={true}  
  sortBy="desc"
  from={0}
  size={8}
  pagination={false}
  scrollOnTarget={window}
  showResultStats={true}
  placeholder="Select a rating"
  initialLoader="Loading Results.."
  noResults="No Matching Results Found!"
  react={{
    and: ["PriceFilter", "SearchFilter"]
  }}
  onData={this.onData}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    data field to be mapped with `ResultList`'s UI view, used for providing a sorting context.
- **title** `String or HTML` [optional]  
    title of the component, to be shown in the UI.
- **stream** `Boolean` [optional]  
    whether to stream new result updates in the UI. Defaults to `false`.
- **pagination** `Boolean` [optional]  
    pagination <> infinite scroll switcher. Defaults to `false`, i.e. an infinite scroll based view. When set to `true`, a pagination based list view with page numbers will appear.
- **scrollOnTarget** `Object` [optional]  
    accepts an object to set the infinite loading reference to the passed object, for example setting it to `window` will load new results when the `window` is scrolled.
- **paginationAt** `String` [optional]  
    Determines the position where to show the pagination, only applicable when **pagination** prop is set to `true`. Accepts one of `top`, `bottom` or `both` as valid values. Defaults to `bottom`.
- **pages** `Number` [optional]  
    number of pages to show at at time, defaults to 5.
- **sortBy** `String` [optional]  
    sort the results by either `asc` or `desc` order. It is an alternative to `sortOptions`, both can't be used together.
- **sortOptions** `Object Array` [optional]  
    an alternative to the `sortBy` prop, `sortOptions` creates a sorting view in the ResultList component's UI. Each array element is an object that takes three keys:
    - `label` - label to be displayed in the UI.
    - `dataField` - data field to use for applying the sorting criteria on.
    - `sortBy` - specified as either `asc` or `desc`.
- **from** `Number` [optional]  
    starting point from where to fetch the results. Useful in a pagination context. Defaults to 0.
- **size** `Number` [optional]  
    number of results to show per view. Defaults to 20.
- **placeholder** `String or HTML` [optional]  
    display to show the user when there is nothing selected in the sensor components, accepts `String` or `HTML` markup.
- **initialLoader** `String or HTML` [optional]  
    display to show the user while the data is loading, accepts `String` or `HTML` markup.
- **noResults** `String or HTML` [optional]  
    display to show the user when no results are found, accepts `String` or `HTML` markup.
- **showResultStats** `Boolean` [optional]  
    whether to show result stats in the form of results found and time taken. Defaults to `true`.
- **onResultStats** `Function` [optional]  
    show custom result stats using a function that takes two parameters for `time_taken` and `total_results` and returns a string.
- **react** `Object`  
    a dependency object defining how this component should react based on the state changes in the sensor components. You can read more about how to specify this prop over [here](/docs/advanced/react.html).
- **onData** `Function` [optional]  
    returns a card element object to be rendered based on the `res` data object. This callback function prop is called for each data item rendered in the **ResultList** component's view.
    ```js
    onData={
      function(res) {
        return {
          image: res.image,
          title: res.name,
          desc: (
              <div>
                  <div className="price">${res.price}</div>
                  <p>{res.room_type} · {res.accommodates} guests</p>
              </div>
          ),
          url: res.listing_url
        }
      }
    }
    ```
    The return format for the callback function is an object with `image`, `image_size`, `title`, `desc` and `url` fields.

## Syntax

<br>

<iframe height='500' scrolling='no' title='ResultList docs example' src='//codepen.io/sids-aquarius/embed/BdMXeG/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/BdMXeG/'>ResultList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/ngVXOoB.png)

## Extending

`ResultList` component can be extended to
1. customize the look and feel with `className`, `style`,
2. render individual result data items using `onData`,
3. specify how results should be filtered using `react`.

```js
<ResultList
  ...
  className="custom-class"
  // specify any number of custom styles.
  style={{"paddingBottom": "10px"}}
  // register a callback function with the `onData` prop.
  onData={
    function(res) {
      return {
        image: res.image,
        title: res.name,
        url: res.listing_url
      }
    }
  }
  // specify how and which results are filtered using `react` prop.
  react={
    "and": ["pricingFilter", "dateFilter"],
    "or": ["searchFilter"]
  }
/>
```

- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS Styles to be applied to the **ResultList** component.
- **onData** `Function` [optional]  
    a callback function where user can define how to render the view based on the data changes. In `ResultList`'s case, the expected return format is an object with `image`, `image_size`, `title`, `url` and `desc` keys.
- **react** `Object`  
    specify dependent components to reactively update **ResultList's** data view.
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

<iframe height='500' scrolling='no' title='ResultList docs example' src='//codepen.io/sids-aquarius/embed/BdMXeG/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/BdMXeG/'>ResultList docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See more stories for ResultList on playground.

1. [ResultList with infinite scroll](../playground/?knob-title=Cars%20result&knob-data=%5B%7B"start"%3A4%2C"end"%3A5%2C"label"%3A"4%20stars%20and%20up"%7D%2C%7B"start"%3A3%2C"end"%3A5%2C"label"%3A"3%20stars%20and%20up"%7D%2C%7B"start"%3A2%2C"end"%3A5%2C"label"%3A"2%20stars%20and%20up"%7D%2C%7B"start"%3A1%2C"end"%3A5%2C"label"%3A">%201%20stars"%7D%5D&knob-paginationAt=bottom&knob-filterLabel=Cities%20filter&knob-defaultSelected%5B0%5D=Auckland&knob-blacklist%5B0%5D=golf&knob-blacklist%5B1%5D=unknown&knob-maxCategories=10&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-showResultStats=true&knob-stepValue=1&filterBy=ReactiveSearch&knob-showHistogram=true&knob-pagination=true&knob-maxItems=4&knob-size=5&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&knob-multiSelect=true&selectedKind=search%2FResultList&selectedStory=With%20infinite%20loading&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [ResultList with pagination](../playground/?knob-title=Cars%20result&knob-data=%5B%7B"start"%3A4%2C"end"%3A5%2C"label"%3A"4%20stars%20and%20up"%7D%2C%7B"start"%3A3%2C"end"%3A5%2C"label"%3A"3%20stars%20and%20up"%7D%2C%7B"start"%3A2%2C"end"%3A5%2C"label"%3A"2%20stars%20and%20up"%7D%2C%7B"start"%3A1%2C"end"%3A5%2C"label"%3A">%201%20stars"%7D%5D&knob-paginationAt=bottom&knob-filterLabel=Cities%20filter&knob-defaultSelected%5B0%5D=Auckland&knob-blacklist%5B0%5D=golf&knob-blacklist%5B1%5D=unknown&knob-maxCategories=10&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-showResultStats=true&knob-stepValue=1&filterBy=ReactiveSearch&knob-showHistogram=true&knob-pagination=true&knob-maxItems=4&knob-size=5&knob-showCount=true&knob-placeholder=Search%20Cars&knob-showSearch=true&knob-multiSelect=true&selectedKind=search%2FResultList&selectedStory=With%20pagination&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs).
