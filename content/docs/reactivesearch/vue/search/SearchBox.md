---
title: 'SearchBox'
meta_title: 'SearchBox'
meta_description: '`SearchBox` creates a search box UI component that is connected to one or more database fields.'
keywords:
    - reactivesearch
    - searchbox
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/8UPzgG4.png)

`SearchBox` creates a search box UI component that is connected to one or more database fields. A `SearchBox` queries the appbase.io backend with query type `suggestion` to render different kind of suggestions, read more about the `suggestion` query type [here](https://docs.appbase.io/docs/search/reactivesearch-api/implement/#suggestion).

Example uses:

- Searching for a rental listing by its `name` or `description` field.
- Creating an e-commerce search box for finding products by their listing properties.
- Creating a product catalog search based on different categories.

## Usage

### Basic Usage

```html
<template>
	<search-box componentId="SearchBoxSensor" :dataField="['group_venue', 'group_city']" />
</template>
```

### Usage With All Props

```html
<search-box
  componentId="SearchSensor"
  :mode="tag"
  title="Search"
  defaultValue="Songwriting"
  placeholder="Search for cities or venues"
  highlightField="group_city"
  queryFormat="or"
  filterLabel="City"
  :autosuggest="true"
  :highlight="true"
  :showFilter="true"
  :dataField="[
    {
    	'field': 'group_venue',
    	'weight': 1
    },
    {
    	'field': 'group_city',
    	'weight': 3
    },
  ]"
  :defaultSuggestions="[
    { label: 'Songwriting', value: 'Songwriting' },
    { label: 'Musicians', value: 'Musicians' },
  ]"
  :fuzziness="0"
  :size="10"
  :debounce="100"
  :react="{
    and: ['CategoryFilter', 'SearchFilter']
  }"
  :URLParams="false"
  className="result-list-container"
  :size="3"
  :enablePopularSuggestions="true"
  :popularSuggestionsConfig="{ size: 3, minChars: 2, index: 'good-books-ds' }"
  :enableRecentSuggestions="true"
  :recentSuggestionsConfig="{
    size: 3,
    index: 'good-books-ds',
    minChars: 4,
  }"
  @on-data="
    (param) => {
    	// do something
    }
  "
  :showClear="true"
  @valueSelected="
    (value, cause) => {
    	// do something
    }
  "
  categoryField="authors.keyword"
  :defaultQuery="
    (value) => {
    	return {
          query: {
          	// ...
          },
          timeout: '1s',
    	};
    }
  "
  :customQuery="
    (value) => {
    	return {
          query: {
          	// ...
          },
          timeout: '1s',
    	};
    }
  "  
  :applyStopwords="true"
  :customStopwords="['be', 'the']"
  :enablePredictiveSuggestions="true"
  :endpoint="{
    url:'https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3',
    headers: {
        // put relevant headers
    },
    method: 'POST'
  }"  
/>
```

## Props

-   **componentId** `String`
    unique identifier of the component, can be referenced in other components' `react` prop.
-   **endpoint** `Object` [optional] 
    endpoint prop provides the ability to query a user-defined backend service for this component, overriding the data endpoint configured in the ReactiveBase component. Works only when `enableAppbase` is `true`.
    Accepts the following properties:
    -   **url** `String` [Required]
        URL where the data cluster is hosted.
    -   **headers** `Object` [optional]        
        set custom headers to be sent with each server request as key/value pairs.
    -   **method** `String` [optional]    
        set method of the API request.
    -   **body** `Object` [optional]    
        request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.

    > - Overrides the endpoint property defined in ReactiveBase.
    > - If required, use `transformResponse` prop to transform response in component-consumable format.

-   **mode** `String`
    SearchBox component offers two modes of usage, `select` & `tag`. When mode is set to `tag` SearchBox allows selecting multiple suggestions. Defaults to `select`.

    ```html
    <template>
	    <search-box
        componentId="title"
        highlight="true"
        :dataField="['title', 'text']"
        :mode="tag"
      />
    </template>
    ```

    <img src="https://i.imgur.com/DVhSiGV.png" alt="SearchBox tag mode" />

-   **dataField** `string | Array<string | DataField*>` [optional*]
    index field(s) to be connected to the component’s UI view. SearchBox accepts an `Array` in addition to `string`, which is useful for searching across multiple fields with or without field weights.<br/>
    Field weights allow weighted search for the index fields. A higher number implies a higher relevance weight for the corresponding field in the search results.<br/>
    You can define the `dataField` property as an array of objects of the `DataField` type to set the field weights.<br/>
    The `DataField` type has the following shape:

    ```ts
    type DataField = {
    	field: string;
    	weight: number;
    };
    ```
    database field(s) to be queried against. Accepts an Array in addition to String, useful for applying search across multiple fields. Check examples at [here](/docs/search/reactivesearch-api/reference/#datafield).

    > Note:
    > 1. This prop is optional only when `enableAppbase` prop is set to `true` in `ReactiveBase` component.
    > 2. The `dataField` property as `DataField` object is only available for ReactiveSearch version >= `v3.21.0` and Appbase version `v7.47.0`.

-   **size** `Number` [optional]
    number of suggestions to show. Defaults to `10`.
-   **excludeFields** `String Array` [optional]
    fields to be excluded in the suggestion's query when `autoSuggest` is true.
-   **includeFields** `String Array` [optional]
    fields to be included in the suggestion's query when `autoSuggest` is true.
-   **enablePopularSuggestions** `bool` [optional]
    Defaults to `false`. When enabled, it can be useful to curate search suggestions based on actual search queries that your users are making. Read more about it over [here](/docs/analytics/popular-recent-suggestions/).

    > Note:
    >
    > Popular Suggestions only work when `enableAppbase` prop is `true`.

-   **popularSuggestionsConfig** `Object` Specify additional options for fetching popular suggestions.
    It can accept the following keys:
    - **size**: `number` Maximum number of popular suggestions to return. Defaults to 5.
    - **minCount**: `number` Return only popular suggestions that have been searched at least `minCount` times. There is no default minimum count-based restriction.
    - **minChars**: `number` Return only popular suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.
    - **showGlobal**: `Boolean` Defaults to `true`. When set to `false`, returns popular suggestions only based on the current user's past searches.
    - **index**: `string` Index(es) from which to return the popular suggestions from. Defaults to the entire cluster.
    <br/>

    ```jsx
        <search-box
            :enablePopularSuggestions="true"
            :popularSuggestionsConfig="{
                size: 5,
                minCount: 5,
                minChars: 3,
                showGlobal: false,
                index: "good-books-ds",  // further restrict the index to search on
            }"
        />
    ```


-   **enablePredictiveSuggestions** `bool` [optional]
    Defaults to `false`. When set to `true`, it predicts the next relevant words from a field's value based on the search query typed by the user. When set to `false` (default), the entire field's value would be displayed. This may not be desirable for long-form fields (where average words per field value is greater than 4 and may not fit in a single line).

-   **enableRecentSuggestions** `Boolean` Defaults to `false`. When set to `true`, recent searches are returned as suggestions as per the recent suggestions config (either defaults, or as set through `recentSuggestionsConfig` or via Recent Suggestions settings in the control plane). Appbase.io recommends defining a unique id(`userId` property) in `appbaseConfig` prop for each user to personalize the recent searches.

    > Note: Please note that this feature only works when `recordAnalytics` is set to `true` in `appbaseConfig`.

- **recentSuggestionsConfig** `Object` Specify additional options for fetching recent suggestions.

    It can accept the following keys:
    - **size**: `number` Maximum number of recent suggestions to return. Defaults to 5.
    - **minHits**: `number` Return only recent searches that returned at least `minHits` results. There is no default minimum hits-based restriction.
    - **minChars**: `number` Return only recent suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.
    - **index**: `string` Index(es) from which to return the recent suggestions from. Defaults to the entire cluster.
    <br/>

  ```jsx
      <search-box
          :enableRecentSuggestions="true"
          "recentSuggestionsConfig="{
              size: 5,
              minHits: 5,
              minChars: 3,
              index: "good-books-ds",  // further restrict the index to search on
          }"
      />
  ```


-   **aggregationField** `String` [optional]
    One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data). It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
    You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html). You can access `aggregationData` using `render` slot as shown:

    ```html
    <template
    	slot="render"
    	slot-scope="{
            ...
            aggregationData
        }"
    >
    	...
    </template>
    ```

    > If you are using an app with elastic search version less than 6, then defining this prop will result in error and you need to handle it manually using **renderError** slot.

    > It is possible to override this query by providing `customQuery`.

    > Note: This prop has been marked as deprecated starting v1.14.0. Please use the `distinctField` prop instead.

