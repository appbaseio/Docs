---
title: 'Use AIAnswer to build answers to search queries'
meta_title: 'Use AI Answer to build answers to search queries | Introduction to Appbase.io'
meta_description: 'Learn how to use AIAnswer stage to build answers to search queries using ChatGPT'
keywords:
    - concepts
    - appbase.io
    - opensearch
    - pipelines
    - chatGPT
    - AI answer
sidebar: 'docs'
---

ChatGPT has become very famous in the recent times and rightly so since it is very accurate. ReactiveSearch also supports using ChatGPT and aims to make search query responses even more relatable to the end user. Thus ReactiveSearch offers a functionality called AI Answer that lets users supercharge their search queries to utilize ChatGPT and return the response to the user in an answer format.

In this how-to doc, a pipeline is built by utilizing the pre-built stage `AIAnswer` provided by ReactiveSearch to change the response and make them more relatable to the user.

**[Deploy this pipeline with one-click](https://dashboard.reactivesearch.io/deploy?template=https://raw.githubusercontent.com/appbaseio/pipelines-template/master/ai_answer/pipeline_oneclick.json)**

## Example Scenario: Answer queries from users like they are questions

Let's say we have a requirement where we want to consider every search query entered by the user as a question and rather them showing them the old-school UI of multiple results, we will also show them the overall best answer for their query.

This functionality can be easily achieved by using ReactiveSearch.

We will create a pipeline that overrides the `/{index}/_reactivesearch` endpoint and adds support for doing the above.

## Pre Setups

Now that we know what our requirement is, let's define the initial content of the pipeline. As described before, we will over-ride the `/{index}/_reactivesearch` so that we can return answers when a search query comes in. We can do that in the following way:

```yaml
enabled: true
description: Supercharge search queries by returning answer to user's query using ChatGPT
routes:
- path: "/movie-db/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch

envs:
  index:
  - movie-db
  openAIApiKey: <your-api-key>
```

For the sake of this example, we will not override a dynamic path but instead override the `movie-db` index. This index can be setup by going through the interactive tutorial on `dash.reactivesearch.io` and selecting the movie dataset.

### Environment Variables

We are passing the Open AI API Key through envs so that it can be used in any stage necessary. This is the `openAIApiKey` variable.

## Stages

Now that we have the basic pipeline defined, let's get started with the stages. We will have a few pre-built stages and some custom stages in this pipeline.

> Pre-Built stages are provided by ReactiveSearch to utilize functions from ReactiveSearch API, like hitting ElasticSearch or translating an RS Query to ES Query.

We will have the following stages defined:

1. authorization
2. reactivesearch query
3. es query
4. ai answer

### Authorization

This is one of the most important steps in the pipeline. Using this stage we will make sure the user is passing proper credentials to hit the endpoint they are trying to access.

The is a `pre-built` stage provided by ReactiveSearch and can be leveraged in the following way:

```yaml
- id: authorize user
  use: authorization
```

Yes, just one line will authorize the user, it's as simple as that!

### Reactive Search

Now, we can use the pre-built stage `reactivesearchQuery` to convert the ReactiveSearch query into ElasticSearch query in order to find the search results.

We can do that in the following way:

```yaml
- id: reactivesearch
  use: reactivesearchQuery
  continueOnError: false
```

### Elastic Search

The final stage is to hit ElasticSearch with the translated query and get the response. This can be done by using the pre-built stage `elasticsearchQuery`

This stage can be defined in the following way:

```yaml
- id: elastic search
  use: elasticsearchQuery
  continueOnError: false
```

### AI Answer

This is the stage that we will make magic happen.

#### Context

Before we move ahead to using the stage, some context would be good to have here. The AI Answer stage is essentially build a chat context to send to ChatGPT. This context is built by using a few hits of the response received from the search backend. For example, ElasticSearch returns 10 hits for the search query then these 10 documents each will be used to build a context to send to ChatGPT.

This is like chatting with ChatGPT but sending the bot each of the top 10 hits for the query passed by the user. After that, we nicely ask the bot to answer our question which is built using the users query. This question can be changed through the stage's input to get different results.

Moreover, the number of documents from the hits that are sent to ChatGPT can also be changed through an input to the stage.

---

In this stage we will use the pre-built stage `AIAnswer`. This stage has a few inputs that need to be passed. They are:

- `docTemplate`: The template to build each message that is sent to ChatGPT. This will be used to build a message from each hit that is sent to ChatGPT.
- `queryTemplate`: The final question that is built and sent to ChatGPT to get the answer from. Default value here is `Can you tell me about: ${value}` where value is dynamically resolved to the query value passed by the user.
- `systemPrompt`: This is the first message sent to ChatGPT, something like starting a conversation with the bot. This defaults to `You're a very helpful assistant`.
- `topDocsForContext`: Number of documents to use to build the context to send to ChatGPT. As explained above, this value can change the answer returned by ChatGPT and the default value here is 3 and has an upper limit of the number of hits returned by the search backend.
- `apiKey`: The OpenAI API key to be used to access ChatGPT's API.
- `model`: ChatGPT model to use for the question. Defaults to `gpt-3.5-turbo` which is their latest (API available) model.
- `maxTokens`: Value of `max_tokens` passed in the ChatGPT request body. [Read more about it here](https://platform.openai.com/docs/api-reference/chat/create#chat/create-max_tokens)
- `temperature`: Value of `temperature` passed in the ChatGPT request body. [Read more about it here](https://platform.openai.com/docs/api-reference/chat/create#chat/create-temperature)


#### Dynamic values

In both `docTemplate` and `queryTemplate` some dynamic values are supported. In the doc template, all the fields returned in the search engine response inside the `_source` field are accessible. For eg: `${source.title}` will resolve to `_source.title` from the response hit.

Similarly for `queryTemplate` the `value` field is provided for dynamic resolution. The `value` field is the query value passed by the user. If the query is following:

```json
{
    "id": "search",
    "value": "good food"
}
```

then the query template `Can you tell me about: ${value}` will resolve to `Can you tell me about: good food`.

---

> In this example, we are using the movies dataset which has the `title` field indicating the name of the movie, `overview` indicating the description of the movie and `backdrop_path` with the URL for the backdrop of the movie.

Following is the stage that we can use to get a decent answer from ChatGPT:

```yaml
- id: ai answer
  use: AIAnswer
  inputs:
    docTemplate: "${source.title} is ${source.overview} with url: ${source.backdrop_path}"
    apiKey: "{{openAIApiKey}}"
```

## Complete pipeline

Now that all the stages are defined, the final pipeline looks like following:

```yaml
enabled: true
description: Supercharge search queries by returning answer to user's query using ChatGPT
routes:
- path: "/movie-db/_reactivesearch"
  method: POST
  classify:
    category: reactivesearch

envs:
  index:
  - movie-db
  openAIApiKey: <your-api-key>

stages:
  - id: authorize user
    use: authorization
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

## Create the pipeline

Now that we have the whole pipeline defined, we can create the pipeline by hitting the **ReactiveSearch** instance.

The URL we will hit is: `/_pipeline` with a **POST** request.

The above endpoint expects a `multipart/form-data` body with the `pipeline` key containing the path to the pipeline file. [Read more about this endpoint here](https://api.reactivesearch.io/#05fbf00d-1698-4ddf-9ad1-22bc740a5379)

We can create the pipeline in the following request:

> Below request assumes all the files mentioned in this guide are present in the current directory

```sh
curl -X POST 'CLUSTER_ID/_pipeline' -H "Content-Type: multipart/form-data" --form "pipeline=pipeline.yaml"
```

## Testing the Pipeline

We can hit the pipeline and see if response contains rearranged results based on vector data. We just need to hit a `/_reactivesearch` endpoint.

Following hits the `movie-db` index to get results for the query `free guy`:

```sh
curl -X POST CLUSTER_ID/amazon_reviews/_reactivesearch -H "Content-Type: application/json" -d '{"query": [{"id": "search", "value": "free guy", "dataField": ["title", "overview"]]}'
```


