---
title: 'Implement Vector Search using kNN'
meta_title: 'Implement Vector Search using kNN | Introduction to Appbase.io'
meta_description: 'Learn how to re rank the results of a search using k Nearest Neighbor'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - kNN
    - vector
sidebar: 'docs'
---

Vector Search has become a very appreciated method for searching recently. By using ReactiveSearch pipelines, we can add stages to rearrange results using kNN with just a few lines of code.

### Things to Note

The structure of OpenSearch and ElasticSearch is mostly similar with some exceptions. We have a dedicated part at the end that explains the differences for `opensearch`.

## Example Scenario: Rearrange first 10 results using kNN

Let's say we have an endpoint that searches for some data. Now, what we want is to utilize k-Nearest Neighbor (kNN) to rearrange the first 10 results to make them more suitable.

We can easily do that through ReactiveSearch pipelines.

We will create a pipeline that overrides the `/{index}/_reactivesearch` endpoint and add a stage to add kNN rearrangement of response data based on our inputs.

## Index Requirements

There are some requirements that need to be satisfied in order to be able to use `kNN` with ElasticSearch or OpenSearch. These include keeping a field or fields in the index that will be of a certain type and contain vector data.

For the sake of example, let's say we will have a field in our index named `name_vector` that will contain the vector data for the field `Name`.

### ElasticSearch

For ElasticSearch, we will have to make the type of the field `dense_vector`. This is necessary so that ElasticSearch understands that the field we are storing vector data to **can** actually contain vector data. Moreover, the `kNN` algorithm requires the field to be of `dense_vector` type in order to sucessfully run.

### OpenSearch

For OpenSearch, we will have to make the type of the field `knn_vector`. This is essentially the `dense_vector` equivalent for OpenSearch and indicates that we will be storing vector data in this field. It is important that the field that we will run `kNN` over be of type `knn_vector`.

## Assumptions

There are various algorithms that can be run on top of a data to get vector representation of it. In this case, for the sake of example, we will be using BERT algorithm to find the vector representation of the data. It is important that we use the same algorithm while indexing the data as well as while searching the data.

This means, while indexing, we will have to run the fields that we want to store as vector (in our case, the `Name` field) through this algorithm. We will also need to run the search query through this algorithm to get the vector representation of the query.

[BERT is developed by Google. Read more about it here](https://blog.google/products/search/search-language-understanding-bert/)

### Running bert-as-service

There are various options out there to run `bert` locally. In our case we will run [bert-as-service](https://github.com/hanxiao/bert-as-service) and use their API to find the vector representation.

## Pre Setups

Now that we know how we are going to implement kNN response manipulation, let's define the basic things in the pipeline.

As explained above, we will override the `_reactivesearch` endpoint which will invoke our pipeline if a `POST` method is defined.

The file will be defined in the following way:

```yaml
enabled: true
routes:
- path: "/{index}/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch
envs:
  bertURL: http://localhost:8125
```

### Environment Variables

We are passing the `bert-as-service` URL through envs so that it can be used in the stages. This is passed through the `bertURL` variable.

## Stages

Now that we have the basic pipeline defined, let's get started with the stages. We will have a few pre-built stages and some custom stages in this pipeline.

> Pre-Built stages are provided by ReactiveSearch to utilize functions from ReactiveSearch API, like hitting ElasticSearch or translating an RS Query to ES Query.