-   **aggregationSize**
    To set the number of buckets to be returned by aggregations.

    > Note: This is a new feature and only available for appbase versions >= 7.41.0.

-   **nestedField** `String` [optional]
    Set the path of the `nested` type under which the `dataField` is present. Only applicable only when the field(s) specified in the `dataField` is(are) present under a [`nested` type](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html) mapping.
-   **title** `String or JSX` [optional]
    set the title of the component to be shown in the UI.
-   **defaultValue** `string` [optional]
    preset the search query text in the search box.
-   **value** `String` | `Array<String>` [optional]
    sets the current value of the component. It sets the search query text (on mount and on update). Use this prop in conjunction with the `change` event.

    > Data type is Array<String> when `mode` prop is set to `tag`.

-   **fieldWeights** `Array` [optional]
    set the search weight for the database fields, useful when dataField is an Array of more than one field. This prop accepts an array of numbers. A higher number implies a higher relevance weight for the corresponding field in the search results.
-   **placeholder** `String` [optional]
    set placeholder text to be shown in the component's input field. Defaults to "Search".
-   **autosuggest** `Boolean` [optional]
    set whether the autosuggest functionality should be enabled or disabled. Defaults to `true`. When set to `false`, it searches as user types, unless `debounce` is also set.
-   **showIcon** `Boolean` [optional]
    whether to display a search or custom icon in the input box. Defaults to `true`.
