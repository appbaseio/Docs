---
title: 'Modify the query programatically'
meta_title: 'Modify the query programatically'
meta_description: 'Modify the query programatically'
keywords:
  - ui-builder
  - ui-integrations
  - how-to-guides
  - add-custom-query-param
  - modify-query
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview

The How-to guide enumerates steps to programatically modify the query before hitting the backend.

### Pre-requisite: Create a Search UI 

You can follow this 👇🏻 step-by-step tutorial to build a new Search UI, incase you already don't have one.

<iframe src="https://scribehow.com/page-embed/Publishing_Search_UIs_with_Lucidworks_Fusion__x1WkxtpJTZqQrYx728_AJw" width="100%" height="640" allowfullscreen frameborder="0" style="margin: auto;"></iframe>

<br /> <br /> 

> Note: The tutorial uses a Search UI built on top of faceted-search template, consider using the same template to match exact steps.


### The Steps

<iframe src="https://scribehow.com/embed/Programmatically_modifying_a_query___aPkHKVpRDyTeI88Vl9OaQ" width="100%" height="640" allowfullscreen frameborder="0"></iframe>

#### Code Snippets

##### Step 9: Modifying the query using transformRequest prop

```javascript
const transformRequest = isFusion
  ? (props) => {
      if (Object.keys(fusionSettings).length) {
        const newBody = JSON.parse(props.body);
        newBody.metadata = {
          app: fusionSettings.app,
          profile: fusionSettings.profile,
          suggestion_profile: fusionSettings.searchProfile,
          sponsored_profile: get(
            fusionSettings,
            "meta.sponsoredProfile",
            ""
          )
        };
        // eslint-disable-next-line
        props.body = JSON.stringify(newBody);
      }
      let newUrl = props.url + "?queryString=";
      let queryString = "";

      queryString += `hl=true&hl.fl=title_t`;
      newUrl += encodeURIComponent(queryString);
      props.url = newUrl;
      return props;
    }
  : undefined;
```

#### Important Links

- Starter CodeSandbox 

  https://codesandbox.io/s/cf7oiu?file=%2Fpublic%2Findex.html&from-sandpack=true

- Final CodeSandbox 
  https://codesandbox.io/s/reactivesearch-shopify-plugin-forked-lpczgm?file=/src/components/Search.js:12805-13022


