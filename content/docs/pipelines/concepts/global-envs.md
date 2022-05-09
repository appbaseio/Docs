---
title: 'Global Envs'
meta_title: 'Global Envs | Introduction to Appbase.io'
meta_description: 'Learn about global environments and how they work on ReactiveSearch Pipelines'
keywords:
    - concepts
    - appbase.io
    - global
    - envs
    - pipelines
    - reactivesearch
sidebar: 'docs'
---

Global Environments can be thought of environment values that are globally present throughout the cluster and are **modifiable**.

It is important that global envs be understood properly in order to not face any weird errors when the pipeline is deployed.

## How To: Create Global Env

Global environments can be created in two ways as of now:

### Through Dashboard

Global Environments can be created directly through the dashboard by visiting [this URL](https://dash.appbase.io/cluster/global-envs)

> Following video shows how an env can be added through dashboard

<br>
<video controls autoplay loop>
  <source src="https://i.imgur.com/db8QEAQ.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>


### Through Pipeline

Global Envs can also be created when the pipeline is being created. The `global_envs` in the route of the pipeline file can be used.

It can be used in the following way:

```yml
global_envs:
  - label: API Key
    key: API_KEY
    value: ***************
    description: API Key env allows setting your search engine backend's API key
```

Above defines a global environment which will be created when the pipeline is created and saved in the cluster.

#### What is the write behaviour

The global environment created is overwritten by default whenever a pipeline update request is sent or a new pipeline defines the same env.

It is important to understand this behaviour of the pipeline create endpoint since this can lead to unexpected affects in case two pipelines define the same global environment.

### How to access them

All global environments present in a cluster are injected into the environment context during the execution of the pipeline. This means that all the environments can be accessed through their key from the `context.envs` field.

For example, if there is a global env defined with the key `ES_URL`, it will be accessible through:

```context.envs.ES_URL```

#### Conflict Handling

There can be cases when there is global environment defined and the same key is passed in the `envs` field in the pipeline that is saved.

This means that the same key would be present in the same pipeline twice. In such cases, **the user passed values in `envs` are respected**.

This means the user passed `envs` key will be present in the `context.envs` and the global environment will not be injected into the context.

## Update an env

As explained before, a global environment can be updated through the pipeline file or from the dashboard. The behaviour of the pipeline create endpoint will be **overwrite** when the pipeline is created.

### Through Dashboard

The environment page can be accessed in order to update the value of a environment or any other features of the environment.

> Following video shows how a global env can be updated

<br>
<video controls autoplay loop>
  <source src="https://i.imgur.com/HnPHgt3.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

### Through Create Pipeline

Passing the global environment in the `global_envs` normally while creating/updating the pipeline, it will be overwritten.

## Validate an environment

A global environment can be validated as well, through the frontend. This adds an extra layer of check to make sure the value of the environment is what is expected and it will work as expected in the pipeline.

The validation details can be passed with the `validate` field inside the global environment field in the pipeline file.

Validation is essentially a sophisticated **fetch** request where we also check if the response status code matches the one that the user specifies.

### `expected_status` field

The `expected_status` field is used to make sure the validation was succesfull. It is an integer that should match the status code of the validate request when it is successfull.

### `url` field

The `url` field is used to specify the URL that is supposed to be hit during validating the global environment before adding it.

### `method` field

It might be important to specify the method field in order to get the `expected_status`. This can be done by passing the method as a string. By default the value is set to `GET`.

Some of the other valid options are:

- `POST`
- `PUT`
- `PATCH`

### `headers` field

Headers can be essential to alter the response recieved from hitting a particular URL. Headers can be passed during validating by using the `headers` field.

For eg, a `Content-Type` header can be passed in the following way:

```yml
global_envs:
  - label: ES URL
    key: ES_URL
    value: http://localhost:9200
    validate:
      headers:
        "Content-Type": "application/json"
```

### `body` field

At times, there might be the need to pass the body in a response in order to get the `expected_status`. This is also supported by passing the body in the `body` field.

The body should be passed as a **string**. If JSON, this should be a stringified JSON.

## Validate Examples

Following examples show how to validate an environment variable when it is being added. This is useful for creating template pipeline files that can be used as others through the Dashboard.

### Example: Validate an index

Following example explains how the `validate` field can be used to verify that an index exists:

```yml
global_envs:
  - label: Index
    key: INDEX
    value: some_index
    description: A valid elasticsearch index
    validate:
      url: http://localhost:9200/${{INDEX}}
      expected_status: 200
```

Above syntax will ensure that the env is validated before it is created. The URL `http://localhost:9200/${{INDEX}}` will resolve to the following and will be hit with a `GET` request.

Above will resolve to the following cURL request where if the `expected_status` is same as the got status, it is considered.

```sh
curl -X GET http://localhost:9200/some_index
```

### Example: Validate an URL

Following example explaings how the `validate` field can be used to verify the saved URL:

```yml
global_envs:
  - label: ElasticSearch URL
    key: ES_URL
    value: http://localhost:9200
    description: A valid ElasticSEarch URL
    validate:
      url: ${ES_URL}
      method: GET
      expected_status: 200
```

Above request resolves to the following cURL request:

```sh
curl -X GET http://localhost:9200
```

The `expected_status` field, as explained, above is used as the status code to make sure the env is validated.
