---
title: 'Importing through ABC CLI'
meta_title: 'Appbase - abc import'
meta_description: 'abc import: Import Your MongoDB, SQL, JSON, CSV Data Into Elasticsearch.'
keywords:
    - dataschema
    - appbase
    - abc
    - elasticsearch
sidebar: 'docs'
---

`abc import` is part of [abc](https://github.com/appbaseio/abc) — A tool that allows accessing appbase.io via a commandline.

##Key Benefits

-   Whether your data resides in Postgres or a JSON file or MongoDB or in all three places, **abc** can index the data into Elasticsearch. It is the only tool that allows working with all these sources at once or individually: `csv`, `json`, `postgres`, `mysql`, `sqlserver`, `mongodb`, `elasticsearch` and `firestore`.
-   It can keep the Elasticsearch index synced in realtime with the data source.
    > Note: This is currently only supported for MongoDB and Postgres.
-   `abc import` is a single line command that allows doing all of the above. It doesn’t require any external dependencies, takes zero lines of code configuration, and runs as an isolated process with a minimal resource footprint.

## Installation

> Command Line: `docker pull appbaseio/abc`

You can also download from [GitHub](https://github.com/appbaseio/abc/releases/latest) or get the [Docker image](https://hub.docker.com/r/appbaseio/abc/)

## Importing from various sources

###Postgres

```bash
abc import --src_type=postgres --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-postgres-to-elasticsearch-6eebc5cc0f0f)

###MongoDB

```bash
abc import --src_type=mongodb --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-mongodb-to-elasticsearch-ee5a74695945)

###MySQL

```bash
abc import --src_type=mysql --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-mysql-to-elasticsearch-b59289e5025d)

###Microsoft SQL Server

```bash
abc import --src_type=mssql --src_uri=<uri> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-mssql-to-elasticsearch-341963a054dd)

###Elasticsearch

```bash
abc import --src_type=elasticsearch --src_uri=<elasticsearch_src_uri> <elasticsearch_dest_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-elasticsearch-to-elasticsearch-301c7a243c84)

###JSON

```bash
abc import --src_type=json --src_uri=<uri> --typename=<target_type_name> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-json-to-elasticsearch-92f582c53df4)

###CSV

```bash
abc import --src_type=csv --src_uri=<uri> --typename=<target_type_name> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-data-from-csv-to-elasticsearch-17d290a5974f)

###Firestore

```bash
abc import --src_type=firestore --sac_path=<path_to_service_account_credentials> <elasticsearch_uri>
```

Read more about it [here](https://medium.appbase.io/cli-for-indexing-from-firestore-to-elasticsearch-80286fc8e58b)
