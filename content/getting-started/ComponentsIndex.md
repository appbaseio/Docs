---
id: componentsindex
title: "Components Index"
layout: tutorial
sectionid: getting-started
permalink: getting-started/componentsindex.html
prev: reactivebase.html
prevTitle: "Base Component"
next: writingdata.html
nextTitle: "Writing Data"
---

**ReactiveSearch** and **ReactiveMaps** provide composable components for building data-driven user interfaces. This document explains the different kinds of components offered by the library and walks throughs scenarios of when to use which component.

All components are children (or sub-children) of the **ReactiveBase** component which connects the UI view to an appbase.io app (or an index in Elasticsearch).

Components are divided into four broad categories:  
1. `Basic components` are primitives that are useful across different types of UIs.
2. `Map components` are specific to a map based UI and are available under **ReactiveMaps** library.
3. `Search components` are part of **ReactiveSearch** and offer more specific or advanced versions of the basic components.
4. `Result components` offer UI views for displaying the results from the database queries. Database queries are fired by the library based on the interactions of the one of above categories of components.

> <i class="fa fa-info-circle"></i> Note
>
> **ReactiveSearch** library is currently the superset library which comes with all of the above components (including the map components). We recommend using that for the general use.  
`npm -i @appbaseio/reactivesearch` (or read more on [how to install](/getting-started/rsinstallation.html))

## 1. Basic Components

### TextField

<p>
<img src="https://imgur.com/PgOi2QY.png" style="float:left">

**[TextField](/docs/basic-components/textfield.html)** displays a text input field. It applies a **match** database query on the entered text.
</p>

### DataSearch

<p>
<img src="https://imgur.com/kbnVVkZ.png" style="float:left">

**[DataSearch](/docs/basic-components/datasearch.html)** displays a search input box. It supports autosuggestions, highlighting of results and querying against more than one fields via props.
</p>

> <i class="fa fa-info-circle"></i> Note
>
> If you are looking to apply a query on a user input, **DataSearch** is preferable over **TextField**.

### List Components

List is one of the most used data-driven UI displays and hence naturally, we offer a variety of ways to use this UI style.

#### String or Text Datatype

The following are all the possible UI components for a String datatype field in your appbase.io app. These apply a **term** or **terms** database query on the selected item(s).

<p>
<img src="https://imgur.com/p2PBKh6.png" style="float:left">

**[SingleList](/docs/basic-components/singlelist.html)** is useful for displaying a list of values where only one item can be selected at a time, and the values are retrieved by a database query on the field specified in the **dataField** prop.
</p>

<p>
<img src="https://imgur.com/waVNdgr.png" style="float:left">

**[MultiList](/docs/basic-components/multilist.html)** is useful for displaying a list of values where multiple values can be selected at a time. Similar to SingleList, these values are retrieved by a database query on the field specified in the **dataField** prop.
</p>

<p>
<img src="https://imgur.com/b9l8Mhd.png" style="float:left">

**[SingleDataList](/docs/basic-components/singledatalist.html)** is useful for displaying a list of user defined values where only one value item can be selected at a time. Unlike SingleList and MultiList where the values are auto-fetched, here the **data** prop allows curation of which values to display.
</p>

<p>
<img src="https://imgur.com/2b1iVDZ.png" style="float:left">

**[MultiDataList](/docs/basic-components/multidatalist.html)** is useful for displaying a list of user defined values where multiple value items can be selected at a time. Similar to the SingleDataList component, the **data** prop allows curation of which values to display.
</p>

> List vs DataList
>
> Use-cases where curation is important and only a few items need to be shown should use DataList components. Since it doesn't need to  auto-fetch the results, it also saves a network request.

<p>
<img src="https://imgur.com/a1be47e.png" style="float:left">

**[SingleDropdownList](/docs/basic-components/singledropdownlist.html)** displays a dropdown list UI where only one item can be selected at a time. It is similar to SingleList but is presented in a dropdown format to save space.
</p>

<p>
<img src="https://imgur.com/UVymwfo.png" style="float:left">

