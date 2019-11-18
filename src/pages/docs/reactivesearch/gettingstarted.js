import React from 'react';
import PostLayout from '../../../components/PostLayout';

const GettingStarted = props => {
	return (
		<PostLayout
			sidebar="docs"
			nestedSidebar="web-reactivesearch"
			location={props.location}
			post={{ title: 'Showcase' }}
		>
			Awesome Blossom
		</PostLayout>
	);
};
export default GettingStarted;
