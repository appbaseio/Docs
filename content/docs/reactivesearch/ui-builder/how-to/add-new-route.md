---
title: 'Add a new route to a Search UI'
meta_title: 'Add a new route to a Search UI'
meta_description: 'Add a new route to a Search UI'
keywords:
  - ui-builder
  - ui-integrations
  - how-to-guides
  - add-new-route
  - add-new-page
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview

The How-to guide enumerates steps to add a new page/ route to an existing Search UI.

### Pre-requisite: Create a Search UI 

You can follow this 👇🏻 step-by-step tutorial to build a new Search UI, incase you already don't have one.

<iframe src="https://scribehow.com/page-embed/Publishing_Search_UIs_with_Lucidworks_Fusion__x1WkxtpJTZqQrYx728_AJw" width="100%" height="640" allowfullscreen frameborder="0" style="margin: auto;"></iframe>

<br /> <br /> 

Now that we have a Search UI, Let's begin adding a route!! 🏎

### Adding a new route

<iframe src="https://scribehow.com/embed/Add_a_new_route_to_a_Search_UI__iMRjivcETHSJncxKyRen-A" width="100%" height="640" allowfullscreen frameborder="0"></iframe>

### Code Snippets

#### Step 4: Add "hello-world" page key under the "pages" JSON object

```JSON
"hello-world": "/hello-world"
```

#### Step 6: Create a new page "HelloWorld.js" under "src > pages" directory


```javascript
import React from 'react';

const HelloWorld = () => {
    return <h1>Hello from new page! 👋🏻</h1>;
}

export default HelloWorld;

```


#### Step 7: Import HelloWorld.js from src/pages/ in App.js


```javascript
import HelloWorld from './pages/HelloWorld';
```

#### Step 8: Add a new route '/hello-world' to "App.js" that renders "HelloWorld.js"

```javascript
<Route path="/hello-world">
    <HelloWorld />
</Route>
```

#### Step 29: Add a new route '/hello-world' to "App.js" that renders "HelloWorld.js"

