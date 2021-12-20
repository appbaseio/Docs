---
title: 'QuickStart'
meta_title: 'QuickStart to Vue SearchBox'
meta_description: 'This is a quickstart guide to the vue-searchbox library - learn how to get started with building your search UIs in under 10 mins.'
keywords:
    - quickstart
    - vue-searchbox
    - search-ui
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-searchbox-reactivesearch'
---

[vue-searchbox](https://github.com/appbaseio/searchbox/tree/master/packages/vue-searchbox) provides declarative props to query Elasticsearch, and bind UI components with different types of search queries. As the name suggests, it provides a default UI component for searchbox.

## Installation

To install `vue-searchbox`, you can use `npm` or `yarn` to get set as follows:

### Using npm

```js
npm install @appbaseio/vue-searchbox
```

### Using yarn

```js
yarn add @appbaseio/vue-searchbox
```


You can watch this video for an intro to Vue Searchbox and follow along to build out the example search UI.

[![](https://i.imgur.com/MwYRfX8.png)](https://youtu.be/oDLwzf4E6ps)

### A simple example

The following example renders an autosuggestion search bar(`search-component`) with one custom component(`result-component`) to render the results. The `result-component` watches the `search-component` for input changes and updates its UI when the user selects a suggestion.

```html
<template>
  <Search-base
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
    :analyticsConfig="{
      recordAnalytics: true,
      enableQueryRules: true,
      userId: 'jon@appbase.io',
      customEvents: {
        platform: 'ios',
        device: 'iphoneX'
      }
    }"
  >
  <!-- An auto-complete search box to display the suggestions and filter the
    results based on the selected value -->
  <Search-box
      id="search-component"
      :dataField="[
        {
          field: 'original_title',
          weight: 1
        },
        {
          field: 'original_title.search',
          weight: 3
        }
      ]"
      title="Search"
      defaultValue="Songwriting"
      placeholder="Search for Books"
      autosuggest
      :defaultSuggestions="[
        {
          label: 'Songwriting',
          value: 'Songwriting'
        },
        {
          label: 'Musicians',
          value: 'Musicians'
        }
      ]"
      :size="10"
      queryFormat="or"
      fuzziness="AUTO"
      showClear
      showVoiceSearch
      URLParams
      className="custom-class"
      enablePopularSuggestions
      iconPosition="left"
      :style="{ padding: 10 }"
      @valueChange="handleValue"
      @valueSelected="handleSelect"
      @queryChange="handleQueryChange"
    />
    <!-- A custom component having the `react` dependency on the
    searchbox component to display the filtered results based on the
    selected search value -->
    <search-component
      id="result-component"
      dataField="original_title"
      :react="{
        and: 'search-component'
      }"
    >
    <div
      slot-scope="{ loading, error, results }"
    >
      <div v-if="loading">Loading Results....</div>
      <div v-else-if="!!error">Something went wrong: {error.message}</div>
      <p>
        {{results.numberOfResults}} results found in {{results.time}}ms
      </p>
      <div v-bind:key="item._id" v-for="item in results.data">
        <img
          :src="item.image"
          alt="Book Cover"
        />
        <p>{{item.original_title}}</p>
      </div>
    </div>
    </search-component>
  </search-base>
</template>

<script>
import { SearchBase, SearchBox, SearchComponent } from '@appbaseio/vue-searchbox';

export default {
  name: "App",
  components: {
    SearchBase, SearchBox, SearchComponent
  },
  methods: {
    handleValue(value) {
      console.log('current value: ', value);
    },
    handleSelect(value, cause, source) {
      console.log('current value: ', value);
    },
    handleQueryChange(prevQuery, nextQuery) {
      // use the query with other js code
        console.log('prevQuery', prevQuery);
        console.log('nextQuery', nextQuery);
    },
  }
};
</script>
```

You can play with this example over [here](https://codesandbox.io/s/thirsty-fast-jhlhg?file=/src/App.vue).

### An example with a facet

```html
<template>
  <div id="app">
    <search-base
      index="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      :analyticsConfig="{
        recordAnalytics: true,
        enableQueryRules: true,
        userId: 'jon@appbase.io',
        customEvents: {
          platform: 'ios',
          device: 'iphoneX'
        }
      }"
    >
      <div>
        <search-box
          id="search-component"
          :dataField="[
            {
              field: 'original_title',
              weight: 1
            },
            {
              field: 'original_title.search',
              weight: 3
            }
          ]"
          title="Search"
          placeholder="Search for Books"
          :autosuggest="true"
          :defaultSuggestions="[
            {
              label: 'Songwriting',
              value: 'Songwriting'
            },
            {
              label: 'Musicians',
              value: 'Musicians'
            }
          ]"
          :size="10"
          :debounce="100"
          queryFormat="or"
          fuzziness="AUTO"
          :showClear="true"
          :showVoiceSearch="true"
          :URLParams="true"
          :enableQuerySuggestions="true"
          iconPosition="left"
        />
        <div>
          <div>
            <search-component
              id="author-filter"
              type="term"
              dataField="authors.keyword"
              :subscribeTo="['aggregationData', 'requestStatus', 'value']"
              :URLParams="true"
              :react="{ and: ['search-component'] }"
              :value="[]"
            >
              <div
                slot-scope="{ aggregationData, loading, value, setValue }"
              >
                <div v-if="loading">Fetching Results ....</div>
                <div v-if="!loading">
                  <div
                    v-bind:key="item._key"
                    v-for="item in aggregationData.data"
                  >
                    <div key="{{item._key}}">
                      <input
                        type="checkbox"
                        :value="item._key"
                        :checked="value ? value.includes(item._key) : false"
                        @change="handleChange($event, value, setValue)"
                      />
                      <label :htmlFor="item._key">
                        {{ item._key }} ({{ item._doc_count }})
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </search-component>
          </div>
          <div>
            <search-component
              id="result-component"
              :dataField="['original_title']"
              :size="5"
              :react="{ and: ['search-component', 'author-filter'] }"
            >
              <div
                slot-scope="{ loading, error, results }"
              >
                <div v-if="loading">Fetching Results ....</div>
                <div v-if="Boolean(error)">
                  Something went wrong! Error details
                  {{ JSON.stringify(error) }}
                </div>
                <p v-if="!loading && !error">
                  {{ results.numberOfResults }} results found in
                  {{ results.time }}ms
                </p>
                <div v-if="!loading && !error">
                  <div v-bind:key="item._id" v-for="item in results.data">
                    <div key="item._id">
                      <img
                        :src="item.image"
                        alt="Book Cover"
                      />
                      <div>
                        <div >{{ item.original_title }}</div>
                        <div>
                          <div>
                              by <span>{{ item.authors }}</span>
                          </div>
                          <span>Pub {{ item.original_publication_year }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </search-component>
          </div>
        </div>
      </div>
    </search-base>
  </div>
</template>

<script>
import {
  SearchBase,
  SearchComponent,
  SearchBox
} from '@appbaseio/vue-searchbox';
import './styles.css';

export default {
  name: 'app',
  components: {
    SearchBase,
    SearchBox,
    SearchComponent
  },
  methods: {
    isChecked(value, key) {
      return value ? value.includes(key) : false;
    },
    handleChange(e, value, setValue) {
      const values = value || [];
      if (values && values.includes(e.target.value)) {
        values.splice(values.indexOf(e.target.value), 1);
      } else {
        values.push(e.target.value);
      }
      // Set filter value and trigger custom query
      setValue(values, {
        triggerDefaultQuery: false,
        triggerCustomQuery: true,
        stateChanges: true
      });
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

```

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/demo" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Basic Usage

This example demonstrates the usage of some of the props available with `vue-searchbox`. Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#basic-usage) to check it out.

## Controlled Usage

In this example we can see the usage of `search-box` component in a controlled way using the `value` and `onChange` props and also how to use the `transformRequest` prop to get in more context from an extrenal API. Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#controlled-usage) to check it out.

## Advanced Usage

In this example, we have shown usage of the `vue-table` library to display the search results in a tabular format. You can similarly integrate any kind of UI component - be it grid, charts, lists, sliders with the help of [`search-component`](/docs/reactivesearch/vue-searchbox/searchcomponent/). Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#advanced-usage) to check it out.

## DistinctField Prop Usage

In this example, we have shown how to usage `distinctField` and `distinctFieldConfig` props to display distinct value documents based on the specified field. Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#distinctfield-prop-usage) to check it out.

## EnablePredictiveSuggestions Prop Usage

In this example, we can see the usage of `enablePredictiveSuggestions` prop to prdict next relevant word in a serach query. Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#enablepredictivesuggestions-prop-usage) to check it out.

### Index Prop Usage

In this example, we can see the usage of the `index` prop in the author-search-component to explicitly specify an index to query against for the component. Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#index-prop-usage) to check it out.


### TransformRequest Prop Usage

In this example, we show the usage of the `transformRequest` prop, which gives us the request object whenever a query gets triggered from the search-box component. It allows us to either modify the request being sent or create a side-effect based on this request. Please go over [here](/docs/reactivesearch/vue-searchbox/examples/#transformrequest-prop-usage) to check it out.

Check out the docs for API Reference over [here](/docs/reactivesearch/vue-searchbox/apireference/).
