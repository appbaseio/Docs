---
title: 'API Reference'
meta_title: 'API Reference for Algolia Autocomplete'
meta_description: '`@appbaseio/autocomplete-suggestions-plugin` is a Suggestions plugin that adds **Query Suggestions** powered by [appbase-js](https://www.npmjs.com/package/appbase-js) client, to your autocomplete. It also provides rich customisations of UI supported by [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/)'
keywords:
    - api-reference
    - autocomplete-suggestions-plugin
    - search-ui
    - suggestions
    - autocomplete-js
sidebar: 'docs'
nestedSidebar: 'autocomplete-plugin'
---

The `@appbaseio/autocomplete-suggestions-plugin` is a Suggestions plugin that adds **Query Suggestions** powered by [appbase-js](https://www.npmjs.com/package/appbase-js) client, to your autocomplete. It also provides rich customisations of UI supported by [autocomplete-js](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/).



### API Definition

The `@appbaseio/autocomplete-suggestions-plugin` comes with a rich API to customize the search experience.

The `createSuggestionsPlugin()` function accepts three parameters, and returns a plugin object accepted by the `autocomplete-js`.

```
createSuggestionsPlugin(
	appbaseClientConfig,
	queryConfig,
	renderConfig,
) => { // plugin object } 
```

1. **appbaseClientConfig `Object` `Required`**
    
    It is the first parameter accepted by `createSuggestionsPlugin()`, used for connecting to the **appbase client.**  It accepts the following properties:
        
    - **enableTelemetry** `Boolean`when set to `false`, it disables telemetry. Defaults to `true`.
    - **settings** `Object` an object consisting of the properties to control your search experience. Read more [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference/#settings-properties).

    | Property     | Type | Required | Description |
    | -------- | --------------------------- | -------- |------|
    | url | `String`                      | `true`    | Appbase.io cluster URL.  |
    | app | `String`                      | `true`    | appbase.io search index name as displayed in the dashboard.  |
    | username | `String`                      | `false`    | username as displayed in the [access control dashboard](https://docs.appbase.io/docs/security/credentials/).  |
    | password | `String`                      | `false`    | password as displayed in the [access control dashboard](https://docs.appbase.io/docs/security/credentials/).  |
    | credentials | `String`                      | `true`<sup>*</sup>    | `String` `Required` API key to access the cluster. `credentials` are not required if, `url` already contains it.  |
    | enableTelemetry | `Boolean`                      | `false`    | when set to `false`, it disables telemetry. Defaults to `true`.  |
    | settings | `Object`                      | `false`    | an object consisting of the properties to control your search experience. Read more [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference/#settings-properties).  |
    <br/>
2. **queryConfig `Object` `Required`**
    
    It is an object representing a ReactiveSearch [suggestion query](https://docs.appbase.io/docs/search/reactivesearch-api/implement#suggestion). Read about the properties accepted in this object [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference/#query-properties).

    <br/>
    
3. **renderConfig `Object`**
    
    Although the plugin already comes with a default UI interface, One can customize the UI/ UX according to their needs using the **renderConfig** object**.**
    
    It accepts the following properties:
    
    - **renderItem `Function`**
        
        It is a callback that accepts parameters [API ref](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-onselect), one of them is the suggestion item itself, utilize it to render a custom UI for every suggestion.

        ```jsx
        createSuggestionsPlugin(
            ...,
            ...,
            {
                renderItem: (props) => {
                    const { item, setQuery, refresh } = props;
                    if (item.type === "index") {
                    return (
                        <a
                        className="aa-item product-item"
                        href={item._source.url}
                        target="_blank"
                        rel="noreferrer"
                        >
                            <div className="product-image">
                            <img src={item._source.image} alt={item.value} />
                            </div>
                            <div className="product-details">
                                <h4>{item.value}</h4>
                                <p>{item._source.shortDescription}</p>
                            </div>
                        </a>
                        );
                    }
                },
            }
        )
        ``` 
        
    - **onItemSelect `Function`**
        
        It is a callback that accepts parameters [API ref](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-algolia-insights/createAlgoliaInsightsPlugin/#param-onselect), one of them is the `setQuery` function, utilize it to customize the behavior of what happens when an individual suggestion item is clicked.

        ```jsx
        createSuggestionsPlugin(
            ...,
            ...,
            {
                renderItem: (props) => {
                    ...
                },
                onItemSelect: (props) => {
                    const {
                        item: { url, label },
                        setQuery,
                        refresh
                    } = props;
        
                    if (url) {
                        setQuery(label);
                        window.open(url);
                    } else {
                        setQuery(label);
                        refresh();
                    }
                },
            }
        )
        ``` 
        
    - **renderHeader `Function`**
        
        It is a callback that accepts parameters [API ref](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-header), one may utilize it to render a custom header before the suggestions.
        ```jsx
        createSuggestionsPlugin(
            ...,
            ...,
            {
                renderItem: (props) => {
                    ...
                },
                onItemSelect: (props) => {
                    ...
                },
                renderHeader: (props) => {
                    return (
                        <h4>
                         Products Listing <hr style={{ borderColor: "#d7d5f5" }} />
                        </h4>
                    );
                },
            }
        )
        ``` 
     
    - **renderFooter `Function`**
        
        It is a callback that accepts parameters [API ref](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-footer), one may  utilize it to render a custom footer after the suggestions.

        ```jsx
        createSuggestionsPlugin(
            ...,
            ...,
            {
                renderItem: (props) => {
                    ...
                },
                onItemSelect: (props) => {
                    ...
                },
                renderHeader: (props) => {
                    ...
                },
                renderFooter: (props) => {
                    return <hr style={{ borderColor: "#d7d5f5" }} />;
                },
            }
        )
        ```
    
        
    - **renderNoResults `Function`**
        
        It is a callback that accepts parameters [API ref](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#param-noresults), one may utilize it to render a custom UI when no results are found.
        
        ```jsx
        createSuggestionsPlugin(
            ...,
            ...,
            {
                renderItem: (props) => {
                    ...
                },
                onItemSelect: (props) => {
                    ...
                },
                renderHeader: (props) => {
                    ...
                },
                renderFooter: (props) => {
                    ...
                },
                renderNoResults: (props) => {
                    if (props.state.query === "") {
                        return <p>Search for something to get direct product suggestions!</p>;
                    } else {
                        return <p>No products found! Try searching for something else!</p>;
                    }
                }
            }
        )
        ```
        
    - **useContextValue `Boolean`** When set to true, the context value is set with the following value:
        
        ```jsx
        {
            total: ...,           // total results found for the entered query
            time: ...,            // total time taken to perform the search
            resultsJson: ...      // the results that were found in json format
        }
        ```
        
        One can use this context value to display results stats.

        ```jsx
        createSuggestionsPlugin(
            ...,
            ...,
            {
                renderItem: (props) => {
                    ...
                },
                onItemSelect: (props) => {
                    ...
                },
                renderHeader: (props) => {
                    ...
                },
                renderFooter: (props) => {
                    ...
                },
                renderNoResults: (props) => {
                    if (props.state.query === "") {
                        return <p>Search for something to get direct product suggestions!</p>;
                    } else {
                        return <p>No products found! Try searching for something else!</p>;
                    }
                },
                useContextValue: true
            }
        )
        ```


### Example with all properties 

Click [here](https://codesandbox.io/embed/example-autocomplete-js-58fmn?fontsize=14&hidenavigation=1&theme=dark) to checkout the advanced example to see all properties in action.

<iframe src="https://codesandbox.io/embed/github/appbaseio/autocomplete-suggestions-plugin/tree/main/examples/demo?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo-autocomplete"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>