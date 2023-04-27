---
title: 'Querying AI Answer'
meta_title: 'Querying AI Answer effectively | Introduction to ReactiveSearch'
meta_description: 'Learn how to query data with ReactiveSearch in various ways and use it with AI Answer'
keywords:
    - concepts
    - reactivesearch.io
    - querying
    - pipelines
    - ai-answer
sidebar: 'docs'
---

Querying the indexed data with AI Answer can be done in various ways. ReactiveSearch provides three ways to query the data along with various levels of access. ReactiveSearch even provides support for modifying the way the query endpoints behave by using pipelines (more on this later on in this doc).

## Ways to query

From a top-level perspective, there are three main ways to query the data:

- With ReactiveSearch UI components
- With ReactiveSearch API
- With ReactiveSearch Pipelines

![Querying with AI Answer enabled](/images/concepts/querying_ai.png "Querying with AI Answer Vizualized")

## With UI Components

ReactiveSearch provides a state-of-the art library that uses ReactiveSearch API under the hood and makes development experience much faster. With the UI library, a search UI can be built and brought up within a few minutes.

<iframe src="https://codesandbox.io/embed/github/awesome-reactivesearch/q-n-a-search-ui/tree/main/?fontsize=14&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="q-n-a-search-ui"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[Check out more demos of using ReactiveSearch](https://codesandbox.io/s/github/awesome-reactivesearch/q-n-a-search-ui/tree/main/?from-embed)

With UI components that ReactiveSearch provides, it's easy to quickly get started with using AI Answer.

| Library | Component | Link |
| -- | -- | -- |
| React | Searchbox with AI Answer | [Read more](https://docs.reactivesearch.io/docs/reactivesearch/react/search/searchbox/#aiconfig) |
| React | AI Answer | [Read more](https://docs.reactivesearch.io/docs/reactivesearch/react/search/aianswer/) |

## With API

ReactiveSearch API acts as the gateway for accessing the data. It's an easy-to-use API that can be as simple as a search query and get as complex as multiple faceted queries with various query dependencies.

Following is an example ReactiveSearch call that enables the **AI Answer** feature by using the `enableAI` flag in the call. Once the request resolves, the `AISessionId` can be then used to fetch the answers, ask follow-up questions, get analytics etc.

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/VvDdd6uvjFUYwVSelYQJ"></iframe>

From the above request, find the `AISessionId` and put it in the following embed to fetch the AI Answer response.

In the following, a `GET /_ai/{AISessionId}` is being made to fetch the answer for the session ID returned in the ReactiveSearch call

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/fp5e52TLUckcPSPTEyty"></iframe>

[Learn more about the endpoints ReactiveSearch provides for interacting with AI](https://api.reactivesearch.io/#44009fda-61f7-4d1b-81b5-9f495d3111a3)

## With Pipeline

> NOTE: This is aimed at developers only who want to modify the behavior of the ReactiveSearch endpoint (or any other endpoint) to suit their needs.

ReactiveSearch Pipelines pack a lot of features and functionalities that makes it possible to alter the behaviour of the ReactiveSearch call as well as add extra steps in the flow.

AI Answer is provided as a pre-built stage for use in a pipeline, following is how AI Answer stage can be used with ReactiveSearch stage:

```yaml
- id: reactivesearch
  use: reactivesearchQuery
  continueOnError: false
- id: elastic search
  use: elasticsearchQuery
  continueOnError: false
- id: ai answer
  use: AIAnswer
  inputs:
    docTemplate: "${source.title} is ${source.overview} with url: ${source.backdrop_path}"
    apiKey: "{{openAIApiKey}}"
```

[Learn more about using pipelines to get AI Answers with ReactiveSearch](https://docs.reactivesearch.io/docs/pipelines/how-to/ai-answer)
