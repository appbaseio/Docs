---
title: 'Analytics'
meta_title: 'Search and Analytics Data'
meta_description: 'Search analytics work out of the box with `analytics` prop in `ReactiveBase`.'
keywords:
    - reactivesearch
    - analytics
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

You can take advantage of search and click analytics when using [Appbase.io](https://appbase.io) as a backend with ReactiveSearch. Search analytics work out of the box with `analytics` prop in `ReactiveBase`. This recipe explains how to implement click analytics for your app.

## Click Analytics

Click analytics have to be wired into the result components. Its supported in `ReactiveList`.When using `ReactiveList`, the `renderItem` or `renderAllData` prop|slot-scope receives an extra property to make click analytics work which you have to invoke with `onClick`.

```html
<reactive-list
    ...
    <div slot="renderItem" slot-scope="{ item,  triggerClickAnalytics}">
        <div onClick="triggerClickAnalytics">{{ item.title }}</div>
    </div>
>
```

When rendering your component using `renderAllData({ results, streamResults, loadMore, base, triggerClickAnalytics })` you have to call the `triggerClickAnalytics` after adding the `base` value to the `index` (`base` is calculated internally from `currentPage * size`). `index` is assumed to start from `0`. Example:

```html
<reactive-list
    ...
    <div slot="renderAllData" slot-scope=`
        { results, streamResults, loadMore, base, triggerClickAnalytics }
    `>
        <div
            v-for="(result, index) in results"
            @click="() => triggerClickAnalytics(base + index)"
        >
            {{ result.title }}
        </div>
    </div>
>
```
