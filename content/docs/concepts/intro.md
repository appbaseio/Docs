---
id: intro
title: "Concepts Introduction"
layout: docs
sectionid: intro
permalink: concepts/intro.html
next: datamodel.html
nextTitle: "Data Model"
---

## What is appbase.io

[Appbase.io](https://appbase.io) is a hosted Elasticsearch service with built-in publish/subscribe support for streaming document updates 

It enables you to:  

* Build a blazing fast text search, pub/sub based messaging system, or implement a combination of esoteric filters (fuzzy, geo, terms, range, multiple items),
* Stream JSON results directly as new data is added or when the original data is updated,  
* Launch in days with our hosted APIs and scale without vendor-lockin by deploying appbase.io on your choice of cloud provider, 


![Appbase Architecture](https://i.imgur.com/iJpqtks.png?1)  
**Image 1:** It provides a reliable data streams API as a service, while leveraging ElasticSearch (and Lucene) for storage and search.

We have production users running e-Commerce stores, analytics dashboards, feeds, and realtime backends using appbase.io.

There are some catches if you intend to:  

* Model financial or sensitive data - Appbase.io is not ACIDic and doesn't support multi-document transactions. A good design choice in such a situation would be to use something that supports ACID transactions for storing sensitive data, and use Appbase.io for the data that needs to be searchable in realtime.
* OLAP use-cases - Being based on Elasticsearch, appbase.io is designed as an OLTP system although it supports aggregations and queries on data sets of the size of several gigabytes. There are plenty of ideal tools for OLAP use-cases - Amazon Redshift, Google Big Query, Apache Hadoop and Appbase.io can be used with any of them (via REST API).


## API Intro

appbase.io APIs are 100% RESTful, work with JSON and are compatible with Elasticsearch. The publish/subscribe streaming is supported via HTTP Streaming and Websockets.

![SCALR banner image](https://i.imgur.com/3nYaIQM.png?1)

There are some places we differ from the Elasticsearch. Most importantly, a user in appbase.io only has access to an index or indices, the cluster APIs are managed by appbase.io. Full list of supported endpoints is available at https://rest.appbase.io.


## Out of the Box Features

appbase.io offers following advantages over running a raw Elasticsearch cluster / index.

1. **Built-in Realtime Streaming** - appbase.io is the only Elasticsearch service offering a realtime pub/sub API for the entire Elasticsearch Query DSL.  
2. **Security** - Read and Write access credentials so your app can directly connect to the appbase.io DB.  
3. **Daily Backups** - Automated daily backups so you can have a peace of mind.  
4. **An Active Ecosystem** - From UI toolkits to build [search interfaces](https://opensource.appbase.io/reactivesearch) and [map UIs](https://opensource.appbase.io/reactivesearch), to the [leading Elasticsearch data browser](https://opensource.appbase.io/dejavu/) to a [GUI for writing queries](https://opensource.appbase.io/mirage/) to [backend data connectors](https://medium.appbase.io/abc-import-import-your-mongodb-sql-json-csv-data-into-elasticsearch-a202cafafc0d) to import data from SQL, MongoDB, JSON, CSV sources into Elasticsearch, we are actively working on open-standards to improve accessibility of building apps with appbase.io and Elasticsearch.
