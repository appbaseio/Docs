---
title: 'Zapier'
meta_title: 'appbase.io - Zapier'
meta_description: 'Automate your appbase.io database operations with Zapier.'
keywords:
    - dataschema
    - appbase.io
    - zapier
    - elasticsearch
sidebar: 'docs'
---

Connect the apps you use everyday to automate your work and be more productive. 1500+ apps and easy integrations - get started in minutes.

You can read more about the zapier [here](https://zapier.com).

## Overview

You can import data into appbase.io using any of the following methods:

-   Import via the dashboard GUI,
-   Import via ABC CLI,
-   Use the Zapier integration to import from over 1,500+ supported apps such as Typeform, Google Sheets, Mailchimp.

In this doc, we will walkthrough the process of importing using this Zapier integration using Google Sheets as an example input source.

## Creating A Zap

You can go to the [zapier editor](https://zapier.com/app/editor/) and create a zap. In the below image, we create a zap called `google sheet - appbase.io`.

![](https://i.imgur.com/GSavUdf.png)

## Adding Your Data In Google Sheets

Add data in your Google Sheet. You can directly copy the data from [here](https://docs.google.com/spreadsheets/d/1nc3n-saZ8pVd7gE64iR6BrJoHzpVOrRPi8B3598UCLQ/edit?usp=sharing)

![](https://i.imgur.com/eHoBAWB.png)

## Configuring Google Sheets

Login with your Google Account and once you select sample data, it should appear like this.

![](https://i.imgur.com/tARRU02.png)

## Configuring appbase.io

Select `appbase.io` from the apps and click `Create Document` action

![](https://i.imgur.com/NXSWV1Y.png)

After this step, you need to add your API credentials and authenticate.

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
