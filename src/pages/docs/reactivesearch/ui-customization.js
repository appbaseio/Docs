import React from 'react';
import PostLayout from '../../../components/PostLayout';

import '../../../styles/started.css';

const Customization = props => {
	return (
		<PostLayout
			sidebar="docs"
			nestedSidebar="web-reactivesearch"
			location={props.location}
			post={{ title: '' }}
		>
			<h2>UI Customization Guide</h2>
			<p>In this guide, we will discuss the customization possibilities with the ReactiveSearch UI libraries.</p>
			<img src="https://i.imgur.com/W3Fc4CB.jpg" alt="UI customization guide" max-width="800px"></img>
            <div style={{marginTop: '20px'}}>
                <p style={{marginRight: '10px', display: 'inline'}}>Take this 2 mins interactive quiz to get a UI library recommendation based on your use-case</p>
                <button data-tf-popup="o6CkRn05" data-tf-iframe-props="title=Choose UI Library" data-tf-medium="snippet" style={{all: 'unset', fontFamily: 'Helvetica,Arial,sans-serif', display: 'inline-block', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: '#0445AF', color: '#FFFFFF', fontSize: '16px', borderRadius: '20px', padding: '0 26px', fontWeight: 'bold', height: '40px', cursor: 'pointer', lineHeight: '40px', textAlign: 'center', margin: 0, textDecoration: 'none'}}>Take interactive quiz 🪄</button>
            </div>
			<div className="container">
				<h3>Theming</h3>
				<p>
					Themes are useful to customize the default styles for a UI library. You can also
					use the <b>themePreset</b> as <b>dark</b> to enable the dark mode.
				</p>
				<p>
					You can visit the following links to find the detailed guide to theme your
					library.
				</p>
				<ul>
					<li>
						<a href="/docs/reactivesearch/v3/theming/overview/">
							ReactiveSearch (React)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/vue/theming/Overview/">
							ReactiveSearch (Vue)
						</a>
					</li>
				</ul>
				<h3>Styling</h3>
				<p>
					To customize the CSS for components, you can use the <b>className</b> prop along
					with the <b>innerClass</b> prop. The <b>className</b> property applies the class
					to the root component and <b>innerClass</b> property is useful to customize the
					styles for the sub-components.
				</p>
				<p>Follow the docs for your library.</p>
				<ul>
					<li>
						<a href="/docs/reactivesearch/v3/theming/classnameinjection/">
							ReactiveSearch (React)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/react-searchbox/searchbox/#customize-style">
							SearchBox (React)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/vue/theming/ClassnameInjection/">
							ReactiveSearch (Vue)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/vue-searchbox/searchbox/#customize-style">
							SearchBox (Vue)
						</a>
					</li>
				</ul>
				<h3>How do you bring your design system?</h3>
				<p>
					If you're already using a design system and want to change the complete look and
					feel of the components, then customizing the CSS could be cumbersome. For
					example, If you're using <b>ant-design</b> components and want to replace the{' '}
					<b>CheckList</b> component in{' '}
					<a href="/docs/reactivesearch/v3/list/multilist/">
						MultiList
					</a>{' '}
					to the <b>CheckList</b> component from <b>ant-design</b>.
				</p>
				<p>
					Depending on the level of customization you want, you can opt for any of the
					techniques mentioned below:
				</p>
				<h4>UI Customization for Sub-components</h4>
				<p>
					To customize the UI for sub-components we provide <b>render{'X'}</b> props or
					slots specific to the sub-component. For example, to change the UI for list
					options in the{' '}
					<a href="/docs/reactivesearch/v3/list/multilist/">
						MultiList
					</a>{' '}
					component we can use the <b>renderItem</b> method like below.
				</p>
				<iframe
					src="https://carbon.now.sh/embed/EK2jwQaHPQIsFqk407rt"
					style={{
						width: 622,
						height: 428,
						border: 0,
						transform: 'scale(1)',
						overflow: 'hidden',
					}}
					sandbox="allow-scripts allow-same-origin"
				></iframe>
				<h4>UI Customization for Component</h4>
				<p>
					The <b>render</b> prop/slot in components gives you the full control over the
					render logic of a component. The following example uses the{' '}
					<a href="https://ant.design/" target="blank">
						ant-design
					</a>{' '}
					components to render the results and filter options.
				</p>
				<iframe
					src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/MultiListAntd?fontsize=14&hidenavigation=1&theme=dark&view=preview"
					style={{
						width: '100%',
						height: 500,
						border: 0,
						borderRadius: 4,
						overflow: 'hidden',
					}}
					title="multilist-with-antd"
					allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
					sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
				></iframe>
				<h4>UI and Functionality Customization</h4>
				<p>
					If you have a use-case where you want to customize the component's query along
					with the UI then we have a generic component in libraries to serve the purpose.
				</p>
				<p>Learn more about it by following the below links:</p>
				<ul>
					<li>
						<a	href="/docs/reactivesearch/v3/advanced/reactivecomponent/">
							ReactiveComponent in ReactiveSearch (React)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/react-searchbox/searchcomponent/">
							SearchComponent in SearchBox (React)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/react-native-searchbox/searchcomponent/">
							SearchComponent in SearchBox (React Native)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/vue/advanced/ReactiveComponent/">
							ReactiveComponent in ReactiveSearch (Vue)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/vue-searchbox/searchcomponent/">
							SearchComponent in SearchBox (Vue)
						</a>
					</li>
					<li>
						<a href="/docs/reactivesearch/flutter-searchbox/searchwidgetconnector/">
							SearchComponent in SearchBox (Flutter)
						</a>
					</li>
				</ul>
			</div>
		</PostLayout>
	);
};
export default Customization;
