# Introduction

Before delving into the datamodel, we will start with a brief primer into the different kinds of databases. Databases support the putting and getting of data. What distinguishes one database type from another is the structure of the data they store and the means by which it can be retrieved. There are numerous types of databases.

1. [SQL Databases](http://en.wikipedia.org/wiki/SQL) SQLite, PostgreSQL  
2. [NoSQL Databases](http://en.wikipedia.org/wiki/NoSQL)  
  a. [Key/Value Store](http://en.wikipedia.org/wiki/NoSQL#Key-value_stores)  Redis, Riak  
  b. [Columnar Store](http://en.wikipedia.org/wiki/Column-oriented_DBMS) Cassandra, HBase  
  c. [Document Store](http://en.wikipedia.org/wiki/NoSQL#Document_store) CouchBase, MongoDB  
  d. [Graph Store](http://en.wikipedia.org/wiki/Graph_database) Neo4j, TitanDB  
  
# Appbase Datamodel

Appbase is a database service with a very flexible schema - a document-based graph store.

## Introduction

Data in Appbase has a flexible schema. Unlike SQL databases, where you must determine and declare a table’s schema before inserting data, Appbase’s namespaces do not enforce document structure. This flexibility facilitates the mapping of documents to an entity or an object. Each document can match the data fields of the represented entity, even if the data has substantial variation. In practice, however, the documents in a collection share a similar structure.

## Key Concepts

1. **Namespace** — *Namespace* in Appbase is similar to *Collections* in MongoDB or ElasticSearch. They act as convenient entry points in the graph, i.e. a *vertex* always belongs to a *namespace* and *security rules* can be applied on *namespaces*.
2. **Vertex** — *Vertex* in Appbase is similar to an *Object* in MongoDB.  
  a. **Key** - A string that is used to access the vertex as an entry point.
  b. **Properties** — A JSON object representing the data inside the vertex.  
  v. **OutVertex** — *OutVertex* is an adjacent vertex joined by an edge pointing from the current vertex.
3. **Edge** — An *edge* is a directional link to an OutVertex.  
  a. **Priority** — An *edge* can optionally have a priority, a **Number** datatype. This can be used to sort outvertices.
4. **Path** — Every *vertex* in Appbase has a path, starting from the &lt;namespace> and ending at the *vertex*, not unlike the UNIX path. A typical path looks like &lt;namespace>/&lt;v1>/&lt;v2>/.../&lt;vn>/.
5. **URL** — Every namespace and vertex in Appbase has a URL, which is essentially a path prefixed by the base URL in the format http://api.appbase.io/&lt;appname>/&lt;version>/&lt;path>/.


![Graph](http://i.imgur.com/ajJ3dRB.png)

In the above graphic, circles are *vertices*, with 'A' and 'B' as the *keys*, which belong to 'X' and 'Y' *namespaces* respectively. 'Name' and 'Size' are *properties* of the vertex. Arrows are *edges*, where 'P' points from 'A' to 'B' and 'Q' points from 'B' to 'A'.  

The *paths* to reach vertex 'A' are `X/A` or `Y/B/Q`, and the *paths* to reach vertex 'B' are `Y/B` or `X/A/P`.