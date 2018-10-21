---
id: mappings
title: "Mappings"
layout: docs
sectionid: mappings
permalink: concepts/mappings.html
prev: databrowser.html
prevTitle: "Data Browser"
next: search-preview.html
nextTitle: "Search Preview"
---

Mappings define how the JSON data indexed into appbase.io is stored as.

![](https://i.imgur.com/Q7jRhby.png)


## Mapping Types

Within an app, mappings are set for one **mapping type** which determines how the JSON documents get indexed.

A mapping type contains a list of `fields` that are applicable to the indexed JSON data.

## Field Data Types

Field data types are present in one of three shapes:

1. **Primitive**: Text, Keyword, Integer, Float, Double, Date, Geo Point, Boolean are some examples.

2. **Array**: An array shape in appbase.io is just a container that can hold one or more values of the primitive data type. There is no special data type associated with it.

3. **Object**: An object shape in appbase.io acts as a container that can hold a nested JSON object, each keys of which representing a primitive data type or another object / array container.

Beyond the primitive data types, there are also specialized data types that are specific to a search engine, like `completion`, `ip`, `percolator`. You can read all about the supported data types over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html).


## How to Set Mappings

There are three ways you can set mappings.

1. [**Data Browser**](https://dashboard.appbase.io/app?view=browse): The data browser UI can be used to set mappings via the `Add New Field` UI button.

![](https://i.imgur.com/jCpD3UB.png)

The UI supports adding all the primitive types. You can set your own mapping object for creating a specialized type or if you want to set any non-default options within a type.

2. [**Manage Mappings**](https://dashboard.appbase.io/app?view=mappings): The Mappings UI can be used to `Add New Field`.

![](https://i.imgur.com/jq3gVWZ.png)

3. [**REST API**](https://rest.appbase.io): You can use the APIs to set the mappings using the [PUT `/_mapping`](https://rest.appbase.io/#5c5e8488-a1a0-6bdb-a840-73b40a8d990a) endpoint.

> Note <i class="fa fa-info-circle"></i>
>
> Mappings are immutable in Elasticsearch. Once set, they can't be changed.

## Editing Mappings

If you are on a paid plan on appbase.io, you can edit the mappings via the [**Mappings UI**](https://dashboard.appbase.io/app?view=mappings). As mappings are immutable, we provide this functionality by reindexing an app.

You can do the following:

1. **Delete a field**: This will also delete any associated data values being used for that field.

2. **Edit an individual field's data type**: This will change the associated data type of the field.

3. **Delete a mapping type**: This will delete all the fields (and their values) that belong under the mapping type.

4. **Add a new field**: This allows you to add new field types.