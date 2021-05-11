---
title: 'Examples'
meta_title: 'Examples for Vue SearchBox'
meta_description: 'vue-searchbox is a lightweight library that provides scaffolding to create search experiences powered by Elasticsearch.'
keywords:
    - vue-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-searchbox-reactivesearch'
---

The following are some examples to demonstrate the usge of various props available with `vue-searchbox`.

In examples below there are three components present `search-base`, `seach-box` & `search-component`.

#### SearchBase

This component binds the backend app(data source) with the UI components. You can read more about it [here](/docs/reactivesearch/vue-searchbox/searchbase/).

#### SearchBox

This component provides a lightweight, performance focused & customizable searchbox UI. You can read more about it [here](/docs/reactivesearch/vue-searchbox/searchbox/).

#### SearchComponent

This search component can be used to bind to different types of search UI widgets. You can read more about it [here](/docs/reactivesearch/vue-searchbox/searchcomponent/).

### Basic Usage

In this example we can see the usage of some of the props that are available with vue `search-box` like `autoSuggest`, `enablePopularSuggestions`, `enableRecentSearches`, `showVoiceSearch`, usage of `QueryRules` to get the promoted results, etc.

<iframe src="https://codesandbox.io/embed/vue-searchbox-basic-example-9ztt4?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-basic-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Controlled Usage

In this example we can the usage of the transformRequest prop, which gives us the request object whenever a query gets triggered from the `search-box` component, we have then used this request object to extract the search query text and then make a call to an external API (Datamuse) to get correct matching texts in case the search query was misspelled, the suggested texts are shown to the user based upon their matching score. The user can then select a text which will be set to a state variable that's been passed to the `value` prop. The `onChange` is the callback function that accepts the component's current value as a parameter and is then used to set the state varaible to been passed to the `value` prop.

<iframe src="https://codesandbox.io/embed/vue-searchbox-controlled-example-xtext?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-controlled-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Advanced Usage

In this example we can see the usage of `vue-table` to display the search results. The `search-component` is used to make the `result-component` reactively update by using the `react` prop when the dependent components i.e the `author-filter` and `search-component` changes their states. You can read more about the `react` prop over [here](/docs/reactivesearch/vue-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/with-vue-table" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### DistinctField Prop Usage

In this example we can see the usage of `distinctField` & `distinctFieldConfig` props. The `distinctField` prop is used to get distinct value documents for the specified field for this use case its `authors.keyword`, the `distinctFieldConfig` prop is used to get the inner_hits object `other_books` that contains other two other books by the same author(s). You can read more about the these props over [here](/docs/reactivesearch/vue-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/vue-searchbox-with-distinct-field-prop-yi8gl?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-with-distinct-field-prop"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### EnablePredictiveSuggestions Prop Usage

In this example we can see the usage of the `enablePredictiveSuggestions` which when set to true predicts the next relevant words from a field's value based on the search query. You can read more about it over [here](/docs/reactivesearch/vue-searchbox/searchbox/).

<iframe src="https://codesandbox.io/embed/friendly-rhodes-ibbl0?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-searchbox-example-with-predictive-suggestions"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
