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

`SearchBaseProvider` accepts two parameters, a (SearchBase)[https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html] instance and a child widget around which the SearchBase context is wrapped.

The [SearchBase Constructor](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase/SearchBase.html) takes properties to configure the Appbase environments and customize the query execution.

```dart

SearchBase(
    String index,
    String url,
    String credentials,
    {
        AppbaseSettings appbaseConfig,
        TransformRequest transformRequest,
        TransformResponse transformResponse,
        Map<String, String> headers
    }
)

```

**To configure the Appbase environments**

-   **index** `string` [Required]
    Refers to an index of the Elasticsearch cluster.

    `Note:` Multiple indexes can be connected to by specifying comma-separated index names.

-   **url** `string` [Required]
    URL for the Elasticsearch cluster

-   **credentials** `string` [Required]
    Basic Auth credentials if required for authentication purposes. It should be a string of the format `username:password`. If you are using an appbase.io cluster, you will find credentials under the `Security > API credentials` section of the appbase.io dashboard. If you are not using an appbase.io cluster, credentials may not be necessary - although having open access to your Elasticsearch cluster is not recommended.

-   **appbaseConfig** `Object`
    allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:

    -   **recordAnalytics** `boolean` allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
    -   **enableQueryRules** `boolean` If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
    -   **userId** `string` It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
    -   **customEvents** `Object` It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.
    -   **enableTelemetry** `Boolean` When set to `false`, disable the telemetry. Defaults to `true`.

**To customize the query execution**

-   **headers** `Object` [optional] set custom headers to be sent with each server request as key/value pairs.

-   **[transformRequest](https://pub.dev/documentation/searchbase/1.0.1/searchbase/TransformRequest.html)** `Function` Enables transformation of network request before
    execution. This function will give you the request object as the param and expect an updated request in return, for execution.

    This function will give you the request object as the param and expect an updated request in return, for execution.
    For example, we add the `credentials` property in the request using `transformRequest`.

    ```dart
    SearchBase(
        // ...
        {
            transformRequest: Future (Map request) =>
                Future.value({
                    ...request,
                    'credentials': 'include',
                })
            }
        }
    )
    ```

-   **[transformResponse](https://pub.dev/documentation/searchbase/1.0.1/searchbase/TransformResponse.html)** `Function` Enables transformation of search network response before  
    rendering them. It is an asynchronous function which will accept an Elasticsearch response object as param and is expected to return an updated response as the return value.

    For example:
    
    ```dart
    SearchBase(
        // ...
        {
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
        }
    )
    ```






<!-- // basic example here -->

### Advanced Usage

While the `flutter-searchbox` library should give you good controls out of the box to build the powerful search UIs, there can be times when you need access to the state (context) of the widgets.

**Example Use Cases**

One would need to use the state (context) of the search widgets, e.g. to show a list of all active user query inputs including the ability to unselect an input to affect the particular search component's input as well.

Another use can be to create a saved query feature where it's important persist the state of all the search and filter widgets.


**Basic Usage**

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

    Map<String, SearchController> get activeWidgets {
        return SearchBaseProvider.of(context).getActiveWidgets();
    }
}

```

**Properties**

- **getActiveWidgets** `Function: () → Map<String, SearchController>` returns a map, which is a list of all [SearchController](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchController-class.html) instances contained within the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context as key value pairs with widget ids as the `key` names.

- **getSearchWidget** `Function: (String widgetId) → SearchController` returns the [SearchController](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchController-class.html) instance object contained within the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context for the provided component `id`.


**Example** 
The below example renders the active filters using a separate `SelectedFilters()` widget, which uses the [SearchBase](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchBase-class.html) context to access various [SearchController](https://pub.dev/documentation/searchbase/1.0.1/searchbase/SearchController-class.html) instances.


TODO : attach selectedfilters example here