```javascript
import React, { useState } from "react";
import { ReactiveBase, SearchBox } from "@appbaseio/reactivesearch";
import get from "lodash.get";
import { getSearchPreferences, defaultPreferences } from "../utils";
import { ResultsLayoutByCategory } from "@appbaseio/enterprise-search-ui";
import { Col, Row } from "antd";
import { css } from "@emotion/core";
import Filters from "../components/Filters";

const HelloWorld = () => {
  const [state, setState] = useState({
    searchAppState: {
      search_results: "",
      search_facets: {}
    }
  });
  const isMobile = () => {
    return window.innerWidth <= 768;
  };
  const preferences = getSearchPreferences();
  const pageSettings = get(preferences, "pageSettings", {});
  const pageEndpoint = get(
    pageSettings,
    `pages.${pageSettings.currentPage}.indexSettings.endpoint`
  );
  const index = get(preferences, "appbaseSettings.index");
  const credentials = get(preferences, "appbaseSettings.credentials");
  const url = get(preferences, "appbaseSettings.url");
  const theme = get(
    preferences,
    "themeSettings.rsConfig",
    defaultPreferences.themeSettings.rsConfig
  );
  const componentSettings = get(
    pageSettings,
    `pages.${pageSettings.currentPage}.componentSettings`,
    {}
  );

  const backend = get(preferences, "backend", "");
  const isFusion = backend === "fusion";

  const globalFusionSettings = get(preferences, "fusionSettings", {});
  const pageFusionSettings = get(
    pageSettings,
    `pages.${pageSettings.currentPage}.indexSettings.fusionSettings`
  );
  const fusionSettings = {
    ...globalFusionSettings,
    ...pageFusionSettings
  };
  const resultSettings = get(
    componentSettings,
    "result",
    get(preferences, "resultSettings", {})
  );
  const transformRequest = isFusion
    ? (props) => {
        if (Object.keys(fusionSettings).length) {
          const newBody = JSON.parse(props.body);
          newBody.metadata = {
            app: fusionSettings.app,
            profile: fusionSettings.profile,
            suggestion_profile: fusionSettings.searchProfile,
            sponsored_profile: get(fusionSettings, "meta.sponsoredProfile", "")
          };
          // eslint-disable-next-line
          props.body = JSON.stringify(newBody);
        }
        return props;
      }
    : undefined;
  let newProps = {};
  const sortOptionSelector = get(resultSettings, "sortOptionSelector", []);
  if (sortOptionSelector && sortOptionSelector.length) {
    newProps = {
      sortOptions: get(resultSettings, "sortOptionSelector")
    };
  }

  const searchSettings = get(
    componentSettings,
    "search",
    get(preferences, "searchSettings", {})
  );
  const searchStyles = ({ titleColor }) => css`
    .section-header > h3 {
      margin: 8px 0;
      color: ${titleColor};
      font-size: 16px;
    }
  `;
  let valueFields = ["term_s"];
  const defaultFields = get(resultSettings, "fields", {});
  if (defaultFields.title.dataField) {
    valueFields = [...valueFields, defaultFields.title.dataField];
  } else if (defaultFields.description.dataField) {
    valueFields = [...valueFields, defaultFields.description.dataField];
  }
  const searchIcon = get(searchSettings, "searchButton.icon", "");

  const currency = get(
    preferences,
    "globalSettings.currency",
    defaultPreferences.globalSettings.currency
  );

  const themeType = get(
    preferences,
    "themeSettings.type",
    defaultPreferences.themeSettings.type
  );

  const exportType = get(
    preferences,
    "exportSettings.type",
    defaultPreferences.exportType
  );

  const getFontFamily = () => {
    const receivedFont = get(theme, "typography.fontFamily", "");
    let fontFamily = "";
    if (receivedFont && receivedFont !== "default") {
      fontFamily = receivedFont; // eslint-disable-line
    }
    return fontFamily ? { fontFamily } : {};
  };

  const handleAppStateChange = (key, val) => {
    const { searchAppState } = state;
    const newSearchAppState = {
      ...JSON.parse(JSON.stringify(searchAppState))
    };

    if (key === "search") newSearchAppState.search_results = val;
    else if (Array.isArray(val)) {
      val.forEach((facet) => {
        newSearchAppState.search_facets[facet] = true;
      });
      Object.keys(newSearchAppState.search_facets).forEach((facet) => {
        if (!val.includes(facet))
          newSearchAppState.search_facets[facet] = false;
      });
    }

    setState({
      searchAppState: newSearchAppState
    });
  };

  return (
    <ReactiveBase
      endpoint={pageEndpoint}
      app={index}
      url={url}
      credentials={credentials}
      theme={theme}
      enableAppbase
      appbaseConfig={{
        recordAnalytics: true
      }}
      preferences={getSearchPreferences()}
      initialQueriesSyncTime={100}
      transformRequest={transformRequest}
    >
      <SearchBox
        preferencesPath={`pageSettings.pages.${pageSettings.currentPage}.componentSettings.search`}
        componentId="search"
        filterLabel="Search"
        className="search"
        debounce={100}
        placeholder={"Enter search query"}
        iconPosition="right"
        icon={
          searchIcon ? (
            <img
              src={searchIcon}
              alt="Search Icon"
              width="20px"
              height="20px"
            />
          ) : (
            searchIcon
          )
        }
        URLParams
        style={{
          margin: 20,
          position: "sticky",
          top: "10px",
          zIndex: 1000
        }}
        css={searchStyles(theme.colors)}
        popularSuggestionsConfig={{
          size: 3,
          sectionLabel: '<h3 class="section-label">Popular Suggestions</h3>'
        }}
        recentSuggestionsConfig={{
          size: 3,
          sectionLabel: '<h3 class="section-label">Recent Suggestions</h3>'
        }}
        enableIndexSuggestions
        indexSuggestionsConfig={{
          sectionLabel: '<h3 class="section-label">Index Suggestions</h3>',
          size: 3,
          valueFields
        }}
        size={6}
        showDistinctSuggestions
      />
      <Row gutter={2}>
        <Col span={6}>
          <Filters
            theme={theme}
            isMobile={isMobile}
            currency={currency}
            themeType={themeType}
            exportType={exportType}
            preferences={preferences}
            getFontFamily={getFontFamily()}
            pageSettings={pageSettings}
            handleAppStateChange={handleAppStateChange}
            searchAppState={state.searchAppState}
          />
        </Col>
        <Col span={18}>
          <ResultsLayoutByCategory
            preferences={preferences}
            toggleFilters={false}
            componentProps={{
              ...newProps,
              highlight: get(resultSettings, "resultHighlight", false)
            }}
          />
        </Col>
      </Row>
    </ReactiveBase>
  );
};

export default HelloWorld;
```