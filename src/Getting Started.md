# Steps to getting started with Appbase

## Step 0: Get Appbase
Log in to <span class="fa fa-external-link"></span> [Appbase Dashboard](http://appbase.io/developer/), and create a new app.

## Step 1: Add the Appbase JS Library

Add Appbase library to your codebase and set the app credentials as they appear here.

```html
<script src="https://cdn.appbase.io/latest/appbase.js"></script>
```

```js
Appbase.credentials("aphrodite", "4d8d0072580912343cd74a09015cd217");
```

> Note: You will want to change the parameters of the ``Appbase.credentials()`` method to your own app name, app secret combination, as seen in the [Dashboard](http://appbase.io/developer).

## Step 2: Creating Vertices

Now let's create two Appbase vertices under two different namespaces "user" and "tweets".

```js
var userRef = Appbase.ns("user").v("andy");
var tweetRef = Appbase.ns("tweet").v(Appbase.uuid());
```

Namespaces are containers that do not hold actual data, but help with data logic separation. A "vertex" can only be created using a ns reference object.

> As seen here, vertex takes a "String" as an identifier. ``Appbase.uuid()`` is a handy way for creating a unique String id.

## Step 3: Storing some Data

A vertex can store data as a JSON object using the ``setData()`` method.

```js
userRef.setData({
    status: "sudo",
    location: "Belo Horizonte, Brazil"
});
tweetRef.setData({
    message: "Remember Red, hope is a good thing."
});
```

## Step 4: Creating a simple data model

Vertices can be connected via edges. Now let's add the ``tweetRef`` as an edge to the ``userRef`` vertex.

```js
userRef.setEdge('tweeted', tweetRef);
```
Now, the tweetRef vertex can also be accessed using the path /user/andy/tweeted. To retrieve a vertex reference at a given path, ``ns.v(path)`` is a handy method.

## Step 5: Go real-time! 

Appbase supports retrieval of objects using realtime streams. We will now add listeners so that everytime a user vertex's property changes we are notified. Similarly we will add a listener for edge additions on the user vertex.

```js
userRef.on('properties', function(error, ref, userSnap) {
    console.log(userSnap.properties().status);
    console.log(userSnap.properties().location);
});
userRef.on('edge_added', function(error, outVertexRef, eSnap) {
    outVertexRef.on('properties', function(error, ref, tweetSnap) {
        console.log(tweetSnap.properties().message);
    });
});
```

## Step 6: Smart search

Appbase supports a full-text smart search, and you can enable it in two simple steps.

Enable the search by toggling the <i class="fa fa-eye-slash"></i> switch in your app's preferred namespace. If search is enabled, you should see this icon <i class="fa fa-eye"></i> next to the namespace.
Second and final step, use this code snippet on the enabled namespace and have a full-text search widget.

```js
Appbase.ns('tweet').search({text:'hello', properties: ['message']}, function(err, array) {
    console.log(array);
})
```

## Further

If you are using Appbase from a Javascript client, you might want to use user authentications over secret. Checkout [here](/docs/authentications.html) for more.

As a next step, you should checkout the [Javascript API reference](/docs/js.html) for an in-depth usage guide.
