---
title: 'Search on multiple indexes'
meta_title: 'Search on multiple indexes | federated search'
meta_description: 'Build federated search experiences by querying multiple data sources residing on different indexes'
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

There are times when your content is spread across multiple search indexes, e.g. if you're serving users in different geographies and have search data in multiple languages, it makes sense to have data for each language as its own index. Or when you have data coming from different sources and each source is represented as its own index.

In this guide, we are going to see how to search across multiple indexes using the [ReactiveSearch](https://github.com/appbaseio/reactivesearch) library.

# Use Cases

### Combine results from multiple indices

In this example, we are going to create an app which retrieves results from two indices **good-books-ds** and **good-books**. Both the indices are similar and contain information about books. We would fetch results from both indices and tag them by index.

When we want to use multiple indices then we need to specify it using `app` property on [`ReactiveBase`](/docs/reactivesearch/react/overview/reactivebase). We need to separate the indices by comma. You can also use the `index` property on UI components from **reactivesearch** to have the same effect. `index` overrides the `app` property of [`ReactiveBase`](/docs/reactivesearch/react/overview/reactivebase).


```jsx
<ReactiveBase
    app="good-books,good-books-ds"
    //...more props
/>
```

We also need to make sure that the API `credentials` we use have been allowed access to both the search indices. 

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

When a user would search, the results (aka hits) will be fetched from both the indices. We can use the `_index` property of reh results to annotate them on the basis of which index they're coming from. We show it as different colored badges in the UI. For rendering the results we use [`ReactiveList`](/docs/reactivesearch/react/result/reactivelist).

You can see a live example below:

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiIndexSearch?fontsize=14&hidenavigation=1&view=preview" title="autocomplete-example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Using different index for facet/filter

Sometimes we have separate indexes to store relational or related information. e.g. **authors** and **books**. But we might want to filter **books** by selecting from a list of **authors**. In this example we are exactly going to do that.

We would be using two indexes **good-books-ds** and **good-books-authors**. Inside of **good-books-authors** in dashboard we need to add `author_name` as aggregation.

![Author aggregations setting](/images/concepts/author-aggregation-setting.png)

To choose from different authors, we will set a facet filter. We can use the [`MultiList`](/docs/reactivesearch/react/list/multilist) component for this. Notice the `index` here is **good-books-authors** and the `dataField` is `author_name.keyword`.

```jsx
<MultiList
    componentId="BookSensor"
    dataField="author_name.keyword"
    index="good-books-authors"
    aggregationSize={100}
/>
```

We will use a [`ReactiveList`](/docs/reactivesearch/react/result/reactivelist) component to display results. This component would be connected to **good-books-ds**.

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

In this scenario, we will also need to configure the search query coming from the author selection so while the index queried for facet aggregations is **good-books-authors**, the index queried for the search results is **good-books-ds**. We do this by setting a  `customQuery` which fetches data from the **good-books-ds** index.

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

You can see a live example below:

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiIndexFacet?fontsize=14&hidenavigation=1&view=preview" title="autocomplete-example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
