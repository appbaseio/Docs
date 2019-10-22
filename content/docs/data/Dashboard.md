---
title: 'Importing from the Dashboard'
meta_title: 'Appbase - Dashboard'
meta_description: 'Dashboard is a WYSIWYG GUI for adding, modifying and viewing your appbase.io app data.'
keywords:
    - dataschema
    - appbase
    - dashboard
    - elasticsearch
sidebar: 'docs'
---

Dashboard is a WYSIWYG GUI for adding, modifying and viewing your appbase.io app's data.

Data is stored as JSON documents. You can read more about the data schema [here](/docs/data/Model).

In this tutorial we will review how to import data from a data file using the appbase.io [dashboard](https://dashboard.appbase.io/).

## Dataset

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

## Open the appbase.io Dashboard
Head over to [appbase.io dashboard](https://dashboard.appbase.io) and login with your credentials or create an account if you haven't one.

## Creating a new app
As we are using an actors dataset, let’s name our new app `actors`.

![](https://i.imgur.com/v4h2JuY.png)

## Upload the file
Now that the app has been created, we can import the data file as shown in the GIF.

![](https://www.dropbox.com/s/05do1q1wvp7t13t/short_upload.gif?raw=1)
