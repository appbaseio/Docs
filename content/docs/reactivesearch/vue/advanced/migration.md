---
title: 'ReactiveSearch (Vue): Migration Guide v1 -> v3'
meta_title: 'ReactiveSearch (Vue): Migration Guide v1 -> v3'
meta_description: 'This guide will give you a brief about all the changes in the 3.x release of ReactiveSearch (Vue).'
keywords:
    - reactivesearch
    - migrationguide
    - appbase
    - elasticsearch
    - vue
    - vue 3
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

ReactiveSearch Vue is compatible with Vue 3.x and above with the 3.x releases. This release comes after iterative feedback over the past 2 years from Vue 1.x's usage in production. This post will guide you on upgrading from ReactiveSearch Vue 1.x to 3.x (stable) release.

## Connect with ReactiveSearch Cloud

Starting v3, ReactiveSearch Vue has removed support for front-end DSL query generation, we strongly encourage upgrading to this major version for powering a secure search experience with ReactiveSearch.

More on security risks of allowing a search DSL over the network:

- Elasticsearch's query DSL being imperative in nature, allowing the entire DSL to be accessible from a web or mobile frontend creates a DoS vector where expensive queries can be run to deny service to actual users.
- It also presents a data scraping risk.
- The query DSL's imperative nature also makes it hard to enrich, transform or apply access controls to search requests.


## Benefits

- ReactiveSearch Cloud magic: Accelerate, enrich, and transform your search requests using features such as query rules, search relevance, caching, analytics
- Easy to secure: As ReactiveSearch API doesn't expose Elasticsearch APIs directly, it prevents the possibility of DSL based injection attacks
- Composable: Easily composes with Elasticsearch's query DSL for advanced use-cases
- Encapsulate business logic: Don't want to expose sensitive fields to web and mobile clients? Set the fields to return with ReactiveSearch dashboard once and avoid declaring them as part of the network requests.

## Supports Vue 3.x

ReactiveSearch components are fully compatible with Vue 3.x. In Vue 3.x, the usage of slots has had an overhaul.

### Usage of named slot

**v3.x:** (new usage)

```html
    <reactive-list
        component-id="result"
        data-field="['title', 'description']"
    >
        <template #renderItem="{ item }">
            <div>
                {...}
            </div>
        </template>
    </reactive-list>
```

**v1.x:** (older usage)

```html
    <reactive-list
        component-id="result"
        data-field="['title', 'description']"
    >
        <div slot="renderItem" slot-scope="{ item }">
            {...}
        </div>
    </reactive-list>
```


### Usage of default slot

**v3.x:** (new usage)

```html
    <reactive-component
        component-id="custom-component"
    >
        <template #default="{ hits, aggregations }">
            {...}
        </template>
    </reactive-list>
```

**v1.x:** (older usage)

```html
    <reactive-component
        component-id="custom-component"
    >
        <div slot-scope="{ hits, aggregations }">
            {...}
        </div>
    </reactive-list>
```

**v3.x:** (network payload)

uses the [ReactiveSearch API](/docs/search/reactivesearch-api/). ReactiveSearch API is a declarative API that captures the search intent, allowing the server to modify, secure, enrich and transform requests and/or responses passed by the FE (client).

