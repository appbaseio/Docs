---
title: 'SearchBox API Reference'
meta_title: 'Documentation for Vue SearchBox'
meta_description: 'SearchBox offers a lightweight and performance focused searchbox UI component to query and display results from your Elasticsearch cluster.'
keywords:
    - vue-searchbox
    - search-ui
    - api-reference
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-searchbox-reactivesearch'
---

## How does it work?

SearchBox offers a lightweight and performance focused searchbox UI component to query and display results from your Elasticsearch cluster.

## Props

### Configure appbase.io environment

The below props are only needed if you're not using the `SearchBox` component under [SearchBase](docs/reactivesearch/searchbase/overview/searchbase/) provider. These props can also be used to override the global environment defined in the [SearchBase](docs/reactivesearch/searchbase/overview/searchbase/) component.

-   **index** `String` [required]
    Refers to an index of the Elasticsearch cluster.

    `Note:` Multiple indexes can be connected to by specifying comma-separated index names.

-   **url** `String` [required]
    URL for the Elasticsearch cluster

-   **credentials** `String` [required]
    Basic Auth credentials if required for authentication purposes. It should be a String of the format `username:password`. If you are using an appbase.io cluster, you will find credentials under the `Security > API credentials` section of the appbase.io dashboard.

-   **appbaseConfig** `Object`
    allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:

    -   **recordAnalytics** `Boolean` allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
    -   **enableQueryRules** `Boolean` If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
    -   **enableSearchRelevancy** `Boolean` defaults to `true`. It allows you to configure whether to apply the search relevancy or not.   
    -   **userId** `string` It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
    -   **useCache** `Boolean` This property when set allows you to cache the current search query. The `useCache` property takes precedence irrespective of whether caching is enabled or disabled via the dashboard. 
    -   **customEvents** `Object` It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.
    -   **enableTelemetry** `Boolean` When set to `false`, disable the telemetry. Defaults to `true`.

### To configure the ReactiveSearch API

The following properties can be used to configure the appbase.io [ReactiveSearch API](/docs/search/reactivesearch-api/):

-   **id** `String` [required]
    unique identifier of the component, can be referenced in other components' `react` prop.

-   **index** `String` [Optional]
    The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the `index` is set to the index prop defined in the SearchBase component. You can check out the full example [here](/docs/reactivesearch/vue-searchbox/examples/).

	```html
	<search-box
		...
		index="good-books-clone"
	/>
	```

-   **dataField** `String | Array<String | DataField>`
    index field(s) to be connected to the component’s UI view. SearchBox accepts an `Array` in addition to `String`, which is useful for searching across multiple fields with or without field weights.<br/>
    Field weights allow weighted search for the index fields. A higher Number implies a higher relevance weight for the corresponding field in the search results.<br/>
    You can define the `dataField` property as an array of objects of the `DataField` type to set the field weights.<br/>
    The `DataField` type has the following shape:

    ```ts
    type DataField = {
    	field: String;
    	weight: Number;
    };
    ```

-   **queryFormat** `String`
    Sets the query format, can be **or** or **and**. Defaults to **or**.

    -   **or** returns all the results matching **any** of the search query text's parameters. For example, searching for "bat man" with **or** will return all the results matching either "bat" or "man".
    -   On the other hand with **and**, only results matching both "bat" and "man" will be returned. It returns the results matching **all** of the search query text's parameters.

-   **react** `Object`
    `react` prop is useful for components whose data view should reactively update when on or more dependent components change their states, e.g. a component to display the results can depend on the search component to filter the results.
    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `id`.
        -   `Array` is used for specifying multiple components by their `id`.
        -   `Object` is used for nesting other key clauses.

An example of a `react` clause where all three clauses are used and values are `Object`, `Array` and `String`.

```html
<search-box
	id="search-component"
	:dataField="['original_title', 'original_title.search']"
	:react="{
		and: {
			or: ['CityComp', 'TopicComp'],
			not: 'BlacklistComp',
		},
	}"
/>
```

Here, we are specifying that the suggestions should update whenever one of the blacklist items is not present and simultaneously any one of the city or topics matches.

-   **size** `Number`
    Number of suggestions and results to fetch per request.

-   **from** `Number`
    To define from which page to start the results, it is important to implement pagination.

-   **includeFields** `Array<String>`
    fields to be included in search results.

-   **excludeFields** `Array<String>`
    fields to be excluded in search results.

-   **sortBy** `String`
    sort the results by either `asc` or `desc` order.

