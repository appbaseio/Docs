---
title: 'API Reference'
meta_title: 'API Reference to React SearchBox'
meta_description: 'React SearchBox is a lightweight library that provides scaffolding to create search experiences powered by Elasticsearch.'
keywords:
    - quickstart
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---
 
[react-searchbox](https://github.com/appbaseio/react-searchbox) - React SearchBox is a standalone, lightweight(~30KB: Minified + Gzipped) search library that allows you to add custom UI components and allow seamless search systems.

## How does it work?

[react-searchbox](https://github.com/appbaseio/react-searchbox) uses the [SearchBase](docs/reactivesearch/searchbase/overview/QuickStart/) library under the hood and make the [SearchBase](docs/reactivesearch/searchbase/overview/QuickStart/) APIs configurable by declarative props to ease out the [SearchBase](docs/reactivesearch/searchbase/overview/QuickStart/) integration for react developers. The [react-searchbox](https://github.com/appbaseio/react-searchbox) library provides a built-in component to render a search bar to perform search with Elasticsearch. Additionally, it provides the [SearchComponent](docs/reactivesearch/react-searchbox/searchcomponent/) to build UI components with different kind of Elasticsearch queries (`term`, `geo`, `range` etc).


Example use-cases are:

-   To perform a search across e-commerce products by its `name` or `description` fields.
-   To create a category filter component.
-   To create a price range search filter.
-   To build a location filter.
-   To render the search results etc.

This library has 3 essentials parts

[SearchBase](docs/reactivesearch/react-searchbox/searchbase/) is a provider component that provides the [SearchBase](docs/reactivesearch/searchbase/overview/QuickStart/) context to the child components. It binds the backend app (data source) with the UI view components (elements wrapped within SearchBase), allowing a UI component to be reactively updated every time there is a change in the data source or in other UI components.

[SearchBox](docs/reactivesearch/react-searchbox/searchbox/) offers a ready to use, lightweight, and performance-focused searchbox UI component to query and display results from your Elasticsearch cluster.

[SearchComponent](docs/reactivesearch/react-searchbox/searchcomponent/) can be used to build different kinds of search experiences. For examples,

-   a search bar component,
-   a category filter component,
-   a price range component,
-   a location filter component,
-   a component to render the search results etc.