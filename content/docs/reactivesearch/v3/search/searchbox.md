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
nestedSidebar: 'web-reactivesearch'
---

![Searchbox image](https://i.imgur.com/EGQTmNY.png)

`SearchBox` creates a search box UI component that is connected to one or more database fields. A `SearchBox` queries the appbase.io backend with query type `suggestion` to render different kind of suggestions, read more about the `suggestion` query type [here](https://docs.appbase.io/docs/search/reactivesearch-api/implement/#suggestion).


Example uses:

-   Searching for a rental listing by its `name` or `description` field.
-   Creating an e-commerce search box for finding products by their listing properties.
-   Creating a product catalog search based on different categories.

## Usage

### Basic Usage
```jsx
<SearchBox 
    componentId="SearchBoxSensor" 
    dataField={['group_venue', 'group_city']} 
/>
```

### Usage With All Props
```jsx
    <SearchBox
        componentId="SearchBoxSensor"
        dataField={[
            {
                "field": "group_venue",
                "weight": 1
            },
            {
                "field": "group_city",
                "weight": 3
            }
        ]}
        title="Search"
        mode="tag" // accepts either of 'select' or 'tag', defaults to 'select'
        defaultValue="Songwriting"
        placeholder="Search for cities or venues"
        autosuggest={true}
        highlight={true}
        highlightField="group_city"
        queryFormat="or"
        fuzziness={0}
        debounce={100}
        react={{
            and: ['CategoryFilter', 'SearchFilter'],
        }}
        size={10}
        showFilter={true}
        filterLabel="Venue filter"
        URLParams={false}
        enableRecentSuggestions={true}
        enablePopularSuggestions={true}
        enablePredictiveSuggestions={true}
        popularSuggestionsConfig={{
            size: 3, 
            minHits: 2, 
            minChars: 4,
            index: "" // optional index value to fetch recentsuggestions related to
        }}
        recentSuggestionsConfig={{
            size: 3, 
            minChars: 4, 
            index: "" // optional index value to fetch recentsuggestions related to
        }}
        applyStopwords={true}
        customStopwords={['be','or','hi']}
        onData = {({
            data,
            rawData,
            aggregationData,
            loading,
            error
        }) =>{
                // do something with the updated properties
        }}
        renderItem={(suggestion)=>{
            return <span>{suggestion.label}</span> // custom render every suggestion item in dropdown
        }}
        renderNoSuggestion="No suggestions found"
        endpoint={{
            url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
            headers:{
                // relevant headers
            },
            method: 'POST'
        }}            
    />
```

## Props

### componentId

| Type | Optional |
|------|----------|
|  `String`  |    No    |

unique identifier of the component, can be referenced in other components' `react` prop.

### endpoint

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

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

### mode

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

SearchBox component offers two modes of usage, `select` & `tag`. When mode is set to `tag` SearchBox allows selecting multiple suggestions. Defaults to `select`.

```jsx
<SearchBox
    componentId="searchSensor"
    // ... other props
    mode="tag"
/>
```    

### dataField

| Type | Optional |
|------|----------|
|  `string \| Array<string \| DataField*>`  |    No    |

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
### size

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

number of suggestions to show. Defaults to `10`.
### aggregationField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

One of the most important use-cases this enables is showing `DISTINCT` results (useful when you are dealing with sessions, events and logs type data). It utilizes `composite aggregations` which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.
You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html). You can access `aggregationData` using render prop as shown:

```jsx
<SearchBox
    aggregationField="original_title.keyword"
    render={({aggregationData}) => {...}}
/>
```

> If you are using an app with elastic search version less than 6, than defining this prop will result in error and you need to handle it manually using **renderError** prop.

> It is possible to override this query by providing `defaultQuery` or `customQuery`.

> Note: This prop has been marked as deprecated starting v3.18.0. Please use the `distinctField` prop instead.

### aggregationSize
To set the number of buckets to be returned by aggregations.

> Note: This is a new feature and only available for appbase versions >= 7.41.0.
### nestedField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Set the path of the `nested` type under which the `dataField` is present. Only applicable only when the field(s) specified in the `dataField` is(are) present under a [`nested` type](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html) mapping.
### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |

set the title of the component to be shown in the UI.
### defaultValue

| Type | Optional |
|------|----------|
|  `String` or `Array<String>` |   Yes   |

set the initial search query text on mount.

> Data type is Array<String> when `mode` prop is set to `tag`.

### value

| Type | Optional |
|------|----------|
|  `String` or `Array<String>` |   Yes   |

sets the current value of the component. It sets the search query text (on mount and on update). Use this prop in conjunction with the `onChange` prop.

> Data type is Array<String> when `mode` prop is set to `tag`.

### enableSynonyms

| Type | Optional |
|------|----------|
|  `bool` |   Yes   |

Defaults to `true`, can be used to `disable/enable` the synonyms behavior for the search query. Read more about it [here](/docs/search/reactivesearch-api/reference/#enablesynonyms)
> Note:
>
> This property only works with [ReactiveSearch API](/docs/search/reactivesearch-api/) i.e when `enableAppbase` is set to `true` in `ReactiveBase` component.

### enableIndexSuggestions

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `true`. When set to `false`, index suggestions are not returned from the backend.

### indexSuggestionsConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

Specify additional options for fetching featured suggestions.

It can accept the following keys:
### sectionLabel:

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

custom html markup for section title.
### size:

| Type | Optional |
|------|----------|
|  `number` |   Yes   |

Maximum number of popular suggestions to return. Defaults to 5.
### index:

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

Index(es) from which to return the popular suggestions from. Defaults to the entire cluster.

<br/>

```jsx
    <SearchBox
        enableIndexSuggestions={true}
        indexSuggestionsConfig={{
            sectionLabel: '<h3>Index suggestions</h3>',
            size: 5,
            index: "good-books-ds",  // further restrict the index to search on
        }}
    />
```


### enablePopularSuggestions

| Type | Optional |
|------|----------|
|  `bool` |   Yes   |

    Defaults to `false`. When set to `true`, popular searches are returned as suggestions as per the popular suggestions config (either defaults, or as set through `popularSuggestionsConfig` or via Popular Suggestions settings in the control plane). Read more about it over [here](/docs/analytics/popular-recent-suggestions/).

    > Note:
    >
    > Popular Suggestions only work when `enableAppbase` prop is `true`.

### popularSuggestionsConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

Specify additional options for fetching popular suggestions.
It can accept the following keys:
- size: `number` Maximum number of popular suggestions to return. Defaults to 5.
- minCount: `number` Return only popular suggestions that have been searched at least `minCount` times. There is no default minimum count-based restriction.
- minChars: `number` Return only popular suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.
- showGlobal: `Boolean` Defaults to `true`. When set to `false`, returns popular suggestions only based on the current user's past searches.
- index: `string` Index(es) from which to return the popular suggestions from. Defaults to the entire cluster.
- sectionLabel: `string` custom html markup for section title.    
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
            sectionLabel: '<h3>Popular suggestions</h3>'
        }}
    />
