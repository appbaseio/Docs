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

ReactiveSearch is fully compatible with Vue 3.x and above with the 3.x releases. This release comes after the feedback we have gathered from the iterative deployment of reactivesearch in production for the dozens of our clients over the last year. In this version, we have changed the way certain props behave, and included new components. This guide will give you a brief about all the changes.

## ReactiveSearch

### Connect with ReactiveSearch Cloud

Starting v3, ReactiveSearch has removed support for front-end query generation, we strongly encourage upgrading to v4 for powering a secure search experience with ReactiveSearch.

More on security risks of allowing a search DSL over the network:

- Elasticsearch's query DSL being imperative in nature, allowing the entire DSL to be accessible from a web or mobile frontend creates a DoS vector where expensive queries can be run to deny service to actual users.
- It also presents a data scraping risk.
- The query DSL's imperative nature also makes it hard to enrich, transform or apply access controls to search requests.


### Benefits

- ReactiveSearch Cloud magic: Accelerate, enrich, and transform your search requests using features such as query rules, search relevance, caching, analytics
- Easy to secure: As ReactiveSearch API doesn't expose Elasticsearch APIs directly, it prevents the possibility of DSL based injection attacks
- Composable: Easily composes with Elasticsearch's query DSL for advanced use-cases
- Encapsulate business logic: Don't want to expose sensitive fields to web and mobile clients? Set the fields to return with ReactiveSearch dashboard once and avoid declaring them as part of the network requests.

### Supports Vue 3.x
ReactiveSearch components are fully compatible with Vue 3.x. In Vue 3.x the usage of slots have been changed completely.

#### Usage of named slot
**v1.x:**

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

**v3.x:**

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

#### Usage of default slot
**v1.x:**

```html
    <reactive-component
        component-id="custom-component"
    >
        <div slot-scope="{ hits, aggregations }">
            {...}
        </div>
    </reactive-list>
```

**v3.x:**

```html
    <reactive-component
        component-id="custom-component"
    >
        <template #default="{ hits, aggregations }">
            {...}
        </template>
    </reactive-list>
```


**v1.x:**

Elasticsearch `_msearch` request

![alt network req v1](https://i.imgur.com/6Ew1txq.png)

**v3.x:**

[ReactiveSearch API](/docs/search/reactivesearch-api/) in action

![alt network req v4](https://i.imgur.com/dSNqvlR.png)


### Removal of `DataSearch` component
In 1.x we had one components for auto-suggestions, `DataSearch`. In 3.x we have only one component named [SearchBox](/docs/reactivesearch/vue/search/searchbox/) to implement auto-suggestions UI.

**v1.x:**

```html
    <data-search
        component-id="Search"
        data-field="['title', 'description']"
    />
```

**v3.x:**

```html
    <search-box
        component-id="Search"
        data-field="['title', 'description']"
    />
```

### Removal of Deprecated props
We have also removed the following deprecated props:

| <p style="margin: 0px;" class="table-header-text">Prop Name</p>   | <p style="margin: 0px;" class="table-header-text">Component</p> | <p style="margin: 0px;" class="table-header-text">Alternative</p> |
| ------ | --------------------------- | -------- |
| `analyticsConfig` | `ReactiveBase`   | `reactivesearchAPIConfig`    |
| `appbaseConfig` | `ReactiveBase`   | `reactivesearchAPIConfig`    |
| `analytics` | `ReactiveBase`   | `reactivesearchAPIConfig.recordAnalytics`    |
| `enableAppbase` | `ReactiveBase`   | `N/A`    |
| `aggregationField` | `All Components`   | `distinctField`    |


### New Enhancements

#### ReactiveComponent

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

#### compoundClause

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use must. Setting the compound clause to `filter` allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. `term`, `geo` or `range` type of queries that act as filters on the data)

> This property only has an effect when the search engine is either elasticsearch or opensearch.

#### AIAnswer

![AI Answer](https://i.imgur.com/P6C5kH6.png)

`AIAnswer` is an AI-driven answer UI component that interacts with a dataset to provide context-aware and relevant answers based on user inputs. It employs machine learning to comprehend user questions and retrieve the most pertinent information. The component can be used to supply answers to common questions related to a specific topic, offer support and help by addressing user queries, and create a knowledge base or FAQ section for your website.

Learn more about the `AIAnswer` component over [here](https://docs.reactivesearch.io/docs/reactivesearch/vue/search/aianswer/).


#### AIAnswer support in SearchBox

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



#### FeaturedSuggestion in SearchBox

Featured suggestions (curated by you) provide for rich interactive behavior such as navigating to a page, section, or a custom behavior through a JavaScript callback function. Setting featured suggestions only requires point-and-click actions in the ReactiveSearch dashboard.

[Doc ref](https://docs.reactivesearch.io/docs/reactivesearch/vue/search/searchbox/#enablefeaturedsuggestions)


#### FAQ suggestions in SearchBox

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