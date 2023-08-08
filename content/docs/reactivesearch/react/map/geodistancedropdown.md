---
title: 'GeoDistanceDropdown'
meta_title: 'GeoDistanceDropdown'
meta_description: '`GeoDistanceDropdown` creates a location search based dropdown UI component that is connected to a database field. It is used for distance based filtering.'
keywords:
    - reactivesearch
    - geodistancedropdown
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/zRnIUWY.png)

`GeoDistanceDropdown` creates a location search based dropdown UI component that is connected to a database field. It is used for distance based filtering.

Example uses:

-   finding restaurants in walking distance from your location.
-   discovering things to do near a landmark.

## Usage

### Basic Usage
```jsx
<ReactiveBase
  mapLibraries={['places']} // required
>
  <GeoDistanceDropdown
    componentId="LocationUI"
    dataField="location"
    data={[
      { distance: 20, label: '< 20 miles' },
      { distance: 50, label: '< 50 miles' },
      { distance: 100, label: '< 100 miles' },
    ]}
  />
</ReactiveBase>
```

### Usage With All Props
```jsx
<ReactiveBase
  mapLibraries={['places']} // required
>
  <GeoDistanceDropdown
    componentId="locationUI"
    dataField="location"
    title="Location Dropdown Selector"
    data={
      [
        { "distance": 20, "label": "< 20 miles" },
        { "distance": 50, "label": "< 50 miles" },
        { "distance": 100, "label": "< 100 miles" },
      ]
    }
    defaultValue={{
      location: "London, UK"
      label: "< 100 miles"
    }}
    countries={["uk"]}
    placeholder="Select a distance range.."
    unit="mi"
    autoLocation={true}
    showFilter={true}
    filterLabel="Location"
    URLParams={false}
    render={({ loading, error, data, handleChange, downshiftProps }) => {
        if (loading) {
          return <div>Fetching Results.</div>;
        }
        if (error) {
          return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
        }
        if(downshiftProps.isOpen === false){
          return null;
        }
        return data.map(item => (
          <div onClick={() => handleChange(item)} key={item.label}>
            <span>{item.label}</span>
            <span>{item.distance}</span>
          </div>
        ));
      }
    }
    // use either renderItem OR render prop
    renderItem={(label, isSelected) => (
      <div>
          <span style={{
              marginLeft: 5, color: isSelected ? 'red' : 'dodgerblue'
          }}>
              {label}
          </span>
      </div>
    )}
    onData={
      (prop) => {
        const {value, error} = prop;
        // do something
      }
    }
  />
</ReactiveBase>
```

## Props

### componentId

| Type | Optional |
|------|----------|
|  `String` |   No   |

unique identifier of the component, can be referenced in other components' `react` prop.

### compoundClause

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use `must`. Setting the compound clause to filter allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. term, geo or range type of queries that act as filters on the data)

This property only has an effect when the search engine is either elasticsearch or opensearch.


> Note: `compoundClause` is supported with v8.16.0 (server) as well as with serverless search.

### dataField

| Type | Optional |
|------|----------|
|  `String`  |    No    |

data field to be connected to the component's UI view.
### nestedField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
### data

| Type | Optional |
|------|----------|
|  `Object Array` |   Yes   |

collection of UI `labels` with associated `distance` value.
### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |

title of the component to be shown in the UI.
### defaultValue

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

pre-select values of the search query with `label` and `location` keys.
### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

set the placeholder to show in the location search box, useful when no option is `defaultValue`.
### value

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

controls the current value of the component. It sets the item from the list & also sets the location (on mount and on update). Use this prop in conjunction with `onChange` function.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.
### showIcon

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to display a search or custom icon in the input box. Defaults to `true`.
### iconPosition

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

sets the position of the search icon. Can be `left` or `right`. Defaults to `right`.
### icon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

displays a custom search icon instead of the default 🔍
### unit

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

