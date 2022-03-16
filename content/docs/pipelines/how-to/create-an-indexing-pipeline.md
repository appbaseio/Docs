---
title: 'Create an indexing pipeline'
meta_title: 'Create an indexing pipeline | Introduction to Appbase.io'
meta_description: 'Learn how to quickly create an indexing pipeline with ReactiveSearch'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
    - pipelines
    - indexing
sidebar: 'docs'
---

# Indexing Pipeline

ElasticSearch provides endpoints like `/_doc` to index documents. ReactiveSearch API exposes these endpoints for external use directly (given you have proper credentials).

However, let's say we want to build an indexing endpoint on steroids. Something that lets the users send a request body to be indexed and then, some fields are added to this body before it reaches ElasticSearch.

## How?

ReactiveSearch Pipelines makes it very easy to override any endpoint. We just need to add a pipeline that gets invoked by the endpoint that we want to override and voila, we have a custom endpoint that works exactly how we want it to work.

## Example Scenario: Add location details based on passed IP

Let's take an example. We want to index data of an user. This users data also includes an `ip` field that indicates the IP address from where they signed up. We want to extract their location details and save it to the index as well.

So our pipeline will basically _intercept_ the document to be indexed, add a new field to it and then send it to ElasticSearch.

## Pre Setup

Before we start with the pipeline stages, let's setup the routes and other prerequisites of a pipeline. We want this pipeline to be invoked whenever data is to be indexed to the `user-info` index. So we can define it in the following way

```yaml
enabled: true
description: Index data into user-info with a location field

routes:
  - path: /user-info/_doc
    method: POST
      classify:
        category: elasticsearch
        acl: index
```

We are setting the category as `elasticsearch` because this will eventually lead to an elasticsearch call. Think of `acl` like a nested category that specifies exactly what the operation is. Here `index` as `acl` works perfectly as we are creating an indexing pipeline.

## Stages

We will have a few stages in this pipeline. We will start with the most important stage: `authorization`. Following stages will be executed:

1. authorise user
2. get location details
3. add details to body
3. index data

### Authorise User

This is one of the most important stages while defining a pipeline. We want to use the pre-built `authorization` stage which will make sure that the request contains credentials to access the endpoint being invoked.

This is important to make sure only the proper credentials can index data into the pipeline.

We can use this stage in the following way:

```yaml
- id: authorise user
  uses: authorization
```

Yes, as simple as that, we will take care of the rest.

### Get Location Details

Now that we know the user has access to index the data, let's use the ip field to get the location from it.

#### Things to Note

- For the location we will use the [ip-api](https://ip-api.com/docs/api:json).
- This stage will have to be run **asynchronously** because we will be making an external call.

Since, this is a custom stage, we will pass a **JavaScript** file to the pipeline. We will also pass the `async` stage set to `true` so that this stage is run asynchronously.

This stage will be defined in the followin way:

```yaml
- id: get location details
  scriptRef: "getLocation.js"
  async: true
```

In the above, we are referencing a `getLocation.js` in the `scriptRef` field.

> `scriptRef` is a path to a JS script that contains the code to be executed for this stage.

The file will be defined in the following way:

```js
async function getLocationFromIP(ip) {
    /* Get location from the passed IP address */
    const response = await fetch(`http://ip-api.com/json/${ip}`);

    if (response.status != 200) return "";

    /* Parse the response */
    const jsonResponse = JSON.parse(response);
    
    if (jsonResponse.status != "success") return "";

    /* Return the string in `city, state, country` format */
    return [jsonResponse.city, jsonResponse.regionName, jsonResponse.country].join(", ");
}

async function handleRequest() {
    const requestBody = JSON.parse(context.request.body);
    const passedIP = requestBody.ip;

    if (passedIP == undefined || passedIP == null || passedIP == "") return {};

    /* Get the location from IP */
    const location = await getLocationFromIP(passedIP);
    return {
        extractedLocation: location
    };
}
```

In the above script, we are adding an `extractedLocation` field in the context with the extracted location.

#### Why not update the request body directly?

The question might arise, why are we not updating the request body directly in the above script?

This is because stages that are running asynchronously, or in other words, that have the `async: true` set are not allowed to update the context values but they are allowed to add new fields to the context.

