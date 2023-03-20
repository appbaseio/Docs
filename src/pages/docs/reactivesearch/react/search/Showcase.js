import React from 'react';

import SearchboxShowcase from 'searchbox-showcase';

import ShowcaseLayout from './ShowcaseLayout';

class Showcase extends React.Component {
	state = {
		mounted: false,
	};

	async componentDidMount() {
		this.setState({
			mounted: true,
		});
	}

	render() {
		const { mounted } = this.state;
		const { location } = this.props;
		return (
			<ShowcaseLayout sidebar="docs" nestedSidebar="web-reactivesearch" location={location}>
				<div className="bootstrap">{mounted ? <SearchboxShowcase /> : 'Loading'}</div>
			</ShowcaseLayout>
		);
	}
}

export default Showcase;
