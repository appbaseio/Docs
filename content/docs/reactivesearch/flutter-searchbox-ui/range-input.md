---
title: 'RangeInput'
meta_title: 'RangeInput'
meta_description: '`RangeInput` creates a data-driven map UI widget using Google Maps for Flutter. It is the key widget for building map based experiences.'
keywords:
    - range-input
    - flutter_searchbox_ui
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox-ui'
---

<div style="margin: auto; width: max-content;">
  <img src="https://i.imgur.com/mNY3cb3.gif" alt="Range Input Example" width="300px" />
</div>


Examples Uses:

- Filtering products from a price range in an e-commerce shopping experience.
- Filtering flights from a range of departure and arrival times.

## Basic usage

```dart
  RangeInput(
    id: 'range-selector',
    dataField: 'original_publication_year',
    defaultValue: const DefaultValue(start: 1980, end: 2000),
    range: const RangeType(
      start: 1900,
      end: ['other', 1990, 2000, 2010, 'no_limit'],
    ), 
  )
```

## Usage with All Props

```dart
  RangeInput(
    // all other props supported by SearchWidgetConnector
    id: 'range-selector',
    buildTitle: () {
      return const Text(
        "Publication Years",
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16.0,
          color: Colors.amber,
        ),
      );
    },
    buildRangeLabel: () {
      return const Text(
        "until",
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16.0,
          color: Colors.blue,
          ),
        );
    },
    dataField: 'original_publication_year',
    range: const RangeType(
      start: 1900,
      end: ['other', 1990, 2000, 2010, 'no_limit'],
    ),
    defaultValue: const DefaultValue(start: 1980, end: 2000),
    rangeLabels: RangeLabelsType(
      start: (value) {
        return value == 'other'
            ? 'Custom Other'
            : (value == 'no_limit' ? 'No Limit' : 'yr $value');
      },
      end: (value) {
        return value == 'other'
            ? 'Custom Other'
            : (value == 'no_limit' ? 'No Limit' : 'yr $value');
      },
    ),
    validateRange: (start, end) {
      if (start < end) {
        return true;
      }
      return false;
    },
    buildErrorMessage: (start, end) {
      return Text(
         'Custom error $start > $end',
          style: const TextStyle(
          fontSize: 15.0,
          color: Colors.yellowAccent,
        ),
      );
    },
    inputStyle: const TextStyle(
      fontSize: 18,
      height: 1,
      color: Colors.deepPurple,
    ),
    dropdownStyle: const TextStyle(
      fontSize: 18,
      height: 1,
      color: Colors.deepPurpleAccent,
    ),
    customContainer: (showError, childWidget) {
      return Container(
        padding: const EdgeInsets.only(left: 6.0, right: 1.0),
        height: 50,
        decoration: BoxDecoration(
          border: Border.all(
            color: showError ? Colors.orangeAccent : Colors.black,
            width: 1.5,
          ),
          borderRadius: BorderRadius.circular(3),
        ),
        child: childWidget,
      );
    },
    closeIcon: () {
      return const Text(
        "X",
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16.0,
          color: Colors.blueAccent,
        ),
      );
    },
    dropdownIcon: (showError) {
      return Icon(
        Icons.arrow_drop_down,
        color: showError ? Colors.red : Colors.black,
      );
    },
  )
```

## API Reference
Check out the docs for API Reference over [here](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/RangeInput-class.html/).

## Example
TODO: ADD AN EXAMPLE --> Rangeinput WITH Results