-   **iconPosition** `String` [optional]
    sets the position of the search icon. Can be set to either `left` or `right`. Defaults to `right`.
-   **icon** `JSX` [optional]
    set a custom search icon instead of the default icon 🔍
-   **showClear** `Boolean` [optional]
    show a clear text `X` icon. Defaults to `true`.
-   **showFilter** `Boolean` [optional]
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
-   **showVoiceSearch** `Boolean` [optional]
    show a voice icon in the searchbox to enable users to set voice input. Defaults to `false`.
-   **showDistinctSuggestions** `Boolean` [optional]
    Show 1 suggestion per document. If set to `false` multiple suggestions may show up for the same document as searched value might appear in multiple fields of the same document, this is true only if you have configured multiple fields in `dataField` prop. Defaults to `true`.
    <br/> <br/>
    **Example** if you have `showDistinctSuggestions` is set to `false` and have following configurations

    ```js
    // Your document:
    {
    	"name": "Warn",
    	"address": "Washington"
    }

    // Component:
    <SearchBox dataField=['name', 'address'] .../>

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

`Note:` Check the above concept in action over [here](https://codesandbox.io/s/musing-allen-qc58z).

- **filterLabel** `String` [optional]
  An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
- **clearIcon** `JSX` [optional]
  set a custom icon for clearing text instead of the default cross.
- **debounce** `Number` [optional]
  set the milliseconds to wait before executing the query. Defaults to `0`, i.e. no debounce.
- **highlight** `Boolean` [optional]
  whether highlighting should be enabled in the returned results.
- **highlightField** `String or Array` [optional]
  when highlighting is enabled, this prop allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to applying highlights on the field(s) specified in the **dataField** prop.
- **customHighlight** `Function` [optional]
  a function which returns the custom [highlight settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html). It receives the `props` and expects you to return an object with the `highlight` key. Check out the <a href="https://opensource.appbase.io/reactivesearch/demos/technews/" target="_blank">technews demo</a> where the `SearchBox` component uses a `customHighlight` as given below,

```html
<template>
	<search-box
		componentId="title"
		highlight="true"
		:dataField="['title', 'text']"
		:customHighlight="getCustomHighlight"
	/>
