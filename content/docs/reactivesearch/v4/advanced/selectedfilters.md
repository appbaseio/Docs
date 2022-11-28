---
title: 'SelectedFilters'
meta_title: 'SelectedFilters'
meta_description: 'SelectedFilters creates a selectable filter UI view displaying the current selected values from other components.'
keywords:
    - reactivesearch
    - selectedfilters
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/6GqSVW2.png)

`SelectedFilters` creates a selectable filter UI view displaying the current selected values from other components. This component is useful for improving selection accessibility of other components.

Example uses:

-   displaying all the user selected facet filters together in the main view area for better accessibility.
-   building mobile responsive views where it is not practical to show all the UI components in the main view.

## Usage

### Basic Usage
```jsx
<SelectedFilters />
```

### Usage with All Props
```jsx
<SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
```

## Props
### showClearAll 

| Type | Optional |
|------|----------|
|  `enum` `('never', 'always', 'default', true, false)` |   Yes   |

Defaults to `true`.
It behaves according to the following scenarios: <br />
- `never`: Clear All button is never shown.
- `always`: Clear All button is shown based on values set by components.
- `default`: Clear All button is shown for components which have selected values and `showFilter={true}`
- `true`: Identical behavior to `always`.
- `false`: Identical behavior to `never`.

> Note: **showFilter** prop doesn't affect Clear All behavior when **showClearAll="always"**.
### clearAllLabel
| Type | Optional |
|------|----------|
|  `string` |   Yes   |

Sets the label for the clear all button.
### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

Provides access to the current selected values. This enables you to retrieve the selected filters and current search state in a convenient way.
### onClear

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

a callback function which will be called when a particular filter(value) has been removed from the selected filters, provides the `component` and `value`. <br/><br/>
Example:

```jsx
<SelectedFilters
onClear={(component, value) => {
    console.log(`${component} has been removed with value as ${value}`);
}}
/>
```
### resetToDefault

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

When set to true and clearAll functionality is utilised, then it would set the filter's value to its default set value(the `defaultValue` prop) instead of null/ undefined. 
Defaults to `false`.

### resetToValues

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

It is a map of `componentId` to the component's value which would be used to set the component's value when `clearAll` action gets called. For example, the following configuration would reset the `AuthorFilter` to `Nora Roberts` on `clearAll` action.

```jsx
<SelectedFilters
	resetToValues={{
        AuthorFilter: ['Nora Roberts']
    }}
/>
```
### clearAllBlacklistComponents [optional]

| Type | Optional |
|------|----------|
|  `Array` |   Yes   |
 
allows defining a list of component IDs, which would reset their values when `clearAll` action gets triggered.

The following example instructs the `SelectedFilters` component to not reset the `searchbox` component's value when `clearAll` button is clicked by the user.

```jsx
<SelectedFilters
	clearAllBlacklistComponents={['searchbox']}
/>
```

> Note: The `clearAllBlacklistComponents` prop has priority over `resetToValues` and `resetToDefault` props which means component would retain its current value and would ignore the values defined in `resetToValues` map or `defaultValue` prop.

Most ReactiveSearch filter components have a prop `showFilter` (defaults to `true`) which can be used to control whether the component's selected state appears in the SelectedFilters component. There is also a `filterLabel` prop which controls how that component is displayed.

> Note
>
> The `showFilter` and `filterLabel` prop updates are only reflected if the underlying query of the associated component has changed.

As an example, check [MultiList usage](/docs/reactivesearch/v4/list/multilist/#usage) to see how `showFilter` and `filterLabel` can be used.

### Demo
<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/dev/packages/web/examples/SelectedFilters" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Styles
`SelectedFilters` component supports `innerClass` prop with the following keys:

-   `button`

Read more about it [here](/docs/reactivesearch/v4/theming/classnameinjection/).

## Extending

`SelectedFilters` component can be extended to customize the look and feel with `className`, `style`.

```jsx
<SelectedFilters className="custom-class" style={{ paddingBottom: '10px' }} />
```

### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
### style

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

CSS styles to be applied to the **SelectedFilters** component.
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables custom rendering for **SelectedFilters** component. It provides an object as a param which contains all the props needed to render the custom selected-filters, including the functions to clear and update the component values. [Check the usage here](https://github.com/appbaseio/reactivesearch/blob/dev/packages/web/examples/CustomSelectedFilters/src/index.js).

It accepts an object with these properties:
- **`components`**: `Array<String>`
    array of `componentId`s which have got `showFilter` set to `true`.
- **`selectedValues`**: `Object`
    map of components' Ids and their updated values.
- **`clearValues`**: `Function - () => void` 
    function to clear all selected filters.
- **`clearValue`**: `Function - (String) => void` 
    function to clear a selected filter's value. It takes the `componentId` as a param.
- **`setValue`**: `Function - (String, Any) => void` 
    function to set a component's value. It takes the `componentId` and `value`(to set) as parameters.
- **`resetValuesToDefault`**: `Function - (Array<String>) => void`
    function to reset values of the selected filters to their default values. It accepts an Array of componentIds to avoid resetting their values.
        
### Examples
SelectedFilters work with most ReactiveSearch components. See more stories for SelectedFilters with a SingleList on playground.

<a href="https://opensource.appbase.io/playground/?selectedKind=List%20components%2FSingleList" target="_blank">SingleList with SelectedFilters</a>
