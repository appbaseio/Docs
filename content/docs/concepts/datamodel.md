---
id: datamodel
title: "Data Model"
layout: docs
sectionid: intro
permalink: concepts/datamodel.html
prev: intro.html
prevTitle: "Concepts - Introduction"
next: databrowser.html
nextTitle: "Data Browser"
---

## What is appbase.io

[Appbase.io](https://appbase.io) is a hosted Elasticsearch service with built-in publish/subscribe support for streaming document updates and query results.

It enables you to:  

* Build a blazing fast text search, pub/sub based messaging system, or implement a combination of esoteric filters (fuzzy, geo, terms, range, multiple items),
* Stream JSON results directly as new data is added or when the original data is updated,
* Launch in days with our hosted APIs and scale without vendor-lockin by deploying appbase.io on your choice of cloud provider.

![Appbase Architecture](https://i.imgur.com/iJpqtks.png?1)  
**Image 1:** appbase.io architecture overview

We have production users running e-commerce stores, analytics dashboards, feeds, and realtime backends using appbase.io.

There are some catches if you intend to:  

* Model financial or sensitive data - Appbase.io is not ACIDic and doesn't support multi-document transactions. A good design choice in such a situation would be to use something that supports ACID transactions for storing sensitive data, and use Appbase.io for the data that needs to be searchable in realtime.
* Perform analytical processing - Being based on Elasticsearch, appbase.io is designed as an OLTP system although it supports aggregations and queries on data sets of the size of hundreds of gigabytes and even a few terabytes. There are plenty of ideal tools for OLAP use-cases - Amazon Redshift, Google Big Query, Apache Hadoop. appbase.io can be used in a complementary fashion with any of these for handling online transactions.


# Appbase Data Schema

Appbase uses the same data schema as ElasticSearch `v5.x` and `v2.x`.

## App <span style="font-weight: 200;">aka Index</span>

An app in [appbase.io](https://appbase.io) is stored as an index in ElasticSearch. App is the highest level of construct supported by appbase and is equivalent to a **database** in SQL.

## Type

JSON data (aka documents) in an app is logicaly partitioned using types, think of them as namespaces for arranging and querying similar kinds of data.

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

[![Data Model View](https://i.imgur.com/wQ7kvTj.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAJyAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsnR3mLY6qp78UrdyiX4kf3rJXqxmkCAfGPRGyyY4NGU7xDzBus7B3hXJNG4yyaH1H8guySgP4Wo-ZoNcdRwQLUR0z6eRlUmgmT3EhyDSjc2FAfNrp-UQUzBSnnBhUAyhUc5rRuJyHSzSRV3a7TCE0Kd0o7yFwt-ipsw76R6tWjdWWcUyRSNy1GB4J7q98DAmFVqpjdXO37X35pXONcdFgA4urdMJ5Q2oh_uG1Wf-mubQFDVcFYBy16t61GMMPqMmP_hyRVIOFI-kkHGSn0CWT8Iw1uS7K6C38TKBcr7Z2hjCiU3GHOVD2LhwKjDSrwV33ZTqcTd_Rh2ZWdSlokfaXOZmfVU7EcpaQjtZEEEat9eXD9UpGpX_ov1vAA)

Click on the image above to see the actual data, visualized with appbase.io data browser.