</template>
<script>
	export default {
		name: 'app',
		methods: {
			getCustomHighlight: props => ({
				highlight: {
					pre_tags: ['<mark>'],
					post_tags: ['</mark>'],
					fields: {
						text: {},
						title: {},
					},
					number_of_fragments: 0,
				},
			}),
		},
	};
</script>
```

- **focusShortcuts** `Array<string | number>` [optional]
  A list of keyboard shortcuts that focus the search box. Accepts key names and key codes. Compatible with key combinations separated using '+'. Defaults to `['/']`.
- **autoFocus** `boolean` [optional] When set to true, search box is auto-focused on page load. Defaults to `false`.
- **expandSuggestionsContainer** `boolean` [optional] When set to false the width of suggestions dropdown container is limited to the width of searchbox input field. Defaults to `true`.
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

- **queryFormat** `String` [optional]
  Sets the query format, can be **or** or **and**. Defaults to **or**.

  - **or** returns all the results matching **any** of the search query text's parameters. For example, searching for "bat man" with **or** will return all the results matching either "bat" or "man".
  - On the other hand with **and**, only results matching both "bat" and "man" will be returned. It returns the results matching **all** of the search query text's parameters.

- **fuzziness** `String or Number` [optional]
  Sets a maximum edit distance on the search parameters, can be **0**, **1**, **2** or **"AUTO"**. Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, **fox** can become **box**. Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html).
  > Note:
  >
  > This prop doesn't work when the value of `queryFormat` prop is set to `and`.
- **innerRef** `Function` [optional]
  The `innerRef` prop along with the `ref` prop can be used to access the reference of the `input` element that can be used to access/manipulate the native events or values for input element. For, an example the below snippet changes the `type` of the `input` element to `search` from the `text`.

```html
<template>
	<search-box
		componentId="BookSensor"
		dataField="['original_title', 'original_title.search']"
		ref="search-box"
		innerRef="input"
	/>
</template>
<script>
	export default {
		name: 'app',
		mounted() {
			this.$refs['search-box'].$children[0].$refs['input'].type = 'search';
		},
	};
</script>
```

- **URLParams** `Boolean` [optional]
  enable creating a URL query string param based on the search query text value. This is useful for sharing URLs with the component state. Defaults to `false`.
- **render** `Function|slot-scope` [optional]
  You can render suggestions in a custom layout by using the `render` as a `prop` or a `slot`.
  <br/>
  It accepts an object with these properties:
  - **`loading`**: `boolean`
    indicates that the query is still in progress.
  - **`error`**: `object`
    An object containing the error info.
  - **`data`**: `array`
    An array of parsed suggestions obtained from the applied query.
  - **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
  - **`resultStats`**: `object`
    An object with the following properties which can be helpful to render custom stats:
    - **`numberOfResults`**: `number`
      Total number of results found
    - **`time`**: `number`
      Time taken to find total results (in ms)
    - **`hidden`**: `number`
      Total number of hidden results found
    - **`promoted`**: `number`
      Total number of promoted results found
  - **`value`**: `string`
    current search input value i.e the search query being used to obtain suggestions.
  - **`downshiftProps`**: `object`
    provides the following control props from `downshift` which can be used to bind list items with click/mouse events.
    - **isOpen** `boolean`
      Whether the menu should be considered open or closed. Some aspects of the downshift component respond differently based on this value (for example, if isOpen is true when the user hits "Enter" on the input field, then the item at the highlightedIndex item is selected).
    - **getItemProps** `function`
      Returns the props you should apply to any menu item elements you render.
    - **getItemEvents** `function`
      Returns the events you should apply to any menu item elements you render.
    - **highlightedIndex** `number`
      The index that should be highlighted.
  - **triggerClickAnalytics**: `object`
    method can be used to register click analytics for suggestions. It accepts two arguments, click position and document ID (required only if you're using `rawData` to render suggestions).

You can use `SearchBox` with `render slot` as shown:

```html
<search-box
	class="result-list-container"
	categoryField="authors.raw"
	componentId="BookSensor"
	:dataField="['original_title', 'original_title.search']"
	:URLParams="true"