```

### enableRecentSuggestions

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `false`. When set to `true`, recent searches are returned as suggestions as per the recent suggestions config (either defaults, or as set through `recentSuggestionsConfig` or via Recent Suggestions settings in the control plane).

> Note: Please note that this feature only works when `recordAnalytics` is set to `true` in `appbaseConfig`.
### recentSuggestionsConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

Specify additional options for fetching recent suggestions.

It can accept the following keys:
- size: `number` Maximum number of recent suggestions to return. Defaults to 5.
- minHits: `number` Return only recent searches that returned at least `minHits` results. There is no default minimum hits-based restriction.
- minChars: `number` Return only recent suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.
- index: `string` Index(es) from which to return the recent suggestions from. Defaults to the entire cluster.
- sectionLabel: `string` custom html markup for section title.        
<br/>

```jsx
    <SearchBox
        enableRecentSuggestions={true}
        recentSuggestionsConfig={{
            size: 5,
            minHits: 5,
            minChars: 3,
            index: "good-books-ds",  // further restrict the index to search on
            sectionLabel: '<h3>Index suggestions</h3>' 
        }}
    />
```

### enableFeaturedSuggestions

| Type | Optional |
|------|----------|
|  `bool` |   Yes   |

Defaults to `false`. When set to `true`, featured suggestions are returned as suggestions as per the featured suggestions config (either defaults, or as set through `featuredSuggestionsConfig` or via Featured Suggestions settings in the control plane). Read more about it over [here](/docs/analytics/popular-recent-suggestions/).


> Featured suggestions allow creating autocomplete experiences with user-defined suggestions. They're specified using the [Featured Suggestions API](https://api.reactivesearch.io/#337cdab6-d06c-4319-8c51-51e9ff0c1266), introduced in 8.1.0. This is a beta API and subject to change.

### featuredSuggestionsConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

Specify additional options for fetching featured suggestions.

It can accept the following keys:
- featuredSuggestionsGroupId: `string` [Required] unique id for featured suggestions' group.
- maxSuggestionsPerSection: `number` maximum number of featured suggestions fetched per section.
- sectionsOrder: `Array<String>` accepts an array of section id(s). The order in which section id(s) are defined in the array describes the order in which the sections appear in the UI.

<br/>

```jsx
    <SearchBox
        enableFeaturedSuggestions={true}
        featuredSuggestionsConfig={{
            featuredSuggestionsGroupId: 'document-search', // # mandatory
            maxSuggestionsPerSection: 10,    
            sectionsOrder: ['document', 'pages', 'help'], 
        }}
    />
