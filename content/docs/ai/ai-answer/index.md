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

- **AI Search** → Answer your user’s intent along side a faceted search
- **Improved precision and recall** → By relying on both the keyword search (or KNN) passed to the LLM context window, the answer is always coming from the search index
- **Human-in-the-loop** → By reviewing sessions and the feedback from your end-users,
    - Serve the user intent with a human-in-the-loop,
    - Iterate on the analytics to update prompt
- **Ready-to-go UI components** → Supported with ReactiveSearch, the industry-leading UI components library for React and Vue, you can ship and AI search in an hour
- **No-code AI search** → (Coming soon) Directly ship an AI search solution with Studio - no-code required! You still get the code (with ReactiveSearch kit) that can be built upon.

## How it works

![Querying with AI Answer enabled](../../../../content/images/concepts/querying_ai.png "Querying with AI Answer Vizualized")

We are using ChatGPT's models in order to power AI Answer. This, along with the various features that ReactiveSearch provides makes AI a viable option to show to the user in order to increase user interaction and make it easier for them to reach the answer they are looking for.

Imagine that every query that the user searches is a question. AI will make reaching the answer easier and digging deeper into the specifics of an answer much easier than it used to be.

## Getting Started

Getting started with AI Answer is a piece of cake. Just index the data and start using ReactiveSearch with AI Answer enabled.

[Connect your cluster to ReactiveSearch and get started in just 2 minutes!](https://dashboard.reactivesearch.io/signup?utm_source=docs&utm_medium=docs&utm_campaign=ai_answer)

### Before you start

If you don't have any data indexed in the cluster, we suggest taking a look at [this indexing doc to get started](./indexing.md)

Optionally, if you already have data and want to enrich it with vector representations, [take a look at the vector section of this doc](./indexing.md#enriching-with-vector-data)

### Querying

This is where AI Answer comes in. In order to query data, there are multiple ways to do it.

ReactiveSearch provides an UI library that can be leveraged to build AI Answer much easily. ReactiveSearch API can also be used in order to get the data. ReactiveSearch Pipelines are also an option if you want to get your hands dirty and customize various features of AI Answer or anything else regarding ReactiveSearch Query.

Once your cluster is connected to ReactiveSearch, a simple POST call can be made to get the search data along with AI enabled:

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/VvDdd6uvjFUYwVSelYQJ"></iframe>

[Read more about querying with ReactiveSearch with AI Answer support](./querying.md)


