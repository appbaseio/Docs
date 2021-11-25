---
title: 'Popular and Recent Suggestions'
meta_title: 'Leverage Analytics Data - Popular Suggestions'
meta_description: 'A short guide on how to setup popular suggestions.'
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

Providing suggestions helps users type longer queries, a good suggestion ensures the best results. It is easy to build an auto-complete experience with appbase.io but <strong>popular suggestions</strong> allows you to display more specific and popular query suggestions.

We extract popular suggestions from the Appbase analytics and store them in a separate index named `.suggestions`. We populate this index on a daily basis so that your users will see fresh and relevant suggestions at all the times. Below is the representation of how a popular suggestion is stored.

```json
{
	"key": "iphone x",
	"count": 255
}
```

Here, the `key` represents the suggestion name and `count` represents the number of times that particular suggestion has been searched for actively.

> Note:
>
> popular suggestions is available as an enterprise feature. You need to have at least `Production-I` plan or an `Arc Enterprise` plan to avail this.

### When to use it?

Popular Suggestions is useful to curate search suggestions based on actual search queries that your users are making. This can be used by itself or alongside suggestions based on the product data to provide an augmented search experience.

Because popular suggestions roll up the search queries based on the unique occurrences in a period relevant to you, the suggestions index created this way is very fast. In addition to the automated job of popularising the popular suggestions index daily, you can also add external suggestions from other sources.


## Popular Suggestions Preferences

<!-- TODO: Add screenshot of Suggestions UI -->
![alt popular suggestions GUI](https://imgur.com/TMT2Svs.png)

You can set the preferences for popular suggestions from appbase.io dashboard's <strong>Popular Suggestions GUI</strong> under `Develop` section. These help optimize the behavior of suggestions for your specific use-case.

### Index Time Properties

#### Blacklist queries

A list of suggestion terms to be ignored when populating the popular suggestions index.

#### Number of days

Set the duration of days for which to populate the popular suggestions index. Value should be between [1, 90].

#### Transform Diacritics

When enabled, suggestion terms will be transformed to remove the diacritics from them. For an example, "Crème Brulée" becomes "Creme Brulee".

#### External Suggestions

You can define the external suggestions in the JSON format, each suggestion must have the `key` and `count` keys. The value of the `count` key determines the popularity of a particular suggestion.
You can check the below example of external popular suggestions:

```json
[
	{
		"count": 6,
		"indices": [
			"abc",
			"def"
		],
		"key": "hello"
	}
]
```

### Query Time Properties
#### Filter by minimum count

Set the minimum number of times a term must be searched by users before it is considered. Value should be ≥ 0.

<iframe src=https://play.reactivesearch.io/embed/B3H7H7GckNJF6F64J08j     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-B3H7H7GckNJF6F64J08j   ></iframe>

#### Filter by minimum hits

Set the minimum number of hits that must be returned for a suggestion term to be considered. Value should be between [0, 1000].

<iframe src=https://play.reactivesearch.io/embed/rQsvSyiAQiTnS4SP0yBj     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-rQsvSyiAQiTnS4SP0yBj   ></iframe>

#### Filter by minimum characters

Set the minimum number of characters that must be present for a suggestion term to be considered. Value should be between [0, 32].

<iframe src=https://play.reactivesearch.io/embed/ilA5lHKkZmT7Pv2p5y8s     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-ilA5lHKkZmT7Pv2p5y8s   ></iframe>

#### Whitelist indices

Only selected indices will be considered to calculate the suggestions.

<iframe src=https://play.reactivesearch.io/embed/W6PMIFSkY9GUdAEx0WVF     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-W6PMIFSkY9GUdAEx0WVF   ></iframe>

#### Size

Set the maximum number of popular suggestions to be displayed. Value should be between [0, 20].

<iframe src=https://play.reactivesearch.io/embed/r3DRlIufevo1oqwNAVe5     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-r3DRlIufevo1oqwNAVe5   ></iframe>

## Recent Suggestions Preferences

#### Minimum Characters

Set the minimum number of characters that must be present for a suggestion term to be considered. Value should be between [0, 32].

<iframe src=https://play.reactivesearch.io/embed/d8kkYsrzppMfnoy89WqI     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-d8kkYsrzppMfnoy89WqI   ></iframe>

#### Minimum Hits

Set the minimum number of hits that must be returned for a suggestion term to be considered. Value should be between [0, 1000].

<iframe src=https://play.reactivesearch.io/embed/MnIKiywURAoZuH3oN3ew     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-MnIKiywURAoZuH3oN3ew   ></iframe>

#### Size

Set the maximum number of recent suggestions to be displayed. Value should be between [0, 20].

<iframe src=https://play.reactivesearch.io/embed/GvDKUUUdvlPiqZPB85NU     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-GvDKUUUdvlPiqZPB85NU   ></iframe>

#### Indices

Only selected indices will be considered to calculate the suggestions.

<iframe src=https://play.reactivesearch.io/embed/yVmuLESyDRcwSXQD2tDi     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"     title=rs-playground-yVmuLESyDRcwSXQD2tDi   ></iframe>

## Frontend Examples

### Usage Example With Searchbox

```js
import SearchBase from '@appbaseio/searchbase';
import searchbox from '@appbaseio/searchbox';

const instance = new SearchBase({
	index: '.suggestions',
	credentials: `CLUSTER_CREDENTIALS`,
	url: 'CLUSTER_URL',
	size: 5,
	dataField: [
		{
			field: "key",
			weight: 3
		},
		{
			field: "key.autosuggest",
			weight: 1
		}
	],
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

### Usage Example With ReactiveSearch

<!-- TODO: The example is not complete -->

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
				dataField={[
					{
						"field": "key",
						"weight": 3
					},
					{
						"field": "key.autosuggest",
						"weight": 1
					},
				]}
                componentId="SearchComponent"
            />
        </div>
    </ReactiveBase>
);

export default Main;
```