```


### enablePredictiveSuggestions

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `false`. When set to `true`, it predicts the next relevant words from a field's value based on the search query typed by the user. When set to false (default), the matching document field's value would be displayed.

### downShiftProps

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

allow passing props directly to the underlying `Downshift` component. You can read more about Downshift props [here](https://github.com/paypal/downshift#--downshift-------).
### fieldWeights <mark color="yellow">[deprecated]</mark>

| Type | Optional |
|------|----------|
|  `Array` |   Yes   |

set the search weight for the database fields, useful when dataField is an Array of more than one field. This prop accepts an array of numbers. A higher number implies a higher relevance weight for the corresponding field in the search results.
> Note: The `fieldWeights` property has been marked as deprecated in <b>v3.21.0</b> of ReactiveSearch and <b>v7.47.0</b> of Appbase and would be removed in the next major release. We recommend you to use the [dataField](/docs/search/reactivesearch-api/reference/#datafield) property to define the weights.

### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

set placeholder text to be shown in the component's input field. Defaults to "Search".
### type

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

set the searchbox input field type attribute.
### showIcon

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to display a search or custom icon in the input box. Defaults to `true`.
### iconPosition

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

sets the position of the search icon. Can be set to either `left` or `right`. Defaults to `right`.
### icon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

set a custom search icon instead of the default 🔍
### showClear

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show a clear text `X` icon. Defaults to `false`.
### clearIcon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

allows setting a custom icon for clearing text instead of the default cross.
### autosuggest

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

set whether the autosuggest functionality should be enabled or disabled. Defaults to `true`.
### strictSelection

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

defaults to `false`. When set to `true` the component will only set its value and fire the query if the value was selected from the suggestion. Otherwise the value will be cleared on selection. This is only relevant with `autosuggest`.
### debounce

| Type | Optional |
|------|----------|
|  `Number` |   Yes   |

set the milliseconds to wait before executing the query. Defaults to `0`, i.e. no debounce.
### highlight

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether highlighting should be enabled in the returned results.
### highlightField

| Type | Optional |
|------|----------|
|  `String or Array` |   Yes   |

when highlighting is enabled, this prop allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to applying highlights on the field(s) specified in the **dataField** prop.
### customHighlight

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

a function which returns the custom [highlight settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html). It receives the `props` and expects you to return an object with the `highlight` key. Check out the <a href="https://opensource.appbase.io/reactivesearch/demos/technews/" target="_blank">technews demo</a> where the `SearchBox` component uses a `customHighlight` as given below,

```jsx
    <SearchBox
        componentId="BookSensor"
        dataField={[{field: "name", weight:3 }, {field: "name.search", weight:1 }]}
        highlight
        customHighlight={props => ({
        highlight: {
                pre_tags: ['<mark>'],
                post_tags: ['</mark>'],
                fields: {
                    text: {},
                    title: {},
                },
                number_of_fragments: 0,
            },
        })}
    />
