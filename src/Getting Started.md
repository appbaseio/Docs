# Steps to getting started with Appbase

## Get Appbase
Login into [Appbase Developer Console](http://appbase.io/developer/), and create a new app.

## Add the Appbase JS Library

Add Appbase library to your codebase and set the app credentials as they appear here.

```html
<script src="https://cdn.appbase.io/2.0/appbase.js"></script>
```

```js
Appbase.credentials("aphrodite", "4d8d0072580912343cd74aa0015cd217");
```
## Appbase references

Now let's create two Appbase references under namespaces "user" and "tweets".

```js
var userRef = Appbase.ns("user").v("andy");
var tweetRef = Appbase.ns("tweet").v(Appbase.uuid());
```

As seen here, one can optionally specify the reference name.

## Working with Data

```js
userRef.setData({
    status: "sudo",
    location: "Belo Horizonte, Brazil"
});
tweetRef.setData({
    message: "Remember Red, hope is a good thing."
});
```

Now let's add the tweet as an edge to our user reference.

```js
userRef.setEdge(tweetRef, 'tweeted');
```
## Go real-time! 

Listen to the changes on the user reference data properties and edges, to see the changes we have made so far.

```js
userRef.on('properties', function(error, ref, userSnap) {
    console.log(userSnap.properties().status);
    console.log(userSnap.properties().location);
});
userRef.on('edge_added', function(error, edgeRef, eSnap) {
    edgeRef.on('properties', function(error, ref, tweetSnap) {
        console.log(tweetSnap.properties().message);
    });
});
```

## Full-text search

```js
Appbase.ns('tweet').search({text:'hello', properties: ['message']},function(err, array) {
    console.log(array);
})
```

## User Authentication

Checkout [here](/docs/auth_basics.md).