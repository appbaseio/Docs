---
title: 'ReactiveMaps Migration Guide'
meta_title: 'ReactiveMaps Migration Guide'
meta_description: 'ReactiveMaps Migration guide provides with smooth migration to the new release.'
keywords:
    - migration guide
    - reactivesearch
    - reactivemaps    
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---
 
ReactiveMaps is rolled out with new features and easy to setup/ use setup. This guide talks about what's changed and how should a user be switching to the newest version without breaking things.


> Behind the scenes, we have switched from using the unmaintained `react-google-maps` to a maintained rewirte `@react-google-maps/api` library.

## Script Loading

ReactiveMaps now takes the responsibility of loding the script by itself instead of letting the user add a script tag in head of the site's html file.

Now, just pass the secret google key to the `ReactiveBase` wrapper component using `mapKey` prop and that's it. 

- before
	```html
	<html>
		<head>
			<script src="_GOOGLE_SCRIT_LINK"></script>
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

Additionally, pass the `mapLibraries` prop to load additional google libraries like `places`, `visualization`, etc.
The following are available according to [Google Docs](https://developers.google.com/maps/documentation/javascript/libraries):
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

> Mandatorily pass ***`mapLibraries={['places']}`*** when using either or both of GeoDistanceDropdown/ GeoDistanceSlider components from [ReactiveMaps 🗺️ ](https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/).

## Component API changes

### ReactiveGoogleMap/ ReactiveOpenStreetMap

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
                data: hits, // parased hits
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
		
2. `renderData` changes to `renderItem` prop.
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