```

### queryFormat

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Sets the query format, can be **or** or **and**. Defaults to **or**.

- or returns all the results matching **any** of the search query text's parameters. For example, searching for "bat man" with **or** will return all the results matching either "bat" or "man".
-   On the other hand with **and**, only results matching both "bat" and "man" will be returned. It returns the results matching **all** of the search query text's parameters.

### fuzziness

| Type | Optional |
|------|----------|
|  `String or Number` |   Yes   |

Sets a maximum edit distance on the search parameters, can be **0**, **1**, **2** or **"AUTO"**. Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, **fox** can become **box**. Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html).
> Note:
>
> This prop doesn't work when the value of `queryFormat` prop is set to `and`.
### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show as filter when a value is selected in a global selected filters view. Defaults to `true`.
### showDistinctSuggestions

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Show 1 suggestion per document. If set to `false` multiple suggestions may show up for the same document as searched value might appear in multiple fields of the same document, this is true only if you have configured multiple fields in `dataField` prop. Defaults to `true`.
<br/> <br/>
**Example** if you have `showDistinctSuggestions`  is set to `false` and have following configurations

```jsx
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

`Note:` Check the above concept in action over [here](https://codesandbox.io/s/musing-allen-qc58z).

### showVoiceSearch

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show a voice icon in the searchbox to enable users to set voice input. Defaults to `false`.
### searchOperators

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `false`. If set to `true` than you can use special characters in the search query to enable an advanced search behavior.<br/>
Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html).
### queryString

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Defaults to `false`. If set to `true` than it allows you to create a complex search that includes wildcard characters, searches across multiple fields, and more. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html).
### filterLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

enable creating a URL query string param based on the search query text value. This is useful for sharing URLs with the component state. Defaults to `false`.
### excludeFields

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |

fields to be excluded in the suggestion's query when `autoSuggest` is true.
### includeFields

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |

fields to be included in the suggestion's query when `autoSuggest` is true.
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can render suggestions in a custom layout by using the `render` prop.

It accepts an object with these properties:
-   **`loading`**: `boolean`
    indicates that the query is still in progress.
-   **`error`**: `object`
    An object containing the error info.
-   **`data`**: `array`
    An array of suggestions obtained from cobtained as a result of `suggestion` type query.
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
-   **`resultStats`**: `object`
    An object with the following properties which can be helpful to render custom stats:
    -   **`numberOfResults`**: `number`
        Total number of results found
    -   **`time`**: `number`
        Time taken to find total results (in ms)
    -   **`hidden`**: `number`
        Total number of hidden results found
    -   **`promoted`**: `number`
        Total number of promoted results found
-   **`value`**: `string`
    current search input value i.e the search query being used to obtain suggestions.