![alt network req v3](https://i.imgur.com/dSNqvlR.png)


**v1.x:** (network payload)

Elasticsearch `_msearch` request

![alt network req v1](https://i.imgur.com/6Ew1txq.png)




## Removal of `DataSearch` component

ReactiveSearch Vue 1.x provided a `DataSearch` component for building a suggestions search experience. With v3.x, the usage is consolidated under the [SearchBox](/docs/reactivesearch/vue/search/searchbox/) UI component for building both suggestions and search experiences.

**v3.x:** (new usage)

```html
    <search-box
        component-id="Search"
        data-field="['title', 'description']"
    />
```

**v1.x:** (older usage)

```html
    <data-search
        component-id="Search"
        data-field="['title', 'description']"
    />
```


## Removal of Deprecated props

ReactiveSearch v3 removes the following deprecated props and you can use the corresponding alternative props instead:

| <p style="margin: 0px;" class="table-header-text">Prop Name</p>   | <p style="margin: 0px;" class="table-header-text">Component</p> | <p style="margin: 0px;" class="table-header-text">Alternative</p> |
| ------ | --------------------------- | -------- |
| `analyticsConfig` | `ReactiveBase`   | `reactivesearchAPIConfig`    |
| `appbaseConfig` | `ReactiveBase`   | `reactivesearchAPIConfig`    |
| `analytics` | `ReactiveBase`   | `reactivesearchAPIConfig.recordAnalytics`    |
| `enableAppbase` | `ReactiveBase`   | `N/A`    |
| `aggregationField` | `All Components`   | `distinctField`    |


## SSR support

For server-side rendering (SSR) usage migration from v1 to v3, there are two primary changes you will need to make. See the code snippets below showing this process for a Nuxt.js app. The steps are similar for doing SSR with Express.

### Change 1: initialState

For defining the initialState, update:

1. the `initReactivesearch` function call to `getServerState`.
2. Instead of passing all the component configuration explicitly inside `initReactivesearch`, pass the root component containing ReactiveBase inside `getServerState`.

**v3.x:** (new usage)

```html
<script>
import { getServerState } from '@appbaseio/reactivesearch-vue'
// Search is the component which contains ReactiveBase, SearchBox, etc.
import Search from '../components/search.vue';

export default defineNuxtComponent({
    async asyncData({query}){
        // initReactivesearch -> getServerState
        // 
        const initialState = getServerState(Search, query)
        return { initialState }
    }
})
// Library changes
</script>

<template>
  <div>
    <search :initial-state="initialState" />
  </div>
</template>
```

**v1.x:** (older usage)

```html
<script>
import { initReactivesearch, SearchBox, ReactiveList } from '@appbaseio/reactivesearch-vue'
const components = {
    // settings passed to ReactiveBase
	settings: {
		app: 'airbnb-dev',
		url: 'https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io',
		enableAppbase: true,
	},
    // query settings for searchbox component
	searchBox: {
		componentId: 'SearchSensor',
		dataField: ['name', 'name.search'],
		autosuggest: false,
	},
	result: {
		componentId: 'SearchResult',
		dataField: 'name',
		size: 12,
		react: {
			and: ['SearchSensor'],
		},
	},
};


export default {
	async asyncData({ query }) {
        const initialState = await initReactivesearch(
            // v1 required to define all the components explicitly.
            [
                {
                    ...components.searchBox,
                    // Component imported from @appbaseio/reactivesearch-vue
                    source: SearchBox,
                },
                {
                    ...components.result,
                    // Component imported from @appbaseio/reactivesearch-vue
                    source: ReactiveList,
                },
            ],
            query,
            components.settings,
        );
        return {
            initialState,
        };
	},
};
</script>
<template>
    <ReactiveBase 
        v-bind="components.settings"
        :initial-state="initialState"
    >
          <!-- App here -->
    </ReactiveBase>
</template>
```

### Change 2: Passing props to ReactiveBase

In `v3`, you would pass an additional prop called the `contextCollector` to ReactiveBase.

**v3.x:** (new usage)

There is an additional prop passed to ReactiveBase, `contextCollector`. This is required for SSR to work.

```html
<!-- search.vue -->
<template>
    <!-- Pass context collector prop additionally -->
    <ReactiveBase 
          v-bind="components.settings"
          :initial-state="initialState"
          :context-collector="contextCollector"      
    >
          <!-- App here -->
    </ReactiveBase>
</template>

<script>
export default {
    name: "Search",
	props: {
		initialState: {
			type: Object,
			default: null,
		},
        // Define the context collector prop
		contextCollector: {
			type: Function,
			default: null,
		},
	},
};
</script>
```

**v1.x:** (older usage)

```html
<template>
    <ReactiveBase 
        v-bind="components.settings"
        :initial-state="initialState"
    >
          <!-- App here -->
    </ReactiveBase>
</template>
```

Here's a link to an [example that uses NuxtJS with ReactiveSearch Vue 3.x](https://github.com/appbaseio/reactivesearch/tree/next/packages/vue/examples/with-ssr).

## New Enhancements

### ReactiveComponent

We have shed some load in the `<ReactiveComponent />` in favor of tree shaking eventually improving the bundle size and performance for our users. 

`<ReactiveComponent />` now is specifically meant for building custom reactive components for the search UIs as opposed to earlier when it supported `componentType` prop to render different standard components from the lib, which bloated the bundle unnecessarily and disabled tree shaking. 

To account for backward compatibility, we have `<ReactiveComponentPrivate />` which supports a `componentType` prop to render standard components from the reactivesearch library. The component comes in handy when rendering the components dynamically based on conditions and is actively used by the [Reactivesearch UI Builder](https://docs.reactivesearch.io/docs/reactivesearch/ui-builder/search/).

example:

```js
import { componentTypes } from '@appbaseio/reactivecore/lib/utils/constants';

// renders a MultiRange component
<ReactiveComponentPrivate :componentType="componentTypes.multiRange"  />
// renders a SearchBox component
<ReactiveComponentPrivate :componentType="componentTypes.searchBox" />
```

### compoundClause

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use must. Setting the compound clause to `filter` allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. `term`, `geo` or `range` type of queries that act as filters on the data)

> This property only has an effect when the search engine is either elasticsearch or opensearch.

### AIAnswer

![AI Answer](https://i.imgur.com/P6C5kH6.png)

`AIAnswer` is an AI-driven answer UI component that interacts with a dataset to provide context-aware and relevant answers based on user inputs. It employs machine learning to comprehend user questions and retrieve the most pertinent information. The component can be used to supply answers to common questions related to a specific topic, offer support and help by addressing user queries, and create a knowledge base or FAQ section for your website.

Learn more about the `AIAnswer` component over [here](https://docs.reactivesearch.io/docs/reactivesearch/vue/search/aianswer/).


### AIAnswer support in SearchBox

![AI Answer support in SearchBox](https://i.imgur.com/P6C5kH6.png)

`SearchBox` now has crossed limits of a basic indexed search component to a smart context aware query answerer with the integration of AI capabilities right within. The queries are answered with context auto-injected and fed to the LLM model.

Usage for AI Answer with SearchBox looks like below: 

```jsx
<search-box
    className="result-list-container"
    componentId="BookSensor"
    :dataField="['original_title', 'original_title.search']"
    :enableAI="true"
    :AIUIConfig="{
        showSourceDocuments: true,
        renderSourceDocument: (obj) => '❤️ ' + obj.original_title,
    }"
/>
```

Learn more about the AI props [here](https://docs.reactivesearch.io/docs/reactivesearch/vue/search/searchbox/#enableai)

Take a look at an example of the AI integration can do:



### FeaturedSuggestion in SearchBox

Featured suggestions (curated by you) provide for rich interactive behavior such as navigating to a page, section, or a custom behavior through a JavaScript callback function. Setting featured suggestions only requires point-and-click actions in the ReactiveSearch dashboard.

[Doc ref](https://docs.reactivesearch.io/docs/reactivesearch/vue/search/searchbox/#enablefeaturedsuggestions)


### FAQ suggestions in SearchBox

FAQ suggestions show up as show frequently asked user questions in SearchBox as configured via the ReactiveSearch dashboard.

[Doc ref](https://docs.reactivesearch.io/docs/reactivesearch/vue/search/searchbox/#enablefaqsuggestions)

**Basic Usage**

```jsx
    <search-box
        :enableFAQSuggestions="true"
        searchboxId="rs_docs"
        :FAQSuggestionsConfig="{
          size: 2,
          sectionLabel: '❓ FAQ Suggestions'
        }"
    />
```
