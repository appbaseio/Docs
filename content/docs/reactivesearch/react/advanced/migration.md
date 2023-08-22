---
title: 'ReactiveSearch: Migration Guide v3 -> v4'
meta_title: 'ReactiveSearch: Migration Guide v3 -> v4'
meta_description: 'This guide will give you a brief about all the changes in the 4.x release of ReactiveSearch.'
keywords:
    - reactivesearch
    - migration-guide
    - react
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

ReactiveSearch and ReactiveMaps are fully compatible with React 18.x and above with the 4.x releases. This release comes after the feedback we have gathered from the iterative deployment of reactivesearch in production for the dozens of our clients over the last year. In this version, we have changed the way certain props behave, and included new components. This guide will give you a brief about all the changes.

## ReactiveSearch

### Connect with ReactiveSearch Cloud

Starting v4, ReactiveSearch has removed support for front-end query generation, we strongly encourage upgrading to v4 for powering a secure search experience with ReactiveSearch.

More on security risks of allowing a search DSL over the network:

- Elasticsearch's query DSL being imperative in nature, allowing the entire DSL to be accessible from a web or mobile frontend creates a DoS vector where expensive queries can be run to deny service to actual users.
- It also presents a data scraping risk.
- The query DSL's imperative nature also makes it hard to enrich, transform or apply access controls to search requests.

### Benefits

