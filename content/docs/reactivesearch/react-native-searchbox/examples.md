---
title: 'Examples'
meta_title: 'Examples for React Native SearchBox'
meta_description: 'See different examples for using the React Native Searchbox library - covers everything from basic usage to frequest use-cases and also covers advanced use-cases.'
keywords:
    - react-native-searchbox
    - search-ui
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-native-searchbox-reactivesearch'
---

The following are some examples to demonstrate the usge of various props available in the `react-native-searchbox` library.

In the examples below, we have made use of `SearchBase`, `SearchBox` and `SearchComponent` components.

#### SearchBase

This component binds the backend app(data source) with the UI components. You can read more about it [here](/docs/reactivesearch/react-native-searchbox/searchbase/).

#### SearchBox

This component provides a lightweight, performance focused & customizable searchbox UI. You can read more about it [here](/docs/reactivesearch/react-native-searchbox/searchbox/).

#### SearchComponent

This search component can be used to bind to different types of search UI widgets. You can read more about it [here](/docs/reactivesearch/react-native-searchbox/searchcomponent/).

### Basic Usage

In this example, we show the usage of some of the props that are available with the react-native-searchbox library like `autoSuggest`, `enablePopularSuggestions`, `enableRecentSearches`, `showVoiceSearch`, usage of `QueryRules` to get the promoted results.

<div data-snack-id="@mohdashraf010897/github.com-appbaseio-searchbox:packages-native-examples-demo" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>
<script async src="https://snack.expo.io/embed.js"></script>

### Controlled Usage

In this example, we show controlled usage with props like `value` & `onChange`, which are used in conjunction with several other props such as `onBlur`, `onKeyPress`, `focus`, `onValueSelected`, `onKeyDown`, `onKeyUp` and `onFocus` for gaining control of the searchbox. The mentioned props are used to control the behavior of the searchbox.

<div data-snack-id="@mohdashraf010897/github.com-appbaseio-searchbox:packages-native-examples-with-controlled-props" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>
<script async src="https://snack.expo.dev/embed.js"></script>

### Advanced Usage

In this example, we show the usage of an additional facet to display the search results with increased relevancy. The `SearchComponent` component is used to make the `result-component` reactively update by using the `react` prop when the dependent components, `author-filter` and `search-component` change their states. You can read more about the `react` prop over [here](/docs/reactivesearch/react-native-searchbox/searchcomponent/#to-configure-the-reactivesearch-api).

<div data-snack-id="@mohdashraf010897/searchbox-facet-example" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>

### DistinctField Prop Usage

In this example, we show the usage of `distinctField` and `distinctFieldConfig` props. The `distinctField` prop is used to get distinct value documents for a specified field (`authors.keyword` in this case), the `distinctFieldConfig` prop is used to get the `inner_hits` object that contains the unique documents associated with this group (in this case, the other books by the same author).

<div data-snack-id="@anik_ghosh/searchbox-example-with-distinct-field-prop" data-snack-platform="ios" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.io/embed.js"></script>

### TransformRequest Prop Usage

In this example, we show the usage of the `transformRequest` prop, which gives us the request object whenever a query gets triggered. We then use this request object to extract the search query text and then make a call to an external API (datamuse) to get correct matching texts in case the search query was misspelled. The correct suggested text is then used to replace the misspelled query value in the request and then fire the query again, fetching relevant results even for misspelled queries.

<div data-snack-id="@mohdashraf010897/searchbox-transform-request-example" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>