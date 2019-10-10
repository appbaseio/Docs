---
title: 'QuickStart'
meta_title: 'QuickStart to SearchBox'
meta_description: 'SearchBox is a lightweight search library with some common utilities.'
keywords:
    - quickstart
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'searchbox'
---

[searchbox](https://github.com/appbaseio/searchbox) - A lightweight search library with some common utilities.

## Installation

```js
npm install @appbaseio/searchbox @appbaseio/searchbase
// or
yarn add @appbaseio/searchbox @appbaseio/searchbase
```

## Usage

**index.html**
```html
<!-- Head elements -->
<body>
	<!-- Other elements -->
	<input type="text" id="git" placeholder="Search movies..." />
	<script src="./index.js"></script>
</body>
```

**index.js**

```js
import Searchbase from '@appbaseio/searchbase';
import searchbox from '@appbaseio/searchbox';

const instance = new Searchbase({
	index: 'gitxplore-latest-app',
	credentials: 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38',
	url: 'https://scalr.api.appbase.io',
	size: 5,
	dataField: [
		'name',
		'description',
		'name.raw',
		'fullname',
		'owner',
		'topics'
	]
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
			}
		}
	}
]);
```

