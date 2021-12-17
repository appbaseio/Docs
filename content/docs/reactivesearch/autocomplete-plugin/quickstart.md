---
title: 'QuickStart'
meta_title: 'QuickStart to Appbase Algolia Autocomplete'
meta_description: 'This is a quickstart guide to the Appbase Algolia Autocomplete library - learn how to get started with powering your search UIs with powerful suggestions under 10 mins.'
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
yarn add @algolia/autocomplete-js && @algolia/autocomplete-theme-classic && @appbaseio/autocomplete-suggestions-plugin
# or
npm install @algolia/autocomplete-js && @algolia/autocomplete-theme-classic && @appbaseio/autocomplete-suggestions-plugin
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

<iframe
  src="https://carbon.now.sh/embed/8KZOWek6JpN1XBRPkcix"
  style="width: 955px; height: 1533px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/basic-example?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="basic-example-appbaseio-autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## More examples

### Advanced Example

The advanced example uses two instances of the `@appbaseio/autocomplete-suggestions-plugin`, the first instance is configured to render the default UI that comes along, and the second instance shows the advanced usage which renders the suggestions as products listings, which when clicked, opens a new tab and takes you to the url associated with that product.

We leverage [preact](https://preactjs.com/guide/v10/getting-started) to render jsx elements, the same is used as a default by [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/).

> The autocomplete function creates an autocomplete experience and attaches it to an element of the DOM. By default, it uses Preact 10 to render templates.


<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/advanced-example?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Advanced Example: @appbaseio/autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Promoted Results Example

The promoted-results example demonstrate how `@appbaseio/autocomplete-suggestions-plugin` by-default, handles the display of promoted suggestions. 

We will be using the `best-buy-dataset` index for this example.

Appbase.io dashboard lets you configure promoted result(s) using [Query Rules](https://docs.appbase.io/docs/search/apprules/). Query Rules are essentially `If-This-Then-That` construct - **If search query contains 'Google', then promote 'Chromebook'**. Query Rules serve a very specific purpose as far as search results and merchandising is concerned. When building a commercial search product, customers more often than not require commercializing the product based on certain search queries.

First step is to **enable** query rules in the frontend, i.e, in the `appbaseClientConfig` object.

```js
// appbase client config object
const appbaseClientConfig = {
    url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
    app: "best-buy-dataset",
    credentials: "b8917d239a52:82a2f609-6439-4253-a542-3697f5545947",
    settings: {
      userId: "s@s",
      enableQueryRules: true,
      recordAnalytics: true,
    },
  };
```

Next step is to configure the Query Rules from the backend, i.e., on our Appbase Dashboard.
Refer to [this](https://docs.appbase.io/docs/search/rules/#overview) guide for configuring query rules.
<!-- <div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/fbef23535560413a9fb4bb02af0b75d3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->

<br/>
<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/promoted-results-example?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="promoted-results-example-appbaseio-autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Category Results Example

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
<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/category-field-example?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="categoryfield-example-appbaseio-autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
