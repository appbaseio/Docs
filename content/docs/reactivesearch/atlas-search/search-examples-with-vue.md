---
title: 'Search examples with Vue Searchbox'
meta_title: 'Search examples using Vue Searchbox'
meta_description: 'Examples showing how to achieve different search use-cases with Vue Searchbox and Atlas Search'
keywords:
    - overview
    - atlas-search
    - search-ui
    - vue-searchbox
    - mongodb
    - realm
sidebar: 'docs'
nestedSidebar: 'atlas-search'
---

We will show how to build different kinds of search experiences with Atlas Search using the Vue Searchbox library.

The ReactiveSearch Realm function endpoint exposes a REST API that all of ReactiveSearch and Searchbox UI libraries use to express the declarative search intent. The ReactiveSearch API is documented over [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

For this guide, we are making use of a publicly deployed Realm endpoint. You can substitute this with your deployed function's URL.

```bash
url=https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch
```

> **Note:** Some of the examples make use of specific data types such as geopoint or autocomplete. These are already preset in the indexes they're queried against in these examples, but if you're replacing the Realm function endpoint, these data types need to be set prior to running the queries.

All of these examples can be deployed using MongoDB Realm's static hosting feature with one CLI command and a click. Read the Search UI hosting guide over [here](/docs/reactivesearch/atlas-search/static-hosting/).

## Use Cases


### Facet (list) examples

A single/multi select facet UI is typically represented with a term query. Here, we will take a look at different ways of creating this UI.


#### Getting the top buckets

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/facet-filters?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Sort buckets by `asc` order

By default, the facet buckets are sorted by count. This example uses the `sortBy="asc"` prop to order the buckets in ascending order.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/sort-facets?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Finding any or all of the facet items: A multi-select filtering use-case

The `queryFormat` prop which accepts "or" or "and" as values allows setting whether the results get filtered by an any ("or") matching clause or by an all ("and") matching clause. The following example uses the "and" value to filter Airbnb listings by those that satisfy all the selected amenities. 

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/multi-select-facet-with-and-operator?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Passing MongoDB aggregation stages directly to override the default query of the term component

TODO

### Search (typeahead) examples

A searchbox UI component is typically used for building an autosuggestions or a highlighting based experience.

#### Searching on specific fields with weights

The `dataField` prop of SearchBox component allows setting weighted fields (aka paths). In this example, we will use this to search on name and description fields with a higher boost associated with the `name` field.

```js
dataField={[
    {
        field: "name",
        weight: 3
    },
    {
        field: "description",
        weight: 1
    }
]}
```

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/search-with-field-weights?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Showing default suggestions

The `defaultSuggestions` prop of SearchBox component allows setting initial suggestions to show in the searchbox (typeahead) example.

```js
defaultSuggestions={[
    {
        label: "Oceanfront Resort",
        value: "oceanfront resort"
    },
    {
        label: "Private cabin",
        value: "private cabin"
    },
    {
        label: "Duplex apartment",
        value: "duplex apartment"
    }
]}
```

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/show-default-suggestions?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### A fuzzy search example

The `fuzziness` prop of Searchbox component enables finding matches even when the user input contains a typo.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/fuzzy-search?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Searching on autocomplete type

The `autocompleteField` prop of Searchbox is similar to the `dataField` prop, but allows setting fields with autocomplete type to search on.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/search-on-autocomplete-fields?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Show results on each keystroke

The `autosuggest` prop controls whether the autosuggestions UI is used or not. By setting it to false in this example, search is made on each keystroke.

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/show-result-on-each-search-keystroke?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Range examples

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/fix/issues-after-mongo-suggestion-merge/packages/vue-searchbox/examples/by-usecases/range-slider?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
### Geo examples

TODO
