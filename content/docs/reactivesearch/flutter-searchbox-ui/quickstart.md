---
title: 'QuickStart'
meta_title: 'QuickStart to Flutter Searchbox UI'
meta_description: 'flutter_searchbox_ui library provides ready to use search UI widgets to create search experiences powered by Elasticsearch.'
keywords:
    - quickstart
    - flutter_searchbox_ui
    - flutter
    - dart
    - search ui widgets library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox-ui'
---

[Flutter Searchbox UI](https://github.com/appbaseio/flutter-searchbox/tree/master/flutter_searchbox_ui) provides ready to use search UI widgets buil on top of [flutter_searchbox](/docs/reactivesearch/flutter-searchbox/quickstart/) to create search experiences powered by  Elasticsearch. As the name suggests, it provides a collection search widgets for Elasticsearch and Appbase.io.

## Installation

1. Depend on it

Add this to your package's `pubspec.yaml` file:

```yaml
dependencies:
  flutter_searchbox: ^2.2.3-nullsafety
  searchbase: ^2.2.2
  flutter_searchbox_ui: 1.0.16-alpha
```

2. Install it

You can install packages from the command line:

```bash
$ flutter pub get
```

> To use [ReactiveGoogleMap](/docs/reactivesearch/flutter-searchbox-ui/reactive-google-map/) please follow the installation guide mentioned at [here](https://pub.dev/packages/google_maps_flutter/).

## Usage

### An example with RangeInput


<div style="width: 250px; margin: auto;">
  <img alt="range-input-example" src="https://i.imgur.com/p0xR0QM.gif" />
</div>

In this example, we can see the usage of the [RangeInput](/docs/reactivesearch/flutter-searchbox-ui/range-input/) ui widget from the [flutter\_searchbox_ui](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/flutter_searchbox_ui-library.html/) library with id `range-selector` to render a range input selector. Please go over [here](/docs/reactivesearch/flutter-searchbox-ui/range-input/#example) to check it out.

### An example with a ReactiveGoogleMap widget

<div style="width: 250px; margin: auto;">
  <img alt="reactive-google-map-example" src="https://raw.githubusercontent.com/appbaseio/flutter-assets/master/map.gif" />
</div>

In this example, we can see the usage of the [ReactiveGoogleMap](/docs/reactivesearch/flutter-searchbox-ui/reactive-google-map/) ui widget from the [flutter\_searchbox_ui](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/flutter_searchbox_ui-library.html/) library with id `map-widget` to filter the earthquakes markers data based on the range of magnitude of earthquakes, selected in `range-selector`(check the react property). Please go over [here](/docs/reactivesearch/flutter-searchbox-ui/reactive-google-map/#example) to check it out.

### An example with SelectFilters

<div style="width: 250px; margin: auto;">
  <img alt="SelectFilters-example" src="https://i.imgur.com/YaHzFrk.gif" />
</div>

In this example, we can see the usage of the [SelectedFilters](/docs/reactivesearch/flutter-searchbox-ui/selected-filters/) ui widget from the [flutter\_searchbox_ui](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/flutter_searchbox_ui-library.html/) library to display the filters as selected in `range-selector`. The widget has the ability to clear out filters and display active filters. Please go over [here](/docs/reactivesearch/flutter-searchbox-ui/selected-filters/#example) to check it out.

## API Reference
Check out the docs for API Reference over [here](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/flutter_searchbox_ui-library.html/).
