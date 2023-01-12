---
title: 'Server-side support API Reference'
meta_title: 'Documentation for Server-side support'
meta_description: '@appbaseio/react-searchbox provides server-side rendering support which is compatible with any SSR solution.'
keywords:
    - react-searchbox
    - server-side rendering
    - performance
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

## Introduction to SSR

Server-side rendering (SSR), is the ability of an application to contribute by displaying the web page on the server instead of rendering it in the browser. The Server-side sends a fully rendered page to the client

Some benefits offered by SSR technique
- The initial page of the website load is faster as there are fewer codes to render.
- Good for minimal and static sites.
- Search engines can crawl the site for better SEO.

`@appbaseio/react-searchbox` is compatible with server-side rendering. We provide an API that works with any SSR solution.


## How does it work?

The basic idea of SSR support for `@appbaseio/react-searchbox` is to perform any necessary API calls to the search client and compute the initial state of App, then redyhrate the client side with the initialState computed on the server-side.

We split the concerns into:

- server: the main server entry to serve requested pages.
- client: the main browser entry (ultimately gets compiled to bundle.js).
<br/>

### Client-side

The user needs to provide just two props to the `<SearchBase />` component.

- **contextCollector**: used by our library internally to compute the initial state at the server side. _(injected automatically by the server-side code)._

- **initialState**: the initial state of the app that is calculated at the server-side for hydration at client side.


```jsx
const App = (props) => (
  <SearchBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
    // below props are coming from the server
    contextCollector={props.contextCollector}
    initialState={props.initialState}
  >
    <SearchComponent
      id="result-component"
      highlight
      dataField="original_title"
      size={10}
    >
      {({ results, loading, size, setValue, setFrom }) => {
        return (
          <div className="result-list-container">
            {loading ? (
              <div>Loading Results ...</div>
            ) : (
              <div>
                {!results.data.length ? (
                  <div>No results found</div>
                ) : (
                  <p>
                    {results.numberOfResults} results found in {results.time}ms
                  </p>
                )}
                {results.data.map((item) => (
                  <div
                    className="book-header"
                    dangerouslySetInnerHTML={{
                      __html: item.original_title
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }}
    </SearchComponent>
  </SearchBase>
);

export default App;

``` 

### Server Side

On the server-side code, the user imports a util method `getServerResults()(..., ...)` to compute the initial state of the App and passes this initial state back to the client-side.

   **getServerResults()(App, pageURL)**: the first param of the function receives the `App` component ref and the second param *[optional]* receives the URL string or query param object(should be parsed) to respect the URL query string.

> Assuming [Next.js](https://nextjs.org/) used for SSR here.

```javascript
import {  getServerResults } from '@appbaseio/react-searchbox';

// getServerSideProps method is run on server-side by Next.js
export async function getServerSideProps(context) {

  // calculating the initial state on server  
  let initialState = await getServerResults()(App, context.resolvedUrl);
  return {
    props: { initialState } // will be passed to the App component as props
  };
}

``` 

## Examples

### Using Next.js

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/next/packages/react-searchbox/examples/next-ssr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="appbaseio/searchbox"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Using Express.js

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/next/packages/react-searchbox/examples/with-ssr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="appbaseio/searchbox"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Blog   

Consider reading the blog post showing a SSR rendered search UI built with `@appbaseio/react-searchbox` over [here](https://blog.reactivesearch.io/preview/6263a659d82f4558aff88d84).
