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

Before we start using appbase-js APIs, we’ll need a dataset in Elasticsearch to interact with. appbase-js works with any Elasticsearch index and you can easily use it with your own dataset.

To focus on the API methods, we've set up a <a href="https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAKLAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsW71dAzA7YYc-SS2NBdZOu2iiqUDTwzb8SRY-P60qxz_ZFKoJgMwEJushaRl-FxMxQqDCBLVG-xBlA5HfOZXDzUuGnntd_Zw9u4C0YdVJQ8HvMJrVO8AfQy73d9wq7TjySsVRv-NAKU5ZUw4jxU0ynrQflgPkDLN6AGDv4jeOi8Ir9BBSZ-bdv4J2oq7eCzLoC-gl9qTZsTRLHsXPhHvClG5we6nqctwdPgHqEWqj25nG0qo1RkmJYY_ZTF4XEJcMQyIw-2Rck0OE-ZTR7g8d3ste2uR2u9JbeJj9fjtjVNDltaQGN8jaAdUVVriYpB2CzgXN__Rv9tA&editable=false" target="_blank">dataset</a>. containing some dummy housing records. All the examples use this dataset and you can use the same directly by clicking <a href="https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAKLAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsW71dAzA7YYc-SS2NBdZOu2iiqUDTwzb8SRY-P60qxz_ZFKoJgMwEJushaRl-FxMxQqDCBLVG-xBlA5HfOZXDzUuGnntd_Zw9u4C0YdVJQ8HvMJrVO8AfQy73d9wq7TjySsVRv-NAKU5ZUw4jxU0ynrQflgPkDLN6AGDv4jeOi8Ir9BBSZ-bdv4J2oq7eCzLoC-gl9qTZsTRLHsXPhHvClG5we6nqctwdPgHqEWqj25nG0qo1RkmJYY_ZTF4XEJcMQyIw-2Rck0OE-ZTR7g8d3ste2uR2u9JbeJj9fjtjVNDltaQGN8jaAdUVVriYpB2CzgXN__Rv9tA&editable=false" target="_blank">"Clone this app"</a> or make one for yourself.

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

