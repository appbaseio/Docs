---
title: 'ReactiveSearch AI Answer'
meta_title: 'ReactiveSearch AI Answer'
meta_description: 'AI Answer solutions for React, Vue, REST API - the power of OpenAI\x27s models with answers generated from your search index'
keywords:
    - reactivesearch
    - ai-answer
    - openai
    - llm
    - chatgpt
    - search engine
    - opensearch
    - elasticsearch
sidebar: 'docs'
---

AI Answer leverages OpenAI and your top search hits to provide an answer from your search engine index and can be used standalone, with searchbox or with a faceted search UI solution. With React and Vue based UI components, you can power your entire search stack using ReactiveSearch.

**AI Answer brings the following things**:

- **AI Search**: Answer your user’s intent with LLMs - use standalone, with searchbox or with a faceted search UI solution
- **Improved precision and recall**: By relying on both the keyword search (or KNN) passed to the LLM context window, the answer is always coming from the search index
- **Human-in-the-loop**: By reviewing sessions and the feedback from your end-users,
    - Improve on the AI Answer Ux
    - Add FAQs as suggested questions
- **Ready-to-go UI components**: Configure components supported by ReactiveSearch's UI kit, the industry-leading UI components library for React and Vue search UIs
- **No-code AI search**: Directly ship an AI search solution with UI builder - no-code required!

## How it works

![Querying with AI Answer enabled](/images/concepts/querying_ai.png "Querying with AI Answer Vizualized")

We are using ChatGPT's models in order to power AI Answer. This, along with the various features that ReactiveSearch provides makes AI a viable option to show to the user in order to increase user interaction and make it easier for them to reach the answer they are looking for.

Imagine that every query that the user searches is a question. AI will make reaching the answer easier and digging deeper into the specifics of an answer much easier than it used to be.

## Getting Started

Getting started with AI Answer is a piece of cake. Just index the data and start using ReactiveSearch with AI Answer enabled.

[Connect your cluster to ReactiveSearch and get started in just 2 minutes!](https://dashboard.reactivesearch.io/signup?utm_source=docs&utm_medium=docs&utm_campaign=ai_answer)

### Before you start

If you don't have any data indexed in the cluster, we suggest taking a look at [this indexing doc to get started](./indexing).

Optionally, if you already have data and want to enrich it with vector representations, [take a look at the vector section of this doc](./indexing#enriching-with-vector-data).

#### Set AI preferences

In order to start using AI, the feature needs to be enabled by going over to the dashboard [here](https://dash.reactivesearch.io/cluster/ai-preferences).

![AI Preferences](https://i.imgur.com/wBzEW2o.jpg "AI preferences")

In the above, the following things need to be configured in order to get started with AI:

- **Enable**: Enable/Disable AI functionality.
- **OpenAI API key**: Your OpenAI API key in order to access OpenAI's API. Can be found at [API key section of OpenAI dashboard](https://platform.openai.com/account/api-keys).
- **Default Model**: Default model to use, in case it's not specified in the ReactiveSearch request. As of now `gpt-3.5-turbo` and `gpt-4` are supported.
- **Default System Prompt**: Default system prompt to use, in case it's not specified in the ReactiveSearch request. System prompt can be thought of as the first message that the system sends to ChatGPT while initiating a conversation.
- **Enabled Indices**: Indices where ChatGPT is enabled. **Only indexes that are present in this list will be allowed to be used with AI Answer**.


### Querying

This is where AI Answer comes in. In order to query data, there are two ways to do it.

ReactiveSearch provides an UI library that can be leveraged to build AI Answer much easily. ReactiveSearch API can also be used in order to get the data. ReactiveSearch Pipelines are also an option if you want to get your hands dirty and customize various features of AI Answer or anything else regarding ReactiveSearch Query.

#### With UI Components

<iframe src="https://codesandbox.io/embed/github/awesome-reactivesearch/q-n-a-search-ui/tree/main/?fontsize=14&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="q-n-a-search-ui"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

With UI components that ReactiveSearch provides, it's easy to quickly get started with using AI Answer.

| Library | Component | Link |
| -- | -- | -- |
| React | Searchbox with AI Answer | [Read more](https://docs.reactivesearch.io/docs/reactivesearch/react/search/searchbox/#aiconfig) |
| React | AI Answer | [Read more](https://docs.reactivesearch.io/docs/reactivesearch/react/search/aianswer/) |

#### With API

Once your cluster is connected to ReactiveSearch, a simple POST call can be made to get the search data along with AI enabled, `enableAI` field should be specified as shown in the following JSON:

```json
{
    "query": [
        {
            "id": "test",
            "dataField": ["title"],
            "value": "free guy",
            "enableAI": true
        }
    ]
}
```

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/VvDdd6uvjFUYwVSelYQJ"></iframe>

The above response contains an `AISessionId` that can be used to fetch the answer from AI as well as ask follow-up questions:

<iframe frameborder="1px" width="100%" height="400px" src="https://play.reactivesearch.io/embed/fp5e52TLUckcPSPTEyty"></iframe>

[Learn more about the endpoints ReactiveSearch provides for interacting with AI](https://api.reactivesearch.io/#44009fda-61f7-4d1b-81b5-9f495d3111a3)

[Read more about querying with AI Answer support](./querying)


