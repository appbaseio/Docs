---
title: 'StateProvider'
meta_title: 'API Reference for StateProvider'
meta_description: 'StateProvider allows you to access the current state of flutter-searchbox widgets.'
keywords:
    - flutter-searchbox
    - api-reference
    - state-provider
    - elasticsearch
    - search-ui
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox'
---


# How does it work?

[StateProvider](https://pub.dev/documentation/flutter_searchbox/latest/flutter_searchbox/StateProvider-class.html) allows you to access the current state of your app widgets along with the search results. For instance, you can use this component to create results/no results or query/no query pages.

Example Use(s):
 - perform side-effects based on the results states of various widgets.
 - render custom UI based on the current state of app.

## Usage

### Basic Usage

```dart
StateProvider(
  ...
  onChange: (prevState, nextState) {
        // do something here
    },
  ...
)
```

### Usage with All Props

```dart
StateProvider(
  subscribeTo: {
   'result-component': [KeysToSubscribe.Results, KeysToSubscribe.From]
  },       
  onChange: (prevState, nextState) {
        // do something here
    },
  build: (controllerState) {
    return Text(
      'Total results on screen--- ${controllerState["result-widget"]?.results?.data?.length ?? ''}',
      style: TextStyle(
        fontSize: 19.0,
        color: Colors.red,
      ),
    );
  },    
)
```

## API Reference

Check the complete API reference [here](https://pub.dev/documentation/flutter_searchbox/latest/flutter_searchbox/StateProvider-class.html).

## Example

<div style="display: flex; justify-content: center; margin-top: 50px;">
  <img alt="Basic Example" src="https://i.imgur.com/QdZrMse.gif" width="250" />   
</div>

In this example, a basic search application is made that has a result widget is listened for state changes using the `StateProvider` widget and a custom ui is rendered to show the total number of results on screen.

```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';
import 'results.dart';
import 'author_filter.dart';

void main() {
  runApp(FlutterSearchBoxApp());
}

class FlutterSearchBoxApp extends StatelessWidget {
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

  FlutterSearchBoxApp({Key? key}) : super(key: key);

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
          bottomNavigationBar: Padding(
            padding: EdgeInsets.all(20.0),
            child: StateProvider(
              subscribeTo: {
                "result-widget": [KeysToSubscribe.Results , KeysToSubscribe.Value, KeysToSubscribe.From],                
              },
              onChange: (prevState, nextState) {
                print('prevState ${prevState["result-widget"]?.results?.data?.length}');
                print('nextState ${nextState["result-widget"]?.results?.data?.length}');                
              },
              build: (controllerState) {
                return Text(
                  'Total results on screen--- ${controllerState["result-widget"]?.results?.data?.length ?? ''} ',
                  style: TextStyle(
                    fontSize: 19.0,
                    color: Colors.red,
                  ),
                );
              },
            ),
          ),
          body: Center(
            // A custom UI widget to render a list of results
            child: SearchWidgetConnector(
                id: 'result-widget',
                dataField: 'original_title',               
                size: 10,
                triggerQueryOnInit: true,
                preserveResults: true,
                builder: (context, searchController) =>
                    ResultsWidget(searchController)),
            ),         
          ),
    );
  }
}



// The result widget to show results

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
                  '${searchController.results.numberOfResults} results found in ${searchController.results.time.toString()} ms'),
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
                                              child: IconTheme(
                                                data: IconThemeData(
                                                  color: Colors.amber,
                                                  size: 48,
                                                ),
                                                child: StarDisplay(
                                                    value: searchController
                                                            .results
                                                            .data[index][
                                                        "average_rating_rounded"]),
                                              ),
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
                                    text:
                                        searchController.results.data.length > 0
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


