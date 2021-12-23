---
title: 'Flutter SearchWidgetConnector API Reference'
meta_title: 'API Reference for Flutter SearchWidgetConnector'
meta_description: 'Flutter SearchWidgetConnector offers a performance focused SearchWidgetConnector UI widget to query and display results from your Elasticsearch cluster.'
keywords:
    - flutter-searchbox
    - api-reference
    - elasticsearch
    - search-ui
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox'
---

## How does it work?

[SearchWidgetConnector](https://pub.dev/documentation/flutter_searchbox/latest/flutter_searchbox/SearchWidgetConnector-class.html) represents a search widget that can be used to bind to different kinds of search UI widgets.

It uses the [SearchController](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchController-class.html) class to bind any UI widget to be able to query appbase.io declaratively. Some examples of components you can bind this with:

a category filter widget,
a search bar widget,
a price range widget,
a location filter widget,
a widget to render the search results.

## Usage

### Basic Usage

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
          // ...
        ),
        home: Scaffold(
          body: Center(
            // A custom UI widget to render a list of results
            child: SearchWidgetConnector(
              id: 'result-widget',
              dataField: 'original_title',
              size: 10,
              triggerQueryOnInit: true,
              preserveResults: true,
              builder: (context, searchController) => ResultsWidget(searchController)),
          ),
        ),
      ),
    );
  }
}

```

### Usage with All Props

``` dart
    SearchWidgetConnector(         
        id: 'result-widget',
        dataField: 'original_title',
        size: 10,
        triggerQueryOnInit: true,
        preserveResults: true,
        builder: (context, searchController) => ResultsWidget(searchController)),
        subscribeTo: ["results"],
        shouldListenForChanges: true,
        destroyOnDispose: true,
        index: 'good-books-ds',
        url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
        credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61', 
        headers: {
            "x-custom-header": "12345"
        },
        appbaseConfig: AppbaseSettings(recordAnalytics: true,  userId: 'jon@appbase.io',
        type: QueryType.term,
        react:{
            'and': ['test-widget'],
        },
        queryFormat: "or"
        dataField: [
            {'field': 'original_title', 'weight': 1},
            {'field': 'original_title.search', 'weight': 3}
        ],
        categoryField: "authors.keyword",
        categoryValue: "John Doe",
        nestedField: "settings", 
        from: 0,
        size: 10,
        sortBy: SortType.asc,
        aggregationField: "authors.keyword",
        aggregationSize: 10,
        after: {
            "authors.keyword": "Jerry Lovato"
        },
        includeNullValues: false,
        includeFields: ["original_publication_year", "title", "authors"],   
        excludeFields: [""],
        fuzziness: 1,
        searchOperators: true,
        highlight: true,
        highlightField: "title",
        customHighlight: {
                "fields": {
                    "title": {}
                },
                "pre_tags": [
                    "<pre>"
                ],
                "post_tags": [
                    "</pre>"
                ],
                "require_field_match": false
        },
        interval: 1,
        aggregations: ["max"],
        showMissing: true,
        missingLabel: "N/A",
        defaultQuery: (SearchController searchController) =>(
            {
                "query":{
                    "match":{
                        "original_title":"harry potter"
                    }
                },
                "timeout":"1s"
            }
        ),
        customQuery: (SearchController searchController) =>(
            {
                "query":{
                    "term":{
                        "authors.keyword":"J.K. Rowling"
                    }
                }
            }  
        ),        
        enableSynonyms: true,
        selectAllLabel: "Paradise Lost", // works for term type of queries
        pagination: true,
        queryString: true,        
        enablePopularSuggestions: true,
        maxPopularSuggestions: 3,
        showDistinctSuggestions: true,
        preserveResults: true,
        clearOnQueryChange: true,
        transformRequest: Future (Map request) =>
            Future.value({
                ...request,
                'credentials': 'include',
            })
        }       
        transformResponse: Future (Map elasticsearchResponse) async {
            final ids = elasticsearchResponse['hits']['hits'].map(item => item._id);
            final extraInformation = await getExtraInformation(ids);
            final hits = elasticsearchResponse['hits']['hits'].map(item => {
                final extraInformationItem = extraInformation.find(
                    otherItem => otherItem._id === item._id,
                );
                return Future.value({
                    ...item,
                    ...extraInformationItem,
                };
            }));
        
            return Future.value({
                ...elasticsearchResponse,
                'hits': {
                    ...elasticsearchResponse.hits,
                    hits,
                },
            });
        }            
        results: [
                    {
                        "_index": "good-books-ds",
                        "_type": "_doc",
                        "_id": "rT7tXXEBhDwVijd9RE6K",
                        "_score": 7.2774067,
                        "_source": {
                            "original_publication_year": 2016,
                            "title": "Hogwarts: An Incomplete and Unreliable Guide (Pottermore Presents, #3)",
                            "authors": "J.K. Rowling"
                        }
                    },                
                    {
                        "_index": "good-books-ds",
                        "_type": "_doc",
                        "_id": "Sj7tXXEBhDwVijd9m1hJ",
                        "_score": 7.2774067,
                        "_source": {
                            "original_publication_year": 1998,
                            "title": "Harry Potter Boxset (Harry Potter, #1-7)",                        
                            "authors": "J.K. Rowling"
                        }
                    },
        ],
        distinctField: 'authors.keyword',
        distinctFieldConfig: {
            'inner_hits': {
                'name': 'other_books',
                'size': 5,
                'sort': [
                {'timestamp': 'asc'}
                ],
            },
            'max_concurrent_group_searches': 4, 
        },
        beforeValueChange: Future (value) {
            // called before the value is set
            // returns a [Future]
            // update state or component props
            return Future.value(value);
            // or Future.error()
        },
        onValueChange: (next, {prev}){
            // perform side-effects as value changes
        },
        onResults: (nextMap, {prevMap}){
            // perform side-effects as results change
        },
        onAggregationData: (nextMap, {prevMap}){
            // perform side-effects as aggregation data changes
        },   
        onError: (error){
            // handle error
        },        
        onRequestStatusChange: (next, {prev}){
            // listen to request status changes
        },                  
        onQueryChange: (nextQuery, {prevQuery}){
            // listen to request query changes
        },                
    )
```


## API Reference

Check the complete API reference [here](https://pub.dev/documentation/flutter_searchbox/latest/flutter_searchbox/SearchWidgetConnector-class.html).

## Example

In this example, a basic search application is made that has a result widget made using [SearchWidgetConnector](/docs/reactivesearch/flutter-searchbox/searchwidgetconnector/) for populating results.


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
      'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
      'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
      appbaseConfig: AppbaseSettings(
          recordAnalytics: true,
          // Use unique user id to personalize the recent searches
          userId: 'jon@appbase.io'));

  FlutterSearchBoxApp({Key key = const Key("demo")}) : super(key: key);

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
