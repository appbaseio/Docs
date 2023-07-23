---
title: 'ReactiveSearch: Migration Guide v3 -> v4'
meta_title: 'ReactiveSearch: Migration Guide v3 -> v4'
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

Elasticsearch's query DSL is imperative in nature. Enabling the whole DSL to be accessible from a web or mobile frontend opens a can of security worms. The query DSL's imperative nature also makes it hard to enrich, transform or apply access controls to search requests. We saw these problems as earlier versions of ReactiveSearch UI kit only supported the Elasticsearch query DSL.

### Benefits

- ReactiveSearch Cloud magic: Accelerate, enrich, and transform your search requests using features such as query rules, search relevance, caching, analytics
- Easy to secure: As ReactiveSearch API doesn't expose Elasticsearch APIs directly, it prevents the possibility of DSL based injection attacks
- Composable: Easily composes with Elasticsearch's query DSL for advanced use-cases
- Encapsulate business logic: Don't want to expose sensitive fields to web and mobile clients? Set the fields to return with ReactiveSearch dashboard once and avoid declaring them as part of the network requests.

**v3.x:**

Elasticsearch `_msearch` request

![alt network req v1](https://i.imgur.com/6Ew1txq.png)

**v4.x:**

[ReactiveSearch API](/docs/search/reactivesearch-api/) in action

![alt network req v4](https://i.imgur.com/dSNqvlR.png)
### Removal of `DataSearch` & `CategorySearch` components
In 3.x we had two components for auto-suggestions, `DataSearch` & `CategorySearch` (to display category suggestions). In 4.x we have only one component named [SearchBox](/docs/reactivesearch/react/search/searchbox/) to implement auto-suggestions UI.

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