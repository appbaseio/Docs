---
title: 'Securely Connect to AWS OpenSearch Cluster'
meta_title: 'Securely connect Appbase.io BYE with your AWS OpenSearch Cluster'
meta_description: 'Securely connect Appbase.io BYOC with your Elasticsearch Cluster running on cloud providers like AWS Elasticsearch or self-hosted Elasticsearch running on Docker or Kubernetes.'
keywords:
    - clusters
    - appbaseio
    - appbase
    - Elasticsearch
    - OpenSearch
    - AWS
sidebar: 'docs'
---

You can use Appbase.io to supercharge your Elasticsearch cluster that is deployed on a 3rd party service such as AWS Elasticsearch service. There are 2 major ways to securely connect to your Elasticsearch cluster when using Appbase.io [Bring Your Own Cluster (BYOC) option](/docs/hosting/byoc/).

## 1. Basic Authentication

[Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the `http://username:password@url` or Authorization header that contains the word Basic word followed by a space and a base64-encoded string `username:password`.

### Example

Here is an example how you can use Elasticsearch URL with Basic Authentication, while using [BYOC](/docs/hosting/byoc/)

**Step 1 -** Go to the **[Create Cluster Page](https://dashboard.appbase.io/clusters/new/my-cluster)**.

![](https://i.imgur.com/X6dTO8f.png)

You should see the above screen.

**Step 2 -** Select the pricing plan. Read more about pricing plans over [here](https://arc-site.netlify.com/pricing/).

**Step 3 -** Select the region. It is recommended that you pick a region closest to where your Elasticsearch cluster is running.

**Step 4 -** Enter a name for your Appbase instance.

**Step 5 -** Enter the Elasticsearch URL with Basic Auth credentials added to it. Use the `Verify Connection` button to ensure that this URL is accessible.

![](https://i.imgur.com/bnxZMGP.png)

## 2. IP Whitelisting

IP whitelisting allows you to create lists of trusted IP addresses or IP ranges from which your users can access your domains. This method is really helpful when your cluster is hosted using [AWS Elasticsearch](https://aws.amazon.com/elasticsearch-service/) which does not support Basic Authentication.

### Example

Here is a quick example of how you can connect your AWS Elasticsearch cluster with Appbase.io. Assuming you already have AWS Elasticsearch Cluster in place, you can follow the steps below:

**Step 1 -** Temporarily modify Access Policy of your AWS Elasticsearch cluster to Allow open access to the domain. This is done to verify and connect to your Elasticsearch domain from Appbase.io.

![aws-policy](https://i.imgur.com/rMpevVE.png)

**Step 2 -** Go to the **[Create Cluster Page](https://dashboard.appbase.io/clusters/new/my-cluster)**.

![](https://i.imgur.com/X6dTO8f.png)

You should see the above screen.

**Step 3 -** Select the pricing plan. Read more about pricing plans over [here](https://appbase.io/pricing/).

**Step 4 -** Select the region. It is recommended that you pick a region closest to where your Elasticsearch cluster is running.

**Step 5 -** Enter a name for your Appbase.io cluster instance.

**Step 6 -** Get the AWS Elasticsearch Cluster endpoint from AWS Elasticsearch dashboard.

![aws-url](https://i.imgur.com/ncieFAJ.png)

**Step 7 -** Enter the AWS Elasticsearch Cluster URL

![](https://i.imgur.com/j7mTsUQ.png)

You're now all set to deploy the Appbase.io cluster. Hit `Create Cluster` button at the bottom of the Appbase.io dashboard page and hang tight for 2-5 mins. Once the cluster is deployed, you can see the `View Details` button in your Cluster list.

![](https://i.imgur.com/Cg9BRLM.png)

**Step 8 -** Get Appbase.io Cluster IP

Open Cluster Details page, by clicking on **View Details** button and copy the Cluster IP address.

![](https://i.imgur.com/Dx1pRLG.png)

**Step 9 -** Whitelist Appbase.io Cluster IP for AWS Elasticsearch instance.

-   Navigate to AWS Elasticsearch cluster details page
-   Navigate to Modify Access Policy
-   Select Allow access to domain from specific IP(s)
-   Paste Appbase.io Cluster IP

![](https://i.imgur.com/SS63gRQ.png)

That's all! 🎉 Now your Elasticsearch Cluster URL is only accessible to the Appbase.io instance. You can use Appbase.io URL to perform various Elasticsearch operations securely.

![](https://i.imgur.com/rlpOIj0.png)

Appbase.io provides fine-grained access control based security credentials which can now be used instead of your Elasticsearch Cluster URL for performing search requests from a web / mobile client application. You can read more about Appbase.io security controls over [here](/docs/security/credentials/).
