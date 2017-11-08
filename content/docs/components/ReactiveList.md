---
id: reactivelist
title: "ReactiveList"
layout: docs
sectionid: docs
permalink: docs/basic-components/reactivelist.html
prev: datacontroller.html
prevTitle: "DataController"
next: reactiveelement.html
nextTitle: "ReactiveElement"
---

![Image to be displayed](https://i.imgur.com/GcUFZjh.png)

`ReactiveList` creates a data-driven result list UI component. This list can reactively update itself based on changes in other components or changes in the database itself.

This component forms the base for building more specific result display components like [`ResultCard`](/docs/search-components/resultcard.html) or [`ResultList`](/docs/search-components/resultlist.html).

Example uses:

* showing a feed of results based on the applied search criteria.
* streaming realtime feed updates based on applied criteria like in a newsfeed.

## Usage

### Basic Usage

```js
<ReactiveList
  react={{
    "and": ["CitySensor", "SearchSensor"]
  }}
/>
```

### Usage With All Props

```js
<ReactiveList
  componentId="SearchResult"
  dataField="ratings"
  title="ReactiveList"
  stream={true}
  pagination={false}
  paginationAt="bottom"
  pages={5}
  sortBy="desc"
  from={0}
  size={10}
  initialLoader="Loading Results.."
  noResults="No Results Found!"
  showResultStats={true}
  onResultStats={(total, took) => {
    return "found " + total + " results in " + took + "ms."
  }}
  react={{
    and: ["CitySensor", "SearchSensor"]
  }}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    data field to be connected to the component's UI view. It is useful for providing a sorting context.
- **title** `String or HTML` [optional]  
    title of the component, to be shown in the UI.
- **stream** `Boolean` [optional]  
    whether to stream new result updates in the UI. Defaults to `false`.
- **scrollOnTarget** `Object` [optional]
    accepts an object to set the infinite loading reference to the passed object, for example setting it to `window` will load new results when the `window` is scrolled.
- **pagination** `Boolean` [optional]  
    pagination <> infinite scroll switcher. Defaults to `false`, i.e. an infinite scroll based view. When set to `true`, a pagination based list view with page numbers will appear.
- **paginationAt** `String` [optional]  
    Determines the position where to show the pagination, only applicable when **pagination** prop is set to `true`. Accepts one of `top`, `bottom` or `both` as valid values. Defaults to `bottom`.
- **pages** `Number` [optional]  
    number of user selectable pages to be displayed when pagination is enabled. Defaults to 5.
- **sortBy** `String` [optional]  
    sort the results by either `asc` or `desc` order. It is an alternative to `sortOptions`, both can't be used together.
- **sortOptions** `Object Array` [optional]  
    an alternative to the `sortBy` prop, `sortOptions` creates a sorting view in the ReactiveList component's UI. Each array element is an object that takes three keys:
    - `label` - label to be displayed in the UI.
    - `dataField` - data field to use for applying the sorting criteria on.
    - `sortBy` - specified as either `asc` or `desc`.
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
- **onData** `Function` [optional]  
    returns a list element object to be rendered based on the `res` data object. This callback function prop is called for each data item rendered in the **ReactiveList** component's view. For example,
    ```js
    onData={
      function(res) {
        const marker = res._source;
    		return (
    			<a
    				className="full_row single-record single_record_for_clone"
    				key={markerData._id}
    			>
    				<div className="text-container full_row" style={{ paddingLeft: "10px" }}>
    					<div className="text-head text-overflow full_row">
    						<span className="text-head-info text-overflow">
    							{marker.name ? marker.name : ""} - {marker.brand ? marker.brand : ""}
    						</span>
    						<span className="text-head-city">{marker.brand ? marker.brand : ""}</span>
    					</div>
    					<div className="text-description text-overflow full_row">
    						<ul className="highlight_tags">
    							{marker.price ? `Priced at $${marker.price}` : "Free Test Drive"}
    						</ul>
    					</div>
    				</div>
    			</a>
    		);
      }
    }
    ```
- **onAllData** `Function` [optional]  
    works like **onData** prop but all the data objects are passed to the callback function.
- **pageURLParams** `Boolean` [optional]  
    whether to display the page number in the URL. Defaults to `false`. **pageURLParams** works only with **pagination** enabled. Useful for sharing the view of a particular page.

## Syntax

<br>

<iframe height='500' scrolling='no' title='ReactiveSearch NestedList <> ReactiveList' src='//codepen.io/sids-aquarius/embed/EmmKVZ/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/EmmKVZ/'>ReactiveSearch NestedList <> ReactiveList</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Styles

All reactivebase components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/KtDriR7.png)

![Annotated Image](https://i.imgur.com/TPP2Zuh.png)

## Extending

`ReactiveList` component can be extended to
1. customize the look and feel with `className`, `style`,
2. render individual result data items using `onData`,
3. render the entire result data using  `onAllData`.

```js
// Register a callback function with the `onData` prop.
<ReactiveList
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
    CSS Styles to be applied to the **ReactiveList** component.
- **onData** `Function` [optional]  
    a callback function where user can define how to render the view based on the data changes.
- **onAllData** `Function` [optional]  
    an alternative callback function to `onData`, where user can define how to render the view based on all the data changes.

## Examples

<br>

<iframe height='500' scrolling='no' title='ReactiveSearch NestedList <> ReactiveList' src='//codepen.io/sids-aquarius/embed/EmmKVZ/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/EmmKVZ/'>ReactiveSearch NestedList <> ReactiveList</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [ReactiveList basic usage](../playground/?knob-title=Topics&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=or&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-showCheckbox=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FReactiveList&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
2. [With streaming](../playground/?knob-title=People&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=or&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-stream=true&knob-showCheckbox=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FReactiveList&selectedStory=With%20Streaming%20Enabled&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
3. [With pagination](../playground/?knob-title=People&knob-paginationAt=bottom&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=or&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-pages=5&knob-pagination=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-stream=true&knob-showCheckbox=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FReactiveList&selectedStory=With%20pagination&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
4. [With sortOptions](../playground/?knob-title=People&knob-paginationAt=bottom&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=or&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=count&knob-pages=5&knob-pagination=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-stream=true&knob-showCheckbox=true&knob-size=100&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Search%20topics&knob-showSearch=true&selectedKind=search%2FReactiveList&selectedStory=With%20Sort%20Options&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
5. [Playground (with all knob actions)](../playground/?knob-initialLoader=Loading%20results..&knob-title=ReactiveList%3A%20Results&knob-from=0&knob-paginationAt=bottom&knob-URLParams%20%28not%20visible%20in%20storybook%29=false&knob-filterLabel=Custom%20Filter%20Name&knob-defaultSelected%5B0%5D=Social&knob-defaultSelected%5B1%5D=Travel&knob-selectAllLabel=Select%20All&knob-showRadio=true&knob-queryFormat=or&knob-numberOfMonths=2&knob-style=%7B"paddingBottom"%3A"10px"%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=false&knob-showFilter=true&knob-sortBy=default&knob-pages=5&knob-showResultStats=true&knob-pagination=true&knob-dataLabel=★%20%20A%20customizable%20UI%20widget%20★&knob-allowAllDates=true&knob-stream=false&knob-showCheckbox=true&knob-size=5&knob-extra=%7B"withFullScreenPortal"%3Atrue%2C"showClearDate"%3Atrue%7D&knob-visible=true&knob-showCount=true&knob-placeholder=Select%20from%20list&knob-showSearch=true&knob-noResults=No%20results%20found%21&selectedKind=search%2FReactiveList&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
