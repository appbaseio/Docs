---
id: styleguide
title: "Style Guide"
layout: docs
sectionid: docs
permalink: docs/advanced/styleguide.html
prev: mapping.html
prevTitle: "Data Mappings"
next: theming.html
nextTitle: "Theming"
---

## Principles

**reactivebase** component styles follow these principles:

1. Minimal opinions - Reactivebase is a data components library, it tries to be minimally opinionated when it comes to UI design.
2. Works out of the box - The library comes with Material UI and comes with bootstrap pollyfill to get standardized components wherever possible.
3. Extendible - The classname API follows a consistent naming structure which allows intuitive additions.
4. Themes - Reactivebase itself uses **sass** styling, making thematic changes a breeze.

## Class API

All reactivebase components use a `rbc` namespace and base class. All classes use a lowercase naming convention.

### Component class API

A component class specification follows a `rbc-{componentname}` naming pattern. For instance, a `SingleList` component will have a classname of `rbc-singlelist`.

| Component Name  |  CSS Class Name |
|---------------- | --------------- |
| SingleList      | rbc-singlelist  |
| MultiList       | rbc-multilist   |
| SingleDropdownList      | rbc-singledropdownlist  |
| MultiDropdownList       | rbc-multidropdownlist   |
| NestedList      | rbc-nestedlist  |
| SingleRange     | rbc-singlerange |
| MultiRange      | rbc-multirange  |
| SingleDropdownRange      | rbc-singledropdownrange  |
| MultiDropdownRange       | rbc-multidropdownrange   |
| ToggleButton    | rbc-togglebutton |
| RangeSlider     | rbc-rangeslider |
| TextField       | rbc-textfield    |
| DataSearch      | rbc-datasearch   |
| DatePicker      | rbc-datepicker   |
| DateRange       | rbc-daterange    |
| ResultList      | rbc-resultlist   |
| PaginatedResultList      | rbc-paginatedresultlist   |


### Component States class API

A component has different states depending on the set props. For instance, a TextField component with a `title` prop set looks like this:

![](https://i.imgur.com/A4PKECq.png)

A TextField component without a `title` prop set looks like this:

![](https://i.imgur.com/cwMmYZP.png)

The component state used for title is represented with the CSS class `rbc-title-active` when the title is present and `rbc-title-inactive` when the title prop is not set.

Globally applicable component states:

| Component Prop    | CSS Class Name (when set) |
|------------------ |-------------------------- |
| title             | rbc-title-active          |
| placeholder       | rbc-placeholder-active    |

States applicable only to **SingleList**, **MultiList** and **NestedList** components.

| Component Prop    | CSS Class Name (when set) |
|------------------ |-------------------------- |
| showCount         | rbc-count-active          |
| showSearch        | rbc-search-active         |

States applicable only to **DataSearch** component.

| Component Prop   | CSS Class Name (when set) |
|----------------- |-------------------------- |
| autocomplete     | rbc-autocomplete-active   |

States applicable only to **ResultList** component.

| Component Prop   | CSS Class Name (when set) |
|----------------- |-------------------------- |
| sortOptions      | rbc-sortoptions-active    |
| stream           | rbc-stream-active         |

Each component's documentation contains a styles API which will list the relevant states and their CSS class names.

### Styling within components

Components can have child elements and subcomponents. All ReactiveBase components follow a consistent API so that end-users can work with the CSS classes of the inner elements.

![ToggleButton annotated image](https://i.imgur.com/lMbqk2H.png)
[Example here for ToggleButton component styles](http://opensource.appbase.io/reactivebase-manual/v1/components/ToggleButton.html#-togglebutton-css-styles-api).
