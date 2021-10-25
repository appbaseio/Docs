---
title: 'Static Hosting with MongoDB Realm'
meta_title: 'Static Hosting with MongoDB Realm | Atlas Search'
meta_description: 'Static Hosting with MongoDB Realm and Atlas Search.'
keywords:
    - overview
    - atlas-search
    - search-ui
    - react
    - vue
    - realm
    - hosting
    - mongodb
sidebar: 'docs'
nestedSidebar: 'atlas-search'
---

You can host the search UIs with MongoDB Realm's hosting.

## Introduction

> MongoDB Realm Hosting allows you to host, manage, and serve your application's static media and document files. You can use Hosting to store individual pieces of content or to upload and serve your entire client application.


## Enabling Hosting

You need to first enable hosting for your Realm application. Navigate to "Org > Project > Realm > Application" menu and click "Enable Hosting".

![](https://i.imgur.com/XQ9kGGt.png)

Read more about enabling hosting in the official MongoDB Realm docs over [here](https://docs.mongodb.com/realm/hosting/enable-hosting/).

## Uploading Search UI Files

For demonstration purposes, we will use the below Search UI hosted with Codesandbox.io. Direct Github link is over [here](https://github.com/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/by-usecases/fuzzy-search).

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/by-usecases/fuzzy-search?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="@appbaseio/react-searchbox-demo-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

First, build the search UI app by running `yarn build` (or `npm run build`). Now upload the files under the `build/` directory to the Realm Hosting UI.

![](https://i.imgur.com/4dz4dh1.png)

Once uploaded, select "Review Draft & Deploy" action. This will generate a public URL for your search UI app.

We just deployed our app at: https://public-demo-skxjb.mongodbstitch.com/.