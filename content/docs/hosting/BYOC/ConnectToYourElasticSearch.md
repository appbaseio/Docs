---
title: 'Connect to Your ElasticSearch'
meta_title: 'Connecting BYOC with your ElasticSearch'
meta_description: 'Run Appbase.io with for your own ElasticSearch cluster hosted elsewhere.'
keywords:
    - clusters
    - appbaseio
    - appbase
    - ElasticSearch
sidebar: 'docs'
---

Now that you can use Appbase.io to supercharge your ElasticSearch clusters, which are hosted on AWS or with any other Cloud provider, we need a secure way to connect with them. There are 2 major ways to securely connect to your ElasticSearch cluster, while using Appbase.io [Bring Your Own Cluster (BYOC)](/docs/hosting/BYOC).

## 1. Basic Authentication

[Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the `http://username:password@url` or Authorization header that contains the word Basic word followed by a space and a base64-encoded string `username:password`.

### Example

Here is an example how you can use ElasticSearch URL with Basic Authentication, while using [BYOC](docs/hosting/BYOC/)

**Step 1 -** Go to the **[Create Cluster Link](https://dashboard.appbase.io/clusters/new/my-cluster)**.

![](https://i.imgur.com/X6dTO8f.png)

You should see the above screen.

**Step 2 -** Select the pricing plan. Read more about pricing plans over [here](https://arc-site.netlify.com/pricing/).

**Step 3 -** Select the region. It is recommended that you pick a region closest to where your ElasticSearch cluster is running.

**Step 4 -** Enter a name for your Appbase instance.

**Step 5 -** Enter the ElasticSearch URL with basic Auth. Use the `Verify Connection` button to ensure that this URL is accessible.

![](https://i.imgur.com/bnxZMGP.png)

## 2. IP Whitelisting

IP whitelisting allows you to create lists of trusted IP addresses or IP ranges from which your users can access your domains. This method is really helpful when your cluster is hosted using [AWS ElasticSearch](https://aws.amazon.com/elasticsearch-service/) which does not support Basic Authentication.

### Example

Here is a quick example of how you can connect your AWS ElasticSearch cluster with Appbase.io. Assuming you already have AWS ElasticSearch Cluster in place, you can follow the steps below

**Step 1 -** Temporarily modify Access Policy of your AWS ElasticSearch cluster to Allow open access to the domain . This is done to verify your ElasticSearch URL.

> Note: It may take up to 2-5 min. Once the Appbase.io BYOC Cluster is deployed you will be provided with Cluster IP which you can whitelist in your AWS ElasticSearch and make it secure again.

![aws-policy](https://i.imgur.com/rMpevVE.png)

**Step 2 -** Go to the **[Create Cluster Link](https://dashboard.appbase.io/clusters/new/my-cluster)**.

![](https://i.imgur.com/X6dTO8f.png)

You should see the above screen.

**Step 3 -** Select the pricing plan. Read more about pricing plans over [here](https://arc-site.netlify.com/pricing/).

**Step 4 -** Select the region. It is recommended that you pick a region closest to where your ElasticSearch cluster is running.

**Step 5 -** Enter a name for your Appbase instance.

**Step 6 -** Get AWS ElasticSearch Cluster endpoint from AWS ElasticSearch dashboard.

![aws-url](https://i.imgur.com/ncieFAJ.png)

**Step 7 -** Enter AWS ElasticSearch Cluster URL

![](https://i.imgur.com/j7mTsUQ.png)

All set to deploy the ARC cluster. Hit Create Cluster Button at the bottom of the Appbase.io Dashboard page and hang
tight for 2-5 min.

Once the cluster is deployed you can see View Details button in your cluster list.

![](https://i.imgur.com/Cg9BRLM.png)

**Step 8 -** Get Appbase.io Cluster IP

Open Cluster Details page, by clicking on **View Details** button and copy Cluster IP address

![](https://i.imgur.com/Dx1pRLG.png)

**Step 9 -** Whitelist Appbase.io Cluster IP for AWS ElasticSearch instance.

-   Navigate to AWS ElasticSearch cluster details page
-   Navigate to Modify Access Policy
-   Select Allow access to domain from specific IP(s).
-   Past Appbase.io Cluster IP

![](https://i.imgur.com/SS63gRQ.png)

That's all 🎉 now your ElasticSearch Cluster URL is only accessible via Appbase.io. You can use Appbase.io URL to perform various ElasticSearch operations securely.

![](https://i.imgur.com/rlpOIj0.png)

Appbase.io provides enterprise level security and also reduces the overhead of setting up the custom middleware to authorize and authenticate users. You can read more about Appbase.io Security [here](/docs/security/Credentials/).