-   **aggregationField** `String` [optional]
    One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events, and logs type data).
    It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
    You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html).
    You can use `aggregationData` using `onAggregationData` callback or `subscriber`.
	> Note: This prop has been marked as deprecated starting v1.2.0. Please use the `distinctField` prop instead.

```html
<template>
	<search-box
		id="result-component"
		:dataField="['original_title', 'original_title.search']"
		aggregationField="original_title.keyword"
		@aggregationData="handleAggregationData"
	/>
</template>
<script>
	export default App {
	    name: 'App',
	    methods: {
	        handleAggregationData(prev, next) {
	            console.log("aggregations", prev, next)
	        }
	    }
	}
</script>
```
-   **aggregationSize**
    To set the Number of buckets to be returned by aggregations.

    > Note: This is a new feature and only available for appbase versions >= 7.41.0.
-   **highlight** `Boolean` [optional]
    whether highlighting should be enabled in the returned results.

-   **highlightField** `String or Array` [optional]
    when highlighting is enabled, this prop allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to applying highlights on the field(s) specified in the **dataField** prop.

-   **customHighlight** `Object` [optional]
    It can be used to set the custom highlight settings. You can read the `Elasticsearch` docs for the highlight options at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html).

-   **categoryField** `String` [optional]
    Data field whose values are used to provide category specific suggestions.

-   **categoryValue** `String` [optional]
    This is the selected category value. It is used for informing the search result.

-   **nestedField** `String`
    set the `nested` field path that allows an array of objects to be indexed in a way that can be queried independently of each other. Applicable only when dataField's mapping is of `nested` type.

-   **fuzziness** `String | Number`
    Set a maximum edit distance on the search parameters, which can be 0, 1, 2, or "AUTO". This is useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, the fox can become a box.
    Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html)

-   **enableSynonyms**: Boolean
    This property can be used to control (enable/disable) the synonyms behavior for a particular query. Defaults to `true`, if set to `false` then fields having `.synonyms` suffix will not affect the query.

