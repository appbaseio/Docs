---
title: 'Guides'
meta_title: 'Guides for using Algolia Autocomplete'
meta_description: '`@appbaseio/autocomplete-suggestions-plugin` is a Suggestions plugin that adds **Query Suggestions** powered by [appbase-js](https://www.npmjs.com/package/appbase-js) client, to your autocomplete. It also provides rich customisations of UI supported by [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/)'
keywords:
    - guides
    - autocomplete-suggestions-plugin
    - search-ui
    - suggestions
    - autocomplete-js
sidebar: 'docs'
nestedSidebar: 'autocomplete-plugin'
---

The `@appbaseio/autocomplete-suggestions-plugin` is framework agnostic, similar to `autocomplete-js`. In this module, we explore how we can use our plugin to power our search-input ui in various ways.


### Use with React

This guide shows how to create a React Autocomplete component. It uses the `useEffect` hook to create and mount the component. We pass our `@appbaseio/autocomplete-suggestions-plugin` to act as a suggestion  source.

Creating the component
Start with some boilerplate for creating a React component. This component uses the useRef hook to create a mutable ref object, containerRef, to mount the autocomplete on. To learn more about this hook, check out the useRef React documentation.

All that you need to render is a div with the `id` as `autocomplete`.

```jsx
import React, { useEffect } from 'react';
import ReactDOM from "react-dom";

import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";

// scaffolding described for autocomplete goes here
// see below snippet

function Autocomplete(props) {

  useEffect(() => {
    // initiate autocomplete-js
    // see definition in below snippet
    initAutocomplete();

    // cleanup before mounting
    return () => {
      autocomplete.destroy();
    };
  }, []);

  return <div id="autocomplete"></div>;
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Autocomplete />
  </StrictMode>,
  rootElement
);

```

Let's look at the `initAutocomplete()` function and other scaffolding for the plugin.

```jsx
// appbase client config object
const appbaseClientConfig = {
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "best-buy-dataset",
  credentials: "b8917d239a52:82a2f609-6439-4253-a542-3697f5545947"
};

// reactivesearch api configuration
const rsApiConfig = {
  highlight: true,
  dataField: [
    {
      field: "name.autosuggest",
      weight: 1,
    },
    {
      field: "name",
      weight: 3,
    },
  ],
  enableRecentSuggestions: true,
  enablePopularSuggestions: true,
  recentSuggestionsConfig: {
    size: 5,
    minChars: 5,
  },
  popularSuggestionsConfig: {
    size: 5,
    showGlobal: true,
  },
  size: 5,
};

// default usage: plugin to fetch suggestions
const defaultUsagePlugin = createSuggestionsPlugin(appbaseClientConfig, {
  ...rsApiConfig
});

// initiator for  autocomplete-js
const initAutocomplete = () => {
  autocomplete({
    container: "#autocomplete",
    placeholder: "Search for products",
    openOnFocus: true,
    debug: true,
    plugins: [defaultUsagePlugin]
    // use the below code incase trying to render
    // custom jsx using templates
    // renderer: { createElement, Fragment },
    // render({ children }, root) {
    //   render(children, root);
    // },
  });
};

```

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/use-with-react?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="use-with-react"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Use with Vue

This guide shows how to integrate an Autocomplete instance into a Vue application. It uses the [`Vue’s Composition API`](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api), specifically you can instantiate an Autocomplete instance in the onMounted lifecycle hook in the setup function.. We pass our `@appbaseio/autocomplete-suggestions-plugin` to act as a suggestion  source.


**Mounting the autocomplete**
You can instantiate and mount your Autocomplete instance in the onMounted lifecycle hook in the setup function. Doing so requires passing the renderer and render parameters.

This is because the default Autocomplete implementation uses Preact’s version of createElement, Fragment and render. Without providing Vue’s version of these, the Autocomplete instance won’t render the views properly.

```jsx
import { onMounted } from "vue";
import { autocomplete } from "@algolia/autocomplete-js";

import "@algolia/autocomplete-theme-classic";

import { createElement } from "./adapter";
import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";

// appbase client config object
const appbaseClientConfig = {
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "best-buy-dataset",
  credentials: "b8917d239a52:82a2f609-6439-4253-a542-3697f5545947"
};

// reactivesearch api configuration
const rsApiConfig = {
  highlight: true,
  dataField: [
    {
      field: "name.autosuggest",
      weight: 1
    },
    {
      field: "name",
      weight: 3
    }
  ],
  enableRecentSuggestions: true,
  enablePopularSuggestions: true,
  recentSuggestionsConfig: {
    size: 5,
    minChars: 5
  },
  popularSuggestionsConfig: {
    size: 5,
    showGlobal: true
  },
  size: 5
};

// default usage: plugin to fetch suggestions
const defaultUsagePlugin = createSuggestionsPlugin(appbaseClientConfig, {
  ...rsApiConfig
});

export default {
  name: "App",
  setup() {
    onMounted(() => {
      autocomplete({
        container: "#autocomplete",
        placeholder: "Search",
        openOnFocus: true,
        plugins: [defaultUsagePlugin],
        detachedMediaQuery: "none"
      });
    });
  },
  render() {
    const style = {
      margin: "0 auto",
      "max-width": "640px",
      width: "100%"
    };

    return createElement(
      "div",
      { style },
      createElement("div", { id: "autocomplete" })
    );
  }
};

```

