---
title: 'ReactiveSearch Vue: Quickstart'
meta_title: 'ReactiveSearch Vue: Quickstart'
meta_description: 'Getting started with ReactiveSearch Vue, a search UI components library for Elasticsearch'
keywords:
    - reactivesearch
    - quickstart
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

### Step 0: Create Boilerplate with Vue CLI

In this quickstart guide, we will create a books based search engine based on a dataset of 10,000 books using ReactiveSearch.

This is how your final app will look like at the end of following this tutorial, in just 10 minutes 🚀.

<iframe src="https://codesandbox.io/embed/github/appbaseio/vue-quick-start/tree/step-5?from-embed=&file=/src/App.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

We can either add ReactiveSearch to an existing app or create a boilerplate app with [Vue Cli](https://cli.vuejs.org/guide/installation.html). For this quick start guide, we will use the Vue CLI.



#### Install Vue Cli

```bash
yarn global add @vue/cli
```

#### Create Project

```bash
vue create my-awesome-search && cd my-awesome-search
```

or

Alternatively, you can go to Codesandbox.io and choose the Vue Template

![Vue Template, Codesandbox](https://i.imgur.com/7zy9GVh.png).

### Step 1: Install ReactiveSearch

We will fetch and install [`reactivesearch-vue`](https://www.npmjs.com/package/@appbaseio/reactivesearch-vue) module using yarn or npm.

```bash
yarn add @appbaseio/reactivesearch-vue
```

or

```bash
npm install @appbaseio/reactivesearch-vue
```

or

Alternatively, you can directly add the `@appbaseio/reactivesearch-vue`  dependency to codesandbox.io.


### Step 2: Register Components

To use ReactiveSearch components you need to register them in your app, you can globally import the components in the `main.js` file of your project.

#### Register all components

```js
import Vue from 'vue';
import ReactiveSearch from '@appbaseio/reactivesearch-vue';
import App from './App';

const app = createApp(App);

app.use(ReactiveSearch);

app.mount('#app');
```

The above imports ReactiveSearch entirely.

#### Only register the components you need (recommended)

```js
import Vue from 'vue';
import { ReactiveBase } from '@appbaseio/reactivesearch-vue';
import App from './App';

const app = createApp(App);

app.use(ReactiveBase);

app.mount('#app');
```

---

### Step 3: Adding the first component

Lets add our first ReactiveSearch component: [ReactiveBase](/docs/reactivesearch/vue/overview/reactivebase/), it is a backend connector where we can configure the Elasticsearch index / authorization setup.

We will be using `kebab-case` here. You can read more about component naming convention [here](https://vuejs.org/v2/guide/components-registration.html#Name-Casing).

We will demonstrate creating an index using [appbase.io](https://appbase.io) service, although you can use any Elasticsearch backend within ReactiveBase.

![create an appbase.io app](https://www.dropbox.com/s/qa5nazj2ajaskr6/wky0vrsPPB.gif?raw=1)

**Caption:** For the example that we will build, the app is called **good-books-ds** and the associated read-only credentials are **04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31**. You can browse and export the dataset to JSON or CSV from [here].(https://dejavu.appbase.io/?appname=good-books-ds&url=https://04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31@appbase-demo-ansible-abxiydt-arc.searchbase.io&mode=edit).

**Note:** Clone app option will not work with these credentials here have very narrow access scope (to prevent abuse).

We will update our `src/App.vue` file to add the ReactiveBase component.

```html
<template>
	<div id="app">
		<reactive-base
			url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
			app="good-books-ds"
			credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
		>
			<h1>Hello from ReactiveBase 👋</h1>
		</reactive-base>
	</div>
</template>
```

This is how the app should look after running the `yarn run serve` command.

<iframe src="https://codesandbox.io/embed/github/appbaseio/vue-quick-start/tree/step-1?from-embed=&file=/src/App.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
---

### Step 4: Adding Search and Aggregation components

For this app, we will be using [search-box](/docs/reactivesearch/vue/search/searchbox/), [multi-list](/docs/reactivesearch/vue/list/multilist/) and [single-range](/docs/reactivesearch/vue/range/singlerange/) components for searching and filtering on the index. And [reactive-list](/docs/reactivesearch/vue/result/reactivelist/) component for showing the search results.

Lets add them within the ReactiveBase component. But before we do that, we will look at the important props for each.

#### SearchBox

```html
<search-box
	componentId="SearchBox"
	placeholder="Search for books or authors"
	:dataField="[
		{
			'field': 'authors',
			'weight': 3
		},
		{
			'field': 'authors.autosuggest',
			'weight': 1
		},
		{
			'field': 'original_title',
			'weight': 5
		},
		{
			'field': 'original_title.autosuggest',
			'weight': 1
		}
	]"
/>
```
The [search-box](/docs/reactivesearch/vue/search/searchbox/) component creates a searchbox UI component that queries on the specified fields with weights as specified by `dataField` prop. That's all it takes to create a functional search component.

At this point, you should see the following:

<iframe src="https://codesandbox.io/embed/github/appbaseio/vue-quick-start/tree/step-2?from-embed=&file=/src/App.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

#### MultiList

Next, we will add the [multi-list](/docs/reactivesearch/vue/list/multilist/) component. As the name suggests, it creates a multiple selection aggregation (aka facet) to filter our search results by.

```html
<multi-list
	componentId="Authors"
	dataField="authors.keyword"
	title="Popular Authors"
	:aggregationSize="5"
/>
```

Aggregation components like MultiList fire a term type query. You can think of a term query as an exact match query, unlike a search query which involves more nuances. The use of the `.keyword` suffix for the `authors` field informs the search engine that the query here is of an exact type.

The `aggregationSize` prop is used to specify the total aggregations (think buckets) that you want returned based on the dataField value.

**Note:** The `dataField` value in MultiList is of string type, since an aggregation is always performed on a single field. In contrast, you may want to search on multiple fields in different ways, so the SearchBox component uses an array of fields instead.

#### SingleRange

Next, we will add the [single-range](/docs/reactivesearch/vue/range/singlerange/) component for creating a ratings based filter for our book search.

```html
<single-range
    componentId="Ratings"
	dataField="average_rating"
	defaultValue="All Books"
	:data="[
		{ start: 0, end: 5, label: 'All Books' },
		{ start: 4, end: 5, label: '4 stars and up' },
		{ start: 3, end: 5, label: '3 stars and up' },
	]"
	title="Book Ratings"
/>
```

The SingleRange operates on a numeric datatype field and fires a range query. The `data` prop of SingleRange allows specifying a [start, end] range and a label associated with it. Using `defaultValue`, we can preselect a particular option. In this case, we're preselecting all the books that have a rating of `All Books`.

At this point, this is how our app should be looking:

<iframe src="https://codesandbox.io/embed/github/appbaseio/vue-quick-start/tree/step-3?from-embed=&file=/src/App.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Step 5: Adding Results Component

Finally, we need a component to show the matching results. [**reactive-list**](/docs/reactivesearch/vue/result/reactivelist/) does exactly this.

```html
 <reactive-list
	componentId="SearchResult"
	dataField="original_title.keyword"
	:pagination="true"
	:from="0"
	:size="5"
	:react="{ and: ['Ratings', 'Authors', 'SearchBox'] }"
	>
	<template #renderItem="{ item }">
		<div key="item._id">
			<img
				:src="item.image"
				alt="Book Cover"
			/>
			<div>{{ item.original_title }}</div>
			<div>by {{ item.authors }}</div>               
			<div>({{ item.average_rating }} avg)</div>                    
			<div>Pub {{ item.original_publication_year }}</div>
		</div>
	</template>
</reactive-list>
```

The `react` prop here specifies that the result should depend on the queries for our searchbox, authors filter and the ratings filter. It's pretty neat!. Every time the user changes the input value, a new query is fired -- you don't need to write a manual query for any of the UI components here, although you can override it via `customQuery` prop.

Now, we will put all three components together to create the UI view.

```html
<template>
  <div id="app">
    <reactive-base
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      app="good-books-ds"
      credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
    >
      <search-box
        componentId="SearchBox"
        placeholder="Search for books or authors"
        :dataField="[
			{
				'field': 'authors',
				'weight': 3
			},
			{
				'field': 'authors.autosuggest',
				'weight': 1
			},
			{
				'field': 'original_title',
				'weight': 5
			},
			{
				'field': 'original_title.autosuggest',
				'weight': 1
			}
		]"
      />
      <multi-list
        componentId="Authors"
        dataField="authors.keyword"
        title="Select Authors"
        selectAllLabel="All Authors"
        placeholder="Search for authors"
        :aggregationSize="5"
      />
      <single-range
		componentId="Ratings"
		dataField="average_rating"
		defaultValue="All Books"
		:data="[
			{ start: 0, end: 5, label: 'All Books' },
			{ start: 4, end: 5, label: '4 stars and up' },
			{ start: 3, end: 5, label: '3 stars and up' },
		]"
		title="Book Ratings"
	  />

      <reactive-list
        componentId="SearchResult"
        dataField="original_title.keyword"
        :pagination="true"
        :from="0"
        :size="5"
        :react="{ and: ['Ratings', 'Authors', 'SearchBox'] }"
      >
        <template #renderItem="{ item }">
          <div key="item._id">
            <img :src="item.image" alt="Book Cover" />
            <div>{{ item.original_title }}</div>
            <div>by {{ item.authors }}</div>
            <div>({{ item.average_rating }} avg)</div>
            <div>Pub {{ item.original_publication_year }}</div>
          </div>
        </template>
      </reactive-list>
    </reactive-base>
  </div>
</template>

```

At this point, you should be seeing our entire app functionally (minus the layouting and styles):

<iframe src="https://codesandbox.io/embed/github/appbaseio/vue-quick-start/tree/step-4?from-embed=&file=/src/App.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

We have built our entire search UI in just 80 lines!

The only thing missing at this point is the styling. ReactiveSearch doesn't use a layout system internally. For example, if you are using a grid from Bootstrap or Materialize, you can use that to style the layout. Or if you prefer to use Flex, you can use that. We can now import CSS to make the app look cleaner.

---

### Step 6: Adding Layout and Styles

ReactiveSearch doesn't use a layout system internally. For example, if you are using a grid from Bootstrap or Materialize, you can use that to style the layout. Or if you prefer to use Flex, you can use that. Here, we will just make use of CSS Flex.

```html
<reactive-base>
    <div v-bind:style="{ 'display': 'flex', 'flex-direction': 'row' }">
        <div
          v-bind:style="{
            'width': '30%',
            'flex-direction': 'column',
            'text-align': 'left',
            'padding': '10px',
			'font-size': '14px',
          }"
        >
            <multi-list/>
            <single-range/>
        </div>
        <div
          v-bind:style="{
            'display': 'flex',
            'flex-direction': 'column',
            'padding': '10px',
            'width': '66%',
          }"
        >
            <search-box/>
            <reactive-list/>
        </div>
    </div>
</reactive-base>
```

To make the cards look aligned, add styles to the wrapper `div` within the reactive-list:

```html
<reactive-list
	componentId="SearchResult"
	dataField="original_title.keyword"
	:class="{ full: showBooks }"
	:pagination="true"
	:from="0"
	:size="5"
	:react="{ and: ['Ratings', 'Authors', 'SearchBox'] }"
	>
	<template #renderItem="{ item }">
		<div
		key="item._id"
		v-bind:style="{
			display: 'flex',
			background: 'white',
			margin: '10px 0',
			'box-shadow':
			'0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
		}"
		>
			<img
				:src="item.image"
				alt="Book Cover"
				v-bind:style="{
				height: '150px',
				width: '110px',
				'background-size': 'cover',
				}"
			/>
			<div v-bind:style="{ 'text-align': 'left' }">
				<div
				v-bind:style="{
					'font-weight': 'bold',
					padding: '10px 10px 5px 10px',
				}"
				>
					{{ item.original_title }}
				</div>
				<div v-bind:style="{ padding: '5px 10px' }">
					by {{ item.authors }}
				</div>
				<div v-bind:style="{ padding: '5px 10px' }">
					({{ item.average_rating }} avg)
				</div>
				<div v-bind:style="{ padding: '5px 10px' }">
					Pub {{ item.original_publication_year }}
				</div>
			</div>
		</div>
	</template>
</reactive-list>
```

If you have followed along, this is how our app should look now.

<iframe src="https://codesandbox.io/embed/github/appbaseio/vue-quick-start/tree/step-5?from-embed=&file=/src/App.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

For convenience, you can check out the final code from the ReactiveSearch demos - https://github.com/appbaseio/vue-quick-start/tree/step-5.