>
  <div
		class="suggestions"
		slot="render"
		slot-scope="{
			error,
			loading,
			downshiftProps: { isOpen, highlightedIndex, getItemProps, getItemEvents },
			data: suggestions,
		}"
	>
		<div v-if="loading">loading...</div>
		<ul v-if="isOpen">
			<template v-for="suggestion in suggestions">
				<li
					style="{ background-color: highlightedIndex ? 'grey' : 'transparent' }"
					v-bind="getItemProps({ item: suggestion })"
					v-on="getItemEvents({ item: suggestion })"
					:key="suggestion._id"
				>
					{{ suggestion.label }}
				</li>
			</template>
		</ul>
	</div>
</search-box>
```

Or you can also use render as prop.

```html
<template>
	<search-box :render="render" />
</template>
<script>
	export default {
		name: 'app',
		methods: {
			render({
				error,
				loading,
				downshiftProps: { isOpen, highlightedIndex, getItemProps, getItemEvents },
				data: suggestions,
			}) {...},
		},
	};
</script>
```

- **renderNoSuggestion** `String|slot-scope` [optional]
  can be used to render a message when there are no suggestions found.
- **renderError** `String|Function|slot-scope` [optional]
  can be used to render an error message in case of any error.

```html
<template slot="renderError" slot-scope="error">
	<div>Something went wrong!<br />Error details<br />{{ error }}</div>
</template>
```
- **getMicInstance** `Function` [optional]
  You can pass a callback function to get the instance of `SpeechRecognition` object, which can be used to override the default configurations.
- **renderMic** `String|Function|slot-scope` [optional]
  can be used to render the custom mic option.<br/>
  It accepts an object with the following properties:

  - **`handleClick`**: `function`
    needs to be called when the mic option is clicked.
  - **`status`**: `string`
    is a constant which can have one of these values:<br/>
    `INACTIVE` - mic is in inactive state i.e not listening<br/>
    `STOPPED` - mic has been stopped by the user<br/>
    `ACTIVE` - mic is listening<br/>
    `DENIED` - permission is not allowed<br/>

  ```html
      <template slot="renderMic" slot-scope="{ handleClick, status }">
          <div v-if="status === `ACTIVE`">
              <img src="/active_mic.png" onClick={handleClick} />
          </div>
          <div v-if="status === `DENIED`">
              <img src="/denied_mic.png" onClick={handleClick} />
          </div>
          <div v-if="status === `STOPPED`">
              <img src="/mute_mic.png" onClick={handleClick} />
          </div>
          <div v-if="typeof status === `undefined`">
              <img src="/inactive_mic.png" onClick={handleClick} />
          </div>
      </template>
  ```

- **recentSearchesIcon** `slot-scope` [optional]
  You can use a custom icon in place of the default icon for the recent search items that are shown when `enableRecentSearches` prop is set to true. You can also provide styles using the `recent-search-icon` key in the `innerClass` prop.

      ```html
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

- **popularSearchesIcon** `slot-scope` [optional]
  You can use a custom icon in place of the default icon for the popular searches that are shown when `enablePopularSuggestions` prop is set to true. You can also provide styles using the `popular-search-icon` key in the `innerClass` prop.

      ```html
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

- **addonBefore** `slot-scope` [optional] The HTML markup displayed before (on the left side of) the searchbox input field. Users can use it to render additional actions/ markup, eg: a custom search icon hiding the default.
  <img src="https://i.imgur.com/Lhm8PgV.png" style="margin:0 auto;display:block;"/>

      ```html
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

