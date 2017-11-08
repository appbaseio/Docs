---
id: rsstart
title: "ReactiveSearch Getting Started"
layout: tutorial
sectionid: getting-started
permalink: getting-started/rsstart.html
prev: start.html
prevTitle: "ReactiveMaps Getting Started"
next: data.html
nextTitle: "Importing Data"
---

### Installation Recap

We install the library and then add the relevant browser dependencies in the **index.html** file.

```bash
npm install --save @appbaseio/reactivesearch
```

```html
<!-- Your choice of CSS framework, can be materialize, bootstrap or something else -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
<!-- Add browser style for reactivesearch -->
<link rel="stylesheet" href="node_modules/@appbaseio/reactivesearch/dist/css/style.min.css">
```

You can read more about the installation steps [here](/getting-started/rsinstallation.html).

### Creating an App

Now that we have gotten the installation part out of the way, let's create an app with reactivesearch.

If you already have a React boilerplate setup, then let's go ahead and import the components.

```javascript
import {
	ReactiveBase,
	CategorySearch,
	RatingsFilter,
	ResultCard
} from '@appbaseio/reactivesearch';
```

Next, we will create a [`ReactiveBase`](/getting-started/ReactiveBase.html) component for connecting our UI view with data, where the data source is an [appbase.io](https://appbase.io) app. This quick GIF will help with creating an app and getting its credentials.

![create an appbase.io app](https://i.imgur.com/Y6HiHnJ.gif)

```js
class HelloWorld extends Component {

	onData(res) {
		const result = {
			image: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
			title: res.name,
			rating: res.rating,
			desc: res.brand,
			url: "#"
		};
		return result;
	}

	render() {
		return (
			<ReactiveBase
				app="car-store"
				credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
			>
				<div className="row reverse-labels">
					<div className="col s6 col-xs-6">
					<div className="row">
						<div className="col s12 col-xs-12">
							<CategorySearch
								componentId="SearchSensor"
								dataField="name"
								categoryField="brand.raw"
								placeholder="Search Cars"
								autoSuggest={false}
							/>
						</div>
						<div className="col s12 col-xs-12">
							<RatingsFilter
								componentId="RatingsSensor"
								dataField="rating"
								title="RatingsFilter"
								data={
								[{ start: 4, end: 5, label: "4 stars and up" },
									{ start: 3, end: 5, label: "3 stars and up" },
									{ start: 2, end: 5, label: "2 stars and up" },
									{ start: 1, end: 5, label: "> 1 stars" }]
								}
								defaultSelected={{
									"start": 3,
									"end": 5
								}}
							/>
						</div>
					</div>
					</div>
					<div className="col s6 col-xs-6">
						<ResultCard
							componentId="SearchResult"
							dataField="name"
							title="Results"
							from={0}
							size={20}
							onData={this.onData}
							sortOptions={[
								{
									label: "Lowest Price First",
									dataField: "price",
									sortBy: "asc"
								},
								{
									label: "Highest Price First",
									dataField: "price",
									sortBy: "desc"
								},
								{
									label: "Most rated",
									dataField: "rating",
									sortBy: "desc"
								}
							]}
							react={{
								and: ["SearchSensor", "RatingsSensor"]
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}
```

Here, we have created a `CategorySearch` component along with a `RatingsFilter` component (first half of the screen) to show the filters.

In the second half, we have used the `ResultCard` component to display the resulting data.

If you have followed along, you should see something like this:

![Image](http://i.imgur.com/nzK6dXW.png)

You can also checkout a working demo of the above app directly at https://github.com/appbaseio-apps/reactivesearch-starter-app. The repo demonstrates the same example app in different ways:
1. [`master`](https://github.com/appbaseio-apps/reactivesearch-starter-app/tree/master) - The app as shown in the steps above.
1. [`browserify`](https://github.com/appbaseio-apps/reactivesearch-starter-app/tree/browserify) - A browserify based build (instead of webpack).
1. [`umd`](https://github.com/appbaseio-apps/reactivesearch-starter-app/tree/umd) - A completely browser based app with no npm dependencies and webpack / browserify modules.
