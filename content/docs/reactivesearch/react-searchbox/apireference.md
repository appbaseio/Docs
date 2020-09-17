---
title: 'QuickStart'
meta_title: 'QuickStart to React SearchBox'
meta_description: 'React SearchBox is a lightweight react searchbox UI component to query your Elasticsearch app.'
keywords:
    - quickstart
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

`React SearchBox` offers a lightweight (~30KB: Minified + Gzipped) and performance focused searchbox UI component to query and display results from your Elasticsearch app (aka index) using declarative props. It is an alternative to using the [DataSearch component](/docs/reactivesearch/v3/search/datasearch/) from ReactiveSearch.

### When to Use React SearchBox

We recommend using React Searchbox over DataSearch or CategorySearch when you only need to integrate a searchbox UI component into your app. If you are planning to user other UI filters or result components, it is ideal to use the [ReactiveSearch library](/docs/reactivesearch/v3/overview/quickstart/) instead of this standalone component.

Example uses of searchbox UI:

-   Searching a rental listing by its `name` or `description` fields.
-   Searching across e-commerce products.

This library has 3 essentials parts

-   **SearchBase**: It is used as an internal dependency to connect with an Elastic Search system to perform search queries)
-   **SearchBox**: The core of the library which helps with data access and manipulation with any UI components
-   **SearchComponent**: The essential headless component for implement and integrating custom UI blocks seamlessly

## SearchBase

This is used as an internal dependency to connect with an Elastic Search system to perform search queries. This allows adding details related to the Elastic Search system like `index`, `crendentials` etc.

### Props

-   **index** `string` [required]
    refers to an `index` if you’re using your own Elasticsearch cluster. If you're using an appbase.io hosted app, then the app name can be used.

    > Note: Multiple indexes can be connected to by specifying comma separated index names.

-   **url** `string` [required]
    URL for the Elasticsearch cluster. Defaults to `https://scalr.api.appbase.io`

