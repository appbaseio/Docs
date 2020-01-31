---
title: 'Querying Analytics'
meta_title: 'Querying Analytics - Core Concepts'
meta_description: 'A short guide on how to query and use the Appbase.io analytics API.'
keywords:
    - concepts
    - appbase
    - analytics
    - implement
    - query
    - suggestions
sidebar: 'docs'
---
Once you implement the Appbase analytics in your UI then there is nothing you need to do for Appbase to build your analytics data.

Appbase analytics appear on the dashboard immediately when your users do some activities.


## Query via Dashboard
You can access all the analytic data from the Analytics section of the Appbase Dashboard. Analytics GUI allows you to view and download all the metrics in the `JSON` or `CSV` format. Furthermore, if you record the custom events then you can filter each metric by a particular custom event with the help of easy to use filter UI.

## Query via API
While analytics data is more easily accessible from the Dashboard, it's also possible to use our REST API to retrieve the analytics metrics for reporting and other use-cases. For example, popular searches can be used as the default suggestions in the search input box.

You can check all the available endpoints [here](https://arc-api.appbase.io/?version=latest#fa69cbac-143b-4ce1-881b-c8287ac48d37).

### An example query endpoint
The below endpoint returns a list of popular searches.

```bash
curl --location --request GET 'http://{{USERNAME}}:{{PASSWORD}}@{{CLUSTER_URL}}/_analytics/popular-searches'
```

### An example query with filtering applied
You can use the custom events as a query param to filter out the analytics APIs. <br/>
Let's check the below example to get the `popular searches` filtered by the custom event named `platform` having value as `android`.

```bash
curl --location --request GET "http://{{USERNAME}}:{{PASSWORD}}@{{CLUSTER_URL}}/_analytics/popular-searches?platform=android"
```