-   **rankFeature** `Object`
    This property allows you to define the [Elasticsearch rank feature query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#query-dsl-rank-feature-query) to boost the relevance score of documents based on the `rank_feature` fields. Read more about it [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference/#rankfeature).

    The `rankFeature` object must be in the following shape:
    <br/>
    ```ts
        {
         "field_name": {
               "boost": 1.0,
              "function_name": "function_object"
            }
        }
    ```
    - `field_name` It represents the `dataField` that has the `rank_feature` or `rank_features` mapping.
    - `boost` [optional] A floating point number (shouldn't be negative) that is used to decrease (if the value is between 0 and 1) or increase relevance scores (if the value is greater than 1). Defaults to 1.
    - `function_name` To calculate relevance scores based on rank feature fields, the rank_feature query supports the following mathematical functions:
        - [saturation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#rank-feature-query-saturation)
        - [log](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#rank-feature-query-logarithm)
        - [sigmoid](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#rank-feature-query-sigmoid)
    - `function_object` The function object can be used to override the default values for functions.
        - `saturation` function supports the `pivot` property that must be greater than zero.
        - `log` function supports the `scaling_factor` property
        - `sigmoid` function supports `pivot` and `exponent`[must be positive] properties

    The following example uses a rank feature field named `pagerank` with `saturation` function.

    ```js
        {
            "id": "search",
            "dataField": ["content"],
            "value": "2016",
            "rankFeature": {
                "pagerank": {
                    "saturation": {
                        "pivot": 2
                    }
                }
            }
        }
    ```

    The following example uses the `boost` property to boost the relevance score based on the `pagerank` field.

    ```js
        {
            "id": "search",
            "dataField": ["content"],
            "value": "2016",
            "rankFeature": {
                "pagerank": {
                    "boost": 2.0
                }
            }
        }
    ```

    The following example uses all three functions (`saturation`, `log` and `sigmoid`) to boost the relevance scores.

    ```js
        {
        "query": [
            {
                "id": "search",
                "dataField": [
                    "content"
                ],
                "value": "2016",
                "rankFeature": {
                    "pagerank": {
                        "saturation": {
                            "pivot": 2
                        }
                    },
                    "url_length": {
                        "log": {
                            "scaling_factor": 1
                        }
                    },
                    "topics.sports": {
                        "sigmoid": {
                            "pivot": 2,
                            "exponent": 1
                        }
                    }
                }
            }
        ]
    }
    ```

-   **searchOperators** `Boolean`
    Defaults to `false`. If set to `true`, then you can use special characters in the search query to enable the advanced search.<br/>
    Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-String-query.html).

-   **queryString** `Boolean` [optional]
    Defaults to `false`. If set to `true` then it allows you to create a complex search that includes wildcard characters, searches across multiple fields, and more. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-String-query.html).

-  **clearOnQueryChange** `Boolean` [optional]
    Defaults to `true`, i.e. clear the component's input selection when the query of its dependent component changes (which is set via react prop). When set to `false`, the component's input selection isn't cleared.
-   **distinctField** `String` [optional]
	This prop returns only the distinct value documents for the specified field. It is equivalent to the `DISTINCT` clause in SQL. It internally uses the collapse feature of Elasticsearch. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

-   **distinctFieldConfig** `Object` [optional]
	This prop allows specifying additional options to the `distinctField` prop. Using the allowed DSL, one can specify how to return K distinct values (default value of K=1), sort them by a specific order, or return a second level of distinct values. `distinctFieldConfig` object corresponds to the `inner_hits` key's DSL.  You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

```html
<search-box
	....
	distinctField="authors.keyword"
	:distinctFieldConfig="{
		inner_hits: {
			name: 'most_recent',
			size: 5,
			sort: [{ timestamp: 'asc' }],
		},
		max_concurrent_group_searches: 4,
	}"
/>
```
-   **value** `String` [optional]
    sets the current value of the component. It sets the search query text (on mount and on update). Use this prop in conjunction with the `onChange` prop to take the control of search input value.


### To customize the AutoSuggestions

-   **enablePopularSuggestions** `Boolean`
    Defaults to `false`. When set to `true`, popular searches are returned as suggestions as per the popular suggestions config (either defaults, or as set through `popularSuggestionsConfig` or via Suggestions settings in the control plane). Read more about it over [here](/docs/analytics/popular-recent-suggestions/).

- **popularSuggestionsConfig** `Object` Specify additional options for fetching popular suggestions.

    It can accept the following keys:
    - **size**: `number` Maximum number of popular suggestions to return. Defaults to 5.
    - **minCount**: `number` Return only popular suggestions that have been searched at least `minCount` times. There is no default minimum count-based restriction.
    - **minChars**: `number` Return only popular suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.
    - **showGlobal**: `Boolean` Defaults to `true`. When set to `false`, returns popular suggestions only based on the current user's past searches.
    - **index**: `string` Index(es) from which to return the popular suggestions from. Defaults to the entire cluster.
    <br/>
    ```jsx
        <SearchBox
            enablePopularSuggestions={true}
            popularSuggestionsConfig={{
                size: 5,
                minCount: 5,
                minChars: 3,
                showGlobal: false,
                index: "good-books-ds",  // further restrict the index to search on
            }}
        />
    ```

-   **enableRecentSuggestions** `Boolean` Defaults to `false`. When set to `true`, recent searches are returned as suggestions as per the recent suggestions config (either defaults, or as set through `recentSuggestionsConfig` or via Recent Suggestions settings in the control plane)
> Note: Please note that this feature only works when `recordAnalytics` is set to `true` in `appbaseConfig`.

- **recentSuggestionsConfig** `Object` Specify additional options for fetching recent suggestions.

    It can accept the following keys:
    - **size**: `number` Maximum number of recent suggestions to return. Defaults to 5.
    - **minHits**: `number` Return only recent searches that returned at least `minHits` results. There is no default minimum hits-based restriction.
    - **minChars**: `number` Return only recent suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.
    - **index**: `string` Index(es) from which to return the recent suggestions from. Defaults to the entire cluster.
    <br/>
    ```jsx
        <SearchBox
            enableRecentSuggestions={true}
            recentSuggestionsConfig={{
                size: 5,
                minHits: 5,
                minChars: 3,
                index: "good-books-ds",  // further restrict the index to search on
            }}
        />
    ```

-   **enablePredictiveSuggestions** `bool` [optional]
    Defaults to `false`. When set to `true`, it predicts the next relevant words from a field's value based on the search query typed by the user. When set to `false` (default), the entire field's value would be displayed. This may not be desirable for long-form fields (where average words per field value is greater than 4 and may not fit in a single line).

    ```ts
    // pass this prop as true in searchComponent to enable predictive suggestions
    :enablePredictiveSuggestions="true",
    ```

-   **maxPredictedWords** `number` Defaults to `2`. This property allows            configuring the maximum number of relevant words that are predicted. Valid values are between **[1, 5]**.
<br/>

-   **applyStopwords** `Boolean` When set to true, it would not predict a suggestion which starts or ends with a stopword. You can find the list of stopwords used by Appbase at [here](https://github.com/appbaseio/reactivesearch-api/blob/dev/plugins/querytranslate/stopwords.go).

-   **stopwords** `Array[String]` It allows you to define a list of custom     stopwords. You can also set it through `Index` settings in the control plane.

-   **showDistinctSuggestions** `Boolean` Show 1 suggestion per document. If set to `false` multiple suggestions may show up for the same document as
    searched value might appear in multiple fields of the same document, this is true only if you have configured multiple fields in `dataField` prop. Defaults to `true`.
    <br/> <br/>
    **Example** if you have `showDistinctSuggestions` is set to `false` and have following configurations

        ```js
        // Your document:
        {
            "name": "Warn",
            "address": "Washington"
        }
        // Component:
        <SearchBox dataField={['name', 'address']} />
        // Search Query:
        "wa"
        ```

    Then there will be 2 suggestions from the same document
    as we have the search term present in both the fields
    specified in `dataField`.

    ```
    Warn
    Washington
    ```

- **urlField** `string` It is the `dataField` whose value contains a URL. This is a convenience prop that allows returning the URL value in the suggestion's response.
### To customize the SearchBox UI

-   **title** `String|JSX` set the title of the component to be shown in the UI.

-   **loader** `String|JSX` Display an optional loader while fetching the options

-   **placeholder** `String` set placeholder text to be shown in the component's input field. Defaults to "Search".

-   **showIcon** `Boolean` whether to display a search or custom icon in the input box. Defaults to `true`.

-   **iconPosition** `String` sets the position of the search icon. Can be set to either `left` or `right`. Defaults to `right`.

-   **icon** `JSX` set a custom search icon instead of the default 🔍

-   **showClear** `Boolean` show a clear text `X` icon. Defaults to `false`.

-   **clearIcon** `any` sets custom clear icon for the search input box

-   **autosuggest** `Boolean` set whether the autosuggest functionality should be enabled or disabled. Defaults to `true`.

-   **strictSelection** `Boolean` defaults to `false`. When set to `true`, the component will only set its value and fire the query if the value was selected from the suggestion. Otherwise the value will be cleared
    on selection. This is only relevant with `autosuggest`.

-   **defaultSuggestions** `suggestionsDef` preset search suggestions to be shown on focus when the SearchBox does not have any search query text set. Accepts an array of objects each having a **label** and **value** property. The label can contain either String or an HTML element. For an example

```jsx
<SearchBox
    defaultSuggestions={[
        {
            label: 'Songwriting',
            value: 'Songwriting'
        },
        {
            label: 'Musicians',
            value: 'Musicians'
        }
    ]}
>
```

-   **downShiftProps** `Object` are the props to be passed to `DownShift` for typeahead configurations

-   **debounce** `wholeNumber` delays executing the query by the specified time in **ms** while the user is typing. Defaults to `0`, i.e. no debounce. Useful if you want to save on the Number of requests sent.

-   **showVoiceSearch** `Boolean` Enable voice search for searchbox

-   **focusShortcuts** `Array<String | Number>` [optional]
A list of keyboard shortcuts that focus the search box. Accepts key names and key codes. Compatible with key combinations separated using '+'. Defaults to `['/']`.
> Note
>1. By default, pressing `'/'` would focus the search box.
>2. The `hotkeys-js` library needs to be installed manually when using combinations in `focusShortcuts` prop, eg: 'cmd+b', 'ctrl+q', etc, without which only single key shortcuts would work if passed in the prop, eg: From among ['/', 'b', '#', 'ctrl+r'], only '/', 'b', '#' would work without hotkey-js installation.

-   **autoFocus** `Boolean` [optional] When set to true, search box is auto-focused on page load. Defaults to `false`.

- **expandSuggestionsContainer** `Boolean` [optional] When set to false the width of suggestions dropdown container is limited to the width of searchbox input field. Defaults to `true`.
  <img src="https://i.imgur.com/x3jF23m.png"/>

```jsx
 <search-box
        expandSuggestionsContainer={false}
        ...
  >
    <img slot="addonBefore" src="..." />
    <img slot="addonAfter" src="..." />
 </search-box>
```

-   **enterButton** `boolean` [optional] When set to `true`, the results would only be updated on press of the  button. Defaults to `false`.  You can also provide styles using the `enterButton` key in the `innerClass` prop.

    <img src="https://i.imgur.com/8ZoA42b.png" style="margin:0 auto;display:block;"/>

```jsx
 <search-box
    :enterButton="true"        
  >
  // ... other slots
 </search-box>
```   

### Customize style

-   **innerClass** `Object` `SearchBox` component supports an `innerClass` prop to provide styles to the sub-components of `SearchBox`. These are the supported keys:

    -   `title`
    -   `input`
    -   `list`
    -   `enterButton`

-   **className** `String`
    CSS class to be injected on the component container.

-   **style** `Object`
    CSS styles to be applied to the **SearchBox** component.

### To customize the query execution

-   **headers** `Object`
    set custom headers to be sent with each server request as key/value pairs. For example:

```html
<search-box
	id="search-component"
	:dataField="['original_title', 'original_title.search']"
	:headers="{
		secret: 'searchbase-is-awesome',
	}"
/>
```

-   **transformRequest** `(requestOptions: Object) => Promise<Object>`
    Enables transformation of network request before execution. This function will give you the request object as the param and expect an updated request in return, for execution.<br/>
    For example, we will add the `credentials` property in the request using `transformRequest`.

```html
<template>
	<search-box
		id="search-component"
		:dataField="['original_title', 'original_title.search']"
		:transformRequest="transformRequest"
	/>
</template>
<script>
	export default {
		name: 'App',
		methods: {
			transformRequest(request) {
				return Promise.resolve({
					...request,
					credentials: include,
				});
			},
		},
	};
</script>
```

-   **transformResponse** `(response: any) => Promise<any>`
    Enables transformation of search network response before rendering them. It is an asynchronous function which will accept an Elasticsearch response object as param and is expected to return an updated response as the return value.<br/>
    For example:

```html
<template>
	<search-box
		id="search-component"
		:dataField="['original_title', 'original_title.search']"
		:transformResponse="transformResponse"
	/>
</template>
<script>
	export default {
		name: 'App',
		methods: {
			async transformResponse(elasticsearchResponse) {
				const ids = elasticsearchResponse.hits.hits.map(item => item._id);
				const extraInformation = await getExtraInformation(ids);
				const hits = elasticsearchResponse.hits.hits.map(item => {
					const extraInformationItem = extraInformation.find(
						otherItem => otherItem._id === item._id,
					);
					return {
						...item,
						...extraInformationItem,
					};
				});

				return {
					...elasticsearchResponse,
					hits: {
						...elasticsearchResponse.hits,
						hits,
					},
				};
			},
		},
	};
</script>
```

> Note
>
> `transformResponse` function is expected to return data in the following structure.

```json
    {
        // Elasticsearch hits response
        hits: {
            hits: [...],
            total: 100
        },
        // Elasticsearch aggregations response
        aggregations: {

        }
        took: 1
    }
```

-   **defaultQuery**: `(component: SearchComponent) => Object`
    is a callback function that takes [SearchComponent](docs/reactivesearch/searchbase/overview/searchcomponent/) instance as parameter and **returns** the data query to be applied to the suggestions, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components. In simple words, `defaultQuery` is used with data-driven components to impact their own data.

    For example, set the `timeout` to `1s` for suggestion query.

```html
<template>
	<search-box
		id="search-component"
		:dataField="['original_title', 'original_title.search']"
		:defaultQuery="defaultQuery"
	/>
</template>
<script>
	export default App {
	    name: 'App',
	    methods: {
	        defaultQuery() {
	            return {
	                "timeout": "1s"
	            }
	        }
	    }
	}
</script>
```

-   **customQuery**: `(component: SearchComponent) => Object`
    takes [SearchComponent](docs/reactivesearch/searchbase/overview/searchcomponent/) instance as parameter and **returns** the query to be applied to the dependent components by `react` prop, as defined in Elasticsearch Query DSL.

    For example, the following example has two components `search-component`(to render the suggestions) and `result-component`(to render the results). The `result-component` depends on the `search-component` to update the results based on the selected suggestion. The `search-component` has the `customQuery` prop defined that will not affect the query for suggestions(that is how `customQuery` is different from `defaultQuery`) but it'll affect the query for `result-component` because of the `react` dependency on `search-component`.

```html
<template>
	<search-base
		index="gitxplore-app"
		url="https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io"
		credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
	>
		<search-box
			id="search-component"
			:dataField="['original_title', 'original_title.search']"
			:customQuery="customQuery"
		/>
		<search-component
			id="result-component"
			dataField="original_title"
			:react="{
                and: ['search-component']
            }"
		/>
	</search-base>
</template>
<script>
	export default App {
	    name: 'App',
	    methods: {
	        customQuery() {
	            return {
	                timeout: '1s',
	                query: {
	                    match_phrase_prefix: {
	                        fieldName: {
	                            query: 'hello world',
	                            max_expansions: 10,
	                        },
	                    },
	                },
	            }
	        }
	    }
	}
</script>
```

### Miscellaneous

-   **getMicInstance** `Function` You can pass a callback function to get the instance of `SpeechRecognition` object, which can be used to override the default configurations for voice search.

-   **beforeValueChange** `Function`
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every-time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
    For example:

```html
<template>
	<search-box
		id="search-component"
		:dataField="['original_title', 'original_title.search']"
		:beforeValueChange="beforeValueChange"
	/>
</template>
<script>
	export default App {
	    name: 'App',
	    methods: {
	        beforeValueChange(value) {
	            // called before the value is set
	            // returns a promise
	            return new Promise((resolve, reject) => {
	                // update state or component props
	                resolve();
	                // or reject()
	            });
	        }
	    }
	}
</script>
```

-   **URLParams** `Boolean` enable creating a URL query String param based on the search query text value. This is useful for sharing URLs with the component state. Defaults to `false`.

-   **defaultValue** `String` set the initial search query text on mount.

-   **subscribeTo** `Array<String>` lets you subscribe to various Searchbox properties to render UI (or to create a side-effect) based on changes to the properties.
<br/>
These are the properties that can be subscribed to:

    -   `results`   
    -   `aggregationData`
    -   `requestStatus`
    -   `error`
    -   `value`
    -   `query`
    -   `micStatus`
    -   `dataField`
    -   `size`
    -   `from`
    -   `fuzziness`
    -   `includeFields`
    -   `excludeFields`
    -   `sortBy`
    -   `react`
    -   `defaultQuery`
    -   `customQuery`
## Events


-   **change** is an event emitted when value of the component changes, which accepts component's current **value**, **searchComponent** ref and the **e** event object as parameters. It is called when you are using the `value` prop and the component's value changes.

```html
<search-box
	:value="text"
	@change="(value, searchComponent, e) => {
		this.text = value;
		// To fetch suggestions
		searchComponent.triggerDefaultQuery();
		// To update results
		searchComponent.triggerCustomQuery();
	}"
/>
```

-   **valueChange** is an event which accepts component's current **value** as a parameter. It is called every-time the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product in a SearchBox.

-   **valueSelected** An event which gets triggered on selecting a value from suggestions

-   **error** gets triggered in case of an error while fetching suggestions

-   **results** can be used to listen for the suggestions changes

-   **queryChange**
    is an event which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

-   **blur** is an event handler for input blur event

-   **keyPress** is an event handler for keypress event

-   **keyUp** is an event handler for keyup event

-   **focus** is an event handler for input focus event

-   **keyDown** is an event handler for keydown event

-   **aggregationData** can be used to listen for the `aggregationData` property changes
    -   **data**: `Array<Object>` contains the parsed aggregations
    -   **raw**: `Object` Response returned by ES composite aggs query in the raw form.
    -   **rawData**: `Object` An object of raw response as-is from elasticsearch query.
    -   **afterKey**: `Object` If the Number of composite buckets is too high (or unknown) to be returned in a single response use the afterKey parameter to retrieve the next

## Slots

-   **render** `Function` You can render suggestions in a custom layout by using the `render` prop.
    <br/>
    It accepts an object with these properties:
    - **`loading`**: `Boolean`
    indicates that the query is still in progress.
    - **`error`**: `Object`
    An object containing the error info.
    - **`suggestions`** `() => Array<Object>`
    This method can be used to get the parsed suggestions from the `results`. The `suggestion` object will have the following shape:

            ```ts
            {
                label: String;
                value: String;
                _suggestion_type: String;
                source: Object;
            }
            ```
    -   **`results`** `Results`
        It is an object which contains the following details of `suggestions` query response.

        -   **`data`**: `Array<Object>` contains the (promoted data + parsed hits)
        -   **`raw`**: `Object` Response returned by ES query in the raw form.
        -   **`NumberOfResults`**: `Number` Total Number of results found
        -   **`time`**: `Number` Total time taken by request (in ms)
        -   **`hidden`**: `Number` Total Number of hidden results found
        -   **`promoted`**: `Number` Total Number of promoted results found
        -   **`promotedData`**: `Array<Object>` An array of promoted results obtained from the applied query.
        -   **`customData`**: `Object` An object of custom data obtained from the ReactiveSearch API.
        -   **`rawData`**: `Object` An object of raw response as-is from elasticsearch query.

    -   **`aggregationData`** `Aggregations`
        It is an object which contains the following details of `aggregations` query response.

        -   **`data`**: `Array<Object>` contains the parsed aggregations
        -   **`raw`**: `Object` Response returned by ES `composite aggs` query in the raw form.
        -   **`rawData`**: `Object` An object of raw response as-is from elasticsearch query.
        -   **`afterKey`**: `Object` If the Number of composite buckets is too high (or unknown) to be returned in a single response use the `afterKey` parameter to retrieve the next results. This property will only be present for `composite` aggregations.

    -   **`value`**
        current search input value i.e the search query being used to obtain suggestions.

    -   **`query`** `Object`
        The last query that has been executed to fetch the suggestions

    -   **`micStatus`** `MicStatusField`
        Returns the current status of the mic. Can be `INACTIVE`, `ACTIVE` or `DENIED`

    -   **`micActive`** `Boolean`
        Returns `true` if mic is active

    -   **`micInactive`** `Boolean`
        Returns `true` if mic is inactive

    -   **`micDenied`** `Boolean`
        Returns `true` if it doesn't have access to the mic

    -   **`micInstance`** `Object`
        Returns the current mic instance. Can be used to set mic language and other properties of mic
    -   **`id`** `String` as defined in props
    -   **`react`** `Object` `react` as defined in props
    -   **`queryFormat`** `String` as defined in props
    -   **`dataField`** `String | Array<String | DataField>` as defined in props
    -   **`categoryField`** `String` as defined in props
    -   **`categoryValue`** `String` represents the current value of the selected category
    -   **`nestedField`** `String` as defined in props
    -   **`from`** `Number` represents the current state of the `from` value. This property is useful to implement pagination.
    -   **`size`** `Number` represents the current state of the `size` of results to be returned by query
    -   **`sortBy`** `String` current state of the `sortBy` value
    -   **`aggregationField`** `String` as defined in props
    -   **`includeFields`** `Array<String>` represents the current value of `includeFields` property
    -   **`excludeFields`** represents the current value of `excludeFields` property
    -   **`fuzziness`** `String|Number` represents the current value of `fuzziness` property
    -   **`searchOperators`** `Boolean` as defined in props
    -   **`highlight`** `Boolean` as defined in props
    -   **`highlightField`** `String|Array<String>` as defined in props
    -   **`customHighlight`** `Object` as defined in props
    -   **`enableSynonyms`** `Boolean` as defined in props
    -   **`queryString`** `String` as defined in props
    -   **`enablePopularSuggestions`** `Boolean` as defined in props
    -   **`showDistinctSuggestions`** `Boolean` as defined in props
    -   **`defaultQuery`** represents the current value of `defaultQuery` property
    -   **`customQuery`**  represents the current value of `customQuery` property
    -   **`requestStatus`** represents the current state of the request, can have values as `INACTIVE`, `PENDING` or `ERROR`.
    -   **`appbaseConfig`** `Object` as defined in props
    -   **`queryId`** `String` to get the query id returned by appbase.io search to track the analytics
    -   **`subscribeToStateChanges`** `function` can be used to subscribe to the changes for the properties. Read more at [here](/docs/reactivesearch/searchbase/overview/searchcomponent/#subscribe-to-the-properties-changes).
    -   **`unsubscribeToStateChanges`** `function` can be used to unsubscribe to the changes for the properties. Read more at [here](/docs/reactivesearch/searchbase/overview/searchcomponent/#subscribe-to-the-properties-changes).
    -   **`recordClick`** `function` enables recording click analytics of a search request. Please check the usage at [here](/docs/reactivesearch/searchbase/overview/searchcomponent/#record-analytics).
    -   **`recordConversions`** `function` enables recording conversions of a search request. Please check the usage at [here](/docs/reactivesearch/searchbase/overview/searchcomponent/#record-analytics).
    > Note:
    > All of the methods accept `options` as the second parameter which has the following shape:

```ts
{
    triggerDefaultQuery?: Boolean, // defaults to `true`
    triggerCustomQuery?: Boolean, // defaults to `false`
    stateChanges?: Boolean // defaults to `true`
};
```

-   **triggerDefaultQuery**
    `true` executes the query for a particular component
-   **triggerCustomQuery**
    `true` executes the query for the dependent components (dependencies defined in the `react` property)
-   **stateChanges**
    `true` invokes the subscribed functions to `subscribeToStateChanges` method, i.e trigger the re-render after making changes

    -   **`handleMicClick`** `(micOptions: Object, options: Options): Promise<any>` can be used to handle the custom voice search implementation
    -   **`triggerDefaultQuery`** `(options): Promise<any>` can be used to trigger the `customQuery` programmatically
    -   **`triggerCustomQuery`** `(options): Promise<any>` can be used to trigger the `defaultQuery` programmatically
    -   **`setDataField`** `( dataField: String | Array<String | DataField>, options?: Options ) => void`
    -   **`setValue`** `( value: any, options?: Options ) => void` can be used to set the `value` property
    -   **setCategoryValue** `(categoryValue: string, options?: Options) => void` can be used to set the `categoryValue` property.
    -   **`setSize`** `( size: Number, options?: Options ) => void` can be used to set the `size` property
    -   **`setFrom`** `( from: Number, options?: Options ) => void` can be used to set the `from` property. Useful to implement pagination.
    -   **`setFuzziness`** `( fuzziness: String|Number, options?: Options ) => void` can be used to set the `fuzziness` property.
    -   **`setIncludeFields`** `( includeFields: Array<String>, options?: Options ) => void` can be used to set the `includeFields` property.
    -   **`setExcludeFields`** `( excludeFields: Array<String>, options?: Options ) => void` can be used to set the `excludeFields` property.
    -   **`setSortBy`** `( sortBy: String, options?: Options ) => void` can be used to set the `sortBy` property.
    -   **`setReact`** `( react: Object, options?: Options ) => void` can be used to set the `react` property.
    -   **`setDefaultQuery`** `( defaultQuery: function, options?: Options ) => void` can be used to set the `defaultQuery` property.
    -   **`setCustomQuery`** `( customQuery: function, options?: Options ) => void` can be used to set the `customQuery` property.

-   **renderError** `slot`
    can be used to render an error message in case of any error.

```jsx
<search-box slot="renderError" slot-scope="error">
    <div>
        Something went wrong!<br/>Error details<br/>{JSON.Stringify(error)}
    </div>
</search-box>
/>
```

-   **renderNoSuggestion** `slot`
    can be used to render a message in case of no list items.

-   **renderMic** `slot`can be used to render the custom mic option

-   **recentSearchesIcon** `slot-scope` [optional]
You can use a custom icon in place of the default icon for the recent search items that are shown when `enableRecentSearches` prop is set to true. You can also provide styles using the `recent-search-icon` key in the `innerClass` prop.

    ```jsx
        <search-box
            ...
            :enableRecentSearches="true"
            :innerClass="{
                'recent-search-icon': '...',
            }"
        >
            <recent-icon slot="recentSearchesIcon" />
        </search-box>
    ```

-   **popularSearchesIcon** `slot-scope` [optional]
You can use a custom icon in place of the default icon for the popular searches that are shown when `enablePopularSuggestions` prop is set to true. You can also provide styles using the `popular-search-icon` key in the `innerClass` prop.

```jsx
<search-box
    ...
    :enablePopularSuggestions="true"
    :innerClass="{
        'popular-search-icon': '...'
    }"
>
    <popular-icon slot="popularSearchesIcon" />
</search-box>
```

-   **addonBefore** `slot-scope` [optional] The HTML markup displayed before (on the left side of) the searchbox input field. Users can use it to render additional actions/ markup, eg: a custom search icon hiding the default.
<img src="https://i.imgur.com/Lhm8PgV.png" style="margin:0 auto;display:block;"/>

```jsx
<search-box
      ...
      :enablePopularSuggestions="true"
      :innerClass="{
         'popular-search-icon': '...'
      }"
>
      <img 
        slot="addonBefore"
        src="https://img.icons8.com/cute-clipart/64/000000/search.png"
        height="30px"
      />
</search-box>
```

-   **addonAfter** `slot-scope` [optional] The HTML markup displayed before (on the right side of) the searchbox input field. Users can use it to render additional actions/ markup, eg: a custom search icon hiding the default.
<img src="https://i.imgur.com/upZRx9K.png" style="margin:0 auto;display:block;"/>

```jsx
<search-box
      ...
      :enablePopularSuggestions="true"
      :innerClass="{
         'popular-search-icon': '...'
      }"
>
      <img 
        slot="addonAfter"
        src="https://img.icons8.com/cute-clipart/64/000000/search.png"
        height="30px"
      />
</search-box>
```

-   **renderEnterButton** `slot-scope` [optional] The custom HTML markup displayed for enterButton. Use in conjunction with `enterButton` prop set to `true`.
<img src="https://i.imgur.com/dRykMOg.png" style="margin:0 auto;display:block;"/>

```jsx
<search-box
      ...
      :enterButton="true"
>
    <div
        slot="renderEnterButton"
        slot-scope="onClick"
        :style="{ height: '100%', display: 'flex', alignItems: 'stretch' }"
    >
        <button
            :style="{ border: '1px solid #c3c3c3', cursor       'pointer' }"
            v-on:click="onClick"
        >
            🔍 Search
        </button>
    </div>
</search-box>
```