-   **`downshiftProps`**: `object`
    provides all the control props from `downshift` which can be used to bind list items with click/mouse events.
    Read more about it [here](https://github.com/downshift-js/downshift#children-function).

```jsx
    <SearchBox
        render={({ 
            loading, 
            error, 
            data, 
            value, 
            downshiftProps: { isOpen, getItemProps } 
            }) => {
                if (loading) {
                    return <div>Fetching Suggestions.</div>;
                }
                if (error) {
                    return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
                }
                return isOpen && Boolean(value.length) ? (
                    <div>
                        {data.map((suggestion, index) => (
                            <div key={suggestion.value} {...getItemProps({ item: suggestion })}>
                                {suggestion.value}
                            </div>
                        ))}
                        {Boolean(value.length) && (
                            <div {...getItemProps({ item: { label: value, value: value } })}>
                                Show all results for "{value}"
                            </div>
                        )}
                    </div>
                ) : null;
        }}
    />
```

Or you can also use render function as children

```jsx
    <SearchBox>
        {
            ({
                loading,
                error,
                data,
                rawData,
                value,
                downshiftProps
            }) => (
                // return UI to be rendered
            )
        }
    </SearchBox>
```

### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can be used to render an error message in case of any error.

```jsx
    renderError={(error) => (
            <div>
                Something went wrong!<br/>Error details<br/>{error}
            </div>
        )
    }
```

### renderNoSuggestion

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can be used to render a message when there is no suggestions found.

```jsx
    renderNoSuggestion={() => (
            <div>
                No suggestions found
            </div>
        )
    }
```

### getMicInstance

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function to get the instance of `SpeechRecognition` object, which can be used to override the default configurations.
### renderMic

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can we used to render the custom mic option.<br/>
It accepts an object with the following properties:
-   **`handleClick`**: `function`
    needs to be called when the mic option is clicked.
-   **`status`**: `string`
    is a constant which can have one of these values:<br/>
    `INACTIVE` - mic is in inactive state i.e not listening<br/>
    `STOPPED` - mic has been stopped by the user<br/>
    `ACTIVE` - mic is listening<br/>
    `DENIED` - permission is not allowed<br/><br/>

```jsx
    renderMic = {({ handleClick, status }) => {
        switch(status) {
            case 'ACTIVE':
                return <img src="/active_mic.png" onClick={handleClick} />
            case 'DENIED':
            case 'STOPPED':
                return <img src="/mute_mic.png" onClick={handleClick} />
            default:
                return <img src="/inactive_mic.png" onClick={handleClick} />
        }
    }}
```

### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms.html/#controlled-components) behavior.

```jsx
    <SearchBox
        value={this.state.value}
        onChange={(value, triggerQuery, event) => {
            this.setState(
                {
                    value,
                },
                () => triggerQuery(),
            );
        }}
    />
```

> Note:
>
> If you're using the controlled behavior than it's your responsibility to call the `triggerQuery` method to update the query i.e execute the search query and update the query results in connected components by `react` prop. It is not mandatory to call the `triggerQuery` in `onChange` you can also call it in other input handlers like `onBlur` or `onKeyPress`. The `triggerQuery` method accepts an object with `isOpen` property (default to `false`) that can be used to control the opening state of the suggestion dropdown.

### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function to listen for the changes in suggestions. The function receives `data`, `rawData`, `aggregationData`, `loading` and `error` as a single parameter object.

```jsx
    <SearchBox
        componentId="BookSensor"
        // ... other props ...
        onData = {({
            data,
            rawData,
            aggregationData,
            loading,
            error
        }) =>{
                // do something with the updated properties
        }}
    />
```

### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function that gets triggered in case of an error and provides the `error` object which can be used for debugging or giving feedback to the user if needed.


### recentSearchesIcon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

You can use a custom icon in place of the default icon for the recent search items that are shown when `enableRecentSearches` prop is set to true. You can also provide styles using the `recent-search-icon` key in the `innerClass` prop.

```jsx
    <SearchBox
        // ... other props
        enableRecentSuggestions
        innerClass={{
            'recent-search-icon': '...',
        }}
        recentSearchesIcon={<RecentIcon />}
    />
```

### popularSearchesIcon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

You can use a custom icon in place of the default icon for the popular searches that are shown when `enablePopularSuggestions` prop is set to true. You can also provide styles using the `popular-search-icon` key in the `innerClass` prop.

```jsx
    <SearchBox
        // ... other props
        enablePopularSuggestions
        innerClass={{
            'popular-search-icon': '...'
        }}
        popularSearchesIcon={<PopularIcon />}
    />
```

### distinctField

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

This prop returns only the distinct value documents for the specified field. It is equivalent to the `DISTINCT` clause in SQL. It internally uses the collapse feature of Elasticsearch. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).


### distinctFieldConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

This prop allows specifying additional options to the `distinctField` prop. Using the allowed DSL, one can specify how to return K distinct values (default value of K=1), sort them by a specific order, or return a second level of distinct values. `distinctFieldConfig` object corresponds to the `inner_hits` key's DSL.  You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

```jsx
    <SearchBox
        //....
        distinctField="authors.keyword"
        distinctFieldConfig={{
            inner_hits: {
                name: 'most_recent',
                size: 5,
                sort: [{ timestamp: 'asc' }],
            },
            max_concurrent_group_searches: 4,
        }}
    />
```

> Note: In order to use the `distinctField` and `distinctFieldConfig` props, the `enableAppbase` prop must be set to true in `ReactiveBase`.

### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can render each suggestion in a custom layout by using the `renderItem` prop.

```jsx
    <SearchBox
        {...props}
        componentId="BookSensor"
        renderItem={
            (suggestion)=>{
                // custom render every suggestion item in dropdown
                return <span>{suggestion.label}</span> 
            }
        }
    />
```

### applyStopwords

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

