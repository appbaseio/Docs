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

![Basic Example](https://user-images.githubusercontent.com/57627350/135604730-f63508d6-fd67-4bcc-8066-463624984b56.gif/)

The following example renders a RangeInput ui widget from the flutter_searchbox_ui library with id `range-selector` to render a range input selector. This widget is being watched by a custom `result-widget` to filter the results data based on the range of `original_publication_year` of books, selected in `range-filter`(check the [react](https://docs.appbase.io/docs/search/reactivesearch-api/reference#react) property).

```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';
import 'package:flutter_searchbox_ui/flutter_searchbox_ui.dart';

import 'results.dart';

void main() {
  runApp(FlutterSearchBoxUIApp());
}

class FlutterSearchBoxUIApp extends StatelessWidget {
  // Avoid creating searchbase instance in build method
  // to preserve state on hot reloading
  final searchbaseInstance = SearchBase(
      'good-books-ds',
      'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
      'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
      appbaseConfig: AppbaseSettings(
          recordAnalytics: true,
          // Use unique user id to personalize the recent searches
          userId: 'jon@appbase.io'));

  FlutterSearchBoxUIApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // The SearchBaseProvider should wrap your MaterialApp or WidgetsApp. This will
    // ensure all routes have access to the store.
    return SearchBaseProvider(
      // Pass the searchbase instance to the SearchBaseProvider. Any ancestor `SearchWidgetConnector`
      // widgets will find and use this value as the `SearchController`.
      searchbase: searchbaseInstance,
      child: MaterialApp(
        title: "SearchBox Demo",
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: Scaffold(
          appBar: AppBar(
            title: RangeInput(
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
            ),
            toolbarHeight: 120,
            backgroundColor: Colors.white.withOpacity(.9),
          ),
          body: Center(
            // A custom UI widget to render a list of results
            child: SearchWidgetConnector(
                id: 'result-widget',
                dataField: 'original_title',
                react: const {
                  'and': [
                    'range-selector',
                  ],
                },
                size: 10,
                triggerQueryOnInit: true,
                preserveResults: true,
                builder: (context, searchController) =>
                    ResultsWidget(searchController)),
          ),
        ),
      ),
    );
  }
}
```

**Results widget**
```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';

class StarDisplay extends StatelessWidget {
  final int value;
  const StarDisplay({Key? key, this.value = 0}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(0, 5, 0, 0),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: List.generate(5, (index) {
          return Icon(
            index < value ? Icons.star : Icons.star_border,
            size: 20,
          );
        }),
      ),
    );
  }
}

class ResultsWidget extends StatelessWidget {
  final SearchController searchController;
  ResultsWidget(this.searchController);
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Card(
          child: Align(
            alignment: Alignment.centerLeft,
            child: Container(
              color: Colors.white,
              height: 20,
              child: Text(
                  '${searchController.results!.numberOfResults} results found in ${searchController.results!.time.toString()} ms'),
            ),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemBuilder: (context, index) {
              WidgetsBinding.instance!.addPostFrameCallback((_) {
                var offset = (searchController.from != null
                        ? searchController.from
                        : 0)! +
                    searchController.size!;
                if (index == offset - 1) {
                  if (searchController.results!.numberOfResults > offset) {
                    // Load next set of results
                    searchController.setFrom(offset,
                        options: Options(triggerDefaultQuery: true));
                  }
                }
              });

              return Container(
                  child: (index < searchController.results!.data.length)
                      ? Container(
                          margin: const EdgeInsets.all(0.5),
                          padding: const EdgeInsets.fromLTRB(0, 15, 0, 0),
                          decoration: new BoxDecoration(
                              border: Border.all(color: Colors.black26)),
                          height: 200,
                          child: Row(
                            children: [
                              Expanded(
                                flex: 3,
                                child: Column(
                                  children: [
                                    Card(
                                      semanticContainer: true,
                                      clipBehavior: Clip.antiAliasWithSaveLayer,
                                      child: Image.network(
                                        searchController.results!.data[index]
                                            ["image_medium"],
                                        fit: BoxFit.fill,
                                      ),
                                      elevation: 5,
                                      margin: EdgeInsets.all(10),
                                    ),
                                  ],
                                ),
                              ),
                              Expanded(
                                flex: 7,
                                child: Column(
                                  children: [
                                    Column(
                                      children: [
                                        SizedBox(
                                          height: 110,
                                          width: 280,
                                          child: ListTile(
                                            title: Tooltip(
                                              padding: EdgeInsets.all(5),
                                              height: 35,
                                              textStyle: TextStyle(
                                                  fontSize: 15,
                                                  color: Colors.grey,
                                                  fontWeight:
                                                      FontWeight.normal),
                                              decoration: BoxDecoration(
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: Colors.grey,
                                                    spreadRadius: 1,
                                                    blurRadius: 1,
                                                    offset: Offset(0, 1),
                                                  ),
                                                ],
                                                color: Colors.white,
                                              ),
                                              message:
                                                  'By: ${searchController.results!.data[index]["original_title"]}',
                                              child: Text(
                                                searchController
                                                            .results!
                                                            .data[index][
                                                                "original_title"]
                                                            .length <
                                                        40
                                                    ? searchController.results!
                                                            .data[index]
                                                        ["original_title"]
                                                    : '${searchController.results!.data[index]["original_title"].substring(0, 39)}...',
                                                style: TextStyle(
                                                  fontSize: 20.0,
                                                ),
                                              ),
                                            ),
                                            subtitle: Tooltip(
                                              padding: EdgeInsets.all(5),
                                              height: 35,
                                              textStyle: TextStyle(
                                                  fontSize: 15,
                                                  color: Colors.grey,
                                                  fontWeight:
                                                      FontWeight.normal),
                                              decoration: BoxDecoration(
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: Colors.grey,
                                                    spreadRadius: 1,
                                                    blurRadius: 1,
                                                    offset: Offset(0, 1),
                                                  ),
                                                ],
                                                color: Colors.white,
                                              ),
                                              message:
                                                  'By: ${searchController.results!.data[index]["authors"]}',
                                              child: Text(
                                                searchController
                                                            .results!
                                                            .data[index]
                                                                ["authors"]
                                                            .length >
                                                        50
                                                    ? 'By: ${searchController.results!.data[index]["authors"].substring(0, 49)}...'
                                                    : 'By: ${searchController.results!.data[index]["authors"]}',
                                                style: TextStyle(
                                                  fontSize: 15.0,
                                                ),
                                              ),
                                            ),
                                            isThreeLine: true,
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            Padding(
                                              padding:
                                                  const EdgeInsets.fromLTRB(
                                                      25, 0, 0, 0),
                                              child: IconTheme(
                                                data: IconThemeData(
                                                  color: Colors.amber,
                                                  size: 48,
                                                ),
                                                child: StarDisplay(
                                                    value: searchController
                                                            .results!
                                                            .data[index][
                                                        "average_rating_rounded"]),
                                              ),
                                            ),
                                            Padding(
                                              padding:
                                                  const EdgeInsets.fromLTRB(
                                                      10, 5, 0, 0),
                                              child: Text(
                                                '(${searchController.results!.data[index]["average_rating"]} avg)',
                                                style: TextStyle(
                                                  fontSize: 12.0,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            Padding(
                                              padding:
                                                  const EdgeInsets.fromLTRB(
                                                      27, 10, 0, 0),
                                              child: Text(
                                                'Pub: ${searchController.results!.data[index]["original_publication_year"]}',
                                                style: TextStyle(
                                                  fontSize: 12.0,
                                                ),
                                              ),
                                            )
                                          ],
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        )
                      : (searchController.requestPending
                          ? Center(child: CircularProgressIndicator())
                          : ListTile(
                              title: Center(
                                child: RichText(
                                  text: TextSpan(
                                    text:
                                        searchController.results!.data.length >
                                                0
                                            ? "No more results"
                                            : 'No results found',
                                    style: TextStyle(
                                        color: Colors.black54,
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ),
                            )));
            },
            itemCount: searchController.results!.data.length + 1,
          ),
        ),
      ],
    );
  }
}
```


### An example with a ReactiveGoogleMap widget

![ReactiveGoogleMap widget Example](https://raw.githubusercontent.com/appbaseio/flutter-assets/master/map.gif)

The following example renders one more custom widget with id `author-filter` to render a list of authors. This widget is being used by `result-widget` to filter the results data. The `author-filter` widget also reacts to the `search-widget` (check the [react](https://docs.appbase.io/docs/search/reactivesearch-api/reference#react) property) to update the authors list reactively whenever the search query changes.


## API Reference
Check out the docs for API Reference over [here](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/flutter_searchbox_ui-library.html/).
