---
id: go-queries
title: "Queries With Go"
layout: docs
sectionid: go-queries
permalink: go-queries.html
prev: go-quickstart.html
prevTitle: "Golang Quickstart"
---

In the previous article [`Golang Quickstart`](/go-quickstart.html), we saw how to index new data and stream both individual data as well as query results. Now, we shall go ahead and explore some complex queries with `ElasticSearch` using our [`go-appbase` library](https://godoc.org/github.com/appbaseio/go-appbase/).

For this tutorial, we will use an app called `gitxplore-live`. The credentials for this app are `2FPZ2UJQW:1c50c6df-4652-4d74-906b-7bc0a6a731b6`.

You can browse the app's data by clicking the image below.

[![Image](https://i.imgur.com/Pvh2btF.png)](https://appbaseio.github.io/dejavu/live/#?input_state=XQAAAAKvAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsXzANcEiOj1t75YJPmGw7xeXjnOyOKwcTIJQljSmiDlmnS0idduXRCWx36R0WY9_Vp2OeiWvs5xdlMjiRDDupmmjgc5kXonz8uq6m2RqZAJEc_g63epaXm2VZJ6P017RqXwhNW50YP02uGPJzw_wlnNHejyw3A55t32cUtVwYDVOtKa99NwNlFHAdl3uj_6iHw3B-0vHqDKRryA5CsywM3FCsu23ODTNzechJe-gmxprZA9mVWAEtVsHlY2xwiEtAoUv2y01q-PbwwQRWgvPawZOg_2FMxpSdtTlo3pM6GtNC58SfDg-9XlSibEGCXddBtwfsFtLe__m9Bxxb4Ko1ga01UaH5Ww5n5_KJWXsgh17HlNH_vawxqo)

## Date Range Query

When we need to query all documents in a particular range of dates we use [`range`](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-range-query.html) clause. See the example below to understand how it works.

```go
client, _ := appbase.NewClient("https://scalr.api.appbase.io", "2FPZ2UJQW", "1c50c6df-4652-4d74-906b-7bc0a6a731b6", "gitxplore-live")
err := client.Ping()
if err != nil {
	log.Println(err)
}
fmt.Println("Client created")

const testtype string = "gitxplore-live"
const dateQuery string = `{
	"query": {
		"range" : {
			"created" : {
				"gte" : "2015-10-29T14:37:16Z",
				"lte" : "2017-10-29T14:37:16Z"
			}
		}
	}
}`

searchResponse, err := client.Search().Type(testtype).Body(dateQuery).Do()
if err != nil {
	log.Println(err)
	return
}
fmt.Println("Total Hits for the range of dates is: ", searchResponse.Hits.TotalHits)
```
```go
searchResponse: {
	Total Hits for the range of dates is: 4684
}
```
``Note:`` To print the document as well you need to add the following lines to the code:
```go
document, err := json.MarshalIndent(*searchResponse.Hits, "", "  ")
if err != nil {
	log.Println(err)
}
fmt.Println(string(document))
```

## Compound Query

Now we shall look into a compound query where we want to get those documents which are within the specified dates and have a particular term in one of the fields. The following example will return all the documents which have `Javascript` in their `language` field and which were `created` on or after `2015-10-29T14:37:16Z` till `2017-10-29T14:37:16Z`.

```go
client, _ := appbase.NewClient("https://scalr.api.appbase.io", "2FPZ2UJQW", "1c50c6df-4652-4d74-906b-7bc0a6a731b6", "gitxplore-live")
err := client.Ping()
if err != nil {
	log.Println(err)
}
fmt.Println("Client created")

const testtype string = "gitxplore-live"
const matchDateTermQuery string = `{
	"query": {
		"bool": {
			"must": [
				{
					"range": {
						"created": {
							"gte": "2015-10-29T14:37:16Z",
							"lte": "2017-10-29T14:37:16Z"
						}
					}
				},
				{
					"term": {
						"language": "javascript"
					}
				}
			]
		}
	}
}`
dateTermQueryResponse, err := client.Search().Type(testtype).Body(matchDateTermQuery).Do()
if err != nil {
	log.Println(err)
	return
}
fmt.Println("Total Hits for the range of dates with Javascript term is: ", dateTermQueryResponse.Hits.TotalHits)
```
```go
dateTermQueryResponse: {
	Total Hits for the range of dates with Javascript term is: 1022
}
```
We can further extend the above query to contain more nested `bool` clauses. You can read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-bool-query.html).

## Sorting Query Results

We need to add [`sort`](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html) clause to the query to sort the `returned documents`. It takes `asc` (sorts in ascending order) or `desc` (sorts in descending order) as parameter to `order`. Say if we wanted to sort the response of our previous query in ascending order of its `created` date, the query would change to:

```go
const matchDateTermQuery string = `{
	"query": {
		"bool": {
			"must": [
				{
					"range": {
						"created": {
							"gte": "2015-10-29T14:37:16Z",
							"lte": "2017-10-29T14:37:16Z"
						}
					}
				},
				{
					"term": {
						"language": "javascript"
					}
				}
			]
		}
	},
	"sort": [
		{
			"created": {
				"order": "asc"
			}
		}
	]
}`
```

## Match Query

[`match`](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-match-query.html#query-dsl-match-query) clause is a simple match query. If matches if atleast one term from the query is present. The more the match the better is its score. For example, the below `matchQuery` when executed will return every document which has at least one of the term from the `plugin which` phrase in their `description` field.

```go
const matchQuery string = `{
	"query": {
		"match": {
			"description": "plugin which"
		}
	}
}`
```
It currently returns `980` documents for this query.

### Match Phrase Query

[`match_phrase`](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-match-query-phrase.html#query-dsl-match-query-phrase) query matches only if all the terms from the query are present and in the same order. For example the below `matchPhraseQuery` when executed will return every document which has all of the terms from `plugin which` phrase and in the exact order in their `description` field.

```go
const matchPhraseQuery string = `{
	"query": {
		"match": {
			"description": "plugin which"
		}
	}
}`
```

It will return `16` documents for this query.

### Match Phrase Prefix Query

The [`match_phrase_prefix`](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-match-query-phrase-prefix.html#query-dsl-match-query-phrase-prefix) query is the same as `match_phrase`, except that it allows for prefix matches on the last term in the text.

```go
const matchPhraseQuery string = `{
	"query": {
		"match_phrase_prefix": {
			"description": "and wr"
		}
	}
}`
```

It will return `34` number of documents for this query.

In this article, we showed examples of how to work with `term`, `match`, `match_phrase`, `match_phrase_prefix`, `range` and `compound` queries. You can learn more about the [Elasticsearch Query DSL here](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html).