When set to true, it would not predict a suggestion which starts or ends with a stopword. You can find the list of stopwords used by Appbase at [here](https://github.com/appbaseio/reactivesearch-api/blob/dev/plugins/querytranslate/stopwords.go).

### customStopwords

| Type | Optional |
|------|----------|
|  `Array[String]` |   Yes   |

It allows you to define a list of custom stopwords. You can also set it through `Index` settings in the control plane.

### categoryField

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

Data field whose values are used to provide category specific suggestions.

## Demo

<br />

<!-- Example will be added once the implementation PR is merged -->
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/SearchBox" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`SearchBox` component supports an `innerClass` prop to provide styles to the sub-components of SearchBox. These are the supported keys:

-   `title`
-   `input`
-   `list`
-   `recent-search-icon`
-   `popular-search-icon`
-   `featured-search-icon`
-   `section-label`
-   `active-suggestion-item`
-   `suggestion-item`
-   `enter-button`
-   `selected-tag`

Read more about it [here](/docs/reactivesearch/v3/theming/classnameinjection/).

## Extending

`SearchBox` component can be extended to:

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange`, `onValueSelected` and `onQueryChange`,
4. specify how search suggestions should be filtered using `react` prop,


-   it's also possible to take control of rendering individual suggestions with `renderItem` prop or the entire suggestions rendering using the `render` prop. Check the [custom suggestions](/docs/reactivesearch/v3/advanced/customsuggestions/) recipe for more info.

6. add the following [synthetic events](https://reactjs.org/events.html) to the underlying `input` element:

    - onBlur
    - onFocus
    - onKeyPress
    - onKeyDown
    - onKeyUp
    - autoFocus

    > Note:
    >
    > 1. All these events accepts the `triggerQuery` as a second parameter which can be used to trigger the `SearchBox` query with the current selected value (useful to customize the search query execution).
    > 2. There is a known [issue](https://github.com/appbaseio/reactivesearch/issues/1087) with `onKeyPress` when `autosuggest` is set to true. It is recommended to use `onKeyDown` for the consistency.

    ```js
    <SearchBox
    //...
    className="custom-class"
    style={{"paddingBottom": "10px"}}
    customQuery={
        function(value, props) {
        return {
            query: {
                match: {
                    data_field: "this is a test"
                }
            }
        }
        }
    }
    beforeValueChange={
        function(value) {
        // called before the value is set
        // returns a promise
        return new Promise((resolve, reject) => {
            // update state or component props
            resolve()
            // or reject()
        })
        }
    }
    onValueChange={
        function(value) {
        console.log("current value: ", value)
        // set the state
        // use the value with other js code
        }
    }
    onValueSelected={
        function(value, cause, source) {
        console.log("current value: ", value)
        }
    }
    onQueryChange={
        function(prevQuery, nextQuery) {
        // use the query with other js code
        console.log('prevQuery', prevQuery);
        console.log('nextQuery', nextQuery);
        }
    }
    // specify how and which suggestions are filtered using `react` prop.
    react={
        "and": ["pricingFilter", "dateFilter"],
        "or": ["searchFilter"]
    }
    />
    ```

### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### style

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

CSS styles to be applied to the **SearchBox** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **SearchBox** component as long as the component is a part of `react` dependency of at least one other component.
### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function that takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components. In simple words, `defaultQuery` prop allows you to modify the query to render the suggestions when `autoSuggest` is enabled.
Read more about it [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).
### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

> Note:
>
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

```js
beforeValueChange = value => {
    // The update is accepted by default
    if (value && value.toLowerCase().contains('Social')) {
        // To reject the update, throw an error
        throw Error('Search value should not contain social.');
    }
};
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a user searches for a product in a SearchBox.
### onValueSelected

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is called with the value selected via user interaction. It works only with `autosuggest` and is called whenever a suggestion is selected or a search is performed by pressing **enter** key. It also passes the `cause` of action and the `source` object if the cause of action was `'SUGGESTION_SELECT'`. The possible causes are:
-   `'SUGGESTION_SELECT'`
-   `'ENTER_PRESS'`
-   `'CLEAR_VALUE'`
-   `'SEARCH_ICON_CLICK'`
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

specify dependent components to reactively update **SearchBox's** suggestions.
-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.
### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

> Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.
### focusShortcuts

| Type | Optional |
|------|----------|
|  `Array<string | number>` |   Yes   |

A list of keyboard shortcuts that focus the search box. Accepts key names and key codes. Compatible with key combinations separated using '+'. Defaults to `['/']`.
### autoFocus

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

When set to true, search box is auto-focused on page load. Defaults to `false`.


### addonBefore

| Type | Optional |
|------|----------|
|  `string|JSX` |   Yes   |

The HTML markup displayed before (on the left side of) the searchbox input field. Users can use it to render additional actions/ markup, eg: a custom search icon hiding the default.
<img src="https://i.imgur.com/15fnDsj.png" style="margin:0 auto;display:block;"/>

```jsx
    <SearchBox
        showIcon={false}
        addonBefore={
        <img
            src="https://img.icons8.com/cute-clipart/64/000000/search.png"
            height="30px"
        />
        }
        id="search-component"
        // ...other props
    />
```


### addonAfter

| Type | Optional |
|------|----------|
|  `string|JSX` |   Yes   |

The HTML markup displayed after (on the right side of) the searchbox input field. Users can use it to render additional actions/ markup, eg: a custom search icon hiding the default.

<img src="https://i.imgur.com/MbtXwfU.png" style="margin:0 auto;display:block;"/>

```jsx
    <SearchBox
        showIcon={false}
        addonAfter={
        <img
            src="https://img.icons8.com/cute-clipart/64/000000/search.png"
            height="30px"
        />
        }
        id="search-component"
        // ... other props
    />
```

### expandSuggestionsContainer

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

When set to false the width of suggestions dropdown container is limited to the width of searchbox input field. Defaults to `true`.
<img src="https://i.imgur.com/3ADhMSQ.png" style="margin:0 auto;display:block;"/>

```jsx
    <SearchBox
        expandSuggestionsContainer={false}
        addonBefore={
            <img  />
        }
        addonAfter={
            <img  />
        }
        id="search-component"
        // ... other props
    />
```

### isOpen

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

When set to `true` the dropdown is displayed on the initial render. Defaults to `false`.

### enterButton

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

When set to `true`, the results would only be updated on press of the  button. Defaults to `false`. You can also provide styles using the `enter-button` key in the `innerClass` prop.

<img src="https://i.imgur.com/8ZoA42b.png" style="margin:0 auto;display:block;"/>

```jsx
    <SearchBox            
        id="search-component"
        enterButton={true}
    />
```
### renderEnterButton

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

renders a custom jsx markup for the enter button. Use in conjunction with `enterButton` prop set to `true`.

<img src="https://i.imgur.com/dRykMOg.png" style="margin:0 auto;display:block;"/>

```jsx
    <SearchBox
        id="search-component"
        enterButton
        renderEnterButton={clickHandler => (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                }}
            >
                <button style={{ border: '1px solid #c3c3c3' }} onClick={clickHandler}>
                    🔍 Search
                </button>
            </div>
        )}
    />
```

### renderSelectedTags

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

to custom render tags when mode is set to `tag`.

Function param accepts an object with the following properties:
- **`values`**: `Array<String>`
array of selected values.
- **`handleClear`**: `Function - (string) => void`
function to clear a tag value. It accepts the tag value(String) as a parameter.

- **`handleClearAll`**: `Function - () => void` 
function to clear all selected values.

```jsx
    <SearchBox
        id="search-component"
        enterButton
        renderSelectedTags={({ 
            values = [], 
            handleClear, 
            handleClearAll }) => {
                // return custom rendered tags 
            }
        }
    />
```


## Examples

### SearchBox with default props
<a href="https://opensource.appbase.io/playground/?selectedKind=Search%20components%2FSearchBox" target="_blank">SearchBox with default props</a>


### Customize suggestions using innerClass
<img src="https://i.imgur.com/nmFY3Ha.png" style="margin:0 auto;display:block;"/>

```jsx
	<SearchBox
	    title="SearchBox"
	    dataField={['original_title', 'original_title.search']}
	    componentId="BookSensor"
	    innerClass={{
            'section-label': 'section-label',
	    	'active-suggestion-item': 'active-test-suggestion',
	    	'suggestion-item': 'test-suggestion',
	    }}
	    enableFeaturedSuggestions
    />
```

Inside your css file ->

```css
.section-label {
	font-weight: 800;
	font-size: 14px;
	text-decoration: overline;
}

.active-test-suggestion {
	border-left: 6px solid #ffa000;
	background-color: #6629ea !important;
	border-radius: 4px;
	margin: 3px;
}

.test-suggestion {
	background-color: #f0e1e1 !important;
	border-radius: 4px;
	margin: 3px;
}

```
