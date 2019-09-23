---
title: 'Zapier'
meta_title: 'Appbase - Zapier'
meta_description: 'Automate your appbase.io database operations with Zapier.'
keywords:
    - dataschema
    - appbase
    - zapier
    - elasticsearch
sidebar: 'docs'
---

Connect the apps you use everyday to automate your work and be more productive. 1500+ apps and easy integrations - get started in minutes.

You can read more about the zapier [here](https://zapier.com).

## Overview

I use a variety of tools to insert a record into appbase.io database such as https://importer.appbase.io. The issue is that these tools are fragmented and new records can come from a variety of sources such as Typeform, Google Sheets, etc.
Managing the inputs and how you view these records after they've been captured is the tiresome part of this equation. Switching between tools, monitoring services for new additions or updates, and manually entering this data across them takes up time that could be better spent clearing your list.
We will look at how can we automate database operations using Google Sheets and Zapier.

## Creating A Zap

You can go to the [zapier editor](https://zapier.com/app/editor/) and create a zap. In the below image, we create a zap called `google sheet - appbase.io`.

![](https://i.imgur.com/GSavUdf.png)

## Adding Your Data In Google Sheets

Add data in your Google Sheet. I have created an example for you.

![](https://i.imgur.com/eHoBAWB.png)

## Configuring Google Sheets
Login with your Google Account and once you select sample data, it should appear like this.

![](https://i.imgur.com/tARRU02.png)

## Operations

### Adding New Record

Let's create an app named `business` and reference record in it from Google Sheets. It will look like this:

![](https://i.imgur.com/wHpDMH7.png)

After clicking Continue, on successfull insertion, an `_id` will be generated like this:

![](https://i.imgur.com/r2MSpTg.png)


### Updating Existing Record

Existing data records can be updated easily. Enter `_id` from the previous step and update the field data like this:

![](https://i.imgur.com/ZnlsL8R.png)

##Conclusion
On successful completion of each of these steps, you will have created a custom zap. Now whenever you insert a new
record into Google Sheet, it will automatically insert into the corresponding app of appbase.io. 