**[MultiDropdownList](/docs/basic-components/multidropdownlist.html)** displays a dropdown list UI where multiple items can be selected at a time. It is similar to MultiList.
</p>
<br>

> When to use dropdown lists
>
> Dropdown lists take up less space. If you have many filters to display or a smaller display area (like on phones), it is better to use dropdown lists.

#### Numeric Datatype

The following are all the possible UI components for a numeric datatype field in your appbase.io app. These apply a **range** database query on the selected item(s).

<p>
<img src="https://imgur.com/tPi76EU.png" style="float:left">

**[SingleRange](/docs/basic-components/singlerange.html)** displays a curated list of items where only one item can be selected at a time. Each item represents a range of values, specified in the **data** prop of the component.
</p>

> <i class="fa fa-info-circle"></i> Note
>
> Its counterpart for a String datatype would be **SingleDataList** component.

<p>
<img src="https://imgur.com/ulEoXvy.png" style="float:left">

**[MultiRange](/docs/basic-components/multirange.html)** displays a curated list of items where multiple items can be selected at a time. Each item represents a range of values, specified in the **data** prop of the component.
</p>

> <i class="fa fa-info-circle"></i> Note
>
> Its counterpart for a String datatype would be **MultiDataList** component.

<p>
<img src="https://imgur.com/2xxBIUg.png" style="float:left">

**[SingleDropdownRange](/docs/basic-components/singledropdownrange.html)** displays a dropdown list UI where only one item can be selected at a time. Each item in this dropdown list represents a range, specified in the **data** prop of the component.
</p>

<p>
<img src="https://imgur.com/MrTth88.png" style="float:left">

**[MultiDropdownRange](/docs/basic-components/multidropdownrange.html)** displays a dropdown list UI where only multiple items can be selected at a time. Each item in this dropdown list represents a range, specified in the **data** prop of the component.
</p>

### RangeSlider

<p>
<img src="https://imgur.com/n4HJ8dD.png" style="float:left">

**[RangeSlider](/docs/basic-components/rangeslider.html)** component applies on a numeric datatype (ideally an integer) field and displays a slider UI.
</p>

> RangeSlider vs Range lists
>
> A RangeSlider is useful when the selection of values is homogeneous, e.g. price across a set of products.

### ToggleButton

<p>
<img src="https://imgur.com/Ocb9Sir.png" style="float:left">

**[ToggleButton](/docs/basic-components/togglebutton.html)** component applies on a String or Text datatype field where you want users to select a choice (or choices) amongst a small number of total choices.
</p>

### NumberBox

<p>
<img src="https://imgur.com/svE3sly.png" style="float:left">

**[NumberBox](/docs/basic-components/numberbox.html)** component applies on a numeric datatype field where you want to display a selectable field value that can be incrementally increased or decreased, e.g. no of guests field in a hotel booking app.
</p>

### DatePicker and DateRange

<p>
<img src="https://imgur.com/rJsL0mK.png" style="float:left"><img src="https://imgur.com/7dKLsNO.png" style="float:left">

**[DatePicker](/docs/basic-components/datepicker.html)** and **[DateRange](/docs/basic-components/daterange.html)** components are useful for showing selectable date fields. They apply to Date datatype field, and internally apply a date range query on the database.
</p>

### DataController

<p>
<img src="https://imgur.com/qdxEIAz.png" style="float:left">

**[DataController](/docs/basic-components/datacontroller.html)** is a UI optional component for adding additional queries, e.g. a query based on current URL page path, a default query, a query based on user's global profile preferences. At the same time, it can also have a UI - this is a catchall component to display something that doesn't fit within other components.
</p>

## 2. Map Components

Map components are specific to dataset that has a Geopoint datatype, i.e. a (lat, lon) co-ordinate available in at least one field.

### PlacesSearch

<p>
<img src="https://imgur.com/8KcudGi.png" style="float:left">

**[PlacesSearch](/docs/map-components/placessearch.html)** is a UI component for selecting places from the database based on proximity to a user selected landmark location.
</p>

### GeoDistanceDropdown and GeoDistanceSlider

<p>
<img src="https://imgur.com/DNdxhB9.png" style="float:left"><img src="https://imgur.com/CfMpulx.png" style="float:left">

