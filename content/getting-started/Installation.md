---
id: installation
title: "ReactiveMaps Installation"
layout: tutorial
sectionid: getting-started
permalink: getting-started/installation.html
next: start.html
nextTitle: "ReactiveMaps Getting Started"
redirect_from:
    - "getting-started"
---

### Step 1: Install reactivemaps via NPM

We will fetch the [`reactivemaps`](https://www.npmjs.com/package/@appbaseio/reactivemaps) module first from npm.

```bash
npm install --save @appbaseio/reactivemaps
```

### Step 2: Add Google Maps JS lib

ReactiveMaps uses Google Maps to render the maps. For including Google Maps, add the following  `<script>` tag in the `<head>` element.

```html
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=Your_key_here"></script>
```

### Step 3: Add ReactiveMap's style file


If you haven't included any style framework, we recommend adding **materialize**.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
```

All ReactiveMap styles are present in a single file. We will import it in the `<head>` element as well.

```html
<link rel="stylesheet" href="https://cdn.rawgit.com/appbaseio/reactivemaps/master/dist/css/style.min.css">
```

Make sure to import the stylessheets in the above order.

---

You're now all set to create an app with ReactiveMaps!

Next, read the [getting started](/getting-started/start.html) guide to find out how to build your first ReactiveMap based app.
