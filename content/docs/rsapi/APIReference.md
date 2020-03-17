---
title: 'API Reference'
meta_title: 'ReactiveSearch API - API Reference'
meta_description: 'ReactiveSearch API allows you to search securely.'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
sidebar: 'docs'
---

## API Reference

### Properties of a query

| Name               |  Type    | Applicable on query of type | description | required |
| ------------------ |----------| ----------------------------|-------------|----------|
| after | object | all | `after_key` returned from the term query(or if `aggregationField` is defined in a search, geo or range query), helpful to implement pagination. Example value: { "date": 1494288000000, "product": "mad max" }.| No
| aggregationField | string | all | `aggregationField` enables you to get `DISTINCT` results (useful when you are dealing with sessions, events and logs type data). It utilizes composite aggregations which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.| No |
| aggregations | Array<string> | range | It helps you to utilize the built-in aggregations for range type of queries directly, valid values are max, min & histogram. | No |
| categoryValue | string | search | This is the selected category value. It is used for informing the search result. | No |
| categoryField | string | search | Data field which has the category values mapped. | No |
| customQuery   | object | all | Custom query which will be applied to the dependent queries by react prop, as defined in Elasticsearch Query DSL. Note: It'll not affect that particular query for which it has been defined, it'll only affect the query for dependent queries. If you want to customize the source query then use the defaultQuery property instead." | No |
| dataField | Array<string> | all | database field(s) to be queried against. Accepts an Array, useful for applying search across multiple fields. | Yes |
| defaultQuery | object | all | `defaultQuery` is useful to customize the data query to be applied to the source query, as defined in Elasticsearch Query DSL. It is different from the customQuery in a way that it doesn't get leaked to other queries(dependent queries by react prop) and only modifies the query for which it has been applied. | No |
| execute | bool | all | Sometimes it may require that you want to apply some query for results with the help of react property but want to avoid any un-necessary query execution for the performance reasons. If you set execute to false for a particular query than you can use it with react prop without executing it.For an example, consider a scenario where we want to filter the search query by some range. To implement it with RS API we need to define two queries(search & range type). Since you defined the two queries than by default both queries will get executed, however you can avoid this by setting execute to false for the range query. | Yes |
| fieldWeights | Array<int> | search | To set the search weight for the database fields, useful when you are using more than one dataField. This prop accepts an array of numbers. A higher number implies a higher relevance weight for the corresponding field in the search results. | No |
| from | number | search | Starting document offset. Defaults to 0 | No |
| fuzziness | number or string  | search  | Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, fox can become box. Read more about it in the elastic search https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html. Note: This prop doesn't work when the value of queryFormat prop is set to and."  | No  |
| highlight | bool | all | whether highlighting should be enabled in the returned results. If set to false, highlightField and customHighlight values will be ignored. | No |
| highlightField | Array<string> | all | when highlighting is enabled, this prop allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to applying highlights on the field(s) specified in the dataField prop. | No |
| customHighlight | object | all | Can be used to set the custom highlight settings. https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html to know the applicable values. | No  |
| id  | string | all | The unique identifier for the query, can be referenced in other queries' react prop. | Yes |
| includeFields | Array<string> | all | Data fields to be included in search results. Defaults to [*] which means all fields are included. | No  |
| excludeFields | Array<string> | all | Data fields to be excluded in search results. | No |
| includeNullValues | bool | range | If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. | No |
| interval | number | range | To set the histogram bar interval, applicable when aggregations value is set to [""histogram""]. Defaults to Math.ceil((props.range.end - props.range.start) / 100) || 1. | No |
| missingLabel | string | term | To specify a custom label to show when showMissing is set to true. | No |
| nestedField | string | all | Set the path of the nested type under which the dataField is present. Only applicable only when the field(s) specified in the dataField is(are) present under a nested type mapping. | No |
| queryFormat | string | all | Sets the query format, can be or or and. Defaults to or. - or returns all the results matching any of the search query text's parameters. For example, searching for ""bat man"" with or will return all the results matching either ""bat"" or ""man"". - On the other hand with and, only results matching both ""bat"" and ""man"" will be returned. It returns the results matching all of the search query text's parameters." | No  |
| react | object | all | To specify dependent queries to reactively update that particular query for which the react prop is defined. key ⇒ string : one of `and`, `or`, `not` defines the combining clause. `and` clause implies that the query results will be filtered by matches from all of the associated queries' state. `or` clause implies that the query results will be filtered by matches from at least one of the associated queries' state. `not` clause implies that the query results will be filtered by an inverse match of the associated queries' state. value  ⇒ string or array or object. `string` is used for specifying a single query ID. `array` is used for specifying multiple queries by their IDs. `object` is used for nesting other key clauses. | No  |
| searchOperators | bool | search | Defaults to false. If set to true than you can use special characters in the search query to enable an advanced search behavior. Read more about it https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html. | No |
| showMissing | bool | term | Defaults to false. When set to true it also retrieves the aggregations for missing fields under the label specified by missingLabel property. | No |
| size  | number | all | To set the number of results to be returned by a query. | No |
| sortBy | string | all | asc, desc and count. Please note that count will only work with term query. | No |
| type | string | all | Type of query defaults to search, valid values are search, term, range & geo.  | No
| value  | any | all | Represents the value for a particular query, each kind of query has the different type of value format. https://www.notion.so/appbase/value-c6bdd707ceae495dac1c06efe61b12d6 | No  |