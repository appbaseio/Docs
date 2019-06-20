---
id: analytics
title: "Analytics"
layout: docs
sectionid: analytics
permalink: concepts/analytics.html
prev: search-preview.html
prevTitle: "Search Preview"
next: api-credentials.html
nextTitle: "API Credentials"
---

Analytics offers actionable insights into how your search is performing.

![](https://i.imgur.com/IBIBzT5.png)

## Getting insights from Analytics

1. **Search Volume**

Search Summary and Daily Search Volume gives an insight into how your search is being used over the last week (or last month if you are a growth plan user).

![](https://i.imgur.com/weQ8PKc.png)

2. **Popular Searches and No Result Searches**

Popular Searches give an insight into what are the most popular search terms on your site. On the other hand, No Result Searches give an insight into what are the most frequent search terms that yield no results.

![](https://i.imgur.com/mTLaszi.png)

If you are a **Growth plan** user, these stats also additionally give insights into the click data of the app.

3. **Popular Results**

Popular Results gives insights into the total search impressions, clicks and conversion info for result items.

![](https://i.imgur.com/mubAnU3.png)

4. **Geography Visualization**

Geography Visualization gives insights into where users are most searching from.

![](https://i.imgur.com/mZgiAki.png)

## How to implement Analytics

If you are using **ReactiveSearch** library for building your search UIs, then all you have to do is set the `analytics` prop in the `<ReactiveBase>` component.

This will start auto-recording search analytics. You can see how to set the click analytics in the [reactive manual docs](https://opensource.appbase.io/reactive-manual/advanced/analytics.html).

### Analytics via API

If you intend to build your own search UI, here's how you can implement analytics on your own. There are two types of analytics:

1. Search Analytics and
2. Click Analytics.

**Search Analytics**

When using the REST API to make a search query, you can pass along the following headers:

`X-Search-Query` -> The value here represents the search query term (the input value in DataSearch, CategorySearch if you are using ReactiveSearch).

Whenever, a `X-Search-Query` header is passed, the API returns a response header for the search Id called as `X-Search-Id`. This can be passed further as a request header to associate other search attributes (filters, clicks) with the same original query. Think of `X-Search-Id` as a search session.

`X-Search-Id` -> An existing Id (aka search session) on which to apply the search query on. This is returned as a response header by the backend for each search query.

`X-Search-Filters` -> This header should contain value in the format: "key1=value1,key2=value2,..." where key represents the filter component and value represents the selected value. (If the same filter has multiple values selected, they should be passed as "key1=value1,key1=value2,...").


**Click Analytics**

Typically, click analytics are recorded when a user clicks on a result item on the search page or triggers a conversion event (like buying the item found via search results).

There is a [POST /:app/_analytics](https://rest.appbase.io/#fe48f095-2122-bacb-6574-d081448dd0f9) endpoint which can be used to record click analytics. It accepts the following values as headers:

`X-Search-Click` -> value is of type true / false,

`X-Search-ClickPosition` -> value is of type Number (e.g. 1, 2 denoting the result item being clicked)

`X-Search-Conversion` -> value is of type true / false.

Since these events record what happens after a search query is fired, they should also be accompanied with a `X-Search-Id` header.

