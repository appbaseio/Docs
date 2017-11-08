---
id: rsinstallation
title: "ReactiveSearch Installation"
layout: tutorial
sectionid: getting-started
permalink: getting-started/rsinstallation.html
prev: start.html
prevTitle: "ReactiveMaps Getting Started"
next: rsstart.html
nextTitle: "ReactiveSearch Getting Started"
---

### Step 1: Install reactivesearch via NPM

We will fetch the [`reactivesearch`](https://www.npmjs.com/package/@appbaseio/reactivesearch) module first from npm.

```bash
npm install --save @appbaseio/reactivesearch
```

### Step 2: Add ReactiveSearch's style file

If you haven't included any style framework, we recommend adding **materialize**.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
```

All ReactiveSearch styles are present in a single file. We will import it in the `<head>` element as well.

```html
<link rel="stylesheet" href="https://cdn.rawgit.com/appbaseio/reactivesearch/master/dist/css/style.min.css">
```

Make sure to import the stylesheets in the above order.

---

You're now all set to create an app with ReactiveSearch!

Next, read the [getting started](/getting-started/RSStart.html) guide to find out how to build your first ReactiveSearch based app.
