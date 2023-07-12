---
title: 'Customizing Styles'
meta_title: 'Customizing Styles'
meta_description: 'Styling Reactivesearch Components.'
keywords:
    - reactivesearch
    - styles
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

You can add a `className` to any component which gets applied to the component at the root level. You may also inject `class` to the inner levels using the `innerClass` prop. You can read more about it in the [next section](/docs/reactivesearch/vue/theming/classnameinjection/).

## Examples

### Using the className prop

```js{3}
<search-box
    ...
    className="search-box"
/>
```
