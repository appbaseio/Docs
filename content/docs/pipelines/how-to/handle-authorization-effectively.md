---
title: 'Handle authorization effectively in Pipelines'
meta_title: 'Handle authorization effectively in pipelines | Introduction to Appbase.io'
meta_description: 'Learn how to handle authorization properly while defining a pipeline with ReactiveSearch'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - authorization
sidebar: 'docs'
---

# Authorization

Authorization, as pointed out in other how-to guides, is one of the most important stages while defining a pipeline. ReactiveSearch Pipelines provide a pre-built stage to handle authorization.

**[Deploy this pipeline with one-click](https://dashboard.reactivesearch.io/deploy?template=https://raw.githubusercontent.com/appbaseio/pipelines-template/master/basic/pipeline_oneclick.json)**

# Effective Authorization

Handling just authorization to determine if the user is has access by checking the password or username is not enough. At times, it is important to check other details during authorization.

Things like rate limit, validating sources, referrers etc are as important for the authorization to be **effective**.

Let's build a simple pipeline that uses authorization effectively as explained above.

## `authorization` stage

The pre-built authorization stage takes care of all the above mentioned scenarios and more.

The stage is named as `authorization` and can be used in a stage with the `use` field.

It takes care of the following:

- Handle username/password validation.
- Validate Rate limits
- Validate Sources
- Validate Referers
- Validate Indices
- Validate Category
- Validate Operation
- Validate Permission Expiry

All this with just one line of code.

## Pre-Setup

Before we start with the stages, let's setup the routes and other pre-requisites of a pipeline.

We will make this pipeline be invoked with the `auth/_rectivesearch` endpoint on a **POST** request.

```yaml
enabled: true
description: Set authorization effectively for search

routes:
  - path: /auth/_reactivesearch
    method: POST
      classify:
        category: reactivesearch
```

## Stages

Now that we are done with the pre-setup, let's go ahead and define the stages. This pipeline will be simple with no custom stages at all.

Following stages will be defined:

- Authorize User
- ReactiveSearch Query
- ElasticSearch Query

### Authorize User

Authorize user using the `authorization` pre-built stage. We can define it in the following way:

```yaml
- id: Authorize User
  use: authorization
  continueOnError: false
```

> Note that the `continueOnError` field is set to `false` to make sure the authorization stops execution.

### ReactiveSearch Query

ReactiveSearch query will translate the passed query to ElasticSearch and accordingly pass it on for further execution.

We can use the pre-built stage `reactivesearchQuery` for this stage.

```yaml
- id: ReactiveSearch Query
  use: reactivesearchQuery
```

### ElasticSearch Query

Finally, we can hit ElasticSearch to get the response and return it accordingly in the response. We can use the pre-built stage `elasticsearchQuery` for this stage.

```yml
- id: ElasticSearch Query
  use: elasticsearchQuery
```

## Complete Pipeline

Now that we have defined the stages we needed, let's get the whole pipeline

```yml
enabled: true
description: Set authorization effectively for search

routes:
  - path: /auth/_reactivesearch
    method: POST
      classify:
        category: reactivesearch

stages:
  - id: Authorize User
    use: authorization
    continueOnError: false
  - id: ReactiveSearch Query
    use: reactivesearchQuery
  - id: ElasticSearch Query
    use: elasticsearchQuery
```

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. All the `scriptRef` files can be passed as a separate key in the form data and will be parsed by the API automatically. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_ID/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml"
```

## Testing the Pipeline

We can hit the pipeline with some invalid credentials and see if it is working.

Let's test it with invalid username/password

### Invalid Username

We can use some invalid username for this test. Let's use the username as `random` along with something like `abc123` as password.

> Make sure that an user with username `random` does not exist.

```sh
curl -X POST 'https://random:abc1234@CLUSTER_URL/auth/_reactivesearch' -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "test query"}]}'
```

The above request would return an error indicating the passed username and password are invalid.

### Invalid Category Access

Let's take it a step further. We need to create an user that does not have access to `reactivesearch` category.

Let's say the user is `norsaccess` and password is `abc123`.

We can hit the endpoint with the above credentials in the following way:

```sh
curl -X POST 'https://norsaccess:abc1234@CLUSTER_URL/auth/_reactivesearch' -H "Content-Type: application/json" -d '{"query": [{"id": "some ID", "value": "test query"}]}'
```

Above endpoint should return an error response. However, now the error reason should be indicating that the user does not have access to the category.

Similarly, other aspects of authorization can be tested.
