---
id: theming
title: "Theming"
layout: docs
sectionid: docs
permalink: docs/advanced/theming.html
prev: styleguide.html
prevTitle: "Style Guide"
---

## Introduction

`ReactiveBase` comes with 6 colors in the color pallete. You can set the `theme` prop in `ReactiveBase` component as one of the following:

* `rbc-blue`
* `rbc-green`
* `rbc-red`
* `rbc-orange`
* `rbc-yellow`
* `rbc-dark`

This will accordingly set the primary, secondary and default colors of the reactivebase components.

## Usage

```html
<ReactiveBase
	app="<APP_NAME>"
	credentials="<APP's_CREDENTIALS>"
	type="TYPE"
	theme="rbc-blue">

	// inner reactive components

</ReactiveBase>
```

## Examples

`rbc-blue` is the default theme. This is how the SingleList component looks with different theme options:

1. `rbc-blue` (aka default):  
![SingleList rbc-blue](https://i.imgur.com/LoRukSn.png)

2. `rbc-green`:  
![](https://i.imgur.com/2KWAev6.png)

3. `rbc-red`:  
![](https://i.imgur.com/EnlJ7aO.png)

4. `rbc-orange`:  
![](https://i.imgur.com/ybMQEEt.png)

5. `rbc-yellow`:  
![](https://i.imgur.com/NTt5Rk6.png)

6. `rbc-dark`:  
![](https://i.imgur.com/p871aMj.png)
