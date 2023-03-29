---
title: 'CustomSuggestions'
meta_title: 'CustomSuggestions'
meta_description: 'Recipe for rendering custom suggestions with SearchBox component using the render and renderItem props.'
keywords:
- reactivesearch
- customsuggestions
- appbase
- elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

Recipe for rendering custom suggestions with `SearchBox` component using the `render` prop.

ReactiveSearch uses the wonderful [downshift](https://github.com/paypal/downshift) for rendering dropdowns and `render` prop provides great extensibility for custom suggestions rendering. `render` is a [render function](https://reactjs.org/docs/render-props.html) which receives some parameters which you may use to build your own custom suggestions rendering

## Custom Suggestions for SearchBox

```jsx
    <SearchBox
        render={({ 
            loading, 
            error, 
            data, 
            value, 
            downshiftProps: { isOpen, getItemProps } 
            }) => {
                if (loading) {
                    return <div>Fetching Suggestions.</div>;
                }
                if (error) {
                    return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
                }
                return isOpen && Boolean(value.length) ? (
                    <div>
                        {data.map((suggestion, index) => (
                            <div key={suggestion.value} {...getItemProps({ item: suggestion })}>
                                {suggestion.value}
                            </div>
                        ))}
                        {Boolean(value.length) && (
                            <div {...getItemProps({ item: { label: value, value: value } })}>
                                Show all results for "{value}"
                            </div>
                        )}
                    </div>
                ) : null;
        }}
    />
```

Or you can also use render function as children

```jsx
    <SearchBox>
        {
            ({
                loading,
                error,
                data,
                rawData,
                value,
                downshiftProps
            }) => (
                // return UI to be rendered
            )
        }
    </SearchBox>
```

Check out the [example](https://opensource.appbase.io/playground/?path=/story/search-components-searchbox--with-custom-renderer) on playground.

The `getItemProps` provides some props that you should pass to your suggestions for them to work properly with downshift. The paramter should be an object with key `item` which should have a `value` field. For example:

```js
<div {...getItemProps({ item: { value: suggestion } })} />
```

The `rawData` parameter receives all the unparsed suggestions from elasticsearch, however `data` are also passed which can also be used for suggestions rendering.


## Customizing individual suggestions

It's also possible to customize the individual suggestions by using the `renderItem` prop.

```jsx
    <SearchBox
        {...props}
        componentId="BookSensor"
        renderItem={
            (suggestion)=>{
                // custom render every suggestion item in dropdown
                return <span>{suggestion.label}</span> 
            }
        }
    />
```