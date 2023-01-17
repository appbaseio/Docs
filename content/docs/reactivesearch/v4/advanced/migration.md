---
title: 'ReactiveSearch: Migration Guide'
meta_title: 'ReactiveSearch: Migration Guide'
meta_description: 'This guide will give you a brief about all the changes in the 4.x release of ReactiveSearch.'
keywords:
    - reactivesearch
    - migrationguide
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

ReactiveSearch and ReactiveMaps are fully compatible with React 18.x and above with the 4.x releases. This release comes after the feedback we have gathered from the iterative deployment of reactivesearch in production for the dozens of our clients over the last year. In this version, we have changed the way certain props behave, and included new components. This guide will give you a brief about all the changes.

## ReactiveSearch

### Removal of FE query generation
In this release we have removed the front-end query generation, we discourage the use of front-end queries to search backend which is a security risk.
We're using the declarative [Reactivesearch API](/docs/search/reactivesearch-api/) to query the search backend. You can either self-host the OSS version of [Reactivesearch API Server](https://github.com/appbaseio/reactivesearch-api) or use the Appbase services.

### Removal of `DataSearch` & `CategorySearch` components
In 3.x we had two components for auto-suggestions, `DataSearch` & `CategorySearch` (to display category suggestions). In 4.x we have only one component named [SearchBox](/docs/reactivesearch/v3/search/searchbox/) to implement auto-suggestions UI.

**v3.x:**

```jsx
    <DataSearch
        componentId="Search"
        dataField={['title', 'description']}
    />
```

**v4.x:**

```jsx
    <SearchBox
        componentId="Search"
        dataField={['title', 'description']}
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
| `triggerAnalytics` | `ReactiveList.renderItem`   | `triggerClickAnalytics`    |
| `aggregationField` | `All Components`   | `distinctField`    |