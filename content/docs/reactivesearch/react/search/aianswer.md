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
nestedSidebar: 'web-reactivesearch'
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
<AIAnswer 
    componentId="AIAnswerComponent" 
/>
```

### Usage With All Props
```jsx
    <AIAnswer
        componentId="AIAnswerComponent"
        title="AI Answer"
        placeholder="Ask something..."
        react={{
            and: ['AIAnswer'],
        }}
        onData = {({
            data,
            rawData,
            loading,
            error
        }) =>{
            // perform side effects
        }
        renderError={(error, handleRetry) => <div><pre>{JSON.stringify(error)}</pre><button onClick={handleRetry}>Try Again</button></div>}    
        showVoiceInput={true}
        showIcon={true}
        icon={<span>🚀</span>}
        iconPosition="left"   
        enterButton={true}
        renderEnterButton={(onClickCb) => <button onClick={onClickCb}>Ask me!</button>}
        AIConfig={{
            docTemplate: '${source.text} is ${source.summary} with url as ${source.url}',
            queryTemplate: 'Answer the following: ${value}',
            topDocsForContext: 7,
            maxTokens: 4000,
            systemPrompt: "You're a helpful assistant."
        }}
    />
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
### icon

| Type | Optional |
|------|----------|
|  `JSX` |   Yes   |

set a custom search icon instead of the default 🔍 . Takes precedence over `iconURL` prop.

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
### renderEnterButton

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

renders a custom jsx markup for the enter button. Use in conjunction with `enterButton` prop set to `true`.

<img src="https://i.imgur.com/1IwPTnm.png" style="margin:0 auto;display:block;"/>

```jsx
    <AIAnswer
        id="ai-component"
        enterButton
        renderEnterButton={clickHandler => (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                }}
            >
                <button style={{ border: '1px solid #c3c3c3' }} onClick={clickHandler}>
                    🔍 Search
                </button>
            </div>
        )}
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

### render

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can render suggestions in a custom layout by using the `render` prop.

It accepts an object with these properties:
-   **`loading`**: `boolean`
    indicates that the query is still in progress.
-   **`error`**: `object`
    An object containing the error info.
-   **`data`**: `array`
    An array of messages obtained from the conversation with AI service.
-   **`rawData`** `object`
    An object of raw response as-is from elasticsearch query.

```jsx
    <AIAnswer
    	componentId="ai-answer"
    	render={({ loading, data, error, rawData }) => {
    		if (loading) {
    			return 'loading...';
    		}
    		if (error) {
    			return <pre>{JSON.stringify(error)}</pre>;
    		}
    		if (data && Array.isArray(data)) {
    			return (
    				<div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
    					{data.map((message, index) => {
    						const isSender = message.role === 'user';
    						const messageStyle = {
    							backgroundColor: isSender ? '#cce5ff' : '#f8f9fa',
    							padding: '10px',
    							borderRadius: '7px',
    							marginBottom: '10px',
    							maxWidth: '80%',
    							alignSelf: isSender ? 'flex-end' : 'flex-start',
    							display: 'inline-block',
    							border: '1px solid',
    							color: isSender ? '#004085' : '#383d41',
    							position: 'relative',
    							whiteSpace: 'pre-wrap',
    						};

    						return (
    							<div
    								key={index}
    								style={{
    									display: 'flex',
    									justifyContent: isSender
    										? 'flex-end'
    										: 'flex-start',
    								}}
    							>
    								<div style={messageStyle}>{message.content}</div>
    							</div>
    						);
    					})}
    				</div>
    			);
    		}
    	}}
    />
```

Or you can also use render function as children

```jsx
    <AIAnswer>
        {
            ({
                loading,
                error,
                data,
                rawData,
            }) => (
                // return UI to be rendered
            )
        }
    </AIAnswer>
```

### renderError

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can be used to render an error message in case of any error.

```jsx
    renderError={(error, handleRetry) => (
            <div>
                Something went wrong!<br/>Error details<br/>{error}
                <button onClick={handleRetry}>Regenerate response</button>
            </div>
        )
    }
```



### getMicInstance

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function to get the instance of `SpeechRecognition` object, which can be used to override the default configurations.
### renderMic

| Type | Optional |
|------|----------|
|  `String or JSX or Function` |   Yes   |

can we used to render the custom mic option.<br/>
It accepts an object with the following properties:
-   **`handleClick`**: `function`
    needs to be called when the mic option is clicked.
-   **`status`**: `string`
    is a constant which can have one of these values:<br/>
    `INACTIVE` - mic is in inactive state i.e not listening<br/>
    `STOPPED` - mic has been stopped by the user<br/>
    `ACTIVE` - mic is listening<br/>
    `DENIED` - permission is not allowed<br/><br/>

```jsx
    renderMic = {({ handleClick, status }) => {
        switch(status) {
            case 'ACTIVE':
                return <img src="/active_mic.png" onClick={handleClick} />
            case 'DENIED':
            case 'STOPPED':
                return <img src="/mute_mic.png" onClick={handleClick} />
            default:
                return <img src="/inactive_mic.png" onClick={handleClick} />
        }
    }}
```

### onData

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function to listen for the changes in suggestions. The function receives `data`, `rawData`, `loading` and `error` as a single parameter object.

```jsx
    <AIAnswer
        componentId="AIAnswerComponent"
        // ... other props ...
        onData = {({
            data,
            rawData,        
            loading,
            error
        }) =>{
                // do something with the updated properties
        }}
    />
```

### onError

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

You can pass a callback function that gets triggered in case of an error and provides the `error` object which can be used for debugging or giving feedback to the user if needed.


## Demo

<br />

<!-- Example will be added once the implementation PR is merged -->
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/AIAnswer" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

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
<a href="https://opensource.appbase.io/playground/?selectedKind=Search%20components%2FAIAnswer" target="_blank">AIAnswer with default props</a>

