---
title: 'ReactiveMaps QuickStart'
meta_title: 'ReactiveMaps QuickStart'
meta_description: 'ReactiveMaps is a complimentary library to ReactiveSearch.'
keywords:
    - reactivesearch
    - reactivemaps
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

ReactiveMaps is a complimentary library to ReactiveSearch. Map components require ReactiveSearch architecture and its root component to begin with. If you wish to build anything on reactivemaps, you'll need to install reactivesearch along with it.

> Existing users can checkout the [migration guide](https://docs.appbase.io/docs/reactivesearch/react/advanced/migration/#reactivemaps) to switch to the newest version of ReactiveMaps library.

### Step 0: Create Boilerplate

In this section, we will create a search UI based on an _earthquake dataset_ with ReactiveSearch components.

![Image](https://i.imgur.com/LR4qyZU.png)

**Caption:** Final image of how the app will look.

We can either add ReactiveSearch to an existing app or create a boilerplate app with [Create React App (CRA)](https://github.com/facebookincubator/create-react-app). For this quickstart guide, we will use the CRA.

```bash
create-react-app my-awesome-search && cd my-awesome-search
```

---

### Step 1: Install ReactiveMaps and ReactiveSearch

We will fetch the [`reactivemaps`](https://www.npmjs.com/package/@appbaseio/reactivemaps) and [`reactivesearch`](https://www.npmjs.com/package/@appbaseio/reactivesearch) modules using yarn or npm.

```bash
yarn add @appbaseio/reactivemaps @appbaseio/reactivesearch
```

or

```bash
npm install --save @appbaseio/reactivemaps @appbaseio/reactivesearch
```

### Selecting Map Library

ReactiveMaps supports [**OpenStreet Map**](https://www.openstreetmap.org) and [**Google Map**](https://www.google.co.in/maps) libraries for rendering map. Depending on the Map library you choose, Following are the dependencies that you will have to add.

#### OpenStreet Maps

`<ReactiveOpenStreetMap />` uses [React-Leaflet](https://react-leaflet.js.org/) for rendering Openstreet maps. For rendering maps correctly, add the following `stylesheet` in the `<head>` element of `public/index.html`

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/leaflet.css" rel="stylesheet" />
```

#### Google Maps

`<ReactiveGoogleMap />` uses Google Maps JS library to render the google map and access the necessary geo-location services. For including Google Maps, add the following `<script>` tag in the `<head>` element of `public/index.html`.

```html
<script
	type="text/javascript"
	src="https://maps.google.com/maps/api/js?v=4.0&key=YOUR_MAPS_KEY_HERE"
></script>
```

> Note that you will need places library from google maps if you are using GeoDistance components. You can add it by appending `&libraries=places` in the above URL. This will be required in case of OpenStreetMaps as well.

---

### Step 2: Adding first component

Lets add our first ReactiveSearch component: [ReactiveBase](/docs/reactivesearch/react/overview/reactivebase/), it is a backend connector where we can configure the Elasticsearch index / authorization setup.

We will demonstrate creating an index using [appbase.io](https://appbase.io) service, although you can use any Elasticsearch backend within ReactiveBase.

![create an appbase.io app](https://i.imgur.com/r6hWKAG.gif)

**Caption:** For the example that we will build, the app is called **earthquakes** and the associated read-only credentials are **a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61**. You can browse and clone the dataset into your own app from [here](https://dejavu.appbase.io/?appname=earthquakes&url=https://e54485dd7244:385c84ea-41df-4e40-a22d-339a2224ecd7@appbase-demo-ansible-abxiydt-arc.searchbase.io&mode=edit).

![Dataset](https://i.imgur.com/J91nj8r.png)

We will update our `src/App.js` file to add ReactiveBase component.

```jsx
// ... other imports
import { ReactiveBase } from '@appbaseio/reactivesearch';

class App extends Component {
	render() {
		return (
			<ReactiveBase
				app="earthquakes"
				url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
				enableAppbase
				mapKey="AIzaSyA9JzjtHeXg_C_hh_GdTBdLxREWdj3nsOU"
			>
				{/* // other components will go here. */}
				<div>Hello ReactiveSearch!</div>
			</ReactiveBase>
		);
	}
}
```

This is how the app should look after running the `yarn start` command.

<iframe src="https://codesandbox.io/embed/reactivemaps-quickstart-step-1-v42g1j?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Reactivemaps - Quickstart - step 2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

---

### Step 3: Adding Filters and Map Component

For this app, we will be using [SingleList](/docs/reactivesearch/react/list/singlelist/) component for filtering the dataset. And [ReactiveGoogleMap](/docs/reactivesearch/react/map/reactivegooglemap/) component for showing the search results.
Lets add them within the ReactiveBase component. But before we do that, we will look at the important props for each.

```jsx
	<SingleList
		title="Places"
		componentId="places"
		dataField="place.keyword"
		size={50}
		showSearch
	/>
```

**SingleList** creates a radio-buttons list UI component that is connected to the database field passed as `dataField` prop to the SingleList component.

Next, we will look at the [**ReactiveGoogleMap**](/docs/reactivesearch/react/map/reactivegooglemap/) component for creating a map component.

```jsx
<ReactiveGoogleMap
  style={{ height: "90vh" }}
  componentId="googleMap"
  dataField="location"
  defaultMapStyle="Light Monochrome"
  title="Reactive Maps"
  defaultZoom={3}
  size={50}
  react={{
    and: "GeoDistanceSlider"
  }}
  onPopoverClick={(item) => <div>{item.venue.venue_name}</div>}
  showMapStyles={true}
  renderItem={(result) => ({
    custom: (
      <div
        style={{
          background: "dodgerblue",
          color: "#fff",
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 3,
          padding: 10
        }}
      >
        <i className="fas fa-globe-europe" />
        &nbsp;{result.magnitude}
      </div>
    )
  })}
/>
```

The `react` prop here specifies that it should construct a query based on the current selected value of the singlelist(places) component. Every time the user changes the selected value, a new query is fired -- you don't need to write a manual query for any of the UI components here, although you can override it via `customQuery` prop.

![](https://i.imgur.com/QwFq2CP.png)

This is how the map component's UI would look like. Notice how it is rendering the magnitude values of the earthquake in place of the marker pins. We achieved this via `renderItem` prop in the ReactiveGoogleMap component:

```jsx
renderItem={(result) => ({
  custom: (
    <div
      style={{
        background: "dodgerblue",
        color: "#fff",
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3,
        padding: 10
      }}
    >
      <i className="fas fa-globe-europe" />
      &nbsp;{result.magnitude}
    </div>
  )
})}
```

You can also customise it to render any kind of marker pins. Refer [ReactiveGoogleMap's documentation](/docs/reactivesearch/react/map/reactivegooglemap/) for the same.

Now, we will put all three components together to create the UI view.

```jsx
import ReactDOM from "react-dom/client";
import { Component } from "react";
import { ReactiveBase, SingleList } from "@appbaseio/reactivesearch";
import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="earthquakes"
        url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
        enableAppbase
        mapKey="AIzaSyA9JzjtHeXg_C_hh_GdTBdLxREWdj3nsOU"
      >
        <div>
          <SingleList
            title="Places"
            componentId="places"
            dataField="place.keyword"
            size={50}
            showSearch
          />
          <hr />
          <div style={{ padding: "2rem" }}>
            <ReactiveGoogleMap
              style={{ height: "90vh" }}
              componentId="googleMap"
              dataField="location"
              defaultMapStyle="Light Monochrome"
              title="Reactive Maps"
              defaultZoom={3}
              size={50}
              react={{
                and: "GeoDistanceSlider"
              }}
              onPopoverClick={(item) => <div>{item.venue.venue_name}</div>}
              showMapStyles={true}
              renderItem={(result) => ({
                custom: (
                  <div
                    style={{
                      background: "dodgerblue",
                      color: "#fff",
                      paddingLeft: 5,
                      paddingRight: 5,
                      borderRadius: 3,
                      padding: 10
                    }}
                  >
                    <i className="fas fa-globe-europe" />
                    &nbsp;{result.magnitude}
                  </div>
                )
              })}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

```

If you have followed along, this is how our app should look now.

<iframe src="https://codesandbox.io/embed/reactivemaps-quickstart-step-2-6erc2o?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Reactivemaps - Quickstart - step 1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

For convenience, you can checkout the final code from the [CodeSandbox above](https://codesandbox.io/s/reactivemaps-quickstart-step-3-6erc2o?file=/src/index.js).


---

### Step 4: ReactiveMaps as UMD

It is also possible to run ReactiveMaps without relying on a Node.JS environment tooling for the build setup.

```html
<script src="https://cdn.rawgit.com/appbaseio/reactivesearch/dev/packages/maps/umd/reactivemaps.js"></script>
```

A GZip version is also available at https://cdn.rawgit.com/appbaseio/reactivesearch/dev/packages/maps/umd/reactivemaps.js.gzip.
