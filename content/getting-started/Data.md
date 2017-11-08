---
id: data
title: "Using Your Data"
layout: tutorial
sectionid: getting-started
permalink: getting-started/data.html
prev: rsstart.html
prevTitle: "ReactiveSearch Getting Started"
next: reactivebase.html
nextTitle: "Base Component"
---

The first step in getting started with building a custom project for **ReactiveMaps** or **ReactiveSearch** is to add your own data. In this guide, we explain how you can import your data with the correct schema.

### Creating an App

Reactive Maps uses appbase.io, a hosted realtime JSON data store as its database system. If you have already created an app via the onboarding process, it will be visible within the appbase.io dashbaord. If not, you can create one by logging in.

Here's a short gif walking through the app creation process.

![](https://i.imgur.com/Y6HiHnJ.gif)

### Overview of the App Data Model

The datastore for appbase.io is JSON based, and data within an app is organized as JSON objects that belong to a **type**. Types here are similar to tables in SQL, they provide namespacing for organizing different kinds of data. You can read more about the data model behind appbase [here](http://docs.appbase.io/scalr/concepts/datamodel.html#appbase-data-schema).

![Data Store](https://i.imgur.com/LCvdVuu.png)

### Importing Custom Data

In this section, we will cover how to add data using two popular approaches.

#### CSV or XLS

Let's say you have your data organized as a CSV or XLS file.

1. Use an online tool like http://www.csvjson.com/csv2json to convert your CSV data into a JSON format.
2. Go to your appbase.io app's **Data Browser** section and click "Add Data".  

![](https://i.imgur.com/idp5Ia2.png)
3. Add the data JSON formatted data here, a single object should be added as a JSON object while multiple records can be added using the Array semantics.

> Tip
>
> Add upto a hundred records at a time for best results. Ideal when your data set is small.

#### via API

appbase.io uses a RESTful API for both indexing and retrieving data. Whether you are using Python or Java or Javascript, you make a HTTP API call there.

This is how a REST call looks to insert a single object into an app inside a type called **books**.

```bash
curl -XPUT https://API_CREDENTIAL@scalr.api.appbase.io/$app/books/1 --data-binary '{
   "department_name": "Books",
   "department_id": 1,
   "name": "A Sample Book on Network Routing",
   "price": 5595
}'
```

### Data Mapping

Data mapping is the process of specifying a schema for your data. While appbase.io auto-detects the schema based on the kind of JSON value, it can't infer a location data because it looks like a *double* value.

We have built an open-source tool to infer and set the mappings for data (also present as Step#2 in the onboarding process). You can check it out live at https://opensource.appbase.io/gem. Enter your `app_name` and API credentials in the format `https://API_CREDENTIAL@scalr.api.appbase.io` and you will be able to see your app's mappings.

You can also "Create Mappings" from the bottom left section and add a JSON object that you intend to insert to see the auto-inferred mappings.

![](https://i.imgur.com/rN2vwLY.png)

Here, you can set the appropriate mappings (aka schema) and that tells appbase.io on how to index any future data that you insert.
