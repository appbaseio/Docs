import React from 'react';
import PostLayout from '../../../components/PostLayout';

import '../../../styles/started.css';

const GettingStarted = props => {
	return (
		<PostLayout
			sidebar="docs"
			nestedSidebar="web-reactivesearch"
			location={props.location}
			post={{ title: '' }}
		>
			<h2>Choose your UI Library</h2>
			<p>You can choose from these UI components libraries for building your search UI.</p>
            <p style={{marginTop: '10px', marginRight: '10px', display: 'inline'}}>Or take this 2 mins interactive quiz to get a library recommendation based on your use-case:</p>
            <button data-tf-popup="Zyd2RDro" data-tf-iframe-props="title=Choose UI Library" data-tf-medium="snippet" style={{all: 'unset', fontFamily: 'Helvetica,Arial,sans-serif', display: 'inline-block', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: '#0445AF', color: '#FFFFFF', fontSize: '16px', borderRadius: '20px', padding: '0 26px', fontWeight: 'bold', height: '40px', cursor: 'pointer', lineHeight: '40px', textAlign: 'center', margin: 0, textDecoration: 'none'}}>Take interactive quiz 🪄</button>
            <script src="//embed.typeform.com/next/embed.js"></script>
			<div className="container getting-started" style={{ marginTop: "40px"}}>
				<div className="card">
					<img src="/images/ui-builder.png" alt="UI Builder" />
					<div className="content">
						<h2>UI Builder</h2>
						<p>Create a storefront / site search UI or recommendations widget NoCode</p>
						<a className="btn" href="/docs/reactivesearch/ui-builder/search">
							Start with UI Builder
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/react.jpeg" alt="React" />
					<div className="content">
						<h2>React</h2>
						<p>React UI components for building data-driven search experiences</p>
						<a className="btn" href="/docs/reactivesearch/v4/overview/quickstart/">
							Start with React
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/vue.png" alt="Vue" />
					<div className="content">
						<h2>Vue</h2>
						<p>Vue UI components for building data-driven search experiences</p>
						<a className="btn" href="/docs/reactivesearch/vue/overview/QuickStart/">
							Start with Vue
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/Searchbox_JS@1x.png" alt="Searchbox" />
					<div className="content">
						<h2>Searchbox</h2>
						<p>
							Vanilla JS searchbox UI component to query and display results from your
							Elasticsearch app (aka index)
						</p>
						<a className="btn" href="/docs/reactivesearch/searchbox/Quickstart/">
							Start with Searchbox
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/Searchbox_React@1x.png" alt="React Searchbox" />
					<div className="content">
						<h2>React Searchbox</h2>
						<p>
							React searchbox UI component to query and display results from your
							Elasticsearch app (aka index) using declarative props.
						</p>
						<a className="btn" href="/docs/reactivesearch/react-searchbox/quickstart/">
							Start with React Searchbox
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/Searchbox_Vue@1x.png" alt="Vue Searchbox" />
					<div className="content">
						<h2>Vue Searchbox</h2>
						<p>
							Vue searchbox UI component to query and display results from your
							Elasticsearch app (aka index) using declarative props.
						</p>
						<a className="btn" href="/docs/reactivesearch/vue-searchbox/quickstart/">
							Start with Vue Searchbox
						</a>
					</div>
				</div>

				<div className="card">
					<img src="/images/Searchbox_react_native.png" alt="React Native Searchbox" />
					<div className="content">
						<h2>React Native Searchbox</h2>
						<p>
							React native searchbox UI component to query and display results from
							your Elasticsearch app (aka index) using declarative props.
						</p>
						<a
							className="btn"
							href="/docs/reactivesearch/react-native-searchbox/quickstart/"
						>
							Start with React Native Searchbox
						</a>
					</div>
				</div>

				<div className="card">
					<img src="/images/flutter.png" alt="Flutter Searchbox" />
					<div className="content">
						<h2>Flutter Searchbox</h2>
						<p>
							Flutter searchbox UI component to query and display results from your
							Elasticsearch app (aka index) using declarative props.
						</p>
						<a
							className="btn"
							href="/docs/reactivesearch/flutter-searchbox/quickstart/"
						>
							Start with Flutter Searchbox
						</a>
					</div>
				</div>

				<div className="card">
					<img src="/images/REST.png" alt="REST API" />
					<div className="content">
						<h2>REST API</h2>
						<p>Reactivesearch.io REST API (Elasticsearch compatible)</p>
						<a className="btn" href="/api/rest/quickstart/">
							Start with REST API
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/android.jpeg" alt="Android Library" />
					<div className="content">
						<h2>Android Library</h2>
						<p>Elasticsearch and reactivesearch.io library for Android (and Java)</p>
						<a
							className="btn"
							href="https://github.com/appbaseio/appbase-droid"
							target="_blank"
							rel="noopener noreferrer"
						>
							Start with Android
						</a>
					</div>
				</div>
				<div className="card">
					<img src="/images/swift.jpeg" alt="Swift Library" />
					<div className="content">
						<h2>Swift Library</h2>
						<p>Elasticsearch and reactivesearch.io library for Swift iOS / MacOS</p>
						<a
							className="btn"
							href="https://github.com/appbaseio/appbase-swift"
							target="_blank"
							rel="noopener noreferrer"
						>
							Start with Swift
						</a>
					</div>
				</div>

				<div className="card">
					<img src="/images/Searchbase@1x.png" alt="Searchbase" />
					<div className="content">
						<h2>Searchbase</h2>
						<p>
							A lightweight & platform agnostic search library with some common
							utilities.
						</p>
						<a
							className="btn"
							href="/docs/reactivesearch/searchbase/overview/QuickStart/"
						>
							Start with Searchbase
						</a>
					</div>
				</div>
				<div className="card">
					<img src="https://i.imgur.com/XTilJ6k.png" alt="algolia-autocomplete" />
					<div className="content">
						<h2>Algolia Autocomplete</h2>
						<p>
							A Suggestions plugin that adds Query Suggestions powered by
							appbase-js client, to your autocomplete.
						</p>
						<a
							className="btn"
							href="/docs/reactivesearch/autocomplete-plugin/quickstart/"
						>
							Start with Algolia Autocomplete
						</a>
					</div>
				</div>
			</div>
		</PostLayout>
	);
};
export default GettingStarted;
