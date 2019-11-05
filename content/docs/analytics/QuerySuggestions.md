---
title: 'Query Suggestions'
meta_title: 'Leverage Analytics Data - Query Suggestions'
meta_description: 'A short guide on how to setup query suggestions.'
keywords:
    - concepts
    - appbase
    - analytics
    - implement
    - query
    - suggestions
sidebar: 'docs'
---

## Overview

Providing suggestions helps users type longer queries, a good suggestion ensures the best results. It is easy to build an auto-complete experience with appbase.io but <strong>query suggestions</strong> allows you to display more specific and popular suggestions.

We extract query suggestions from the Appbase analytics and store them in a separate index named `.suggestions`, we populate this index daily so you'll get the fresh suggestions at all times. This is how a query suggestion will look like, where `key` represents the suggestion name and `count` represents the number of times that particular suggestion has been searched.

```json
{
	"key": "Iphone",
	"count": 255
}
```

> Note:
>
> Query suggestions is an enterprise feature that is only accessible for the customers having enterprise plans or on trial accounts. 

### Why use it?

1. When you have a large data-set
2. You want to curate suggestions and show the ones which meet specific criteria, e.g. don't show suggestions which will yield no results.

## How to set preferences

You can set these preferences from the appbase.io dashboard's <strong>query suggestions GUI</strong> under `Develop` section.

### Filter by minimum count

It lets you define the minimum count value which means that only those suggestions which have the larger `count` value will get populated in the suggestions index. The default value is set to `1`.

### Filter by minimum hits

By default, the suggestions index only includes queries that return at least five results in the source index. You can configure this limit from the dashboard.

### Blacklist queries

You can define a set of unwanted queries which will be ignored to extract the suggestions.

### Whitelist indices

It allows you to define which index/indices should be considered to populate the suggestions.

### Number of days

By default, we calculate the suggestions for past `30` days which is <strong>configurable</strong>. We recommend to not use a value less than `30` so you have enough data in your index.

### External Suggestions
Since analytics is the only source to populate the `.suggestions` index. When you get started, you'll need some kind of starting data which can be helpful to display the suggestions.

You can define the external suggestions in the JSON format, each suggestion must have the `query` and `count` keys. The value of the `count` key determines the popularity of a particular suggestion.
You can check the below example of external query suggestions:

```json
[
	{
		"query": "iphoneX",
		"count": 10000, // scoring parameter
		"meta": {
			// define meta properties
			"image": "https://abc.com/cat.png"
		}
	},
	{
		"query": "samsung",
		"count": 700
	}
]
```

## How to query suggestions

We populate the suggestions in `.suggestions` index, to use the query suggestions you just need to use the `.suggestions` index to get the hits.

### Uses with Searchbox

```js
import Searchbase from '@appbaseio/searchbase';
import searchbox from '@appbaseio/searchbox';

const instance = new Searchbase({
	index: '.suggestions',
	credentials: `CLUSTER_CREDENTIALS`,
	url: 'CLUSTER_URL',
	size: 5,
	dataField: 'key',
});
searchbox('#git', {}, [
	{
		source: searchbox.sources.hits(instance),
		templates: {
			suggestion: function(suggestion) {
				return `<p class="is-4">${suggestion.label}</p>`;
			},
			empty: function() {
				return `<div>No Results</div>`;
			},
			loader: function() {
				return `<div>Loader</div>`;
			},
			footer: function({ query, isEmpty }) {
				return `
                    <div style="background: #eaeaea; padding: 10px;">Footer</div>
                `;
			},
			header: function({ query, isEmpty }) {
				return `
                    <div style="background: #efefef; padding: 10px;">
                        Hello From Header
                    </div>
                `;
			},
		},
	},
]);
```

### Uses with ReactiveSearch

```js
import React from 'react';
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';

const Main = () => (
    <ReactiveBase
        app=".suggestions"
        credentials="CLUSTER_CREDENTIALS"
    >
        <div className="col">
            <DataSearch
                title="DataSearch"
                dataField="key"
                componentId="SearchComponent"
            />
        </div>
    </ReactiveBase>
);

export default Main;
```
