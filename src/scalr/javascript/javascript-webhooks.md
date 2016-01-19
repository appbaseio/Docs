{"threeColumns": false, "bigh3": true}

> Introduced in [appbase-js](https://github.com/appbaseio/appbase-js) ``v0.10.0``. Read the [getting started guide](http://docs.appbase.io/scalr/javascript/javascript-intro.html) for some familiarity with the JS lib.

# Intro to Webhooks

Webhooks (aka streaming to a URL) allows you to set up declarative integrations which respond to events in appbase.io. When one of those events is triggered (a new document being inserted, a document's field changing it's value, a search query condition matching on document inserts), we'll send a HTTP POST payload to the webhooks configured URL. Webhooks can be used to send transaction emails, post on a slack channel when a new user signs up, update the pricing plan when the data storage crosses a threshold.

Webhooks in appbase.io are designed for configurability.

1. Supports [mustache syntax](http://mustache.github.io/mustache.5.html) in the body payload where the body can be a JSON or a raw string,
2. Supports ``interval`` to send a webhook request only after a certain time interval (controls for noise),
3. Supports ``count`` to send a fixed number of webhook requests before de-registering the URL.

Together, these three features allow for a very versatile webhooks streaming. In this doc, we will look at composing webhook queries and a number of different usage scenarios for webhooks.


# Composing Webhooks Queries

Since registering a webhook is a method of the ``Appbase`` object, we will start by instantiating an Appbase object.

```js
var appbaseRef = new Appbase({
  url: 'https://RIvfxo1u1:dee8ee52-8b75-4b5b-be4f-9df3c364f59f@scalr.api.appbase.io',
  appname: 'createnewtestapp01'
 })
 ```
 
 Webhooks in appbase-js are supported by [``searchStreamToURL()``](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-streaming-data-searchstreamtourl). The behavior is very similar to  [``searchStream()``](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-streaming-data-searchstream), where the results are subscribed back on new data matching the query. Instead of subscribing the results back to the user, they are instead subscribed by a URL.
 
 ```js
 appbaseRef.searchStreamToURL(
 {
    type: 'tweet',
    body: {
      query: {
        match_all: {}
      }
    }
 }, {
    url: "http://requestb.in/v0mz3hv0?inspect",
    interval: 60
 }).on('data', function(res) {
     console.log("webhook successfully registered: ", res);
 }
 ```
 
Here, we set the webhook request to be sent every time there is a document insert in the ``type`` tweet. To control for the noise, we set the ``interval`` to 60s.
 

# Usage Scenarios

### 1. Top 10 daily recommendations

### 2. Pricing plan change and notification

### 3. Bitcoin price alert

