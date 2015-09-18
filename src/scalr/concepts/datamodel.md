{"threeColumns": false, "bigh3": true, "largeBrief": true}

# Appbase Data Model


## What is appbase.io

[Appbase.io](https://appbase.io) is a data streams API service for continuous search and aggregation queries. You can build reactive apps with Appbase.io, where views update in conjunction with the data changes.

It enables you to:  

* Build a blazing fast text search, messaging systems, or implement a mix of esoteric filters (fuzzy, geo, terms, range, multiple items),
* Stream JSON results directly as new data is added or the original data is updated,  
* Scale seamlessly upto 10,000 updates per second and store at terbyte scale.

![Appbase Architecture](http://i.imgur.com/iJpqtks.png?1)  
**Image 1:** It provides a reliable data streams API as a service, while leveraging ElasticSearch (and Lucene) for storage and search.

While not primarily intended, Appbase.io can also be used as a hosted ElasticSearch API or as a message queue with a publish / subscribe model.

There are some catches if you intend to:  

* Use it as a primary data store - ElasticSearch is [known to lose data](https://www.elastic.co/guide/en/elasticsearch/resiliency/current/index.html#_loss_of_documents_during_network_partition_status_ongoing) for some time on network partitions.  
``Status:`` We are working towards adding support for durability by using Apache Kafka as a frontend (things you can do in SaaS!).
* Model financial or sensitive data - Appbase.io is not ACIDic and we don't intend to be. A good design choice in this situation would be to use something that supports ACID transactions for storing sensitive data, and use Appbase.io for the data that needs to be searchable or accessed in realtime.
* Use it for OLAP use-cases - Appbase.io is designed as an OLTP system although it supports aggregations and queries on data sets of the size of terabytes. There are plenty of ideal tools for OLAP use-cases - Amazon Redshift, Google Big Query, Apache Hadoop and Appbase.io can be used with any of them (via REST API).



# Appbase Data Schema

Appbase uses the same data schema as ElasticSearch.

## App <span style="font-weight: 200;">aka Index</span>

An app in [appbase.io](https://appbase.io) is stored as an index in ElasticSearch. App is the highest level of construct supported by appbase and is equivalent to a **database** in SQL.

## Type

Types are equivalent to **tables** in SQL. Data in an app is always stored within it's types. A good way to think of them is as collections of different kinds of data.

## Document

A **document** is the actual data stored in Appbase. Documents are ``JSON`` objects, equivalent to **records** or **rows** in SQL.

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

![img](https://farm1.staticflickr.com/616/21319701888_dbe75d9f6f_c.jpg)
