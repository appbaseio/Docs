---
title: 'Search Preview'
meta_title: 'Search Preview'
meta_description: 'Search Preview allows you to test your search relevance visually with no-code'
keywords:
    - security
    - appbaseio
    - reactivesearch
    - search-preview
    - opensearch
    - elasticesearch
    - mongodb
    - solr
sidebar: 'docs'
---

## Search Preview

The Search Preview UI lets you test your configured search, aggregation, results settings and review them prior to setting them live.

Search preview works for Elasticsearch and OpenSearch out-of-the-box. Additionally, when you setup a pipeline pointing to [MongoDB](/docs/pipelines/how-to/mongodb-pipeline) or [Solr](/docs/pipelines/how-to/solr-pipeline), they also work for these engines.

![](https://i.imgur.com/088vv3q.png)

You can see it present on all the views with a `Test Search Relevancy` button.

**Raw view:** The Raw view lets you see the underlying search API call as well as modify it and see the response as a raw JSON. Under the hood, ReactiveSearch dashboard uses the [ReactiveSearch API](/docs/search/reactivesearch-api/) to make the search requests.

![](https://i.imgur.com/j2K7nYB.png)

You can export the Search Preview UI using the `Open in Codesandbox` button. This produces a React boilerplate codebase built using [ReactiveSearch](https://github.com/appbaseio/reactivesearch).

![](https://i.imgur.com/DuVJ07V.png)