---
title: 'QuickStart'
meta_title: 'QuickStart to Appbase Autocomplete Plugin'
meta_description: 'This is a quickstart guide to the Appbase autocomplete plugin library - learn how to get started with powering your search UIs with powerful suggestions under 10 mins.'
keywords:
    - quickstart
    - autocomplete-suggestions-plugin
    - search-ui
    - suggestions
    - autocomplete-js
sidebar: 'docs'
nestedSidebar: 'autocomplete-plugin'
---


This guide provides an overview of using `@appbaseio/autocomplete-suggestions-plugin` with [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/).

## Getting Started

The `@appbaseio/autocomplete-suggestions-plugin` is a Suggestions plugin that adds **Query Suggestions** powered by [appbase-js](https://www.npmjs.com/package/appbase-js) client, to your autocomplete. It also provides rich customisations of UI supported by [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/).

### Installation

```sh
yarn add @appbaseio/autocomplete-suggestions-plugin
# or
npm install @appbaseio/autocomplete-suggestions-plugin
```

### Basic Example

To get started, you need a container for your autocomplete to go in. If you don't have one already, you can insert one into your markup:

```js title="HTML"
<div id="autocomplete"></div>
```

Then, insert your autocomplete into it by calling the [`autocomplete`](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/) function and providing the [`container`](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-container). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

Import the [@appbaseio/autocomplete-suggestions-plugin](https://github.com/appbaseio/autocomplete-suggestions-plugin) plugin utility and create a suggestions plugin by passing [appbase-js](https://www.npmjs.com/package/appbase-js) client config and the [query config](https://docs.appbase.io/docs/search/reactivesearch-api/reference) to fetch suggestions. Additionally, you can pass the third argument for UI customisation.

As a final step, pass this plugin to the `plugins` property while calling [`autocomplete`](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/) function.

Make sure to provide a container (e.g., a `div`), not an `input`. Autocomplete generates a fully accessible search box for you.

```js title="JavaScript"
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";


// appbase client config object
const appbaseClientConfig = {
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "best-buy-dataset",
  credentials: "b8917d239a52:82a2f609-6439-4253-a542-3697f5545947",
};

// reactivesearch api configuration
const rsApiConfig = {
  size: 5, // no. of suggestions to display
};

// instantiatin the plugin
const suggestionsPlugin = createSuggestionsPlugin(appbaseClientConfig, {
  ...rsApiConfig,
});

autocomplete({
  container: '#autocomplete',
  plugins: [suggestionsPlugin],
  openOnFocus: true,
});
```

<iframe src="https://codesandbox.io/embed/basic-example-appbaseio-autocomplete-suggestions-plugin-forked-h1xxm?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Basic Example: @appbaseio/autocomplete-suggestions-plugin "
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## More examples

### Advanced example

The advanced example uses two instances of the `@appbaseio/autocomplete-suggestions-plugin`, the first instance is configured to render the default UI that comes along, and the second instance shows the advanced usage which renders the suggestions as products listings, which when clicked, opens a new tab and takes you to the url associated with that product.

We leverage [preact](https://preactjs.com/guide/v10/getting-started) to render jsx elements, the same is used as a default by [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/).

> The autocomplete function creates an autocomplete experience and attaches it to an element of the DOM. By default, it uses Preact 10 to render templates.


<iframe src="https://codesandbox.io/embed/advanced-example-appbaseio-autocomplete-suggestions-plugin-lcmul?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Advanced Example: @appbaseio/autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Promoted results example

The promoted-results example demonstrate how `@appbaseio/autocomplete-suggestions-plugin` by-default, handles the display of promoted suggestions. 

We will be using the `recipes-demo` index for this example.

Appbase.io dashboard lets you configure promoted result(s) using [Query Rules](https://docs.appbase.io/docs/search/apprules/). Query Rules are essentially `If-This-Then-That` construct - **If search query contains 'Google', then promote 'Chromebook'**. Query Rules serve a very specific purpose as far as search results and merchandising is concerned. When building a commercial search product, customers more often than not require commercializing the product based on certain search queries.

First step is to **enable** query rules in the frontend, i.e, in the `appbaseClientConfig` object.

```js

  // appbase client config object
  const appbaseClientConfig = {
      app: "recipes-demo",
      credentials: "a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61",
      url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
      settings: {
        enableQueryRules: true // this is important to enable applying query rules, set in the dashboard.
      }
  };
```

Next is to configure the Query Rule from the backend, i.e., on our Appbase Dashboard.
<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/fbef23535560413a9fb4bb02af0b75d3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<br/>
<iframe src="https://codesandbox.io/embed/promoted-result-example-appbaseio-autocomplete-suggestions-plugin-wssds?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Promoted Result Example: @appbaseio/autocomplete-suggestions-plugin "
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Category results example

The category-results example demonstrate how `@appbaseio/autocomplete-suggestions-plugin` by-default, handles the display of categorised suggestions. 

We will be using the `best-buy-dataset` index for this example.

First step is to pass the `categoryField` key with a relevant category field to map the values, i.e, in the `rsApiConfig` object.

> Read more about `categoryField` [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference/#categoryfield).

```js

  // reactivesearch api configuration
  const rsApiConfig = {
   ...
   ...
   categoryField: "department.keyword"
  };
```
<iframe src="https://codesandbox.io/embed/categoryfield-example-appbaseio-autocomplete-suggestions-plugin-6591d?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="CategoryField Example: @appbaseio/autocomplete-suggestions-plugin  "
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>