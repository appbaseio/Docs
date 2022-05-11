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

The following example renders a [RangeInput](/docs/reactivesearch/flutter-searchbox-ui/range-input/) ui widget from the [flutter\_searchbox_ui](/docs/reactivesearch/flutter-searchbox-ui/quickstart/) library with id `range-selector` to render a range input selector. This widget is being watched by a custom `result-widget` to filter the results data based on the range of `original_publication_year` of books, selected in `range-filter`(check the [react](https://docs.appbase.io/docs/search/reactivesearch-api/reference#react) property).

```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';
import 'package:flutter_searchbox_ui/flutter_searchbox_ui.dart';

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
                    (searchController.size ?? 0);
                if (index == offset - 1) {
                  if ((searchController.results!.numberOfResults) > offset) {
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

