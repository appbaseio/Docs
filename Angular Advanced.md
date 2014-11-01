## $appbase API Docs

### vertexRef.bindEdges()
```js
scope.varName = vRef.bindEdges(scope, {
	onAdd: function(scope, edgeData, edgeRef, done) {
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
    name: (string) edge's name
    priority: (number) edge's priority
    properties: (object) properties of the out-vertex
}
```

### Arguments
- __scope__ : The angular scope where bindEdges() is called.
- __onAdd__ _(function)_: called when an edge is added. This function basically gives the programmer a facility to modify what should be available in `edgeData`. You can add more data into it, which will be automatically added in to the array, which bound to a scope variable, you don't need to manually add any data to the scope.  The `edgeRef` passed in the callback helps fetching more data relevant to the edge. `done()` should be called when the required data is added in `edgeData`, only after that the `edgeData` will added in the array.
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

### bindVertices()

`bindVertices` works exactly as `bindEdges`, except that it is invoked on a namespace reference and returns an array of all the vertices in the namespace. Callbacks _onAdd_, _onRemove_ and _onChange_ are called, respectively, when a vertex is added, destroyed and properties are changed.

```js
scope.varName = nsRef.bindEdges(scope, {
	onAdd: function(scope, vData, vRef, done) {
	},
	onRemove: function(scope, vData, vRef, done) {
	},
	onUnbind: function(scope, vData, vRef) {
	},
    onChange: function(scope, vData, vRef, done) {
	}
})
```

### bindProperties()
```js
scope.varName = vRef.bindProperties(scope, {
	onProperties: function(properties, ref, done) {
	},
	onUnbind: function(properties, ref) {
	}
})
```
### Returns
An __object__ , containing _properties_ of the vertex as key-value pairs.

### Arguments
- __scope__ : The angular scope where bindEdges() is called.
- __onProperties__ _(function)_: called when the properties are received/updated from server 
- __onUnbind__ _(function)_: called when the scope variable is unbound. You should turn off the listeners here, if added any in the `onProperties` callback.