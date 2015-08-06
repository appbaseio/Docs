# Major changes

### 1. JSON Document based Model

With v3.0, Appbase adopts the JSON based document schema model (similar to MongoDB and ElasticSearch). We are bringing the simplicity of JSON based data models to Appbase with this major revision while still maintaining index-free adjency references for each document.

Here's how the mapping works if you are familiar with the v2.0 API:

v3.0 | v2.0 | Usage
---- | ---- | -----
Collection | Namespace | Grouping of similar data containers
Document | Vertex | Data containers which can contain any JSON data
Reference | Edge | Path to another data container


### 2. REST API Format

The overall API format has been made more expressive.


* Fetching documents and references are now completely supported by ``GET`` requests. There are additional filters supported by URL parameters like **streaming queries**, **pagination**, and **timestamp** based retrieval.
* ``PATCH`` is used for creating and updating resources.
* ``POST`` is used for all ElasticSearch queries.
