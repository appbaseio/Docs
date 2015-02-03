# Datamodel

Appbase is a realtime Database as a Service (DBaaS), built on top of a graph schema with JSON based vertices (similar to JSON documents), and edges to link them.

All databases support the storing and fetching of data, what distinguishes one database type from another is the structure of the data they store and the means by which it can be retrieved. 

Several popular databases can be classified as below:

1. [Relational (SQL) Databases](http://en.wikipedia.org/wiki/SQL) SQLite, PostgreSQL  
2. [NoSQL Databases](http://en.wikipedia.org/wiki/NoSQL)  
  a. [Key/Value Store](http://en.wikipedia.org/wiki/NoSQL#Key-value_stores)  Redis, Riak  
  b. [Columnar Store](http://en.wikipedia.org/wiki/Column-oriented_DBMS) Cassandra, HBase  
  c. [Document Store](http://en.wikipedia.org/wiki/NoSQL#Document_store) CouchBase, MongoDB  
  d. [Graph Store](http://en.wikipedia.org/wiki/Graph_database) Neo4j, TitanDB  

## Data in Appbase

Appbase is a [*Directed Graph*](http://en.wikipedia.org/wiki/Directed_graph). Objects inside Appbase are called [Vertices](http://en.wikipedia.org/wiki/Vertex_(graph_theory)) (a graph term for entities), and the links (relationships) between the objects are called [Edges](http://en.wikipedia.org/wiki/Glossary_of_graph_theory#Basics).

Data in Appbase is stored as JSON objects. Appbase supports flexible schema, i.e. the properties of the JSON object need not be defined in advance. 

Although Appbase supports storing embedded JSON objects and arrays, one doesn't have to store data in this denormalized fashion. This is mainly for compatibility with existing document stores like MongoDB. The recommended approach is to create reference links between distint entities. In this doc, we will cover how you can store different kinds data (primitive values, objects, lists), create relationships amongst them, normalize, and do perform different queries on them.

## Concepts

Similar to how SQL has concepts for _table_, _row_, _column_, _relation_ and MongoDB has _collection_ , _Document_ and _fields_, here are the key concepts in Appbase.


1. **Vertex** — is similar to a *Document* in MongoDB, it stores data.  
  - **Key** — A string that is used to access the vertex as an entry point.
  - **Properties** — A JSON object representing the data inside the vertex. 

2. **Namespace** — is similar to a *Collection* in MongoDB or *type* in ElasticSearch. A *vertex* always belongs to a *namespace* and *security rules* can be applied on *namespaces*. 

3. **Edge** — is a directional link to another vertex.  
  - **Priority** — An *edge* can optionally have a priority, a **Number** (a secondary index).
  - **outVertex** — is the vertex which the edge points *to*.
  - **inVertex**  — the vertex *from* which the edge starts.

   i.e. an *edge* is pointed from *inVertex* to an *outVertex*.

4. **Path** — Every *vertex* in Appbase has a path, starting from the &lt;namespace&gt; and ending at the *vertex*, not unlike the UNIX path. A typical path looks like &lt;namespace&gt;/&lt;v1&gt;/&lt;v2&gt;/.../&lt;vn&gt;/.

5. **URL** — It is a way to point to a _Path_ in the REST API. Paths are prefixed with the Appbase API base URL, application's name and the API version. Eg. https://api.appbase.io/chat_app/v2/&lt;path&gt;/.

We can not actually compare these concepts with other kinds of databases, but it helps to understand Appbase if we compare the *usage practices*.

Usage | Appbase | MongoDB | RDBMS
---- | ----- | ----- | -----
Combine similar entities | Namespace | Collection | Table
Data containers | Vertex | Document | Row
The Data | Properties | JSON data inside the object | Columns' values in a Row
Unique identifier of an entity | Vertex Key | ObjectId | Primary Key
Creating *Relations* | Edge | Reference/DBRef | Foreign Key
Traversing through the data *relevant* to an entity | Path | - | Apply *JOINs* with a single *Primary Key* and then a set of linked *Foreign Keys*, to reach the target Row
Attach some useful information about the *Relation*, which can also be used to filter/sort them while fetching| Priority | - | Extra numeric data attached with a *Relation*

With this table in mind, lets understand how the concepts work.

### Vertex

Vertex is the the standard data container in Appbase. A vertex can store a valid JSON object and be linked to other vertices via *edges*.

It can also store nested JSON objects and arrays, but this is only for convenience. In practice, vertices act as singular data entities, i.e. you store only the data relevant to a single entity in the real world. For e.g. a person's age, name, height, sex can be stored in a single vertex, but the data of his belongings, like a book or a car is a completely different entity. This new entity will have properties of its own and they should be stored inside a new vertex. Later in this document, we will see how we can create a relation between these two entities.

### Namespace

Namespaces are a way to combine _similar_ entities. For eg. all vertices storing different users can be stored inside the *user* namespace and all the tweets (repreented as vertices) can be stored inside the *tweet* namespace. Since namespace is a logical container, different kinds of objects can be stored inside a single namespace. This allows searching for *similar vertices* and applying *security rules* with ease.

Namespaces are *searchable*. We are using the open-source [ElasticSearch](http://www.elasticsearch.org/) behind the scenes to support this use-case. See [this documentation](http://docs.appbase.io/docs/search.html) for a quick intro on how search works.

### Edge (one-to-one relationships)

After creating entities, its time to create relations amongst them via *edges*. 

An edge is a *named* directional link connecting two vertices for a purpose, a *one-to-one relation*. For instance, a book has an author, a husband has wife and a child has a mother. The edges for these would be _book vertex_ `--authouredBy->` _person vertex_, _man vertex_ `--marriedTo->` _woman vertex_. 

Edges are directional, so if you set the edge _man_ `--crushOn->` _woman_, it only tells us that the man is married to the woman, but it tells us nothing about woman's relationship status. For that, another edge, _woman_ `--marriedTo->` _man_, should be created.

Appbase only allows for unique edge names. The default behaviour is last-write-wins in case a new edge is created with an existing name. Edges have priorities which are rational numbers (think of the ``Number`` datatype in Javascript).

### Path 

Paths are the way to interact with vertices in Appbase. Paths are constructed with &lt;namespace&gt;/&lt;vertexKey&gt;/&lt;edgeName_1&gt;/.../&lt;edgeName_N&gt;/.

Creating edges create deeper *Paths*. Lets take the example of the movie Inception, the Oscar deserver lead actor Leonardo DiCaprio, and the director Christopher Nolan. Here are the vertices stored in Appbase:

1. The Movie: Inception
	 - Namespace: movie
	 - Vertex Key: inception
2. DiCaprio
	 - Namespace: person
	 - Vertex Key: dicaprio
3. Nolan
	 - Namespace: person
	 - Vertex Key: nolan
4. Nolan's wife
	 - Namespace: person
	 - Vertex Key: emma

These vertices can be accessed with the following paths, as entry points in the graph:

1. `movie/inception`
2. `person/dicaprio`
3. `person/nolan`
4. `person/emma`

Let's create edges:

1. movie/inception `--leadActor->` person/dicaprio
2. movie/inception `--directedBy->` person/nolan
3. person/nolan `--marriedTo->`person/emma

![](http://i.imgur.com/2Asfr9r.png)

With these edge, we created these deeper paths:

1. `movie/inception/leadActor` : points to the same vertex as `person/dicaprio`

2. `movie/inception/directedBy` : points to `person/nolan`

3. `person/nolan/marriedTo`: points to `person/emma`

4. Here's the _magic_, the path `movie/inception/directedBy/marriedTo` points directly to `person/emma`

This means, modifying the data stored at `movie/inception/directedBy/marriedTo` will change the data of `person/emma` as they both are the same vertices.

Paths are powerful ways to point to the exact data you want to interact with. For e.g.  when you access the path `movie/inception/directedBy/marriedTo`, you are only interested in the vertex representing the person who is married to the director of Inception, and nothing else. You never access the data of the movie Inception, or the director.

### URL

A URL is just another representation of a _Path_. REST API URL looks like this: https://api.appbase.io/&lt;app_name&gt;/v2/&lt;path&gt;/. 

Assuming the Application's name as _imdb_, URL for the path _movie/inception/directedBy/marriedTo_ would be `https://api.appbase.io/imdb/v2/movie/inception/directedBy/marriedTo`

---

## Storing Data

Being a Graph, Appbase allows you to create any kind of data structures you want, you just need to know exactly how. Lets see how to store the practical data structures we used on daily basis.

The examples here use Appbase Javascript Library and if any of the method is confusing you, feel free to chekout the [JS Documentation](http://docs.appbase.io/docs/js.html). 

### Primitive Data and JSON Objects

Numbers, Characters, Strings and Booleans, are stored as values of the properties inside a vertex. Dates can be converted into the milliseconds since epoch, and store them as Numbers. For eg. you want to store a the movie's name, and its release year, you can store combine all of them as a JSON object and store it inside a vertex.

```js
var data = {
	name: "Inception",
	year: 2010
}

Appbase.ns('movie').v('inception').setData(data);
```

### Nested JSON Objects

You can store nested objects directly inside a vertex. E.g.
```js
var data = {
	name: "Inception",
	year: 2010,
	directedBy: {
		name: "Christopher Nolan",
		sex: "M"
	}
}

Appbase.ns('movie').v('inception').setData(data);
```
This would work perfectly. Notice that you are not storing the director (Nolan) of Inception as a _different entity_, instead as a _property_ of the movie itself. While this approach is sometimes handy, it limits you in terms of what you can do with Nolan. I.e. you will not be able to establish any direct relationships with Nolan, as it is not an entity in itself. For eg. Nolan is married to Emma, but there is no way to create a link between Nolan  and Emma, when it is stored as a nested object in Appbase.

A better to do this is store Nolan as a new vertex, and create an edge from Inception to Nolan. You can create another vertex for Emma create edges with Nolan. 

We will create three edges here: 

1. inception `--directedBy->` nolan

2. nolan `--marriedTo->` emma
Recall that the edges are _directional_, so this 2nd edge only tells us that Nolan in married to Emma, but says nothing about Emma's marital status. That's why we create the third edge: 

3. emma `--marriedTo->` nolan

![](http://i.imgur.com/IipHJzL.png)

```js
var movieData = {
	name: "Inception",
	year: 2010
}, nolanData = {
	name: "Christopher Nolan",
	sex: "M"
}, emmaData = {
	name: "Emma Thomas",
	sex: "F"
};

var movieRef = Appbase.ns('movie').v('inception');
var nolanRef = Appbase.ns('person').v('nolan');
var emmaRef = Appbase.ns('person').v('emma');

movieRef.setEdge('directedBy', nolanRef);
nolanRef.setEdge('marriedTo', emmaRef);
emmaRef.setEdge('marriedTo', nolanRef);
``` 

Notice that Inception directed by Nolan, is a One-to-One relationship. Nolan has directed many movies, and that's a case of One-to-Many relationships. We see later how to create them in Appbase. 

### Sets (One-to-Many Relationship)

A set makes sure that all the items in the list exist only once. Consider this example, the movies directed by Nolan. We will make only a small list here:  ``["Interstellar", "Inception", "The Dark Night", "Memento"]``. Clearly, it doesn't make sense to have any of the movies twice in the this list.  Notice that this is a One-to-Many relationship here. _Nolan_ (1) -> _Movies_ (N).

Operations on a single set are: addition, checking existence of an item, deletion and traversal. 

Operations on multiple sets, like union and intersection can be emulated using single-set operations. For e.g.

1. intersection can be achieved by traversing through one set and checking existence of those items in the other set
2. union is similar to traversing through one set and adding non-existing items into the second set, the second set becomes the union of two

Let's see a practical set, the movies directed by Nolan. 

#### The Set and the set Items

In Appbase, the Set is a vertex, let's create it.

```js
var setRef = Appbase.ns('set').v('moviesByNolan');
```
Also the Items in the set are vertices.
```js
var inceptionRef = Appbase.ns('movie').v('inception');
inceptionRef.setData({
	name: "Inception",
	year: 2010
});

/* 
Similarly create `interstellarRef`, `theDarkNightRef`, and `mementoRef`.
*/
```

Now we have Appbase Vertex References to the Set and the Items, lets go through different set operations.

#### Addition

Simply creating an edge from the Set to the Item. We will use the Primary Key (`inceptionRef.name()`) of the item as the name of the edge.
```js
setRef.setEdge(inceptionRef.name(), inceptionRef);
```

Here, the important thing is to keep the edge-name exactly as the Vertex Key. That way makes sure that every item will exist only once in the set. For e.g. if you try to add `inceptionRef` again in the set, it will just replace the old edge no extra edges will be created.

Keeping the edge-name same as the Vertex Key of the item, allows other operations as well, like deletion of an Item and checking where an Item exists.

#### Deletion
Remove the edge from Set to the Item.
```
setRef.removeEdge(inceptionRef.name());
```
As we kept the edge name exactly as the Vertex Key, it means that we can use the Vertex Key to delete the edge as well.


#### Existence Check
It's not possible to check via the Item's data, if the item exists or not. The only way we can check, is using the Vertex Key/edge-name. We see that if there's an edge, with its name as the Vertex Key. We use `outVertex()` and `isValid()` for that. I.e. we are checking if the path `set/moviesByNolan/<movieVertexKey>` is valid or not.

```js
setRef.outVertex(inceptionRef.name()).isValid(function(error, validity) {
	if(!error) {
		console.log(inceptionRef.name(), validity);
	} else {
		console.log(error);
	}
});
```

#### Traversal

As all the items are the edges of the Set vertex, we simply fetch the edges of the Set vertex, and traverse through them.

See _Retrieving Data_ section.


## Retrieving Data

In a nutshell, Namspaces in Appbase have vertices, and vertices have properties, edges.

Data retrieval in Appbase happens via _realtime streams_. These streams allows you to fetch existing data, and then keep listening to new data as well.

### Properties
When you start listening to the properties of a vertex, you first get the existing properties, and then as the data keeps changing, the callback is called again with new properties.

Appbase gives you the properties data as a _snapshot_. The snapshots are immutable copies of the data stored in a vertex. Any changes you make in the snapshot will not be stored in Appbase. 

```js
var inceptionRef = Appbase.ns("movie").v("inception")
inceptionRef.on("properties", function(error, vRef, vSnapshot) {
	console.log(vSnapshot.properties());
});
```
If you don't want to listen to the properties any more, you can turn the listener off with `inceptionRef.off()`.

For convenience, we have the method  `inceptionRef.once()` when you want to listen to daat just only once.

### Edges

Retrieving existing edges of a vertex is simple: just listen to _edge_added_ event, which will return existing edges at first. When new edges are added, the callback will be fired for new edges as well.

```js
var moviesRef = Appbase.ns("set").v("moviesByNolan");
moviesRef.on('edge_added', function(error, eRef, eSnap) {
});
```
Notice that the if there are 'N' number of existing edges, the callback will be called 'N' times.

`eRef` here is the Appbase Reference to the outVertex, and `eSnap` is the snapshot of the edge. Edge Snapshot is the snapshot of the data stored with the edge and the out vertex, mainly the _priority_ of the edge, and the properties of the out vertex. `eSnap.priority()` will give you the priority, and `eSnap.properties()` will give you properties.

```js
var moviesRef = Appbase.ns("set").v("moviesByNolan");
moviesRef.on('edge_added', function(error, eRef, eSnap) {
	console.log(eSnap.properties());
});
```

#### Filters

With edge filters, it is possible to fetch only certain edges. It comes handy when there are large number of edges and you want to paginate them, or want to fetch only a particular edge.


When more than one filter is provided, they work as logical `AND` and only the edges matchihg all filters will be fetched. This is what each filter means:

 1. **startAt** `Number` - Edges having priorities equal or more than this
 2. **endAt** `Number` - Edges having priorities equal or less than this
 3. **limit** `Number` - Only this number of edges
 4. **skip** `Number` - Skipping certain number of edges, which match all the other filters
 5. **onlyNew** `Boolean` - return only newly created edges

Notice that:
 - Filters are a way to fetch existing edges, thus they work only with _edge_added_ event
 - Edges are always returned ordered according to their priorities
 - When *endAt* < *startAt*, edges are returned in reverse order
 - You can NOT apply all the numeric filters (first four) to newly created edges, they are only for existing edges and it is NOT possible to apply filters to newly created edges in realtime
	- This means that the numeric filters can not be used with *onlyNew* set to be `true`
	- *Newly created* edges will NOT be fired when any of the numeric filter is applied, i.e. only the existing edges will be returned


```js
var moviesRef = Appbase.ns("set").v("moviesByNolan");
var filters =  {limit: 2};
moviesRef.on('edge_added', filters, function(error, eRef, eSnap) {
	console.log(eSnap.properties());
});
```

### Vertices in a Namespace

Namespaces are vertex containers, and it is possible to retrieve existing vertices, and listen to updates when new vertices are added or old vertices are removed.

```js
var movieNSRef = Appbase.ns("movie");
movieNSRef.on('vertex_added', filters, function(error, vRef, snap) {
	console.log(snap.properties());
});
```

The callback attached with _vertex_added_ event is called for all the existing vertices. As new vertices are added, it is called for them too.

To listen to updates of vertex removal, use _vertex_removed_ event.

```js
var movieNSRef = Appbase.ns("movie");
movieNSRef.on('vertex_removed', filters, function(error, vRef) {
	console.log(vRef.name(), "removed.");
});
```

#### Search

With ElasticSearch's powerful APIs in the backend, Appbase supports full-text fuzzy search queries on the data stored into vertices of a namespace. A sample query on a namespace looks something like this: 

```js
var query = {text: "2010", properties: ["year"]};
Appbase.ns('movie').search(query, function(error, arrayOfVertices) {
  //display vertices
});
```

This query searches on all the vertices of the namespace _movie_, and returns an array of vertices who's property `year`, matches fuzzily with the text "2010". See [this documentation](http://docs.appbase.io/docs/search.html) for more details.
