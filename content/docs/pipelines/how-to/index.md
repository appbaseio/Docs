---
title: 'ReactiveSearch Pipelines: How to guides'
meta_title: 'How to guides for ReactiveSearch Pipelines'
meta_description: 'Learn how to use ReactiveSearch pipelines through different examples'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
    - how to
sidebar: 'docs'
---

Get started with ReactiveSearch Pipelines with our How To guides curated considering all scenarios that a developer might come across. Our guides are aimed at giving the reader a proper idea of the pipelines and giving them an idea of how capable ReactiveSearch Pipelines are.

## Add External Search Results

This example covers the scenario where a person might want to include external results into the querytranslate response. This guide explains how this can be done by using an example of adding external results by accessing Google's Knowledge Graph API. [Read More](add-external-search-results)

## Search Relevancy using Query Rules
[Query Rules](/docs/search/rules/) enable you to cover the search relevance blind spots by creating "If this, then that" style rules tailored to your business use-case. The following guide explains the query rules usage with pipelines to add dynamic facets, replace search words and promote/boost search results. [Read More](query-rules)

## Create an Indexing Pipeline

An indexing pipeline is useful when there are custom steps that needs to be done while a document is being indexed. This guide uses the example of adding vector data for a certain field of the passed documentation by hitting an external API. [Read More](create-an-indexing-pipeline)

## Handle Authorization Effectively

This example explains how authorization is handled effectively with the pre-built `authorization` stage and how to test it. [Read More](handle-authorization-effectively)

## Add Side Effect

Adding side effects while a search request is being made might be an useful scenario. Side effects include things like saving the request body everytime there is a request and so on. In this guide, an example of saving the request body to an index is taken and explained. [Read More](add-side-effect-search-query)

## kNN Index

This guide explains how to create an indexing pipeline that extracts some data, generates vector for it and stores it. This goes hand-in-hand with the next pipeline for searching using kNN. [Read More](knn-indexing)

## kNN Search

This guide explains how kNN (k-Nearest Neighbor) can be utilized to rearrange the response results on the basis of a vector and an algorithm provided by the user. [Read More](knn-response-stage)

## Relevant Search Stages

Making a proper search pipeline can be a hard task. This guide explains how to use all the pre-built plugins provided by ReactiveSearch in order to make a **relevant** search pipeline. [Read More](relevant-search-stages)

## Caching and Analytics

Caching and Analytics are some of the most important features for an user facing search endpoint. This guide explains how to use pre-built stages to use cache and record analytics for recording user data. [Read More](caching-and-recording-analytics)

## Solr Pipeline

ReactiveSearch Pipelines also work with Solr as a backend. This pipeline demonstrates how Solr (or Fusion) can be used as a valid backend with ReactiveSearch. [Read More](solr-pipeline)

## MongoDB Pipeline

ReactiveSearch Pipeline also works with MongoDB as a backend. This pipeline demonstrates how MongoDB can be used as a valid backend with ReactiveSEarch. [Read More](mongodb-pipeline)

## Error Handling in Pipelines

Handling errors gracefully is a skill that a lot of developers crave. ReactiveSearch Pipelines makes it easy to handle pipeline errors and return distinct responses for better understanding. [Read More](error-handling-in-pipeline)
