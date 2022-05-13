---
title: 'Rich snippets'
meta_title: 'Rich snippets'
meta_description: 'Rich snippets helps to display information to users on multiple levels'
keywords:
    - reactivesearch
    - appbase
    - elasticsearch
    - rich 
    - snippets
    - knowledge
    - graph
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

# Overview
Traditional search UI, display results in long lists, which doesn't pique user's interest. Instead we need to show information in layers. Sometimes it's useful to make a particular piece of content stand out, when user is searching for information. These are rich snippets. 

# How to implement rich snippets?

### Creating a pipeline for google knowledge graph

Pipelines are useful when we want to modify data before sending it to browser. Pipelines are implemented in the backend and we need to configure it using the [dashboard](https://dashboard.appbase.io/). Imagine a stream of data, where we want to add more information, or modify data structure, then we implement pipeline. They can be used for adding external search results, authorizing user and [much more.](https://docs.appbase.io/docs/pipelines/how-to/)

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

Once the pipeline is built, we can start using the data we get. We would use `SearchBox` component to search results and `ReactiveList` component to display results. 

Our `SearchBox` component would look like below.
```js
<SearchBox 
    className="SearchBox" 
    autosuggest 
    componentId="search-box" 
    dataField="original_title" 
/>
```

We would use use `ReactiveList` as below. Note how we connect the `ReactiveList` to watch on changes to `SearchBox` by using `react` property.
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

We would get data from `knowledgeGraph` inside of `rawData`, in the `render` method of `ReactiveList`. We would then render the results as below.
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

<iframe src="https://codesandbox.io/embed/github/SavvyShah/reactivesearch/tree/docs%2Frich-snippets/packages/web/examples/RichSnippets?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="SavvyShah/reactivesearch"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

# Multiple index using pipelines

Just like we added google knowledge graph to the pipeline we can also create a pipeline to add data from multiple indices. We can see a running example below which combines information from two indices `good-books-ds` and `good-books`.

<iframe src="https://codesandbox.io/embed/github/SavvyShah/reactivesearch/tree/docs-multi-index/packages/web/examples/MultiIndexSearch?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="multi-index-search"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
