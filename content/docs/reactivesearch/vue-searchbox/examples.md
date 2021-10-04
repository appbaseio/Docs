---
title: 'Examples'
meta_title: 'Examples for Vue SearchBox'
meta_description: 'See different examples for using the vue-searchbox library - covers everything from basic usage to frequest use-cases and also covers advanced use-cases.'
keywords:
    - vue-searchbox
    - search-ui
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-searchbox-reactivesearch'
---

The following are some examples to demonstrate the usge of various props available in the `vue-searchbox` library.

In the examples below, we have made use of `search-base`, `search-box` & `search-component` components.

#### search-base

This component binds the backend app(data source) with the UI components. You can read more about it [here](/docs/reactivesearch/vue-searchbox/searchbase/).

#### search-box

This component provides a lightweight, performance focused & customizable searchbox UI. You can read more about it [here](/docs/reactivesearch/vue-searchbox/searchbox/).

#### SearchComponent

This search component can be used to bind to different types of search UI widgets. You can read more about it [here](/docs/reactivesearch/vue-searchbox/searchcomponent/).

### Basic Usage

In this example, we show the usage of some of the props that are available with the vue-searchbox library like `autoSuggest`, `enablePopularSuggestions`, `enableRecentSearches`, `showVoiceSearch`, usage of `QueryRules` to get the promoted results.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/demo"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-basic-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Controlled Usage

In this example, we show controlled usage with props like `value` & `onChange`, which are used in conjunction with several other props such as `onBlur`, `onKeyPress`, `focus`, `onValueSelected`, `onKeyDown`, `onKeyUp` and `onFocus` for gaining control of the searchbox. The mentioned props are used to control the behavior of the searchbox.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-controlled-props"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-controlled-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Advanced Usage

In this example, we show the usage of `react-table` to display the search results. The `SearchComponent` component is used to make the `result-component` reactively update by using the `react` prop when the dependent components, `author-filter` and `search-component` change their states. You can read more about the `react` prop over [here](/docs/reactivesearch/react-searchbox/searchcomponent/#to-configure-the-reactivesearch-api).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-vue-table" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### DistinctField Prop Usage

In this example, we show the usage of `distinctField` and `distinctFieldConfig` props. The `distinctField` prop is used to get distinct value documents for a specified field (`authors.keyword` in this case), the `distinctFieldConfig` prop is used to get the `inner_hits` object that contains the unique documents associated with this group (in this case, the other books by the same author).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-distinct-field-prop" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### EnablePredictiveSuggestions Prop Usage

In this example, we show the usage of the `enablePredictiveSuggestions` which when set to true, predicts the next relevant words from a field's value based on the search query.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-predictive-suggestions" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Index Prop Usage

In this example, we show the usage of the `index` prop in the `author-search-component` to explicitly specify an index to query against for the component.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-index-prop" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### TransformRequest Prop Usage

In this example, we show the usage of the `transformRequest` prop, which gives us the request object whenever a query gets triggered. We then use this request object to extract the search query text and then make a call to an external API (datamuse) to get correct matching texts in case the search query was misspelled. The correct suggested text is then used to replace the misspelled query value in the request and then fire the query again, fetching relevant results even for misspelled queries.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-transform-request-prop"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-controlled-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>