- **addonAfter** `slot-scope` [optional] The HTML markup displayed before (on the right side of) the searchbox input field. Users can use it to render additional actions/ markup, eg: a custom search icon hiding the default.
  <img src="https://i.imgur.com/upZRx9K.png" style="margin:0 auto;display:block;"/>

      ```html
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

- **distinctField** `String` [optional]
  This prop returns only the distinct value documents for the specified field. It is equivalent to the `DISTINCT` clause in SQL. It internally uses the collapse feature of Elasticsearch. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

- **distinctFieldConfig** `Object` [optional]
  This prop allows specifying additional options to the `distinctField` prop. Using the allowed DSL, one can specify how to return K distinct values (default value of K=1), sort them by a specific order, or return a second level of distinct values. `distinctFieldConfig` object corresponds to the `inner_hits` key's DSL. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

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

    > Note: In order to use the `distinctField` and `distinctFieldConfig` props, the `enableAppbase` prop must be set to true in `ReactiveBase`.

-   **index** `String` [optional]
    The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

    > Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

-   **renderItem** `Function` [optional] 
     You can render each suggestion in a custom layout by using the `renderItem` prop.
    <br/>

```js
    <search-box
        componentId="BookSensor"
        // ...
      >
        <div class="suggestions" slot="renderItem" slot-scope="item">
          👋 &nbsp; {{ item.label }}
        </div>
    </search-box>
```

-   **applyStopwords** `Boolean` When set to true, it would not predict a suggestion which starts or ends with a stopword. You can find the list of stopwords used by Appbase at [here](https://github.com/appbaseio/reactivesearch-api/blob/dev/plugins/querytranslate/stopwords.go).

-   **customStopwords** `Array[String]` It allows you to define a list of custom stopwords. You can also set it through `Index` settings in the control plane.

-   **categoryField** `string` [optional]
    Data field whose values are used to provide category specific suggestions.

-   **enterButton** `boolean` [optional] When set to `true`, the results would only be updated on press of the  button. Defaults to `false`. You can also provide styles using the `enter-button` key in the `innerClass` prop.

    <img src="https://i.imgur.com/8ZoA42b.png" style="margin:0 auto;display:block;"/>

```jsx
 <search-box
    :enterButton="true"        
  >
  // ... other slots
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
            :style="{ border: '1px solid #c3c3c3', cursor: 'pointer' }"
            v-on:click="onClick"
        >
            🔍 Search
        </button>
    </div>
</search-box>
```

- **renderSelectedTags** `slot-scope` [optional] to custom render tags when mode is set to `tag`.
Provides 
It accepts an object with these properties:
  - **`values`**: `Array<String>`
    array of selected values.
  - **`handleClear`**: `Function - (string) => void`
    function to clear a tag value. It accepts the tag value(String) as a parameter.
  - **`handleClearAll`**: `Function - () => void` 
    function to clear all selected values.

```jsx
  <search-box
      ...
      :mode="tag"
      :innerClass="{
         'selected-tag': '...'
      }"
  >
		<div slot="renderSelectedTags" slot-scope="{ values, handleClear, handleClearAll }">
			<button
				style="{ background-color: highlightedIndex ? 'grey' : 'transparent'color: 'green' }"
				v-for="tagValue in values"
				:key="tagValue"
				@click="() => handleClear(tagValue)"
			>
				{{ tagValue }}
			</button>
		</div>
  </search-box>
```


## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/search-box" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`SearchBox` component supports an `innerClass` prop to provide styles to the sub-components of SearchBox. These are the supported keys:

- `title`
- `input`
- `recent-search-icon`
- `popular-search-icon`
- `enter-button`
- `selected-tag`

Read more about it [here](/docs/reactivesearch/vue/theming/ClassnameInjection/).

## Extending

`SearchBox` component can be extended to:

1. customize the look and feel with `className`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `value-change` and `query-change`,
4. specify how search suggestions should be filtered using `react` prop.


```html
<template>
	<search-box
		className="custom-class"
		:customQuery="getCustomQuery"
		:beforeValueChange="handleBeforeValueChange"
		:react="{
            and: ['pricingFilter', 'dateFilter'],
            or: ['searchFilter']
        }"
    @value-change="handleValueChange"
    @query-change="handleQueryChange"
  />
