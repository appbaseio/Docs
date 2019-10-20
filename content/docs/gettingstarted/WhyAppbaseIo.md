---
title: 'Why Appbase.io?'
meta_title: 'Why Appbase.io'
meta_description: 'Appbase.io is a search stack for building modern search apps.'
keywords:
    - concepts
    - appbase.io
    - elasticsearch
sidebar: 'docs'
---

[Appbase.io](https://appbase.io) comes with out of the box 😎 features for ElasticSearch eco system, which makes your life easy by concentrating on just building better search experiences and not going the pain of managing the infrastructure for your search data.

### Appbase.io's Dashboard for dev + analytics + security

Appbaseio.io's Dashboard comes with simple user interface using which you can seamless manage your data, get analytics about the your data and adding enterprise grade security to your data.

![](https://i.imgur.com/aaxqnN2.png)
**Image:** appbase.io feature stack overview

#### Development Experience 🕵️‍♂️

-   **Import Data** allows you to import data into ElasticSearch from sources like `JSON` file, `CSV` file, `SQL DB`, `MONGODB` or another ElasticSearch.
-   **Browse Data** allows you to View, Filter, Edit, Export, Add and Delete data of your ElasticSearch clusters / index. There are out of the box features for Bulk Editing and Adding new columns with appropriate data types.
-   **App Settings** allows you to easily change [mappings / data types for your data](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html). Changing data types in ElasticSearch is not easy. You always have to create new index with new mappings and import data there. Using Appbase.io Dashboard you no more have to go through this pain full process.
-   **Query Explorer** allows yous to seamlessly build complex queries using simple user interface, where you just have to pick the fields and type of filter that you want to apply.
-   **Query Rules** allows you to set query rules for specific fields and their data, which helps in promoting / hiding your results out of the box.
-   **Search Templates** allows you set [Search Template](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html) for your data which uses [mustache](https://mustache.github.io/) language to pre render search results.

![](https://i.imgur.com/tqXCEQU.png)
**Image:** appbase.io develop dashboard

#### Insights & Analytics 📈

[Analytics](/docs/analytics/Overview/) allows you improve search experience and understand funnel of conversions by tracking the user search activities.

-   **Request Logs** allows you to track the requests made to your ElasticSearch sources. For example, how many `_search` / `_msearch` requests are made.
-   **No Results Searches** allows you to know the requests for which _no data_ was found in your ElasticSearch.
-   **Popular Filters** allows you to know what kind of filters to use for specific set of data.
-   **Polupar Results** allows you to know top search queries executed on your dataset. Thus allowing you to know more about your users requirement and help improve conversion funnel.
-   **Geo Distribution** allows you to know search queries executed across various geo locations and thus help you understand the user needs based on their locations.
-   **Request per minute** allows you to understand the status of your requests and learn how to make the most of request distribution insights
-   **Search Latency** allows you to measure the performance for your search queries and helps in getting insights for any performance improvements.

![](https://miro.medium.com/max/1918/1*XgRnEd61VrDhg0cYvIneKA.png)

#### Enterprise Grade Security 🔐

-   [**Role Based Access**](/docs/security/Role/) allows you to secure your data based on the permissions for specific user roles. No extra middleware setup required for accessing the ElasticSearch data.
-   [**API Credentials**](/docs/security/Credentials/) allows you to provide [basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication) security with [ACLs](https://en.wikipedia.org/wiki/Access-control_list). It also allows you to set IP restriction and API access limit for your ElasticSearch data.

![](https://www.dropbox.com/s/v7uwupxmh757yvl/Screenshot%202019-06-19%2017.19.46.png?dl=1)

### Active Ecosystem

Appbase.io comes with amazing tools for building rich search experiences.

-   **ReactiveSearch** UI toolkit to build [search interfaces](https://opensource.appbase.io/reactivesearch) for web in [ReactJS](https://reactjs.org/) and [VueJS](https://vuejs.org/)
-   **ReactiveMaps** [ReactJS](https://reactjs.org/) library for building rich [map UIs](https://opensource.appbase.io/reactivemaps)
-   **ReactiveSearch Native** UI toolkit to build [search interfaces](/docs/reactivesearch/native/overview/QuickStart/) for mobile applications using [React Native](https://facebook.github.io/react-native/).
-   **SearchBox** Light weight [library](docs/reactivesearch/searchbox/Quickstart/) to build search boxes in X-JS
-   **abc** Tool for [connecting backends](https://medium.appbase.io/abc-import-import-your-mongodb-sql-json-csv-data-into-elasticsearch-a202cafafc0d) to import data from SQL, MongoDB, JSON, CSV sources into Elasticsearch.

### No vendor locks

Hosted APIs often come with a huge lock-in cost. appbase.io is offered as [a hosted API](https://appbase.io) as well as a [cloud native software](https://github.com/appbaseio/arc), offering a consistent experience without becoming a walled garden.

### Reliability

Appbase.io uses [kubernetes orchestration](/docs/hosting/Cluster/). This guarantees a higher reliability for cluster and it comes with a built-in mechanism to restart a node on failure, allows inspecting and safe editing of underlying resources.

### Available across the globe

Appbase.io Clusters comes with option to deploy your cluster nodes in multiple zones and thus making it more accessible to place where you are expecting your customer base. Whether you are in EU (Europe), APAC (Asia Pacific), or need a cluster in West US (United States), we've got you covered.

![](https://i.imgur.com/v88UP6Z.png)

### Built-in ability to scale up or down

At any given point you can scale up/down cluster. This will help you improve performance by deploying and replicating data on various ElasticSearch nodes across different zones in a region.

### Priced by hour and pay only what you use

You can select Provider of your choice for cluster deployment (currently we offer hosting clusters on [Google Cloud Platform](https://cloud.google.com/). With this now you don't have to over pay for resources. Based on the plan and your cluster usage only pay for the hours that you have used for.

You can get more details about Appbase.io Cluster pricing [here](https://appbase.io/clusters#pricing).

### Monitoring and Logs Access

Since appbase.io clusters are deployed and managed using Kubernetes orchestration, you can easily view the usage of various resources like memory, storage, etc and scale accordingly. For more information you can read docs on [clusters](/docs/hosting/Cluster).

### Managing ElasticSearch

With kubernetes deployment you get full access to the ElasticSearch API, so you can perform any core ElasticSearch operations on the clusters. Other ElasticSearch providers like AWS might not give you complete access to core ElasticSearch API.

Along with the full access to API, now you also have full access to ElasticSearch configurations and plugins that are installed, you can always add more plugins of your choice by updating the configurations via Stateful Set Configurations on Kubernetes. This also allows you to update ElasticSearch version, by just changing the docker image that is deployed.

### Ability to choose your ElasticSearch

With all the freedom, now you can deploy ElasticSearch flavour of your own choice. You can either install the Open Source distribution of [ElasticSearch](https://github.com/elastic/elasticsearch) or use [Open Distro for ElasticSearch](https://opendistro.github.io/for-elasticsearch/) which comes with more security enhancements.

## API

The appbase.io API is interoperable with the Elasticsearch API and builds on top of it. With the [apps](https://appbase.io/apps) product, there are some API endpoints that we don't allow access to. Full list of supported endpoints is documented at https://rest.appbase.io.

We also offer [hosted or managed clusters](https://appbase.io/clusters), where we maintain 100% compatibility with the Apache 2.0 licensed ElasticSearch and support every ElasticSearch release starting v5.6.

## Hosting

[Appbase.io](https://appbase.io) offers various hosting which can easily help you scale and manage your search related data in ElasticSearch eco system.

### An Appbase.io APP

Get the best of Elasticsearch without the cost of running a full cluster. Free for up to 10K records and 100K monthly API calls. No credit card required.

### An Appbase.io Cluster

Deploy your own dedicated Elasticsearch clusters to meet your business needs. It includes a free 14-day trial and flexibility of deploying in 16 regions across North America, South America, Europe, Asia and Australia. Also it comes with all the super powers mentioned [above](/docs/gettingstarted/WhyAppbaseIo/#appbaseios-dashboard-for-dev--analytics--security). For more details please check [cluster docs](/docs/hosting/Cluster/)

### Bring Your Own Cluster

Already have an ElasticSearch cluster with AWS? Or Elastic Cloud? Or deployed with any other provider?
Still you can access the all [Appbase.io](/docs/gettingstarted/QuickStart/#appbaseios-dashboard-for-dev--analytics--security) features by deploying [Arc](https://arc-site.netlify.com/) an Appbase.io [middleware](https://github.com/appbaseio/arc) for ElasticSearch. You can deploy this middleware with your favourite provider or [Appbase.io](https://dashboard.appbase.io/clusters/new/my-cluster) and access data using [Appbaseio.io](https://arc-dashboard.appbase.io) dashboard.

## Deploy ElasticSearch + Appbase.io Services

<div class="grid-integrations-index mt4 mt6-l f8">
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="https://dashboard.appbase.io" target="_blank">
		<img class="w10 mb1" src="/images/apps.png" />
		Apps
	</a>
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="https://dashboard.appbase.io/clusters/new" target="_blank">
		<img class="w10 mb1" src="/images/clusters.png" />
		Clusters
	</a>
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="https://dashboard.appbase.io/clusters/new/my-cluster" target="_blank">
		<img class="w10 mb1" src="/images/arc.svg" />
		Arc Cluster
	</a>
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="https://github.com/appbaseio/arc" target="_blank">
		<img class="w10 mb1" src="/images/docker.png" />
		Docker
	</a>
</div>
<div class="grid-integrations-index mt4 mt6-l f8">
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem;height: 120px;width:120px;">
		<img class="w10 mb1" src="/images/awscart.jpg" />
		AWS Marketplace
	</a>
</div>
