---
title: 'Add an arbitrary facet to the Search UI'
meta_title: 'Add an arbitrary facet to the Search UI'
meta_description: 'Add an arbitrary facet to the Search UI'
keywords:
  - ui-builder
  - ui-integrations
  - how-to
  - react
  - elasticsearch
  - solr
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview

The How-to guide enumerates steps to programatically add an arbitrary facet filter to an existing Search UI.

### Pre-requisite: Create a Search UI 

You can follow this 👇🏻 step-by-step tutorial to build a new Search UI, incase you already don't have one.

<iframe src="https://scribehow.com/embed/Connecting_the_search_UI_to_Elasticsearch__qmxLBZk6TAarxuNwWDK9IA" width="640" height="640" allowfullscreen frameborder="0"></iframe>

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


#### Code Snippets

##### Step 9: Adding Reactive Component

```javascript
<ReactiveComponent
  componentId="myReactiveComponent"
  render={({ setQuery, value }) => {
    return (
      <Button
        onClick={() => {
          // handles color change
          const query = {
            query: encodeURIComponent('fq=location_s:"Washington, DC"')
          };

          setQuery({
            query,
            value: encodeURIComponent('fq=location_s:"Washington, DC"')
          });
        }}
        style={{ position: "relative", left: "50%", top: "9px" }}
        type="primary"
      >
        <span role="img" aria-label="emoji">
          📍
        </span>
        &nbsp; Apply 'Washington, DC' Location
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
      and: ["myReactiveComponent", "Categories_0", "search"]
    }
  }}
/>
```


#### Final Preview 🎊

<iframe src="https://codesandbox.io/embed/reactivesearch-shopify-plugin-forked-dbcx9c?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactivesearch-shopify-plugin (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
