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

<iframe src="https://scribehow.com/page-embed/Publishing_Search_UIs_with_Elasticsearch__YNtZ8O-pTyCkyHwDJkP2Pw" width="100%" height="640" allowfullscreen frameborder="0"></iframe>

<br /> <br /> 

> Note: The tutorial uses a Search UI built on top of faceted-search template, consider using the same template to match exact steps.


### The Steps

<iframe src="https://scribehow.com/embed/Programmatically_modifying_a_query___aPkHKVpRDyTeI88Vl9OaQ" width="100%" height="640" allowfullscreen frameborder="0"></iframe>

#### Code Snippets

##### Step 9: Modifying the query using transformRequest prop

```javascript
const transformRequest = (props) => {
  const newBody = JSON.parse(props.body);

  newBody.query = newBody.query.map((query) => {
    if (query.id === "search" && query.type === "search") {
      if (!query.value) {
        //assign a default value
        query.value = "batman returns";
      }
    }
    return query;
  });

  // eslint-disable-next-line
  props.body = JSON.stringify(newBody);

  return props;
};
```

#### Important Links

- Starter CodeSandbox 

  https://codesandbox.io/s/starter-modify-a-query-programmatically-y6i14x

- Final CodeSandbox 
  https://codesandbox.io/s/modify-a-query-programmatically-final-jf6u01


