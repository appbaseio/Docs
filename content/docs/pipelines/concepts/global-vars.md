---
title: 'Global Vars'
meta_title: 'Global Vars | Introduction to Appbase.io'
meta_description: 'Learn about global vars and how they work on ReactiveSearch Pipelines'
keywords:
    - concepts
    - appbase.io
    - global
    - vars
    - pipelines
    - reactivesearch
sidebar: 'docs'
---

Global Variables can be thought of environment values that are globally present throughout the cluster and are **modifiable**.

It is important that global vars be understood properly in order to not face any weird errors when the pipeline is deployed.

## How To Create Global Variables

Global variables can be created in two ways as of now:

### Through Dashboard

Global Variables can be created directly through the dashboard by visiting [this URL](https://dash.appbase.io/cluster/global-vars)

> Following video shows how a variable can be added through dashboard

<br>
<video controls autoplay loop>
  <source src="https://i.imgur.com/db8QEAQ.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>


### Through Pipeline

Global Vars can also be created when the pipeline is being created. The `global_vars` in the route of the pipeline file can be used.

It can be used in the following way:

```yml
global_vars:
  - label: Some new Var
    key: SOME_VAR
    value: Some random value
    description: Just some description
```

Above defines a global variable which will be created when the pipeline is created and saved in the cluster.

#### What is the write behaviour

The global variable created is overwritten by default whenever a pipeline update request is sent or a new pipeline defines the same variable.

It is important to understand this behaviour of the pipeline create endpoint since this can lead to unexpected affects in case two pipelines define the same global variable.

### How to access them

All global variables present in a cluster are injected into the environment context during the execution of the pipeline. This means that all the variables can be accessed through their key from the `context.envs` field.

For example, if there is a global variable defined with the key `ES_URL`, it will be accessible through:

```context.envs.ES_URL```

#### Conflict Handling

There can be cases when there is global variable defined and the same key is passed in the `envs` field in the pipeline that is saved.

This means that the same key would be present in the same pipeline twice. In such cases, **the user passed values in `envs` are respected**.

This means the user passed `envs` key will be present in the `context.envs` and the global variable will not be injected into the context.

## Updating a Variable

As explained before, a global variable can be updated through the pipeline file or from the dashboard. The behaviour of the pipeline create endpoint will be **overwrite** when the pipeline is created.

### Through Dashboard

The variables page can be accessed in order to update the value of a variable or any other features of the variable.

> Following video shows how a global env can be updated

<br>
<video controls autoplay loop>
  <source src="https://i.imgur.com/HnPHgt3.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

### Through Create Pipeline

Passing the global variable in the `global_vars` normally while creating/updating the pipeline, it will be overwritten.

## Validate a variable

A global variable can be validated as well, through the frontend. This adds an extra layer of check to make sure the value of the variable is what is expected and it will work as expected in the pipeline.

The validation details can be passed with the `validate` field inside the global variable field in the pipeline file.

### `expected_status` field

The `expected_status` field is used to make sure the validation was succesfull. It is an integer that should match the status code of the validate request when it is successfull.

### Example: Validate an index

Following example explains how the `validate` field can be used to verify that an index exists:

```yml
global_vars:
  - label: Index
    key: INDEX
    value: some_index
    description: A valid elasticsearch index
    validate:
      url: http://localhost:9200/${{INDEX}}
      expected_status: 200
```

Above syntax will ensure that the variable is validated before it is created. The URL `http://localhost:9200/${{INDEX}}` will resolve to the following and will be hit with a `GET` request.

Above will resolve to the following cURL request where if the `expected_status` is same as the got status, it is considered.

```sh
curl -X GET http://localhost:9200/some_index
```

### Example: Validate an URL

Following example explaings how the `validate` field can be used to verify the saved URL:

```yml
global_vars:
  - label: ElasticSearch URL
    key: ES_URL
    value: http://localhost:9200
    description: A valid ElasticSEarch URL
    validate:
      url: ${{ES_URL}}
      method: GET
      expected_status: 200
```

Above request resolves to the following cURL request:

```sh
curl -X GET http://localhost:9200
```

The `expected_status` field, as explained, above is used as the status code to make sure the variable is validated.
