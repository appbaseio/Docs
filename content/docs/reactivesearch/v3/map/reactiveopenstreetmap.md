---
title: 'ReactiveOpenStreetMap'
meta_title: 'ReactiveOpenStreetMap'
meta_description: '`ReactiveOpenStreetMap` creates a data-driven map UI component using React-Leaflet. It is the key component for building map based experiences.'
keywords:
    - reactivesearch
    - reactiveopenstreetmap
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![ReactiveOpenStreetMap Image](https://i.imgur.com/tNYNO5D.png)

`ReactiveOpenStreetMap` creates a data-driven map UI component using [React-Leaflet](https://react-leaflet.js.org/). It is the key component for building map based experiences.

Example uses:

-   showing a map of user checkins by city and topics for powering discovery based experiences.
-   displaying restaurants filtered by a nearby distance query on a map.

### Usage

#### Basic Usage

```js
<ReactiveOpenStreetMap componentId="MapUI" dataField="location" title="Venue Location Map" />
```

#### Usage With All Props

```js
<ReactiveOpenStreetMap
	componentId="MapUI"
	dataField="location"
	title="Venue Location Map"
	size={100}
	defaultZoom={13}
	onPopoverClick={this.onPopoverClick}
	stream={true}
	// 'react' defines when and how the map component should update
	react={{
		and: 'CitySensor',
	}}
	// map events
	renderData={this.renderData}
	// less useful props
	autoCenter={true}
/>
```

### Props

-   **componentId** `String`
    unique identifier of the component, can be referenced in other components' `react` prop.
-   **dataField** `String`
    DB data field to be connected to the component's UI view, usually of a geopoint (i.e. location) data type and used for rendering the markers on the map.
-   **size** `Number` [optional]
    number of results to show in the map view, can be a number in the range [1, 1000]. Defaults to 100.
-   **defaultZoom** `Number` [optional]
    preset map's zoom level, accepts integer values between [0, 20]. 0 is the minimum zoom level, where you can see the entire globe. 20 is the maximum zoom level. Defaults to 13.
-   **defaultCenter** `Object` [optional]
    preset map's center position by specifying an object with valid `lat` and `lng` values. This prop, when set, will cause the component to run a geo-distance query with a distance of 10mi (Refer: `defaultRadius` and `unit` prop to configure the distance).
-   **center** `Object` [optional]
    set map's center position by specifying an object with valid `lat` and `lng` values. This prop, when set, will cause the component to run a geo-distance query with a distance of 10mi (Refer: `defaultRadius` and `unit` prop to configure the distance).
-   **defaultRadius** `Number` [optional]
    used as distance value for the geo-distance query when `defaultCenter` or `center` is set. It accepts all positive integers.
-   **unit** `String` [optional]
    unit for distance measurement, uses `mi` (for miles) by default. Distance units can be specified from the following:
    ![screenshot](https://i.imgur.com/STbeagk.png)
-   **showMarkers** `Boolean` [optional]
    whether to show the markers on the map, defaults to `true`. Sometimes, it doesn't make sense to display markers (when building a heatmap or weather map or a directions navigation map)
-   **showSearchAsMove** `Boolean` [optional]
    whether to show the _Search As I Move_ checkbox in the UI. Defaults to `true`.
-   **searchAsMove** `Boolean` [optional]
    whether to set the _Search As I Move_ checkbox. Defaults to `false`.
-   **defaultPin** `String` [optional]
    URL of the default marker pin image to be shown. It comes with a default image. Should only be set if you wish to use a custom marker.
-   **onPopoverClick** `function` [optional]
    a function that takes one argument for getting a marker's data and returns an HTML markup to be displayed in the popover box.
-   **autoClosePopover** `Boolean` [optional]
    automatically closes the exisiting open popovers when `onPopoverClick` gets fired. Defaults to `false`.
-   **stream** `Boolean` [optional]
    whether to stream new result (aka realtime view) updates in the UI. Defaults to `false`.
-   **react** `Object`
    specify dependent components to reactively update **GeoDistanceDropdown's** options. Read more about it [here](/docs/reactivesearch/v3/advanced/reactprop/).
    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.
-   **autoCenter** `Boolean` [optional]
    whether to auto center the map based on the geometric center of all the location markers. Defaults to `false`.
-   **streamAutoCenter** `Boolean` [optional]
    whether to auto center the map based on the geometric center of all the location markers while `stream` prop is set to `true`. Defaults to `false`.

    <!-- - **autoMarkerPosition** `Boolean` [optional]
        whether to set the rotation angle of the marker image based on the delta changes in its location, useful when displaying realtime traffic data. Defaults to `false`. -->

-   **tileServer** `String` [optional]

    Used to provide different style to OpenStreet Map. It accepts tiles url that is used for providing layering to map. For more tile servers you can check https://wiki.openstreetmap.org/wiki/Tile_servers.

    Default `titleServer` url is `https://{s}.tile.osm.org/{z}/{x}/{y}.png`.

> Note
>
> You will have to link css file for appropriate `tileServer` in your html file / component. For default `tileServer` you can link following css
>
> ```html
> <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/leaflet.css" rel="stylesheet" />
> ```

-   **className** `String`
    CSS class to be injected on the component container.
-   **style** `Object`
    CSS style object to be applied to the `ReactiveOpenStreetMap` component.
-   **renderData** `function`
    event fired when one or more markers are indexed, updated or removed from the map. It takes an object with the following formats (`label`, `icon`, `custom`):

```js
// To render the given text in the marker
renderData={result => ({
    label: result.title,
})}

// To render a marker image
renderData={result => ({
    icon: 'https://i.imgur.com/NHR2tYL.png',
})}

// To render a custom markup (as label) in the marker position
renderData={result => ({
    custom: (<div>{result.mag}</div>),
})}
```

-   **renderError** `String or JSX or Function` [optional]
    can be used to render an error message in case of any error.

```js
renderError={(error) => (
        <div>
            Something went wrong!<br/>Error details<br/>{error}
        </div>
    )
}
```

-   **onError** `Function` [optional]
    gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.
-   **onData** `Function` [optional]
    gets triggered after data changes, which returns an object with these properties: `data`,
    `streamData`, `promotedData`, `customData`, `rawData` & `resultStats`.

- **renderAllData** `function` [optional]
    use to display results and map component together. Usage:
```js
    renderAllData={(hits, streamHits, loadMore, renderMap, renderPagination, triggerAnalytics, meta) => {
        // hits are the results returned from query.
        // streamHits are the results which are returned only  when stream prop is true.
        // loadMore is used to load more results.
        // renderMap is the function which is used to render Map.
        // renderPagination is the function which is used to render Pagination like in ReactiveList.
		// triggerAnalytics is the function which can be called to register click analytics.
        // meta represents an object which has the following properties:
        //  promotedData: Represents the promoted results,
        //  customData: Represents the customData,
        //  rawData: Raw response from Elasticsearch,
        //  resultStats: An object with the following properties which can be helpful to render custom stats:
        //      numberOfResults: Total number of results found,
        //      numberOfPages: Total number of pages found based on current page size,
        //      time: Time taken to find total results (in ms),
        //      displayedResults: Number of results displayed in current view,
        //      hidden: Total number of hidden results found,
        //      promoted: Total number of promoted results found.
        return(
            <>
                {hits.map(hit => <pre onClick={() => triggerAnalytics(hit._click_id)}>{JSON.stringify(hit)}</pre>)}
                {renderMap()}
            </>
        )
    }
```

## Demo

<br />

<iframe src="https://codesandbox.io/embed/inspiring-davinci-45qll" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`ReactiveOpenStreetMap` component supports `innerClass` prop with the following keys:

-   `title`
-   `input`
-   `list`
-   `checkboxContainer`
-   `checkbox`
-   `label`
-   `select`
-   `icon`
-   `count`
-   `button`
-   `pagination`
-   `active`

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=Map%20Components%2FReactiveMap&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs" target="_blank">ReactiveOpenStreetMap with all the default props</a>
