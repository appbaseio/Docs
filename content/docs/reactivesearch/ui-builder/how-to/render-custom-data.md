---
title: 'Render custom data'
meta_title: 'Render custom data in your search UI'
meta_description: 'Render custom data in your search UI using Pipelines and UI builder'
keywords:
  - ui-builder
  - ui-integrations
  - how-to
  - react
  - vue
  - elasticsearch
  - solr
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview

The How-to guide enumerates steps to extract out specific result from raw response and render it separately on the UI.

### Pre-requisite: A starter app

Take 👇🏻 as a starting point. The starter app contains a search UI which uses an index with a promoted result.
The idea is to extract the promoted result and render it as a separate UI element.


<iframe src="https://codesandbox.io/embed/extracting-results-from-response-starter-app-4j8ilf?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Extracting results from response - starter app"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### The Steps

#### Extract promoted item from raw response

The raw response for the result component would contain the promoted item(s) as a separate key.
We utilize the `transformResponse` prop to extract the promoted items and store them in a local component state.

**Create a local state variable to store extracted data**

```jsx
import { React, useState } from "react";
// ... other imports

const Main = () => {
  const [extractedResult, setExtractedResult] = useState(null);

  // return ...  

}
```


**Pass `transformResponse` prop to ReactiveBase**

```jsx
import { React, useState } from "react";
// ... other imports

const Main = () => {
  const [extractedResult, setExtractedResult] = useState(null);

  return (
    <ReactiveBase
      //... other props
      transformResponse={async (response, componentId) => {

        // `SearchResult` is the componentId for the result(ReactiveList) component
        if (componentId === "SearchResult") {
        
          // check if promoted result(s) is present
          if (response.promoted) {
            // store the promoted result(s) in the local state
            setExtractedResult(response.promoted);
            // remove the promoted result(s) to avoid showing them in the ReactiveList UI
            delete response.promoted;
            // return modified response
            return Promise.resolve({ ...response });
          }
        }

        return Promise.resolve({ ...response });
      }}
    >
    {/* ... */}
    </ReactiveBase>);

}
```

> Read more about the `transformResponse` prop [here](https://docs.reactivesearch.io/docs/reactivesearch/v3/overview/reactivebase/#transformresponse)


#### Render the extracted data as a separate UI element

We are rendering the custom UI for the extracted result(s) right over the top of the search UI.

```jsx
<ReactiveBase
 // ... other props
>
  {extractedResult?.map(
    ({ doc: { title = "promoted item", NER = [] } }) => (
      <div className="coupon" key={title}>
        <div className="container">
          <h3>{title}</h3>
        </div>

        <div className="container" style={{ backgroundColor: "white" }}>
          <h2>
            <b>20% OFF YOUR PURCHASE</b>
          </h2>

          <div className="tags-container">
            {NER.map((tagItem) => (
              <span
                key={tagItem}
                className="ant-tag css-1wismvm inherited-styles"
              >
                {tagItem}
              </span>
            ))}
          </div>
        </div>
        <div className="container">
          <p>
            Use Promo Code: <span className="promo">BOH232</span>
          </p>
          <p className="expire">Expires: Jan 03, 2030</p>
        </div>
      </div>
    )
  )}
</ReactiveBase>
```


> For styles, refer to `index.css` in the Final App sandbox.

### Final App

<iframe src="https://codesandbox.io/embed/step-2-extracting-results-from-response-extract-promoted-result-s-into-local-state-5o7x15?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title=" Extracting results from response - Final app"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


### Important Links

- Starter CodeSandbox 

  https://codesandbox.io/s/extracting-results-from-response-starter-app-4j8ilf

- Final CodeSandbox 
  
  https://codesandbox.io/s/extracting-results-from-response-final-app-5o7x15


