---
id: interactive-examples
title: "JavaScript / Node.js"
layout: docs
sectionid: interactive-examples
permalink: interactive/javascript.html
next: php.html
nextTitle: "Interactive Examples with PHP"
---

Interactive examples with JavaScript

### Setting things up

Before we start using appbase-js APIs, we’ll need a dataset in Elasticsearch to interact with. appbase-js works with any Elasticsearch index and you can easily [use it with your own dataset](https://opensource.appbase.io/reactive-manual/getting-started/reactivebase.html).

To focus on the API methods, We've setup a [dataset](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAKLAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsW71dAzA7YYc-SS2NBdZOu2iiqUDTwzb8SRY-P60qxz_ZFKoJgMwEJushaRl-FxMxQqDCBLVG-xBlA5HfOZXDzUuGnntd_Zw9u4C0YdVJQ8HvMJrVO8AfQy73d9wq7TjySsVRv-NAKU5ZUw4jxU0ynrQflgPkDLN6AGDv4jeOi8Ir9BBSZ-bdv4J2oq7eCzLoC-gl9qTZsTRLHsXPhHvClG5we6nqctwdPgHqEWqj25nG0qo1RkmJYY_ZTF4XEJcMQyIw-2Rck0OE-ZTR7g8d3ste2uR2u9JbeJj9fjtjVNDltaQGN8jaAdUVVriYpB2CzgXN__Rv9tA&editable=false) containing some dummy housing records. All the examples use this dataset and you can use the same directly by clicking ["Clone this app"](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAKLAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsW71dAzA7YYc-SS2NBdZOu2iiqUDTwzb8SRY-P60qxz_ZFKoJgMwEJushaRl-FxMxQqDCBLVG-xBlA5HfOZXDzUuGnntd_Zw9u4C0YdVJQ8HvMJrVO8AfQy73d9wq7TjySsVRv-NAKU5ZUw4jxU0ynrQflgPkDLN6AGDv4jeOi8Ir9BBSZ-bdv4J2oq7eCzLoC-gl9qTZsTRLHsXPhHvClG5we6nqctwdPgHqEWqj25nG0qo1RkmJYY_ZTF4XEJcMQyIw-2Rck0OE-ZTR7g8d3ste2uR2u9JbeJj9fjtjVNDltaQGN8jaAdUVVriYpB2CzgXN__Rv9tA&editable=false) or make one for yourself.

<br/>

<a target="_blank" href="https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAKLAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsW71dAzA7YYc-SS2NBdZOu2iiqUDTwzb8SRY-P60qxz_ZFKoJgMwEJushaRl-FxMxQqDCBLVG-xBlA5HfOZXDzUuGnntd_Zw9u4C0YdVJQ8HvMJrVO8AfQy73d9wq7TjySsVRv-NAKU5ZUw4jxU0ynrQflgPkDLN6AGDv4jeOi8Ir9BBSZ-bdv4J2oq7eCzLoC-gl9qTZsTRLHsXPhHvClG5we6nqctwdPgHqEWqj25nG0qo1RkmJYY_ZTF4XEJcMQyIw-2Rck0OE-ZTR7g8d3ste2uR2u9JbeJj9fjtjVNDltaQGN8jaAdUVVriYpB2CzgXN__Rv9tA&editable=false">
<img alt="Dataset" src="https://i.imgur.com/erNycvVg.png" />
</a>

All the records are structured in the following format:

<!-- TODO: remove fields that aren't used in any examples -->

```js
 
{
    name: 'The White House',
    room_type: 'Private room',
    property_type: 'Townhouse',
    price: 124,
    has_availability: true,
    accommodates: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    beds: 1,
    bed_type: 'Real Bed',
    host_image: 'https://host_image.link',
    host_name: 'Alyson',
    image: 'https://image.link',
    listing_url: 'https://www.airbnb.com/rooms/6644628',
    location: {
        lat: 47.53540733743967,
        lon: -122.27983057017123
    },
    date_from: 20170426,
    date_to: 20170421,
}
```

Let's look at how we can interact with this dataset via appbase-js APIs.

This is the common code which exists in all examples. Here we simply import the appbase-js library and create an instance object specifing `url`, `credentials` and [`app`](https://docs.appbase.io/concepts/datamodel.html#app-span-stylefont-weight-200aka-indexspan). This instance will provide all appbase-js data APIs to talk with the data.

```js
 
const Appbase = require("appbase-js");

// Create appbase instance to use methods
const appbaseRef = new Appbase({
    url: "https://scalr.api.appbase.io",
    credentials: "YnCgVwozV:e9ec5cb0-58d8-4bb0-badc-acaf726661f1",
    app: "housing-demo"
});
```

> Note <span class="fa fa-info-circle"></span>
>
> Make sure to update `url`, `credentials` and `app` fields if you are using your own dataset.

## Fetch All

Before with start with all the fancy queries, let's query the existing dataset to fetch all the records.

We'll use appbase-js [`search()`](https://docs.appbase.io/javascript/api-reference.html#search) method to fire a [match_all query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html) for this. It’s a convenience method for ElasticSearch’s [`/_search`](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html) endpoint.

Feel free to play around the query by making changes in the interactive demo. Make sure to hit the run button after every change.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also use [Mirage](https://opensource.appbase.io/mirage) - a GUI for Elasticsearch queries which provides a query explorer to interact with our data. [Here's](https://opensource.appbase.io/mirage/#?input_state=XQAAAAKxBgAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuSpDQ9kUuOUgEQayJrMjPDHPMTo8qfXwTqnVrh0i_m9y1THrKxTMAfWfwwcedk3CUDAtRXNAADtgrM-AaohtxKZzBXKYRVHTyXyN8U2PEG0TC5uCuzoWoVyTkFzDCLZfyS8mJZJi6QdiEljmtIaslKsXVKOVZq7BPE8P0_xjUwf2hab_384tlhzDPxsBXQcl_ZyL9z8nGByMgfVBfcAvN8jcKriHmOuSZHh7DoVhqXxspPjLExJuHw6BVhFIXXfujcpB1bg9kwQpr87uWrDXXXGwtomqn-zsQQLibaxdSGP4ySERan0TXumqxWGHLQvH6ZZCZ4NznC3TzgqJwoP2_LDBXippb1sz4nAIBur_E-tAUX7hSago0yzRrJn7wmI7) the same query executed on Mirage.

> Note <span class="fa fa-info-circle"></span>
>
> You can use any query parameters such as `from` and `size` that are [supported by Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html#_parameters_4).

## Index Data

Let's add some data in our dataset. We'll make a simple JSON object with some housing data and pass it with the [`index()`](http://localhost:8000/javascript/api-reference.html#index) method which writes a data object at a given [`type`](https://docs.appbase.io/concepts/datamodel.html#type) and `id` location, or replaces if an object already exists.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-index?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Fetch Data

Let's learn how to fetch or read the data at specific `id`.
We'll use appbase-js [`get()`](https://docs.appbase.io/javascript/api-reference.html#get) method to get back the data (we just added above) by passing the same `id`.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-get?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Stream data

Let's now subscribe to some streaming data based on an `id`. For this, we'll appbase-js [`getStream()`](http://localhost:8000/javascript/api-reference.html#getstream) method which continuously stream new updates to a specific JSON document based on the `id`.

We'll also need to make a change on the same doc we've subscribed by it's `id`. To make change in any existing data, we use [`update()`](http://localhost:8000/javascript/api-reference.html#update) method.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-getStream-update?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

> Note <i class="fa fa-info-circle"></i>
>
> If you intended to replace the complete data object use [`index()`](https://docs.appbase.io/javascript/api-reference.html#index) method instead of [`update()`](https://docs.appbase.io/javascript/api-reference.html#update) which partially updates an existing doc.

## Range Query

Let's now query the dataset to get all rooms between prices 50 to 100.
We'll use appbase-js [`search()`](https://docs.appbase.io/javascript/api-reference.html#search) method to fire a [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html) passing the field `price` and mentioning [range filter](https://www.elastic.co/guide/en/elasticsearch/reference/1.6/query-dsl-range-filter.html) values.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-range?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Here's](https://opensource.appbase.io/mirage/#?input_state=XQAAAAJfCAAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLDjbofRzIiFdNbnDTxOh7awm5G8KyWubtxOjtXV8bilwzwGRcwaa6Vwl0TchA1_BpzJh_fwAq12FFL4R-I5_ibh6CZnEvt4-KnlIuy77b7P8zLtJY5p9O0p5F9in_I1bpUcoSjIVyDVUw7CO3XhqV8GV08WBceOu8bcrsKmeZnI-Tz7wJnFBanEKKCvxmdgNX5iWOlyqb-KulI-V5b7Kd0MnlaLDE9KV4rJlTuHN38cafRSw9KFDmA369s6KHGfK4E8tjcHhkopCEWlojhNy-YDYrfkpB4hBkSRnaoc-Ehh6YMq5B_KZpn0W096kfKkWqUYOqjJkBPWLydygFC5kxq4739mGAfM8pTAFnMN5Qt7qFqbuST9fmTei6v0lp3RT2Uxd9LVAqm3Zwpe8RBtPFYbcd_j8RuCqd4O1HeEgZz60qAFmYL37FBNNLpbxT4mhagGqPSzB6jDCruEgDwj6598PSwxTs3SBIqdZtuv_ZTluhF7jvFMerbm7dw7E8yu-B3jNfPoGW9bTfiMthMn620XFd8bmenoEP8pWq4A) the same query executed on Mirage.

## Search Stream

Let's now subscribe to some streaming data based on a query For this, we'll use [`searchStream()`](http://localhost:8000/javascript/api-reference.html#searchstream) method which continuously stream new results of the subscribed query on a give `type`. Here, we're querying with `match_all` to get streaming updates about all data.

We'll also need to make a change on the `type` we've subscribed. For adding some data, we'll use [`index()`](http://localhost:8000/javascript/api-reference.html#index) method and pass a new data object.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-searchStream-index?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<!-- Mirage: stream query note? -->


## GeoDistance Query

TODO: Desc

Get all the properties around a particular (lat,lon) co-ordinate.

<br/>

TODO: REPL

## Full-text Search

Let's now do a [full-text search query](https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html) on the `name` field.
Here, we'll use appbase-js [`search()`](https://docs.appbase.io/javascript/api-reference.html#search) method to fire a [match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html) with our field `name` and query value.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search-full-text-search?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Here's](https://opensource.appbase.io/mirage/#?input_state=XQAAAAJECAAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLD9FQ2b9UTowlML6Nz4Yks98Jl7CJT4M9dwoB120x3nAWa0b3eGo0atyqfsIkzvPRvAw8Ddhk3GgfPWO89QhrRGa7aEJfIBGZp4mr5z7Obgqy1kuYQRxt49gfXMU4i0_MaNukRWcuQ80KCArF8kEWtHU4AkBintV4KQfISdv_apJGxZs_AgHIcOY0rV6Go0ZYm2k5lZhz2NOhIg4JE5AAGRL38xEasregHkxqxMKt8LNtS5xI7TDhwVJjjPD6I3koSwVcSkfrS4RAsK07SkpDDRvGr5HW8Kkpz0jt8nieWpiyEHlH0PoWS3I_osL6NH7CIGJCZBGSoHBHIbj1oQeL0P3BQVw18O4fMfWH89P6KH1TWZhD2zvCwr48PmopeLcRCtJnXqMXSsCmUqKOTx6MtcmTn-ayiX-IAwpMHpVvyY9k7HDSjc5XKAm_EZTP0en62xzp0ZvL4HlRj_1FB8G8lBF6j6at6gwn51KBo4W8n8s5i1_N4jGSU5HRaTnO_5mtZY1tD6CxTRfcJM3ziGy1Qr4Zj_0jWmGg) the same query executed on Mirage.

## Date Query

Let's now do a date query to get houses that are available between certain dates. As per our data schema, we'll need to use `date_from` and `date_to` fields as our range.

Here, we'll use appbase-js [`search()`](https://docs.appbase.io/javascript/api-reference.html#search) method to fire a [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html) with our field `name` and query values.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search-date?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Here's](https://opensource.appbase.io/mirage/#?input_state=XQAAAAJpCQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLD9FQ2b9UTowlML6Nz4Yks97ESi2tvouDUu23ZYMcOZS3IWRcMxVX5iL_A3K9p25ewhri1rZX4gJl5IUXCoc2inGiafMm0L4xjXz_xDspYFpw62yj3Rl_W6oQvuB08JBYuabPOZB-afI3ADbq6WygsK7w3IKWq3Un8UvwZDRrn3570Nh5QOvxtA5eODOovGVa5CQSvvlE2MdOaYPr2M9DNI7ggOMs-nAEIXUtYlPNX9XbcoNsWnc93gIebBu3MRTuwS4OZmXOBSAJRakqcUNV6IqSwDVb8gs-MhmK9SY74Zn-eRfO7Xaz9C6tZmLMgHyMBqjFZpBDvd2WsT8difxLdR3her8wvviKure25Gk4gS4uBYtmqosWikFwt5C9vJAWzWY0owIVRjx4i2jiY2qJQGGqDAuEE0fTAgqFMnroa7CC6bJpptSCXC-DX-yTUurzZw3TTVXK5o_sUT2BFr-ZDYWOR926oLnc8Zu6yk8VLevJSQLREo2CtMBGsubbdYkApTRBeriurgo1KXAtrnto2RQKIS26UxNv5ZnPvOHxidI_2oSsWiIwq51sd2-0sTEwcKlv09Zlgn0HmFSf-ZC_DQ) the same query executed on Mirage.

## Multi Condition

Finally let's do a query combining multiple conditions. We'll query rooms with a certain `room_type` and between a certain price range.

Here, we'll use appbase-js [`search()`](https://docs.appbase.io/javascript/api-reference.html#search) method to pass a [bool query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) combining a [match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html) for `room_type` and a [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html) for `price`.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search-multi?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Here's](https://opensource.appbase.io/mirage/#?input_state=XQAAAAJpCQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLD9FQ2b9UTowlML6Nz4Yks97ESi2tvouDUu23ZYMcOZS3IWRcMxVX5iL_A3K9p25ewhri1rZX4gJl5IUXCoc2inGiafMm0L4xjXz_xDspYFpw62yj3Rl_W6oQvuB08JBYuabPOZB-afI3ADbq6WygsK7w3IKWq3Un8UvwZDRrn3570Nh5QOvxtA5eODOovGVa5CQSvvlE2MdOaYPr2M9DNI7ggOMs-nAEIXUtYlPNX9XbcoNsWnc93gIebBu3MRTuwS4OZmXOBSAJRakqcUNV6IqSwDVb8gs-MhmK9SY74Zn-eRfO7Xaz9C6tZmLMgHyMBqjFZpBDvd2WsT8difxLdR3her8wvviKure25Gk4gS4uBYtmqosWikFwt5C9vJAWzWY0owIVRjx4i2jiY2qJQGGqDAuEE0fTAgqFMnroa7CC6bJpptSCXC-DX-yTUurzZw3TTVXK5o_sUT2BFr-ZDYWOR926oLnc8Zu6yk8VLevJSQLREo2CtMBGsubbdYkApTRBeriurgo1KXAtrnto2RQKIS26UxNv5ZnPvOHxidI_2oSsWiIwq51sd2-0sTEwcKlv09Zlgn0HmFSf-ZC_DQ) the same query executed on Mirage.

### Further Reading

appbase-js API methods provides full [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) support and there are lots of use-cases that are unlocked by constructing various types of queries. Feel free to use our [GUI query explorer](https://opensource.appbase.io/mirage/) to contruct complex queries easily.

There are many more methods provided by the appbase-js API other than the ones we used. Do check out our full [JavaScript API Reference](http://localhost:8000/javascript/api-reference.html) to dive deeper.
