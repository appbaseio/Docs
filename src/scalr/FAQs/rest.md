{"bigh3":true}

# How to

## Update mapping without losing data

We are often asked to update the mapping for a particular field. A mapping is assigned once the data is indexed. Here's a short gist on how mappings work:

In order to make your data searchable, your database needs to know what type of data each field contains and how it should be indexed. If you switch a field type from e.g. a string to a date, all of the data for that field that you already have indexed cannot be used because of the datatype mismatch. In such situations, you need to reindex that field.

> This applies not just to Appbase (or Elasticsearch / Lucene - the datastore used by Appbase), but to any database that uses indices for searching. And if it isn't using indices then it is sacrificing speed for flexibility.

There is one situation where re-indexing is not required: when adding a field, as a previous mapping for the field didn't exist and Appbase can infer the field datatype when it's indexed for the first time.

Since updating mapping => reindexing data, let's take a look at that.

**Reindexing your data**    
The process for reindexing your data is quite simple. First, create a new app in appbase and update the new mapping and settings:

	curl -XPUT https://$user:$pass@scalr.api.appbase.io/new_app/_mapping/new_type -d '
	{
	     "new_type" : {
		... new mapping definition ...	
	    }
	}'

Then, pull the documents in from your old index, using a scrolled search and index them into the new index using the bulk API. Many of the client APIs provide a reindex() method which will do all of this for you. Once you are done, you can delete the old index.

Note: make sure that you include search_type=scan in your search request. This disables sorting and makes “deep paging" efficient.

The problem with this approach is that the index name changes, which means that you need to change your application to use the new index name

**Reindexing your data with zero downtime**    
Index aliases give us the flexibility to reindex data in the background, making the change completely transparent to our application. An alias is like a symbolic link which can point to one or more real indices.

The typical workflow is as follows. First, create an index, appending a version or timestamp to the name:

  curl -XPUT localhost:9200/my_index_v1 -d '
  { 
	    ... mappings ... 
	}'

Create an alias which points to the index:

    curl -XPOST localhost:9200/_aliases -d '
    {
        "actions": [
            { "add": {
                "alias": "my_index",
                "index": "my_index_v1"
            }}
        ]
    }'

Now your application can speak to my_index as if it were a real index.

When you need to reindex your data, you can create a new index, appending a new version number:

    curl -XPUT localhost:9200/my_index_v2 -d '
    { 
	    ... mappings ...
	}'

Reindex data from my_index_v1 to the new my_index_v2, then change the myindex alias to point to the new index, in a single atomic step:

    curl -XPOST localhost:9200/_aliases -d '
    {
        "actions": [
            { "remove": {
                "alias": "my_index",
                "index": "my_index_v1"
            }},
            { "add": {
                "alias": "my_index",
                "index": "my_index_v2"
            }}
        ]
    }'

And finally, delete the old index:

    curl -XDELETE localhost:9200/my_index_v1

You have successfully reindexed all of your data in the background without any downtime. Your application is blissfully unaware that the index has changed.

Reference: [Elastic Search blog](https://www.elastic.co/blog/changing-mapping-with-zero-downtime)
