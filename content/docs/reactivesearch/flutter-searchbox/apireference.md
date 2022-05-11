---
title: 'API Reference'
meta_title: 'API Reference for Flutter SearchBox'
meta_description: 'flutter-searchbox is a lightweight library that provides scaffolding to create search experiences powered by Elasticsearch.'
keywords:
    - api-reference
    - flutter-searchbox
    - search-ui
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox'
---

[flutter-searchbox](https://github.com/appbaseio/flutter-searchbox/tree/master/flutter_searchbox) - Flutter SearchBox is a standalone, search library that provides scaffolding to create search experiences powered by Elasticsearch.

## How does it work

[flutter-searchbox](https://github.com/appbaseio/flutter-searchbox/tree/master/flutter_searchbox) provides declarative props to query Elasticsearch and bind the search state with the UI widgets. The `flutter-searchbox` library provides a built-in UI widget called SearchBox. As the name suggests, SearchBox widget is useful for creating a search box UI. It also provides a general purpose [SearchWidgetConnector](/docs/reactivesearch/flutter-searchbox/searchwidgetconnector/) to bind to UI widgets for displaying different kinds of facets and results.


Example use-cases are:

-   To perform a search across e-commerce products by its `name` or `description` fields
-   To create a category filter component
-   To create a price range search filter
-   To build a location filter
-   To render the search results etc.

This library is divided into three components:

[SearchBaseProvider](/docs/reactivesearch/flutter-searchbox/searchbaseprovider/) is a provider widget that provides the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context to all descendants of this Widget. It binds the backend app (data source) with the UI view widgets (elements wrapped within SearchBaseProvider), allowing a UI widget to be reactively updated every time there is a change in the data source or in other UI widgets.

[SearchBox](/docs/reactivesearch/flutter-searchbox/searchbox/) offers a ready to use, lightweight, and performance-focused searchbox UI widget to query and display results from your Elasticsearch cluster.

[SearchWidgetConnector](/docs/reactivesearch/flutter-searchbox/searchwidgetconnector/) can be used to build different kinds of search experiences. For examples,

-   a search bar component,
-   a category filter component,
-   a price range component,
-   a location filter component,
-   a component to render the search results etc.