- ReactiveSearch Cloud magic: Accelerate, enrich, and transform your search requests using features such as query rules, search relevance, caching, analytics
  - There are two cloud offerings to cater to your use-case:
     - Dedicated Search cluster - [Starting at $99/mo](https://www.reactivesearch.io/pricing), a 2 CPU + 8 GB RAM server instance suitable for ML-powered search experiences
     - Serverless Search (Beta) - [Starting at $29/mo](https://www.reactivesearch.io/pricing/serverless-search), serve a geo-distributed search solution
- Easy to secure: As ReactiveSearch API doesn't expose Elasticsearch APIs directly, it prevents the possibility of DSL based injection attacks and supports `size` based restrictions to mitigate against data scraping attempts
- Composable: Compose by extending using search engine's query DSL. Supports Elasticsearch, OpenSearch, Solr and MongoDB engines
- Encapsulate business logic: Don't want to expose sensitive fields to web and mobile clients? Set the fields to return with ReactiveSearch dashboard once and avoid declaring them as part of the network requests.

**v3.x:**

Elasticsearch `_msearch` request

![alt network req v1](https://i.imgur.com/6Ew1txq.png)

**v4.x:**

ReactiveSearch API in action, read more about it over [here](/docs/search/reactivesearch-api/)

![alt network req v4](https://i.imgur.com/dSNqvlR.png)

### Removal of `DataSearch` & `CategorySearch` components

In 3.x, ReactiveSearch supported two components for auto-suggestions: `DataSearch` to display search auto-suggestions and `CategorySearch` to display category suggestions. With 4.x, ReactiveSearch only supports one component: [SearchBox](/docs/reactivesearch/react/search/searchbox/) to implement an auto-suggestions UI that can display any of index based suggestions (index, document), analytics based suggestions (recent, popular) and curation based suggestions (featured, FAQs).

**v3.x:**

```jsx
    <DataSearch
        componentId="Search"
        dataField={['title', 'description']}
    />
```

**v4.x:**

```jsx
    <SearchBox
        componentId="Search"
        dataField={['title', 'description']}
    />
```

Usage of SearchBox remains identical to DataSearch 

### SSR Usage

With the release of v4 of Reactivesearch, the SSR usage is simplified.

**v3.x:**

v3 requires manual setup of the config object to calculate the store's value on the serverside:

```jsx
import initReactivesearch from '@appbaseio/reactivesearch/lib/server';
import { ReactiveBase, DataSearch, SelectedFilters, ReactiveList } from '@appbaseio/reactivesearch';

const settings = {
	app: 'good-books-ds',
	credentials: 'nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d',
};

const dataSearchProps = {
	dataField: ['original_title', 'original_title.search'],
	categoryField: 'authors.raw',
	componentId: 'BookSensor',
	defaultSelected: 'Harry',
};

const reactiveListProps = {
	componentId: 'SearchResult',
	dataField: 'original_title.raw',
	className: 'result-list-container',
	from: 0,
	size: 5,
	renderItem: data => <BookCard key={data._id} data={data} />,
	react: {
		and: ['BookSensor'],
	},
};

export default class Main extends Component {
	static async getInitialProps() {
		return {
			store: await initReactivesearch(
				[
					{
						...dataSearchProps,
						source: DataSearch,
					},
					{
						...reactiveListProps,
						source: ReactiveList,
					},
				],
				null,
				settings,
			),
		};
	}

	render() {
		return (
			<ReactiveBase {...settings} initialState={this.props.store}>
				<div className="row">
					<div className="col">
						<DataSearch {...dataSearchProps} />
					</div>

					<div className="col">
						<SelectedFilters />
						<ReactiveList {...reactiveListProps} />
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

```

**v4.x:**

v4's SSR usage doesn't require component config from the user. It only requires the following 6 lines to setup SSR.

```jsx

import { getServerState } from '@appbaseio/reactivesearch';

// getServerSideProps method is run on server-side by Next.js
export async function getServerSideProps(context) {

  // calculating the initial state on server  
  let initialState = await getServerState(App, context.resolvedUrl);
  return {
    props: { initialState } // will be passed to the App component as props
  };
}


const App = (props) => (
  <ReactiveBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
    // below props are coming from the server
    contextCollector={props.contextCollector}
    initialState={props.initialState}
  >
	<ReactiveList
		componentId="SearchResult"
		dataField="original_title"
		className="result-list-container"
		URLParams
		from={0}
		size={5}		
		react={{
			and: ['BookSensor', 'SearchBox'],
		}}
		pagination
	/>
  </ReactiveBase>
);

export default App;
```


### Removal of Deprecated props

We have also removed the following deprecated props:

| <p style="margin: 0px;" class="table-header-text">Prop Name</p>   | <p style="margin: 0px;" class="table-header-text">Component</p> | <p style="margin: 0px;" class="table-header-text">Alternative</p> |
| ------ | --------------------------- | -------- |
| `analyticsConfig` | `ReactiveBase`   | `reactivesearchAPIConfig`    |
| `appbaseConfig` | `ReactiveBase`   | `reactivesearchAPIConfig`    |
| `analytics` | `ReactiveBase`   | `reactivesearchAPIConfig.recordAnalytics`    |
| `enableAppbase` | `ReactiveBase`   | `_`    |
| `triggerAnalytics` | `ReactiveList.renderItem`   | `triggerClickAnalytics`    |
| `aggregationField` | `All Components`   | `distinctField`    |


### New Enhancements

#### ReactiveComponent

We have shed some load in the `<ReactiveComponent />` in favor of tree shaking eventually improving the bundle size and performance for our users. 

`<ReactiveComponent />` now is specifically meant for building custom reactive components for the search UIs as opposed to earlier when it supported `componentType` prop to render different standard components from the lib, which bloated the bundle unnecessarily and disabled tree shaking. 

To account for backward compatibility, we have `<ReactiveComponentPrivate />` which supports a `componentType` prop to render standard components from the reactivesearch library. The component comes in handy when rendering the components dynamically based on conditions and is actively used by the [Reactivesearch UI Builder](https://docs.reactivesearch.io/docs/reactivesearch/ui-builder/search/).

example:

```js
import { componentTypes } from '@appbaseio/reactivecore/lib/utils/constants';

// renders a MultiRange component
<ReactiveComponentPrivate {...otherProps} componentType={componentTypes.multiRange} />
// renders a SearchBox component
<ReactiveComponentPrivate {...otherProps} componentType={componentTypes.searchBox} />
```

#### ReactiveCharts
       
![Image to be displayed](https://i.imgur.com/4TxrKmi.png)
        
* ReactiveSearch supports adding reactive chart components via [Apache E-charts](https://echarts.apache.org/) for build reporting UIs with advanced search capabilities.
            
    * [**Pie Chart** ↗️](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/piechart/)
                
    * [**Bar Chart** ↗️](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/barchart/)
                
    * [**Histogram Chart** ↗️](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/histogramchart/)
                
    * [**Line Chart** ↗️](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/linechart/)
                
    * [**Scatter Chart** ↗️](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/scatterchart/)
                
    * [**Reactive Chart** ↗️](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/reactivechart/)
                
        *Got a custom chart to render?* `ReactiveChart` is a generic component to render any chart UI supported by the Apache [E-charts](https://echarts.apache.org/) library. Additionally, it supports pre-built charts (`pie`, `bar`, `line`, `histogram` and `scatter`) to cover the most common chart use cases that can be configured using declarative props.

        Consider a comprehensive guide [here](https://docs.reactivesearch.io/docs/reactivesearch/react/chart/reactivechart)

        ```jsx
            <ReactiveChart
                // unique id for component
                componentId="language"
                // Chart title
                title="Languages"
                // Query to fetch chart data
                defaultQuery={() => ({
                    aggs: {
                        years: {
                            terms: {
                                field: 'release_year',
                            },
                        },
                    },
                })}
                // Define E-chart options
                setOption={({ rawData }) => {
                    const buckets = (rawData && rawData.aggregations && rawData.aggregations.years.buckets) || [];
                    return ({
                        xAxis: {
                            data: buckets.map(bucket => bucket.key),
                        },
                        yAxis: {},
                        series: [
                            {
                                type: 'bar',
                                data: buckets.map(bucket => bucket.doc_count),
                            },
                        ],
                    });
                }}
            />        
        ```

#### compoundClause

Configure whether the DSL query is generated with the compound clause of `must` or `filter`. If nothing is passed the default is to use must. Setting the compound clause to `filter` allows search engine to cache and allows for higher throughput in cases where scoring isn’t relevant (e.g. `term`, `geo` or `range` type of queries that act as filters on the data)

> This property only has an effect when the search engine is either elasticsearch or opensearch.

#### AIAnswer

![AI Answer](https://i.imgur.com/P6C5kH6.png)

`AIAnswer` is an AI-driven answer UI component that interacts with a dataset to provide context-aware and relevant answers based on user inputs. It employs machine learning to comprehend user questions and retrieve the most pertinent information. The component can be used to supply answers to common questions related to a specific topic, offer support and help by addressing user queries, and create a knowledge base or FAQ section for your website.

Learn more about the `AIAnswer` component over [here](https://docs.reactivesearch.io/docs/reactivesearch/react/search/aianswer/).


#### AIAnswer support in SearchBox

![AI Answer support in SearchBox](https://i.imgur.com/P6C5kH6.png)

`SearchBox` now has crossed limits of a basic indexed search component to a smart context aware query answerer with the integration of AI capabilities right within. The queries are answered with context auto-injected and fed to the LLM model.

Usage for AI Answer with SearchBox looks like below: 

```jsx
    <SearchBox
        id="search-component"
        enableAI={true}
        AIConfig={{
            systemPrompt: "",
            docTemplate: "",
            queryTemplate: "",
            topDocsForContext : 3,
            maxTokens: 1234,
            temperatue: 0.3
        }}
        AIUIConfig={{
            showSourceDocuments: true,
            renderSourceDocument: (obj) => {
                return (
                    <span>❤️ {obj.original_title}
                    </span>
            )},
            askButton: true,
            renderAskButton: function (clickHandler){
                return (
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'stretch',
                        }}
                    >
                        <button style={{ border: '1px solid #c3c3c3' }} onClick={clickHandler}>
                            🔍 Ask!
                        </button>
                    </div>
            )}
        }}            
    />  
```

Learn more about the AI props [here](https://docs.reactivesearch.io/docs/reactivesearch/react/search/searchbox/#enableai)

Take a look at an example of the AI integration can do:
 
<iframe src="https://codesandbox.io/embed/github/awesome-reactivesearch/ask-reactivesearch/tree/main/?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="ask-reactivesearch"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




#### FeaturedSuggestion in SearchBox

Featured suggestions (curated by you) provide for rich interactive behavior such as navigating to a page, section, or a custom behavior through a JavaScript callback function. Setting featured suggestions only requires point-and-click actions in the ReactiveSearch dashboard.

[Doc ref](https://docs.reactivesearch.io/docs/reactivesearch/react/search/searchbox/#enablefeaturedsuggestions)

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/SearchBoxWithFeaturedSuggestions?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="searchbox-featured-suggestions"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### FAQ suggestions in SearchBox

FAQ suggestions show up as show frequently asked user questions in SearchBox as configured via the ReactiveSearch dashboard.

[Doc ref](https://docs.reactivesearch.io/docs/reactivesearch/react/search/searchbox/#enablefaqsuggestions)

**Basic Usage**

```jsx
    <SearchBox
        enableFAQSuggestions={true}
        searchboxId="rs_docs" // required
        FAQSuggestionsConfig={{
          size: 2,
          sectionLabel: '❓ FAQ Suggestions'
        }}
    />
```

<iframe src="https://reactivesearch-react.vercel.app/iframe.html?args=&id=search-components-searchbox--with-enablefaqsuggestions&viewMode=story"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="searchbox-faq-suggestions"     
   ></iframe>
