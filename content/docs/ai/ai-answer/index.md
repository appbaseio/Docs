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

AI Answer brings the following things:

- AI Search → Answer your user’s intent along side a faceted search
- Improved precision and recall → By relying on both the keyword search (or KNN) passed to the LLM context window, the answer is always coming from the search index
- Human-in-the-loop → By reviewing sessions and the feedback from your end-users,
    - Serve the user intent with a human-in-the-loop,
    - Iterate on the analytics to update prompt
- Ready-to-go UI components → Supported with ReactiveSearch, the industry-leading UI components library for React and Vue, you can ship and AI search in an hour
- No-code AI search → (Coming soon) Directly ship an AI search solution with Studio - no-code required! You still get the code (with ReactiveSearch kit) that can be built upon.

## Under the hood

Under the hood, we are using ChatGPT's GPT-3.5 in order to power AI Answer. This, along with the various features that ReactiveSearch provides makes AI a viable option to show to the user in order to increase user interaction and make it easier for them to reach the answer they are looking for.

Imagine that every query that the user searches is a question. AI will make reaching the answer easier and digging deeper into the specifics of an answer much easier than it used to be.

## Getting Started

Getting started with AI Answer is a piece of cake. Just index the data and start using ReactiveSearch with AI Answer enabled.

### Indexing

Indexing is the first step to get started with AI Answer (or ReactiveSearch) in general. This is where you put your data in the search engine of your choice in order to use it.

For indexing, we support two main ways:

- If you don't have any data indexed at all: [start by indexing some data]()
- If you already have some data indexed: [re-index the data to add vector representation and use kNN search with it]()


