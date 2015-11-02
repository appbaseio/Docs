{"bigh3":true}

something

# How to

## Update mapping without losing data

Although you can add new types to an index, or add new fields to a type, you can’t add new analyzers or make changes to existing fields. If you were to do so, the data that had already been indexed would be incorrect and your searches would no longer work as expected. Here's a short gist on how mappings work:

In order to make your data searchable, your database needs to know what type of data each field contains and how it should be indexed. If you switch a field type from e.g. a string to a date, all of the data for that field that you already have indexed cannot be used because of the datatype mismatch. In such situations, you need to reindex that field.

> This applies not just to Appbase (or Elasticsearch / Lucene - the datastore used by Appbase), but to any database that uses indices for searching. And if it isn't using indices then it is sacrificing speed for flexibility.

There is one situation where re-indexing is not required: when adding a field, as a previous mapping for the field didn't exist and Appbase can infer the field datatype when it's indexed for the first time.

Since updating mapping => reindexing data, let's take a look at that.

### Reindexing your data  

The process for reindexing your data is quite simple. First, create a new app in appbase and update the new mapping and settings:  

	//Close the Index
	curl -XPOST https://$user:$pass@scalr.api.appbase.io/new_app/_close
	// Update the Settings
	curl -XPUT https://$user:$pass@scalr.api.appbase.io/new_app/_setting -d '
	{
	    ... new setting definition ...  
	}'
	// Open the Index
	curl -XPOST https://$user:$pass@scalr.api.appbase.io/new_app/_open	
	
	// Update the Mapping
	curl -XPUT https://$user:$pass@scalr.api.appbase.io/new_app/_mapping/new_type -d '
	{
	     "new_type" : {
			... new mapping definition ...	
	    }
	}'

One of the advantages of the _source field is that you already have the whole document available to you in Elasticsearch itself. You don’t have to rebuild your index from the database, which is usually much slower.

To reindex all of the documents from the old index efficiently, use [scan-and-scroll](https://www.elastic.co/guide/en/elasticsearch/guide/current/scan-scroll.html) to retrieve batches of documents from the old index, and the [bulk API](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-writing-data-bulk) to push them into the new index.

### Reindexing in Batches  

You can run multiple reindexing jobs at the same time, but you obviously don’t want their results to overlap. Instead, break a big reindex down into smaller jobs by filtering on a date or timestamp field:  

	GET https://$user:$pass@scalr.api.appbase.io/old_app/_search?search_type=scan&scroll=1m
	{
	    "query": {
	        "range": {
	            "date": {
	                "gte":  "2015-01-01",
	                "lt":   "2015-02-01"
	            }
	        }
	    },
	    "size":  1000
	}
If you continue making changes to the old app, you will want to make sure that you include the newly added documents in your new app as well. This can be done by rerunning the reindex process, but again filtering on a date field to match only documents that have been added since the last reindex process started.

Reference: [Elastic Search blog](https://www.elastic.co/blog/changing-mapping-with-zero-downtime)
