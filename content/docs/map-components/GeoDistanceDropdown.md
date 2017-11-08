---
id: geodistancedropdown
title: "GeoDistanceDropdown"
layout: docs
sectionid: docs
permalink: docs/map-components/geodistancedropdown.html
prev: geodistanceslider.html
prevTitle: "GeoDistanceSlider"
next: placessearch.html
nextTitle: "PlacesSearch"
---

![Image to be displayed](https://i.imgur.com/SidQoYY.png)

`GeoDistanceDropdown` creates a location search based dropdown UI component that is connected to a database field. It is used for distance based filtering.

Example uses:

* finding restaurants in walking distance from your location.
* discovering things to do near a landmark.

## Usage

### Basic Usage

```js
<GeoDistanceDropdown
  componentId="LocationUI"
  dataField="location"
  data={
    [
      { "start": 0, "end": 20, "label": "< 20 miles" },
      { "start": 0, "end": 50, "label": "< 50 miles" },
      { "start": 0, "end": 100, "label": "< 100 miles" },
    ]
  }
/>
```

### Usage With All Props

```js
<GeoDistanceDropdown
  componentId="locationUI"
  dataField="location"
  title="Location Dropdown Selector"
  data={
    [
      { "start": 0, "end": 20, "label": "< 20 miles" },
      { "start": 0, "end": 50, "label": "< 50 miles" },
      { "start": 0, "end": 100, "label": "< 100 miles" },
    ]
  }
  defaultSelected={{
    location: "SOMA, San Francisco"
    label: "< 20 miles"
  }}
  placeholder="Select a distance range.."
  unit="mi"
  autoLocation={true}
  showFilter={true}
  filterLabel="Location"
  URLParams={false}
/>
```

## Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    data field to be connected to the component's UI view.
- **data** `Object Array`  
    collection of UI `labels` with associated `start` and `end` range values.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **defaultSelected** `Object` [optional]  
    pre-select values of the search query with `label` and `location` keys.
- **placeholder** `String` [optional]  
    set the placeholder to show in the location search box, useful when no option is `defaultSelected`.
- **unit** `String` [optional]  
    unit for distance measurement, uses `mi` (for miles) by default. Distance units can be specified from the following:  
    ![screenshot](https://i.imgur.com/STbeagk.png)
- **autoLocation** `Boolean` [optional]  
    when enabled, preset the user's current location in the location search box. Defaults to `true`.
- **showFilter** `Boolean` [optional]  
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
- **filterLabel** `String` [optional]  
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **URLParams** `Boolean` [optional]  
    enable creating a URL query string parameter based on the selected value from the dropdown. This is useful for sharing URLs with the component state. Defaults to `false`.

## Syntax

<br>

<iframe height='500' scrolling='no' title='GeoDistanceDropdown docs example' src='//codepen.io/sids-aquarius/embed/OjqLjY/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/OjqLjY/'>GeoDistanceDropdown docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Styles

All reactivebase and reactivemaps components are `rbc` namespaced.

![Annotated image](https://i.imgur.com/St1dgTz.png)


## Extending

`GeoDistanceDropdown` component can be extended to
1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.

```js
<GeoDistanceDropdown
  ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  customQuery={
    function(value) {
      return {
        // query in the format of Elasticsearch Query DSL
        geo_distance: {
          distance: (value.end - value.start)
                    + value.unit,
          location_dataField: {
            lat: value.location.split(",")[0]
            lon: value.location.split(",")[1]
          }
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
    CSS styles to be applied to the **GeoDistanceDropdown** component.
- **customQuery** `Function`  
    takes **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch v2.4 Query DSL.
    `Note:` customQuery is called on value changes in the **GeoDistanceDropdown** component as long as the component is a part of `react` dependency of at least one other component.
- **beforeValueChange** `Function`  
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
- **onValueChange** `Function`  
    is a callback function which accepts component's current **value** as a parameter. It is called every time the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example:  You want to show a pop-up modal with the valid discount coupon code when a user searches within a specific location area.
- **onQueryChange** `Function`  
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

## Examples

<br>

<iframe height='500' scrolling='no' title='GeoDistanceDropdown docs example' src='//codepen.io/sids-aquarius/embed/OjqLjY/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/OjqLjY/'>GeoDistanceDropdown docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [GeoDistance dropdown with all the default props](../playground/?knob-title=Geo%20Distance%20Slider&knob-filterLabel=GeoDistance%20filter&knob-defaultSelected=%7B"location"%3A"London"%2C"distance"%3A5%7D&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&knob-range=%7B"start"%3A0%2C"end"%3A50%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-stepValue=1&knob-autoLocation=true&knob-unit=mi&knob-placeholder=Search%20Location&selectedKind=map%2FGeoDistanceDropdown&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [GeoDistance dropdown with a title](../playground/?knob-title=Geo%20Distance%20Slider&knob-filterLabel=GeoDistance%20filter&knob-defaultSelected=%7B"location"%3A"London"%2C"distance"%3A5%7D&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&knob-range=%7B"start"%3A0%2C"end"%3A50%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-stepValue=1&knob-autoLocation=true&knob-unit=mi&knob-placeholder=Search%20Location&selectedKind=map%2FGeoDistanceDropdown&selectedStory=With%20Title&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

3. [GeoDistance dropdown with a defaultSelected value](../playground/?knob-title=Geo%20Distance%20Slider&knob-filterLabel=GeoDistance%20filter&knob-defaultSelected=%7B"label"%3A"Less%20than%20100%20miles"%2C"location"%3A"London"%7D&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&knob-range=%7B"start"%3A0%2C"end"%3A50%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-stepValue=1&knob-autoLocation=true&knob-unit=mi&knob-placeholder=Search%20Location&selectedKind=map%2FGeoDistanceDropdown&selectedStory=With%20Default%20Selected&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

4. [Playground (with all knob actions)](../playground/?knob-title=Geo%20Distance%20Slider&knob-URLParams%20%28not%20visible%20in%20storybook%29=true&knob-filterLabel=GeoDistance%20filter&knob-defaultSelected=%7B"label"%3A"Less%20than%20100%20miles"%2C"location"%3A"London"%7D&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&knob-range=%7B"start"%3A0%2C"end"%3A50%7D&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-placeholderDropdown=Select%20radius&knob-stepValue=1&knob-autoLocation=true&knob-unit=mi&knob-placeholder=Search%20Location&selectedKind=map%2FGeoDistanceDropdown&selectedStory=Playground&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)
