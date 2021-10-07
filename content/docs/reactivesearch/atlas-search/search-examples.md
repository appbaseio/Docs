---
title: 'REST API - Search examples'
meta_title: 'Search examples using REST API'
meta_description: 'Examples showing how to achieve different search use-cases with ReactiveSearch API and Atlas Search'
keywords:
    - overview
    - atlas-search
    - search-ui
    - react-searchbox
    - mongodb
    - realm
sidebar: 'docs'
nestedSidebar: 'atlas-search'
---

We will show how to build different kinds of search experiences with Atlas Search using the ReactiveSearch API.

The ReactiveSearch Realm function endpoint exposes a REST API that all of ReactiveSearch and Searchbox UI libraries use to express the declarative search intent. The ReactiveSearch API is documented over [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

For this guide, we are making use of a publicly deployed Realm endpoint. You can substitute this with your deployed function's URL.

```bash
url=https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch
```

> **Note:** Some of the examples make use of specific data types such as geopoint or autocomplete. These are already preset in the indexes they're queried against in these examples, but if you're replacing the Realm function endpoint, these data types need to be set prior to running the queries.

## Use Cases


### Facet (list) examples

A single/multi select facet UI is typically represented with a term query. Here, we will take a look at different ways of creating this UI.

#### Getting the top buckets

<iframe src="https://play.reactivesearch.io/embed/gBOY9B3F41P3o8DZNl4o" style="width:100%; height: 500px; border:0; overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Sort buckets by `asc` order

<iframe src="https://play.reactivesearch.io/embed/LCSl4bQV8NzX3HNTkNtg" style="width:100%; height: 500px; border:0;  overflow:hidden;"
   title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Finding any of the facet items: A multi-select filtering use-case

<iframe src="https://play.reactivesearch.io/embed/moPGn2vjlApQJUPClyCG" style="width:100%; height: 500px; border:0;  overflow:hidden;"
   title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Finding all of the facet items: A multi-select filtering use-case

<iframe src="https://play.reactivesearch.io/embed/PEVFz2Jnus7uhKG7dTb0" style="width:100%; height: 500px; border:0;  overflow:hidden;"
   title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Passing MongoDB aggregation stages directly to override the default query of the term component

<iframe src="https://play.reactivesearch.io/embed/7hYC8U1cG33cE6wkgUEi" style="width:100%; height: 500px; border:0;  overflow:hidden;"
   title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Passing MongoDB aggregation stages directly to override the default query of the result component

<iframe src="https://play.reactivesearch.io/embed/TsOlt9CpxgufdDX0LI4N" style="width:100%; height: 500px; border:0;  overflow:hidden;"
   title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>


### Range examples

A Range UI is typically represented as a range selector, range input/slider, or a date picker.

#### Get the results within the given range of a field value

<iframe src="https://play.reactivesearch.io/embed/TyxUhuJ77y1DQ8hKL5l2" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Get results within a given range as well as return min, max and histogram aggregations

<iframe src="https://play.reactivesearch.io/embed/yUrnvc9Kt7nt3gg0fNuZ" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Return documents with null values in the path (aka field) for a given range selection

<iframe src="https://play.reactivesearch.io/embed/18KIx3mC4CK3EEnldAur" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

### Geo (map) examples

A map (Google Maps, OpenStreetMaps) is typically used for building geo UIs. It primarily uses two types of queries.

#### Searching within a circle

<iframe src="https://play.reactivesearch.io/embed/bANFzLidlDl547khEEmF" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Searching within a bounding box

<iframe src="https://play.reactivesearch.io/embed/Cza0tApO2Bp2TVMxgJ3m" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

### Search (typeahead) examples

A searchbox is typically used for building an autosuggestions or a highlighting based experience.

#### Searching on specific fields with weights

<iframe src="https://play.reactivesearch.io/embed/YmxZ7oDhEjlcPz8WAqtk" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Searching with highlighting enabled

<iframe src="https://play.reactivesearch.io/embed/yBaLhQKu6A4IayJ65POf" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Searching with fuzziness set to 1

<iframe src="https://play.reactivesearch.io/embed/O1r3NUkrzhLqAvrjcBag" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>

#### Searching with autocomplete type

<iframe src="https://play.reactivesearch.io/embed/bWmkZxQ8KSv7pGHcOFp9" style="width:100%; height: 500px; border:0;  overflow:hidden;" title=rs-playground-DmIAKMrUXLpwn2zRAaRB></iframe>
