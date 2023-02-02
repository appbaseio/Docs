---
title: 'Server Side Rendering'
meta_title: 'Server Side Rendering'
meta_description: 'Server Side Rendering enables us to pre-render the results on the server enabling better SEO for the app, and faster delivery of relevant results on an initial render to the users.'
keywords:
    - reactivesearch
    - ssr
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

Server-side rendering (SSR), is the ability of an application to contribute by displaying the web page on the server instead of rendering it in the browser. The Server-side sends a fully rendered page to the client

Some benefits offered by SSR technique:

- The initial page of the website load is faster as there are fewer codes to render.
- Good for minimal and static sites.
- Search engines can crawl the site for better SEO.


Reactivesearch internally runs on a redux store. With Server Side Rendering, you can handle the initial render when a user (or search engine crawler) first requests your app. To achieve the relevant results on an initial render, we need to pre-populate the redux store of ReactiveSearch.

ReactiveSearch provides an API that works out of the box with any SSR solution:

## How does it work?

The basic idea of SSR support for ReactiveSearch is to perform any necessary API calls to the search client and compute the initial state of App, then rehydrate the client side with the initialState computed on the server-side.

We split the concerns into:

- **server**: the main server entry to serve requested pages.
- **client**: the main browser entry (ultimately gets compiled to bundle.js).

### Client-side

The user needs to provide just two props to the `<reactive-base />` component.

- **contextCollector**: used by our library internally to compute the initial state at the server side. _(injected automatically by the server-side code)._

- **initialState**: the initial state of the app that is calculated at the server-side for hydration at client side.

Create a new component (Search.vue) which renders the ReactiveSearch components.
The `Search.vue` component must accept the `context-collector` and `initial-state` props.
```html
<template>
	<reactive-base			
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:context-collector="contextCollector"
		:initial-state="initialState"
	>
		<nav class="nav">
			<div class="title">Books Search</div>
			<search-box
				:autosuggest="false"
				:highlight="true"
				:URLParams="true"
				:data-field="['original_title', 'original_title.search']"
				component-id="SearchSensor"
				placeholder="Search by books names"
				icon-position="left"
				class-name="search"
			/>
		</nav>
		<reactive-list
			:size="12"
			:pagination="true"
			:URLParams="true"
			:react="{
				and: ['SearchSensor', 'Authors'],
			}"
			:inner-class="{
				resultStats: 'result-stats',
				list: 'list',
				listItem: 'list-item',
				image: 'image',
			}"
			component-id="SearchResult"
			data-field="original_title"
		>
			<template #renderItem="{ item }">
				<div :id="item._id" :key="item._id" class="flex book-content">
					<img :src="item.image" alt="Book Cover" class="book-image" />
					<div class="flex column justify-center ml20">
						<div class="book-header" inner-html="item.original_title"></div>
						<div class="flex column justify-space-between">
							<div>
								<div>
									by
									<span class="authors-list">{{ item.authors }}</span>
								</div>
								<div class="ratings-list flex align-center">
									<span class="stars">
										<i
											v-for="(item, index) in Array(
												item.average_rating_rounded,
											).fill('x')"
											:key="index"
											class="fas fa-star"
										/>
									</span>
									<span class="avg-rating"
										>({{ item.average_rating }} avg)</span
									>
								</div>
							</div>
							<span class="pub-year"
								>Pub {{ item.original_publication_year }}</span
							>
						</div>
					</div>
				</div>
			</template>
		</reactive-list>
	</reactive-base>
</template>

<script>
import {
	ReactiveBase,
	ReactiveList,
	SearchBox
} from '@appbaseio/reactivesearch-vue';

export default {
	name: 'Search',
	components: {
		ReactiveBase,
		ReactiveList,
		SearchBox,
	},
	props: {
		initialState: {
			type: Object,
			default: null,
		},
		contextCollector: {
			type: Function,
			default: null,
		},
	},
};
</script>
``` 

### Server Side

On the server-side code, the user imports a util method `getServerState(..., ...)` to compute the initial state of the App and passes this initial state back to the client-side.

   **getServerState(SearchComponent, pageURL)**: the first param of the function receives the `SearchComponent` component ref and the second param *[optional]* receives the URL string or query param object(should be parsed) to respect the URL query string.

> Assuming [Nuxt.js](https://nuxt.com/) used for SSR here.

```html
<script setup>
import { getServerState } from "@appbaseio/reactivesearch-vue";
import Search from "../components/search.vue";
const route = useRoute();
// Fetch server state at server-side and inject `initial-state` at client-side
const { data, pending, error, refresh } = await useAsyncData(() =>
  getServerState(Search, route.query)
);
const initialState = data.value;
</script>

<template>
  <div>
    <search :initial-state="initialState" />
  </div>
</template>
``` 

### Example Using Nuxt.js

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/dev/packages/vue/examples/with-ssr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="appbaseio/searchbox"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

