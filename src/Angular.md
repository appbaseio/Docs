# ng-Appbase Guide

Appbase provides a realtime graph backend, is designed to write complex applications completely clientside. Appbase fits perfectly as a backend in your AngularJS application.

ngAppbase - AngularJS binding for Appbase, makes it very simple to bind your data between AngularJS and Appbase backend.

[Here](http://appbase.io/tutorial.html)'s a quick tutorial for Appbase JS api.

## Integrating the awesome
Add these script tags in your HTML:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.js"></script>
<script src="https://cdn.appbase.io/2.0/appbase.min.js"></script>
<script src="https://cdn.appbase.io/2.0/ng-appbase.js"></script>
```
Register `ngAppbase` as a dependency in the module, and the `$appbase` is available to be injected into any controller, service, or factory.
```js
var app = angular.module("myApp", ["ngAppbase"]);
app.controller("myCtrl", function($scope, $appbase) {
   ...
});
```

`$appbase`, has the same methods as `Appbase` object exposed by the Appbase Javascript library. The difference is, when Appbase refrences (namespace and vertex) are created using `$appbase`, they have extra methods which allows binding your data with scope variables in Angular.

## Binding Objects
As Angular binds the data between JS models and the DOM, ngAppbase propagates any changes the data from Appbase. This way, any changes to Appbase automatically appears in the DOM.
Notice that, the changes in the JS model are *__not__* automatically sent to Appbase backend.

`bindProperties` creates such a synchronized object, by binding properties of a vertex in Appbase, to a variable in JS.

### Example:
Assume the properties of the vertex at __'user/bella'__ : 
```json
{
	"name": "Isabella",
	"having": "Cashasa"
}
```
To bind this data to your view,
JS:
```js
app.controller("myCtrl", function($scope, $appbase) {
	//binds data at 'user/bella' with the scope variable 'user'
	$scope.user = $appbase.ns('user').v('bella').bindProperties($scope);
});
```
HTML:
```html
<div ng-controller="myCtrl">
<p> {{user.name}} is having {{user.having}} <p>
</div>
```

As Appbase notifies for data changes in realtime, if the data at __'user/bella'__ changes, i.e. if `$appbase.ns('user').v('bella').setData({having: 'Cerveja'})` is called, this change will be reflected in the scope variable instantly, and Angular will update the view.

## Binding Arrays
`ng-repeat` in AngularJS binds a list in DOM to an array model in JS, and this array can be bound to the _edges_ of a __vertex__, or _vertices_ in a __namespace__ in Appbase, using `bindEdges` and `bindVertices`.

When edges or vertices are added, removed, replaced, or the priority is changed, these changes appear in the DOM in realtime.

### Example
Data in the out vertex pointed by the edge:
```json
{
	message: 'Hello Pizza!'
}
```

To bind this data into you view:
JS:
```js
app.controller("myCtrl", function($scope, $appbase) {
	//binds edges of 'user/bella/tweets' with the scope variable 'tweets'
	$scope.tweets = $appbase.ns('user').v('bella/tweets').bindEdges($scope);
});
```

HTML:
```html
<div ng-controller="myCtrl">
	<ul>
		<li ng-repeat="tweet in tweets">{{tweet.properties.message}}</li>
	</ul>
</div>
```

The same way, you can bind vertices under a namespace, as an array.

JS:
```js
app.controller("myCtrl", function($scope, $appbase) {
	//binds vertices of 'tweet' with the scope variable 'tweets'
	$scope.tweets = $appbase.ns('tweet').bindVertices($scope);
});
```

## Modifying data

Vertex References created with `$appbase.ns().v()` has all the methods exactly as the Appbase Javascript API. You can use methods `setData()` and `setEdge()` to modify the data.

```js
$appbase.ns('user').v('bella').setData({having: 'Cerveja'});
```

The  documentation for Appbase JS api is [here](http://docs.appbase.io/docs/js.html).

## Next Steps

Checkout additional documentation for `bindEdges()`, `bindVertices()` and `bindProperties()` further down on this page.

Checkout this opensource [Twitter clone](http://twitter.appbase.io/) we built using this Angular binding in under ~250 lines of javascript code.

Have a great time building awesome realtime applications!


# $appbase API Docs

## vertexRef.bindEdges()
```js
{
	hello: "hello"
}
scope.varName = vRef.bindEdges(scope, {
	onAdd: function(scope, edgeData, edgeRef, done) {
	},
    onComplete: function(scope, vRef) {
	},
	onRemove: function(scope, edgeData, edgeRef, done) {
	},
	onUnbind: function(scope, edgeData, edgeRef) {
	},
    onChange: function(scope, edgeData, edgeRef, done) {
	}
})
```
### Returns
An __array__ of edges, _sorted_ by the __priority__ of edges.
Each object (called _edgeData_ from now on) in array represents an edge and contains this data:
```json
{
	fsk: "hello",
    name: (string) edge's name
    priority: (Number) number edge's priority
    properties: (object) properties of the out-vertex
}
```

### Arguments
- __scope__ : The angular scope where bindEdges() is called.
- __onAdd__ _(function)_: called when an edge is added. This function basically gives the programmer a facility to modify what should be available in `edgeData`. You can add more data into it, which will be automatically added in to the array, which bound to a scope variable, you don't need to manually add any data to the scope.  The `edgeRef` passed in the callback helps fetching more data relevant to the edge. `done()` should be called when the required data is added in `edgeData`, only after that the `edgeData` will added in the array.
- __onComplete__ _(function)_: called when existing edges are fired. Works exactly as `onComplete` callback for _edge_added_ event in Appbase Javascript Library.
- __onRemove__ _(function)_: called when an edge is removed. To remove the `edgeData` from the array, calling `done()` is necessary.
- __onChange__ _(function)_: called when the properties of the vertex are changed. To reflect the changes in the scope, calling `done()` is necessary.
- __onUnbind__ _(function)_: called when the scope variable is unbound from edges. You should turn off the listeners here, if added any in the `onAdd` callback.

Note that the vertex references returned in the callback, also have the methods `bindProperties` and `bindEdges`. Using `onAdd` callback and these methods, you can bind multiple level of edges.

Eg.
```js
app.controller("myCtrl", function($scope, $appbase) {
	//binds edges of 'user/bella/tweets' with the scope variable 'tweets'
	$scope.tweets = $appbase.ns('user').v('bella/tweets').bindEdges($scope, {
      onAdd: function(scope, vObj, vRef, done) {
        vObj.edges = vRef.bindEdges(scope);
        //now every object in the array has a field called `edges`, which contains the second level edges.
        done();
      },
      onRemove: function(scope, vObj, vRef, done) {
        vRef.unbind();
        done();
      },
      onUnbind: function(scope, vObj, vRef) {
        vRef.unbind();
      }
    });
});
```

## bindVertices()

`bindVertices` works exactly as `bindEdges`, except that it is invoked on a namespace reference and returns an array of all the vertices in the namespace. Callbacks _onAdd_, _onRemove_ and _onChange_ are called, respectively, when a vertex is added, destroyed and properties are changed. _onComplete_ is called when existing vertices are retrieved. Works exactly as `onComplete` callback for *vertex_added* event in Appbase Javascript Library.

```js
scope.varName = nsRef.bindEdges(scope, {
	onAdd: function(scope, vData, vRef, done) {
	},
    onComplete: function(scope, nsRef) {
	},
	onRemove: function(scope, vData, vRef, done) {
	},
	onUnbind: function(scope, vData, vRef) {
	},
    onChange: function(scope, vData, vRef, done) {
	}
})
```

## bindProperties()
```js
scope.varName = vRef.bindProperties(scope, {
	onProperties: function(scope, properties, ref, done) {
	},
	onUnbind: function(scope, properties, ref) {
	}
})
```
### Returns
An __object__ , containing _properties_ of the vertex as key-value pairs.

### Arguments
- __scope__ : The angular scope where bindEdges() is called.
- __onProperties__ _(function)_: called when the properties are received/updated from server 
- __onUnbind__ _(function)_: called when the scope variable is unbound. You should turn off the listeners here, if added any in the `onProperties` callback.
