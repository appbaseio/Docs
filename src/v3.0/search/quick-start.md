{"threeColumns": false}
# Searching for a better Search?

Building a good quality full-text search experience for an app is a hard problem if your data resides in traditional RDBMS systems. Even database systems like MongoDB have very nascent support for search, others like DynamoDB offer no support. The hard, real fact is that these systems are not designed with search as a use-case, and one is left with a very rudimentary support like exact search match, or in the worst case scenario, even scanning the DB tables.

While there are great tools available for search, like Apache Solr and Elasticsearch, they have two big problems:  
1. It is not recommended to use ElasticSearch as a primary data store. So you are still stuck with the problem of streaming data from your primary store to a search database like ES.  
2. The documentation is intimidating. Really, it seems the docs are made for rocket scientists rather than your average app developer!

We have thought about the **Search** problem really hard, and have come up with an elegant solution.

## Our Approach to Search

Appbase takes the search problem head-on and indexes all the data that is ever stored in Appbase, allowing searching on all the data and relationships. We provide the ability to do the following kind of queries:  
1. Full-text search - including [simple match queries](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-simple-match) and [fuzzy search queries](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-fuzzy),  
2. [Numeric-range queries](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-numeric-range) - when you want answers to "Give me all the products that cost between $50 and $100" or "fetch all pages from 5 to 10",  
3. [Geo spatial queries](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-geo-spatial) - ElasticSearch offers a lot of Geo Spatial queries. To name a few, you can compare distances, get a bounding box, determine shape,  
4. [Sort queries](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-sorting) - sort queries are more like filters to arrange data returned by one of above queries. You can sort the data using multiple "property" parameters.

With [Aggregation](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-aggregation) and [Combining queries](http://docs.appbase.io/#/v3.0/search/use-cases#use-cases-searching-combining-queriesfilters), the possibilities are endless.

Here's a primer to leverage these powerful search queries broken into three steps.

### 1. Create an App


Log into <span class="fa fa-external-link"></span>[Appbase Dashboard](https://appbase.io/developer/), and create a new app. Once you create an app with a desired name, you should see an app dialog box appear as below.

![App credentials](https://dl.dropboxusercontent.com/spa/q0230upf0vj6xe0/snvrcs_y.png)  
**Image 1**: App name, stats and credentials

Click the ![Icon](https://dl.dropboxusercontent.com/spa/q0230upf0vj6xe0/jf22g2ed.png) icon to copy your secret into clipboard.

We will need the `app name` and the `secret` in all our API calls. In this case, these would be *my_app9* and *097b2b28b6a13cf2e53b6cecfec42b86*. We **trust you** with our app's secret!

### 2. Store some Data

Appbase supports the document data model. You can store JSON objects (known as documents) with Appbase directly (similar to MongoDB documents, or RDBMS records). The documents are stored within a collection. Appbase supports a granular search which typically works on a collection. The search is based on the [ElasticSearch DSL](http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl.html), and supports the entire query format.

For brevity, let's say we are storing user profiles that we would like to later search by different document properties. Here's how a JSON user object might look:

```json
{
	"name": "Laura Vieria",
	"sex": "F",
	"city": "Rio de Janeiro",
	"country": "Brazil",
	"occupation": "Graphic Designer",
	"email": "laura@awesomedesigner.com"
}
```

To store this data with Appbase, we will make a *PATCH* request via REST. You can read more about them in our [REST API](http://docs.appbase.io/#/v3.0/rest/api-reference#api-reference-document-properties-create-update-document-properties). Here's how the request would like in our case:

```curl
curl -X PATCH -H "Appbase-Secret: 097b2b28b6a13cf2e53b6cecfec42b86" \
     -d '{
        "name": "Laura Vieria",
        "sex": "F",
        "city": "Rio de Janeiro",
        "country": "Brazil",
        "occupation": "Graphic Designer",
        "email": "laura@awesomedesigner.com"
     }' \
'https://v3.api.appbase.io/my_app9/people/laura/~properties'
```

When you copy the above code, be sure to replace the `Appbase-Secret` header and the `app name` in the URL to match your credentials.

> *Understanding the Request*
>  
> To store data, we do a __PATCH__ request.
>
- URL: https://v3.api.appbase.io/my_app9/people/laura/~properties, where
>
 - `https://v3.api.appbase.io` - Appbase REST API base URL prefixed with the API version (``v3``)
 - `my_app9` - name of your app as shown in the dashboard
 - `people` - the collection identifer
 - `laura` - the document identifier
 - `~properties` - the resource endpoint for the vertex `laura` to patch (depending on the operation, this could be either `~properties`, `~references`, `~search`, etc.)
>
>- Headers  
Headers in this request include the `Appbase-Secret` value.


### 3. Perform Search on Data

Now that we have successfully stored data, let's perform a full-text search.

Let's search for users whose occupation is being a _designer_.

```
curl -X POST -H "Appbase-Secret: 097b2b28b6a13cf2e53b6cecfec42b86" \
     -d '{
        "query": {
            "multi_match": {
                "fields": ["occupation"],
                "query": "designer"
            }
        }
    }' \
'https://v3.api.appbase.io/my_app9/people/~search'
```

The response that you get from Appbase is an array of JSON objects which match the query criteria.

Response:
```json
{
    "took":7,
    "timed_out":false,
    "_shards": {
    	"total":5,
    	"successful":5,
    	"failed":0
    },
    "hits": {
    	"total":1,
    	"max_score":0.19178301,
    	"hits":[
    		{
    			"_index":"my_app9",
    			"_type":"people",
    			"_id":"54bdde2b1e8cc2334ad5800f",
    			"_score":0.19178301,
    			"_source": {
    				"name":"Laura Vieria",
    				"sex":"F",
    				"city":"Rio de Janeiro",
    				"country":"Brazil",
    				"occupation":"Graphic Designer",
    				"email":"laura@awesomedesigner.com",
    				"timestamp":1428266902727,
    				"rootPath":"people/laura"
    			}
    		}
    	]
    }
}
```

There you go! Appbase's search fetches results which are close to the search term, and you get the following object in response.

> *Understanding the Request*
>
> To perform a search, we do a __POST__ request.
>
- URL: https://v3.api.appbase.io/my_app9v/people/~search, where
>
 - `https://v3.api.appbase.io` - Appbase REST API base URL (``v3`` for all API requests)
 - `my_app9` - name of your app as shown in the dashboard
 - `people` - the collection identifer
 - `~search` - the resource endpoint indicating our query intent (`search` in this case, and `properties` in the previous step).
>
>- Request Headers  
Headers are always the same for all REST API requests.
>
>- Request Body  
>The JSON query object that we send with this request:
>```json
{
	"query": {
            "multi_match": {
                "fields": ["occupation"],
                "query": "designer"
            }
        }
}
>```
>  - `query`: The search query string
>  - `fields`: The list of fields to match the **query** against.

That's it! In less than 10 minutes, we were able to add production grade search in your app.


## Full text and more

Do you want to customize the 'fuzziness' of your search? Or perhaps apply multiple queries and filter the data at the same time. If this has whetted your appetite, check out our main article over here. [Search Usecases](http://docs.appbase.io/#/v3.0/search/use-cases).
