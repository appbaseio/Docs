---
title: 'Create a pipeline with query rules'
meta_title: 'Create a pipeline with Query Rules | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create a pipeline that uses query rules to boost search results'
keywords:
    - concepts
    - appbase.io
    - pipelines
    - query
    - rules
    - boost
    - score
    - search
    - reactivesearch
    - relevancy
sidebar: 'docs'
---


Query rules play an important role in search applications to tune search relevancy where we want to configure search results as per our business needs. For example, promote `iphone` at top when user searched for `mobile phones` or boost the score for documents containing `iphone` by boost factor, so they can be ranked in top results.

## Demo
<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/ee5d40693c7e4e608a8db5da1d16ef01" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>


## Pre Setup

Let's define the basics of the pipeline. It will be in the following way:

```yml
enabled: true
description: Promote cell phones

routes:
  - path: /query-boost-example
    method: POST
    classify:
      category: reactivesearch

envs:
    category: reactivesearch
    index: [best-buy-dataset]
```
We have defined the search route details along with some envs variables to configure the route category and search index. We would be using the `best-buy-dataset` index, you can browse the data at [here](https://dejavu.appbase.io/?appname=best-buy-dataset&url=https://b9f6f919e680:268f356c-434b-4cda-955b-f71953a0ff38@appbase-demo-ansible-abxiydt-arc.searchbase.io&mode=view).

## Stages

Now that we have the pre setup out of the way, let's define the stages for the pipeline.

### Authorization

We need to make sure that the requests made to this endpoint are authenticated. To do this, we can use the pre-built stage `authorization`. We can define it in the following way:

```yml
- id: authorization
  use: authorization
  continueOnError: false
```

It's as simple as that, we don't need to do anything else, the rest will be taken care of by the pipeline.

### Apply Facet

The following stage defines a facet to filter search results by `department` value as `DIGITAL COMMUNICATIO`.

```yml
- id: addFilter
  use: addFilter
  continueOnError: false
  description: Filter results by department
  inputs:
    data: mongodb
      department.keyword: DIGITAL COMMUNICATIO   
```


### Replace Words

The following stage replaces the `iphone` word in search query to `iphone 11 apple` so we can get more specific results for latest iphone series available in stock.

```yml
- id: replaceWords
  use: replaceWords
  continueOnError: false
  description: Replaces iphone word to iphone 11 apple
  inputs:
    data:
      iphone: iphone 11 apple   
```

### Boost Results by Score

In the following stage, we are boosting the documents for which `categoryPath.name` field is `cell Phones` or `Prepaid Phones`.

```yml
- id: boostByScore
  use: boost
  continueOnError: false
  inputs:
    dataField: categoryPath.name
    value: [cell Phones, Prepaid Phones] 
    boostType: score
```

### Boost Results at Top (Promote Results)

The following stage would promote the documents at the top for which `albumTitle` field contains `Galaxy Note10+`. Since we want to promote maximum one document, so we have set the `boostMaxDocs` to `1`.

```yml
- id: promoteResults
  use: boost
  continueOnError: false
  inputs:
    dataField: albumTitle
    value: [Galaxy Note10+]
    boostType: promote
    boostMaxDocs: 1
```

### ReactiveSearch Query

We will use the pre-built stage `reactivesearchQuery` for this stage. We will be converting the RS Query to ES Query in this stage.

We can define this stage in the following way:

```yml
- use: reactivesearchQuery
  continueOnError: false
```


### Elastic Search Query

In the final stage, we make the ES call and return the response accordingly. At this stage, the request body should be converted to the ES body so that ES can understand it.

We will be using the pre-built stage `elasticsearchQuery` at this stage.

We can define this stage in the following way:

```yaml
- use: elasticsearchQuery
  continueOnError: false
```

## Complete Pipeline

Now that all the stages are defined, let's take a look at the whole pipeline at once:


```yml
enabled: true
description: Promote cell phones

routes:
  - path: /query-boost-example
    method: POST
    classify:
      category: reactivesearch

envs:
    category: reactivesearch
    index: [best-buy-dataset]

stages:
- id: authorization
  use: authorization
  continueOnError: false
- id: addFilter
  use: addFilter
  continueOnError: false
  description: Filter results by department
  inputs:
    data: mongodb
      department.keyword: DIGITAL COMMUNICATIO
- id: replaceWords
  use: replaceWords
  continueOnError: false
  description: Replaces iphone word to iphone 11 apple
  inputs:
    data:
      iphone: iphone 11 apple
- id: boostByScore
  use: boost
  continueOnError: false
  inputs:
    dataField: categoryPath.name
    value: [cell Phones, Prepaid Phones] 
    boostType: score
- id: promoteResults
  use: boost
  continueOnError: false
  inputs:
    dataField: albumTitle
    value: [Galaxy Note10+]
    boostType: promote
    boostMaxDocs: 1
- use: reactivesearchQuery
  continueOnError: false
- use: elasticsearchQuery
  continueOnError: false
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_URL/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml"
```

## Testing the Pipeline

We can hit the pipeline endpoint now to see it working live. Use the following request to hit and get the response in the ReactiveSearch format.

```sh
curl -X POST 'CLUSTER_URL/query-boost-example' -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "sudoku", "dataField": ["name_s"]}]}'
```

The above request should return a response with search results (considering there are results matching the search term) in the ReactiveSearch format.