**[GeoDistanceDropdown](/docs/map-components/geodistancedropdown.html)** and **[GeoDistanceSlider](/docs/map-components/geodistanceslider.html)** are UI components for displaying a location search UI where a user can find all the data within a distance range of their selected landmark location.
</p>

> <i class="fa fa-info-circle"></i> Note
>
> These components provide more flexibility than the PlacesSearch component in specifying the distance range as either a slider or a dropdown list.

## 3. Search Components

Search components are more specific versions of the basic components that are useful with an e-commerce or aggregator kind of app.

### CategorySearch

<p>
<img src="https://imgur.com/kbnVVkZ.png" style="float:left">

**[CategorySearch](/docs/search-components/categorysearch.html)** is a more specific version of the  [DataSearch](/docs/basic-components/datasearch.html) component. The main difference is that it can show suggestions within specific categories besides the general auto-suggestions that appear in the search dropdown.
</p>

### DynamicRangeSlider

<p>
<img src="https://imgur.com/n4HJ8dD.png" style="float:left">

**[DynamicRangeSlider](/docs/search-components/dynamicrangeslider.html)** is a more specific version of the [RangeSlider](/docs/basic-components/rangeslider.html) component where the available range is dynamically pre-determined based on the sub-set of data filtered by other components in the view.
</p>

### NestedList

<p>
<img src="https://imgur.com/XvjkvCZ.png" style="float:left">

**[NestedList](/docs/search-components/nestedlist.html)** is a list with more sub-lists within each list. It is useful for displaying a menu of categories and sub-categories in an e-commerce setting.
</p>

### NestedMultiList

<p>
<img src="https://imgur.com/XvjkvCZ.png" style="float:left">

**[NestedMultiList](/docs/search-components/nestedmultilist.html)** takes NestedList to the next level by allowing selection of multiple items within the list.
</p>

### RatingsFilter

<p>
<img src="https://imgur.com/BxizhXe.png" style="float:left">

**[RatingsFilter](/docs/search-components/ratingsfilter.html)** is useful for showing a UI selection choice based on ratings score. To be applied on a numeric datatype field.
</p>

### TagCloud

<p>
<img src="https://imgur.com/lC5KfOK.png" style="float:left">

**[TagCloud](/docs/search-components/tagcloud.html)** is useful for showing a weighted tag cloud of items based on the frequency of occurrences.
</p>

### MultiLevelMenu

<p>
<img src="https://imgur.com/oErIN7V.png" style="float:left">

**[MultiLevelMenu](/docs/search-components/multilevelmenu.html)** is useful for showing an e-commerce app's main navigation menu based on the database field.
</p>

## 4. Result Components

Result components are used for displaying the results (aka hits).

> How do result components fetch results by combining queries from multiple components?
>
> They do this via [**react**](/docs/advanced/react.html) prop, which allows each component to specify their dependent components using a DSL that mirrors Elasticsearch's compound query DSL for bool clause.

### ResultList

<p>
<img src="https://imgur.com/L8xTmWd.png" style="float:left">

**ResultList** displays the results in a list layout.
</p>

### ResultCard

<p>
<img src="https://imgur.com/VGra3hs.png" style="float:left">

**ResultCard** displays the results in a card layout.
</p>

### ReactiveList

<p>
<img src="https://imgur.com/PCBwK7t.png" style="float:left">

**ReactiveList** displays the results in a configurable list layout. This is a more flexible display component (used internally by both ResultList and ResultCard) that allows more customization than ResultList and ResultCard.
</p>

### ReactiveMap

<p>
<img src="https://imgur.com/38hL346.png" style="float:left">

**ReactiveMap** displays the results on a map. When results contain geopoints (lat,lon), ReactiveMap component can be used to display them on a map interface.
</p>

### ReactiveElement

<p>
<img src="https://imgur.com/QgjzJv5.png" style="float:left">

**ReactiveElement** displays the results in a user defined DOM element. There are instances where a completely custom UI may be required to display the results, e.g. a line chart. You can use ReactiveElement component to configure such displays.
</p>
