---
id: reactivebase
title: "ReactiveBase"
layout: tutorial
sectionid: getting-started
permalink: getting-started/reactivebase.html
prev: data.html
prevTitle: "Importing Data"
next: componentsindex.html
nextTitle: "Components Overview"
---

**ReactiveBase** is the **base** component for all `ReactiveMaps` and `ReactiveSearch` apps. It binds the backend app (data source) with the UI view components (child elements to ReactiveBase), allowing the UI views to be reactively updated every time there is a change in the data source or in the UI view components.

This is the first component you will need to add.

### Usage

```js
<ReactiveBase
  app="appname"
  credentials="abcdef123:abcdef12-ab12-ab12-ab12-abcdef123456"
  theme="rbc-blue">
    <ChildComponent1 .. />
    <ChildComponent2 .. />
</ReactiveBase>
```

### Props

- **app** `String`  
    app name as it appears on the dashboard.
- **credentials** `String` [optional]  
    app credentials as they appear on the dashboard. It should be a string of the format "username:password" and is used for authenticating the app. If you are not using an appbase.io app, credentials may not be necessary - although having an open-access Elasticsearch cluster is not recommended.
- **url** `String` [optional]  
    URL where Elasticsearch cluster is hosted, only needed if your app uses a non appbase.io URL.
- **type** `String` [optional]  
    defines which types should the queries run on. Multiple types can be passed as comma separated. The default behavior is to search on all the app types.
- **theme** `String` [optional]  
    specify a UI theme as one of `rbc-blue` or `rbc-dark`. Read more about theming [here](https://opensource.appbase.io/reactivemaps/manual/v1/advanced/Theming.html).
    
> Note
>
> If you are using the **url** prop for an Elasticsearch cluster, ensure that your ReactiveSearch app can access the cluster. Typically, you will need to configure CORS in **elasticsearch.yml** to enable access.

```yaml
http.cors.enabled: true
http.cors.allow-credentials: true
http.cors.allow-origin: "http://reactive-search-app-domain.com:port"
http.cors.allow-headers: X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept
```

### Next Steps

Once you have added the **ReactiveBase** component, you can get started with adding other components as its children.

* Map specific components can be found [here](v1/map-components/ReactiveMap.html).
* Search specific components can be found [here](v1/search-components/CategorySearch.html).
* Generic components can be found [here](v1/components/SingleList.html).

You can read more about when to use which components in the overview guide [here](/getting-started/ComponentsIndex.html).
