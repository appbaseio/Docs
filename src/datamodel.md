#### Purpose
Help people to understand how they can model their data in Appbase.

#### Approach
1. Explain how data is stored in Appbase, compare with different databases
2. Explain how to store lists, and relationships in Appbase. While comparing with different databases
3. A concrete example

# The DOC

This documentation is written step by step, skipping any part of it will make it difficult to understand the latter parts.

Appbase is a Database-as-a-Service (DBaaS). This documentation requires prior understanding of databases. It is assumed that you have dealt with somekind of database earlier and you atleast know how to store/fetch data, and what different kind of relationships mean (One-to-One, One-to-Many, Many-to-Many). If not, [check this out](http://en.wikipedia.org/wiki/Database).

All databases support the storing and fetching of data, what distinguishes one database type from another is the structure of the data they store and the means by which it can be retrieved. 

Several databases we already know:

1. [Relational (SQL) Databases](http://en.wikipedia.org/wiki/SQL) SQLite, PostgreSQL  
2. [NoSQL Databases](http://en.wikipedia.org/wiki/NoSQL)  
  a. [Key/Value Store](http://en.wikipedia.org/wiki/NoSQL#Key-value_stores)  Redis, Riak  
  b. [Columnar Store](http://en.wikipedia.org/wiki/Column-oriented_DBMS) Cassandra, HBase  
  c. [Document Store](http://en.wikipedia.org/wiki/NoSQL#Document_store) CouchBase, MongoDB  
  d. [Graph Store](http://en.wikipedia.org/wiki/Graph_database) Neo4j, TitanDB  

## Data in Appbase

Appbase is a [*Directed Graph*](http://en.wikipedia.org/wiki/Directed_graph),  you will be dealing with *vertices* - *edges* and the learning curve might be steep, but you will be able to do almost *anything* with your data. 

Notice: Appbase is **NOT** a [*property graph*](https://github.com/tinkerpop/blueprints/wiki/Property-Graph-Model). The concepts of *edges* and *edge-names* are different in Appbase. Although they share the same concept of *vertex*.

Data in Appbase is stored as JSON objects. Appbase supports flexible schema, i.e. the properties of the JSON object need not be defined in advance. 

Although Appbase supports storing embedded JSON objects and arrays, we discourage this behavior of denormalization. The data is **NEVER** needed to be denormalized in a Graph. In this document we will see how you can store different kinds data (primitive values, objects, lists), create relationships amongst them, normalize, and do literally anything, as it is a fucking graph.

## Concepts

As SQL as concepts like _table_, _row_, _column_, _relation_ and MongoDB has _collection_ , _object_ etc, here are the key concepts in Appbase.


1. **Vertex** — is similar to a *Document* in MongoDB, it stores data.  
  - **Key** — A string that is used to access the vertex as an entry point.
  - **Properties** — A JSON object representing the data inside the vertex. 

2. **Namespace** — is similar to *Collections* in MongoDB or ElasticSearch. A *vertex* always belongs to a *namespace* and *security rules* can be applied on *namespaces*. 

3. **Edge** — is a directional link to another vertex.  
  - **Priority** — An *edge* can optionally have a priority, a **Number** 
  - **outVertex** — is the vertex which the edge points *to*.
  - **inVertex**  — the vertex *from* which the edge starts.

   I.E. An *edge* is pointed from *inVertex* to an *outVertex*.

4. **Path** — Every *vertex* in Appbase has a path, starting from the &lt;namespace&gt; and ending at the *vertex*, not unlike the UNIX path. A typical path looks like &lt;namespace&gt;/&lt;v1&gt;/&lt;v2&gt;/.../&lt;vn&gt;/.

5. **URL** — It is a way to point to a _Path_ in the REST API. Paths are prefixed with the Appbase API base URL, application's name and the API version. Eg. https://api.appbase.io/chat_app/v2/&lt;path&gt;/.

We can not actually compare these concepts with other kinds of databases, but it helps to understand Appbase if we compare the *usage practices*.

Appbase | MongoDB | RDBMS | Usage
---- | ----- | ----- | -----
Namespace | Collection | Table | Combine similar entities
Vertex | Document | Row | Data containers
Properties | JSON data inside the object | Columns' values in a Row | The Data
Vertex Key | ObjectId | Primary Key | Unique identifier of an entity
Edge | Reference/DBRef | Foreign Key | Creating *Relations*
Path | - | Apply *JOINs* with a single *Primary Key* and then a set of linked *Foreign Keys*, to reach the target Row | Traversing through the data *relevant* to an entity
Priority | - | Extra numeric data attached with a *Relation* | Attach some useful information about the *Relation*, which can also be used to filter/sort them while fetching

With this table in mind, lets understand how the concepts work.

### Vertex

Vertex is the only data container in Appbase, except _priorities_, but that support only numerical values. A vertex can store a standard JSON object. 

It can also store nested JSON objects and arrays, but this is only for convenience. In practice, vertices act as singular data entities, i.e. you store only the data relevant to a single entity in the real world. For e.g. a person's age, name, height, sex can be stored in a single vertex, but the data of his belongings, like a book or a car is a completely different entity. This new entity will have properties of its own and they should be stored inside a new vertex. Later in this document, we will see how we can create a relation between these two entities.

A vertex has a primary key, which allows us to interact with that vertex directly. To see how that's possible, let's first understand the *Namespace*.

### Namespace

Namespaces are a way to combine _similar_ entities. For eg. all vertices storing different users can be stored inside the *user* namespace and all the tweets can be stored inside the *tweet* namespace. As described earlier, namespace need not have a specific schema, and different kinds of objects can be stored inside a single namespace. Combining similar objects is a good practice, it makes it easy to apply *security rules* and *search vertices*.

Namespaces are *searchable*. We are using open source [ElasticSearch](http://www.elasticsearch.org/) in the backend to support this. See [this documentation](http://docs.appbase.io/docs/js.html#namespace-reference-search) for more details. 

Namespace combined with the primary key of the vertex, allows direct interaction with a vertex. For eg. if the primary key of the *user* vertices is the email of the user, we can point to the vertex by the path: *user/sagar@appbase.io*. This would be an *entry point* in the Graph. I.E. you will start exploring the graph from this vertex, and then go through its *edges* - *out vertices*, to interact with more of the graph.

When you want to store objects like *tweets* or *chat-groups*, which will always be stored as *Relations* from a *user* vertex, you shouldn't care about the primary key, as you won't be using them as *entry points*. But you should care about the *uniqueness* of the primary key, as otherwise it will overwrite another vertex. All Appbase client libraries have a convenient method `Appbase.uuid()` for this purpose. 

For convenience, when you don't care about the namespace and the primary key of the vertex, we create vertices for you in the namespace named **misc**, with a UUID as its primary key. This way it is possible to push JSON objects to Appbase without worrying about their namespace or key.

### Edge (One-to-One relationship)

After creating entities, its time to create relations amongst them and *edges* are the way to do it. 

An edge is a directional link connecting two vertices for a purpose, a *One-to-One relation*. Edges have names and generally the relation between the vertices becomes the name of the edge. Eg. a book has an author, a husband has wife and a child has a mother. The edges would be _book vertex_ `--authouredBy->` _person vertex_, _man vertex_ `--marriedTo->` _woman vertex_. 

Edges are directional, so if you set the edge, _man_ `--marriedTo->` _woman_, it only tells us that the man is married to the woman, but tells nothing about woman's relationship status. For that, another edge, _woman_ `--marriedTo->` _man_, should be created. 

Unlike *labels* in property graph, unique edges in Appbase have unique names and creating more edges with the same name would simply create only a single edge, overwriting previously created edges.  Using *labels* in property graph is a great way to create One-to-Many relations, but labels  
are **NOT** a necessity for such relations. We see later how to create One-to-Many relationships in Appbase.

Edges have priorities, which are natural numbers, an extra data attached with each edge. This allows sorting and filtering of edges while fetching them. We see later in the documentation how this works.

### Path 

Paths are the way to interact with vertices in Appbase. Paths are constructed with &lt;namespace&gt;/&lt;vertexKey&gt;/&lt;edgeName_1&gt;/.../&lt;edgeName_N&gt;/.

Creating edges create deeper *Paths*. Lets take the example of the movie Inception, the Oscar deserver lead actor Leonardo DiCaprio, and the director Christopher Nolan. Here are the vertices stored in Appbase:

1. The Movie: Inception
	 - Namespace: movie
	 - Vertex Key: inception_2010
2. DiCaprio
	 - Namespace: person
	 - Vertex Key: leonardo_dicaprio
3. Nolan
	 - Namespace: person
	 - Vertex Key: christopher_nolan
4. Nolan's wife
	 - Namespace: person
	 - Vertex Key: emma_thomas

These vertices can be accessed with the following paths, as entry points in the graph:

1. `movie/inception_2010`
2. `person/leonardo_dicaprio`
3. `person/christopher_nolan`
4. `person/emma_thomas`

Let's create edges:

1. movie/inception_2010 `--leadActor->` person/leonardo_dicaprio
2. movie/inception_2010 `--directedBy->` person/christopher_nolan
3. person/christopher_nolan `--marriedTo->`person/emma_thomas

With these edge, we created these deeper paths:

1. `movie/inception_2010/leadActor` : points to the same vertex as `person/leonardo_dicaprio`

2. `movie/inception_2010/directedBy` : points to `person/christopher_nolan`

3. `person/christopher_nolan/marriedTo`: points to `person/emma_thomas`

4. Here's the _magic_, the path `movie/inception_2010/directedBy/marriedTo` points directly to `person/emma_thomas`

This means, modifying the data stored at `movie/inception_2010/directedBy/marriedTo` will change the data of `person/emma_thomas` as they both are the same vertices.

Paths are powerful ways to point to the exact data you want to interact with. For e.g.  when you access the path `movie/inception_2010/directedBy/marriedTo`, you are only interested in the vertex representing the person who is married to the director of Inception, and nothing else. You never access the data of the movie Inception, or the director.

TODO: An image of these vertices

### URL

A URL is just another representation of a _Path_. REST API URL looks like this: https://api.appbase.io/&lt;app_name&gt;/v2/&lt;path&gt;/. 

Assuming the Application's name as _imdb_, URL for the path _movie/inception_2010/directedBy/marriedTo_ would be `https://api.appbase.io/imdb/v2/movie/inception_2010/directedBy/marriedTo`

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

Appbase.ns('movie').v('inception_2010').setData(data);
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

Appbase.ns('movie').v('inception_2010').setData(data);
```
This would work perfectly. Notice that you are not storing the director (Nolan) of Inception as a _different entity_, instead as a _property_ of the movie itself. While this approach is sometimes handy, it limits you in terms of what you can do with Nolan. I.e. you will not be able to establish any direct relationships with Nolan, as it is not an entity in itself. For eg. Nolan is married to Emma, but there is no way to create a link between Nolan  and Emma, when it is stored as a nested object in Appbase.

A better to do this is store Nolan as a new vertex, and create an edge from Inception to Nolan. You can create another vertex for Emma create edges with Nolan. 

We will create three edges here: 

1. inception `--directedBy->` nolan

2. nolan `--marriedTo->` emma
Recall that the edges are _directional_, so this 2nd edge only tells us that Nolan in married to Emma, but says nothing about Emma's marital status. That's why we create the third edge: 

3. emma `--marriedTo->` nolan

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

### Sets

A set makes sure that all the items in the list exist only once. Consider this example, the movies directed by Nolan. We will make only a small list here:  ``["Interstellar", "Inception", "The Dark Night", "Memento"]``. Clearly, it doesn't make sense to have any of the movies twice in the this list. 

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
var inceptionRef = Appbase.ns("movie").v("inception_2010")
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
Notice that the if there are 'N' number of existing edges, the callback will be called 'N' times, each time with a new edge.

`eRef` here is the Appbase Reference to the outVertex, and `eSnap` is the snapshot of the edge. Edge Snapshot is the snapshot of the data stored with the edge, mainly the _priority_ of the edge. `eSnap.priority()` will give you the priority. It does NOT give you the _properties_ of the outVertex. To fetch the properties of the out vertex, you should listen for _properties_ event on `eRef`.

```js
var moviesRef = Appbase.ns("set").v("moviesByNolan");
moviesRef.on('edge_added', function(error, eRef, eSnap) {
	eRef.once('properties', function(error, ref, vSnapshot) {
		console.log(vSnapshot.properties());
	})
});
```
