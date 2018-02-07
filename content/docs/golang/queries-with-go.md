---
id: queries-with-golang
title: "Golang Complex Queries"
layout: docs
sectionid: queries-with-golang
permalink: queries-with-golang.html
prev: go-quickstart.html
prevTitle: "Golang Quickstart"
---

In the previous article [`Golang Quickstart`](http://docs.appbase.io/go-quickstart.html) we saw how to index new data and stream both individual data as well as query results. Now, we shall go ahead and explore some complex queries with `ElasticSearch` using our [`go-appbase` library](https://godoc.org/github.com/appbaseio/go-appbase/).

For this tutorial, we will use an app called `gitxplore-live`. The credentials for this app are `2FPZ2UJQW:1c50c6df-4652-4d74-906b-7bc0a6a731b6`.

## Find Documents Within A Range Of databases

When we need to query all documents in a particular range of dates we use [`range`](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/query-dsl-range-query.html) clause. See the example below to understand how it works.

```go
client, _ := appbase.NewClient("https://scalr.api.appbase.io", "2FPZ2UJQW", "1c50c6df-4652-4d74-906b-7bc0a6a731b6", "gitxplore-live")
err := client.Ping()
if err != nil {
	log.Println(err)
}
fmt.Println("Client created")

const testtype string = "gitxplore-live"
const matchAllQuery string = `{
"query": {
	"range" : {
		"created" : {
			"gte" : "2015-10-29T14:37:16Z",
			"lte" : "2017-10-29T14:37:16Z"
			}
		}
	}
}`

searchResponse, err := client.Search().Type(testtype).Body(matchAllQuery).Do()
if err != nil {
	log.Println(err)
	return
}
fmt.Println("Total Hits for the range of dates is : ", searchResponse.Hits.TotalHits)
```
```go
searchResponse:{
	Total Hits for the range of dates is : 4684
}
```
``Note:`` To print the document as well you need to add the following lines to the code.
```go
document, err := json.MarshalIndent(*dateTermQueryResponse.Hits, "", "  ")
if err != nil {
	log.Println("error:", err)
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
	fmt.Println("error here ", err)
	return
}
fmt.Println("Total Hits for the range of dates with Javascript term is : ", dateTermQueryResponse.Hits.TotalHits)
```
```go
dateTermQueryResponse: {
	Total Hits for the range of dates with Javascript term is :  1022
}
```
Similarly, we can go up to any level of compounding.

## Sorting the Documents

We need to add [`sort`](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/search-request-sort.html) clause to the query to sort the `returned documents`. It takes `asc` (sorts in ascending order) or `desc` (sorts in descending order) as parameter to `order`. Say if we wanted to sort the response of our "compound query" in ascending order of it's `created` date, the query would change to:

```go
const matchDateTermQuery string = `
{
  "query": {
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
	},
  "sort": [
    {
      "created": {
        "order": "asc"
      }
    }
  ]
}
`
```

## Match Queries

[`match`](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html#query-dsl-match-query) clause is a simple match query. If matches if atleast one term from the query is present. The more the match the better is it's score. For example the below `matchQuery` when executed will return every document which has atleast one of the term from `go framework`in their `description` field.

```go
const matchQuery string = `{
	"query": {
		"match": {
			"description": "plugin which"
		}
	}
}`
```
It will return `980` number of documents from this app.

### Match Phrase Queries

[`match_phrase`](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html#query-dsl-match-query-phrase) clause matches only if all the terms from the query is present and in the same order. For example the below `matchPhraseQuery` when executed will return every document which has all of the terms from `go framework` and in the exact order in their `description` field.

```go
const matchPhraseQuery string = `{
	"query": {
		"match": {
			"description": "plugin which"
		}
	}
}`
```
It will return `16` number of documents from this app.

### Match Phrase Prefix Queries

The [`match_phrase_prefix`](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html#query-dsl-match-query-phrase-prefix) is the same as `match_phrase`, except that it allows for prefix matches on the last term in the text.

```go
const matchPhraseQuery string = `{
	"query": {
		"match_phrase_prefix": {
			"description": "and wr"
		}
	}
}`
```
It will return `34` number of documents from this app.

In this tutorial we learnt to work with `term`, `match`, `match_phrase`, `match_phrase_prefix`, `range` and `compound` queries.
