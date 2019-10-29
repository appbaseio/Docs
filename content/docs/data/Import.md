---
title: 'Importing Data'
meta_title: 'Appbase - Dashboard'
meta_description: 'Import through GUI and command line sources such as Dashboard, ABC CLI, Rest APIs, and Zapier.'
keywords:
    - dataschema
    - appbase
    - import
    - elasticsearch
sidebar: 'docs'
---

You can bring your data from various sources into `appbase.io` database using one or many of these methods.

##Importing through Dashboard

Dashboard is a WYSIWYG GUI for adding, modifying and viewing your appbase.io app's data.

Data is stored as JSON documents. You can read more about the data schema [here](/docs/data/Model).

In this tutorial we will review how to import data from a data file using the appbase.io [dashboard](https://dashboard.appbase.io/).

### Dataset

We’ll use an example from an [actors dataset](https://github.com/algolia/datasets/blob/master/movies/actors.json). Feel free to use your own dataset instead.

We use JSON format, but CSV is also acceptable.

**Example of a JSON file**

```json
[
	{
		"firstname": "Jimmie",
		"lastname": "Barninger"
	},
	{
		"firstname": "Warren",
		"lastname": "Speach"
	}
]
```

**Example of a CSV file**

```csv
firstname,lastname
Jimmie,Barninger
Warren,Speach
```

### Open the appbase.io Dashboard

Head over to [appbase.io dashboard](https://dashboard.appbase.io) and login with your credentials or create an account if you haven't one.

### Creating a new app

As we are using an actors dataset, let’s name our new app `actors`.

![](https://i.imgur.com/v4h2JuY.png)

### Upload the file

Now that the app has been created, we can import the data file as shown in the GIF.

![](https://www.dropbox.com/s/05do1q1wvp7t13t/short_upload.gif?raw=1)

##Importing through ABC CLI
`abc import` is part of [abc](https://github.com/appbaseio/abc) — A tool that allows accessing appbase.io via a commandline.

###Key Benefits

-   Whether your data resides in Postgres or a JSON file or MongoDB or in all three places, **abc** can index the data into Elasticsearch. It is the only tool that allows working with all these sources at once or individually: `csv`, `json`, `postgres`, `mysql`, `sqlserver`, `mongodb`, `elasticsearch` and `firestore`.
-   It can keep the Elasticsearch index synced in realtime with the data source.
    > Note: This is currently only supported for MongoDB and Postgres.
-   `abc import` is a single line command that allows doing all of the above. It doesn’t require any external dependencies, takes zero lines of code configuration, and runs as an isolated process with a minimal resource footprint.

### Installation

> Command Line: `docker pull appbaseio/abc`

You can also download from [GitHub](https://github.com/appbaseio/abc/releases/latest) or get the [Docker image](https://hub.docker.com/r/appbaseio/abc/)

---

It is possible to import data from various database sources. See the API below to import from the database that suits your need.

###Postgres

```bash
abc import --src_type=postgres --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-postgres-to-elasticsearch-6eebc5cc0f0f)

###MongoDB

```bash
abc import --src_type=mongodb --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-mongodb-to-elasticsearch-ee5a74695945)

###MySQL

```bash
abc import --src_type=mysql --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-mysql-to-elasticsearch-b59289e5025d)

###Microsoft SQL Server

```bash
abc import --src_type=mssql --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-mssql-to-elasticsearch-341963a054dd)

###Elasticsearch

```bash
abc import --src_type=elasticsearch --src_uri=<elasticsearch_src_uri> <elasticsearch_dest_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-elasticsearch-to-elasticsearch-301c7a243c84)

###JSON

```bash
abc import --src_type=json --src_uri=<uri> --typename=<target_type_name> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-json-to-elasticsearch-92f582c53df4)

###CSV

```bash
abc import --src_type=csv --src_uri=<uri> --typename=<target_type_name> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-csv-to-elasticsearch-17d290a5974f)

###Firestore

```bash
abc import --src_type=firestore --sac_path=<path_to_service_account_credentials> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-from-firestore-to-elasticsearch-80286fc8e58b)

##Zapier
You can import data into appbase.io using any of the following methods:

-   Import via the dashboard GUI,
-   Import via ABC CLI,
-   Use the Zapier integration to import from over 1,500+ supported apps such as Typeform, Google Sheets, Mailchimp.

In this doc, we will walk through the process of importing using this Zapier integration using Google Sheets as an example input source.

Zapier allows connecting apps you use everyday to automate your work and be more productive. You can read more about Zapier over [here](https://zapier.com).

> Right now, the appbase.io app is not publicly available on Zapier. You can use it via this invite link: https://zapier.com/developer/public-invite/33102/02001b9598c3849a50cf1c94ff0cf572/

### Creating A Zap

You can go to the [Zapier editor](https://zapier.com/app/editor/) and create a zap. In the below image, we create a zap for `Google Sheets <> appbase.io`.

![](https://i.imgur.com/GSavUdf.png)

### Adding Your Data In Google Sheets

Add data in your Google Sheets. You can directly copy the data from [here](https://docs.google.com/spreadsheets/d/1nc3n-saZ8pVd7gE64iR6BrJoHzpVOrRPi8B3598UCLQ/edit?usp=sharing).

![](https://i.imgur.com/eHoBAWB.png)

### Configuring Google Sheets

Login with your Google account and once you configure the Google Sheets integration, you should see something similar:

![](https://i.imgur.com/tARRU02.png)

### Configuring appbase.io

Next, select `appbase.io` from the apps and go to the `Create Document` action.

![](https://i.imgur.com/NXSWV1Y.png)

After this step, you need to add your API credentials and authenticate. Connect your `appbase.io` account on clicking `Add a New Account` under `Choose Account` section, where you have to
enter your `appbase.io` credentials which you can find [here](https://dashboard.appbase.io/profile/credentials).
You should see something similar:

![](https://i.imgur.com/avTdYss.png)

---

You can perform below operations through Zapier.

### Adding New Record

I am going to call my appbase.io app `business` here. The Zapier integration will create the app if it doesn't exist. The next step is to map the columns from Google Sheets to the field names that will be used to store them in appbase.io. It should look something similar to the following:

![](https://i.imgur.com/wHpDMH7.png)

After clicking on `Continue` and after a successful insertion, you will also see an `_id` being returned back. This is the unique ID for our record (aka document).

![](https://i.imgur.com/r2MSpTg.png)

### Updating An Existing Document

Another helpful feature is the ability to edit existing documents. Whenever a value from an incoming integration is mapped to an `_id` field, the existing document gets updated instead of a new document getting created.

![](https://i.imgur.com/7zEAso9.png)

### Conclusion

While we focused here on a specific integration with Google Sheets, you can capture incoming data from a variety of sources, including but not limited to emails being received in your Sendgrid account or GMail, form data coming from Google Sheets, Typeform or Airtable, and even perform database sync from MySQL, Firestore and other supported database Zaps.
