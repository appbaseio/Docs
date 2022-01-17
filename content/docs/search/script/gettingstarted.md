---
title: 'Getting Started with Scripts'
meta_title: 'Getting started with scripts | Query Rules'
meta_description: 'Scripts (Javascript) are user defined functions that can be executed during the request or response cycle of a search query, while indexing data or as a cron job.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
    - script
    - query-rules
    - pipeline
sidebar: 'docs'
---

## What Are Scripts

A script is a user defined JavaScript function typically executed during the request or response cycle of a search query or when indexing data. A script can also be invoked with a cron trigger. Scripts are available as an action with query rules.

> **Note:** Conceptually, a script is run in a [V8 engine isolate](https://v8.dev/), and it is architecturally similar to how a Cloudflare worker operates.

Use-cases for scripts:
- Use a synchronous fetch request to get additional context, e.g. knowledge graph for a search query to return along with the search engine response
- Use an asynchronous fetch request to create a side-effect, e.g. saving search logs/state to an external system, recording of search analytics to an external system
- Use NLU/NLP to recognize entities and other PoS to modify the weights of the search query terms
- Use cryptographic utilities to apply additional security checks

Scripts run on the same machine that hosts the `reactivesearch-api` service (and Elasticsearch if it is hosted with appbase.io) and can make use of storage and state persistence using Elasticsearch.

### Types of Scripts

We can categorize the scripts into two categories on the basis of execution context.

- Request
- Response
- Cron

<b>Response</b> scripts would have access to the `request` and `envs` which can be used to within the script. A <b>Request</b> script must return the `request` object.

<b>Post-Request</b> scripts would have access to the `request`, `response` and `envs` and expected to return the `response` object.

<b>Cron</b> scripts would be run at a certain schedule (passed during creation). It will have access to just the user passed `envs`.

### Script context

Script has access to a global object named context (read only) that has the following properties:

#### request

> `cron` scripts do not get this field.

It contains the `request` information, which has the following structure:

```ts
{
    body: string,
    headers: Object
}
```

- `body` represents the request body in string format.
- `headers` represents request headers in the key/value format, where `key` represents the header name and `value` represents the header value.

#### response

> `cron` scripts do not get this field.

Response returned by Elasticsearch in the following format:

```ts
{
    code: number,
    body: string,
    headers: Object
}
```

- `code` HTTP response status code
- `body` represents the response body in string format.
- `headers` represents response headers in the key/value format, where `key` represents the header name and `value` represents the header value.

> Note: The `response` property is not available in <b>Pre-Request</b> scripts.

#### envs

> `cron` scripts do not get the following envs. It is passed the `envs` that the user sets while creating the cron script.

Environment variables specific to a request, which could be helpful to write conditional logic in a script. The `envs` object has the following properties:

```ts
{
    index: Array<string>,
    category: string,
    acl: string,
    origin: string,
    referer: string,
    ipv4: string,
    ipv6: string,
    query: string,
    type: string,
    customEvents: Object,
    filters: Object,
}
```

- <b>Environments available to all requests</b>

    - `index` represents the index used to query Elasticsearch
    - `category` Categories are analogous to the Elasticsearch API categories, like Cat API, Search API, Docs API and so on. You can check the categories at [here](https://api.reactivesearch.io/#c736042c-7247-41a7-ab26-91e6861a1167)
    - `acl` ACLs adds another layer of granularity within each Elasticsearch API category. You can find the ACLs at [here](https://api.reactivesearch.io/#c736042c-7247-41a7-ab26-91e6861a1167)
    - `origin` Request origin, for e.g. `https://my-search.domain.com`
    - `referer` HTTP referer, e.g. `https://my-search.domain.com/path?q=hello`
    - `ipv4` IP address v4
    - `ipv6` IP address v6

- <b>Environments specific to ReactiveSearch API</b>

    - `query`: Value to be searched on, for e.g `iphone`
    - `type`: Represents the `type` of request. [Read more](/docs/search/reactivesearch-api/implement/#type-of-queries)
    - `customEvents`: Represents a map of custom events used in request.
    - `filters`: Filters extracted from the request body of `term` type of requests, where - `key` represents the filter name and `value` is the filter value.


<b>An example with all environments</b>

```ts
{
	index: ["products"],
    category: 'reactivesearch',
    acl: 'reactivesearch',
    origin: 'https://my-search.domain.com',
    referer: 'https://my-search.domain.com/path?q=hello',
    ipv4: '29.120.12.12',
    ipv6: '2001:db8:3333:4444:5555:6666:7777:8888',
    query: "sneakers",
    type: "search",
    customEvents: { platform: 'mac' },
    filters: {"brand": "Puma"},
}
```

## How to define a script?
### Request script

A request script can be used to modify the incoming request or perform a side effect (for e.g. send reports to analytics) before the final request is made to Elasticsearch.

request script must implement the following function:

```ts
    function handleRequest() {
        // do something here
        return context.request
    }
```
<b>Example</b>

The following script modifies the request body by adding a filter by brand name.

```ts
    function handleRequest() {
        const requestBody = JSON.parse(context.request.body);
        return {
            ...context.request,
            body: JSON.stringify({
                ...requestBody,
                query: [
                    ...requestBody.query,
                    { 
						id: 'brandFilter', 
						execute: false, 
						type: 'term', 
						dataField: 'brand.keyword', 
						value: 'Appbase'
					}
                ]
            })
        }
    }
```

### Response script

Response script is useful to modify the Elasticsearch response or perform a side effect (for e.g. saved search) after getting the response from Elasticsearch.

Pre-request script must implement the following function:

```ts
    function handleResponse() {
        // do something here
        return context.response
    }
```

The following script modifies the response body by adding a custom value in response.

```ts
    function handleResponse() {
        const responseBody = JSON.parse(context.response.body);
        return { 
		    ...context.response, 
            body: JSON.stringify({ 
                ...responseBody, 
                custom_key: 'test' 
            }) 
        }
    }
```

## Cron Script

Cron scripts are useful to run a certain task with a schedule. For eg: thinnk of a script that fetches data from some external endpoint and adds it to a certain index every n minutes. Cron scripts allow to do that.

Unlike request and response scripts, cron scripts just take a block of code and runs it as a JS script. This gives the user more freedom regarding their code.

The following script adds a `data` to the `test` index.

The schedule should be passed in the `trigger.expression` field.

```ts
const data = {
    'data': {
        'my_data': true
    }
};

async function putData() {
    const r = await fetch('http://localhost:8000/test-v2/_doc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': context.envs.auth
        },
        body: JSON.stringify(data)

    });
}

putData();
```


## Validate Script

A script can be validated using the <a href="https://api.reactivesearch.io/#cef019de-b2da-4272-a38e-5ee0bb29ac6f" target="_blank">_script/validate</a> endpoint. It is possible to validate a script with custom context variables (`request`, `response` and `envs`).

The following request modifies the request body, which can be seen in the response of the <a href="https://api.reactivesearch.io/#cef019de-b2da-4272-a38e-5ee0bb29ac6f" target="_blank">_script/validate</a> route.

```bash
curl --location -g --request POST 'http://{{username}}:{{password}}@{{host}}/_script/validate' \
--data-raw '{
    "request": {
        "body": {
            "query": [
                {
                    "id": "search",
                    "react": {
                        "and": "brandFilter"
                    }
                }
            ]
        }
    },
    "script": "function handleRequest(){ const body = JSON.parse(context.request.body); return { ...context.request, body: JSON.stringify({...body, query: [...body.query, { id: `brandFilter`, execute: false, type: `term`, dataField: `brand.keyword`, value: nlp(`Microsoft top products`).topics().text() }] })} }",
    "envs": {
        "index": [
            "test"
        ]
    }
}'
```

## Create a Query rule with script

[Query Rules](/docs/search/rules/) are trigger events for the scripts. A rule can be defined with a script action and trigger condition.

The following request creates a rule with a script action to modify the request where `index` is `products`.

```bash
curl --location -g --request POST 'http://{{username}}:{{password}}@{{host}}/_rule' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "my-rule",
    "description": "To test query rule",
    "trigger": {
        "type": "filter",
        "expression": "'\''products'\'' in $index"
    },
    "actions": [
        {
            "type": "script",
            "script": "function handleRequest(){ const body = JSON.parse(context.request.body); return { ...context.request, body: JSON.stringify({...body, query: [...body.query, { id: `brandFilter`, execute: false, type: `term`, dataField: `brand.keyword`, value: nlp(`Microsoft top products`).topics().text() }] })} }"
        }
    ]
}'
```

You can check the endpoint details at <a href="https://api.reactivesearch.io/#c23c543b-8c03-4b7d-8f0b-45d22f0a478e" target="_blank">here</a>.

## Create a script rule with Appbase.io Dashboard

The query rules GUI (`Dashboard` -> `Search Relevancy` -> `Query Rules`) can be used to define a rule with script action. You can start with a script template and extend it as per your business logic.


<img alt="Script Rule" src="/images/gifs/script-rule.gif">
