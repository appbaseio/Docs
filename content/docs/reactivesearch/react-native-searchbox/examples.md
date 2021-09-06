---
title: 'Examples'
meta_title: 'Examples for React Native SearchBox'
meta_description: 'react-native-searchbox is a lightweight library that provides scaffolding to create search experiences powered by Elasticsearch.'
keywords:
    - react-native-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-native-searchbox-reactivesearch'
---

The following are some examples to demonstrate the usge of various props available with `react-native-searchbox`.

In examples below there are three components present `SearchBase`, `SearchBox` & `SearchComponent`.

#### SearchBase

This component binds the backend app(data source) with the UI components. You can read more about it [here](/docs/reactivesearch/react-native-searchbox/searchbase/).

#### SearchBox

This component provides a lightweight, performance focused & customizable searchbox UI. You can read more about it [here](/docs/reactivesearch/react-native-searchbox/searchbox/).

#### SearchComponent

This search component can be used to bind to different types of search UI widgets. You can read more about it [here](/docs/reactivesearch/react-native-searchbox/searchcomponent/).

### Basic Usage

In this example we can see the usage of some of the props that are available with react-native `search-box` like `autoSuggest`, `enablePopularSuggestions`, `enableRecentSearches`, `showVoiceSearch`, etc.

<div data-snack-id="@mohdashraf010897/github.com-appbaseio-searchbox:packages-native-examples-demo" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>
<script async src="https://snack.expo.io/embed.js"></script>

### Controlled Usage

In this example we have certain props like `value` & `onChange`, which are used in conjunction, The mentioned props are used to control the behavior of the searchbox.

<div data-snack-id="@mohdashraf010897/github.com-appbaseio-searchbox:packages-native-examples-with-controlled-props" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>
<script async src="https://snack.expo.dev/embed.js"></script>

### Advanced Usage

In this example we can see the usage of a facet.

<div data-snack-id="@mohdashraf010897/searchbox-facet-example" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>

### DistinctField Prop Usage

In this example we can see the usage of `distinctField` & `distinctFieldConfig` props. The `distinctField` prop is used to get distinct value documents for the specified field for this use case its `authors.keyword`, the `distinctFieldConfig` prop is used to get the inner_hits object `other_books` that contains other two other books by the same author(s). You can read more about the these props over [here](/docs/reactivesearch/react-native-searchbox/searchbox/).

<div data-snack-id="@anik_ghosh/searchbox-example-with-distinct-field-prop" data-snack-platform="ios" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.io/embed.js"></script>

### TransformRequest Prop Usage

In this example we used the `transformRequest` prop, which gives us the request object whenever a query gets triggered from the `search-box` component, we have then used this request object to extract the search query text and then make a call to an external API (Datamuse) to get correct matching texts in case the search query was misspelled, the correct suggested text is then used to replace the misspelled query value in the request and then fire the query. Thus, fetching relevant results even for misspelled queries.

<div data-snack-id="@mohdashraf010897/searchbox-transform-request-example" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>