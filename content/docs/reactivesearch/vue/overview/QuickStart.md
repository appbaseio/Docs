---
title: 'ReactiveSearch Quickstart'
meta_title: 'ReactiveSearch Quickstart'
meta_description: 'Get started with ReactiveSearch.'
keywords:
    - reactivesearch
    - quickstart
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

### Step 0: Create Boilerplate with Vue CLI

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

If you're using codesandbox.io, choose a Vue template codesandbox.

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

If you're following this on Codesandbox.io, add dependency `@appbaseio/reactivesearch-vue` .


### Step 2: Register Components

To use ReactiveSearch components you need to register them in your app, you can globally import the components in the `main.js` file of your project.

#### Register all components

```js
import Vue from 'vue';
import ReactiveSearch from '@appbaseio/reactivesearch-vue';
import App from './App';
Vue.config.productionTip = false;

Vue.use(ReactiveSearch);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>',
});
```

The above imports ReactiveSearch entirely.

#### Only register the components you need (recommended)

```js
import Vue from 'vue';
import { ReactiveBase } from '@appbaseio/reactivesearch-vue';
import App from './App';

Vue.config.productionTip = false;

Vue.use(ReactiveBase);

new Vue({
	el: '#app',
	components: { App },
	template: '<App/>',
});
```

---

### Step 3: Adding the first component

Lets add our first ReactiveSearch component: [ReactiveBase](/docs/reactivesearch/vue/overview/ReactiveBase/), it is a backend connector where we can configure the Elasticsearch index / authorization setup.

