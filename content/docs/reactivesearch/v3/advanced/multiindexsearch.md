---
title: 'Multi index search'
meta_title: 'Multi index search'
meta_description: 'Search for a term in multiple indexes'
keywords:
    - reactivesearch
    - multi-index
    - search
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

# Overview
When we have multiple indices of related data and want to generate results using them, then we can use multi-index search. For example, we may have two indices **authors** and **books**. When a user searches "Ha", we want to match author's name as well as book's title against the search term.

In this guide we are going to see, how we can search multiple-indices using [**reactivesearch**](https://github.com/appbaseio/reactivesearch) library.

# Use Cases

### Combine results from multiple indices
In this example, we are going to create an app which retrieves results from two indices **good-books-ds** and **good-books**. Both the indices are similar and contain information about books. We would fetch results from both indices and tag them by index.

When we want to use multiple indices then we need to specify it using `app` property on [`ReactiveBase`](/docs/reactivesearch/v3/overview/reactivebase). We need to separate the indices by comma. You can also use the `index` property on UI components from **reactivesearch** to have the same effect. `index` overrides the `app` property of [`ReactiveBase`](/docs/reactivesearch/v3/overview/reactivebase).


```jsx
<ReactiveBase
    app="good-books,good-books-ds"
    //...more props
/>
```

We also need to make sure that the API `credentials` we use have been allowed access to both the indices. 

In order to search, we would require a searchbar. We can make a searchbar by using `SearchBox` from **reactivesearch**. We give it a `defaultValue` of Harry Potter. We search on the `original_title` field. You can also specify `index` property which is optional. 
```jsx
<SearchBox
    title="SearchBox"
    defaultValue="Harry Potter"
    dataField="original_title"
    componentId="BookSensor"
    size={10}
    index="good-books,good-books-ds"
/>
```

When users would search, we would be getting results from both the indices. We can use the `_index` property on hits to separate results on basis of index. We show it as different colored badges in the UI. For rendering the results we use [`ReactiveList`](/docs/reactivesearch/v3/result/reactivelist).

You can see the live example below.
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiIndexSearch?fontsize=14&hidenavigation=1&view=preview" title="autocomplete-example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Using different index for facet/filter
Sometimes we have separate indexes to store related information. eg. **authors** and **books**. But we might want to filter **books** by selecting from a list of **authors**. In this example we are exactly going to do that.

We would be using two indexes **good-books-ds** and **good-books-authors**. Inside of **good-books-authors** in dashboard we need to add `author_name` as aggregation.

![Author aggregation setting](/images/concepts/author-aggregation-setting.png)

To choose from different authors we would need a facet. We can use [`MultiList`](/docs/reactivesearch/v3/list/multilist). It creates a multi-select component. Notice the `index` here is **good-books-authors** and the `dataField` is `author_name.keyword`.
```jsx
<MultiList
    componentId="BookSensor"
    dataField="author_name.keyword"
    index="good-books-authors"
    aggregationSize={100}
/>
```

We would also need a [`ReactiveList`](/docs/reactivesearch/v3/result/reactivelist) component to display results. This component would be connected to **good-books-ds**.
```jsx
<ReactiveList
    componentId="SearchResult"
    dataField="original_title"
    className="result-list-container"
    index="good-books-ds"
    from={0}
    size={5}
    renderItem={this.booksReactiveList}
    react={{
        and: ['BookSensor'],
    }}
/>
```

Another important thing we need to configure is query. The [`MultiList`](/docs/reactivesearch/v3/list/multilist) component creates a query using `author_name.keyword`. But when some author gets selected, it updates the results. But we need to query **good-books-ds** to display results in [`ReactiveList`](/docs/reactivesearch/v3/result/reactivelist). We do this by using `customQuery` which fetches data from **good-books-ds**.
```jsx
<MultiList
    componentId="BookSensor"
    dataField="author_name.keyword"
    index="good-books-authors"
    // customQuery: If none is selected then match all documents else match selected
    customQuery={value => (value.length ? ({
        query: {
            terms: {
                'authors.keyword': value,
            },
        },
    }) : ({
        query: {
            match_all: {},
        },
    }))}
    aggregationSize={100}
/>
```

You can see the live example below.
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiIndexFacet?fontsize=14&hidenavigation=1&view=preview" title="autocomplete-example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
