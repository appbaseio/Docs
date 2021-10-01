---
title: 'Examples'
meta_title: 'Examples for React SearchBox'
meta_description: 'react-searchbox is a lightweight library that provides scaffolding to create search experiences powered by Elasticsearch.'
keywords:
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

The following are some examples to demonstrate the usge of various props available with `react-searchbox`.

In examples below there are three components present `SearchBase`, `SearchBox` & `SearchComponent`.

#### SearchBase

This component binds the backend app(data source) with the UI components. You can read more about it [here](/docs/reactivesearch/react-searchbox/searchbase/).

#### SearchBox

This component provides a lightweight, performance focused & customizable searchbox UI. You can read more about it [here](/docs/reactivesearch/react-searchbox/searchbox/).

#### SearchComponent

This search component can be used to bind to different types of search UI widgets. You can read more about it [here](/docs/reactivesearch/react-searchbox/searchcomponent/).

### Basic Usage

In this example we can see the usage of some of the props that are available with react `search-box` like `autoSuggest`, `enablePopularSuggestions`, `enableRecentSearches`, `showVoiceSearch`, usage of `QueryRules` to get the promoted results, etc.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/demo"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-searchbox-basic-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Controlled Usage

In this example we have certain props like `value` & `onChange`, which are used in conjunction,several other props for gaining control of the searchbox are `onBlur`, `onKeyPress`, `focus`, `onValueSelected`, `onKeyDown`, `onKeyUp` and `onFocus`. The mentioned props are used to control the behavior of the searchbox.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/with-controlled-props"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-searchbox-controlled-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Advanced Usage

In this example we can see the usage of `react-table` to display the search results. The `search-component` is used to make the `result-component` reactively update by using the `react` prop when the dependent components i.e the `author-filter` and `search-component` changes their states. You can read more about the `react` prop over [here](/docs/reactivesearch/react-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/with-react-table" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### DistinctField Prop Usage

In this example we can see the usage of `distinctField` & `distinctFieldConfig` props. The `distinctField` prop is used to get distinct value documents for the specified field for this use case its `authors.keyword`, the `distinctFieldConfig` prop is used to get the inner_hits object `other_books` that contains other two other books by the same author(s). You can read more about the these props over [here](/docs/reactivesearch/react-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/with-distinct-field-prop" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### EnablePredictiveSuggestions Prop Usage

In this example we can see the usage of the `enablePredictiveSuggestions` which when set to true predicts the next relevant words from a field's value based on the search query. You can read more about it over [here](/docs/reactivesearch/react-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/with-predictive-suggestions" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Index Prop Usage

In this example we can see the usage of the `index` prop in the `author-search-component` to explicitly specify an index to query against for the component. You can read more about it over [here](/docs/reactivesearch/react-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/with-index-prop" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### TransformRequest Prop Usage

In this example we used the `transformRequest` prop, which gives us the request object whenever a query gets triggered from the `search-box` component, we have then used this request object to extract the search query text and then make a call to an external API (Datamuse) to get correct matching texts in case the search query was misspelled, the correct suggested text is then used to replace the misspelled query value in the request and then fire the query. Thus, fetching relevant results even for misspelled queries.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/with-transform-request-prop"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-searchbox-transform-request-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>