---
title: 'QuickStart'
meta_title: 'QuickStart to React SearchBox'
meta_description: 'React SearchBox is a lightweight react searchbox UI component to query your Elasticsearch app.'
keywords:
    - quickstart
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

`React SearchBox` offers a lightweight (~30KB: Minified + Gzipped) and performance focused searchbox UI component to query and display results from your Elasticsearch app (aka index) using declarative props. It is an alternative to using the [DataSearch component](/docs/reactivesearch/v3/search/datasearch/) from ReactiveSearch.

### When to Use React SearchBox

We recommend using React Searchbox over DataSearch or CategorySearch when you only need to integrate a searchbox UI component into your app. If you are planning to user other UI filters or result components, it is ideal to use the [ReactiveSearch library](/docs/reactivesearch/v3/overview/quickstart/) instead of this standalone component.

Example uses of searchbox UI:

-   Searching a rental listing by its `name` or `description` fields.
-   Searching across e-commerce products.

This library has 3 essentials parts

-   **SearchBase** is a container component that wraps all the ReactiveSearch components together. It binds the backend app (data source) with the UI view components
    (elements wrapped within ReactiveBase), allowing a UI component to be reactively updated every time there is a change in the data source or in other UI components.

*   **SearchBox** SearchBox offers a lightweight and performance focused searchbox UI component to query and display results from your Elasticsearch cluster.

*   **SearchComponent**
