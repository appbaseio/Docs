---
title: 'Pre-Built Stages Reference | ReactiveSearch Pipelines'
meta_title: 'ReactiveSearch Pre-Built Stages API Reference'
meta_description: 'ReactiveSearch Pre-Built Stages API Reference. Learn about all the properties of ReactiveSearch Pipelines pre-built stages API'
keywords:
    - concepts
    - pipelines
    - pre-built
    - stages
    - reactivesearch
sidebar: 'docs'
---

This guide explains all the pre-built stages supported in pipelines.


# Answer AI

This stage will generate answers based on the top results from the request query and return them

## Inputs

### API Key

Type: string

(mandatory) OpenAI API key to access the API

### Doc Template

Type: string

(optional) Template for building the context message for each hit. Supports special character 'source' that refers to the document '_source' field. Eg: '${source.text} is ${source.summary} with url as ${source.url}'

### Maximum Tokens

Type: integer

(optional) Maximum number of tokens to pass to ChatGPT. Read more about it here: https://platform.openai.com/docs/api-reference/chat/create#chat/create-max_tokens

### Model

Type: string

Model to use for getting the vector embeddings. Options can be found at https://platform.openai.com/docs/models. Defaults to 'gpt-3.5-turbo'

### Query ID

Type: string

(optional) ID of the query where hits are going to be extracted from. This should be rarely needed, as it is picked from the ReactiveSearch query body to a 'search' type of query, with a fallback to a 'suggestion' type of query.

### Query Template

Type: string

(optional) Template for the query that is passed to ChatGPT as the question. Supports special character 'value' that refers to the 'value' field passed in the query object, e.g. Answer the query: '${value}'. Think step-by-step, cite the source after the answer and ensure the source is from the provided context.

### System Prompt

Type: string

(optional) First message that will be sent to ChatGPT from the system. Defaults to: You are a helpful assistant

### Temperature

Type: number

(optional) Temperature to pass to ChatGPT. Defaults to 1. Read more about it here: https://platform.openai.com/docs/api-reference/chat/create#chat/create-temperature

### Top Docs For Context

Type: integer

Number of documents from the top hits to pass to ChatGPT as context for the query. This value is capped to the minimum value of size (hits fetched in a request) and 100. Defaults to 3

# Add Filter

Add Filter action allows you to define the term filters that will get applied on the search type of queries. For example, if somebody searches for iphone then you may want to apply a brand filter with value as apple.

## Inputs

### Data

**This is a required field**

Type: object

To add a custom filter to the query, for e.g, '{ 'authors.keyword': 'Simone Elkeles' }' would filters books by author.

# Authorization

Authorize users with Appbase permissions.

## Inputs

No inputs are required

# Boost

Boost stage is useful to boost search results by a specific field’s value, for example, show items with 'holiday-sale' and 'premium' values for 'tag' field above other items.

## Inputs

### Boost Factor

Type: integer

Boost factor to be used by boost operation, for e.g, boost_factor as 2 & boostType as 'multiply' would multiply the score by 2 and re-ranks the results.

### Boost Max Docs

Type: integer

Maximum number of documents to boost.

### Boost Operation

Type: string

Boost operation, for e.g 'add' or 'multiply'.

### Boost Size Threshold

Type: integer

Maximum 'from' + 'size' value till the boost stage will get applied

### Boost Type

Type: string

To define the type of boost stage. Defaults to 'score'.

### Data Field

Type: string

Field name to match value to find documents to rank.

### Query Format

Type: string

Query operator for boost query, can have values as 'or' and 'and'. Defaults to 'or'.

### Value

Type: array

To define the matching values to boost results, for e.g show items with '['holiday-sale', 'premium values']' for 'tag' data field above other items.

# Apply Custom Data

Helps in sending the custom JSON data in the search response. This will be helpful when you want to send some extra information to the frontend, which can help in rendering more specific information.

## Inputs

### Data

**This is a required field**

Type: undefined

Custom data to be returned in response, for e.g, { facets: { color: 'red', brand: 'Apple' }}.

# Elasticsearch

To perform a request to Elasticsearch Backend.

Elasticsearch stage supports async execution. In case of asynchronous execution, you're expected to write a merge script to consume the response from elasticsearch.
The elasticsearch response would be present in global script context with stage Id (defaults to elasticsearchQuery) as key.

## Inputs

### Body

Type: string

Request body in string format, e.g, {"query":{"match_all":{}}}.

### Request Headers

Type: object

Request headers, for e.g, '{ Content-Type: 'application/json' }'

### Independent Body

Type: string

Array of independent requests, i:e ones that contain the endpoint in the query.

