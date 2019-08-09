---
id: clusters 
title: Clusters
layout: docs
sectionid: clusters
permalink: concepts/clusters.html
prev: search-template.html
prevTitle: "Search Template"
next: open-distro.html
nextTitle: "Open Distro for Elasticsearch"
---

Now you can host your own dedicated Elasticsearch clusters to meet your business needs using [appbase.io](https://appbase.io/clusters/) clusters. It allows you to fully manage and scale your elasticsearch clusters using [kubernetes](https://kubernetes.io/). You can Visualize with Kibana and choose from addons available in Elasticsearch ecosystem. Along Elasticsearch addons you can leverage other appbase.io features like [Realtime Search](https://appbase.io/usecases/realtime-search/), [Data browser](/concepts/databrowser.html), [Search Preview](/concepts/search-preview.html), [Analytics](/concepts/analytics.html), [Mappings](/concepts/mappings), [Security](concepts/api-credentials.html)

## Getting started

* Login to [appbase.io dashbaord](https://dashboard.appbase.io/)
  <br/><br/>
   <div style="border: 1px solid #dfdfdf; border-radius: 5px;overflow:hidden"><img src="https://www.dropbox.com/s/m8my8lq3keju99c/Screenshot%202019-08-08%2015.57.03.png?raw=1" alt="cluster creation gif" style="width:100%;" /></div>
* Go to cluster pages and click [Create New Cluster](https://dashboard.appbase.io/clusters/new) and enter the following details

  * Select Cluster Pricing Plans. For more details about pricing please check `Pricing` section of [clusters page](https://appbase.io/clusters/)

  * Select Provider and Region where you would like to host your cluster. Currently we offer hosting clusters on [Google Cloud Platform](https://cloud.google.com/) and [Microsoft Azure](https://azure.microsoft.com/en-in/)

  * Input the desired name for cluster

  * Select Elasticsearch version. Along with version selection you can also enable deployment of various addons features like Kibana, Appbase Dashboard for Clusters, Realtime Streaming and Elasticsearch HQ

  * Select the plugins to be installed that are available as part of Elasticsearch ecosystem
    <br/><br/>
    <div style="border: 1px solid #dfdfdf; border-radius: 5px;overflow:hidden"><img src="https://www.dropbox.com/s/08cb5r4qcnj35x3/cluster_original.gif?raw=1" alt="cluster creation gif" style="width:100%;" /></div>

## Tracking Deployment Status

It takes around 15-30 minutes to initialize cluster and deploy elasticsearch with all the selected configurations. There is a status tag next to cluster name on your cluster dashboard, which will help you know the status of deployment

<div style="border: 1px solid #dfdfdf; border-radius: 5px;overflow:hidden;margin-top:10px;"><img src="https://www.dropbox.com/s/hm0lqxllzwe50kk/Screenshot%202019-08-08%2018.37.08.png?raw=1" alt="cluster creation gif" style="width:100%;" /></div>

Once the cluster is created and elasticsearch is deployed successfully, you will be able to **View Details** of the cluster, where you might see some messages which specifies that other addon deployments are still in progress. For accessing all features successfully, you can wait till all the deployment messages are gone 😊

<div style="border: 1px solid #dfdfdf; border-radius: 5px;overflow:hidden;margin-top:10px;"><img src="https://www.dropbox.com/s/mw5sg478mtwwg9q/Screenshot%202019-08-08%2018.44.26.png?raw=1" alt="cluster creation gif" style="width:100%;" /></div>

## Accessing Kubernetes Dashboard

Once the cluster is initialized and kubernetes dashboard is deployed you can access that dashboard to manage your elasticsearch clusters and deployment. This also allows you to manage and change various configurations of elasticsearch

<div style="border: 1px solid #dfdfdf; border-radius: 5px;overflow:hidden;margin-top:10px;"><img src="https://www.dropbox.com/s/g77abqqtxf7a7s7/Screenshot%202019-08-08%2018.44.43.png?raw=1" alt="cluster creation gif" style="width:100%;" /></div>

For more information on how kubernetes system works and how resources are managed you can check [kubernetes Documentation](https://kubernetes.io/docs/home/)

## Scaling Cluster

At any given point you can scale the cluster by adding/removing elasticsearch nodes based on the traffic/data that you are storing in elasticsearch

<div style="border: 1px solid #dfdfdf; border-radius: 5px;overflow:hidden;margin-top:10px;"><img src="https://www.dropbox.com/s/bm2ohlvwlu7ez6y/Screenshot%202019-08-08%2018.48.58.png?raw=1" alt="cluster creation gif" style="width:100%;" /></div>
