---
title: 'Rich snippets'
meta_title: 'Rich snippets'
meta_description: 'Increase user engagement for your search UIs with rich snippets - display additional context such as a knowledge graph, show related searches or annotate search results'
keywords:
    - reactivesearch
    - appbase
    - elasticsearch
    - rich-snippets
    - knowledge
    - graph
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

# Overview

Often times, it's useful to show additional context to what the search results are to cater to different search interests. For example, you may want to display knowledge graph or related search terms to aid users who are researching a topic instead of looking for solving their problem. With rich snippets, you can cater to this use-case and improve search engagement for your users.

# How to implement rich snippets?

In this post, we will show how to implement rich snippets.

### Creating a pipeline for google knowledge graph

Pipelines are useful when we want to modify data before sending it to browser. Pipelines are implemented in the backend and we need to configure it using the [dashboard](https://dashboard.appbase.io/). Imagine a stream of data, where we want to add more information, or modify data structure, then we implement pipeline. They can be used for adding external search results, authorizing user and [much more](/docs/pipelines/how-to/).

We would create a pipeline for adding knowledge graph data from google search to our index search results. Data passes through various stages in a pipeline. Each stage adds more information or performs some action. We add google knowledge graph results in the pipeline as a stage. You can follow [the detailed guide to add stages](https://docs.appbase.io/docs/pipelines/how-to/add-external-search-results).

```json
{
    "stages": [
        {
            "id": "google_knowledge_graph",
            "async": true,
            "script": "async function handleRequest() { try { const URL = `https://kgsearch.googleapis.com/v1/entities:search?query=${context.envs.query}&key=${context.envs.knowledgeGraphAPIKey}&limit=1&indent=True`; const responseBody = await fetch(URL); const response = JSON.parse(responseBody); return { knowledge_graph: response }} catch(e) {} return context; }"
        }
    ]
}
```

Notice we reference a environment inside `script` as `context.envs.knowledgeGraphAPIKey`. We can add the `envs` as below. As we are adding information to `movies-store-rich-snippets` we mention it inside the pipeline.
```json
{
    "envs": {
        "category": "reactivesearch",
        "index": [
            "movies-store-rich-snippets"
        ],
        "knowledgeGraphAPIKey": "<YOUR GOOGLE API KEY>"
    }
}
```

### Building the search UI and rendering results

Once the pipeline is built, we can start using the data we get. We would use [`SearchBox`](/docs/reactivesearch/v4/search/searchbox) component to search results and [`ReactiveList`](/docs/reactivesearch/v4/result/reactivelist) component to display results. 

Our [`SearchBox`](/docs/reactivesearch/v4/search/searchbox) component would look like below.
```js
<SearchBox 
    className="SearchBox" 
    autosuggest 
    componentId="search-box" 
    dataField="original_title" 
/>
```

We would use use [`ReactiveList`](/docs/reactivesearch/v4/result/reactivelist) as below. Note how we connect the [`ReactiveList`](/docs/reactivesearch/v4/result/reactivelist) to watch on changes to [`SearchBox`](/docs/reactivesearch/v4/search/searchbox) by using `react` property.

```js
<ReactiveList
    componentId="SearchResult"
    size={15}
    pagination
    dataField="original_title"
    URLParams
    react={{
        and: 'search-box',
    }}
/>
```

We would get data from `knowledgeGraph` inside of `rawData`, in the `render` method of [`ReactiveList`](/docs/reactivesearch/v4/result/reactivelist). We would then render the results as below.
```js
<ReactiveList
    //...props
    render={({ data, rawData, resultStats }) => {
        const knowledgeGraph = rawData && rawData.knowledgeGraph;
        const knowledgeGraphItem = knowledgeGraph 
                                    && knowledgeGraph.itemListElement[0] 
                                    && knowledgeGraph.itemListElement[0].result;
        return (
            <div className="grid">
                <div className="sidebar">
                    {knowledgeGraphItem ? (
                        <div>
                            <div>
                                <img src={knowledgeGraphItem.image.contentUrl} className="bannerImg" alt="movie poster" />
                                <h3 className="bannerText">{knowledgeGraphItem.name}</h3>
                            </div>
                        </div>
                    ) : 'No results'}
                </div>
            </div>
        );
    }}
/>
```

You can look at the complete example below.

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/RichSnippets?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="rich-snippets"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

# Data from multiple index using pipelines

Just like we added google knowledge graph to the pipeline we can also create a pipeline to add data from multiple indices. We can see a running example below which combines information from two indices `good-books-ds` and `good-books`.

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiIndexSearch?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="multi-index-search"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
