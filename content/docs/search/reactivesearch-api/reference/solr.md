---
title: 'ReactiveSearch API for Solr'
meta_title: 'ReactiveSearch API Reference | Solr'
meta_description: 'ReactiveSearch API Reference for the Solr search engine'
keywords:
    - concepts
    - appbase
    - search-relevance
    - solr
    - reactivesearch
sidebar: 'docs'
---

This guide helps you to learn more about the each property of `ReactiveSearch` API and explains that how to use those properties to build the query for different use-cases.

This guide only contains the fields supported for the **Solr** search engine.

`ReactiveSearch API` request body can be divided into two parts, `query` and `settings`. The `query` key is an `Array` of objects where each object represents a `ReactiveSearch` query to retrieve the results. Settings(`settings`) is an optional key which can be used to control the search experience. Here is an example of the request body of `ReactiveSearch` API to get the results for which the `title` field matches with `iphone`.

```js
{
    query: [{
        id: "phone-search",
        dataField: "title",
        size: 10,
        value: "iphone"
    }],
    settings: { // optional
        recordAnalytics: true, // to enable the analytics
        enableQueryRules: true, // to enable the query rules
    }
}
```

## Query parameters

Reactivesearch API supports all the [query parameters supported by solr search API](https://solr.apache.org/guide/8_11/common-query-parameters.html).

## query

**This is a required field**

**Supported Engines**
Not dependent on engine, works for all.

### id

**This is a required field**

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

The unique identifier for the query can be referenced in the `react` property of other queries. The response of the `ReactiveSearch API` is a map of query ids to `Elasticsearch` response which means that `id` is also useful to retrieve the response for a particular query.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | true     |

### type

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property represents the type of the query which is defaults to `search`, valid values are `search`, `suggestion`, `term`, `range` & `geo`. You can read more [here](/docs/search/reactivesearch-api/implement/#type-of-queries).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Following values are supported for this field**

````search````, ````term````, ````range````, ````geo````, ````suggestion````

### react

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To specify dependent queries to update that particular query for which the react prop is defined. You can read more about it [here](/docs/reactivesearch/v3/advanced/reactprop/).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Example Playground**: 
<iframe src="https://play.reactivesearch.io/embed/fnTtSJmMehxSn3AAJWwi"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;" title="rs-playground-Nbpi1vkkywun82Z8aqFP"></iframe>

### highlight

This property can be used to enable the highlighting in the returned results. If set to `false`, [highlightField](/docs/search/reactivesearch-api/reference/#highlightfield) and [highlightConfig](/docs/search/reactivesearch-api/reference/#highlightconfig) values will be ignored.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/D78cJ8naiP4eFwey7fkH"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### queryFormat

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Sets the query format, can be `or`, `and` and [date format](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html). Defaults to `or`.

- `or` returns all the results matching any of the search query text\'s parameters. For example, searching for "bat man" with or will return all the results matching either "bat" or "man".

- On the other hand with `and`, only results matching both "bat" and "man" will be returned. It returns the results matching all of the search query text\'s parameters."

- `queryFormat` can be set as Elasticsearch [date format](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html) for `range` type of queries. It allows Elasticsearch to parse the range values (dates) to a specified format before querying the data. You can find the valid date formats at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html#built-in-date-formats).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/BrZJZmtQ8rysDwNFkwSZ"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### dataField

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

database field(s) to be queried against, useful for applying search across multiple fields.
It accepts the following formats:
- `string`
- `DataField`
- `Array<string|DataField>`

The `DataField` type has the following shape:

```ts
type DataField = {
    field: string;
    weight: float;
};
```
For examples,

1. `dataField` without field weights
```js
    dataField: ['title', 'title.search']
```

2. `dataField` with field weights

```js
    dataField: [
        {
            "field": "title",
            "weight": 1
        },
        {
            "field": "title.search",
            "weight": 3
        }
    ]
```

3. `dataField` with and without field weights

```js
    dataField: [
        {
            "field": "title",
            "weight": 1
        },
        {
            "field": "title.search",
            "weight": 3
        },
        "description"
    ]
```

| <p style="margin: 0px;" class="table-header-text">Type</p>                                       | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------------------------------------------ | --------------------------- | -------- |
| `string | DataField | Array` | `all`                       | true     |

> Note:
> Multiple `dataFields` are not applicable for `term` and `geo` queries.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/OEsNqfreC5r618rPj3O1"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### from

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Starting document offset. Defaults to `0`.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>              | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | ---------------------------------------- | -------- |
| `int` | `search`,`suggestion`,`geo`,`range`      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/CkDIWMFkB1xA1lr6fExm"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### size

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the number of results to be returned by a query.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/OEsNqfreC5r618rPj3O1"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### aggregationSize

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the number of buckets to be returned by aggregations.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `term`                      | false    |

> Note:
> 1. This property can also be used for `search` and `suggestion` type of queries when `aggregationField` or `categoryField` is set.
> 2. This is a new feature and only available for appbase versions >= 7.41.0.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/zVafjHpSZS2Vngji6cCu"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### sortBy

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to sort the results in a particular format. The valid values are:
- `asc`, sorts the results in ascending order,
- `desc`, sorts the results in descending order,
- `count`, sorts the aggregations by `count`.


| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`*                      | false    |

> Note:
>
> Please note that the `count` value can only be applied when the query type is of `term`. In addition, the [pagination](/docs/search/reactivesearch-api/reference/#pagination) property for the query needs to be set to `false` (default behavior). When pagination is `true`, a composite aggregation is used under the hood, which doesn\'t support ordering by count.

The `sortBy` value by default is set according to the following criterion:

- If field is `_score`, set as `desc`.
- If field is anything other than `_score`, set as `asc`

**Following values are supported for this field**

````asc````, ````desc````, ````count````

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/zbxzsh9ZJRBarHUAzd0t"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### sortField

**Supported Engines**
elasticsearch, solr, opensearch

This field should indicate the field that sort will be applied to. If not passed, then the first entry in the `dataField` (if passed as object or array) or the `dataField` itself (if passed as string) will be used.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `String`, `array of strings`, `array of string and objects` | `all`                       | false  |

The `sortField` key accepts different types of values:

#### 1. `string`

String can be passed where the string is a dataField where sorting is supposed to be done on, following is an example:

```json
{
    "sortField": "title"
}
```

> In the above example, `title` is the dataField on which sorting will be done.

In the above example, the sorting method will be the value of `sortBy` (if passed) else the default value (which is `asc` for any field other than `_score`).

#### 2. Array of string

An array of string can also be passed. This can be done in the following way:

```json
{
    "sortField": [
        "title",
        "author",
        "price"
    ]
}
```

> In the above example, `title`, `author` and `price` are valid dataFields on which sorting will be done.

In the above example, the sorting order will be based on the value of `sortBy` key if passed, or default to `asc` order. `_score` is a special field to sort by relevance, if specified, it is always sorted in `desc` order

#### 3. Array of string / object

`sortField` also accepts a combined array where some fields are passed as object. Following is an example:

```json
{
    "sortField": [
        "title",
        {"author": "desc"},
        {"price": "asc"}
    ]
}
```

In the above example, the sort order for `title` field will be `asc` (i.e. ascending). For the other fields, it will be as passed. The object should have the dataField as the **key** and the sort order as its **value**, only `asc` or `desc` are valid values here.

### value

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Represents the value for a particular query [type](/docs/search/reactivesearch-api/reference/#type), each kind of query has the different type of value format.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `any` | `all`                       | false    |

You can check the `value` format for different `type` of queries:

#### format for `search` and `suggestion` type

The value can be a `string` or `int`.
**Example Playground**: 
<iframe src="https://play.reactivesearch.io/embed/FX3oGSB8xhqnyXyKsPYe"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;"   title="rs-playground-Nbpi1vkkywun82Z8aqFP"></iframe>

#### format for `term` type

The value can be a `string` or `Array<string>`.
**Example Playground**: 
<iframe src="https://play.reactivesearch.io/embed/OEiBYUiTYHNZC47ndlFM"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;" title="rs-playground-Nbpi1vkkywun82Z8aqFP"></iframe>

#### format for `range` type

The value should be an `Object` in the following shape:

```js
{
   "start": int | double | date, // optional
   "end": int | double | date, // optional
   "boost": int
}
```

> Note:
>
> Either `start` or `end` property must present in the value.

**Example Playground**: 
<iframe src="https://play.reactivesearch.io/embed/b3fCyKzTzhlh4TPxtd0s"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;" title="rs-playground-Nbpi1vkkywun82Z8aqFP">
</iframe>

#### format for `geo` type

The value should be an `Object` in the following shape:

```js
{
   // The following properties can be used to get the results within a particular distance and location.
   "distance": int,
   "location": string, // must be in `{lat}, {lon}` format
   "unit": string,
   // The following properties can be used to get the results for a particular geo bounding box.
   "geoBoundingBox": {
       topLeft: string, // required, must be in `{lat}, {lon}` format
       bottomRight: string, // required, must be in `{lat}, {lon}` format
   }
}
```
> Note: The `geoBoundingBox` property can not be used with `location` property, if both are defined than `geoBoundingBox` value will be ignored.

The below example represents a **geo distance** query:

```js
    {
        "id": "distance_filter",
        "type": "geo",
        "dataField": ["location"],
        "value":  {
            "distance":10,
            "location":"22.3184816, 73.17065699999999",
            "unit": "mi/yd/ft/km/m/cm/mm/nmi"
        }
    }
```

The below example represents a **geo bounding box** query:
```js
    {
        "id": "bounding_box_filter",
        "type": "geo",
        "dataField": ["location"],
        "value":  {
            "geoBoundingBox": {
                "topLeft": "40.73, -74.1",
                "bottomRight": "40.01, -71.12",
            }
        }
    }
```
**Example Playground**: 
<iframe src="https://play.reactivesearch.io/embed/G8LuoEsyaSGqbOIAUnnX"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;" title="rs-playground-Nbpi1vkkywun82Z8aqFP"></iframe>

### includeNullValues

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

If you have sparse data or documents or items not having the value in the specified field or mapping, then this prop enables you to show that data.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/v9CSJs1tuzjSte1fX85y"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### includeFields

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Data fields to be included in search results. Defaults to `[*]` which means all fields are included.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/BiSDVAIW9LX3nnCFbcbs"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### excludeFields

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Data fields to be excluded in search results.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

### highlight

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to enable the highlighting in the returned results. If set to `false`, [highlightField](/docs/search/reactivesearch-api/reference/#highlightfield) and [highlightConfig](/docs/search/reactivesearch-api/reference/#highlightconfig) values will be ignored.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/SJS4477ORrmJMI7bFhg4"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### highlightField

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

When highlighting is `enabled`, this property allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to apply highlights on the field(s) specified in the `dataField` prop.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

### highlightConfig

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

It can be used to set the custom highlight settings. You can read the `Elasticsearch` docs for the highlight options at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/wwXjDm82AYjTDwmXy3Wj"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### interval

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the histogram bar interval, applicable when [aggregations](/docs/search/reactivesearch-api/reference/#aggregations) value is set to `["histogram"]`. Defaults to `Math.ceil((range.end - range.start) / 100) || 1`.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `range`                     | false    |

### aggregations

**Supported Engines**
elasticsearch, mongodb, solr, opensearch


It helps you to utilize the built-in aggregations for `range` type of queries directly, valid values are:
- `max`: to retrieve the maximum value for a `dataField`,
- `min`: to retrieve the minimum value for a `dataField`,
- `histogram`: to retrieve the histogram aggregations for a particular `interval`

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/18dGWITtMwz7IqsEQiEU"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### showMissing

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Defaults to `false`. When set to `true` then it also retrieves the aggregations for missing fields.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `term`                      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/6EDzwDFK1NAAaWXTnG1N"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### defaultQuery

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property is useful to customize the source query, as defined in Elasticsearch Query DSL. It is different from the [customQuery](/docs/search/reactivesearch-api/reference/#customquery) in a way that it doesn\'t get leaked to other queries(dependent queries by `react` prop) and only modifies the query for which it has been applied.

You can read more about the `defaultQuery` usage over [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/2nSqDGicQ4nm0Kiwt2WT"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### customQuery

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Custom query property will be applied to the dependent queries by `react` property, as defined in Elasticsearch Query DSL. You can read more about the `customQuery` usage over [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-custom-query).

> Note:
>
> It\'ll not affect that particular query for which it has been defined, it\'ll only affect the query for dependent queries. If you want to customize the source query then use the [defaultQuery](/docs/search/reactivesearch-api/reference/#defaultquery) property instead.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/5GWsnFaRK8TUeG9uxiFD"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### execute

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Sometimes it may require that you want to apply some query for results with the help of `react` property but want to avoid any un-necessary query execution for the performance reasons. If you set `execute` to `false` for a particular query then you can use it with `react` prop without executing it.
For example, consider a scenario where we want to filter the search query by some range. To implement it with RS API we need to define two queries(search & range type). Since you defined the two queries then by default both queries will get executed, however you can avoid this by setting `execute` to `false` for the range query.

| <p style="margin: 0px;" class="table-header-text">Type</p>   |<p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/5GWsnFaRK8TUeG9uxiFD"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enableSynonyms

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to control (enable/disable) the synonyms behavior for a particular query. Defaults to `true`, if set to `false` then fields having `.synonyms` suffix will not affect the query.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/Y6ofCAWpEE02zlkZKKgj"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enablePopularSuggestions

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

When set to `true`, popular searches based on aggregate end-user data are returned as suggestions as per the popular suggestions config (either defaults, or as set through [popularSuggestionsConfig](/docs/search/reactivesearch-api/reference/#popularsuggestionsconfig) or via Popular Suggestions settings in the control plane)

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### popularSuggestionsConfig

**Supported Engines**
elasticsearch, solr, opensearch

Specify additional options for fetching popular suggestions. It can accept the following keys:

- **size**: `int` Maximum number of popular suggestions to return. Defaults to `5`.

- **minCount**: `int` Return only popular suggestions that have been searched at least minCount times. There is no default minimum count-based restriction.

- **minChars**: `int` Return only popular suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.

- **showGlobal**: `Boolean` Defaults to true. When set to `false`, return popular suggestions only based on the current user\'s past searches.

- **index**: `string` Index(es) from which to return the popular suggestions from. Defaults to searching the entire cluster.

> Note: It is possible to define multiple indices using a comma separated pattern, for e.g `products,categories`.

- **customEvents** `Object` Custom analytics events to filter the popular suggestions.
For example,
```js
    "popularSuggestionsConfig": {
        "customEvents": {
            "browser": "Chrome",
            "user_id": "john@appbase.io"
        }
    }
```

**sectionLabel**: `string` To define the section title for popular suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object` | `suggestion`                | false    |

### showDistinctSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

### enablePredictiveSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

When set to `true`, it predicts the next relevant words from the value of a field based on the search query typed by the user. When set to false (default), the matching document field\'s value would be displayed.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### maxPredictedWords

**Supported Engines**
elasticsearch, solr, opensearch

Defaults to `2`. This property allows configuring the maximum number of relevant words that are predicted. Valid values are between `[1, 5]`.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `int`    | `suggestion`                | false    |

### urlField

**Supported Engines**
elasticsearch, solr, opensearch

Data field whose value contains a URL. This is a convenience prop that allows returning the URL value in the suggestion\'s response.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `string` | `suggestion`                | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/41RHlvv68haiY9tN5JLY"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### applyStopwords

**Supported Engines**
elasticsearch, solr, opensearch

When set to `true`, it would not predict a suggestion which starts or ends with a stopword. You can use [searchLanguage](/docs/search/reactivesearch-api/reference/#searchlanguage) property to apply language specific stopwords.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### customStopwords

**Supported Engines**
elasticsearch, solr, opensearch

It allows you to define a list of custom stopwords. You can also set it through `Index` settings in the control plane.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `array`   | `suggestion`               | false    |

### searchLanguage

**Supported Engines**
elasticsearch, solr, opensearch

Search language is useful to apply language specific stopwords for predictive suggestions. Defaults to [english](https://github.com/bbalet/stopwords/blob/master/stopwords_en.go#L7) language.

We support following languages:

- [arabic](https://github.com/bbalet/stopwords/blob/master/stopwords_ar.go#L7)
- [bulgarian](https://github.com/bbalet/stopwords/blob/master/stopwords_bg.go#L7)
- [czech](https://github.com/bbalet/stopwords/blob/master/stopwords_cs.go#L7)
- [danish](https://github.com/bbalet/stopwords/blob/master/stopwords_da.go#L7)
- [english](https://github.com/bbalet/stopwords/blob/master/stopwords_en.go#L7)
- [finnish](https://github.com/bbalet/stopwords/blob/master/stopwords_fi.go#L7)
- [french"](https://github.com/bbalet/stopwords/blob/master/stopwords_fr.go#L7)
- [german"](https://github.com/bbalet/stopwords/blob/master/stopwords_de.go#L7)
- [hungarian](https://github.com/bbalet/stopwords/blob/master/stopwords_hu.go#L7)
- [italian"](https://github.com/bbalet/stopwords/blob/master/stopwords_it.go#L7)
- [japanese](https://github.com/bbalet/stopwords/blob/master/stopwords_ja.go#L7)
- [latvian](https://github.com/bbalet/stopwords/blob/master/stopwords_lv.go#L7)
- [norwegian](https://github.com/bbalet/stopwords/blob/master/stopwords_no.go#L7)
- [persian](https://github.com/bbalet/stopwords/blob/master/stopwords_fa.go#L7)
- [polish](https://github.com/bbalet/stopwords/blob/master/stopwords_pl.go#L7)
- [portuguese](https://github.com/bbalet/stopwords/blob/master/stopwords_pt.go#L7)
- [romanian](https://github.com/bbalet/stopwords/blob/master/stopwords_ro.go#L7)
- [russian](https://github.com/bbalet/stopwords/blob/master/stopwords_ru.go#L7)
- [slovak](https://github.com/bbalet/stopwords/blob/master/stopwords_sk.go#L7)
- [spanish](https://github.com/bbalet/stopwords/blob/master/stopwords_es.go#L7)
- [swedish](https://github.com/bbalet/stopwords/blob/master/stopwords_sv.go#L7)
- [thai](https://github.com/bbalet/stopwords/blob/master/stopwords_th.go#L7)
- [turkish ](https://github.com/bbalet/stopwords/blob/master/stopwords_tr.go#L7)

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `string` | `suggestion`                | false    |

### calendarInterval

**Supported Engines**
elasticsearch, solr, opensearch

### enableFeaturedSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

When set to `true`, featured searches are returned as suggestions as per the featured suggestions config (either defaults, or as set through [featuredSuggestionsConfig](/docs/search/reactivesearch-api/reference/#featuredsuggestionsconfig).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### searchboxId

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

**Supported Engines**
elasticsearch, solr, opensearch

The `searchboxID` is required to apply the featured suggestions. A featured suggestion group is a collection of featured suggestions.
Endpoint to create a featured suggestions group: https://api.reactivesearch.io/#bdf8961b-322f-48f9-9562-c3e507fd0508


### featuredSuggestionsConfig

**Supported Engines**
elasticsearch, solr, opensearch

To define options to apply featured suggestions. It can accept the following keys:

- **maxSuggestionsPerSection**: `int` To restrict the number of featured suggestions per section.

- **sectionsOrder**: `Array<string>` To define the order of sections to be displayed in UI. For e.g, `[\'document\', \'pages\', \'help\']`.


| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object`   | `suggestion`                | false    |

### enableIndexSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

This property can be used to disable the index suggestions. If set the `false`, Appbase would not query the search backend to fetch the suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### enableEndpointSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

### indexSuggestionsConfig

**Supported Engines**
elasticsearch, solr, opensearch

Specify the additional options for index suggestions. It accepts following keys:

**sectionLabel**: `string` To define the section title for index suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object`   | `suggestion`                | false    |

### deepPagination

**Supported Engines**
elasticsearch, solr, opensearch

This flag tells RS whether to use the deep pagination functionality provided by the Backend to extract more than 10k results.

[More about deepPagination can be read here for ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after)

[More about deepPagination can be read here for Solr]()

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Boolean`   | `all`                | false    |

### deepPaginationConfig

**Supported Engines**
elasticsearch, solr, opensearch

Specify the configuration for using deep pagination in the respective backend.

#### ElasticSearch

For ElasticSearch, the `deepPaginationConfig.cursor` field should contain the `sort` array\'s first element of the last `hits.hits` item.

So if `hits.hits` is of length 10, then the `deepPaginationConfig.cursor` should be the `sort` field of the 9th index item of the search result.

[More can be read about it here](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after)

> Note that it is important to use sorting by passing the `sortBy` and/or `sortField` value to get the `sort` field in the response.

#### Solr

For Solr, the `deepPaginationConfig.cursor` field should contain the `nextCursorMark` value received in the root of the response body in the first request.

[More can be read about it here](https://solr.apache.org/guide/6_6/pagination-of-results.html#constraints-when-using-cursors)

> Note that it is important to use sorting by passing the `sortBy` and/or `sortField` value to get the `nextCursorMark` field in the response.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object`   | `all`                | false    |

### endpoint

**Supported Engines**
elasticsearch, solr, opensearch

This field indicates the backend of ReactiveSearch. Backend implies the search service being used to store the data.

As of now, the `backend` field supports the following values:

1. `elasticsearch`: ElasticSearch
2. `opensearch`: OpenSearch

where `elasticsearch` is the default value.

> This field is necessary if backend is OpenSearch and the kNN reordering of scripts are to be used.

Following example indicates how to use this field to use kNN reordering with OpenSearch as backend:

```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.2],
        }
    ],
    "settings": {
        "backend": "opensearch"
    }
}
```

### includeValues

**Supported Engines**
elasticsearch, solr, opensearch


This fields indicates which values should be included in the terms aggregation (if done so). Only applied for `term` type of queries.

This should be of type array of strings:

```json
{
    "query": [{
        "includeValues": ["someterm"]
    }]
}
```

> NOTE: The string can be a regex as well but only for ElasticSearch backend, not Solr.

#### ElasticSearch

For ElasticSearch this maps to the `include` field inside the `term` query.

#### Solr

For Solr, this maps to the `facet.contains` field.

## settings

**Supported Engines**
Not dependent on engine, works for all.

### recordAnalytics

**Supported Engines**
elasticsearch, solr, opensearch

`bool` defaults to `false`. If `true` then it'll enable the recording of Appbase.io analytics.

### backend

**Supported Engines**
elasticsearch, solr, opensearch

This field indicates the backend of ReactiveSearch. Backend implies the search service being used to store the data.

As of now, the `backend` field supports the following values:

1. `elasticsearch`: ElasticSearch
2. `opensearch`: OpenSearch

where `elasticsearch` is the default value.

> This field is necessary if backend is OpenSearch and the kNN reordering of scripts are to be used.

Following example indicates how to use this field to use kNN reordering with OpenSearch as backend:

```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.2],
        }
    ],
    "settings": {
        "backend": "opensearch"
    }
}
```

**Following values are supported for this field**

```elasticsearch```, ```opensearch```, ```mongodb```, ```solr```, ```zinc```

## metadata

**Supported Engines**
Not dependent on engine, works for all.

