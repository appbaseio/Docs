---
title: 'Introduction'
meta_title: 'Introduction to ReactiveSearch'
meta_description: 'ReactiveSEarch provides a supercharged search experience for creating the most demanding app search experiences with NoCode, REST APIs or JavaScript components.'
keywords:
    - concepts
    - reactivesearch
    - elasticsearch
sidebar: 'docs'
---

[ReactiveSearch.io](https://reactivesearch.io) provides a supercharged [Elasticsearch](https://github.com/elastic/elasticsearch) experience for creating the most demanding app search experiences with a no-code search relevance control plane, UI builder, out-of-the-box search analytics and low-code UI components.

## Overview

With ReactiveSearch, you can:

-   [Import your data](/docs/data/import/) from various sources via dashboard or CLI or REST APIs,
-   [Test search relevancy visually](/docs/search/relevancy/),
-   Build production grade search UIs using:
    1.   [UI component libraries](https://docs.appbase.io/docs/reactivesearch/gettingstarted/) that are available for React, Vue, React Native, Flutter, and vanilla JavaScript,
    2.  [A declarative REST API](/api/rest/overview/) or
    3.  [NoCode search UI builder](/docs/reactivesearch/ui-builder/search/).

-   Get out of the box [actionable analytics](/docs/analytics/overview/) on top searches, no result searches, slow queries and more,
-   Get improved search performance and throughput with [application layer caching](/docs/speed/cache-management/),
-   Build access controled search experiences with built-in Basic Auth or JWT based authentication, read/write access keys with granular ACLs, field level security, IP based rate limits, time to live - [read more over here](/docs/security/credentials/).

![ReactiveSearch.io Architecture](https://i.imgur.com/iTRCXe1.png)
**Image:** ReactiveSearch overview diagram

## Out of the Box Features

ReactiveSearch offers the following advantages over running your own Elasticsearch cluster.

![](https://i.imgur.com/8jz4Ssp.png)
**Image:** ReactiveSearch feature stack overview

1. **Analytics** - Get rich insights and analytics for your search app.
2. **Security** - Read/write access credentials, IP sources and HTTP Referers based restriction, Role based access control.
3. **Zero Ops** - Automated provisioning, scaling, logging and daily backups so you can enjoy a peace of mind.
4. **An Active Ecosystem** - From UI toolkits to build [search interfaces](https://opensource.appbase.io/reactivesearch) and [map UIs](https://opensource.appbase.io/reactivemaps), to the [leading Elasticsearch data browser](https://opensource.appbase.io/dejavu/) to a [GUI for writing queries](https://opensource.appbase.io/mirage/) to [backend data connectors](https://medium.appbase.io/abc-import-import-your-mongodb-sql-json-csv-data-into-elasticsearch-a202cafafc0d) to import data from SQL, MongoDB, JSON, CSV sources into Elasticsearch, we are actively working on open-standards to improve accessibility of building apps with ReactiveSearch.
5. **No Vendor Lock-in** - Hosted APIs often come with a huge lock-in cost. ReactiveSearch.io is offered as [a hosted API](https://reactivesearch.io) as well as a [cloud native software](https://github.com/appbaseio/reactivesearch-api), offering a consistent experience without becoming a walled garden.

## Choose your hosting

<div class="grid-integrations-index mt6 mt6-l f8">
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem;height: 120px;width:120px;" href="/docs/hosting/clusters">
		<img class="w10 mb1" src="/images/clusters.png" />
		Clusters
	</a>
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="/docs/hosting/byoc">
		<img class="w10 mb1" src="/images/arc.svg" />
		Bring Your Own Cluster
	</a>
</div>

| <p style="margin: 0px;" class="table-header-text">Hosting</p>                                     | <p style="margin: 0px;" class="table-header-text">Description</p>                                                                                                                                                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Clusters](/docs/hosting/clusters/)          | Free 14-day trial. Flexibility of deploying in 16 regions across North America, South America, Europe, Asia and Australia                                                                                        |
| [Bring Your Own Cluster](/docs/hosting/byoc/) | Already have an Elasticsearch cluster with AWS or Elastic Cloud or hosting it yourself? You can provision the ReactiveSearch docker container or image as a hosted service from the dashboard or deploy it yourself. |
