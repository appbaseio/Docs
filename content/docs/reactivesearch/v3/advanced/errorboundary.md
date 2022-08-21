---
title: 'ErrorBoundary'
meta_title: 'ErrorBoundary'
meta_description: 'ErrorBoundary helps to catch errors in reactivesearch components using a declarative API.'
keywords:
    - reactivesearch
    - stateprovider
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

`ErrorBoundary` helps to catch errors in reactivesearch components using a declarative API. When we want to safeguard the other parts of the UI from a error prone part then we can wrap it with a `ErrorBoundary`. All the `ErrorBoundary` must live inside the `ReactiveBase` component.

## Usage

### Basic Usage

```js
<ReactiveBase
	{...configuration}
>
	<ErrorBoundary>
		<ReactiveComponent {...config}/>
	</ErrorBoundary>
</ReactiveBase>
```

### Props

-   **componentIds** `string|string[]` [optional]
    By default `ErrorBoundary` watches for network request errors in all components and runtime errors in all it's descendants. If we want to restrict the components for getting network request errors then we can use `componentIds`.

-	**renderError** `function` [optional]
	A function for customizing the error message. This passes two parameters, `error` and `componentId`, and returns a JSX component that would be shown on recieving error.

-	**onError** `function` [optional]
	A function called for performing side-effects such as logging errors. It is passed the same parameters as `renderError`, `error` and `componentId`.

### Example

Below is an example using `ErrorBoundary`. We simulate an error which causes a failed network request using `dataField` as empty. However this would not break the whole UI and just be contained to the part enclosed by the `ErrorBoundary`. 

```js
<ErrorBoundary
	renderError={error => (
		<div>
			<h1>Oops! Error occured.</h1>
			<p>{error.message}</p>
		</div>
	)}
>
	<DynamicRangeSlider
		dataField="_"
		componentId="BookSensor"
		rangeLabels={(min, max) => ({
			start: `${min} book`,
			end: `${max} books`,
		})}
	/>
</ErrorBoundary>
```

Below is a live example built using Codesandbox.

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ErrorBoundary?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="errorboundary"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>