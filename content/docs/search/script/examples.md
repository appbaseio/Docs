---
title: 'Script Examples'
meta_title: 'Script examples based on use cases'
meta_description: 'Script - Implementation guide. Learn more about the Script concepts and see examples for some common use cases'
keywords:
    - concepts
    - appbase
    - elasticsearch
    - reactivesearch
    - script
    - pipeline
sidebar: 'docs'
---

## Search Examples
### Request modification with compromise
Example to use [compromise](https://www.npmjs.com/package/compromise) package to apply a price range filter if query contains price. For example, if query is `mobiles under 10k` then it extracts the price value as `10000` and applies a price filter to the request.

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Request-modification-with-compromise?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Authorization with crypto-js
The following example uses the [crypto-js](https://www.npmjs.com/package/crypto-js) package to authenticate a request using `HmacSHA264`.

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Request-modification-with-crypto-js?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


### Response modification
The following example removes the `_shards` property from the search response of each query.

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Response-modification-with-lodash?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Sync call using fetch

An example, to use the [data muse](https://www.datamuse.com/api/) API to correct the misspelled words in a search query.

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Sync-fetch-call-Example?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


### Async call using fetch

Example to use a third party API to save search requests.

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Async-fetch-call-to-save-search?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Index Examples
### Modify an Indexing request

The following example adds a calculated field to the Elasticsearch indexing requests.

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Modify-Index-Request?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Modify a bulk request

An example, to modify the Elasticsearch bulk request to add a new field to `index` requests. 

<iframe height="600px" width="100%" src="https://replit.com/@appbaseio/Script-Modify-Bulk-Request?lite=true#script.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>