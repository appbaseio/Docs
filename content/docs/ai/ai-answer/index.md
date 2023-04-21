---
title: 'ReactiveSearch AI Answer'
meta_title: 'ReactiveSearch AI Answer'
meta_description: 'Learn about AI Answer and how to use it with ReactiveSearch'
keywords:
    - reactivesearch.io
    - ai answer
    - chatgpt
    - search engine
    - opensearch
    - elasticsearch
sidebar: 'docs'
---

AI Answer adds the ability of AI alongside the good old search. ReactiveSearch supports integrating AI into search UIs to make the end-users experience much more streamlined and conversational.

**AI Answer brings the following things**:

- **AI Search**: Answer your user’s intent along side a faceted search
- **Improved precision and recall**: By relying on both the keyword search (or KNN) passed to the LLM context window, the answer is always coming from the search index
- **Human-in-the-loop**: By reviewing sessions and the feedback from your end-users,
    - Serve the user intent with a human-in-the-loop,
    - Iterate on the analytics to update prompt
- **Ready-to-go UI components**: Supported with ReactiveSearch, the industry-leading UI components library for React and Vue, you can ship and AI search in an hour
- **No-code AI search**: (Coming soon) Directly ship an AI search solution with Studio - no-code required! You still get the code (with ReactiveSearch kit) that can be built upon.

## How it works

![Querying with AI Answer enabled](../../../../content/images/concepts/querying_ai.png "Querying with AI Answer Vizualized")

We are using ChatGPT's models in order to power AI Answer. This, along with the various features that ReactiveSearch provides makes AI a viable option to show to the user in order to increase user interaction and make it easier for them to reach the answer they are looking for.

Imagine that every query that the user searches is a question. AI will make reaching the answer easier and digging deeper into the specifics of an answer much easier than it used to be.

## Getting Started

Getting started with AI Answer is a piece of cake. Just index the data and start using ReactiveSearch with AI Answer enabled.

[Connect your cluster to ReactiveSearch and get started in just 2 minutes!](https://dashboard.reactivesearch.io/signup?utm_source=docs&utm_medium=docs&utm_campaign=ai_answer)

### Before you start

If you don't have any data indexed in the cluster, we suggest taking a look at [this indexing doc to get started](./indexing)

Optionally, if you already have data and want to enrich it with vector representations, [take a look at the vector section of this doc](./indexing#enriching-with-vector-data)

### Querying

This is where AI Answer comes in. In order to query data, there are two ways to do it.

ReactiveSearch provides an UI library that can be leveraged to build AI Answer much easily. ReactiveSearch API can also be used in order to get the data. ReactiveSearch Pipelines are also an option if you want to get your hands dirty and customize various features of AI Answer or anything else regarding ReactiveSearch Query.

#### With UI Components

<iframe src="https://codesandbox.io/embed/github/awesome-reactivesearch/q-n-a-search-ui/tree/main/?fontsize=14&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="q-n-a-search-ui"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

With UI components that ReactiveSearch provides, it's easy to quickly get started with using AI Answer.

[Check out documentation for Searchbox with AI Answer](https://docs.reactivesearch.io/docs/reactivesearch/react/search/searchbox/#aiconfig)

[Check out documentation for AI Answer component](https://docs.reactivesearch.io/docs/reactivesearch/react/search/aianswer/)

#### With API

Once your cluster is connected to ReactiveSearch, a simple POST call can be made to get the search data along with AI enabled, `enableAI` field should be specified as shown in the following JSON:

```json
{
    "query": [
        {
            "id": "test",
            "dataField": ["title"],
            "value": "free guy",
            "enableAI": true
        }
    ]
}
```

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/VvDdd6uvjFUYwVSelYQJ"></iframe>

The above response contains an `AISessionId` that can be used to fetch the answer from AI as well as ask follow-up questions:

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/fp5e52TLUckcPSPTEyty"></iframe>

[Learn more about the endpoints ReactiveSearch provides for interacting with AI](https://api.reactivesearch.io/#44009fda-61f7-4d1b-81b5-9f495d3111a3)

[Read more about querying with ReactiveSearch with AI Answer support](./querying)


