{"title": "SCALR API 101", "threeColumns": false}

# ![SCALR](http://i.imgur.com/Eppz2lz.png?1) API Prime Objective: Scale

As the name suggests, our prime focus with this iteration of the API has been achieving a massive scale of API operations, to the tune of [100,000 writes](http://news.appbase.io/scaling-elasticsearch-writes/) and reads (yet to corroborate) per second. 

You might wonder - why is addressing scale so important? A typical successful application would never exceed a throughput of a  few hundred requests per second and generally be okay with serving responses in time.

> So much complexity in software comes from trying to make one thing do two things.  
-Ryan Singer

This quote from Ryan Singer especially sings true when one thinks of scaling database operations. So much of the software service complexities stem from keeping up with the infrastructure needs, that those end up turning into burning pain points. It should come as no surprise that most mainstream distributed systems were born out of the scaling pain points faced by the 0.01% of applications.

Not only does addressing scale solve the burning pain points faced by the 0.01%, it provides confidence around the edge-cases and leads to faster adoption in production environments and success stories. We hope all of these come true for SCALR. In building SCALR, focusing on scale has lead us to a better foundational design, a more rigorously tested codebase, and a fine-grained monitoring of our deployment infrastructure. We'll go more in depth about these learnings over the next few months, but most importantly - for the 99.9% folks reading this, ``SCALR`` has tons of improvements and features over ``v2``.

# git diff changes - -  human

Welcome to the land of SCALR, where everyone smiles and the sun shines bright. 

![SCALR banner image](http://i.imgur.com/3nYaIQM.png?1)

Our beloved Hobo Lobo is chalking a 'SCALR' 101. 

> "changes what?", asks someone.  
"Everything", says Hobo Lobo rather curtly.

## ``SCALR`` - What's in a name

The most tangible change is in the codename - ``scalr``. Breaking the convention of keeping a dull version name like ``v2.0``, we will go with the version ``scalr``. Docs for scalr are available at [http://docs.appbase.io/]() and the API base URL would be ``https://scalr.api.appbase.io``.

## Compatibility with ElasticSearch

``scalr`` is compatible out of the box with the ElasticSearch APIs. This means our users can take advantage of the vast plethora of client libraries made available by the folks at Elastic, have access to a vibrant open-source community and have the freedom to import / export data from Appbase.io conveniently. 

### HTTP Basic Authentication

``scalr`` uses HTTP Basic Authentication for securing app access (similar to Github and Wordpress's authentication mechanisms). Every Appbase app can have one or more access tokens (username, password) with differing read and write permissions to allow fine-grained access. ElasticSearch's access tokens work in the same way, a major compatibility win.

> Note: This is a change from the earlier use of authentication header called ``Appbase-Secret``.

### What's not compatible?

The APIs related to devops, like clusters, multi-index operations, index creation are not a part of Appbase.io. Appbase is opinionated about devops.
                        
## Data Streams 2.0

Data Streams aka realtime events are rethought in ``SCALR``. Instead of being a websockets based extension of the API to track just the document and reference changes, data streams are deeply baked into the ``SCALR`` API. Data Streams are implemented over both **websockets** (for browsers) and **http-streaming** (for other runtimes) and are pervasive over web, mobile and language native libraries. Data Streams can stream results of queries and filters as new data comes into the system.

## Adieu to Graph datamodel

``SCALR`` the JSON based schema-free datamodel of ElasticSearch. This is a major change over the graph datamodel extensively used by the ``v2`` API. The move is aimed at simplicity and to provide a less opinionated data model. True graph relationships can still be modeled in ``SCALR``.
