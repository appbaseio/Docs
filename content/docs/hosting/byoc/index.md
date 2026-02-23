---
title: 'Bring Your Own Cluster'
meta_title: 'Bring Your Own Cluster - ReactiveSearch'
meta_description: 'Run ReactiveSearch in Open Source mode with Docker alongside your own Elasticsearch or OpenSearch cluster'
keywords:
    - clusters
    - appbaseio
    - appbase
    - Elasticsearch
    - Opensearch
    - docker
    - open source
sidebar: 'docs'
redirect_to: '/docs/hosting/open-source/'
---

This page has moved. Please visit the [Open Source Deployment](/docs/hosting/open-source/) guide.

ReactiveSearch is available in Open Source mode as a Docker-based deployment. Run it alongside any Elasticsearch-compatible cluster you manage — whether that's AWS OpenSearch, Elastic Cloud, or a self-hosted Elasticsearch/OpenSearch instance.

![](https://i.imgur.com/QjBkE7R.png)

This diagram highlights how reactivesearch.io works. It directly interacts with an underlying Elasticsearch cluster and acts as an API gateway for clients to interact with. reactivesearch.io supercharges your Elasticsearch cluster with a streamlined development experience, out of the box search analytics and fine-grained security features.

## Quickstart

### Using Docker

Run reactivesearch.io via a single [docker compose file](https://github.com/appbaseio/arc-dockerized/blob/master/docker-compose-with-elasticsearch.yaml). This setup enables you to run reactivesearch.io and Elasticsearch together with single command, i.e. `docker-compose up -d`. 😎

The dockerized setup is composed of the following services:

#### reactivesearch.io

Allows you to access all reactivesearch.io features like search preview, actionable analytics and granular security with any Elasticsearch cluster hosted anywhere.

> **Note:** Make sure your reactivesearch.io container has complete access to Elasticsearch. You can use Elasticsearch URL with Basic Auth in configuring dashboard or IP restricted Elasticsearch URL where IP of your reactivesearch.io cluster hosted using docker setup is white listed.

#### Configure

This service comes with simple user interface which allows you to set credentials and other environment variables. Also it watches for environment variable file changes: if any variable in the file is changed, it can hot-reload the reactivesearch.io service.

#### Nginx

This service helps in setting up reverse proxy for reactivesearch.io Service and serving Configuration service. It also helps in serving data using with TLS certificate, which is recommended for production.

#### Elasticsearch

An open-source single-node Elasticsearch cluster is run. This is optional: You can use the [docker compose file here](https://github.com/appbaseio/arc-dockerized/blob/master/docker-compose.yaml) to run without Elasticsearch.


The steps described here assumes that you have [Docker](https://docs.docker.com/install/) already installed on your system.

-   **Step 1:** Clone the repository

    ```bash
    git clone https://github.com/appbaseio/arc-dockerized.git && cd arc-dockerized
    ```

-   **Step 2:** Build and run docker containers

    We highly recommend using reactivesearch.io with [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) so that we can easily bind this with the reactivesearch.io Dashboard. To simplify the process of docker build, test and deployment, we have created 2 versions:

    1 - **Install reactivesearch.io + Nginx with TLS setup _(Recommended for production)_**

    -   Change [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) certificate and keys with production files. Please obtain [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) certificate and key for your domain using [Let's Encrypt](https://letsencrypt.org/) or any other provider. Update the files in [nginx/certs](https://github.com/appbaseio/arc-dockerized/tree/master/nginx/certs).
    -   In case you are using different name than mentioned in [nginx/certs](https://github.com/appbaseio/arc-dockerized/tree/master/nginx/certs) folder, please update them in the `docker-compose.yaml` file as well.

    ![](https://i.imgur.com/piUKTLl.png)

    Also, make sure you update the file names in the [nginx/default.conf](https://github.com/appbaseio/arc-dockerized/blob/master/nginx/default.conf) file.

    ![](https://i.imgur.com/LW8zOyB.png)

    ```bash
    docker-compose up -d
    ```

    2 - **Install reactivesearch.io + Elasticsearch (If you want to deploy reactivesearch.io Along with Elasticsearch.)**

    ```
    docker-compose -f docker-compose-with-elasticsearch.yaml up -d
    ```

    🔥 Thats all, our containers should be up and running. Next, let us configure the environment variables required by reactivesearch.io service.

-   **Step 3:** Open configuration service URL in your browser, i.e. http://localhost (or https://your-domain.com as configured in your nginx settings).

    > **Note:** If you are running this setup on an virtual machine, make sure ports `80` and `443` are set in your inbound rules for the cluster.

-   **Step 4:** Set username and password credentials.

-   **Step 5:** Configure the Elasticsearch URL.

    > **Note:** Once you save the configuration, it may take 5-10s to restart the reactivesearch.io service.

-   **Step 6:** Start using reactivesearch.io services via the Dashboard at http(s)://localhost_OR_cluster_url. Enter the username and password values that you configured in _Step 4_.

