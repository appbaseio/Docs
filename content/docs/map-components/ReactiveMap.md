---
id: reactivemap
title: "ReactiveMap"
layout: docs
sectionid: docs
permalink: docs/map-components/reactivemap.html
prev: placessearch.html
prevTitle: "PlacesSearch"
---

![ReactiveMap Image](https://i.imgur.com/faAZ5v8.png)

A `ReactiveMap` creates a data-driven map UI component. It is the key component for build map based experiences.

Example uses:
* showing a map of user checkins by city and topics for powering discovery based experiences.
* displaying restaurants filtered by a nearby distance query on a map.

### Usage

#### Basic Usage

```js
<ReactiveMap
    componentId="MapUI"
    dataField="location"
    title="Venue Location Map"
/>
```

#### Usage With All Props

```js
<ReactiveMap
    componentId="MapUI"
    dataField="location"
    title="Venue Location Map"
    size={100}
    defaultZoom={13}
    defaultCenter={{ lat: 37.74, lon: -122.45 }}
    showMapStyles={true}
    defaultMapStyle="Standard"
    showMarkers={true}
    defaultMarkerImage="path/to/marker.png"
    setMarkerCluster={true}
    showSearchAsMove={true}
    setSearchAsMove={true}
    showPopoverOn="click"
    onPopoverTrigger={this.onPopoverTrigger}
    popoverTTL={3}

    stream={true}
    streamTTL={5}
    streamAutoCenter={true}
    streamMarkerImage="path/to/streaming/marker.png"

    // 'react' defines when and how the map component should update
    react={{
      and: "CitySensor"
    }}

    // map events
    onData={this.onData}
    onIdle={this.onIdle}
    onMouseOver={this.onMouseOver}
    onMouseOut={this.onMouseOut}
    onMouseMove={this.onMouseMove}
    onClick={this.onClick}
    onDblClick={this.onDblClick}
    onDrag={this.onDrag}
    onDragStart={this.onDragStart}
    onDragEnd={this.onDragEnd}
    onResize={this.onResize}
    onRightClick={this.onRightClick}
    onBoundsChanged={this.onBoundsChanged}
    onCenterChanged={this.onCenterChanged}
    onProjectionChanged={this.onProjectionChanged}
    onTiltChanged={this.onTiltChanged}
    onZoomChanged={this.onZoomChanged}

    // less useful props
    autoMapRender={true}
    autoCenter={true}
    autoMarkerPosition={true}
    style={{
      height: '700px';
    }}
/>
```

### Props

- **componentId** `String`  
    unique identifier of the component, can be referenced in other components' `react` prop.
- **dataField** `String`  
    DB data field to be connected to the component's UI view, usually of a geopoint (i.e. location) data type and used for rendering the markers on the map.
- **title** `String or HTML` [optional]  
    title of the component to be shown in the UI.
- **size** `Number` [optional]  
    number of results to show in the map view, can be a number in the range [1, 1000]. Defaults to 100.
- **defaultZoom** `Number` [optional]  
    preset map's zoom level, accepts integer values between [0, 20]. 0 is the minimum zoom level, where you can see the entire globe. 20 is the maximum zoom level. Defaults to 13.
- **defaultCenter** `Object` [optional]  
    preset map's center position by specifying an object with valid `lat` and `lon` values.
- **showMapStyles** `Boolean` [optional]  
    whether to show map styles dropdown picker in the map UI. Defaults to `true`.
- **defaultMapStyle** `String` [optional]  
    preset a map style for the map UI. Available options include "Standard", "Blue Essence", "Blue Water", "Flat Map", "Light Monochrome", "Midnight Commander", "Unsaturated Browns".
- **showMarkers** `Boolean` [optional]  
    whether to show the markers on the map, defaults to `true`. Sometimes, it doesn't make sense to display markers (when building a heatmap or weather map or a directions navigation map)
- **defaultMarkerImage** `String` [optional]  
    URL of the default marker image to be shown. It comes with a default image. Should only be set if you wish to use a custom marker.
- **setMarkerCluster** `Boolean` [optional]  
    whether to aggregate and form a cluster of nearby markers. Defaults to `true`.
- **showSearchAsMove** `Boolean` [optional]  
    whether to show the *Search As I Move* checkbox in the UI. Defaults to `true`.
- **setSearchAsMove** `Boolean` [optional]  
    whether to set the *Search As I Move* checkbox. Defaults to `false`.
- **showPopoverOn** `String` [optional]  
    event that triggers popover, accepts either a "click" or a "mouseover" as valid values.
- **onPopoverTrigger** `function` [optional]  
    a function that takes one argument for getting a marker's data and returns an HTML markup to be displayed in the popover box.
- **popoverTTL** `Number` [optional]  
    time to live for a popover specified in seconds. By default, a popover doesn't have a TTL value. Valid values are in the range (0, 60].
- **stream** `Boolean` [optional]  
    whether to stream new result (aka realtime view) updates in the UI. Defaults to `false`.
- **streamTTL** `Number` [optional]  
    time to live for a just streamed update, specified in seconds. It defaults to 5 seconds.
- **streamAutoCenter** `Boolean` [optional]  
    whether to auto center the map based on the location of the streamed update. Defaults to `false`.
- **streamMarkerImage** `String` [optional]  
    URL of the streaming marker image to be shown. It comes with a default image that's distinct from the defaultMarkerImage. Should be only set if you wish to use a custom marker image.
- **react** `Object`
     a dependency object defining how this component should react based on the state changes in the dependent sensor components. You can read more about it [here](/docs/advanced/react.html).
- **autoCenter** `Boolean` [optional]  
    whether to auto center the map based on the geometric center of all the location markers. Defaults to `true`.
- **autoMapRender** `Boolean` [optional]  
    whether map view should be rendered automatically. Defaults to `true` and is what you want most of the time. There are certain cases however where you want to re-render the map view manually.
- **autoMarkerPosition** `Boolean` [optional]  
    whether to set the rotation angle of the marker image based on the delta changes in its location, useful when displaying realtime traffic data. Defaults to `false`.
- **className** `String`  
    CSS class to be injected on the component container.
- **style** `Object`  
    CSS style object to be applied to the `ReactiveMap` component.
- **onData** `function`  
    event fired when one or more markers are indexed, updated or removed from the map. It takes an object with the following properties:

```js
{
  mode: 'historic' or 'streaming',
  newData: data which is the response of xhr call or streaming data,
  currentData: Array of all existing markers data in the view (should be [] on query change),
  appliedQuery: Raw query object,
  took: time in milliseconds (optional, only applicable when mode is historic)
}
```

the function can return the markup to be displayed on the map (e.g. setting custom pins based on type of marker data or overlaying shapes like polygons or circles on the map).

### Events

![ReactiveMap Events](https://i.imgur.com/W8deTH2.png)

ReactiveMap component exposes many events to provide a good listening mechanism for building interactivity.

- **onIdle**: is the event which is fired when map reached to its idle state after dragging or zooming effect. It has argument which contains
```js
{
  boundingBoxCoordinates: object which contains top_left, bottom_right of current map bounds,
  mapBounds: original map bounds which is returned by map
}
```
and also user can return the markup which will be append inside map (as ex. Polygon, circles, rectangles can be return using [react-component](https://github.com/tomchentw/react-google-maps) ).


### Syntax

<br>

<iframe height='500' scrolling='no' title='ReactiveMap docs example' src='//codepen.io/sids-aquarius/embed/qXvWpo/?height=500&theme-id=light&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/qXvWpo/'>ReactiveMap docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Styles

![Annotated Image](https://i.imgur.com/YPRoLch.png)

### Examples

<br>

<iframe height='500' scrolling='no' title='ReactiveMap docs example' src='//codepen.io/sids-aquarius/embed/qXvWpo/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sids-aquarius/pen/qXvWpo/'>ReactiveMap docs example</a> by Siddharth Kothari (<a href='https://codepen.io/sids-aquarius'>@sids-aquarius</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

1. [ReactiveMap with all the default props](../playground/?knob-title=Reactive%20maps&knob-URLParams%20%28not%20visible%20in%20storybook%29=true&knob-showMarkers=true&knob-filterLabel=GeoDistance%20filter&knob-defaultSelected=%7B"label"%3A"Less%20than%20100%20miles"%2C"location"%3A"London"%7D&knob-rangeLabels=%7B"start"%3A"Start"%2C"end"%3A"End"%7D&knob-range=%7B"start"%3A0%2C"end"%3A50%7D&knob-autoMarkerPosition=true&knob-streamMarkerImage=https%3A%2F%2Fcdn.rawgit.com%2Fappbaseio%2Freactivemaps%2F6500c73a%2Fdist%2Fimages%2Fstream-pin.png&knob-showMapStyles=false&knob-URLParams%20%28not%20visible%20on%20storybook%29=true&knob-showFilter=true&knob-autoMapRender=false&knob-placeholderDropdown=Select%20radius&knob-stepValue=1&knob-showPopoverOn=mouseover&knob-setMarkerCluster=true&knob-streamTTL=5&knob-setSearchAsMove=false&knob-defaultMarkerImage=https%3A%2F%2Fcdn.rawgit.com%2Fappbaseio%2Freactivemaps%2F6500c73a%2Fdist%2Fimages%2Fhistoric-pin.png&knob-size=100&knob-autoLocation=true&knob-streamAutoCenter=true&knob-unit=mi&knob-autoCenter=true&knob-placeholder=Search%20Location&knob-defaultZoom=5&knob-showSearchAsMove=true&knob-defaultMapStyle=Standard&knob-defaultCenter=%7B"lat"%3A37.74%2C"lon"%3A-122.45%2C"lng"%3A-122.45%7D&selectedKind=map%2FReactiveMap&selectedStory=Basic&full=0&down=1&left=1&panelRight=0&downPanel=storybooks%2Fstorybook-addon-knobs)

2. [ReactiveMap with a search sensor on the map](https://opensource.appbase.io/reactivemaps/examples/meetupblast/)

3. [ReactiveMap with historical and realtime data](https://opensource.appbase.io/reactivemaps/examples/transport/)

4. [ReactiveMap with events example](https://opensource.appbase.io/reactivemaps/examples/events/)

5. [ReactiveMap with weather data](https://opensource.appbase.io/reactivemaps/examples/weather/)
