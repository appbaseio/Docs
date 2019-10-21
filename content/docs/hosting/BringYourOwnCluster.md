---
title: 'Bring Your Own Cluster'
meta_title: 'Bring Your Own Cluster'
meta_description: 'It allows you to deploy Appbase.io services for your ElasticSearch hosted with other providers like aws, Elastic Cloud.'
keywords:
    - clusters
    - appbaseio
    - appbase
    - ElasticSearch
sidebar: 'docs'
---

Already have ElasticSearch hosted with AWS, Elastic Cloud or any other provider?
No worries, get access to all the [Appbase.io](https://arc-site.netlify.com) features like [data management](/docs/data/Model/), [enterprise grade security](/docs/security/Credentials/) and [analytics](/docs/analytics/Overview/) out of the box using [Arc](https://arc-site.netlify.com). Arc is a simple, modular API Gateway that sits between a client and an ElasticSearch cluster. It acts as a reverse proxy, routing requests from clients to services. Arc is extended through plugins, which provide extra functionality and services beyond the ElasticSearch's RESTful API

![](/images/byoc.png)

> **Note:** _Arc Middleware needs to have full access to your ElasticSearch and cannot accept access with Dynamic Headers. For this reason we recommend you to have an ElasticSearch cluster with Basic Auth / IP based restriction, where ARC Cluster IP is white listed for your ElasticSearch Cluster._

## Getting Started

Let's Start by deploying [ARC](https://arc-site.netlify.com) middleware. You can pick from the options available below and follow the instructions for each of this recipes.

<div class="grid-integrations-index mt4 mt6-l f8">
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="#using-arc-clusters-hosted-via-appbaseio">
		<img class="w10 mb1" src="/images/arc.svg" />
		Arc Cluster
	</a>
		<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem;height: 120px;width:120px;" href="#using-amiamazon-machine-images">
		<img class="w10 mb1" src="/images/awscart.jpg" />
		AWS Marketplace
	</a>
	<a class="bg-white shadow-2 box-shadow-hover shadow-2-hover  br4 db flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" style="box-shadow: 0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0,0,0,.1);    word-break: normal;cursor: pointer; padding: 2rem; height: 120px;width:120px;" href="#using-docker">
		<img class="w10 mb1" src="/images/docker.png" />
		Docker
	</a>
</div>

### Using Arc Clusters hosted via Appbase.io

[Appbase.io](https://dashboard.appbase.io/clusters/new/my-cluster) dashboard comes with an recipe which allows you to Host only Arc middleware and [Arc Dashboard](https://arc-dashboard.appbase.io). Thus allowing to access all the Appbase.io features like [data management](/docs/data/Model/), [enterprise grade security](/docs/security/Credentials/), [analytics](/docs/analytics/Overview/) and much more.

Let's start deploying Arc Middleware and Dashboard,

**Step 1 -** Login into **[Appbase.io Dashboard](https://dashboard.appbase.io)**

**Step 2 -** Access the **[Clusters Page](https://dashboard.appbase.io/clusters)** from top navigation

**Step 3 -** Click **[Create a New Cluster](https://dashboard.appbase.io/clusters/new)** action

**Step 4 -** Since we already have ElasticSearch cluster and would just like to host Arc, click **[Already have a Cluster](https://dashboard.appbase.io/clusters/new/my-cluster)**

![](https://i.imgur.com/X6dTO8f.png)

**Step 5 -** Select pricing plan based on number of Nodes that you have for ElasticSearch

**Step 6 -** Select the region where your ElasticSearch is hosted / where you would like to host Arc

**Step 7 -** Enter the name for your Arc Cluster

**Step 8 -** Enter your ElasticSearch cluster URL

![](https://i.imgur.com/NO5lcvl.png)

> **Note:** _Till time your Arc Middleware is deployed make sure you have either basic auth / open access for your cluster, so that we can pick right **Arc Version** and **Verify** if that is valid ElasticSearch cluster url._

**Step 9 -** Hit **Create Cluster** button and hang tight till your cluster is deployed

That's all, it will take around 5-10 min for your Arc middleware + Dashboard to get deployed. Once the deployment is complete, you will be able to see it in your **Clusters List** with `Bring your own cluster` tag.

> **Note:** _If you have IP based restriction for your cluster, now you can whitelist the Arc Cluster IP and restrict direct access to your cluster._

#### **Accessing Arc Dashboard**

Now that the Arc Cluster is deployed. Let's Access the **Arc Dashboard** using **Explore Cluster** Action on the **Clusters Details** Page.

![](https://i.imgur.com/uIfTi2G.png)

This will give you access to all the Appbase.io features like

-   Data management
-   Security with role based access / ACL
-   Analytics

![](https://i.imgur.com/OPQiXA8.png)

#### **Accessing ElasticSearch Data using REST API**

Now you can access all[ ElasticSearch REST](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs.html) API using Arc Cluster URL, with chosen security. You can copy the Arc Cluster URL from the dashboard.
![](https://i.imgur.com/Q3onHwn.png)

#### **Changing ElasticSearch URL**

You can seamlessly change your ElasticSearch cluster URL, with Appbase.io dashboard. All you need to do is just enter new ElasticSearch URL from Cluster Details page on Appbase.io Dashboard.

> **Note:** _Make sure your new ElasticSearch cluster URL has open access till the deployment is completed._

![](https://i.imgur.com/Pb2midX.png)

#### **Sharing Cluster**

With Appbase.io Dashboard you can easily share cluster with other team members, so that they can also access the data. Sharing feature also comes with ACL, where you can specify weather user have only **Viewers** right or all the **Admin** rights.

![](https://i.imgur.com/qmKcffi.png)

### Using [AMI(Amazon Machine Images)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)

We have created Amazon Machine Image (AMI), which is available on AWS Marketplace. AMI comes with Arc as `systemctl` service which you can easily start / stop / restart. Also it uses [Nginx](https://www.nginx.com/) server for reverse proxy to serve http request. With help of this you can seamlessly deploy Arc Middleware on [AWS EC2](https://aws.amazon.com/ec2/) machine.

Before Creating an AWS EC2 Machine using AMI, let's create an [Arc instance](https://arc-dashboard.appbase.io/install) which will give us access to [Arc Dashboard](https://arc-dashboard.appbase.io).

Here are the steps that you can follow to deploy Get Arc ID:

-   **Step 1 -** Go to [Arc Dashboard](https://arc-dashboard.appbase.io/login) and Select [Install A New Arc Instance](https://arc-dashboard.appbase.io/install)

![](https://i.imgur.com/YZubabh.png)

-   **Step 2 -** Enter your email address

-   **Step 3 -** You will receive an OTP on entered email address. Enter OTP to verify the email address

-   **Step 4-** You will receive an email with `ARC_ID` which we can use while creating EC2 machine.

Here are the steps that you can follow to install Arc Middleware using AMI

**Step 1 -** Select ARC [Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) from AWS Marketplace

// TODO Add Marketplace Link + image of marketplace

**Step 2 -** Select EC2 Instance Type required for Deploying Arc. We recommend using `t2 medium`.

**Step 3 -** Enter env variables in `User Data` Section while configuring `EC2` instance. Here is sample script which you can enter in `User Data` Section.

```bash
#!/bin/bash
#!/bin/bash
echo ES_CLUSTER_URL='https://search-test.us-east-1.es.amazonaws.com' >> /etc/systemd/system/arc.env

echo USERNAME='admin' >> /etc/systemd/system/arc.env
echo PASSWORD='admin' >> /etc/systemd/system/arc.env
echo ARC_ID='YOUR ARC ID' >> /etc/systemd/system/arc.env
```

![](https://i.imgur.com/T00tC8W.png)

#### **Environment Variables**

| **Variable**             | **Description**                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ES_CLUSTER_URL`         | ElasticSearch Cluster URL                                                                                                                             |
| `USERNAME`               | Username used for Basic Auth with ARC Cluster URL                                                                                                     |
| `PASSWORD`               | Password used for Basic Auth with ARC Cluster URL                                                                                                     |
| `JWT_RSA_PUBLIC_KEY_LOC` | When Role Based Access control is used for security. This Env helps in specifying the location of public key file that is used for verifying location |
| `JWT_ROLE_KEY`           | Field used for getting the role from JWT token.                                                                                                       |
| `ARC_ID`                 | Used for accessing the Arc Dashboard (This is to be set once the Arc Middleware is deployed and you have signed up for arc dashboard)                 |

> **Note:** Make sure ElasticSearch cluster URL is open till the deployment is completed so that we can Verify ElasticSearch cluster.

#### **Getting Arc URL**

Once the EC2 machine is created successfully, you can get Public DNS / IP address from the EC2 dashboard. This can be used with `USERNAME` and `PASSWORD` to access ElasticSearch data using Arc.

![](https://i.imgur.com/PDs8DK0.png)

**Example**

```bash
curl -u="USERNAME:PASSWORD" http://EC2-PUBLIC-[IP/DNS]
```

You can also point your domain to EC2 instance in order to access data using your domain. For more information on how to register/point domain to EC2 instance you can check [docs](https://aws.amazon.com/getting-started/tutorials/get-a-domain/).

#### **Accessing Arc Dashboard**

Alright now in order to access all the Arc Services, let us Sign in to [Arc dashboard](https://arc-dashboard.appbase.io/login) and start accessing data from there.

-   **Step 1 -** Sign in into [Arc dashboard](https://arc-dashboard.appbase.io/login) using your EC2 Public Domains / Domain with Username and Password set in the ENV

![](https://i.imgur.com/qVSHx0F.png)

And we are ready with our Arc Setup using AMI from AWS marketplace.

#### **Changing Environment Variables**

In order to update any environment variable here, you need to do `ssh` login into your EC2 machine. You can connect with EC2 machine via `ssh` using `.pem` key file that you must created / used while configure and creating and EC2 using Arc AMI.

You can click on **Connect** button from EC2 Dashboard and see the instructions to do ssh connection.

![](https://i.imgur.com/cS8LKkF.png)

Now in order to change Environment variables, please follow this steps

-   **Step 1 -** Connect via `SSH`

```bash
ssh -i "test.pem" ec2-user@ec2-1-2-3-4.compute-1.amazonaws.com
```

-   **Step 2 -** Open `/etc/systemd/system/arc.env` file using VIM editor with root permissions

```bash
sudo vim /etc/systemd/system/arc.env
```

-   **Step 3 -** Edit / Add Variables and save the file.

-   **Step 4 -** Restart Arc Service

```bash
systemctl restart arc
```

### Using Docker

[Arc](https://arc-site.netlify.com) is available as Docker Image as well, which can easily help you deploy and get started with your current docker based infrastructure. Based on your ElasticSearch version you can get a docker image and run it with required [Environment Variables](/docs/hosting/BringYourOwnCluster/#environment-variables).

#### **Available Docker Images**

// TODO Add correct images links

| **ElasticSearch Version** | **Docker Image** |
| ------------------------- | ---------------- |
| ElasticSearch V7          | Docker Image     |

Before Deploying Arc Image, let's create an [Arc instance](https://arc-dashboard.appbase.io/install) which will give us access to [Arc Dashboard](https://arc-dashboard.appbase.io).

Here are the steps that you can follow to deploy Get Arc ID:

-   **Step 1 -** Go to [Arc Dashboard](https://arc-dashboard.appbase.io/login) and Select [Install A New Arc Instance](https://arc-dashboard.appbase.io/install)

![](https://i.imgur.com/YZubabh.png)

-   **Step 2 -** Enter your email address

-   **Step 3 -** You will receive an OTP on entered email address. Enter OTP to verify the email address

-   **Step 4-** You will receive an email with `ARC_ID` which we can use while creating deploying Arc Image on Docker Container.

#### **Deploying Arc Docker Image**

-   **Step 1 -** Pull docker image

```bash
docker pull appbaseio/arc:DOCKER_IMAGE_VERSION
```

-   **Step 2 -** Create file with [Environment Variables](/docs/hosting/BringYourOwnCluster/#environment-variables)

Sample `env` file

```bash
# env

ES_CLUSTER_URL=http://elasticsearch:9200

USERNAME=foo
PASSWORD=bar
ARC_ID=YOUR ARC ID
```

> **Note:** Make sure your docker container can access ElasticSearch cluster.

-   **Step 3 -** Run Docker container

```bash
docker run --rm -d --name arc -p 8000:8000 --net=arc --env-file=env appbaseio/arc:DOCKER_IMAGE_VERSION
```

-   **Step 4 -** Expose your Arc service with public URL

-   **Step 5 -** Follow steps listed [here](/docs/hosting/BringYourOwnCluster/#accessing-arc-dashboard-1) to access Arc Dashboard. Only difference here will be instead of AWS EC2 url it will be public URL that you have exposed your container with.