unit for distance measurement, uses `mi` (for miles) by default. Distance units can be specified from the following:
![screenshot](https://i.imgur.com/STbeagk.png)
### autoLocation

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

when enabled, preset the user's current location in the location search box. Defaults to `true`.
### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show as filter when a value is selected in a global selected filters view. Defaults to `true`.
### filterLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

enable creating a URL query string parameter based on the selected value from the dropdown. This is useful for sharing URLs with the component state. Defaults to `false`.
### countries

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |

restricts predictions to specified country (ISO 3166-1 Alpha-2 country code, case insensitive). For example, 'us', 'in', or 'au'. You can provide an array of up to five country code strings.
### serviceOptions

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

allows to add more options to AutoCompletionRequest, available from [Google Places library](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest)
### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

customize the rendered list via a function which receives the item label, count & isSelected and expects a JSX or String back. For example:
```jsx
renderItem={(label, isSelected) => (
    <div>
        <span style={{
            marginLeft: 5, color: isSelected ? 'red' : 'dodgerblue'
        }}>
            {label}
        </span>
    </div>
)}
```
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
<br/>
It accepts an object with these properties:
-   **`loading`**: `boolean`
indicates that the query is still in progress
-   **`error`**: `object`
An object containing the error info
-   **`data`**: `array`
An array of results obtained from the applied query.
-   **`rawData`** `object`
An object of raw response as-is from elasticsearch query.
-   **`value`**: `array`
current selected value.
-   **`handleChange`**: `function`
A callback function can be used to mark the list value as selected.
-   **`downshiftProps`**: `object`
provides all the control props from `downshift` which can be used to bind list items with click/mouse events.
Read more about it [here](https://github.com/downshift-js/downshift#children-function).

```jsx
  <GeoDistanceDropdown
    render={({ loading, error, data, handleChange, downshiftProps }) => {
      if (loading) {
        return <div>Fetching Results.</div>;
      }
      if (error) {
        return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
      }
      if(downshiftProps.isOpen === false){
        return null;
      }
      return data.map(item => (
        <div onClick={() => handleChange(item)} key={item.label}>
          <span>{item.label}</span>
          <span>{item.distance}</span>
        </div>
      ));
    }}
  />
```

  Or you can also use render function as children

```jsx
<GeoDistanceDropdown>
        {
            ({
                loading,
                error,
                data,
                value,
                handleChange,
                downshiftProps
            }) => (
                // return UI to be rendered
            )
        }
</GeoDistanceDropdown>
```

### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

gets triggered after data changes, which returns an object with these properties: `value` & `error`.
```jsx
  onData={
    (prop) => {
      const {value, error} = prop;
      // do something
    }
  }
```

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/maps/examples/GeoDistanceDropdown?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`GeoDistanceDropdown` component supports `innerClass` prop with the following keys:

-   `title`
-   `input`
-   `list`
-   `select`
-   `icon`
-   `count`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).

## Extending

`GeoDistanceDropdown` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`.
4. specify how options should be filtered or updated using `react` prop.
5. add the following [synthetic events](https://reactjs.org/events.html) to the underlying `input` element:
    - onBlur
    - onFocus
    - onKeyPress
    - onKeyDown
    - onKeyUp
    - autoFocus

```jsx
<GeoDistanceDropdown
  // ...
  className="custom-class"
  style={{"paddingBottom": "10px"}}
  customQuery={
    function(location, distance, props) {
      return {
        // query in the format of Elasticsearch Query DSL
        geo_distance: {
          distance: distance + props.unit,
          location_dataField: location
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

### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### style

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

CSS styles to be applied to the **GeoDistanceDropdown** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **location**, **distance** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.<br/>
`Note:` customQuery is called on value changes in the **GeoDistanceDropdown** component as long as the component is a part of `react` dependency of at least one other component.
### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called every time the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches within a specific location area.
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

specify dependent components to reactively update **GeoDistanceDropdown's** options. Read more about it [here](/docs/reactivesearch/react/advanced/reactprop/).
-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=Map%20Components%2FGeoDistanceDropdown&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs" target="_blank">GeoDistance Dropdown with all the default props</a>
