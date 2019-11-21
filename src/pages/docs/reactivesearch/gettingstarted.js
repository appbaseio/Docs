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
				<h3>Getting Started</h3>
			<div className="container getting-started">
				<div className="card">
					<img
						src="https://appbase.io/static/images/onboarding/finish-screen/React@2x.png"
						alt="React"
					/>
					<div className="content">
						<h2>React</h2>
						<p>React UI components for building data-driven search experiences</p>
						<a className="btn">Start with React</a>
					</div>
				</div>
				<div className="card">
					<img
						src="https://appbase.io/static/images/onboarding/finish-screen/ReactNative@2x.png"
						alt="React Native"
					/>
					<div className="content">
						<h2>React Native</h2>
						<p>React Native UI components for data-driven search experiences</p>
						<a className="btn">Start with React Native</a>
					</div>
				</div>
				<div className="card">
					<img
						src="https://appbase.io/static/images/onboarding/finish-screen/vue@2x.png"
						alt="Vue"
					/>
					<div className="content">
						<h2>Vue</h2>
						<p>Vue UI components for building data-driven search experiences</p>
						<a className="btn">Start with Vue</a>
					</div>
				</div>
				<div className="card">
					<img
						src="https://appbase.io/static/images/onboarding/finish-screen/React@2x.png"
						alt="React"
					/>
					<div className="content">
						<h2>React</h2>
						<p>React UI components for building data-driven search experiences</p>
						<a className="btn">Start with React</a>
					</div>
				</div>
				<div className="card">
					<img
						src="https://appbase.io/static/images/onboarding/finish-screen/ReactNative@2x.png"
						alt="React Native"
					/>
					<div className="content">
						<h2>React Native</h2>
						<p>React Native UI components for data-driven search experiences</p>
						<a className="btn">Start with React Native</a>
					</div>
				</div>
				<div className="card">
					<img
						src="https://appbase.io/static/images/onboarding/finish-screen/vue@2x.png"
						alt="Vue"
					/>
					<div className="content">
						<h2>Vue</h2>
						<p>Vue UI components for building data-driven search experiences</p>
						<a className="btn">Start with Vue</a>
					</div>
				</div>
			</div>
		</PostLayout>
	);
};
export default GettingStarted;