### Request Method

Type: string

Http request method, for e.g, 'POST'. The default value is the pipeline request method.

### Query params

Type: object

Request query params, for e.g, '{ format: 'JSON' }'

### Parse Response to ReactiveSearch API

Type: boolean

If set to 'true', then it would transform the Elasticsearch response to RS API response. Defaults to 'true', if route category is 'reactivesearch'.

### Path

Type: string

URL path, for e.g '/_search'.

### Request URL

Type: string

Elasticsearch URL, for e.g, 'https://@appbase-demo-ansible-abxiydt-arc.searchbase.io'. The URL can have path and query params too, for instance, 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io/_cat/indices?format=JSON'.

# Hide Results

It helps in hiding certain results from getting included in the actual search results. For example, you want to hide products that not available in the store, or you want to hide results that contain irrelevant data.

## Inputs

### Data

**This is a required field**

Type: array

An array of document ids to hide from results. For e.g, '['id_1', 'id_2']'

# HTTP Request

This stage is useful to perform HTTP requests.

## Inputs

### Body

Type: string

Request body in string format, e.g, {"query":{"match_all":{}}}.

### Request Headers

Type: object

Request headers, for e.g, '{ Content-Type: 'application/json' }'

### Request Method

Type: string

Http request method, for e.g, 'POST'. The default value is the pipeline request method.

### Query params

Type: object

Request query params, for e.g, '{ format: 'JSON' }'

### Request URL

**This is a required field**

Type: string

Request URL, for e.g, 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io/good-books-ds/_search'.

# kNN Response

k Nearest Neighbor (kNN) modifies the ElasticSearch Query with a script_score condition to re-rank the top n results.

## Inputs

### Search Backend

Type: string

Search backend, defaults to 'elasticsearch'.

### undefined

Type: object

undefined

# MongoDB

To perform a request to MongoDB.

MongoDB stage supports async execution. In case of asynchronous execution, you're expected to write a merge script to consume the response from mongoDB.
The mongoDB response would be present in global script context with stage Id (defaults to mongoDBQuery) as key.

## Inputs

### Request Body

Type: array

MongoDB custom aggregations query, for e.g, [ { '$facet': { 'hits': [ { '$limit': 10 } ], 'total': [ { '$count': 'count' } ] } } ]

### Collection

**This is a required field**

Type: string

Collection name, e.g. 'listingsAndReviews'

### Connection Options

Type: string

Connection options, e.g 'maxPoolSize=20&w=majority'

### Credentials

**This is a required field**

Type: string

Auth credentials. For example, 'user@pass'.

### Database Name

**This is a required field**

Type: string

Database name, e.g. 'sample_airbnb'

### Host

**This is a required field**

Type: string

Host name and port of instance(s). For example, 'sample.host:27017'.

### Protocol

Type: string

Protocol. For example, 'mongodb+srv'.

# Open AI Embeddings

Get vector embeddings from OpenAI based on the passed text value

## Inputs

### API Key

Type: string

OpenAI API key to be able to access the API

### Model

Type: string

Model to use for getting the vector embeddings. Options can be found at https://platform.openai.com/docs/models. Defaults to 'text-embedding-ada-002'

### Text

Type: string

Text to get the vector for. Eg: 'test string'

### Use With ReactiveSearch Query

Type: boolean

When set as true, the output vector will be populated into the ReactiveSearch query where vectorDataField key is present. Defaults to 'false'

# Open AI Embeddings Index

This stage will generate the vector embedding of the inputKeys passed and inject the output to the request body

## Inputs

### API Key

Type: string

OpenAI API key to be able to access the API

### Input Keys

Type: array

Keys from the request body that should be used for getting the embedding.

### Model

Type: string

Model to use for getting the vector embeddings. Options can be found at https://platform.openai.com/docs/models. Defaults to 'text-embedding-ada-002'

### Output Key

Type: string

Key to write the vector data to in the request body

# Promote Results

Helps in promoting results at a certain position in your result set. For example, when a user searches for iphone you want to promote air pods.

## Inputs

### Data

**This is a required field**

Type: array

An array of objects to promote, for e.g, '[{ 'doc': { '_id': 'id_1', '_source': { 'title': 'id_1' } }, 'position': 10 }]'.

# Reactivesearch

Reactivesearch stage translates the reactivesearch query to equivalent query of search backend.

## Inputs

No inputs are required

# Record Analytics

To record Appbase search analytics. Record Analytics stage is only applicable for reactivesearch requests.

## Inputs

No inputs are required

# Record Click

Record click event for a search query term or a previously searched query (represented by a X-Search-Id)

