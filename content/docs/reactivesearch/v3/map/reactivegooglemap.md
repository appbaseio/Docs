---
title: 'ReactiveGoogleMap'
meta_title: 'ReactiveGoogleMap'
meta_description: '`ReactiveGoogleMap` creates a data-driven map UI component using Google Maps. It is the key component for building map based experiences.'
keywords:
    - reactivesearch
    - reactivegooglemap
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![ReactiveGoogleMap Image](https://i.imgur.com/Q87ks8I.png)

`ReactiveGoogleMap` creates a data-driven map UI component using Google Maps. It is the key component for building map based experiences.

Example uses:

-   showing a map of user checkins by city and topics for powering discovery based experiences.
-   displaying restaurants filtered by a nearby distance query on a map.

### Usage
#### Basic Usage
```jsx
<ReactiveGoogleMap componentId="MapUI" dataField="location" title="Venue Location Map" />
```

#### Usage With All Props
```jsx
<ReactiveGoogleMap
	componentId="MapUI"
	dataField="location"
	title="Venue Location Map"
	size={10}
	defaultZoom={13}
	defaultCenter={{ lat: 37.74, lng: -122.45 }}
	showMapStyles={true}
	defaultMapStyle="Standard"
	showMarkerClusters={true}
	showSearchAsMove={true}
	searchAsMove={true}
	onPopoverClick={this.onPopoverClick}
	// 'react' defines when and how the map component should update
	react={{
		and: 'CitySensor',
	}}
	// map events
	renderItem={this.renderItem}
	// less useful props
	autoCenter={true}
/>
```

## Props
### componentId

| Type | Optional |
|------|----------|
|  `String`  |    No    |

unique identifier of the component, can be referenced in other components' `react` prop.
### dataField

| Type | Optional |
|------|----------|
|  `String`  |    No    |

DB data field to be connected to the component's UI view, usually of a geopoint (i.e. location) data type and used for rendering the markers on the map.
### size

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

number of results to show in the map view, can be a number in the range [1, 1000]. Defaults to 10.
### defaultZoom

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

preset map's zoom level, accepts integer values between [0, 20]. 0 is the minimum zoom level, where you can see the entire globe. 20 is the maximum zoom level. Defaults to 13.
### defaultCenter

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

preset map's center position by specifying an object with valid `lat` and `lng` values. This prop, when set, will cause the component to run a geo-distance query with a distance of 10mi (Refer: `defaultRadius` and `unit` prop to configure the distance).
### center

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

set map's center position by specifying an object with valid `lat` and `lng` values. This prop, when set, will cause the component to run a geo-distance query with a distance of 10mi (Refer: `defaultRadius` and `unit` prop to configure the distance).
### defaultRadius

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

used as distance value for the geo-distance query when `defaultCenter` or `center` is set. It accepts all positive integers.
### unit

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

unit for distance measurement, uses `mi` (for miles) by default. Distance units can be specified from the following:
![screenshot](https://i.imgur.com/STbeagk.png)
### showMapStyles

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to show map styles dropdown picker in the map UI. Defaults to `true`.
### defaultMapStyle

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

preset a map style for the map UI. Available options include "Standard", "Blue Essence", "Blue Water", "Flat Map", "Light Monochrome", "Midnight Commander", "Unsaturated Browns".
### showMarkers

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to show the markers on the map, defaults to `true`. Sometimes, it doesn't make sense to display markers (when building a heatmap or weather map or a directions navigation map)
### defaultPin

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

URL of the default marker pin image to be shown. It comes with a default image. Should only be set if you wish to use a custom marker.
### showMarkerClusters

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to aggregate and form a cluster of nearby markers. Defaults to `true`.

> Note
>
> It requires `showMarkers` prop enabled.

### showSearchAsMove

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to show the _Search As I Move_ checkbox in the UI. Defaults to `true`.
### searchAsMove

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to set the _Search As I Move_ checkbox. Defaults to `false`.
### onPopoverClick

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

a function that takes one argument for getting a marker's data and returns an HTML markup to be displayed in the popover box.
### autoClosePopover

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

automatically closes the exisiting open popovers when `onPopoverClick` gets fired. Defaults to `false`.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

specify dependent components to reactively update **GeoDistanceDropdown's** options. Read more about it [here](/docs/reactivesearch/v3/advanced/reactprop/).
    - **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        ### and clause implies that the results will be filtered by matches from **all** of the associated component states.
        ### or clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        ### not clause implies that the results will be filtered by an **inverse** match of the associated component states.
    - **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.
### autoCenter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to auto center the map based on the geometric center of all the location markers. Defaults to `false`.
### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### style

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

CSS style object to be applied to the `ReactiveGoogleMap` component.
### renderItem

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

event fired when one or more markers are indexed, updated or removed from the map. It takes an object with the following formats (`label`, `icon`, `custom`):

```jsx
// To render the given text in the marker
renderItem={result => ({
    label: result.title,
})}

// To render a marker image
renderItem={result => ({
    icon: 'https://i.imgur.com/NHR2tYL.png',
})}

// To render a custom markup (as label) in the marker position
renderItem={result => ({
    custom: (<div>{result.mag}</div>),
})}
```

### render

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
<br/>
It accepts an object with these properties:
-   **`loading`**: `boolean`
    indicates that the query is still in progress
-   **`error`**: `object`
    An object containing the error info
-   **`data`**: `array`
    An array of results obtained from combining `promoted` results along with the `hits`.
-   **`aggregationData`** `array`
    An array of aggregations buckets. Each bucket would have a `top_hits` property if you're using Elasticsearch top hits aggregations in `defaultQuery` prop.
-   **`promotedData`**: `array`
    An array of promoted results obtained from the applied query. [Read More](/docs/search/rules/)

> Note:
>
> `data` and `promotedData` results has a property called `_click_id` which can be used with triggerClickAnalytics to register the click analytics info.
-   **`customData`** `object`
    Custom data set in the query rule when appbase.io is used as backend. [Read More](/docs/search/rules/#custom-data)
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
-   **`resultStats`**: `object`
    An object with the following properties which can be helpful to render custom stats:
    -   **`numberOfResults`**: `number`
        Total number of results found
    -   **`numberOfPages`**: `number`
        Total number of pages found based on current page size
    -   **`currentPage`**: `number`
        Current page number for which data is being rendered
    -   **`time`**: `number`
        Time taken to find total results (in ms)
    -   **`displayedResults`**: `number`
        Number of results displayed in current view
    -   **`hidden`**: `number`
        Total number of hidden results found
    -   **`promoted`**: `number`
        Total number of promoted results found
    -   **`loadMore`**: `function`
        A callback function to be called to load the next page of results into the view. The callback function is only applicable in the case of infinite loading view (i.e. `infiniteScroll` prop set to `true`).
    -   **`triggerClickAnalytics`**: `function`
        A function which can be called to register a click analytics. [Read More](docs/reactivesearch/v3/advanced/analytics/)

```jsx
render={(props) => { 
    const 
    {
        data, // parased hits
        loading,
        error,
        promotedData,
        customData,
        rawData,
        resultStats: {
        numberOfResults
        numberOfPages
        currentPage
        displayedResults
        time
        hidden
        promoted
        },
        loadMore // func to load more results
        triggerClickAnalytics // to trigger click analytics
        setPage,
        renderMap // allow users to render the map component at any place
        renderPagination // allows to render pagination component after displaying results
    } = props;
    return(
        <>
            {data.map(hit => <pre onClick={() => triggerClickAnalytics(hit._click_id)}>{JSON.stringify(hit)}</pre>)}
            {renderMap()}
        </pre>
    )
}
```
Or you can also use render function as children
```jsx
<ReactiveGoogleMap
 // ...other props
>
{
        ({
            loading,
            error,
            data,
            promotedData,
            rawData,
            resultStats,
            handleLoadMore,
            triggerClickAnalytics
        }) => (
            // return UI to be rendered
        )
    }
</ReactiveGoogleMap>
```

### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can be used to render an error message in case of any error.

```jsx
renderError={(error) => (
        <div>
            Something went wrong!<br/>Error details<br/>{error}
        </div>
    )
}
```

### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.
### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

gets triggered after data changes, which returns an object with these properties: `data`, `promotedData`, `customData`, `rawData` & `resultStats`.


## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/maps/examples/ReactiveMap?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`ReactiveGoogleMap` component supports `innerClass` prop with the following keys:

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

<a href="https://opensource.appbase.io/playground/?selectedKind=Map%20Components%2FReactiveMap&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs" target="_blank">ReactiveGoogleMap with all the default props</a>