Let's have a look at the `adapter.js`. We are using this adapter to custom render our elements and transforming the props so that they are compatible with **Vue3**.

```js
import { h } from "vue";

export function createElement(type, props, ...children) {
  const adaptedProps = Object.entries(props || {}).reduce(
    (acc, [key, value]) => {
      // Vue 3 accepts lower-case event names so we need to transform props like
      // `onMouseMove` to `onMousemove`.
      const property =
        key[0] === "o" && key[1] === "n"
          ? key.slice(0, 3) + key.slice(3).toLowerCase()
          : key;

      acc[property] = value;
      return acc;
    },
    {}
  );

  return h(type, adaptedProps, ...children);
}
```

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/use-with-vue?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Adding Popular Searches

Providing suggestions helps users type longer queries, a good suggestion ensures the best results. It is easy to build an auto-complete experience with appbase.io but popular suggestions allows you to display more specific and popular query suggestions.

To get started, refer to the [basic example](https://docs.appbase.io/docs/reactivesearch/autocomplete-plugin/quickstart/#basic-example) and then follow along.

To enable Popular searches, we enable the `enablePopularSuggestions` by setting it to `true`. Further, we tweak our popular suggestions' config using  `popularSuggestionsConfig`. 

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
  dataField: [
    {
      field: "name.autosuggest",
      weight: 1,
    },
    {
      field: "name",
      weight: 3,
    },
  ],
  enablePopularSuggestions: true,
  popularSuggestionsConfig: {
    size: 5,
    showGlobal: true
  },
  size: 5,
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

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/with-popular-searches?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="popular-searches-example-appbaseio-autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Adding Recent Searches

Providing suggestions helps users type longer queries, a good suggestion ensures the best results. It is easy to build an auto-complete experience with appbase.io but recent suggestions allows you to display more contextual and recent query suggestions.

To get started, refer to the [basic example](https://docs.appbase.io/docs/reactivesearch/autocomplete-plugin/quickstart/#basic-example) and then follow along.

To enable Recent searches, we enable the `enableRecentSuggestions` by setting it to `true`. Further, we tweak our popular suggestions' config using  `recentSuggestionsConfig`. 

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
  dataField: [
    {
      field: "name.autosuggest",
      weight: 1,
    },
    {
      field: "name",
      weight: 3,
    },
  ],
  enableRecentSuggestions: true,
  recentSuggestionsConfig: {
    size: 5,
  },
  size: 2,
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

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/with-recent-searches?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="recent-searches-example-appbaseio-autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Adding Multiple Result Types

While `@appbaseio/autocomplete-suggestions-plugin` with suggested index searches is a ubiquitous search experience, providing with index, recent, popular, and promoted types of suggestions, rich multi-category autocompletes are becoming more and more popular.

For example, if you search for something on an ecommerce site, your results could contain not just text suggestions, but also categories wthey belong to, preview images, ratings and more. Ecommerce stores often show suggested searches, products, blog posts, brands, and categories all in one autocomplete.

It’s best to display different results types in different sections. This implicitly gives users a better understanding of what the items are, and what will happen if they select an item.

To get started, refer to the [basic example](https://docs.appbase.io/docs/reactivesearch/autocomplete-plugin/quickstart/#basic-example) and then follow along.

Let's start with enabling all types of suggestions, namely, `index`(enabled by-default), `recent`, and `popular` suggestions.  

```js
// reactivesearch api configuration
const rsApiConfig = {
  enableRecentSuggestions: true,
  enablePopularSuggestions: true,
  recentSuggestionsConfig: {
    size: 5,
    minChars: 5
  },
  popularSuggestionsConfig: {
    size: 5,
    showGlobal: true
  },
  size: 5
};

```

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
  /// described above
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

Now, let's create one more instance of `@appbaseio/autocomplete-suggestions-plugin` plugin that would render a second section displaying the products with hyperlink attached to each suggestion item.

```js
// advanced usage: plugin to fetch suggestions and
// render custom ui for header, footer and suggestion items
const advancedUsagePlugin = createSuggestionsPlugin(
  appbaseClientConfig,
  {
    ...rsApiConfig,
    enableRecentSuggestions: false
  },
  {
    renderItem: (props) => {
      const { item, setQuery, refresh } = props;
      if (item.type === "index") {
        return (
          <a
            className="aa-item product-item"
            href={item._source.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="product-image">
              <img src={item._source.image} alt={item.value} />
            </div>
            <div className="product-details">
              <h4>{item.value}</h4>
              <p>{item._source.shortDescription}</p>
            </div>
          </a>
        );
      }
      return (
        <div className="item">
          <div className="item__content-wrapper">
            {getIcon(item.type)()}
            <span
              dangerouslySetInnerHTML={{
                __html: item.value
              }}
            ></span>
          </div>
          <div className="item__actions-wrapper">
            {" "}
            <button
              onClick={(e) => {
                e.stopPropagation();

                setQuery(item.label);
                refresh();
              }}
              type="button"
              className="set-search-arrow"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 17v-7.586l8.293 8.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-8.293-8.293h7.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1z"></path>
              </svg>
            </button>
          </div>
        </div>
      );
    },
    onItemSelect: (props) => {
      const {
        item: { url, label },
        setQuery,
        refresh
      } = props;

      if (url) {
        setQuery(label);
        window.open(url);
      } else {
        setQuery(label);
        refresh();
      }
    },
    renderHeader: (props) => {
      return (
        <h4>
          Products Listing <hr style={{ borderColor: "#d7d5f5" }} />
        </h4>
      );
    },
    renderFooter: (props) => {
      return <hr style={{ borderColor: "#d7d5f5" }} />;
    },
    renderNoResults: (props) => {
      if (props.state.query === "") {
        return <p>Search for something to get direct product suggestions!</p>;
      } else {
        return <p>No products found! Try searching for something else!</p>;
      }
    }
  }
);

```

Finally, the autocomplete function looks like, 

```js
autocomplete({
  container: "#autocomplete",
  placeholder: "Search for products",
  openOnFocus: true,
  // debug: true, uncomment to keep the dropdown open
  plugins: [defaultUsagePlugin, advancedUsagePlugin]
});

```

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/advanced-example?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="advanced-example-appbaseio-autocomplete-suggestions-plugin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

   
### Sending Appbase Analytics Insights

Analytics Insights provides tips and tricks for your business based on the recent activities of your business. Apbbase.io tracks the search activity of your users and discovers the important changes in your analytics data and from that, we prepare a list of insights with the recommendations so you can take meaningful action to improve your search experience.

Refer to our comprehensive guide to implement analytics [here](https://docs.appbase.io/docs/analytics/implement/).

Since our plugin is using Appbase indices as sources for suggestions, Appbase provides Search Analytics out-of-the-box. Search Analytics includes metrics like top searches, No Results Searches, Low Clicks, Low Suggestions Clicks, Higher Click Position, etc.


To enable analytics, we enable the `recordAnalytics` by setting it to `true`, passed in the `settings` object in the `appbaseClientConfig`.

```js title="JavaScript"
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import createSuggestionsPlugin from "@appbaseio/autocomplete-suggestions-plugin";


// appbase client config object
const appbaseClientConfig = {
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "best-buy-dataset",
  credentials: "b8917d239a52:82a2f609-6439-4253-a542-3697f5545947",
  settings:{
    recordAnalytics: true,
  }
};

// reactivesearch api configuration
const rsApiConfig = {
  size: 5,
};

// instantiatin the plugin
const suggestionsPlugin = createSuggestionsPlugin(appbaseClientConfig, {
  ...rsApiConfig,
});

autocomplete({
  container: '#autocomplete', // remeber to have a div element as <div id ="autocomplete"></div>
  plugins: [suggestionsPlugin],
  openOnFocus: true,
});
```

### Creating A Custom Renderer

The autocomplete-js package includes everything you need to render a JavaScript autocomplete experience that you can bind to your own framework. If you want to build a custom UI that differs from the autocomplete-js output, for example in [React](https://reactjs.org/docs/getting-started.html) or another front-end framework, the [autocomplete-core](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-core/) package provides all the primitives to build it.

The guide [here](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/creating-a-renderer/) shows how to leverage all the autocomplete capacities to build an accessible autocomplete, both for desktop and mobile, with React. You can find the final result in this [sandbox](https://codesandbox.io/s/github/algolia/autocomplete/tree/next/examples/react-renderer?file=/src/Autocomplete.tsx).

### Changing Behavior Based on the Query

You may want to change which sources you use depending on the query. A typical pattern is to display a different source when the query is empty and switch once the user starts typing.

This tutorial explains how to show static predefined items when the query is empty, and results from an Algolia index when it isn’t.

Checkout the guide [here](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/changing-behavior-based-on-query/).

### Reshaping Sources

When you’re browsing a website that fetches content from a database, the UI isn’t fully representative of how that data is structured on the back-end. This allows more human-friendly experiences and interactions. A search UI doesn’t have to be a one-to-one mapping with your search engine either.

The Autocomplete Reshape API lets you transform static, dynamic and asynchronous sources into friendlier search UIs.

Here are some examples of what you can do with the Reshape API:

- Apply a limit of items for a group of sources
- Remove duplicates in a group of sources
- Group sources by an attribute
- Sort sources

Checkout the guide [here](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/reshaping-sources/).