We will be using `kebab-case` here. You can read more about component naming convention [here](https://vuejs.org/v2/guide/components-registration.html#Name-Casing).

We will demonstrate creating an index using [appbase.io](https://appbase.io) service, although you can use any Elasticsearch backend within ReactiveBase.

![create an appbase.io app](https://www.dropbox.com/s/qa5nazj2ajaskr6/wky0vrsPPB.gif?raw=1)

**Caption:** For the example that we will build, the app is called **awesome-book-store** and the associated read-only credentials are **Qw9ksHtrv:16bc5344-d5c2-4b0a-8f67-1ba01c522015**. You can browse and clone the data-set into your own app from [here](https://opensource.appbase.io/dejavu/#?input_state=XQAAAAKJAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsvRMTQJ5ZqWKZTLY3aEkMgq8JpWAf6hdaFvES_EOh3Q67hkj9KexzVueOZtE9Yjzg5dWJ-8Co_BW4I0eJMMtcp-5tCsJFBZNEjgqrRMtI9N3OoxR241W75d89FYYHDzKqqAKi_BCSdnByUfb528IbiGgi-j92TSCbITs9uTy9_yjInAoiKbggwlnVy_AIXjEo0lKFzSTYxxluneRw0SMjWPvUX3wjbvnfFoP_pPSSgunirljth1UqBDKNxI6ijC5k_pdjV4G2JO5X-x4MzPpGy0oFDosAKi5GMAntlMoaJhi4vOi-TuCb4T4SODO-5WmBc8GoNbXsv_siHjA&editable=false).

We will update our `src/App.vue` file to add the ReactiveBase component.

```html
<template>
	<div id="app">
		<reactive-base
			url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
			app="good-books-ds"
			credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
			enableAppbase
		>
			<h1>Hello from ReactiveBase 👋</h1>
		</reactive-base>
	</div>
</template>

<script>
	export default {
		name: 'App',
	};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
```

This is how the app should look after running the `yarn run serve` command.

<iframe src="https://codesandbox.io/embed/summer-currying-l0mf0?fontsize=14&hidenavigation=1&theme=dark&view=preview"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="summer-currying-l0mf0"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

---

### Step 4: Adding Filters Component

For this app, we will be using [multi-list](/docs/reactivesearch/vue/list/MultiList/) and [single-range](/docs/reactivesearch/vue/range/SingleRange/) components for filtering the data-set. And [reactive-list](/docs/reactivesearch/vue/result/ReactiveList/) component for showing the search results.

Lets add them within the ReactiveBase component. But before we do that, we will look at the important props for each.

```html
<multi-list
	componentId="Authors"
	dataField="authors.keyword"
	class="filter"
	title="Select Authors"
	selectAllLabel="All Authors"
/>
```

The [**multi-list**](/docs/reactivesearch/vue/list/MultiList/) creates a multiple selections based list UI component that is connected to a database field and shows items using the `author.keyword` field in the data-set. Here is how it will look visually.

![](https://i.imgur.com/WOvQKGj.png)

Next, we will look at the [**single-range**](/docs/reactivesearch/vue/range/SingleRange/) component for creating a ratings based filter.

```html
<single-range
	componentId="Ratings"
	dataField="average_rating"
	:data="[
    { 'start': 0, 'end': 3, 'label': 'Rating < 3' },
    { 'start': 3, 'end': 4, 'label': 'Rating 3 to 4' },
    { 'start': 4, 'end': 5, 'label': 'Rating > 4' }
  ]"
	title="Book Ratings"
	class="filter"
/>
```

![](https://i.imgur.com/EVW0ran.png)

**single-range** filters the DB by `rating` field based on the UI choice the user makes. We also set the _Rating > 4_ option to be default selected when the UI loads up first.

### Step 5: Adding Search and Result Components

For this we will be using [data-search](/docs/reactivesearch/vue/search/DataSearch/) component that creates a search box UI component that is connected to one or more database fields. In this scenario, search can be implemeted on title of the book or on the author of the book.

```html
<data-search
	componentId="SearchBox"
	className="search-container"
	:dataField="[
		'authors',
		'authors.autosuggest',
		'original_title',
		'original_title.autosuggest',
	]"
	:fieldWeights="[3, 1, 5, 1]"
/>
```

Finally, we need a component to show the matching results. [**reactive-list**](/docs/reactivesearch/vue/result/ReactiveList/) does exactly this.

```html
<reactive-list
	componentId="SearchResult"
	dataField="original_title.keyword"
	className="result-list-container"
	:class="{ full: showBooks }"
	:pagination="true"
	:from="0"
	:size="5"
	:react="{ and: ['Ratings', 'Authors', 'SearchBox'] }"
>
	<div slot="renderItem" slot-scope="{ item }">
		<div class="flex book-content" key="item._id">
			<img :src="item.image" alt="Book Cover" class="book-image" />
			<div class="flex column justify-center ml20">
				<div class="book-header">{{ item.original_title }}</div>
				<div class="flex column justify-space-between">
					<div>
						<div>by <span class="authors-list">{{ item.authors }}</span></div>
						<div class="ratings-list flex align-center">
							<span class="stars">
								<i
									v-for="(item, index) in Array(item.average_rating_rounded).fill('x')"
									class="fas fa-star"
									:key="index"
								/>
							</span>
							<span class="avg-rating">({{item.average_rating}} avg)</span>
						</div>
					</div>
					<span class="pub-year">Pub {{item.original_publication_year}}</span>
				</div>
			</div>
		</div>
	</div>
</reactive-list>
```

The `react` prop here specifies that it should construct a query based on the currently selected values of the search box and ratings-filter components. Every time the user changes the input value, a new query is fired -- you don't need to write a manual query for any of the UI components here, although you can override it via `customQuery` prop.

This is how the app looks after adding ReactiveList component:

![](https://i.imgur.com/4p2Nn0i.jpg)

Now, we will put all three components together to create the UI view.

```html
<template>
  <div id="app">
    <reactive-base
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      app="good-books-ds"
      credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
      enableAppbase
    >
      <div class="filters-container">
        <multi-list
          componentId="Authors"
          dataField="authors.keyword"
          class="filter"
          title="Select Authors"
          selectAllLabel="All Authors"
          :size="5"
        />
        <single-range
          componentId="Ratings"
          dataField="average_rating"
          :data="[
            { start: 0, end: 3, label: 'Rating < 3' },
            { start: 3, end: 4, label: 'Rating 3 to 4' },
            { start: 4, end: 5, label: 'Rating > 4' },
          ]"
          title="Book Ratings"
          class="filter"
        />
      </div>
      <data-search
        componentId="SearchBox"
        className="search-container"
        :dataField="[
          'authors',
          'authors.autosuggest',
          'original_title',
          'original_title.autosuggest',
        ]"
        :fieldWeights="[3, 1, 5, 1]"
      />
      <reactive-list
        componentId="SearchResult"
        dataField="original_title.keyword"
        className="result-list-container"
        :class="{ full: showBooks }"
        :pagination="true"
        :from="0"
        :size="5"
        :react="{ and: ['Ratings', 'Authors', 'SearchBox'] }"
      >
        <div slot="renderItem" slot-scope="{ item }">
          <div class="flex book-content" key="item._id">
            <img :src="item.image" alt="Book Cover" class="book-image" />
            <div class="flex column justify-center ml20">
              <div class="book-header">{{ item.original_title }}</div>
              <div class="flex column justify-space-between">
                <div>
                  <div>
                    by <span class="authors-list">{{ item.authors }}</span>
                  </div>
                  <div class="ratings-list flex align-center">
                    <span class="stars">
                      <i
                        v-for="(item, index) in Array(
                          item.average_rating_rounded
                        ).fill('x')"
                        class="fas fa-star"
                        :key="index"
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
        </div>
      </reactive-list>
    </reactive-base>
  </div>
</template>

<script>
	import "./styles.css";

	export default {
  		name: "app",
  		data: function () {
    		return {
      			showBooks: window.innerWidth <= 768 ? true : false,
    		};
  		},
  		methods: {
    		switchContainer: function () {
      			return (this.showBooks = !this.showBooks);
    		},	
  		},
	};
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
```

If you have followed along so far, you should see a screen similar to:

<iframe src="https://codesandbox.io/embed/suspicious-bouman-0ooui?fontsize=14&hidenavigation=1&theme=dark&view=preview"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="suspicious-bouman-0ooui"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

We have built our entire search UI in just 80 lines!

The only thing missing at this point is the styling, ReactiveSearch doesn't use a layout system internally. For example, if you are using a grid from Bootstrap or Materialize, you can use that to style the layout. Or if you prefer to use Flex, you can use that. We can now import CSS to make the app look cleaner.

---

### Step 6: Adding CSS

By importing [styles.css](https://github.com/appbaseio/reactivesearch/blob/next/packages/vue/demos/good-books/src/styles.css) file, here is our final app layout and responsive methods to switch between container.

```html
<script>
	import './styles.css';

	export default {
		name: 'app',
		data: function() {
			return {
				showBooks: window.innerWidth <= 768 ? true : false,
			};
		},
		methods: {
			switchContainer: function() {
				return (this.showBooks = !this.showBooks);
			},
		},
	};
</script>
```

If you have followed along, this is how our app should look now.

<iframe src="https://codesandbox.io/embed/quiet-sun-zr2bu?fontsize=14&hidenavigation=1&theme=dark&view=preview"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="quiet-sun-zr2bu"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

For convenience, you can check out the final code from the ReactiveSearch demos - https://github.com/appbaseio/reactivesearch/tree/next/packages/vue/demos/good-books.

You can even check the final code [here](https://codesandbox.io/s/quiet-sun-zr2bu) on Codesandbox.io.