-   **credentials** `string` [optional]
    Basic auth credentials for authentication purposes. It should be a string of the format `username:password`.
    If you are using an appbase.io app, you will find credentials under your [API credentials page](https://dashboard.appbase.io/app?view=credentials). If you are not using an appbase.io app, credentials may not be necessary - although having an open access to your Elasticsearch cluster is not recommended.

-   **appbaseConfig** `Object` [optional]
    This allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:

    -   **recordAnalytics** Boolean allows recording search analytics (and click analytics) when set to true and appbase.io is used as a backend. Defaults to false.

    -   **enableQueryRules** Boolean If false, then appbase.io will not apply the query rules on the search requests. Defaults to true.

    -   **userId** String It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.

    -   **customEvents** Object It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.

-   **headers** `Object` [optional] set custom headers to be sent with each server request as key/value pairs.

-   **transformRequest** `Function` Enables transformation of network request before
    execution. This function will give you the request object as the param and expect an updated request in return, for execution.

-   **transformResponse** `Function` Enables transformation of search network response before  
    rendering them. It is an asynchronous function which will accept an Elasticsearch response object as param and is expected to return an updated response as the return value.

    > Note: transformResponse function is expected to return data in the following structure.

    ```javascript
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

## SearchBox

The core of the library which helps with data access and manipulation with any UI components

### Props

-   **id** `string.isRequired` a unique identifier for the query can be referenced in the react property of other queries.

-   **enableQuerySuggestions** `Boolean`
    Defaults to `false`. When enabled, it can be useful to curate search suggestions based on actual search queries that your users are making. Read more about it over [here](/docs/analytics/query-suggestions/).

    > Note:
    >
    > Query Suggestions only work when `enableAppbase` prop is `true`.

-   **dataField** `dataFieldValidator`
    database field(s) to be queried against. Accepts a String or an Array of either String or `DataField` type. The latter is useful for searching across multiple fields with field weights.<br/>
    Think of field weights as a way to apply weighted search. To use field weights, you can define the `dataField` prop as an array of objects of `DataField` type.<br/>
    The `DataField` type has the following shape:

    > Note:
    > This prop is optional only when `enableAppbase` prop is set to `true`.

-   **aggregationField** `string`
    One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data).
    It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
    You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html).
    You can use `aggregationData` using `onAggregationData` callback.

    ```javascript
    <SearchBox
        app="good-book-ds-latest"
        credentials="IPM14ICqp:8e573e86-8802-4a27-a7a1-4c7d0c62c186"
        dataField="original_title"
        aggregationField="original_title.keyword"
        onAggregationData={(next, prev) => <>}
    />
    ```

    > See impact of aggregationField with these example for [React](/docs/reactivesearch/v3/advanced/groupingresults/#how).

-   **nestedField** `string`
    Set the path of the `nested` type under which the `dataField` is present. Only applicable only when the field(s) specified in the `dataField` is(are) present under a [`nested` type](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html) mapping.

-   **size** `number` To set the number of results to be returned by a query.

-   **title** `string` sets the title of the search component

-   **defaultValue** `string` sets the default values to be shown

-   **value** `string` controls the current value of the component. It selects the item from the list (on mount and on update)

-   **downShiftProps** `Object` are the props to be passed to `DownShift` for typeahead configurations

-   **placeholder** `string` is the placeholder for the search input

-   **showIcon** `Boolean` shows the icon in the search input box

-   **iconPosition** `position` Change icon positions either to left or right

-   **icon** `any` adds any icon to be shown in the search input box

-   **showClear** `Boolean` shows clear icon in the search input box

-   **clearIcon** `any` sets custom clear icon for the search input box

-   **autosuggest** `Boolean` enables autosuggestion while typing

-   **strictSelection** `Boolean` defaults to `false`. When set to `true`, the component will only set its value and fire the query if the value was selected from the suggestion. Otherwise the value will be cleared
    on selection. This is only relevant with `autosuggest`.

-   **defaultSuggestions** `suggestionsDef` preset search suggestions to be shown on focus when the SearchBox does not have any search query text set. Accepts an array of objects each having a **label** and
    **value** property. The label can contain either String or an HTML element.

-   **debounce** `wholeNumber` delays executing the query by the specified time in **ms** while the user is typing. Defaults to `0`, i.e. no debounce. Useful if you want to save on the number of requests sent.

-   **highlight** `Boolean` highglights search string in the result set

-   **highlightField** `Boolean` highglights the search field

-   **customHighlight** `Function`A function which can allow custom highlighting flexibilities

-   **queryFormat** `string` Sets the query format, can be **or** or **and**. Defaults to **or**.

-   **fuzziness** `fuzzinessDef` Sets a maximum edit distance on the search parameters, can be **0**, **1**, **2** or **"AUTO"**. Useful for showing the correct results for an incorrect search parameter by taking
    the fuzziness into account. For example, with a substitution of one character, **fox** can become **box**. Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html).

-   **showVoiceSearch** `Boolean` Enable voice search for searchbox

-   **searchOperators** `Boolean` defaults to `false`. If set to `true`, than you can use special characters in the search query to enable an advanced search behavior.<br/>
    Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html).

-   **render** `Function` is a function returning the UI you want to render based on your results. This function receives a list of parameters and expects to return a `JSX`.

-   **renderQuerySuggestions** `Function` You can render query suggestions in a custom layout by using the `renderQuerySuggestions` prop.
    <br/>
    It accepts an object with these properties:

    -   **`loading`**: `boolean`
        indicates that the query is still in progress.
    -   **`error`**: `Object`
        An object containing the error info.
    -   **`data`**: `array`
        An array of query suggestions obtained based on search value.
    -   **`value`**: `string`
        current search input value i.e the search query being used to obtain suggestions.
    -   **`downshiftProps`**: `Object`
        provides all the control props from `downshift` which can be used to bind list items with click/mouse events.
        Read more about it [here](https://github.com/downshift-js/downshift#children-function).

-   **renderError** `Function`
    can be used to render an error message in case of any error.

    ```js
    renderError={(error) => (
            <div>
                Something went wrong!<br/>Error details<br/>{error}
            </div>
        )
    }
    ```

-   **renderNoSuggestion** `titleDef`
    can be used to render a message in case of no list items.

-   **getMicInstance** `Function` You can pass a callback function to get the instance of `SpeechRecognition` object, which can be used to override the
    default configurations.

-   **renderMic** `Function`can be used to render the custom mic option

-   **onChange** `Function` is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value`
    props and the component's value changes

-   **onValueChange** `Function` is a callback function which accepts component's current **value** as a parameter. It is called every-time the component's value changes. This prop is handy in cases where you
    want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product in a SearchBox.

-   **onValueSelected** `Function` A function callback which executes on selecting a value from result set

-   **onSuggestions** `Function` A function callback handler triggered on suggestions loading

-   **onAggregationData** `Function` can be used to listen for the aggregationData property changes

-   **onError** `Function` gets triggered in case of an error while fetching results

-   **onResults** `Function` can be used to listen for the `results` property changes

-   **innerClass** `Object` inject class to the inner levels

-   **style** `Object` Sets custom class properties to inner components

-   **defaultQuery** `Function` This property is useful to customize the source query, as defined in Elasticsearch Query DSL. It is different
    from the customQuery in a way that it doesn't get leaked to other queries(dependent queries by react prop) and only modifies the query for which it has been applied.

-   **beforeValueChange** `Function`
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every-time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

-   **onQueryChange** `Function`
    is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

-   **className** `string` You can add a className to any component which gets applied to the component at the root level.

-   **loader** `Object` Display an optional loader while fetching the options

-   **onBlur** `Function` is a callback handler for input blur event

-   **onKeyPress** `Function` is a callback handler for keypress event

-   **onKeyUp** `Function` is a callback handler for keyup event

-   **onFocus** `Function` is a callback handler for input focus event

-   **onKeyDown** `Function` is a callback handler for keydown event

-   **autoFocus** `Boolean` sets focus automatically when the input loads

-   **URLParams** `Boolean` enable creating a URL query string param based on the search query text value. This is useful for sharing URLs with the  
    component state. Defaults to `false`.

-   **appbaseConfig** `appbaseConfigDef` allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object
    which has the following properties:

    -   **recordAnalytics** `Boolean` allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
    -   **enableQueryRules** `Boolean` If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
    -   **userId** `String` It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
    -   **customEvents** `Object` It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.

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
        <Searchbox dataField=['name', 'address'] ... />
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

-   **queryString** `Boolean` Defaults to `false`. If set to `true` than it allows you to create a complex search that includes wildcard characters,
    searches across multiple fields, and more. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html).

