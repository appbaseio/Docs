---
title: 'QuickStart'
meta_title: 'QuickStart to Flutter Searchbox'
meta_description: 'flutter_searchbox is a lightweight library that provides scaffolding to create search experiences powered by Elasticsearch.'
keywords:
    - quickstart
    - flutter_searchbox
    - flutter
    - dart
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox'
---

[flutter_searchbox](https://github.com/appbaseio/flutter-searchbox/tree/master/flutter_searchbox) provides declarative API to query Elasticsearch, and binds UI widgets with different types of search queries. As the name suggests, it provides a searchbox UI widget for Elasticsearch and Appbase.io.

## Installation

1. Depend on it

Add this to your package's `pubspec.yaml` file:

```yaml
dependencies:
  flutter_searchbox: ^1.0.0
  searchbase: ^1.0.0
```

2. Install it

You can install packages from the command line:

```bash
$ flutter pub get
```

## Basic usage

### A simple example

![Basic Example](https://raw.githubusercontent.com/appbaseio/flutter-assets/master/basic.gif)

The following example renders an autosuggestion `search-widget` with one custom widget `result-widget` to render the results. The `result-widget` watches the `search-widget` for input changes and updates its UI when the user selects a suggestion.

```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';

void main() {
  runApp(FlutterSearchBoxApp());
}

class FlutterSearchBoxApp extends StatelessWidget {
  // Avoid creating searchbase instance in build method
  // to preserve state on hot reloading
  final searchbaseInstance = SearchBase(
      'good-books-ds',
      'https://arc-cluster-appbase-demo-6pjy6z.searchbase.io',
      'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
      appbaseConfig: AppbaseSettings(
          recordAnalytics: true,
          // Use unique user id to personalize the recent searches
          userId: 'jon@appbase.io'));

  FlutterSearchBoxApp({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // The SearchBaseProvider should wrap your MaterialApp or WidgetsApp. This will
    // ensure all routes have access to the store.
    return SearchBaseProvider(
      // Pass the searchbase instance to the SearchBaseProvider. Any ancestor `SearchWidgetConnector`
      // Widgets will find and use this value as the `SearchController`.
      searchbase: searchbaseInstance,
      child: MaterialApp(
        title: "SearchBox Demo",
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SearchBox Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        appBar: AppBar(
          actions: <Widget>[
            IconButton(
                icon: Icon(Icons.search),
                onPressed: () {
                  // Invoke the Search Delegate to display search UI with autosuggestions
                  showSearch(
                      context: context,
                      // SearchBox widget from flutter searchbox
                      delegate: SearchBox(
                        // A unique identifier that can be used by other widgetss to reactively update data
                        id: 'search-widget',
                        enableRecentSearches: true,
                        enablePopularSuggestions: true,
                        showAutoFill: true,
                        maxPopularSuggestions: 3,
                        size: 10,
                        dataField: [
                          {'field': 'original_title', 'weight': 1},
                          {'field': 'original_title.search', 'weight': 3}
                        ],
                      ));
                }),
          ],
          title: Text('SearchBox Demo'),
        ),
        body: Center(
          // A custom UI widget to render a list of results
          child: SearchWidgetConnector(
              id: 'result-widget',
              dataField: 'original_title',
              react: {
                'and': ['search-widget'],
              },
              size: 10,
              triggerQueryOnInit: true,
              preserveResults: true,
              builder: (context, searchController) => ResultsWidget(searchController)),
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
                  '${searchController.results.numberOfResults} results found in ${searchController.results.time.toString()} ms'),
            ),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemBuilder: (context, index) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                var offset =
                    (searchController.from != null ? searchController.from : 0) +
                        searchController.size;
                if (index == offset - 1) {
                  if (searchController.results.numberOfResults > offset) {
                    // Load next set of results
                    searchController.setFrom(offset,
                        options: Options(triggerDefaultQuery: true));
                  }
                }
              });

              return Container(
                  child: (index < searchController.results.data.length)
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
                                        searchController.results.data[index]
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
                                                  'By: ${searchController.results.data[index]["original_title"]}',
                                              child: Text(
                                                searchController
                                                            .results
                                                            .data[index][
                                                                "original_title"]
                                                            .length <
                                                        40
                                                    ? searchController
                                                            .results.data[index]
                                                        ["original_title"]
                                                    : '${searchController.results.data[index]["original_title"].substring(0, 39)}...',
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
                                                  'By: ${searchController.results.data[index]["authors"]}',
                                              child: Text(
                                                searchController
                                                            .results
                                                            .data[index]
                                                                ["authors"]
                                                            .length >
                                                        50
                                                    ? 'By: ${searchController.results.data[index]["authors"].substring(0, 49)}...'
                                                    : 'By: ${searchController.results.data[index]["authors"]}',
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
                                                '(${searchController.results.data[index]["average_rating"]} avg)',
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
                                                'Pub: ${searchController.results.data[index]["original_publication_year"]}',
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
                                    text: searchController.results.data.length > 0
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
            itemCount: searchController.results.data.length + 1,
          ),
        ),
      ],
    );
  }
}
```

### An example with a facet

![Facet Example](https://raw.githubusercontent.com/appbaseio/flutter-assets/master/advanced.gif)

The following example renders one more custom widget with id `author-filter` to render a list of authors. This widget is being used by `result-widget` to filter the results data. The `author-filter` widget also reacts to the `search-widget` (check the `react` property) to update the authors list reactively whenever the search query changes.

```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';

void main() {
  runApp(FlutterSearchBoxApp());
}

class FlutterSearchBoxApp extends StatelessWidget {
  // Avoid creating searchbase instance in build method
  // to preserve state on hot reloading
  final searchbaseInstance = SearchBase(
      'good-books-ds',
      'https://arc-cluster-appbase-demo-6pjy6z.searchbase.io',
      'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
      appbaseConfig: AppbaseSettings(
          recordAnalytics: true,
          // Use unique user id to personalize the recent searches
          userId: 'jon@appbase.io'));

  FlutterSearchBoxApp({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // The SearchBaseProvider should wrap your MaterialApp or WidgetsApp. This will
    // ensure all routes have access to the store.
    return SearchBaseProvider(
      // Pass the searchbase instance to the SearchBaseProvider. Any ancestor `SearchWidgetConnector`
      // Widgets will find and use this value as the `SearchController`.
      searchbase: searchbaseInstance,
      child: MaterialApp(
        title: "SearchBox Demo",
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SearchBox Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
          appBar: AppBar(
            actions: <Widget>[
              IconButton(
                  icon: Icon(Icons.search),
                  onPressed: () {
                    // Invoke the Search Delegate to display search UI with autosuggestions
                    showSearch(
                        context: context,
                        // SearchBox widget from flutter searchbox
                        delegate: SearchBox(
                          // A unique identifier that can be used by other widgetss to reactively update data
                          id: 'search-widget',
                          enableRecentSearches: true,
                          enablePopularSuggestions: true,
                          showAutoFill: true,
                          maxPopularSuggestions: 3,
                          size: 10,
                          dataField: [
                            {'field': 'original_title', 'weight': 1},
                            {'field': 'original_title.search', 'weight': 3}
                          ],
                        ));
                  }),
            ],
            title: Text('SearchBox Demo'),
          ),
          body: Center(
            // A custom UI widget to render a list of results
            child: SearchWidgetConnector(
                id: 'result-widget',
                dataField: 'original_title',
                react: {
                  'and': ['search-widget', 'author-filter'],
                },
                size: 10,
                triggerQueryOnInit: true,
                preserveResults: true,
                builder: (context, searchController) =>
                    ResultsWidget(searchController)),
          ),
          // A custom UI widget to render a list of authors
          drawer: SearchWidgetConnector(
            id: 'author-filter',
            type: QueryType.term,
            dataField: "authors.keyword",
            size: 10,
            // Initialize with default value
            value: List<String>(),
            react: {
              'and': ['search-widget']
            },
            builder: (context, searchController) {
              // Call searchController's query at first time
              if (searchController.query == null) {
                searchController.triggerDefaultQuery();
              }
              return AuthorFilter(searchController);
            },
            // Avoid fetching query for each open/close action instead call it manually
            triggerQueryOnInit: false,
          )),
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
                  '${searchController.results.numberOfResults} results found in ${searchController.results.time.toString()} ms'),
            ),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemBuilder: (context, index) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                var offset =
                    (searchController.from != null ? searchController.from : 0) +
                        searchController.size;
                if (index == offset - 1) {
                  if (searchController.results.numberOfResults > offset) {
                    // Load next set of results
                    searchController.setFrom(offset,
                        options: Options(triggerDefaultQuery: true));
                  }
                }
              });

              return Container(
                  child: (index < searchController.results.data.length)
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
                                        searchController.results.data[index]
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
                                                  'By: ${searchController.results.data[index]["original_title"]}',
                                              child: Text(
                                                searchController
                                                            .results
                                                            .data[index][
                                                                "original_title"]
                                                            .length <
                                                        40
                                                    ? searchController
                                                            .results.data[index]
                                                        ["original_title"]
                                                    : '${searchController.results.data[index]["original_title"].substring(0, 39)}...',
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
                                                  'By: ${searchController.results.data[index]["authors"]}',
                                              child: Text(
                                                searchController
                                                            .results
                                                            .data[index]
                                                                ["authors"]
                                                            .length >
                                                        50
                                                    ? 'By: ${searchController.results.data[index]["authors"].substring(0, 49)}...'
                                                    : 'By: ${searchController.results.data[index]["authors"]}',
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
                                                '(${searchController.results.data[index]["average_rating"]} avg)',
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
                                                'Pub: ${searchController.results.data[index]["original_publication_year"]}',
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
                                    text: searchController.results.data.length > 0
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
            itemCount: searchController.results.data.length + 1,
          ),
        ),
      ],
    );
  }
}

class FilterHeader extends PreferredSize {
  final double height;
  final Widget child;

  FilterHeader({@required this.child, this.height = kToolbarHeight});

  @override
  Size get preferredSize => Size.fromHeight(height);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: preferredSize.height,
      // color: Colors.white,
      alignment: Alignment.centerLeft,
      child: child,
      padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
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
    );
  }
}

class AuthorFilter extends StatelessWidget {
  final SearchController searchController;

  AuthorFilter(this.searchController);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 350,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 105, 0, 0),
        child: Column(
          children: [
            Container(
              child: Align(
                alignment: Alignment.center,
                child: Container(
                  height: 750,
                  color: Colors.white,
                  child: Scaffold(
                    appBar: FilterHeader(
                      height: 50,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          RichText(
                            text: TextSpan(
                                text: 'Selects Authors',
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                )),
                          ),
                        ],
                      ),
                    ),
                    body: searchController.requestPending
                        ? Center(child: CircularProgressIndicator())
                        : ListView(
                            children:
                                searchController.aggregationData.data.map((bucket) {
                              return Container(
                                child: Column(
                                  children: [
                                    new CheckboxListTile(
                                      controlAffinity:
                                          ListTileControlAffinity.leading,
                                      activeColor: Colors.black54,
                                      dense: true,
                                      title: new Text(
                                          "${bucket['_key']} (${bucket['_doc_count']})"),
                                      value: (searchController.value == null
                                              ? []
                                              : searchController.value)
                                          .contains(bucket['_key']),
                                      onChanged: (bool value) {
                                        final List<String> values =
                                            searchController.value == null
                                                ? []
                                                : searchController.value;
                                        if (values.contains(bucket['_key'])) {
                                          values.remove(bucket['_key']);
                                        } else {
                                          values.add(bucket['_key']);
                                        }
                                        searchController.setValue(values);
                                      },
                                    ),
                                    const Divider(
                                      color: Colors.black,
                                      height: 10,
                                      thickness: 0.1,
                                      indent: 25,
                                      endIndent: 20,
                                    )
                                  ],
                                ),
                              );
                            }).toList(),
                          ),
                  ),
                ),
              ),
            ),
            Container(
              child: Align(
                alignment: Alignment.center,
                child: Container(
                  color: Colors.black,
                  height: 70,
                  width: 500,
                  child: Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          flex: 6,
                          child: RaisedButton(
                            padding: EdgeInsets.symmetric(
                                horizontal: 10.0, vertical: 23.0),
                            color: Colors.black,
                            child: Text(
                              'Apply',
                              style: TextStyle(
                                fontSize: 20.0,
                                fontWeight: FontWeight.w300,
                                color: Colors.white,
                              ),
                            ),
                            onPressed: () {
                              searchController.triggerCustomQuery();
                              Navigator.of(context).pop();
                            },
                          ),
                        ),
                        Expanded(
                          flex: 2,
                          child: Align(
                            alignment: Alignment.center,
                            child: RichText(
                              text: TextSpan(
                                text: '|',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 50,
                                    fontWeight: FontWeight.w100),
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          flex: 6,
                          child: RaisedButton(
                            padding: EdgeInsets.symmetric(
                                horizontal: 10.0, vertical: 23.0),
                            color: Colors.black,
                            child: Text(
                              'Close',
                              style: TextStyle(
                                fontSize: 20.0,
                                fontWeight: FontWeight.w300,
                                color: Colors.white,
                              ),
                            ),
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

```


### Custom SearchBox UI

The following example integrates the `flutter_searchbox` with a third party library named [flutter_typeahead](https://pub.dev/packages/flutter_typeahead) to display the suggestions as an overlay.
https://github.com/appbaseio/flutter-searchbox-typeahead-example



### Integrating with a third-party STT service

The following example integrates the `flutter_searchbox` with a third party STT service like Google [speech-to-text](https://cloud.google.com/speech-to-text) to enable voice search. It also uses the [flutter_audio_recorder](https://pub.dev/packages/flutter_audio_recorder) for the audio input and [google_speech](https://pub.dev/packages/google_speech) for interacting with the speech-to-text API.
https://github.com/appbaseio/flutter-searchbox/example_cloudSTT

![Third Party STT Example](https://raw.githubusercontent.com/appbaseio/flutter-assets/master/google-stt.gif)

```dart

// audio_recorder.dart

import 'package:flutter/material.dart';
import 'dart:async';
import 'package:file/local.dart';
import 'package:flutter_audio_recorder/flutter_audio_recorder.dart';
import 'package:path_provider/path_provider.dart';
import 'package:searchbase/searchbase.dart';
import 'audio_converter.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';

typedef void SetOverlay(bool status, String value);

class Recorder extends StatefulWidget {
  final LocalFileSystem localFileSystem;
  final SetOverlay setOverlay;

  Recorder({@required this.setOverlay, localFileSystem})
      : this.localFileSystem = localFileSystem ?? LocalFileSystem();

  @override
  State<StatefulWidget> createState() => new RecorderState();
}

class RecorderState extends State<Recorder> {
  FlutterAudioRecorder _recorder;
  Recording _current;
  RecordingStatus _currentStatus = RecordingStatus.Unset;

  SearchController searchInstance;

  @override
  void initState() {
    _init();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    // to retrieve the instance of SearchController for 'search-widget' component
    searchInstance =
        SearchBaseProvider.of(context).getSearchWidget('search-widget');
    return new IconButton(
      icon: Icon(Icons.mic),

      // to call specific functions according to the current recording status
      onPressed: () async {
        switch (_currentStatus) {
          case RecordingStatus.Initialized:
            {
              _start();
              break;
            }
          case RecordingStatus.Stopped:
            {
              await _init();
              _start();
              break;
            }
          case RecordingStatus.Recording:
            {
              _stop();
              break;
            }
          case RecordingStatus.Paused:
            {
              _stop();
              break;
            }
          default:
            {
              _init();
              break;
            }
        }
      },
    );
  }

  // called when the widget is created
  _init() async {
    try {
      if (await FlutterAudioRecorder.hasPermissions) {
        String customPath = '/flutter_audio_recorder_';
        var appDocDirectory;

        // to check the platform for setting up the directory path
        bool isAndroid = Theme.of(context).platform == TargetPlatform.android;
        if (!isAndroid) {
          appDocDirectory = await getApplicationDocumentsDirectory();
        } else {
          appDocDirectory = await getExternalStorageDirectory();
        }
        // setting up unique path
        customPath = appDocDirectory.path +
            customPath +
            DateTime.now().millisecondsSinceEpoch.toString();

        // creating an instance of the FlutterAudioRecorder and  setting up the channel
        _recorder =
            FlutterAudioRecorder(customPath, audioFormat: AudioFormat.WAV);

        await _recorder.initialized;
        var current = await _recorder.current(channel: 0);
        setState(() {
          _current = current;
          _currentStatus = current.status;
        });
      } else {
        // message to display in case permissions not found
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text("You must accept permissions")));
      }
    } catch (e) {
      print(e);
    }
  }

  // called to start the recording
  _start() async {
    try {
      widget.setOverlay(false, '');
      widget.setOverlay(true, 'Listening...');
      await _recorder.start();
      var recording = await _recorder.current(channel: 0);
      setState(() {
        _current = recording;
      });

      // defining the time interval
      const tick = const Duration(milliseconds: 50);
      var count = 0;
      var pauseDuration = 0;
      bool speaking = false;
      bool trigger = false;

      // setting the max time of recording to 5 secs
      new Timer.periodic(tick, (Timer t) async {
        count += 1;

        if (count >= 100) {
          _stop();
          t.cancel();
        }

        var current = await _recorder.current(channel: 0);

        // to check the user is speaking or not
        if (current.metering.isMeteringEnabled) {
          if (current.metering.peakPower > -7) {
            speaking = true;
            pauseDuration = 0;
            trigger = false;
          } else {
            if (speaking) {
              trigger = true;
            }
            if (pauseDuration > 8 && trigger) {
              _stop();
              t.cancel();
              trigger = false;
            }
            speaking = false;
            pauseDuration += 1;
          }
        }

        if (mounted) {
          setState(() {
            _current = current;
            _currentStatus = _current.status;
          });
        }
      });
    } catch (e) {
      print(e);
    }
  }

  // called to stop the recording
  _stop() async {
    var result = await _recorder.stop();
    if (mounted) {
      widget.setOverlay(false, '');
      widget.setOverlay(true, 'Processing...');
      await setState(() {
        _current = result;
        _currentStatus = _current.status;
      });

      // creating an instance of AudioConverter and transforming the audio file to text and getting the result back
      var audioConverter = new AudioConverter(path: result.path);
      var response = await audioConverter.convertSTT();
      var responseString = response.results
          .map((e) => e.alternatives.first.transcript)
          .join('\n');
      widget.setOverlay(false, '');

      // displaying the transformed text
      widget.setOverlay(
          true,
          responseString.length > 0
              ? responseString
              : "Didn't hear anything, try again!");
      await Future.delayed(Duration(seconds: 2));

      // setting the value of the search instance and triggering the custom query
      if (responseString.length > 0) {
        searchInstance.setValue(response.results
            .map((e) => e.alternatives.first.transcript)
            .join('\n'));
        searchInstance.triggerCustomQuery();
        Navigator.pop(context);
      }

      widget.setOverlay(false, '');
      audioConverter.deleteFile();
    }
  }
}


```


```dart

// audio_converter.dart

import 'dart:io';
import 'package:google_speech/google_speech.dart';
import 'package:google_speech/speech_client_authenticator.dart';

class AudioConverter {
  final String path;
  AudioConverter({this.path}) : assert(path != null);

  // enter your private key from Google STT API
  final serviceAccount = ServiceAccount.fromString(r'''{in here}''');

  // set config according to usecase
  final config = RecognitionConfig(
      encoding: AudioEncoding.LINEAR16,
      model: RecognitionModel.basic,
      enableAutomaticPunctuation: true,
      sampleRateHertz: 16000,
      languageCode: 'en-IN');

  // reading the audio content from the path
  Future<List<int>> _getAudioContent(String path) async {
    return File(path).readAsBytesSync().toList();
  }

  // connecting to Google Speech API to transform the audio file to text and getting the response  back
  convertSTT() async {
    final speechToText = SpeechToText.viaServiceAccount(serviceAccount);
    final audio = await _getAudioContent(path);
    final response = await speechToText.recognize(config, audio);
    return response;
  }

  // deleting the audio file once the response is received
  deleteFile() async {
    try {
      await File(path).delete();
    } catch (e) {
      return 0;
    }
  }
}

```

```dart

// mic_overlay.dart

import 'package:flutter/material.dart';

class MicOverlay extends StatefulWidget {
  final String value;
  const MicOverlay({Key key, this.value = ''})
      : assert(value != null),
        super(key: key);

  @override
  _MicOverlayState createState() => _MicOverlayState();
}

class _MicOverlayState extends State<MicOverlay>
    with SingleTickerProviderStateMixin {
  var _width, _height;

  AnimationController _animationController;
  Animation _animation;

  // initialising the _animationController and setting up the animation for the recording icon 
  @override
  void initState() {
    _animationController =
        AnimationController(vsync: this, duration: Duration(seconds: 2));
    _animationController.repeat(reverse: true);
    _animation = Tween(begin: 2.0, end: 15.0).animate(_animationController)
      ..addListener(() {
        setState(() {});
      });
    super.initState();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // chceking the size of the current media to set the ovelay size accordingly
    _width = MediaQuery.of(context).size.width;
    _height = MediaQuery.of(context).size.height;
    return Container(
      alignment: Alignment.topCenter,
      padding: new EdgeInsets.only(top: _height * .35, right: 20.0, left: 20.0),
      child: Container(
        height: _width * .65,
        width: _width * .65,
        child: Card(
          shape: RoundedRectangleBorder(
            side: BorderSide(color: Colors.white70, width: 1),
            borderRadius: BorderRadius.circular(10),
          ),
          color: Colors.white,
          elevation: 4.0,
          child: Column(
            children: [
              // to display the icon
              Expanded(
                flex: 4,
                child: Container(
                  height: 75,
                  width: 75,
                  child: Icon(
                    Icons.mic,
                    color: Colors.white,
                  ),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.blue,
                    boxShadow: [
                      BoxShadow(
                          color: Colors.lightBlue,
                          blurRadius: _animation.value,
                          spreadRadius: _animation.value),
                    ],
                  ),
                ),
              ),
              // to display the text
              Expanded(
                flex: 3,
                child: Container(
                  height: 50,
                  width: _width * .5,
                  child: Center(
                    child: RichText(
                      text: TextSpan(
                        text: widget.value,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                        ),
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


```

```dart

// main.dart

  // for setting the visibilty of the overlay

  OverlayState overlayState;
  OverlayEntry overlayEntry;

  setOverlay(bool status, String value, BuildContext context) async {
    if (status) {
      overlayState = Overlay.of(context);
      overlayEntry =
          OverlayEntry(builder: (context) => MicOverlay(value: value));
      overlayState.insert(overlayEntry);
    } else {
      if (overlayEntry != null) {
        overlayEntry.remove();
        overlayEntry = null;
      }
    }
  }

  // for rendering the Recorder pass it in the customActions of the SearchBox widget

    customActions: [
        Recorder(
          setOverlay: (bool status, String value) {
            setOverlay(status, value, context);
          },
        ),
      ]),

  


```

## API Reference
You can check out the docs for API Reference over [here](https://pub.dev/documentation/flutter_searchbox/latest/).
