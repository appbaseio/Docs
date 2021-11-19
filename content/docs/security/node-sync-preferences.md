---
title: 'Node Sync Preferences'
meta_title: 'Node Sync Preferences for appbase.io'
meta_description: 'Node Sync Preferences allow configuring how frequently syncing of preferences happen to each node of appbase.io from the upstream Elasticsearch.'
keywords:
    - concepts
    - appbaseio
    - sync preferences
    - api
sidebar: 'docs'
---

Node Sync Preferences allow configuring how frequently syncing of preferences happen to each node of appbase.io from the upstream Elasticsearch.

### Overview

When appbase.io is run in a multi-node setup, it's important to have user credentials, API credentials and plugin preferences updated on each node of appbase.io.

With a single node setup, this is easy. A request for a preference update happens on the node and is updated in realtime.

Sync preferences come into play with a multi-node setup. When a node receives a preference update, it saves this preference into a system index in the upstream Elasticsearch cluster. Depending on the configured sync interval, each node queries the upstream Elasticsearch cluster for the latest preferences and syncs them.

#### Sync Interval

Sync Interval defaults to 60s. It can configured to intervals between 10s to 3,600s (aka 1h). We don't allow these values to be below 10s to prevent any significant impact on Elasticsearch cluster resources.
