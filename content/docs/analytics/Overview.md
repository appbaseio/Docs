---
title: 'Analytics: Overview'
meta_title: 'Appbase Analytics - Core Concepts'
meta_description: 'Analytics offers actionable insights into your search.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - analytics
sidebar: 'docs'
---

## Overview

Appbase.io’s Search Analytics enables businesses to analyze their search volume, conversion opportunities (popular searches), content gaps— in effect helping them understand the ROI impact of search and highlighting areas where it can be improved.

![](/images/analytics.png)

In this competitive world of e-solutions where almost every e-solution has alternatives to choose, it's important to understand the users' needs and act accordingly. A faster and relevant search experience directly contributes to sales. A relevant search experience increases user engagement. The first step in understanding how well your search is engaging and converting is to start measuring the underlying key metrics.


## What can analytics help you with?

With appbase.io analytics, you can now understand your search’s ROI impact through the funnel of conversions. Drill down into the search analytics, discover content gaps and unlock new monetization opportunities. Here are the key use-cases for analytics:

1. Identify content gaps - By finding the top search terms that yield no (or low) search results, you can identify the content gaps.
2. Identify lost opportunities - By looking at popular search queries that have a low click or conversion rate, you will be able to tell lost opportunities. This is likely a tell that your search relevancy needs fixing.
3. Identify ranking strategy related issues - If the average click position of the search results is high, it implies users are scrolling through the search results before they find what they need. You can revisit your ranking strategy to fix this.
4. User Geography - By knowing where your users are coming from, you can address their search needs better.
5. Tailor search for your business needs - You can create custom segments (paid users, mobile users, user on a 3G network) that are meaningful for your business and additionally filter all of the above analytics to glean more specific insights.

## What are we measuring?
- Search counts
- Popular searches
- No result searches
- Popular Filters
- Popular Results
- Distinct count of IP address/users
- Popular countries
- User sessions
- User sessions' length
- Bounce rate

Here is a glimpse of what you can expect to measure with Appbase.io Analytics.
![Appbase.io analytics insights](https://i.imgur.com/4ZGfj5S.png)


## Getting Insights From Analytics

With appbase.io’s analytics views, you can now understand your search’s ROI impact through the funnel of conversions. Drill down into the search analytics, discover content gaps and unlock new monetization opportunities.

#### Popular Searches
appbase.io shows the most popular search terms in a given time interval. This lets you understand:
1. Merchandising opportunities — Feature products and monetize your search.
2. Lost opportunities — Popular searches with low click rates. Perhaps, the results aren’t relevant or some key results are missing.

![Appbase.io Analytics: Popular Searches](https://miro.medium.com/max/1926/1*IQimdpvIVrcUvqBNjPtCkw.png)

#### Identify Content Gaps

It is important to know when your search doesn’t meet end user expectations. The **No Results Searches** view lets you know the search terms for which your users didn’t get any results back.

You can replay these searches with the same settings that your users had, allowing you to then tweak the search relevance settings.

![Appbase.io Analytics: No results searches](https://miro.medium.com/max/1916/1*Hwyyy9GCzbdUOcPdHtU0BQ.png)

#### Get Instant Feedback With Replay Search

All analytics views provide an additional Replay Search feature which allows testing the exact state of a user’s search. You can understand the root cause for no results and then tweak relevancy settings to update the search behavior in realtime.

![Appbase.io Dashboard: Search Preview, where you can instantly replay searches and save search profiles](https://miro.medium.com/max/2362/1*oy18J5d-NV5j1tX3qoJLgw.png)

#### Promote Results With Query Rules

This feature allows you to create featured results based on the top search queries or no results queries. For example, as a movie store app owner, you may find it useful to promote **Harry Potter and The Deathly Hallows** movie at the top when someone searches for the `harry potter` query.

![Appbase.io Dashboard: Query Rules](https://miro.medium.com/max/1200/1*4tJR90TWqCnyuwtqtcfK5Q.gif)

#### Popular Results

Popular Results give insights into the total search impressions, clicks and conversion info for the most searched result items.

![Appbase.io Dashboard: Popular Results](https://miro.medium.com/max/1928/1*UsZGiftLRcHX5n6IMMeJqA.png)

#### Geography Visualization

Geography Visualization gives insights into where your users are. You can use this info to ensure that your search experience is optimized for your users in different geographies.

![Geography Visualization](https://miro.medium.com/max/1918/1*XgRnEd61VrDhg0cYvIneKA.png)

#### Request Distribution

The request distribution view helps you to understand the status of your requests. For e.g., if your search requests are resulting in frequent errors, you can see them here.

![Request Distribution](https://miro.medium.com/max/2310/1*7cvY5otY_6mHw_PILe7BoA.png)


#### Search Latency

Search Latency view lets you visualize your query distribution and show you slow performing queries.

![Search Latency](https://miro.medium.com/max/2062/1*Tq_4WZAQFeqTNTHArmmS0g.png)

#### User Metrics

![alt User Metrics](https://i.imgur.com/PIJUb9U.png)

**Total Users**
helps you to find the total number of distinct users who have performed at least one search in your application.

**Total Sessions**
represents the total number of user sessions, a user session can be defined as a group of `search` interactions one user takes in the given time frame on your application.

**Session Duration(Avg.)**
 helps you to identify how much time a user is spending on your application. A user session has the default duration of `30` minutes but we recommend changing your session timeout handling to track users accurately. You can read more about it [here](http://localhost:8000/docs/analytics/Implement/#how-do-we-record-a-user-session).

**Bounce Rate (%)**
represents the percentage of users who visited your search page (the page which makes at least one search request to appbase.io) and then leave without interacting with the search. Read more about the bounce rate at [here](http://localhost:8000/docs/analytics/Implement/#what-is-a-bounce-for-appbaseio-search-users).
For examples,
- No clicks have been made
- No filters have been changed
- No query has been searched

> Bounce rate helps you to understand the content gaps between what your users want and what you serve, a higher value represents the less interaction with search which means you should refine your search relevancy.

#### Tracking Custom Events With Analytics
Custom Analytics allows you to go one step further by recording additional events when recording analytics. These events can now be filtered from within all the above search views giving you an extra layer of context about your users.

> By tracking custom events, you can slice and tailor analytics for your business needs.

![Appbase.io Analytics: Visualizing Custom Analytics](https://miro.medium.com/max/2536/1*_xne0F8qPCeWgfX3Jz_NGw.gif)

All the appbase.io analytics views are also accessible via REST APIs, making it very easy to embed the analytics within your web and mobile apps. You can find the [API reference over here](https://arc-api.appbase.io/?version=latest#fa69cbac-143b-4ce1-881b-c8287ac48d37).

---
