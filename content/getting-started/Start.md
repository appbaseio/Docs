---
id: start
title: "ReactiveMaps Getting Started"
layout: tutorial
sectionid: started
permalink: getting-started/start.html
prev: installation.html
prevTitle: "ReactiveMaps Installation"
next: rsinstallation.html
nextTitle: "ReactiveSearch Installation"
---

### Installation Recap

We install the library and then add the relevant browser dependencies in the **index.html** file.

```bash
npm install --save @appbaseio/reactivemaps
```

```html
<!-- Google Maps API Key required-->
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=Your_key_here"></script>
<!-- Your choice of CSS framework, can be materialize, bootstrap or something else -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
<!-- Add browser style for reactivemaps -->
<link rel="stylesheet" href="node_modules/@appbaseio/reactivemaps/dist/css/style.min.css">
```

You can read more about the installation steps [here](/getting-started/installation.html).

### Creating an App

Now that we have gotten the installation part out of the way, let's create an app with reactivemaps.

If you already have a React boilerplate setup, then let's go ahead and import the components.

```javascript
import {
  ReactiveMap,
  SingleList,
  ReactiveBase
} from '@appbaseio/reactivemaps';
```

Next, we will create a [`ReactiveBase`](/getting-started/ReactiveBase.html) component for connecting our UI view with data, where the data source is an [appbase.io](https://appbase.io) app. This quick GIF will help with creating an app and getting its credentials.

![create an appbase.io app](https://i.imgur.com/Y6HiHnJ.gif)

```js
class HelloWorld extends Component {
  render() {
	return(
		<ReactiveBase
			app="reactivemap-demo-app"
			credentials="2ZvCaw7CR:6664ec32-4e21-434d-836c-33af67b88c60">
			<div class="row">
				<div class="col-xs-6">
					<SingleList
						title="SingleList Sensor"
						componentId="SingleListSensor"
						dataField="group.group_city"
						size={50}
						showSearch={true}
					/>
				</div>
				<div class="col-xs-6">
					<ReactiveMap
						title="ReactiveMap Actuator"
						componentId="ReactiveMapActuator"
						dataField="venue"
						react={{
							"and": "SingleListSensor"
						}}
					/>
				</div>
			</div>
		</ReactiveBase>
	)
  }
}
```

Next, we have created a `SingleList` component with New York city selected by default and have added a `ReactiveMap` component which updates reactively every time the SingleList component's selected value changes.

If you have followed along, you should see something like this:

![Image](https://i.imgur.com/Xj9GIgs.png)

You can also checkout a working demo of the above app directly at https://github.com/appbaseio-apps/reactivemaps-starter-app. The repo demonstrates the same example app in different ways:
1. [`master`](https://github.com/appbaseio-apps/reactivemaps-starter-app/tree/master) - The app as shown in the steps above.
1. [`browserify`](https://github.com/appbaseio-apps/reactivemaps-starter-app/tree/browserify) - A browserify based build (instead of webpack).
1. [`withbootstrap`](https://github.com/appbaseio-apps/reactivemaps-starter-app/tree/withbootstrap) - A bootstrap based theming (instead of Materialize).
1. [`umd`](https://github.com/appbaseio-apps/reactivemaps-starter-app/tree/umd) - A completely browser based app with no npm dependencies and webpack / browserify modules.
