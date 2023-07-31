---
title: 'AIAnswer'
meta_title: 'AIAnswer'
meta_description: 'AIAnswer creates an AI-driven answer UI component that is connected to a dataset.'
keywords:
- reactivesearch
- AIAnswer
- appbase
- elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![AIAnswer image](https://i.imgur.com/P6C5kH6.png)

`AIAnswer` creates an AI-driven answer UI component that can interact with a dataset to provide relevant answers based on user inputs. It leverages the power of machine learning to understand the user's questions and fetch the most relevant information.

Example uses:

- Providing answers to common questions related to a specific topic.
- Offering support and help by answering user queries.
- Building a knowledge base or FAQ section for your website.



## Usage

### Basic Usage
```jsx
<a-i-answer 
    componentId="AIAnswerComponent" 
    :react="{
        and: ['SearchBox']
    }"
/>
```

### Usage With All Props
```jsx
<template>
  <a-i-answer
    componentId="AIAnswerComponent"
    title="AI Answer"
    placeholder="Ask something..."
    :react="{
      and: ['AIAnswer'],
    }"
    :onData="handleData"
    :renderError="renderError"
    :showVoiceInput="true"
    :showIcon="true"
    iconPosition="left"
    :enterButton="true"
    :showFeedback="true"
    :a-i-config="{
        docTemplate: '${source.text} is ${source.summary} with url as ${source.url}',
        queryTemplate: 'Answer the following: ${value}',
        topDocsForContext: 7,
        maxTokens: 4000,
        systemPrompt: "You're a helpful assistant.",
      }"
    :showSourceDocuments="true"
    :renderSourceDocument="function (obj){
        return obj.original_title;
    }"
	:onSourceClick="function(sourceObj){
        // perform any side effects
    }"
	triggerOn="question"      // or "question", "manual" (default is always)
    :renderTriggerMessage="End your query with a question mark (?)"
  >
    <template #render"{ loading, data, error }">
        // return custom html
    </template>  
    <template #icon>
        <span>🚀</span>
    </template>
    <template #renderError="error, handleRetry">
       // your custom html       
    </template>
    <template #renderEnterButton="onEnterButtonClick">
        return <button onClick={onEnterButtonClick}>Ask me!</button>
    </template>    
  </a-i-answer>
</template>

```

## Props

### componentId

| Type | Optional |
|------|----------|
|  `String`  |    No    |

unique identifier of the component, can be referenced in other components' `react` prop.

### title

| Type | Optional |
|------|----------|
|  `String or JSX` |   Yes   |

set the title of the component to be shown in the UI.


### AIConfig

| Type | Optional |
|------|----------|
|  `Object` |   Yes   |

Specify additional options for configruing AI responses.

Accepts the following properties:
-   **systemPrompt** `String` [optional]
    The system prompt to send as the first message to ChatGPT. Defaults to `You are a helpful assistant`.
-   **docTemplate** `String` [optional]
    Template to use for building the message sent to ChatGPT for every hit of the response. The `docTemplate` string supports dynamic values using the special syntax `${}`. These values are resolved while the ChatGPT request body is built. It supports keys that are present in the `_source` field in the response hits. As an example, `source.title` will resolve to `_source.title`. If values are not found, defaults to an empty string.
-   **queryTemplate** `String` [optional]
    Template to use for building the message that is sent to ChatGPT as the final question. Defaults to `Can you tell me about ${value}` where `value` is the `query.value`. The querytemplate string supports a dynamic value of `value` which is the query.value of the query.
-   **topDocsForContext** `number` [optional]
    Number of docs to use to build the context. Defaults to 3. This has an upper limit as the total number of hits returned.  
-   **maxTokens** `number` [optional]
    The maximum tokens that can be used for the output. Deafults to being dynamically calculated. Accepts a value between [1, 8000].
-   **temperatue** `number` [optional]
    A control for randomness, a lower value implies a more deterministic output. Defaults to 1, valid values are between [0, 2].


### placeholder

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

set placeholder text to be shown in the component's input field. Defaults to "Search".

### showIcon

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

whether to display a search or custom icon in the input box. Defaults to `true`.
### iconPosition

| Type | Optional |
|------|----------|
|  `String` |   Yes   |

sets the position of the search icon. Can be set to either `left` or `right`. Defaults to `right`.

### iconURL

| Type | Optional |
|------|----------|
|  `string` |   Yes   |

Customize search icon by providing a URL.   

### showInput

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show the input element to allow asking follow up questions. Defaults to `true`.

### enterButton

| Type | Optional |
|------|----------|
|  `boolean` |   Yes   |

When set to `true`, the results would only be updated on press of the  button. Defaults to `false`. You can also provide styles using the `ai-enter-button` key in the `innerClass` prop.

<img src="https://i.imgur.com/aiRe0aB.png" style="margin:0 auto;display:block;"/>


```jsx
    <AIAnswer            
        id="ai-component"
        enterButton={true}
    />
```

### showVoiceInput

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

show a voice icon in the AIAnswer to enable users to set voice input. Defaults to `false`.

### showFeedback

| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |

Toggles displaying the feedback UI component to record AI session's feedback. Defaults to true.

### showSourceDocuments
| Type | Optional |
|------|----------|
|  `Boolean` |   Yes   |
Whether to show the documents from which the AIAnswer is generated or not. Defaults to `true`.
### renderSourceDocument
| Type | Optional |
|------|----------|
|  `slot-scope` |   Yes   |
Render a custom label by returning string or JSx. Default label is rendered as the resolved value of `_id`when `showSourceDocument` is set to true.
```jsx
    <AIAnswer
        id="ai-component"
        :showSourceDocuments="true"
        renderSourceDocument={(obj) => {
                return obj.original_title;
            }
        }  
        onSourceClick={function (srcObj){
            // perform any side effects
        }}         
    >
        <template #renderSourceDocument="obj">
            <div>{{obj.original_title}} 🔍</div>
        </template>
    </AIAnswer>
```
### onSourceClick
| Type | Optional |
|------|----------|
|  `Function` |   Yes   |
callback to handle side-effects when a source button is clicked. Accepts a `sourceObj` param associated with the source button clicked.
```jsx
    <AIAnswer
        id="ai-component"
        :showSourceDocuments="true"
        renderSourceDocument={(obj) => {
                return obj.original_title;
            }
        }  
        onSourceClick={function (srcObj){
            // perform any side effects
        }}         
    />
```
### triggerOn
| Type | Optional |
|------|----------|
|  `string` |   Yes   |
sets the trigger for fetching the AI answer. Defaults to `always`, Accepts one of the following three: 
    - `manual` - AI answer is shown when triggered using the `askButton` or clicking the first suggestion item(`renderTriggerMessage`).
    - `question` - AI answer is shown when the user searches for a question.
    - `always` - AI answer is always shown for every query.
```jsx
    <AIAnswer
        id="ai-component"
        triggerOn="manual"      
    />
```
### renderTriggerMessage
| Type | Optional |
|------|----------|
|  `slot-scope` |   Yes   |
custom markup to display as the first suggestion in the dropdown to trigger the AI answer. It should be used along with `enableAI` set to `true`.
```jsx
    <AIAnswer
        id="ai-component"
        triggerOn="manual"     
        :renderTriggerMessage={End your query with a question mark (?)} // string or slot-scope
    >
        <template #renderTriggerMessage>
            ⁇ End your query with a question mark (?) 🚨
        </template>
    </Answer>
```



### getMicInstance

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function to get the instance of `SpeechRecognition` object, which can be used to override the default configurations.


### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function to listen for the changes in suggestions. The function receives `data`, `rawData`, `loading` and `error` as a single parameter object.

```jsx
    <a-i-answer
        componentId="AIAnswerComponent"
        // ... other props ...
        onData = "({
            data,
            rawData,        
            loading,
            error
        }) =>{
                // do something with the updated properties
        }"
    />
```

### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function that gets triggered in case of an error and provides the `error` object which can be used for debugging or giving feedback to the user if needed.

## Slots

### render

| Type | Optional |
|------|----------|
|  `Function\|slot-scope` |   Yes   |

You can render the conversation in a custom layout by using the `render` slot.

It accepts an object with these properties:
-   **`loading`**: `boolean`
    indicates that the query is still in progress.
-   **`error`**: `object`
    An object containing the error info.
-   **`data`**: `array`
    An array of messages obtained from the conversation with AI service.
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.


You can use `AIAnswer` with `render slot` as shown:

```html
<a-i-answer
	componentId="a-i-answer"
>
  <template #render="{ loading, data, error }"
  >
	<div v-if="loading">loading...</div>
	<pre v-else-if="error">{{ JSON.stringify(error) }}</pre>
	<div
		v-else-if="data && Array.isArray(data)"
		style="width: 80%; margin: 0 auto; padding: 20px"
	>
		<div
			v-for="(message, index) in data"
			:key="index"
			:style="{
				display: 'flex',
				justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
			}"
		>
			<div :style="getMessageStyle(message)">
				{{ message.content }}
			</div>
		</div>
	</div>
  </template>
</a-i-answer>
```

Or you can also use render as prop.

```html
<template>
	<a-i-answer :render="render" />
</template>
<script>
	export default {
		name: 'app',
		methods: {
			render({
				error,
				loading,
				data
			}) {...},
		},
	};
</script>
```


### icon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

set a custom search icon instead of the default 🔍 . Takes precedence over `iconURL` prop.

```html
<a-i-answer>
    <template #icon>
        <span>🚀</span>
    </template>
</a-i-answer>
```

### renderMic

| Type | Optional |
|------|----------|
|  `String\|Function\|slot-scope` |   Yes   |

can be used to render the custom mic option.<br/>
It accepts an object with the following properties:

- **`handleClick`**: `function`
needs to be called when the mic option is clicked.
- **`status`**: `string`
is a constant which can have one of these values:<br/>
`INACTIVE` - mic is in inactive state i.e not listening<br/>
`STOPPED` - mic has been stopped by the user<br/>
`ACTIVE` - mic is listening<br/>
`DENIED` - permission is not allowed<br/>

```html
  <template #renderMic="{ handleClick, status }">
      <div v-if="status === `ACTIVE`">
          <img src="/active_mic.png" onClick={handleClick} />
      </div>
      <div v-if="status === `DENIED`">
          <img src="/denied_mic.png" onClick={handleClick} />
      </div>
      <div v-if="status === `STOPPED`">
          <img src="/mute_mic.png" onClick={handleClick} />
      </div>
      <div v-if="typeof status === `undefined`">
          <img src="/inactive_mic.png" onClick={handleClick} />
      </div>
  </template>
```

### renderError

| Type | Optional |
|------|----------|
|  `String\|Function\|slot-scope` |   Yes   |

can be used to render an error message in case of any error.

```html
<template v-slot:renderError="errorParam, handleRetry">
	<div>{{ JSON.stringify(errorParam) }}</div>
	<button v-on:click="handleRetry">fff</button>
</template> 
```

### renderEnterButton

| Type | Optional |
|------|----------|
|  `slot-scope` |   Yes   |

renders a custom jsx markup for the enter button. Use in conjunction with `enterButton` prop set to `true`.

<img src="https://i.imgur.com/1IwPTnm.png" style="margin:0 auto;display:block;"/>

```jsx
    <a-i-answer
        componentId="AIAnswer"
    >
        <template #renderEnterButton="onClickCB">
            <button onClick={onClickCb}>Ask me!</button>
        </template>
    </a-i-answer>
```


## Demo

<br />

<!-- Example will be added once the implementation PR is merged -->
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/AIAnswer" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`AIAnswer` component supports an `innerClass` prop to provide styles to the sub-components of AIAnswer. These are the supported keys:

-   `ai-title`
-   `ai-search-mic`
-   `ai-enter-button`
-   `ai-error`
-   `ai-message`
-   `ai-input`
-   `ai-feedback`

Read more about it [here](/docs/reactivesearch/react/theming/classnameinjection/).


## Examples

### AIAnswer with default props
<a href="https://reactivesearch-vue-playground.netlify.com/?selectedKind=Search%20Components%2FAIAnswer&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0" target="_blank">AIAnswer with default props</a>

