---
title: 'Securely Connect to Your Elastic Cloud Cluster'
meta_title: 'Securely connect Appbase.io BYE with your Elastic Cloud Cluster'
meta_description: 'Securely connect Appbase.io BYE with your Elasticsearch Cluster running on cloud providers like AWS Elasticsearch or self-hosted Elasticsearch running on Docker or Kubernetes.'
keywords:
    - clusters
    - appbaseio
    - appbase
    - Elasticsearch
    - Elastic Cloud
sidebar: 'docs'
---

You can use Appbase.io to supercharge your Elasticsearch cluster that is deployed on Elastic Cloud. This is a step-by-step guide on how to:
1. Create a user for connecting with appbase.io on your Elastic Cloud deployment, 
2. Use the `username:password` with the endpoint to connect to Elastic Cloud cluster from appbase.io dashboard, and
3. Create your appbase.io cluster in BYE mode

## Guide

### **1. Navigate to https://cloud.elastic.co/home**

### **2. Click here.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/9d5f6537-82f5-4c26-8ddf-77cee70d096d/cropped_screenshot_$1635348380.jpeg)

### **3. Click "Hello"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/84cabd75-cb8b-4468-b46a-6eddd5cfa8ac/cropped_screenshot_$1635348381.jpeg)

### **4. Click "Kibana"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/9bf4c567-b7a4-45bc-80ba-7450a7788515/cropped_screenshot_$1635348382.jpeg)

### **5. Click "Open"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/932b0619-051e-4de9-8590-81cbdd8f5855/cropped_screenshot_$1635348382.jpeg)

### **6. Click "Explore on my own"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/814d9717-1ff1-4fda-aba8-51dfc6fecbb8/cropped_screenshot_$1635348383.jpeg)

### **7. Click the "Search Elastic" field.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/458bf096-9ebe-4307-80ea-c5c250fd46a2/cropped_screenshot_$1635348385.jpeg)

### **8. Type "users"**

### **9. Click "Users"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/f3f07400-5d04-4207-8c01-87ddcac264bc/cropped_screenshot_$1635348386.jpeg)

### **10. Click here.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/a2e4664d-d7d1-482a-bc6a-f36340bff21c/cropped_screenshot_$1635348387.jpeg)

### **11. Click this icon.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/c69480e7-0e42-4c07-8984-ccfa297d7f24/cropped_screenshot_$1635348387.jpeg)

### **12. Click the "Username" field.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/369fad23-1cb9-4426-b581-0f8e400a7995/cropped_screenshot_$1635348388.jpeg)

### **13. Type "appbase-connect"**

Or choose your own username.

### **14. Click the "Password" field.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/3b793eb3-3769-48d6-9d8b-c1c7bd81e967/cropped_screenshot_$1635348388.jpeg)

### **15. Click this button.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/4cfff6c8-4a93-4304-a089-b3bc16f20051/cropped_screenshot_$1635348389.jpeg)

### **16. Click here.**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/94c490da-1713-4093-9c15-839fb39c7e65/cropped_screenshot_$1635348390.jpeg)

### **17. Click "superuser"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/c2f9ceec-5f63-47e2-a954-674418e68b4f/cropped_screenshot_$1635348391.jpeg)

### **18. Click "Create user"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/2989ccaa-640f-4e7c-8a18-7909405dcce7/cropped_screenshot_$1635348392.jpeg)

### **19. Switch to tab "Dashboard | appbase.io"**

Go to https://dashboard.appbase.io/clusters/new/my-cluster URL.

### **20. Copy your username, password and endpoint URL**

Now, construct the URL field as `https://${username}:${password}@${elasticsearch_endpoint}`.

### **21. Click "Verify Connection"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/2503f960-a387-4def-82fd-5987b14d322c/cropped_screenshot_$1635348394.jpeg)

In case you've pasted a credential with access that's not equivalent to `superuser`, appbase.io may show a verification error.

**Why is a `superuser` role needed?**

appbase.io creates and manageds system indices within your Elastic Cloud cluster for recording analytics, storing query rules, search relevance preferences, logs and more. Other roles don't allow access to these indices.

> appbase.io connects to your Elastic Cloud cluster from a private environment and these credentials aren't exposed anywhere.

### **22. Click "Add payment info and create cluster"**

![](https://colony-recorder.s3.amazonaws.com/scribe_documents/f8cefa37-54c9-4d09-ab62-ea1a0d9409e6/actions/a3a04203-3139-4764-b44b-50002228bceb/cropped_screenshot_$1635348395.jpeg)