## Inputs

No inputs are required

# Record Conversion

Record conversion event for a previously searched query (represented by a X-Search-Id)

## Inputs

No inputs are required

# Record Favorite

Record a favorite (aka like) user action for a search result document (aka hit)

## Inputs

No inputs are required

# Record Saved Search

Record the search state of a ReactiveSearch query, useful for replaying a query at a later time

## Inputs

No inputs are required

# Remove Words

Removing words is the progressive loosening of query constraints to include more results when none are initially found.

For example, imagine an online smartphone shop that sold a limited inventory of iPhones in only 16GB and 32GB varieties. Users searching for “iphone 5 64gb” would see no results. This is not ideal behavior - it would be far better to show users some iPhone 5 results instead of a blank page.

## Inputs

### Data

**This is a required field**

Type: array

To remove a list of words from the search query, for e.g, ['iphone'].

# Replace Search Term

It helps in replacing the user's entire search query with another query. Helps in showing relevant results to users, especially when you are aware of the analytics that certain search term is returning no results.

## Inputs

### Data

**This is a required field**

Type: string

Search query to replace the request's query, for e.g, 'iphoneX'.

# Replace Words

It allows you to replace words in search query. For example, if you make tv a synonym for television, the stage can replace tv with television so that only television is used to search.

## Inputs

### Data

**This is a required field**

Type: object

To replace words from search query, for e.g, { 'iphone': 'iphoneX' }.

# Search Relevancy

Search Relevancy stage is useful to define the default settings for search queries. For example, to set the default size as 10 for search queries.

## Inputs

### Search Query Settings

Type: object

Default query settings applicable to 'geo' type of queries. You can find all the properties at [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

### Search Query Settings

Type: object

Default query settings applicable to 'range' type of queries. You can find all the properties at [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

### Search Query Settings

Type: object

Default query settings applicable to 'search' type of queries. You can find all the properties at [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

### Search Query Settings

Type: object

Default query settings applicable to 'suggestion' type of queries. You can find all the properties at [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

### Search Query Settings

Type: object

Default query settings applicable to 'term' type of queries. You can find all the properties at [here](https://docs.appbase.io/docs/search/reactivesearch-api/reference).

# Searchbox Preferences

Searchbox Preferences stage is useful to specify the searchbox preference id for making suggestion queries. A searchbox id represents the design + layout, popular, recent, and endpoint settings for a suggestions experience, configurable from the ReactiveSearch dashboard

## Inputs

### SearchBox Id

Type: string

Searchbox Id to apply the searchbox preferences for suggestion type of requests.

# Solr

To perform a request to a Solr search engine

## Inputs

### App

Type: string

App to search the query in. Example: 'appbase'

### Collection

Type: string

Collection in Solr to run the query against. Example: 'appbase'

### Credentials

Type: string

Credentials to access the fusion host. Example: 'username:password'

### Headers

Type: object

Headers to be passed in the Solr query request.

### Host

Type: string

Host name and port for Fusion. For example: 'localhost:6764'

### Profile

Type: string

Profile in Fusion to search the query in. Example: 'appbase'

### Protocol

Type: string

Protocol to use for connecting. Defaults to 'http'.

### Query

Type: string

Query to run on Solr. If passed, this query will be prioritized over the query built from ReactiveSearch stage. Example: 'q=*:*&qf=some_field'

### Query String

Type: object

Query string to pass in the final query along with the built query. Should be an object with key value pairs. Example: 'extraParams=debug'

### Suggestion Profile

Type: string

Profile in Fusion to send the request to for suggestion type of query. Example: 'popular-searches'

### URI

Type: string

URI to connect to the fusion instance. If passed, host, app, profile and credentials will be ignored and not required. Example: 'http://username:password@localhost:6764/api/apps/appbase/query/appbase'

# Apply Cached Response

To apply the cached response. It is recommended to apply cached response after authentication.

## Inputs

No inputs are required

# Zinc

To perform a request to Zinc

## Inputs

### Credentials

Type: string

Credentials to access the Zinc host. Example: 'username:password'

### Headers

Type: object

Headers to be passed in the Zinc request.

### Host

Type: string

Host name and port for Zinc. For example: 'localhost:4080'

### Independent Body

Type: string

Array of independent requests, i:e ones that contain the endpoint in the query.

### Protocol

Type: string

Protocol to use for connecting. Defaults to 'http'.

### Request URL

Type: string

Zinc URL, for e.g: 'https://admin:Complexpass#123@zinc-url.com'. The URL can have path and query params too, for instance, 'https://zinc-url.com/_cat/indices?format=JSON'.

