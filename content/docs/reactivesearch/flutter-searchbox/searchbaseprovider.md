---
title: 'SearchBaseProvider API Reference'
meta_title: 'API Reference for SearchBaseProvider'
meta_description: 'SearchBaseProvider is a provider component that provides the search context to the child widgets.'
keywords:
    - api-reference
    - searchbaseprovider
    - elasticsearch
    - search-ui
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox'
---

## How does it work?

`SearchBaseProvider` is a provider widget that provides the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context to all descendants of this Widget. It binds the backend app (data source) with the UI view widgets (elements wrapped within SearchBaseProvider), allowing a UI widget to be reactively updated every time there is a change in the data source or in other UI widgets.

## Usage

### Basic Usage

`SearchBaseProvider` accepts two parameters, a [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html)  instance and a child widget around which the SearchBase context is wrapped.

The [SearchBase Constructor](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase/SearchBase.html) takes properties to configure the Appbase environments and customize the query execution.

```dart

final searchbaseInstance = 
            SearchBase(
                'good-books-ds',
                'https://arc-cluster-appbase-demo-6pjy6z.searchbase.io',
                'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
            );

```

### Usage with All Props

```dart

final searchbaseInstance = 
            SearchBase(
                'good-books-ds',
                'https://arc-cluster-appbase-demo-6pjy6z.searchbase.io',
                'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
                appbaseConfig: AppbaseSettings(
                    recordAnalytics: true,
                    // Use unique user id to personalize the recent searches
                    userId: 'jon@appbase.io',
                ),
                transformRequest: Future (Map request) => Future.value({ ...request, 'credentials': 'include'}),
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
            );

```

### Advanced Usage

While the `flutter-searchbox` library should give you good controls out of the box to build the powerful search UIs, there can be times when you need access to the state (context) of the widgets.

**Example Use Cases**

One would need to use the state (context) of the search widgets, e.g. to show a list of all active user query inputs including the ability to unselect an input to affect the particular search widget's input as well.


```dart
import 'package:flutter/material.dart';
import 'package:searchbase/searchbase.dart';
import 'package:flutter_searchbox/flutter_searchbox.dart';

class AdvancedWidget extends StatefulWidget {
    AdvancedWidget({
        // ... 
    }): super(key: key){
        // ...
    }

    @override
    _AdvancedWidgetState createState() => _AdvancedWidgetState();
}

class _AdvancedWidgetState extends State<AdvancedWidget> {
    @override
    initState() {
        super.initState();
    }
    
    // get the list of active widgets wrapped by the searchbase instance
    Map<String, SearchController> get activeWidgets {
        return SearchBaseProvider.of(context).getActiveWidgets();
    }

    // get the widgets' value
    void getWidgetValue(String widgetId){
        return SearchBaseProvider.of(context).getSearchWidget(widgetId)?.value;
    }
    

    // reset the widgets' values
    void resetWidgetValues(){
        final activeWidgets = this.activeWidgets;
        for (var id in activeWidgets.keys) {
            var componentInstance = activeWidgets[id];
            componentInstance?.setValue(null);
        }
    }

    // trigger query for a widget
    void triggerWidgetQuery(String widgetId){
        SearchBaseProvider.of(context).getSearchWidget(widgetId)?.triggerCustomQuery();
    }
}

```

**Properties**

- **getActiveWidgets** `Function: () → Map<String, SearchController>` returns a map, which is a list of all [SearchController](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchController-class.html) instances contained within the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context as key value pairs with widget ids as the `key` names.

- **getSearchWidget** `Function: (String widgetId) → SearchController` returns the [SearchController](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchController-class.html) instance object contained within the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context for the provided component `id`.


