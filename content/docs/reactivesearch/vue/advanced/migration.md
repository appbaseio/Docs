---
title: 'ReactiveSearch (Vue): Migration Guide'
meta_title: 'ReactiveSearch (Vue): Migration Guide'
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

### Removal of FE query generation
In this release we have removed the front-end query generation, we discourage the use of front-end queries to search backend which is a security risk.
We're using the declarative [Reactivesearch API](/docs/search/reactivesearch-api/) to query the search backend. You can either self-host the OSS version of [Reactivesearch API Server](https://github.com/appbaseio/reactivesearch-api) or use the Appbase services.

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
| `enableAppbase` | `ReactiveBase`   | `_`    |
| `aggregationField` | `All Components`   | `distinctField`    |