This is the common code which exists in all examples. Here we simply import the appbase-js library and create an instance object specifying `url`, `credentials` and [`app`](/concepts/datamodel.html#app-span-stylefont-weight-200aka-indexspan). This instance will provide all appbase-js data APIs to talk with the data.

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

We'll use appbase-js [`search()`](/javascript/api-reference.html#search) method to fire a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html" target="_blank">match_all query</a> for this.

> Note <span class="fa fa-info-circle"></span>
>
> Feel free to play around the query by making changes in the interactive demo. Make sure to hit the run button after every change.


<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also use <a href="https://opensource.appbase.io/mirage" target="_blank">Mirage</a> - a GUI for Elasticsearch queries which provides a query explorer to interact with our data. <a href="https://opensource.appbase.io/mirage/#?input_state=XQAAAAKxBgAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuSpDQ9kUuOUgEQayJrMjPDHPMTo8qfXwTqnVrh0i_m9y1THrKxTMAfWfwwcedk3CUDAtRXNAADtgrM-AaohtxKZzBXKYRVHTyXyN8U2PEG0TC5uCuzoWoVyTkFzDCLZfyS8mJZJi6QdiEljmtIaslKsXVKOVZq7BPE8P0_xjUwf2hab_384tlhzDPxsBXQcl_ZyL9z8nGByMgfVBfcAvN8jcKriHmOuSZHh7DoVhqXxspPjLExJuHw6BVhFIXXfujcpB1bg9kwQpr87uWrDXXXGwtomqn-zsQQLibaxdSGP4ySERan0TXumqxWGHLQvH6ZZCZ4NznC3TzgqJwoP2_LDBXippb1sz4nAIBur_E-tAUX7hSago0yzRrJn7wmI7" target="_blank">Here's</a> the same query executed on Mirage.

> Note <span class="fa fa-info-circle"></span>
>
> You can use any query parameters such as `from` and `size` that are <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html#_parameters_4" target="_blank">supported by Query DSL</a>.

## Index Data

Let's add some data to our dataset. We'll make a simple JSON object with some housing data and pass it with the [`index()`](/javascript/api-reference.html#index) method which writes a data object at a given [`type`](/concepts/datamodel.html#type) and `id` location, or replaces if an object already exists.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-index?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Fetch Data

Let's learn how to fetch or read the data at specific `id`.
We'll use appbase-js [`get()`](/javascript/api-reference.html#get) method to get back the data (we just added above) by passing the same `id`.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-get?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Stream data

Let's now subscribe to some streaming data based on an `id`. For this, we'll appbase-js [`getStream()`](/javascript/api-reference.html#getstream) method which continuously streams new updates to a specific JSON document based on the `id`.

We'll also need to make a change on the same doc we've subscribed by it's `id`. To make a change in any existing data, we use [`update()`](/javascript/api-reference.html#update) method.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-getStream-update?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

> Note <i class="fa fa-info-circle"></i>
>
> If you intended to replace the complete data object use [`index()`](/javascript/api-reference.html#index) method instead of [`update()`](/javascript/api-reference.html#update) which partially updates an existing doc.

## Range Query

Let's now query the dataset to get all rooms between prices 50 to 100.
We'll use appbase-js [`search()`](/javascript/api-reference.html#search) method to fire a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html" target="_blank">range query</a> passing the field `price` and mentioning <a href="https://www.elastic.co/guide/en/elasticsearch/reference/1.6/query-dsl-range-filter.html" target="_blank">range filter</a> values.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-range?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<a href="https://opensource.appbase.io/mirage/#?input_state=XQAAAAJfCAAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLDjbofRzIiFdNbnDTxOh7awm5G8KyWubtxOjtXV8bilwzwGRcwaa6Vwl0TchA1_BpzJh_fwAq12FFL4R-I5_ibh6CZnEvt4-KnlIuy77b7P8zLtJY5p9O0p5F9in_I1bpUcoSjIVyDVUw7CO3XhqV8GV08WBceOu8bcrsKmeZnI-Tz7wJnFBanEKKCvxmdgNX5iWOlyqb-KulI-V5b7Kd0MnlaLDE9KV4rJlTuHN38cafRSw9KFDmA369s6KHGfK4E8tjcHhkopCEWlojhNy-YDYrfkpB4hBkSRnaoc-Ehh6YMq5B_KZpn0W096kfKkWqUYOqjJkBPWLydygFC5kxq4739mGAfM8pTAFnMN5Qt7qFqbuST9fmTei6v0lp3RT2Uxd9LVAqm3Zwpe8RBtPFYbcd_j8RuCqd4O1HeEgZz60qAFmYL37FBNNLpbxT4mhagGqPSzB6jDCruEgDwj6598PSwxTs3SBIqdZtuv_ZTluhF7jvFMerbm7dw7E8yu-B3jNfPoGW9bTfiMthMn620XFd8bmenoEP8pWq4A" target="_blank">Here's</a> the same query executed on Mirage.

## Search Stream

Let's now subscribe to some streaming data based on a query. For this, we'll use [`searchStream()`](/javascript/api-reference.html#searchstream) method which continuously streams new results of the subscribed query on a give `type`. Here, we're querying with `match_all` to get streaming updates about all data.

We'll also need to make a change in the `type` we've subscribed. For adding some data, we'll use [`index()`](/javascript/api-reference.html#index) method and pass a new data object.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-searchStream-index?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<!-- Mirage: stream query note? -->


## GeoDistance Query

Let's now get a list of all the rooms available within a certain distance from a specific (lat,lon) location.

Here, we'll use appbase-js [`search()`](/javascript/api-reference.html#search) method to fire a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-distance-query.html" target="_blank">geodistance query</a> specifying `distance` and `location` co-ordinates.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-GeoDistance?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


## Full-text Search

Full-text search queries analyses all the combinations of a given value and assigns scores to results based on their match relevance. It uses ngram tokenizer which creates and matches all combinations of the query string. Read more about it <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html" target="_blank">here</a>.

We'll do a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html" target="_blank">full-text search query</a> on the `name` field by using appbase-js [`search()`](/javascript/api-reference.html#search) method to fire a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html" target="_blank">match query</a> with our field `name` and query value.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search-full-text-search?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<a href="https://opensource.appbase.io/mirage/#?input_state=XQAAAAJECAAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLD9FQ2b9UTowlML6Nz4Yks98Jl7CJT4M9dwoB120x3nAWa0b3eGo0atyqfsIkzvPRvAw8Ddhk3GgfPWO89QhrRGa7aEJfIBGZp4mr5z7Obgqy1kuYQRxt49gfXMU4i0_MaNukRWcuQ80KCArF8kEWtHU4AkBintV4KQfISdv_apJGxZs_AgHIcOY0rV6Go0ZYm2k5lZhz2NOhIg4JE5AAGRL38xEasregHkxqxMKt8LNtS5xI7TDhwVJjjPD6I3koSwVcSkfrS4RAsK07SkpDDRvGr5HW8Kkpz0jt8nieWpiyEHlH0PoWS3I_osL6NH7CIGJCZBGSoHBHIbj1oQeL0P3BQVw18O4fMfWH89P6KH1TWZhD2zvCwr48PmopeLcRCtJnXqMXSsCmUqKOTx6MtcmTn-ayiX-IAwpMHpVvyY9k7HDSjc5XKAm_EZTP0en62xzp0ZvL4HlRj_1FB8G8lBF6j6at6gwn51KBo4W8n8s5i1_N4jGSU5HRaTnO_5mtZY1tD6CxTRfcJM3ziGy1Qr4Zj_0jWmGg" target="_blank">Here's</a> the same query executed on Mirage.

## Date Query

Let's now do a date query to get houses that are available between certain dates. As per our data schema, we'll need to use `date_from` and `date_to` fields as our range.

Here, we'll use appbase-js [`search()`](/javascript/api-reference.html#search) method to fire a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html" target="_blank">range query</a> with our field `name` and query values.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search-date?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<a href="https://opensource.appbase.io/mirage/#?input_state=XQAAAAJpCQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLD9FQ2b9UTowlML6Nz4Yks97ESi2tvouDUu23ZYMcOZS3IWRcMxVX5iL_A3K9p25ewhri1rZX4gJl5IUXCoc2inGiafMm0L4xjXz_xDspYFpw62yj3Rl_W6oQvuB08JBYuabPOZB-afI3ADbq6WygsK7w3IKWq3Un8UvwZDRrn3570Nh5QOvxtA5eODOovGVa5CQSvvlE2MdOaYPr2M9DNI7ggOMs-nAEIXUtYlPNX9XbcoNsWnc93gIebBu3MRTuwS4OZmXOBSAJRakqcUNV6IqSwDVb8gs-MhmK9SY74Zn-eRfO7Xaz9C6tZmLMgHyMBqjFZpBDvd2WsT8difxLdR3her8wvviKure25Gk4gS4uBYtmqosWikFwt5C9vJAWzWY0owIVRjx4i2jiY2qJQGGqDAuEE0fTAgqFMnroa7CC6bJpptSCXC-DX-yTUurzZw3TTVXK5o_sUT2BFr-ZDYWOR926oLnc8Zu6yk8VLevJSQLREo2CtMBGsubbdYkApTRBeriurgo1KXAtrnto2RQKIS26UxNv5ZnPvOHxidI_2oSsWiIwq51sd2-0sTEwcKlv09Zlgn0HmFSf-ZC_DQ" target="_blank">Here's</a> the same query executed on Mirage.

## Compound Query

Finally, let's do a compound query combining multiple conditions. We'll query rooms with a certain `room_type` within a certain price range.

Here, we'll use appbase-js [`search()`](/javascript/api-reference.html#search) method to pass a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html" target="_blank">bool query</a> combining a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html" target="_blank">match query</a> for `room_type` and a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html" target="_blank">range query</a> for `price`.

<br/>

<iframe height="600px" width="100%" src="https://repl.it/@dhruvdutt/Appbaseio-Nodejs-search-compound?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<a href="https://opensource.appbase.io/mirage/#?input_state=XQAAAAJpCQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmI_q1W5J_v7Zsy4Ujaaw71A1BS9rYYbaidH1ngBtQ-I1sDSXRgrmGsCDzBYBoUXwDHQtefpH-PChYyyKqpnVdVrmIsxvIDhOBtThtu_W53GnLmSMoma1UPnh9E7LZRkgXxp3ltXA31wX1fcfowk1r2gVrCN8VgmuPFOWM3o65_HcKkYs4OQ0hAB7hnHy3CILQ5MgAbYZpuCAVHzQcRXBvN2fFZCuCSUNYX32cshZ3d4lrzfi6fQXgJyuLD9FQ2b9UTowlML6Nz4Yks97ESi2tvouDUu23ZYMcOZS3IWRcMxVX5iL_A3K9p25ewhri1rZX4gJl5IUXCoc2inGiafMm0L4xjXz_xDspYFpw62yj3Rl_W6oQvuB08JBYuabPOZB-afI3ADbq6WygsK7w3IKWq3Un8UvwZDRrn3570Nh5QOvxtA5eODOovGVa5CQSvvlE2MdOaYPr2M9DNI7ggOMs-nAEIXUtYlPNX9XbcoNsWnc93gIebBu3MRTuwS4OZmXOBSAJRakqcUNV6IqSwDVb8gs-MhmK9SY74Zn-eRfO7Xaz9C6tZmLMgHyMBqjFZpBDvd2WsT8difxLdR3her8wvviKure25Gk4gS4uBYtmqosWikFwt5C9vJAWzWY0owIVRjx4i2jiY2qJQGGqDAuEE0fTAgqFMnroa7CC6bJpptSCXC-DX-yTUurzZw3TTVXK5o_sUT2BFr-ZDYWOR926oLnc8Zu6yk8VLevJSQLREo2CtMBGsubbdYkApTRBeriurgo1KXAtrnto2RQKIS26UxNv5ZnPvOHxidI_2oSsWiIwq51sd2-0sTEwcKlv09Zlgn0HmFSf-ZC_DQ" target="_blank">Here's</a> the same query executed on Mirage.


### Further Reading

appbase-js API methods provide full <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html" target="_blank">Query DSL</a> support and there are lots of use-cases that are unlocked by constructing various types of queries. Feel free to use our <a href="https://opensource.appbase.io/mirage/" target="_blank">GUI query explorer</a> to construct complex queries easily.

There are many more methods provided by the appbase-js API other than the ones we used. Do check out our full <a href="https://docs.appbase.io/javascript/api-reference.html" target="_blank">JavaScript API Reference</a> to dive deeper.
