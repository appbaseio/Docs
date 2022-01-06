---
title: 'Getting Started'
meta_title: 'Introduction to Script'
meta_description: 'Query rules can act like a trigger event for a script to perform side effects'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
    - script
    - pipeline
sidebar: 'docs'
---

## Script Definition
A script is a function written in JavaScript that must return the request/response based on the execution context.

### Types of Scripts
We can categorize the scripts in two categories on the basis of execution context.
- Pre-Request
- Post-Request

<b>Pre-Request</b> scripts would have access to the `request` and `envs` which can be used to implement the script. A <b>Pre-Request</b> script must return the `request` object.

<b>Post-Request</b> scripts would have access to the `request`, `response` and `envs` and expected to return the `response` object.

### Script context
Script has access to a global object named context(read only) which would have the following properties:

#### request
It contains the `request` information, which has the following structure:

```ts
{
    body: string,
    headers: Object
}
```

- `body` represents the request body in string format.
- `headers` Request headers in key/value format, where `key` represents the header name and `value` is the header value.

#### response
Response returned by Elasticsearch in following format:

```ts
{
    code: number,
    body: string,
    headers: Object
}
```
- `code` HTTP response status code
- `body` represents the response body in string format.
- `headers` Response headers in key/value format, where `key` represents the header name and `value` is the header value.

> Note: The `response` property is not available in <b>Pre-Request</b> scripts.

#### envs
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


<b>An example with all Environments</b>

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

## How to define script?
### Pre-Request script
A pre-request script can be used to modify the incoming request or perform a side effect (for e.g. send reports to analytics) before the final request is made to Elasticsearch.

Pre-request script must implement the following function:

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

### Post-Request script
Post-request script is useful to modify the Elasticsearch response or perform a side effect (for e.g. saved search) after getting the response from Elasticsearch.

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


## Validate Script
A script can be validated using <a href="https://api.reactivesearch.io/#cef019de-b2da-4272-a38e-5ee0bb29ac6f" target="_blank">_script/validate</a> endpoint. It is possible to validate script with custom context variables (`request`, `response` and `envs`).

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