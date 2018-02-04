---
id: databrowser
title: "Data Browser"
layout: docs
sectionid: databrowser
permalink: concepts/databrowser.html
prev: datamodel.html
prevTitle: "Data Model"
---

Data Browser is a WYSIWYG GUI for adding, modifying and viewing your appbase.io app's data.

Data is stored as JSON documents in a **type**. You can read more about the data schema [here](/concepts/datamodel.html#appbase-data-schema).

## Installation

The data browser is available within appbase.io app dashboard. But it can also be:
- downloaded as a [chrome extension](https://chrome.google.com/webstore/detail/dejavu/jopjeaiilkcibeohjdmejhoifenbnmlh),
- run as a [docker container](https://hub.docker.com/r/appbaseio/dejavu) or
- used as a hosted app [here](https://opensource.appbase.io/dejavu/live).

## Creating An App

You can go to the [appbase.io dashboard](https://dashboard.appbase.io) and create an app. In the below gif, we create an app called `newstreamingapp`.

![](https://i.imgur.com/r6hWKAG.gif)

## Adding Your First Data

You can access the databrowser [from the dashboard](http://dashboard.appbase.io/browser/) or independently via [dejavu app](https://opensource.appbase.io/dejavu/live/).

![](https://i.imgur.com/Bh59Ej1.gif)

Follow the above steps to add your first data.

## Adding New Field

Dejavu now also supports adding new fields, including setting the appropriate mappings for the field.

You have to first be in the **Editing** mode. And then select the `+` button near the field name headers in the column display on the top right.

![](https://i.imgur.com/Z7QaURd.png)

You can pick from the one of the available data types or set your own mapping.

## Operations

### Adding Data

The data browser allows adding data as a single JSON object or multiple JSON objects (passed as an array). It is recommended to pass up to 100 objects at a time.

### Updating Existing Data

Existing data records can be updated easily. Select a record from the view and tap the **Update** button.

![](https://i.imgur.com/9BTvUDI.png)

### Deleting Data

Data records can also be deleted easily. Select a record (or multiple) from the view and tap the **Delete** button.

![](https://i.imgur.com/k74fwaQ.png)

## Doing more with data

While data browser is great to get started with appbase.io and for visualizing data, the recommended way to add data programmatically is via the [REST API](/rest-quickstart.html) or one of the [Javascript](/javascript/quickstart.html) or [Golang](https://godoc.org/github.com/appbaseio/go-appbase) libraries.

The data browser is still a great place to visualize and debug the existing data records with its filters and continuous query functionalities.
