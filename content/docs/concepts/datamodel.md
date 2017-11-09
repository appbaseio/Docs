---
id: datamodel
title: "Appbase Data Model"
layout: docs
sectionid: intro
permalink: concepts/datamodel.html
prev: intro.html
prevTitle: "Concepts - Introduction"
next: databrowser.html
nextTitle: "Data Browser"
---

## What is appbase.io

[Appbase.io](https://appbase.io) is a data streams API service for building reactive apps, building dynamic views based on user interactions.

It enables you to:  

* Build a blazing fast text search, pub/sub based messaging system, or implement a combination of esoteric filters (fuzzy, geo, terms, range, multiple items),
* Stream JSON results directly as new data is added or when the original data is updated,  
* Scale seamlessly up to hundreds and thousands of data updates per second.

![Appbase Architecture](https://i.imgur.com/iJpqtks.png?1)  
**Image 1:** It provides a reliable data streams API as a service, while leveraging ElasticSearch (and Lucene) for storage and search.

We have also seen users use appbase.io as a hosted ElasticSearch API as well as a message queue with a HTTP API based publish / subscribe model.

There are some catches if you intend to:  

* Use it as a primary data store - ElasticSearch can [lose data](https://www.elastic.co/guide/en/elasticsearch/resiliency/current/index.html#_data_store_recommendations) under certain circumstances when network partitions occur.  
* Model financial or sensitive data - Appbase.io is not ACIDic and we don't intend it to be in the near future. A good design choice in such a situation would be to use something that supports ACID transactions for storing sensitive data, and use Appbase.io for the data that needs to be searchable in realtime.
* OLAP use-cases - Being based on Elasticsearch, appbase.io is designed as an OLTP system although it supports aggregations and queries on data sets of the size of several gigabytes. There are plenty of ideal tools for OLAP use-cases - Amazon Redshift, Google Big Query, Apache Hadoop and Appbase.io can be used with any of them (via REST API).



# Appbase Data Schema

Appbase uses the same data schema as ElasticSearch `v2.4`.

## App <span style="font-weight: 200;">aka Index</span>

An app in [appbase.io](https://appbase.io) is stored as an index in ElasticSearch. App is the highest level of construct supported by appbase and is equivalent to a **database** in SQL.

## Type

Types are similar to **tables** in SQL. JSON data (aka documents) in an app is logicaly partitioned using types, think of them as namespaces for arranging and querying similar kinds of data.

## Document

A **document** is the actual data stored in an app. Documents are ``JSON`` objects, equivalent to **records** or **rows** in SQL.

```js
{
   "user": "data",
   "remember": "something",
   "molala": "yaya",
   "lifeis": 42,
   "recursive": {
   		"how's this": "one nested value"
   }
}
```
<br>

## Visualizing the Data Model

An app can have one or more types and each type is a container for JSON documents. Visually, the arrangement looks like below:

[![Data Model View](https://i.imgur.com/LCvdVuu.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAJyAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsnR3mLY6qp78UrdyiX4kf3rJXqxmkCAfGPRGyyY4NGU7xDzBus7B3hXJNG4yyaH1H8guySgP4Wo-ZoNcdRwQLUR0z6eRlUmgmT3EhyDSjc2FAfNrp-UQUzBSnnBhUAyhUc5rRuJyHSzSRV3a7TCE0Kd0o7yFwt-ipsw76R6tWjdWWcUyRSNy1GB4J7q98DAmFVqpjdXO37X35pXONcdFgA4urdMJ5Q2oh_uG1Wf-mubQFDVcFYBy16t61GMMPqMmP_hyRVIOFI-kkHGSn0CWT8Iw1uS7K6C38TKBcr7Z2hjCiU3GHOVD2LhwKjDSrwV33ZTqcTd_Rh2ZWdSlokfaXOZmfVU7EcpaQjtZEEEat9eXD9UpGpX_ov1vAA)

Click on the image above to see the actual data, visualized with [dejavu](https://opensource.appbase.io/dejavu) data browser.
