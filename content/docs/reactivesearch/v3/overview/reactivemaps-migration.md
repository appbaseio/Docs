---
title: 'ReactiveMaps Migration Guide'
meta_title: 'ReactiveMaps Migration Guide'
meta_description: 'ReactiveMaps Migration guide for the 3.x stable release'
keywords:
    - migration guide
    - reactivesearch
    - reactivemaps    
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---
 
ReactiveMaps 3.0.0 is published 🎉 with new features and is easier than ever to setup and use. This guide talks about what has changed in 3.0.0 and how should you as a user be switching to a 3.x stable version without breaking things.


> Behind the scenes, we have switched from using the unmaintained `react-google-maps` to a maintained rewrite in the `@react-google-maps/api` library.

## Script Loading

ReactiveMaps now takes the responsibility of loding the script by itself instead of letting the user add a script tag in head of the site's html file.

Now, just pass the secret google key to the `ReactiveBase` wrapper component using `mapKey` prop and that's it. 

- before
	```html
	<html>
		<head>
			<script src="_GOOGLE_SCRIPT_LINK"></script>
		</head>
	</html>	
	```

- after
	```jsx
		<ReactiveBase
			mapKey="<YOUR_MAP_KEY>"
		>
		</ReactiveBase>
	```

Additionally, pass the `mapLibraries` prop to load additional google libraries like `places`, `visualization`, and more. The following values can be set as per the [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript/libraries):
    - `drawing`
    - `geometry`
    - `localContext`
    - `places`
    - `visualization`

```jsx
<ReactiveBase
	mapKey="<YOUR_MAP_KEY>"
	mapLibraries={['visualization', 'places']}
    // ...other props
/>
```

> It's required to pass ***`mapLibraries={['places']}`*** when using either GeoDistanceDropdown or GeoDistanceSlider components from [ReactiveMaps 🗺️ ](https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/).

## Component API changes

### ReactiveMap

The following API changes apply to both [ReactiveGoogleMap](/docs/reactivesearch/v3/map/reactivegooglemap/) and [ReactiveOpenStreetMap](/docs/reactivesearch/v3/map/reactiveopenstreetmap/) components.

1. `renderAllData` changes to `render` prop.
    - before
        
        ```jsx
        
        renderAllData={(hits, loadMore, renderMap, renderPagination, triggerClickAnalytics, meta) => {        
                return(
                    <>
                        {hits.map(hit => <pre onClick={() => triggerClickAnalytics(hit._click_id)}>{JSON.stringify(hit)}</pre>)}
                        {renderMap()}
                    </>
                )
            }
        ```
        
    - after
        
        ```jsx
        render={(props) => { 
            const 
            {
                data: hits, // parsed hits
                loading,
                error,
                promotedData,
                customData,
                rawData,
                resultStats: {
                   numberOfResults
                   numberOfPages
                   currentPage
                   displayedResults
                   time
                   hidden
                   promoted
                },
                loadMore // func to load more results
                triggerClickAnalytics // to trigger click analytics
                setPage,
                renderMap // allow users to render the map component at any place
                renderPagination // allows to render pagination component after displaying results
            } = props;
            return(
                <>
                    {data.map(hit => <pre onClick={() => triggerClickAnalytics(hit._click_id)}>{JSON.stringify(hit)}</pre>)}
                    {renderMap()}
                </pre>
            )
        }
        ```
		
2. `renderData` changes to `renderItem` prop
    - before
        
        ```jsx
        renderData={result => ({
            custom: (<div>{result.mag}</div>),
        })}
        
        ```
        
    - after
        
        ```jsx
        renderItem={result => ({
            custom: (<div>{result.mag}</div>),
        })}
        ```
