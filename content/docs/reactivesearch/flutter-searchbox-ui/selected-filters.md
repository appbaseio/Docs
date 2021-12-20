---
title: 'SelectedFilters'
meta_title: 'SelectedFilters'
meta_description: 'SelectedFilters creates a selectable filter UI view displaying the current selected values from other active widgets.'
keywords:
    - selected-filters
    - flutter_searchbox_ui
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox-ui'
---

![Basic Example]()

It creates a selectable filter UI view displaying the current selected values from other active widgets.

This component is useful for improving selection accessibility of other components.

Examples Use(s):

displaying all the user selected facet filters together in the main view area for better accessibility.

## Basic Usage 

```dart
  SelectedFilters(
    subscribeTo: const ['range-selector', 'search-box'],
    showClearAll: true,
  )

```

## Usage with All Props

```dart
  SelectedFilters(
    subscribeTo: const ['range-selector','search-box'],
    filterLabel: (id, value) {
      if (id == 'range-selector') {
        return 'Range: $value';
      }
      return '$id: $value';
    },
    showClearAll: true,
    clearAllLabel: "Vanish All",
    onClearAll: () {
      // do something here
      print('Clear all called');
    },
    onClear: (id, value) {
      // do something here
      print('Filter $id with value: ${value.toString()} cleared');
    },
    resetToDefault: true,
    defaultValues: const {
      "range-selector": {'start': 5, 'end': 10}
    },
    hideDefaultValues: false,
    // use below property to render custom ui for SelectedFilters widget
    buildFilters: (options) {
      List<Widget> widgets = [];
      options.selectedValues.forEach((id, filterValue) {
        widgets.add(
          Chip(
            label: Text(
                ' $id --- ${options.getValueAsString(filterValue)}'),
            onDeleted: () {
              options.clearValue(id);
            },
          ),
        );
      });
      return Wrap(
        spacing: 16.0,
        crossAxisAlignment: WrapCrossAlignment.start,
        // gap between adjacent chips
        children: widgets,
      );
    },
  )

```

## API Reference
Check out the docs for API Reference over [here](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/SelectedFilters-class.html/).

## Example
TODO: ADD AN Example ⇒ SearchBox + RangeInput + Result