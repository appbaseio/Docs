---
title: 'TreeList'
meta_title: 'TreeList'
meta_description: 'TreeList creates a multiple selection based tree UI component that is connected to multiple database fields.'
keywords:
    - reactivesearch
    - treelist
    - hierarchicalmenu
    - appbase
    - elasticsearch
    - vue
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![TreeList image](https://i.imgur.com/AwUfFJ7.png)

`TreeList` creates a selection based hierarchical tree UI component that is connected to multiple database fields. It can support single as well as multiple item selections.

Example uses:

-   select category/ subcategory items from a list of categories in an e-commerce website.

## Usage

### Basic Usage

```jsx
    <TreeList 
        componentId="treeListSensor" 
        :dataField="['class.keyword', 'subClass.keyword']"
        title="Products" 
    />
```

### Usage (with all props)

```vue
    <TreeList
    	componentId="TreeListComponent"
    	mode="multiple"
    	:URLParams="true"
    	:dataField="['class.keyword', 'subclass.keyword']"
    	:showCount="true"
    	:showCheckbox="true"
    	:showSwitcherIcon="true"
    	:showIcon="true"
    	:showLeafIcon="true"
    	:showLine="true"
    	:showSearch="true"
    	:endpoint="{
    		url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io/best-buy-dataset/_reactivesearch.v3', //mandatory
    		headers: {
    			// relevant headers
    		},
    		method: 'POST',
    	}"
    	:showRadio="true" // use with mode="single"
    />
```

### Usage (as a controlled component)

```vue
<template>
	<TreeList
    	componentId="TreeListComponent"
		mode="multiple"
		:URLParams="true"
		:dataField="['class.keyword', 'subclass.keyword']"
    	:value="values"
    	:onChange="setValues"
    />
</template>
<script>
export default {
	name: 'TreeListExample',
	data(){
		return {
			value: [
        "FURNITURE SO > SO CHAIR &RECLIN",
        "FURNITURE SO > SO DINING ROOM"
    ]
		}
	},
	methods:{
		setValues(values){
			this.value = values;
		}
	}

};
</script>
```

## Props

### componentId

| Type | Optional |
|------|----------|
|  `String` |   No   |

unique identifier of the component, can be referenced in other components' `react` prop.

### compoundClause

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use `must`. Setting the compound clause to filter allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. term, geo or range type of queries that act as filters on the data)

This property only has an effect when the search engine is either elasticsearch or opensearch.


> Note: `compoundClause` is supported since 8.16.0 and for all serverless search instances.


### endpoint

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

 
endpoint prop provides the ability to query a user-defined backend service for this component, overriding the data endpoint configured in the ReactiveBase component. 
Accepts the following properties:
-   **url** `String` [Required]
    URL where the data cluster is hosted.
-   **headers** `Object` [optional]        
    set custom headers to be sent with each server request as key/value pairs.
-   **method** `String` [optional]    
    set method of the API request.
-   **body** `Object` [optional]    
    request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.
 > - Overrides the endpoint property defined in ReactiveBase.
> - If required, use `transformResponse` prop to transform response in component-consumable format.
  
### dataField

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |

data field to be connected to the component's UI view. This field is used for doing an aggregation and returns the result. `dataField` array must have values in order, i.e, category > sub-cateogry and so-on.
### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |


title of the component to be shown in the UI. Defaults to no title being shown.
### loader

| Type | Optional |
|------|----------|
|  `String or jsx(slot)` |   Yes   |


to display an optional loader while fetching the options.

### aggregationSize
To set the number of buckets to be returned by aggregations.


### sortBy

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


sort the list items by one of `count`, `asc`, or `desc`. Defaults to `count`, which sorts the list by the frequency of count value, most first.
### defaultValue

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |


select one or more options from the list on mount. Accepts an `Array` object containing the items that should be selected.
### value

| Type | Optional |
|------|----------|
|  `String Array` |   Yes   |


controls the current value of the component. It selects the item from the list (on mount and on update). Use this prop in conjunction with `onChange` function.
### queryFormat

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


queries the selected items from the list in one of two modes: `or`, `and`.
-   Defaults to `or` which queries for results where any of the selected list items are present.
-   In `and` mode, the applied query filters results where all of the selected items are present.
### mode

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


supports two modes, `multiple` and `single`. When set to `single`, only one selection from the hierarchy is allowed. Defaults to `multiple`.
### showCheckbox

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show checkbox icon for each list item. Defaults to `false`.Use this prop in conjunction with `mode` prop set to `multiple`.
### showRadio

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show radio icon for each list item. Defaults to `false`.Use this prop in conjunction with `mode` prop set to `single`.    
### showCount

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show a count of the number of occurences besides each list item. Defaults to `true`.
### showIcon

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show icon for non-leaf hierarchy items. Defaults to `false`.   
### icon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |


custom icon for non-leaf hierarchy items.

```js
<template #icon>
    <span role="img" aria-label="folder-icon">
     🦷 
    </span>
</template>
```         
### showLeafIcon

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show icon for leaf hierarchy items. Defaults to `false`.   
### leafIcon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |


custom icon for leaf hierarchy items.

```jsx
<template #leafIcon>
    <span role="img" aria-label="leaf-icon"> 
        ☘️ 
    </span>
</template>
```     
### showSwitcherIcon

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show switcher icon for TreeList.   
### switcherIcon

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

 
custom switcher icon for TreeList. It takes an boolean argument to depict expanded/ collapsed list item.

```jsx
<template #switcherIcon="bool">
    <span v-if="bool">⬇️</span>
    <span v-else>✨</span>
</template>
```               
### showSearch

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


