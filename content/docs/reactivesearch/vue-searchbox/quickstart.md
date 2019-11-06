---
title: 'QuickStart'
meta_title: 'QuickStart to Vue SearchBox'
meta_description: 'Vue SearchBox is a lightweight vue search library with some common utilities.'
keywords:
    - quickstart
    - vue-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-searchbox-reactivesearch'
---

[vue-searchbox](https://github.com/appbaseio/vue-searchbox) - A lightweight Vue search library with some common utilities.

##Installation

```js
npm install vue-searchbox
// or
yarn add vue-searchbox
```

##Basic Usage

```html
<template>
	<vue-searchbox
		app="good-books-ds"
		credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
		:dataField="['original_title', 'original_title.search']"
	/>
</template>
```
