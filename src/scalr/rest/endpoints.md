{"threeColumns": false}

# Supported API Endpoints

Here is a list of all the supported endpoints for the Elasticsearch service offered by appbase.io.

## Index APIs

An app in appbase.io is an index in Elasticsearch.

- [**Get an App** `GET /:app`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-get-index.html)  
Informational endpoint

- [**Get an App's Settings** `GET /:app/_settings`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-get-settings.html)  
Get settings in an app

- [**Analyze a text** `GET /:app/_analyze`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-analyze.html#indices-analyze)   
Run a specific analyzer against a text

- [**Get an App's Mapping** `GET /:app/_mapping`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-get-mapping.html)  
Get mappings for an app

- [**Get a particular type's Mapping** `GET /:app/_mapping/:type`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-get-mapping.html)  

- [**Add mapping for a new type** `PUT /:app/_mapping/type`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-put-mapping.html)  

- [**Close an App** `POST /:app/_close`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-open-close.html)

- [**Open an App** `POST /:app/_open`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-open-close.html)

- [**Get recovery information for an App** `GET /:app/_recovery`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-recovery.html)

- [**Get an App's stats** `GET /:app/_stats`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/indices-stats.html)

## Document APIs

- [**Indexing a Document** `PUT /:app/:type/:id`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-index_.html#docs-index_)   
with an id.

- [**Indexing a Document** `POST /:app/:type/`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-index_.html#_automatic_id_generation)  
without an id.

- [**Getting a Document** `GET /:app/:type/:id`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-get.html)

- [**Getting a Document Source** `GET /:app/:type/:id/_source`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-get.html#_source)

- [**Deleting a Document** `DELETE /:app/:type/:id`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-delete.html)

- [**Updating a Document** `PUT /:app/:type/:id/_update`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-update.html)

- [**Updating a Document By Query** `POST /:app/:type/_update_by_query`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-update-by-query.html)

- [**Getting Multiple Documents** `GET /:app/_mget`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-multi-get.html#docs-multi-get)  
get documents across one or more types, specified in the request body.

- [**Getting Multiple Documents** `GET /:app/:type/_mget`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-multi-get.html#docs-multi-get)  
get documents on a specific type.

- [**Bulk Document API** `POST /:app/_bulk`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-bulk.html)  
bulk operations across one or more types, specified in the request body.

- [**Bulk Document API** `POST /:app/:type/_bulk`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-bulk.html)  
bulk operations on a specific type.

- [**Getting a Document's Term Vectors** `GET /:app/:type/:id/_termvector`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/docs-termvectors.html)

## Search APIs

- [**Search with query strings** `GET /:app/:type/_search?q=*:*`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/search-search.html#search-search)  

- [**Search with a request body** `POST /:app/:type/_search`](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/search-request-body.html)  
Everything in the [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl.html) is supported for the **query** object in the request body.

    Popular Queries:

    1. [Full-text search](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/full-text-queries.html)  

    2. [Term Queries](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/term-level-queries.html)  

    3. [Compound Queries](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/compound-queries.html)  

    4. [Geo Queries](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/geo-queries.html)  

    5. [Query Joins](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/joining-queries.html)  

    6. [Span Queries](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/span-queries.html)  

- [**Delete by query** `DELETE /:app/:type/_query`](https://www.elastic.co/guide/en/elasticsearch/plugins/2.4/delete-by-query-usage.html)  
Delete documents matching the search query, everything in the [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl.html) is supported for the **query** object in the request body.

## Streaming APIs

- **Stream a Document** `GET /:app/:type/:id?stream=true`  
Fetches the document and streams further updates to the document.

- **Stream a Query** `GET /:app/:type/_search?stream=true` (or POST)  
Fetches a query's response and streams further updates to the query.
