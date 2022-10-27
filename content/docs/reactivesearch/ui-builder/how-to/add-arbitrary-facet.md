---
title: 'Add an arbitrary facet to the Search UI'
meta_title: 'Add an arbitrary facet to the Search UI'
meta_description: 'Add an arbitrary facet to the Search UI'
keywords:
  - ui-builder
  - ui-integrations
  - how-to-guides
  - add-arbitrary-facet
  - add-custom-filter
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview

The How-to guide enumerates steps to programatically add an arbitrary facet filter to an existing Search UI.

### Pre-requisite: Create a Search UI 

You can follow this 👇🏻 step-by-step tutorial to build a new Search UI, incase you already don't have one.

<iframe src="https://scribehow.com/page-embed/Publishing_Search_UIs_with_Lucidworks_Fusion__x1WkxtpJTZqQrYx728_AJw" width="100%" height="640" allowfullscreen frameborder="0" style="margin: auto;"></iframe>

<br /> <br /> 

Now that we have a Search UI, Let's begin adding a route!! 🏎

> Note: The tutorial uses a Search UI built on top of faceted-search template, consider using the same template to match exact steps.

We shall be doing it for two Search UIs, one uses `ES` and the other uses `Fusion` as backend.

### With `ES` as backend 

<iframe src="https://scribehow.com/embed/Programatically_adding_an_arbitrary_facet_filter__ES__btowIDQiQXCII1kIlsiTLg" width="100%" height="640" allowfullscreen frameborder="0"></iframe>

#### Code Snippets

##### Step 9: Adding Reactive Component

```javascript
<ReactiveComponent
  componentId="myReactiveComponent"
  dataField="genres_data.keyword"
  render={({ setQuery, value }) => {
    return (
      <Button
        onClick={() => {
          const query = {
            query: {
              term: { "genres_data.keyword": "Documentary" }
            }
          };

          setQuery({
            query,
            value: "Documentary"
          });
        }}
        style={{ position: "relative", left: "50%", top: "9px" }}
        type="primary"
      >
        <span role="img" aria-label="emoji">
          {" "}
          🎦
        </span>
        &nbsp; Apply Documentary Genre
      </Button>
    );
  }}
/>
```

##### Step 15: Adding ReactiveComponent to make filters react

```javascript
react={{
  and: [
    "myReactiveComponent",
    ...getReactDependenciesFromPreferences(
      preferences,
      filter
    )
  ]
}}
```

##### Step 18: Adding ReactiveComponent to make Results react

```javascript
<ResultsLayoutByCategory
  preferences={this.preferences}
  toggleFilters={toggleFilters}
  componentProps={{
    ...newProps,
    react: {
      and: ["myReactiveComponent", "Language_Filter_0", "search"]
    }
  }}
/>
```

#### Final Preview 🎊

<iframe src="https://codesandbox.io/embed/reactivesearch-shopify-plugin-forked-6giew3?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactivesearch-shopify-plugin (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### With `FUSION` as backend 

<iframe src="https://scribehow.com/embed/Programatically_adding_an_arbitrary_facet_filter__ES__btowIDQiQXCII1kIlsiTLg" width="100%" height="640" allowfullscreen frameborder="0"></iframe>

#### Code Snippets

##### Step 9: Adding Reactive Component

```javascript
<ReactiveComponent
  componentId="myReactiveComponent" 
  dataField="genres_data.keyword"
  render={({ setQuery, value }) => {
    return (
      <Button
        onClick={() => {
          const query = {
            query: {
              term: { "genres_data.keyword": "Documentary" }
            }
          };

          setQuery({
            query,
            value: "Documentary"
          });
        }}
        style={{ position: "relative", left: "50%", top: "9px" }}
        type="primary"
      >
        <span role="img" aria-label="emoji">
          {" "}
          🎦
        </span>
        &nbsp; Apply Documentary Genre
      </Button>
    );
  }}
/>
```

##### Step 15: Adding ReactiveComponent to make filters react

```javascript
react={{
  and: [
    "myReactiveComponent",
    ...getReactDependenciesFromPreferences(
      preferences,
      filter
    )
  ]
}}
```

##### Step 18: Adding ReactiveComponent to make Results react

```javascript
<ResultsLayoutByCategory
  preferences={this.preferences}
  toggleFilters={toggleFilters}
  componentProps={{
    ...newProps,
    react: {
      and: ["myReactiveComponent", "Language_Filter_0", "search"]
    }
  }}
/>
```