</template>
<script>
	export default {
		name: 'app',
		methods: {
			getCustomQuery: (value, props) => {
				return {
					query: {
						match: {
							data_field: 'this is a test',
						},
					},
				};
			},
			handleBeforeValueChange: value => {
				// called before the value is set
				// returns a promise
				return new Promise((resolve, reject) => {
					// update state or component props
					resolve();
					// or reject()
				});
			},
			handleValueChange: value => {
				console.log('current value: ', value);
				// set the state
				// use the value with other js code
			},
			handleQueryChange: (prevQuery, nextQuery) => {
				// use the query with other js code
				console.log('prevQuery', prevQuery);
				console.log('nextQuery', nextQuery);
			},
		},
	};
</script>
```

- **className** `String`
  CSS class to be injected on the component container.
- **customQuery** `Function`
  takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
  `Note:` customQuery is called on value changes in the **SearchBox** component as long as the component is a part of `react` dependency of at least one other component.
- **defaultQuery** `Function`
  is a callback function that takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components. In simple words, `defaultQuery` prop allows you to modify the query to render the suggestions when `autoSuggest` is enabled.
  Read more about it [here](/docs/reactivesearch/vue/advanced/CustomQueries/#when-to-use-default-query).
- **beforeValueChange** `Function`
  is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

  > Note:
  >
  > If you're using Reactivesearch version >= `1.1.0`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

  ```js
  beforeValueChange = value => {
      // The update is accepted by default
  	if (value && value.toLowerCase().contains('Social')) {
  		// To reject the update, throw an error
  		throw Error('Search value should not contain social.');
  	}
  };
  ```

- **react** `Object`
  specify dependent components to reactively update **SearchBox's** suggestions.
  - **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    - **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    - **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    - **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
  - **value** `String or Array or Object`
    - `String` is used for specifying a single component by its `componentId`.
    - `Array` is used for specifying multiple components by their `componentId`.
    - `Object` is used for nesting other key clauses.

## Events

- **change** `function` [optional]
  is an event that accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This event is useful to control the value updates of search input.

  ```jsx
  <template>
      <search-box
          value="value"
          @change="handleChange"
      />
  </template>

  <script>
  export default {
    name: 'app',
      data() {
          return {
              value: ""
          }
      },
      methods: {
          handleChange(value, triggerQuery, event) {
              this.value = value;
              // Trigger the search query to update the dependent components
              triggerQuery({
                isOpen: false // To close the suggestions dropdown; optional
              })
          }
      }
  };
  </script>
  ```

> Note:
>
> If you're using the controlled behavior than it's your responsibility to call the `triggerQuery` method to update the query i.e execute the search query and update the query results in connected components by `react` prop. It is not mandatory to call the `triggerQuery` in `onChange` you can also call it in other input handlers like `onBlur` or `onKeyPress`. The `triggerQuery` method accepts an object with `isOpen` property (default to `false`) that can be used to control the opening state of the suggestion dropdown.

- **query-change**
  is an event which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This event is handy in cases where you want to generate a side-effect whenever the component's query would change.
- **value-change**
  is an event which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This event is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a list item is selected in a "Discounted Price" SingleList.
- **value-selected**
  is called when a search is performed either by pressing **enter** key or the input is blurred.

- **on-data**
  gets triggered when either of  data, rawData, aggregationData, loading and error changes. You can use a callback function to listen for the changes. The function receives `data`, `rawData`, `aggregationData`, `loading` and `error` as a single parameter object.
```html
    <search-box
        componentId="BookSensor"
        // ... other props ...
        @on-data="(param) => { // do something }"
    />
```  

- **error**
  gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.

The following events to the underlying `input` element:

- **blur**
- **focus**
- **key-press**
- **key-down**
- **key-up**


> Note:
>
> 1. All these events accepts the `triggerQuery` as a second parameter which can be used to trigger the `SearchBox` query with the current selected value (useful to customize the search query execution).
> 2. There is a known [issue](https://github.com/appbaseio/reactivesearch/issues/1087) with `key-press` when `autosuggest` is set to true. It is recommended to use `key-down` for the consistency.

## Examples

<a href="https://reactivesearch-vue-playground.netlify.com/?selectedKind=Search%20Components%2FSearchBox&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0" target="_blank">SearchBox with default props</a>
