---
title: 'Integrate Google Analytics'
meta_title: 'Implementing Appbase analytics - Core Concepts'
meta_description: 'A short guide on how to setup google analytics and track search terms and queries.'
keywords:
    - concepts
    - appbase
    - google-analytics
    - integrate
sidebar: 'docs'
---

##Setting Up Google Analytics
Even though ReactiveSearch provides an analytics tailored to your search, you might want to integrate your search into your existing analytics tools.
The base library components doesn't provide a built-in widget to implement analytics with other providers.

Integrating with Google Analytics requires 2 steps:

-   set up the Google Analytics library in your page
-   setup the search state change listener

To set up Google Analytics, the best way is to actually [follow the reference guide](https://developers.google.com/analytics/devguides/collection/analyticsjs/).

Once the GA library is installed on your website, look below how Google Analytics can be integrated with different libraries

##Integrating With Libraries
###ReactiveSearch
Track any component's state using `StateProvider` component as below. Read more about `StateProvider` [here](https://docs.appbase.io/docs/reactivesearch/v3/advanced/stateprovider/):

```js
<ReactiveBase>
	<StateProvider
		onChange={({ prevState, nextState }) => {
			if (prevState !== nextState) {
				window.ga('set', 'page', `/?state=${JSON.stringify(nextState)}`);
				window.ga('send', 'pageview');
			}
		}}
	/>
</ReactiveBase>
```

If you want to track only your `DataSearch` component, you can add the following. Read more about `DataSearch` [here](https://docs.appbase.io/docs/reactivesearch/v3/search/datasearch/):

```js
<ReactiveBase>
	<DataSearch
		onValueChange={value => {
			window.ga('set', 'page', `/?query=${value}`);
			window.ga('send', 'pageview');
		}}
	/>
</ReactiveBase>
```

###React SearchBox
Check the API docs for `React SearchBox` [here](https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/).

```js
<SearchBox
	app="good-books-ds"
	credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
	dataField={['original_title', 'original_title.search']}
	dataField
	onValueChange={(next, prev) => {
		if (prev !== next) {
			window.ga('set', 'page', `/?query=${next}`);
			window.ga('send', 'pageview');
		}
	}}
/>
```
