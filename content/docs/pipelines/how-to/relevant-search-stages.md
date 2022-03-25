---
title: 'Implement Relevant Search with Pipelines'
meta_title: 'Relevant Search Pipeline | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a relevant search pipeline with ReactiveSearch'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - relevant
sidebar: 'docs'
---

A search query doesn't just hit against a field and returns the results. A search query understands the query and returns fields accordingly.

We can build both kinds of search endpoints using ReactiveSearch pipelines. In this guide, we will build a search pipeline with search relevancy, popular and recent suggestions.