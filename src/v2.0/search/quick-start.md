{"threeColumns": false}
# Searching for a better Search?

Building a good quality full-text search experience for an app is a hard problem if your data resides in traditional RDBMS systems. Even database systems like MongoDB have very nascent support for search, others like DynamoDB offer no support. The hard, real fact is that these systems are not designed with search as a use-case, and one is left with a very rudimentary support like exact search match, or in the worst case scenario, even scanning the DB tables.

While there are great tools available for search, like Apache Solr and Elasticsearch, they have two big problems:  
1. It is not recommended to use ElasticSearch as a primary data store. So you are still stuck with the problem of streaming data from your primary store to a search database like ES.  
2. The documentation is intimidating. Really, it seems the docs are made for rocket scientists rather than your average app developer!

We have thought about the **Search** problem really hard, and have come up with an elegant solution.

## Our Approach to Search

Appbase takes the search problem head-on and indexes all the data that is ever stored in Appbase, allowing searching on all the data and relationships. We provide the ability to do the following kind of queries:  
1. Full-text search - including [simple match queries](http://docs.appbase.io/docs/elasticsearch.html#-searching-simple-match) and [fuzzy search queries](http://docs.appbase.io/docs/elasticsearch.html#-searching-fuzzy),  
2. [Numeric-range queries](http://docs.appbase.io/docs/elasticsearch.html#-searching-numeric-range) - when you want answers to "Give me all the products that cost between $50 and $100" or "fetch all pages from 5 to 10",  
3. [Geo spatial queries](http://docs.appbase.io/docs/elasticsearch.html#-searching-geo-spatial) - ElasticSearch offers a lot of Geo Spatial queries. To name a few, you can compare distances, get a bounding box, determine shape,  
4. [Sort queries](http://docs.appbase.io/docs/elasticsearch.html#-searching-sorting) - sort queries are more like filters to arrange data returned by one of above queries. You can sort the data using multiple "property" parameters.

With [Aggregation](http://docs.appbase.io/docs/elasticsearch.html#-searching-aggregation) and [Combining queries](http://docs.appbase.io/docs/elasticsearch.html#-searching-combining-queries-filters), the possibilities are endless.

Here's a primer to leverage these powerful search queries broken into three steps.

### 1. Create an App


Log into <span class="fa fa-external-link"></span>[Appbase Dashboard](https://appbase.io/developer/), and create a new app. Once you create an app with a desired name, you should see an app dialog box appear as below.

![App credentials](http://i.imgur.com/LBjXQQT.png)  
**Image 1**: App name, credentials, and access controls  

We will need the `app name` and the `secret` in all our API calls. In this case, these would be *my_app9* and *097b2b28b6a13cf2e53b6cecfec42b86*. We **trust you** with our app's secret!

### 2. Put some Data

Appbase works with JSON data. You can store JSON objects with Appbase directly, they would form Appbase vertices (similar to MongoDB documents, or RDBMS records). We can make search requests on all the vertices, or a set of vertices via a JSON based query format (using ElasticSearch's DSL).

For brevity, let's suppose we are storing user profiles and would like to later search them by different properties. Here's how a JSON user object might look: 

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

To store this data with Appbase, we will make a *PATCH* request via REST. You can read more about them in our [REST API](http://docs.appbase.io/docs/rest.html#api-reference-vertex-property-create-update-vertex-properties). Here's how the request would like in our case:

```curl
curl --include \
     --request PATCH \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 097b2b28b6a13cf2e53b6cecfec42b86" \
     --data-binary '    {
        "data": {
	        "name": "Laura Vieria",
	        "sex": "F",
	        "city": "Rio de Janeiro",
	        "country": "Brazil",
	        "occupation": "Graphic Designer",
	        "email": "laura@awesomedesigner.com"
        }
    }' \
'https://api.appbase.io/my_app9/v2/people/laura/~properties'
```

When you copy the above code, be sure to replace the `Appbase-Secret` header and the `app name` in the URL to your credentials.

> *Understanding the Request*
>  
> To store data, we do a __PATCH__ request.
>
- URL: https://api.appbase.io/my_app9/v2/people/laura/~properties, where
>
 - `https://api.appbase.io` - Appbase REST API base URL
 - `my_app9` - name of your app as shown in the dashboard
 - `v2` - the current Appbase REST API version (`v2` for all API requests)
 - `people` - the namespace identifer (An Appbase namespace is similar to a collection in MongoDB, or a table in RDBMS)
 - `laura` - the vertex identifier (An Appbase vertex is similar to a document ID in MongoDB, or a primary key inside RDBMS)
 - `~properties` - the resource endpoint for the vertex `laura` to patch (depending on the operation, this could be either `~properties`, `~edges`, `~search`, etc.)
>
>- Headers
Headers in this request include the `Appbase-Secret` value and `Content-Type` as JSON.


### 3. Perform Search on Data

Now that we have successfully stored data, let's perform a full-text search.

Before that, just a small setup in the dashboard to enable search. 

![Select "Data Browser" View](http://i.imgur.com/LBjXQQT.png)  
**Image 2**: Select the "Data Browser" view (3rd option).

![Enable Search View](http://i.imgur.com/dUBq2fw.png)  
**Image 3**: Ensure search is enabled on the "people" namespace.

Inside the databrowser view, enable **Search**. The eye icon should appear <span style="color:green;">green</span>, once the search is enabled.

Now we are all set to perform a "search" query. Let's search for users whose occupation is being a _designer_.

```
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Appbase-Secret: 097b2b28b6a13cf2e53b6cecfec42b86" \
     --data-binary '    {
        "query": {
            "text": "designer",
            "properties":["occupation"]
        }
    }' \
'https://api.appbase.io/my_app9/v2/people/~search'
```

The response that you get from Appbase is an array of JSON objects which match the criteria.

Response: 
```json
[
	{
		"_id": "people`54bdde2b1e8cc2334ad5800f",
		"timestamp": 1421729323073,
		"rootPath": "people/laura",
		"occupation": "Graphic Designer",
		"sex": "F",
		"email": "laura@awesomedesigner.com",
		"name": "Laura Vieria",
		"country": "Brazil",
		"city": "Rio de Janeiro"
	}
]
```

There you go! Appbase's search fetches results which are close to the search term, and you get the following object in response.

> *Understanding the Request* 
> 
> To perform a search, we do a __POST__ request.
>
- URL: https://api.appbase.io/my_app9/v2/people/~search, where
>
 - `https://api.appbase.io` - Appbase REST API base URL
 - `my_app9` - name of your app as shown in the dashboard
 - `v2` - the current Appbase REST API version (`v2` for all API requests)
 - `people` - the namespace identifer (An Appbase namespace is similar to a collection in MongoDB, or a table in RDBMS)
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
		"text": "designer",
		"properties": ["occupation"]
	}
}
>```
>  - `text`: The search query string
>  - `properties`: The list of the properties whose value should match the search string

That's it! In less than 10 minutes, we were able to add production grade search in your app.


## Next Steps

Do you want to customize the 'fuzziness' of your search? Or perhaps apply multiple queries and filter the data at the same time. If this has whetted your appetite, check out our main "search" course on the [ElasticSearch documentation](http://docs.appbase.io/#/v2.0/search/use-cases).