-   **error** `any` gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user
    if needed.

-   **loading** `Boolean` indicates that the query is still in progress

-   **results** `Object` is an object which contains the following details of `results` query response.

## SearchComponent

The essential headless component for implement and integrating custom UI blocks seamlessly

### Props

-   **index** `string` [required]
    refers to an `index` if you’re using your own Elasticsearch cluster. If you're using an appbase.io hosted app, then the app name can be used.
-   **url** `string`
    URL for the Elasticsearch cluster. Defaults to `https://scalr.api.appbase.io`

-   **credentials** `string`
    Basic auth credentials for authentication purposes. It should be a string of the format `username:password`.
    If you are using an appbase.io app, you will find credentials under your [API credentials page](https://dashboard.appbase.io/app?view=credentials). If you are not using an appbase.io app, credentials may not be necessary - although having an open access to your Elasticsearch cluster is not recommended.

-   **appbaseConfig** `Object` [optional] allows you to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:

    -   **recordAnalytics** `Boolean` allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
    -   **enableQueryRules** `Boolean` If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
    -   **userId** `String` It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
    -   **customEvents** `Object` It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.

-   **headers** `Object` [optional] set custom headers to be sent with each server request as key/value pairs.

-   **transformRequest** `Function` Enables transformation of network request before
    execution. This function will give you the request object as the param and expect an updated request in return, for execution.

-   **transformResponse** `Function` Enables transformation of search network response before  
    rendering them. It is an asynchronous function which will accept an Elasticsearch response object as param and is expected to return an updated response as the return value.

    > Note: transformResponse function is expected to return data in the following structure.

    ```javascript
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

-   **beforeValueChange** `Function`
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every-time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

-   **enableQuerySuggestions** `Boolean`
    Defaults to `false`. When enabled, it can be useful to curate search suggestions based on actual search queries that your users are making. Read more about it over [here](/docs/analytics/query-suggestions/).

    > Note:
    >
    > Query Suggestions only work when `enableAppbase` prop is `true`.

-   **URLParams** `Boolean`
    enable creating a URL query string param based on the search query text value. This is useful for sharing URLs with the component state. Defaults to `false`.

-   **id** `string.isRequired` a unique identifier for the query can be referenced in the react property of other queries.

-   **value** `any` controls the current value of the component. It selects the item from the list (on mount and on update)

-   **type** `queryTypes` The type (aka collection) under which the data will be indexed

-   **react** `reactType` specify dependent components to reactively update **SingleDropdownList's** suggestions.

    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.

-   **queryFormat** `queryFormatDef`
    Sets the query format, can be or or and. Defaults to or.
    or returns all the results matching any of the search query text's parameters. For example, searching for "bat man" with or will return all the results matching either "bat" or "man". On the other hand with and, only results matching both "bat" and "man" will be returned. It returns the results matching all of the search query text's parameters.

-   **dataField** `dataFieldDef`
    database field(s) to be queried against. Accepts a String or an Array of either String or `DataField` type. The latter is useful for searching across multiple fields with field weights.<br/>
    Think of field weights as a way to apply weighted search. To use field weights, you can define the `dataField` prop as an array of objects of `DataField` type.<br/>
    The `DataField` type has the following shape:

    > Note:
    > This prop is optional only when `enableAppbase` prop is set to `true`.

-   **categoryField** `string` data field which has the category values mapped

-   **categoryValue** `string` category values which can be used to map data **categoryFields**

-   **nestedField** `string`
    Set the path of the `nested` type under which the `dataField` is present. Only applicable only when the field(s) specified in the `dataField` is(are) present under a [`nested` type](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html) mapping.

-   **from** `number` To define from which page to start the results, it is important to implement pagination.

-   **size** `number` shows number of suggestions and results to fetch per request.

-   **sortBy** `sortType` property that decides on how to sort the list items, accepts one of `count`, `asc` or `desc` as valid values. `count` sorts
    the list based on the count occurences, with highest value at the top. `asc` sorts the list in the ascending order of the list item (Alphabetical). `desc` sorts the list in the descending order of the term. Defaulted to `count`.

-   **aggregationField** `string`
    One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data).
    It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
    You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html).
    You can use `aggregationData` using `onAggregationData` callback.

    ```javascript
    <SearchBox
        app="good-book-ds-latest"
        credentials="IPM14ICqp:8e573e86-8802-4a27-a7a1-4c7d0c62c186"
        dataField="original_title"
        aggregationField="original_title.keyword"
        onAggregationData={(next, prev) => <>}
    />
    ```

    > See impact of aggregationField with these example for [React](/docs/reactivesearch/v3/advanced/groupingresults/#how).

-   **after** `Object` This property can be used to implement the pagination for `aggregations`. We use the [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/
    search-aggregations-bucket-composite-aggregation.html) of `Elasticsearch` to execute the aggregations' query, the response of composite aggregations includes a key named `after_key` which can be used to fetch the next set of aggregations for the same query. You can read more about the pagination for composite aggregations at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_pagination).

-   **includeNullValues** `Boolean` if you have sparse data or document or items not having the value in the specified field or mapping, then this prop
    enables you to show that data. Defaults to `false`.

-   **includeFields** `sourceFields` Fields to be included in the suggestion's query when autoSuggest is true.

-   **excludeFields** `sourceFields` are fields to be excluded in search result

-   **fuzziness** `fuzzinessDef` sets a maximum edit distance on the search parameters, can be **0**, **1**, **2** or **"AUTO"**. Useful for showing the
    correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, **fox** can become **box**. Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html).

-   **searchOperators** `Boolean`
    If set to true then you can use special characters in the search query to enable an advanced search behavior. Read more about it here.

    > Note: If both properties searchOperators and queryString are set to true then queryString will have the priority over searchOperators.

-   **highlight** `Boolean` whether highlighting should be enabled in the returned results

-   **highlightField** `string` when highlighting is enabled, this prop allows specifying the fields which should be
    returned with the matching highlights. When not specified, it defaults to applying highlights on the field(s) specified in the dataField prop.

-   **customHighlight** `Object` a function which returns the custom highlight settings. It receives the props and expects
    you to return an object with the highlight key. Check out the technews demo where the DataSearch component uses a customHighlight as given below,

-   **interval** `number` Wait duration in seconds before the next result-request

-   **aggregations** `PropTypes.arrayOf(string)` Aggregations and sorting are operations that require using a non-analyzed string. The field to be
    applied in the `dataField` prop for aggregation specific components such as Lists is of `Keyword` type (v5 and above) or of `String` not-analyzed type (v2).

-   **missingLabel** `string` defaults to `N/A`. Specify a custom label to show when `showMissing` is set to `true`.

-   **showMissing** `Boolean` defaults to `false`. When set to `true` it also retrives the aggregations for missing fields under the label specified by
    `missingLabel`.

-   **defaultQuery** `Function` is a callback function that takes **value** and **props** as parameters and **returns** the data query to be applied to the
    source component as defined in Elasticsearch Query DSL.<br/>

-   **customQuery** `Function` takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in
    Elasticsearch Query DSL.

    > `Note:` customQuery is called on value changes in the **DatePicker** component as long as the component is a part of `react` dependency of at least one other component.

-   **enableSynonyms** `Boolean` [optional]
    Defaults to `true`, can be used to `disable/enable` the synonyms behavior for the search query. Read more about it [here](/docs/search/reactivesearch-api/reference/#enablesynonyms)

    > Note:
    >
    > This property only works with [ReactiveSearch API](/docs/search/reactivesearch-api/) i.e when `enableAppbase` is set to `true` in `ReactiveBase` component.

-   **selectAllLabel** `string` if provided, shows an extra option to select all the options in the list with the provided string value

-   **pagination** `Boolean` pagination <> infinite scroll switcher. Defaults to `false`, i.e. an infinite scroll based view. When set to `true`, a
    pagination based list view with page numbers will appear.

-   **queryString** `Boolean` Defaults to `false`. If set to `true` than it allows you to create a complex search that includes wildcard characters,  
    searches across multiple fields, and more. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html).

-   **render** `Function` A function returning the UI you want to render based on your results. This function receives a list of parameters and expects to
    return a `JSX`.

-   **subscribeTo** `PropTypes.arrayOf(string)`

-   **triggerQueryOnInit** `Boolean` Triggers the query when the component loads

-   **onValueChange** `Function` is a callback function which accepts component's current **value** as a parameter. It is called every-time the component's value changes. This prop is handy in cases where you  
    want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product in a SearchBox.

-   **onResults** `Function` can be used to listen for the `results` property changes

-   **onAggregationData** `Function` an be used to listen for the `aggregations` property changes

-   **onError** `Function` gets triggered in case of an error while fetching results

-   **onRequestStatusChange** `Function` called when request status changes

-   **onQueryChange** `Function` is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the
    component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.

-   **onMicStatusChange** `Function` called when mic status changes

---
