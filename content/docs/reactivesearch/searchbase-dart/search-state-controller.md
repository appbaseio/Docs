---
title: 'SearchStateController Class'
meta_title: 'API Reference for SearchStateController'
meta_description: 'SearchStateController class can be used to keep track and watch for the changes in the state of the widgets.'
keywords:
    - searchbase
    - search state controller
    - dart
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'searchbase-dart'
---

[SearchStateController](https://github.com/appbaseio/flutter-searchbox/tree/master/searchbase/lib/src/searchStateController.dart) allows you to access the current state of your widgets in the app, and watch for the state changes for the subscribed widgets.

For instance, you can use this class to access the previous and the next(latest) state of your app widget tree.

Examples Use(s):
   - perform side-effects based on the results states of various widgets.

## Usage

```dart
SearchStateController(
  subscribeTo: {
   'author-filter': [KeysToSubscribe.Value]
  },
  onChange: (next, prev) {
   print("Next state");
   print(next['author-filter']?.value);
   print("Prev state");
   print(prev['author-filter']?.value);
  },
  searchBase: searchBaseInstance,
)
```


## Example

We extend the [with-facet](https://docs.appbase.io/docs/reactivesearch/searchbase-dart/quickstart/#an-example-with-a-facet) example of [searchbase-dart](https://docs.appbase.io/docs/reactivesearch/searchbase-dart/quickstart/) to make use of SearchStateController class.

```dart
import 'dart:html';
import 'package:searchbase/searchbase.dart';

bool areListsEqual(var list1, var list2) {
  // check if both are lists
  if (!(list1 is List && list2 is List)
      // check if both have same length
      ||
      list1.length != list2.length) {
    return false;
  }

  // check if elements are equal
  for (int i = 0; i < list1.length; i++) {
    if (list1[i] != list2[i]) {
      return false;
    }
  }

  return true;
}

class DefaultUriPolicy implements UriPolicy {
  DefaultUriPolicy();
  @override
  bool allowsUri(String uri) {
    return true;
  }
}

void main() {
  final index = 'gitxplore-app';
  final url = 'https://@appbase-demo-ansible-abxiydt-arc.searchbase.io';
  final credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

  final searchbase = SearchBase(index, url, credentials,
      appbaseConfig: AppbaseSettings(recordAnalytics: true));

  // Register search widget => To render the suggestions
  final searchController = searchbase.register('search-widget', {
    'enablePopularSuggestions': true,
    'dataField': [
      'name',
      'description',
      'name.raw',
      'fullname',
      'owner',
      'topics'
    ]
  });
  // Register filter widget with dependency on search widget
  final filterWidget = searchbase.register('language-filter', {
    'type': QueryType.term,
    'dataField': 'language.keyword',
    'react': {'and': 'search-widget'},
    'value': ""
  });
// Register result widget with react dependency on search and filter widget => To render the results
  final resultWidget = searchbase.register('result-widget', {
    'dataField': 'name',
    'react': {
      'and': ['search-widget', 'language-filter']
    },
    'defaultQuery': (SearchController controller) =>
        ({'track_total_hits': true})
  });

// Render results
  querySelector('#output')!.innerHtml = '''
    <div id="root">
      <h2 class="text-center">Searchbase Demo with Facet</h2>
      <div id="autocomplete" class="autocomplete">
        <input class="autocomplete-input" id="input" />
        <ul class="autocomplete-result-list"></ul>
      </div>
      <div class="row">
        <div class="col">
          <div class="filter" id="language-filter"></div>
        </div>
        <div class="col">
          <div id="results">
            <div class="loading">Loading results... </div>
          </div>
        </div>
      </div>
    </div>
  ''';
  final input = querySelector('#input');
  void handleInput(e) {
    // Set the value to fetch the suggestions
    searchController.setValue(e.target.value,
        options: Options(triggerDefaultQuery: true));
  }

  input!.addEventListener('input', handleInput);

  void handleKeyPress(e) {
    // Fetch the results
    if (e.key == 'Enter') {
      e.preventDefault();
      searchController.triggerCustomQuery();
    }
  }

  input.addEventListener('keydown', handleKeyPress);

  final resultElement = querySelector('#results');
  // Fetch initial results
  resultWidget.triggerDefaultQuery();

  // Fetch initial filter options
  filterWidget.triggerDefaultQuery();
  List<Map<dynamic, dynamic>>? prevAggData = [];

  final searchStateController = SearchStateController(
    searchBase: searchbase,
    subscribeTo: {
      'result-widget': [KeysToSubscribe.Results],
      'language-filter': [KeysToSubscribe.AggregationData],
      'search-widget': [KeysToSubscribe.Results],
    },
    onChange: (next, prev) {
      // handle side-effects for state changes in result-widget
      if (next['result-widget'] != null) {
        print('result-widget subscribed');
        final results = next['result-widget']!.results;
        final items = results!.data.map((i) {
          return """
            <div id=${i['_id']} class="result-set">
              <div class="image">
                <img src=${i['avatar']} alt=${i['name']} />
              </div>
              <div class="details">
                <h4>${i['name']}</h4>
                <p>${i['description']}</p>
              </div>
            </div>""";
        });
        final resultStats = '''<p class="results-stats">
                          Showing ${results.numberOfResults} in ${results.time}ms
                        <p>''';
        resultElement!.setInnerHtml("$resultStats${items.join('')}",
            validator: NodeValidatorBuilder.common()
              ..allowHtml5()
              ..allowElement('img',
                  attributes: ['src'], uriPolicy: DefaultUriPolicy()));
      }

      // handle side-effects for state changes in language-filter
      if (next['language-filter'] != null &&
          areListsEqual(next['language-filter']!.aggregationData?.data,
                  prevAggData) ==
              false) {
        prevAggData = next['language-filter']!.aggregationData?.data;
        print('language-widget subscribed');
        final aggregations = next['language-filter']!.aggregationData;
        print(' aggregations?.data ${aggregations?.data}');
        final container = document.getElementById('language-filter');
        container!.setInnerHtml('');
        aggregations?.data?.forEach((i) {
          if (i['_key'] != null) {
            final checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', i['_key']);
            checkbox.setAttribute('value', i['_key']);
            checkbox.id = i['_key'];
            checkbox.addEventListener('click', (event) {
              List values = [];
              if (filterWidget.value != null && filterWidget.value != "") {
                values = filterWidget.value;
              }
              if (values.contains(i['_key'])) {
                values.remove(i['_key']);
              } else {
                values.add(i['_key']);
              }
              // Set filter value and trigger custom query
              filterWidget.setValue(values,
                  options:
                      Options(stateChanges: true, triggerCustomQuery: true));
            });
            final label = document.createElement('label');
            label.setAttribute('htmlFor', 'i._key');
            label.setInnerHtml("${i['_key']}(${i['_doc_count']})");
            final div = document.createElement('div');
            div.append(checkbox);
            div.append(label);
            container.append(div);
          }
        });
      }
      // handle side-effects for state changes in search-widget
      if (next['search-widget'] != null) {
        print('search-widget subscribed');
        print('PREV ${prev['search-widget']?.results?.numberOfResults}');
        print('NEXT ${next['search-widget']?.results?.numberOfResults}');
      }
    },
  );
}

```

## API Reference
You can find the detailed API reference at [here](https://pub.dev/documentation/searchbase/latest/).
