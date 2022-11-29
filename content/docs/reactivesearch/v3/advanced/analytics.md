---
title: 'Analytics'
meta_title: 'Analytics'
meta_description: 'You can take advantage of search and click analytics when using Appbase.io as a backend with ReactiveSearch.'
keywords:
    - reactivesearch
    - analytics
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

You can take advantage of search and click analytics when using [Appbase.io](https://appbase.io) as a backend with ReactiveSearch. Search analytics work out of the box with `analytics` prop in `ReactiveBase`. This recipe explains how to implement click analytics and track impressions for your app.

## Click Analytics

Click analytics have to be wired into the result components. Its supported in `ReactiveList`, however when using `ReactiveList`, the `renderItem` or `render` prop receives a method called `triggerClickAnalytics` to make click analytics work which you have to invoke with `onClick`.

```jsx
<ReactiveList
    ...
    renderItem={(data, triggerClickAnalytics) => (
        <div onClick={triggerClickAnalytics}>...</div>
    )}
/>
```

When rendering your component using `render` you have to call the `triggerClickAnalytics` function by using the `_click_id` property of the result items as an argument. This method also supports the document id(optional) as the second param. If document id is not set then ReactiveSearch will calculate it based on the click position.
Example:

```jsx
<ReactiveList
    ...
    render={({
        data,
        triggerClickAnalytics
    }) =>
        results
            .map((item, index) => (
                <div
                    key={item._id}
                    onClick={() => triggerClickAnalytics(item._click_id)}
                >
                    ...
                </div>
            ))
    }
/>
```

## Click Analytics in Map Component

When rendering results using `render` prop in `ReactiveGoogleMap` you may have to call the `triggerClickAnalytics` function by using the `_click_id` property of the result items as an argument. This method also supports the document id(optional) as the second param. If document id is not set then ReactiveSearch will calculate it based on the click position. Example:

```jsx
<ReactiveGoogleMap
    ...
    render={({data: hits, loadMore, renderMap, renderPagination, triggerClickAnalytics}) => {
        return(
            <>
				{hits.map(hit => (
					<div onClick={() => triggerClickAnalytics(hit._click_id)}>
						{JSON.stringify(hit)}
					</div>
				))}
                {renderMap()}
            </>
        )
    }
/>
```

Similarily, in `OpenStreetMap`:

```jsx
<ReactiveOpenStreetMap
    ...
    render={({data: hits, loadMore, renderMap, renderPagination, triggerClickAnalytics}) => {
        return(
            <>
				{hits.map(hit => (
					<div onClick={() => triggerClickAnalytics(hit._click_id)}>
						{JSON.stringify(hit)}
					</div>
				))}
                {renderMap()}
            </>
        )
    }
/>
```

## Track Impressions for Search Results

Impressions tracking is tied to the result components. You may have to do some extra setup in the `ReactiveList` component to track the impressions. Please follow the following instructions for different kind of use-cases.

1. If you're using the `render` or `renderItem` method for the results UI then you have to define the `id` property for each result element. The value of `id` property must be the `_id` value from the elasticsearch hit object.

For an example, the following example uses the `renderItem` method
```jsx
<ReactiveList
	renderItem={(data) => {
		return (
            /* Set the id property on list element to track the impressions */
            <li id={hit._id} key={hit._id}>
                {hit.title}
                {/* Render UI */}
            </li>
        )
	}}
/>
```

Check this example with the `render` method

```jsx
<ReactiveList
	render={({ data }) => {
		return (
			<ul>
				{data.map(hit => (
                    /* Set the id property on list element to track the impressions */
					<li id={hit._id} key={hit._id}>
						{hit.title}
						{/* Render UI */}
					</li>
				))}
			</ul>
		);
	}}
/>
```
2. If you're using `render` method with `ResultCard` or `ResultList` components then you have to define the `id` prop for those components.

For an example,

```jsx
<ReactiveList
    componentId="SearchResult"
>
    {({ data }) => (
        <ResultCardsWrapper>
            {
                data.map(item => (
                    /* Set the id property on ResultCard to track the impressions */
                    <ResultCard id={item._id} key={item._id}>
                        <ResultCard.Title
                            dangerouslySetInnerHTML={{
                                __html: item.original_title
                            }}
                        />
                        <ResultCard.Description>
                            <div>
                                <div>by {item.authors}</div>
                                <div>
                                    ({item.average_rating} avg)
                                </div>
                            </div>
                            <span>
                                Pub {item.original_publication_year}
                            </span>
                        </ResultCard.Description>
                    </ResultCard>
                ))
            }
        </ResultCardsWrapper>
    )}
</ReactiveList>
```

## Configure with **useAnalytics** hook

We can import `useAnalytics` hook directly from the **@appbaseio/reactivesearch** library. When used, it returns an instance of the [analytics library](https://github.com/appbaseio/analytics.js) which uses the **url** and **credentials** provided to the parent `ReactiveBase` component.

For example, if we want to track conversions when a user clicks on **"Visit Store"** button then we can build a button as shown in snippet below. Note `queryID` is required property and we can populate it automatically by calling a method on the same instance.

```jsx
import { useAnalytics } from '@appbaseio/reactivesearch'

const VisitStoreButton = () => {
	const aaInstance = useAnalytics();
	const handleVisitStore = () => {
		aaInstance.conversion({
			queryID: aaInstance.getQueryID(),
			objects: ['Harry Potter', 'Frankenstein'],
		});
	};
	return (
		<button
			onClick={handleVisitStore}
		>
			Visit Store
		</button>
	);
};
```

You can also view the complete demo as a codesandbox example below. 

<iframe src="https://codesandbox.io/embed/github/appbasio/reactivesearch/tree/next/packages/web/examples/AnalyticsWithHook?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="analytics-with-hook"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


## Configure the analytics experience
You can define the `appbaseConfig` prop in the `ReactiveBase` component to customize the analytics experience when appbase.io is used as a backend. It accepts an object which has the following properties:
### recordAnalytics

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

allows recording search analytics (and click analytics) when set to `true` and appbase.io is used as a backend. Defaults to `false`.
### emptyQuery

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If `false`, then appbase.io will not record the analytics for the empty queries i.e `match_all` queries. Defaults to `true`.
### enableQueryRules

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If `false`, then appbase.io will not apply the query rules on the search requests. Defaults to `true`.
### enableSearchRelevancy

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

defaults to `true`. It allows you to configure whether to apply the search relevancy or not.  
### suggestionAnalytics

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

If `false`, then appbase.io will not record the click analytics for the suggestions. Defaults to `true`.
### userId

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

It allows you to define the user id to be used to record the appbase.io analytics. Defaults to the client's IP address.
### useCache

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

This property when set allows you to cache the current search query. The `useCache` property takes precedence irrespective of whether caching is enabled or disabled via the dashboard. 
### customEvents

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

It allows you to set the custom events which can be used to build your own analytics on top of appbase.io analytics. Further, these events can be used to filter the analytics stats from the appbase.io dashboard.
<br/>
For example in the following code, we're setting up two custom events that will be recorded with each search request.

```js
<ReactiveBase
    appbaseConfig={{
            customEvents: {
                platform: "ios",
                device: "iphoneX"
            }
    }}
>
</ReactiveBase>
```
- **queryParams** `Object` Query params in the object format to be passed to ReactiveSearch API (or search endpoint if using pipeline).
<br/>
For example in the following code, we're setting the `preference` value to `local`.

```js
<ReactiveBase
    appbaseConfig={{
        queryParams: {
            preference: "local",
        }
    }}
>
</ReactiveBase>
```

### enableTelemetry

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

When set to false, disables recording of appbase.io telemetry. Defaults to `true`.
