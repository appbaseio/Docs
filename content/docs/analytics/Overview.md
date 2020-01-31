---
title: 'Analytics'
meta_title: 'Appbase analytics - Core Concepts'
meta_description: 'Analytics offers actionable insights into how your search is performing.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - analytics
sidebar: 'docs'
---

Search analytics allows you to keep track of the users' search activities which helps you to improve your search experience based on the analytics extracted by Appbase.io.

In this competitive world of e-solutions where almost every e-solution has some alternatives to choose, it's important to understand the users' needs & act accordingly. Search experience plays an important role to convert new users to recurring paid customers, nobody wants to lose customers because of the less interactive search. Here we play our role, we at Appbase.io are determined to provide access to the fast and meaningful content based on the users' search queries. Appbase.io analytics offers actionable insights into how your search is performing.


## What can analytics help you with?

We can think of the search experience is proportional to business growth, the right search with the right content is the key to success. For our customers, it is important to understand their users' needs - what they want and when they want, what they like and what they dislike.

There are some most common use-cases of analytics which can help you to grow your business. 

<!-- ### Use-cases -->

### Identifying content gaps
It's important to find out what your users are searching for most, whether they are able to find it easily or not. For an example, consumers of an e-commerce website are actively searching for `iPhone X` but they don't have enough stock for that product in their inventory, popular searches with low CTR or low conversions help you to identify to content gaps between your inventory/catalog and users' demands.

### Identify ranking strategy 
Higher values for average click position indicate that the top results aren't relevant i.e users are unable to find the correct results quickly. These kinds of problems can be easily solved by upgrading the search configuration.

### Identify Opportunities
By looking at click rates and conversions, you can discover and avoid lost opportunities. An example of a lost opportunity is a product that is browsed but not bought i.e searched, clicked but not converted.

### Identify how your users are using your filtering options
See which of your filters are consistently used. You can use these analytics to configure your filters better. For example, if your users are using your `size` and `color` filters but not your `price` one, then you can remove your `price` filter or display it lower on your page.

Filter values also play an important role, for example, users are searching most for `red` color and `yellow` is the least searched color then you can simply improve your business by stocking less `yellow` items. 


### Geographical origin of the searches.
Geo metric helps you learn about who your users are and where they come from. It can help you assess the search and business needs for each country.

<!-- ### Setting baseline for setting further improvements
- Eventually, set up A/B tests for doing further improvements. -->


## What are we measuring?
- Search counts
- Popular searches
- No result searches
- Popular Filters
- Popular Results
- Distinct count of IP address/users
- Popular countries

Here is a glimpse of what you can expect to measure with Appbase Analytics.
<!-- ![Appbase.io dashboard](https://i.imgur.com/We4qekB.png) -->
![Appbase.io analytics insights](https://i.imgur.com/4ZGfj5S.png)


## Getting insights from Analytics

We describe here some of the top features available to our customers.


### Understand the funnel of conversions
Get insights on what users are clicking on, what position those results appear in your results, the average click position of specific search queries, and how those queries are translating to conversions. You can check the [docs](/docs/analytics/Implement/#click-analytics) to learn how to register a click event.

If you are a `Growth` plan user, the following statistics also additionally give insights into the click data of the app.

### Top Search Queries
In the following chart, we show the most popular search terms searched by the users. It would be useful, for example, to a movie store application for anticipating their most searched movies. Based on the stats the owner can increase the price of some most popular movies to earn some profit.

![Appbase.io PopularSearches](https://i.imgur.com/7LXMPiM.png)

### Understand Content Gaps with No Results Queries
It is one of the most important statistics to know that where we don't meet the customers' expectations. This analytics feature allows you to know the search terms for which your customers didn't get any results back.

![Appbase.io NoResultsSearches](https://i.imgur.com/9HTjRYr.png)

### Get Instant Feedback With Replay Search
All analytics charts provide an additional Replay Search feature which allows testing the exact state of a user search inside of the dashboard providing an actionable feedback loop. For example, a movie store app owner may want to know why their customers are not getting more relevant results despite having the data set, by using the replay search feature they can test it out & update the search settings in front-end.

### Promote Results With Query Rules
This feature allows you to create featured results based on the top search queries or no results queries. For example, to a movie store app, it can be useful to promote `Harry Potter and The Deathly Hallows` movie at the top when someone searches for the harry potter query.

<br/>
<img src="/images/gifs/query-rules.gif" alt="Appbase.io Query Rules" />

### Top Search Results
Popular Results give insights into the total search impressions, clicks and conversion info for the most searched result items.

![Appbase.io PopularResults](https://i.imgur.com/8fAFNJV.png)

### Geo Distribution
Geography Visualization gives insights into where users are most searching from.

![Appbase.io GeoDistribution](https://i.imgur.com/g4SCYth.png)

### Request Distribution
The request distribution chart helps you to understand the status of your requests.

![Appbase.io Request Distribution](https://i.imgur.com/R1HswrA.png)

### Search Latency
It allows you to see search latency to determine when additional infrastructure is needed.

![Appbase.io Search Latency](https://i.imgur.com/2q49EjJ.png)

### Custom Analytics
Although we provide built-in support for the most important analytics, it should be possible for our customers to record and track the custom events with minimal effort. These events will get recorded with the appbase.io analytics which can be used to filter out the analytics from the appbase.io dashboard later.

<strong>The custom analytics feature allows you to build your own analytics on top of the Appbase.io analytics.</strong>

For example, a movie store app owner wants to filter out the analytics for the free users who are using the android device to make the search requests. You can read the [docs](/docs/analytics/Implement/#how-to-implement-custom-events) to know how to work with custom events.

<br/>
<img src="/images/gifs/custom-analytics.gif" alt="Appbase.io Custom Analytics" />

### Record Analytics
We have created some open-source libraries that make recording most of the analytics possible out-of-the-box. And we also have the REST APIs that allow users to use them to power their own end-user analytics or internal analytics.
Please check the [docs](/docs/analytics/Implement/) to learn how to record the appbase.io analytics.