---
title: 'Server Side Rendering'
meta_title: 'Server Side Rendering'
meta_description: 'Server Side Rendering enables us to pre-render the results on the server enabling better SEO for the app, and faster delivery of relevant results on an initial render to the users.'
keywords:
    - reactivesearch
    - ssr
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

Server-side rendering (SSR), is the ability of an application to contribute by displaying the web page on the server instead of rendering it in the browser. The Server-side sends a fully rendered page to the client

Some benefits offered by SSR technique

The initial page of the website load is faster as there are fewer codes to render.
Good for minimal and static sites.
Search engines can crawl the site for better SEO.


Reactivesearch internally runs on a redux store. With Server Side Rendering, you can handle the intial render when a user (or search engine crawler) first requests your app. To achieve the relevant results on an initial render, we need to pre-populate the redux store of ReactiveSearch.

ReactiveSearch provides an API that works with any SSR solution:

## How does it work?

The basic idea of SSR support for ReactiveSearch is to perform any necessary API calls to the search client and compute the initial state of App, then redyhrate the client side with the initialState computed on the server-side.

We split the concerns into:

server: the main server entry to serve requested pages.
client: the main browser entry (ultimately gets compiled to bundle.js).

### Client-side

The user needs to provide just two props to the `<SearchBase />` component.

- **contextCollector**: used by our library internally to compute the initial state at the server side. _(injected automatically by the server-side code)._

- **initialState**: the initial state of the app that is calculated at the server-side for hydration at client side.


```jsx
const App = (props) => (
  <ReactiveBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
    // below props are coming from the server
    contextCollector={props.contextCollector}
    initialState={props.initialState}
  >
	<ReactiveList
		componentId="SearchResult"
		dataField="original_title"
		className="result-list-container"
		URLParams
		from={0}
		size={5}		
		react={{
			and: ['BookSensor', 'SearchBox'],
		}}
		pagination
	/>
  </ReactiveBase>
);

export default App;

``` 

### Server Side

On the server-side code, the user imports a util method `getServerState(..., ...)` to compute the initial state of the App and passes this initial state back to the client-side.

   **getServerState(App, pageURL)**: the first param of the function receives the `App` component ref and the second param *[optional]* receives the URL string or query param object(should be parsed) to respect the URL query string.

> Assuming [Next.js](https://nextjs.org/) used for SSR here.

```javascript
import getServerState from '@appbaseio/reactivesearch/lib/server';

// getServerSideProps method is run on server-side by Next.js
export async function getServerSideProps(context) {

  // calculating the initial state on server  
  let initialState = await getServerState(App, context.resolvedUrl);
  return {
    props: { initialState } // will be passed to the App component as props
  };
}

``` 

## Examples

### Using Next.js

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/dev/packages/web/examples/ssr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="appbaseio/searchbox"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Using Express.js

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/dev/packages/web/examples/ssr-with-react-dom?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="appbaseio/searchbox"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


## Example apps

We've covered all the existing components as an example app here:

-   [Components SSR demo with Next.js](https://github.com/appbaseio/reactivesearch/tree/dev/packages/web/examples/ssr)
-   [SSR demo with react-dom](https://github.com/appbaseio/reactivesearch/tree/dev/packages/web/examples/ssr-with-react-dom)
