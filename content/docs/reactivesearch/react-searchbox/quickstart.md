---
title: 'QuickStart'
meta_title: 'QuickStart to React SearchBox'
meta_description: 'React SearchBox is a lightweight react search library with some common utilities.'
keywords:
    - quickstart
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

[react-searchbox](https://github.com/appbaseio/react-searchbox) - React SearchBox is a standalone, lightweight search library which allows you to add custom UI components and allow seamless search systems.

##Installation

`React Searchbox` uses `Searchbase` as an internal dependency to connect with an Elastic Search system to perform search queries. To explore about Searchbase [click here](). To install React Searchbox you can use `npm` or `yarn` to get set as follows:

##Using npm

```js
npm install @appbaseio/react-searchbox
```

##Using yarn

```js
yarn add @appbaseio/react-searchbox
```

##Basic Usage

```js
import React, { Component } from 'react';

import { SearchBase, SearchBox } from '@appbaseio/react-searchbox';

export default class App extends Component {
	render() {
		return (
			<div>
				<SearchBase
					// Your ES index name
					index="good-books-ds"
					// Credentials to access details from the server
					credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
					// URL of the system
					url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
				>
					<SearchBox
						id="search-component"
						dataField={[
							{
								field: 'original_title',
								weight: 1,
							},
							{
								field: 'original_title.search',
								weight: 3,
							},
						]}
						title="Search"
						placeholder="Search for Books"
					/>
				</SearchBase>
			</div>
		);
	}
}
```

##Demo

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/demo" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Check the docs for API Reference [here](/docs/reactivesearch/react-searchbox/apireference/)
