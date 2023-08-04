---
title: 'ReactiveSearch API for MongoDB'
meta_title: 'ReactiveSearch API Reference | MongoDB Atlas Search'
meta_description: 'ReactiveSearch API Reference for the MongoDB Atlas Search engine'
keywords:
    - concepts
    - appbase
    - search-relevance
    - mongodb
    - atlas-search
    - reactivesearch
sidebar: 'docs'
---

This guide helps you to learn more about the each property of `ReactiveSearch` API and explains that how to use those properties to build the query for different use-cases.

This guide is specific to the keys supported for the **MongoDB Atlas Search** engine.

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

# null

**Supported Engines**
Not dependent on engine, works for all.

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

```search```, ```term```, ```range```, ```geo```, ```suggestion```

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
<iframe src="https://play.reactivesearch.io/embed/7cGXu7zfytS65UCaJw5N"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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
<iframe src="https://play.reactivesearch.io/embed/qRFh2PiS19Z6GfqOX9r0"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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
<iframe src="https://play.reactivesearch.io/embed/HtFk5w1Mnq9EU8frz64e"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### categoryField

**Supported Engines**
elasticsearch, mongodb, opensearch

Data field whose values are used to provide category specific suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `search`,`suggestion`       | false    |

> Note:
>
> The [aggregationSize](/docs/search/reactivesearch-api/reference/#aggregationsize) property can be used to control the size of category suggestions.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/aQBWt5qU2dENQAtjGgLI"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### categoryValue

**Supported Engines**
elasticsearch, mongodb, opensearch

This is the selected category value. It is used for informing the search result.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `search`,`suggestion`       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/CxpWy5aQvkzRYVVNJKPr"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### nestedField

**Supported Engines**
elasticsearch, mongodb, opensearch

Set the path of the nested type under which the `dataField` is present. Only applicable only when the field(s) specified in the `dataField` is(are) present under a nested type mapping.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/aRzjyfarFs6tlk59eT6I"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### from

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Starting document offset. Defaults to `0`.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>              | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | ---------------------------------------- | -------- |
| `int` | `search`,`suggestion`,`geo`,`range`      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/n8fwxbBjAWK5dy20lNNo"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### size

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the number of results to be returned by a query.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/kQJpKEujvQrpRqwuQxYV"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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
<iframe src="https://play.reactivesearch.io/embed/HtFk5w1Mnq9EU8frz64e"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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

```asc```, ```desc```, ```count```

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/7gCL96Etkz3cSir9D2tj"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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

### aggregationField

**Supported Engines**
elasticsearch, mongodb, opensearch

`aggregationField` enables you to get `DISTINCT` results (useful when you are dealing with sessions, events, and logs type data). It utilizes [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html) which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/lXtfrhTSQgPImhLqCDuG"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### after

**Supported Engines**
elasticsearch, mongodb, opensearch

This property can be used to implement the pagination for `aggregations`. We use the [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html) of `Elasticsearch` to execute the aggregations\' query, the response of composite aggregations includes a key named `after_key` which can be used to fetch the next set of aggregations for the same query. You can read more about the pagination for composite aggregations at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_pagination).

You need to define the `after` property in the next request to retrieve the next set of aggregations.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/9HR0pRcDet8VnWJDmJHG"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### includeNullValues

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

If you have sparse data or documents or items not having the value in the specified field or mapping, then this prop enables you to show that data.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/uwo7xjiMHbNG7cAm798g"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### includeFields

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Data fields to be included in search results. Defaults to `[*]` which means all fields are included.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/6DedqY8wcwnFnVV0H5jv"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### excludeFields

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Data fields to be excluded in search results.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/tuuLL8woVjeiu4QOWY0S"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### fuzziness

**Supported Engines**
elasticsearch, mongodb, opensearch

Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, `fox` can become `box`. Read more about it in the elastic search https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html.

| <p style="margin: 0px;" class="table-header-text">Type</p>           | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------------- | --------------------------- | -------- |
| `int | string` | `search`, `suggestion`      | false    |

> Note:
>
> This property doesn\'t work when the value of [queryFormat](/docs/search/reactivesearch-api/reference/#queryformat) property is set to `and`."

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/CGaSSGlTPUOPmL4wv6Xb"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### searchOperators

**Supported Engines**
elasticsearch, mongodb, opensearch

Defaults to `false`. If set to `true` then you can use special characters in the search query to enable an advanced search behavior. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

> Note: If both properties `searchOperators` and `queryString` are set to `true` then `queryString` will have the priority over `searchOperators`.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/AIuL75TpGfjCiPy23Ntc"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### highlight

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to enable the highlighting in the returned results. If set to `false`, [highlightField](/docs/search/reactivesearch-api/reference/#highlightfield) and [highlightConfig](/docs/search/reactivesearch-api/reference/#highlightconfig) values will be ignored.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/TCMHP5musWLxjm9SAcg8"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### highlightField

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

When highlighting is `enabled`, this property allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to apply highlights on the field(s) specified in the `dataField` prop.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/TCMHP5musWLxjm9SAcg8"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### highlightConfig

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

It can be used to set the custom highlight settings. You can read the `Elasticsearch` docs for the highlight options at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/TCMHP5musWLxjm9SAcg8"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### interval

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the histogram bar interval, applicable when [aggregations](/docs/search/reactivesearch-api/reference/#aggregations) value is set to `["histogram"]`. Defaults to `Math.ceil((range.end - range.start) / 100) || 1`.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/m780VL1HLEK5YgyadjLK"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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
<iframe src="https://play.reactivesearch.io/embed/vn8F113vBVnlDDG3FeqL"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### missingLabel

**Supported Engines**
elasticsearch, mongodb, opensearch

Defaults to `N/A`. It allows you to specify a custom label to show when [showMissing](/docs/search/reactivesearch-api/reference/#showmissing) is set to `true`.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `term`                      | false    |

> Note: This property doesn\'t work when [pagination](/docs/search/reactivesearch-api/reference/#pagination) is set to `true`.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/djmguXPaBC7PYHLq9TGr"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### showMissing

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Defaults to `false`. When set to `true` then it also retrieves the aggregations for missing fields.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `term`                      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/Cx8oBlfvg432RGNcwDfs"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### defaultQuery

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property is useful to customize the source query, as defined in Elasticsearch Query DSL. It is different from the [customQuery](/docs/search/reactivesearch-api/reference/#customquery) in a way that it doesn\'t get leaked to other queries(dependent queries by `react` prop) and only modifies the query for which it has been applied.

You can read more about the `defaultQuery` usage over [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/D79f1gc0JbA8wBq54AoS"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

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
<iframe src="https://play.reactivesearch.io/embed/Uq1kQp0dC1eB2D4ehD4d"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### execute

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Sometimes it may require that you want to apply some query for results with the help of `react` property but want to avoid any un-necessary query execution for the performance reasons. If you set `execute` to `false` for a particular query then you can use it with `react` prop without executing it.
For example, consider a scenario where we want to filter the search query by some range. To implement it with RS API we need to define two queries(search & range type). Since you defined the two queries then by default both queries will get executed, however you can avoid this by setting `execute` to `false` for the range query.

| <p style="margin: 0px;" class="table-header-text">Type</p>   |<p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/Uq1kQp0dC1eB2D4ehD4d"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enableSynonyms

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to control (enable/disable) the synonyms behavior for a particular query. Defaults to `true`, if set to `false` then fields having `.synonyms` suffix will not affect the query.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/6YWIIPkZ8Sc0VZYfToeC"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### selectAllLabel

**Supported Engines**
elasticsearch, mongodb, opensearch

This property allows you to add a new property in the list with a particular value in such a way that when selected i.e `value` is similar/contains to that label(`selectAllLabel`) then `term` query will make sure that the `field` exists in the `results`.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `term`                      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/IxdVjictTpVDIxUyMx8s"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### pagination

**Supported Engines**
elasticsearch, mongodb, opensearch

This property allows you to implement the `pagination` for `term` type of queries. If `pagination` is set to `true` then appbase will use the [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html) of Elasticsearch instead of [terms aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `bool` | `term`                     | false    |

> Note:
> 1. Sort by as `count` doesn\'t work with composite aggregations i.e when `pagination` is set to `true`.
> 2. The [missingLabel](/docs/search/reactivesearch-api/reference/#missinglabel) property also won\'t work when composite aggregations have been used.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/9HR0pRcDet8VnWJDmJHG"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### queryString

**Supported Engines**
elasticsearch, mongodb, opensearch

Defaults to `false`. If set to `true` than it allows you to create a complex search that includes wildcard characters, searches across multiple fields, and more. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

> Note: If both properties `searchOperators` and `queryString` are set to `true` then `queryString` will have the priority over `searchOperators`.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/9CrNp0tW637cU2dMKEDQ"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### index

**Supported Engines**
elasticsearch, mongodb, opensearch

The `index` property can be used to explicitly specify an `index` for a particular query. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `index` path variable defined in the URL.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |


Let\'s take this example to see how this works:

```
URL: /my-index/_reactivesearch.v3

Body:
{
	"query": [
	  {
		 "id": "search",
		 "type": "search",
		 ...
	  },
	  {
		 "id": "facet",
		 "type": "term",
		 "index": "optimized-facet-index"
	  }
	]
}
```

Here, the first query uses the `my-index` index to query against, as specified in the request URL. However, the second query will use the `optimized-facet-index` index as specified by the `index` key in it.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/3Jd1QQg1hFoQyg7wwpCi"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enablePopularSuggestions

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

When set to `true`, popular searches based on aggregate end-user data are returned as suggestions as per the popular suggestions config (either defaults, or as set through [popularSuggestionsConfig](/docs/search/reactivesearch-api/reference/#popularsuggestionsconfig) or via Popular Suggestions settings in the control plane)

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

## settings

**Supported Engines**
Not dependent on engine, works for all.

## metadata

**Supported Engines**
Not dependent on engine, works for all.

