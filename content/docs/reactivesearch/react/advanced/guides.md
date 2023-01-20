---
title: 'Advanced Guides'
meta_title: 'Advanced Guides'
keywords:
    - reactivesearch
    - advancedguides
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

## beforeValueChange

Most filter components in ReactiveSearch provides a `beforeValueChange` prop. It is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

> Note:
>
> If you're using Reactivesearch version >= `3.3.7`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example with DataSearch:

```js
beforeValueChange = value => {
	// The update is accepted by default
	if (value && value.toLowerCase().contains('Social')) {
		// To reject the update, throw an error
		throw Error('Search value should not contain social.');
	}
};
```

> Note
>
> Most of the time your needs can be solved using `onValueChange`. If you absolutely need `beforeValueChange` you should ensure that you don't pass a function which takes a very long time to resolve the promise. The component goes in a **locked** state when using `beforeValueChange` and before the promise is resolved. This means all the state updates are suspended for the component.

## Minimizing bundle size

ReactiveSearch from v2.3.1 also provides ES modules which can help you in reducing your app's final bundle size. You can achieve this with **tree shaking**. If you're unable to setup tree shaking in your project we recommend trying out the <a href="https://github.com/umidbekkarimov/babel-plugin-direct-import" target="_blank">babel-plugin-direct-import</a>.

```bash
yarn add -D babel-plugin-direct-import
```

After adding this you can update your `.babelrc` accordingly:

```js
{
    "presets": [
        "react"
    ],
    "plugins": [
        [
          "direct-import",
          [
            "@appbaseio/reactivesearch",
            {
              "name": "@appbaseio/reactivesearch",
              "indexFile": "@appbaseio/reactivesearch/lib/index.es.js"
            }
          ]
        ]
    ]
}
```

Now your `import` statements will only include the necessary modules. So,

```js
import { ReactiveBase } from '@appbaseio/reactivesearch';
```

will include only the `ReactiveBase` module. Alternatively, you may avoid this step altogether and `import` using the full path, however the above method looks cleaner and you don't have to worry about the component's path in the library. Check out the [example repo](https://github.com/appbaseio-apps/webpack-tree-shaking) for the above setup.

Following also works with no extra setup, albeit a bit more explicit path:

```js
import { ReactiveBase } from '@appbaseio/reactivesearch/lib/components/basic/ReactiveBase';
```

> Note
>
> If you're using **create-react-app** you might need to update your configurations if tree shaking is not working out of the box. You may try <a href="https://github.com/timarney/react-app-rewired" target="_blank">react-app-rewired</a> instead of ejecting the app.
