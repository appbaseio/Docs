---
title: 'SelectedFilters'
meta_title: 'SelectedFilters'
meta_description: '`SelectedFilters` creates a selectable filter UI view displaying the current selected values from other components.'
keywords:
    - reactivesearch
    - selectedfilters
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/6GqSVW2.png)

`SelectedFilters` creates a selectable filter UI view displaying the current selected values from other components. This component is useful for improving selection accessibility of other components.

Example uses:

-   displaying all the user selected facet filters together in the main view area for better accessibility.
-   building mobile responsive views where it is not practical to show all the UI components in the main view.

## Usage

### Basic Usage
```js
<template>
	<selected-filters />
</template>
```

### Usage with All Props
```js
<selected-filters
    clearAllLabel="Clear filters"
    :showClearAll="true"
/>
```

### Props
### showClearAll 
| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

Defaults to `true`. When set to `true`, displays an additional button to clear all the filters
### clearAllLabel 
| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |
 
Defaults to `'Clear All'`. Sets the label for the clear all button.
### title

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

Can be used to set a title
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
```html
<selected-filters
    :resetToValues="{
        'AuthorFilter': ['Nora Roberts']
    }"
>
```
### clearAllBlacklistComponents

| Type | Optional |
|------|----------|
|  `Array` |   Yes   |

allows defining a list of component IDs, which would reset their values when `clearAll` action gets triggered.

The following example instructs the `SelectedFilters` component to not reset the `searchbox` component's value when `clearAll` button is clicked by the user.

```html
<selected-filters
    :clearAllBlacklistComponents="['searchbox']"
>
```

> Note: The `clearAllBlacklistComponents` prop has priority over `resetToValues` and `resetToDefault` props which means component would retain its current value and would ignore the values defined in `resetToValues` map or `defaultValue` prop.

Most ReactiveSearch filter components have a prop `showFilter` (defaults to `true`) which can be used to control whether the component's selected state appears in the SelectedFilters component. There is also a `filterLabel` prop which controls how that component is displayed.

> Note
>
> The `showFilter` and `filterLabel` prop updates are only reflected if the underlying query of the associated component has changed.

As an example, check [MultiList usage](/docs/reactivesearch/vue/list/MultiList/#usage) to see how `showFilter` and `filterLabel` can be used.

### Events
### change

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

Provides access to the current selected values. This enables you to retrieve the selected filters and current search state in a convenient way.
### clear

| Type | Optional |
|------|----------|
|  `function` |   Yes   |

a callback function which will be called when a particular filter(value) has been removed from the selected filters, provides the `component` and `value`.

### Styles
`SelectedFilters` component supports `innerClass` prop with the following keys:

-   `button`

Read more about it [here](/docs/reactivesearch/vue/theming/ClassnameInjection/).

## Extending

`SelectedFilters` component can be extended to customize the look and feel with `className`.

```js
<selected-filters className="custom-class" />
```

### className

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

CSS class to be injected on the component container.
-   **slot-scope** ( Default Slot )
Enables custom rendering for **SelectedFilters** component. It provides an object as a param which contains all the props needed to render the custom selected-filters, including the functions to clear and update the component values. You can find the example at [here](https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/selected-filters-custom).

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
