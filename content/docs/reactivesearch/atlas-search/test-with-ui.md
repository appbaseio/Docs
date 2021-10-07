---
title: 'Testing with Search UI'
meta_title: 'Run a search app with Atlas Search'
meta_description: 'Run a search app with Atlas Search and React Searchbox UI library.'
keywords:
    - overview
    - atlas-search
    - search-ui
    - react-searchbox
    - mongodb
    - realm
sidebar: 'docs'
nestedSidebar: 'atlas-search'
---

Here's a faceted search experience powered by Atlas Search and React Searchbox UI library.

Here's a React application built using the `@appbaseio/react-searchbox-mongodb` package.

<iframe src="https://codesandbox.io/embed/romantic-bird-spqfr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="romantic-bird-spqfr"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Replace the default `index`, `url` and `mongodb.db`, `mongodb.collection` keys to point to the Realm function URL and your MongoDB database, collection and search index.

```
    index="default"
    url="https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch"
    mongodb={{
      db: "sample_airbnb",
      collection: "listingsAndReviews"
    }}
```

API reference for the components is present over here:

- [Searchbox](https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/)
- [Searchbase](https://docs.appbase.io/docs/reactivesearch/react-searchbox/searchbase/)
- [SearchComponent](https://docs.appbase.io/docs/reactivesearch/react-searchbox/searchcomponent/)

For more examples (currently in REST format), refer to the search examples guide over [here](/docs/reactivesearch/atlas-search/search-examples/).