whether to show a searchbox to filter the list items locally. Defaults to true.
### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


placeholder to be displayed in the searchbox, only applicable when the `showSearch` prop is set to `true`. When applicable, the default placeholder value is set to "Search".

### showFilter

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


show as filter when a value is selected in a global selected filters view. Defaults to `true`.
### filterLabel

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
### URLParams

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |


enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.
### renderItem

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


customize the rendered list itemss via a function which receives the item label, count & isSelected and expects a JSX or String back. For example:

```js
<template #renderItem="listItemLabel, listItemCount, isSelected">
    <span :style="isSelected ? { background: 'green' } : {}">
    	{{ listItemLabel }} - {{ listItemCount }}
    </span>
</template>
```
### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
<br/>
It accepts an object with these properties:
-   **`loading`**: `boolean`
    indicates that the query is still in progress
-   **`error`**: `object`
    An object containing the error info
-   **`data`**: `array`
    An array of results obtained from the applied query and transformed into component consumable format.
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.
-   **`value`**: `array`
    current selected values.
-   **`handleClick`**: `function`
    A callback function can be used to mark the list value as selected. Accepts the list item label and parent-path of the current item, eg, in "Tree > Branch > Leaf" the parent-path of 'Leaf' would be 'Tree.Branch'.
-   **`PATH_SEPARATOR`**: `string`
    A string that can be used to join/ separate the category-subcategory paths while storing them locally.
    Eg: 
    ```js
    exampleSelectedPath = `Toys${PATH_SEPARATOR}Race Car`;
    ```

```js
<template
    #render="{
        data,
        handleClick,
        value,
        PATH_SEPARATOR,
        error,
        loading,
        rawData,
    }"
>
    <RenderList // component to render custom UI
        :transformedData="data"
        :handleClick="handleClick"
        :selectedValues="value"
        :TREELIST_VALUES_PATH_SEPARATOR="PATH_SEPARATOR"
        :rawData="rawData"
        :error="error"
        :loading="loading"
    />
</template>
```                    

### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |


can be used to render an error message in case of any error.
```js
<template #renderError="error">
    <div>
        Something went wrong!<br/>Error details<br/>{{error}}
    </div>
</template>
```
### renderNoResults

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


can be used to render a message in case of no list items.
 ```jsx
renderNoResults={() => <p>No Results Found!</p>}
```

### onChange

| Type | Optional |
|------|----------|
|  `function` |   Yes   |


is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` props and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms/#controlled-components) behavior.

### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |


gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.
### index

| Type | Optional |
|------|----------|
|  `String` |   Yes   |


The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.
 
## Demo

### Basic
<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/tree-list" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<br />


## Styles

`TreeList` component supports `innerClass` prop with the following keys:

-   `title`
-   `input`
-   `checkbox`
-   `radio`
-   `label`
-   `count`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).

## Extending

`TreeList` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`, `defaultQuery`,
3. connect with external interfaces using `beforeValueChange`, `onValueChange` and `onQueryChange`,
4. specify how options should be filtered or updated using `react` prop.

```jsx
<TreeList
  // ...
  className="custom-class"
  :style="{paddingBottom: '10px'}"
  :customQuery="
    function(value, props) {
      return {
        query: {
            match: {
                data_field: ['this is a test']
            }
        }
      }
    }"
  :defaultQuery="
    function(value, props) {
      return {
          timeout: '1s'
      }
    }
  "
  :beforeValueChange="
    function(value) {
      // called before the value is set
      // returns a promise
      return new Promise((resolve, reject) => {
        // update state or component props
        resolve()
        // or reject()
      })
    }
  "
  :onValueChange="
    function(value) {
      console.log('current value: ', value)
      // set the state
      // use the value with other js code
    }
  "
  :onQueryChange="
    function(prevQuery, nextQuery) {
      // use the query with other js code
      console.log('prevQuery', prevQuery);
      console.log('nextQuery', nextQuery);
    }
  "
  :react="{
    'and': ['pricingFilter', 'dateFilter'],
    'or': ['searchFilter']
  }"
/>
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

CSS styles to be applied to the **TreeList** component.
### customQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
`Note:` customQuery is called on value changes in the **TreeList** component as long as the component is a part of `react` dependency of at least one other component.
`Note:` When extending with customQuery, the `queryFormat` prop has no affect.
### defaultQuery

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
Read more about it [here](/docs/reactivesearch/react/advanced/customqueries/#when-to-use-default-query).
### beforeValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called every time before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.
 > Note:
>
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:
 ```js
:beforeValueChange = "function(values){
    // The update is accepted by default
	if (values.includes('Dirk Pitt')) {
		// To reject the update, throw an error
		throw Error('Selected values should not include Dirk Pitt.');
	}"
}
```

### onValueChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This prop is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with an applicable discount coupon code when list item(s) is/are selected in a "E-commerce Product" TreeList.
### onQueryChange

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

is a callback function which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This prop is handy in cases where you want to generate a side-effect whenever the component's query would change.
### react

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

specify dependent components to reactively update **TreeList's** options.
-   **key** `String`
    one of `and`, `or`, `not` defines the combining clause.
    -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
    -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
    -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
-   **value** `String or Array or Object`
    -   `String` is used for specifying a single component by its `componentId`.
    -   `Array` is used for specifying multiple components by their `componentId`.
    -   `Object` is used for nesting other key clauses.

## Examples

<a href="https://opensource.appbase.io/playground/?selectedKind=List%20components%2FTreeList" target="_blank">TreeList with default props</a>
