---
title: 'Add pivot facets to Search UIs'
meta_title: 'Add pivot facets to Search UIs'
meta_description: 'Add pivot facets to a search UI.'
keywords:
  - ui-builder
  - ui-integrations
  - how-to-guides
  - pivot-facets
  - tree-list-facet
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview

The How-to guide enumerates steps to add a pivot facet to your Search UI. We would be adding a `TreeList` facet to a search app.

### Pre-requisite: Create a Search UI 

You can follow this 👇🏻 step-by-step tutorial to build a new Search UI, incase you already don't have one.

<iframe src="https://scribehow.com/page-embed/Publishing_Search_UIs_with_Lucidworks_Fusion__x1WkxtpJTZqQrYx728_AJw" width="100%" height="640" allowfullscreen frameborder="0" style="margin: auto;"></iframe>

<br /> <br /> 

Now that we have a Search UI, Let's begin adding a facet to it!! 🏎

### Editing the code

**1. Within your search UI, click on Code Editor.**

![](https://image.scribehow-prod.com/Vl3x8MhBgXy8Lbn65b6FIVPTVKI2F_V9B76ZJUCbvbU/zoom:1.5013404825737264/enlarge:true/crop:746:420:nowe:0:556/wm:0.8:nowe:391:544:0.08928571428571429/aHR0cHM6Ly9jb2xvbnktcmVjb3JkZXIuczMuYW1hem9uYXdzLmNvbS9maWxlcy8yMDIyLTEwLTI0LzRjNzVjMDdjLWJkMGYtNDUzNi1iOGZkLWNmMjk4NDA3NmI2NS91c2VyX2Nyb3BwZWRfc2NyZWVuc2hvdC5qcGVn)

**2. Navigate to "constants.js" from the file explorer.**

![](https://image.scribehow-prod.com/U9PNf_tK8jp7Vzk9IS5F_sPgsNBKQ59A_LZhLRMPcvE/zoom:1.5013404825737264/enlarge:true/crop:746:420:nowe:0:60/wm:0.8:nowe:90:289:0.08928571428571429/aHR0cHM6Ly9jb2xvbnktcmVjb3JkZXIuczMuYW1hem9uYXdzLmNvbS9maWxlcy8yMDIyLTEwLTI0LzExYmYwMGRkLTllOGEtNDJhYy05NDJhLWI0NzAxNmZkOTVjMi9hc2NyZWVuc2hvdC5qcGVn)

> `constant.js` stores a JSON constant named `appbasePrefs` which is further processed(internally) 🪄 to generate the Search UI.

**3. Paste the snippet**

Within the preferences JSON, under `pageSettings > pages`, locate the page you intend to add the `facet` to. 

For Example, Here I would be adding the facet to the `home`  page.


Paste the following JSON snippet under `pageSettings > pages > home > componentSettings `

```JSON
"TreeList_facet": {
  "enabled": true,
  "rsConfig": {
    "componentId": "TreeList_facet",
    "componentType": "TREELIST",
    "dataField": ["<!-- relevant dataField should be put here --->"],
    "filterType": "list",
    "queryFormat": "or",
    "showCheckbox": true,
    "showCount": true,
    "showMissing": false,
    "showSearch": true,
    "sortBy": "count",
    "title": "Categories"
  }
}
```

![](https://image.scribehow-prod.com/91haZuyuePDABdZXxm11P98GIskfUntPvDvtlPBtyp4/zoom:1.5013404825737264/enlarge:true/crop:746:420:nowe:0:43/wm:0.8:nowe:424:289:0.08928571428571429/aHR0cHM6Ly9jb2xvbnktcmVjb3JkZXIuczMuYW1hem9uYXdzLmNvbS9maWxlcy8yMDIyLTEwLTI0L2I5MDJlOGU1LTQ1NjMtNDgzYy1iNzM4LTA1ZDVmMzhkYjFkNy91c2VyX2Nyb3BwZWRfc2NyZWVuc2hvdC5qcGVn)

**4. Commit the code and Deploy**

![](https://image.scribehow-prod.com/5thV1_al6YMT42TkZOk-dsqQlwAXh7F7VryyQyhNHDc/zoom:1.5013404825737264/enlarge:true/crop:746:420:nowe:807:159/wm:0.8:nowe:535:289:0.08928571428571429/aHR0cHM6Ly9jb2xvbnktcmVjb3JkZXIuczMuYW1hem9uYXdzLmNvbS9maWxlcy8yMDIyLTEwLTI0LzA4YmYyZmE4LWRiMmYtNGU4Yy04MjhhLTllYWE0ZmUxNDUwMy9hc2NyZWVuc2hvdC5qcGVn)

🎊 🙌🏻 You should see the `TreeList` pivot facet on the `home` page of the deployed search app. 

Something similar 👇🏻

<img src="https://i.imgur.com/onFI2a2.png" style="border: 1px solid" alt="ui preview after adding TreeList facet"/>



### Understanding the facet config snippet

Let's take a look and try to understand the snippet we pasted to add the TreeList component

```JSON
"TreeList_facet": {
  "enabled": true,
  "rsConfig": {
    "componentId": "TreeList_facet",
    "componentType": "TREELIST",
    "dataField": ["<!-- relevant dataField should be put here --->"],
    "filterType": "list",
    "queryFormat": "or",
    "showCheckbox": true,
    "showCount": true,
    "showMissing": false,
    "showSearch": true,
    "sortBy": "count",
    "title": "Categories"
  },
  "customMessages": {
    "loading": null,
    "noResults": null
  },
}
```

- `enabled` A boolean to indicate whether the facet is enabled/  disabled.

- `rsConfig` This key is responsible for storing all the component props accepted by a ReactiveSearch component. With an exception of `filterType` and `componentType`, all the other keys are props consumed by the ReactiveSearch components. 

  In this how-to guide we have used the `<TreeList />` component whose props definition can be [explored here](/docs/reactivesearch/v3/list/treelist/#props) in detail.

    - **filterType** NoCode Search UIs can be incorporated with different types of facets, to categorize them we have the `filterType` key passed in the `rsConfig` JSON which is used internally by the code-logic to render the Search UI. Acceptable values are `date`, `range`, `list`, etc.

    - **componentType** This prop is used internally by the lib(ReactiveSearch) to figure out the component type of the added component. [Click here](https://github.com/appbaseio/reactivecore/blob/master/src/utilsconstants.js#L1) to checkout all the accepted `componentTypes`.

      > 💡 Our lib takes a general approach to render components by rendering them as a ReactiveComponent(part of ReactiveSearch lib), which is a generic component to build reactive search UIs.

- `customMessages` The key can be used to provide custom messages for different state of the component UI, for example

  ```JSON
    "customMessages": {
      "loading": "Loading...", // message displayed when the results are still loading
      "noResults": "No results found" // message displayed when no results could be found
    },
  ```


### Example preview

<iframe src="https://codesandbox.io/embed/enterprise-search-ui-template-forked-oj4czz?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Adding Treelist facet to a Search UI"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>