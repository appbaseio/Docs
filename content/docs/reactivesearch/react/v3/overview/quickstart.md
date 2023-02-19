---
title: 'Quickstart'
meta_title: 'ReactiveSearch Quickstart'
meta_description: 'Getting started with ReactiveSearch, a search UI components library for Elasticsearch'
keywords:
    - reactivesearch
    - quickstart
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-v3-reactivesearch'
---

### Create React App Boilerplate

In this quickstart guide, we will create a books based search engine based on a dataset of 10,000 books using ReactiveSearch.

This is how your final app will look like at the end of following this tutorial, in just 10 minutes 🚀

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/v3/packages/web/examples/MyAwesomeSearchStep5?from-embed=&file=/src/App.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

We can either add ReactiveSearch to an existing app or create a boilerplate app with [Create React App (CRA)](https://github.com/facebookincubator/create-react-app). For this quickstart guide, we will use the CRA.

```bash
create-react-app my-awesome-search && cd my-awesome-search
```

OR

Alternatively, you can go to Codesandbox.io and choose the React Template

![React Template, Codesandbox](https://i.imgur.com/Vl4BVZ0.png)

### Step 1: Install ReactiveSearch

We will fetch and install [`reactivesearch`](https://www.npmjs.com/package/@appbaseio/reactivesearch) module using yarn or npm.

```bash
yarn add @appbaseio/reactivesearch
```

or

```bash
npm install @appbaseio/reactivesearch
```

OR

Alternatively, you can directly add the `@appbaseio/reactivesearch` dependency to codesandbox.io.

---

### Step 2: Adding the first component

Lets add our first ReactiveSearch component: [ReactiveBase](/docs/reactivesearch/react/v3/overview/reactivebase/), it is a provider component that allows specifying the Elasticsearch index to connect to. Here, we will be using an Elasticsearch instance hosted with appbase.io. [Sign up here to create your cluster](https://dashboard.appbase.io/signup?utm_source=docs&utm_medium=react&utm_campaign=appbaseio). If you already have an Elasticsearch cluster setup, you can see [this guide](https://docs.appbase.io/docs/hosting/byoc/) on how to connect appbase.io to it.

![create an appbase.io index](https://www.dropbox.com/s/qa5nazj2ajaskr6/wky0vrsPPB.gif?raw=1)

**Caption:** For the example that we will build in this tutorial, the app is called **good-books-ds** and the associated read-only credentials are **04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31**. You can browse and export the dataset to JSON or CSV from [here](https://dejavu.appbase.io/?appname=good-books-ds&url=https://04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31@appbase-demo-ansible-abxiydt-arc.searchbase.io&mode=edit).

**Note:** Clone app option will not work with these credentials here have very narrow access scope (to prevent abuse).

We will update our `src/App.js` file to add ReactiveBase component.

```jsx
import React from "react";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";

function App() {
  return (
    <ReactiveBase
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      app="good-books-ds"
      credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
      enableAppbase
    >
      {/* Our components will go over here */}
      Hello from ReactiveSearch 👋
    </ReactiveBase>
  );
}

export default App;
```

**Note:** You can set `enableAppbase={false}` if you are directly connecting to an Elasticsearch service without using the appbase.io API gateway. However, we **now offer an open-source and free** version of appbase.io service and highly recommend using it over querying your Elasticsearch cluster directly. appbase.io as an API gateway provides access control for search and prevents script injection attacks that are possible if you query Elasticsearch directly from frontend.

This is how the app should look after running the `yarn start` command.

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/v3/packages/web/examples/MyAwesomeSearchStep1?from-embed=&file=/src/App.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

---

### Step 3: Adding Search and Aggregation components

For this app, we will be using [DataSearch](/docs/reactivesearch/react/v3/search/datasearch/), [MultiList](/docs/reactivesearch/react/v3/list/multilist/) and [SingleRange](/docs/reactivesearch/react/v3/range/singlerange/) components for searching and filtering on the index. And [ResultCard](/docs/reactivesearch/react/v3/result/resultcard/) component for showing the search results.

Lets add them within the ReactiveBase component. But before we do that, we will look at the important props for each.

#### DataSearch

```jsx
<DataSearch
	componentId="searchbox"
	dataField={[
		{
			"field": "authors",
			"weight": 3
		},
		{
			"field": "authors.autosuggest",
			"weight": 1
		},
		{
			"field": "original_title",
			"weight": 5
		},
		{
			"field": "original_title.autosuggest",
			"weight": 1
		},
	]}
	placeholder="Search for books or authors"
/>
```

The [**DataSearch**](/docs/reactivesearch/react/v3/search/datasearch/) component creates a searchbox UI component that queries on the specified fields with weights as specified by `dataField` prop. That's all it takes to create a functional search component.

At this point, you should see the following:

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/v3/packages/web/examples/MyAwesomeSearchStep2?from-embed=&file=/src/App.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

#### MultiList

Next, we will add the [**MultiList**](/docs/reactivesearch/react/v3/list/multilist/) component. As the name suggests, it creates a multiple selection aggregation (aka facet) to filter our search results by.

```jsx
<MultiList
	componentId="authorsfilter"
	dataField="authors.keyword"
	title="Filter by Authors"
	aggregationSize={5}
/>
```

Aggregation components like MultiList fire a term type query. You can think of a term query as an exact match query, unlike a search query which involves more nuances. The use of the `.keyword` suffix for the `authors` field informs the search engine that the query here is of an exact type.

The `aggregationSize` prop is used to specify the total aggregations (think buckets) that you want returned based on the dataField value.

**Note:** The `dataField` value in MultiList is of string type, since an aggregation is always performed on a single field. In contrast, you may want to search on multiple fields in different ways, so the DataSearch component uses an array of fields instead.

#### SingleRange

Next, we will add the [**SingleRange**](/docs/reactivesearch/react/v3/range/singlerange/) component for creating a ratings based filter for our book search.

```jsx
<SingleRange
	componentId="ratingsfilter"
	dataField="average_rating"
	title="Filter by Ratings"
	data={[
		{ start: 4, end: 5, label: '4 stars and up' },
		{ start: 3, end: 5, label: '3 stars and up' },
	]}
	defaultValue="4 stars and up"
/>
```

The SingleRange operates on a numeric datatype field and fires a range query. The `data` prop of SingleRange allows specifying a [start, end] range and a label associated with it. Using `defaultValue`, we can preselect a particular option. In this case, we're preselecting all the books that have a rating of `4 stars and up`.

At this point, this is how our app should be looking:

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/v3/packages/web/examples/MyAwesomeSearchStep3?from-embed=&file=/src/App.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

We just added completely functional search and aggregation components!

### Step 4: Adding Results Component

We just need a results component to display the books that we're searching for. We will use the [ReactiveList](/docs/reactivesearch/react/v3/result/reactivelist/) component with the [ResultCard](/docs/reactivesearch/react/v3/result/resultcard/) preset.

```jsx
<ReactiveList
	componentId="results"
	dataField="_score"
	size={6}
	pagination={true}
	react={{
		and: ["searchbox", "authorsfilter", "ratingsfilter"]
	}}
	render={({ data }) => (
		<ReactiveList.ResultCardsWrapper>
		{data.map((item) => (
			<ResultCard key={item._id}>
			<ResultCard.Image src={item.image} />
			<ResultCard.Title
				dangerouslySetInnerHTML={{
				__html: item.original_title
				}}
			/>
			<ResultCard.Description>
				{item.authors + " " + "*".repeat(item.average_rating)}
			</ResultCard.Description>
			</ResultCard>
		))}
		</ReactiveList.ResultCardsWrapper>
	)}
/>
```

The `react` prop here specifies that the result should depend on the queries for our searchbox, authors filter and the ratings filter. It's pretty neat!

In the `render` method, we are using the ResultCard preset to iterate over each result (aka hit) and set the image, title and description values of the card layout.

At this point, you should be seeing our entire app functionally (minus the layouting and styles):

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/v3/packages/web/examples/MyAwesomeSearchStep4?from-embed=&file=/src/App.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

We have built our entire search UI in just 60 lines of code!

---

### Step 5: Adding Layout and Styles

ReactiveSearch doesn't use a layout system internally. If you are using a grid from Bootstrap or Materialize, you can use that. Here, will just make use of CSS Flex.

If you are new to Flex, we recommend a quick read of [this article](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

With ~6 more lines, our final app layout looks as follows.

```jsx
<ReactiveBase>
	<div style={{ display: "flex", flexDirection: "row" }}>
		<div style={{ display: "flex", flexDirection: "column", width: "30%", margin: "10px" }}>
			<MultiList/>
			<SingleRange/>
		</div>
		<div style={{ display: "flex", flexDirection: "column", width: "66%" }}>
			<DataSearch/>
			<ReactiveList/>
		</div>
	</div>
</ReactiveBase>
```

Add some margins between the search and result component, and voila! Our final app is ready:

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/v3/packages/web/examples/MyAwesomeSearchStep5?from-embed=&file=/src/App.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

If you like to run this setup locally, clone the [ReactiveSearch starter app](https://github.com/appbaseio-apps/reactivesearch-starter-app).
