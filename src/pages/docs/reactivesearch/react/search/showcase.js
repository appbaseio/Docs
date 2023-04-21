import React from 'react';
import loadable from '@loadable/component';

import ShowcaseLayout from '../../../../../components/SearchShowcaseLayout';

const SearchboxShowcase = loadable(() => import('searchbox-showcase'));

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
			<ShowcaseLayout
				post={{ title: 'Searchbox showcase' }}
				sidebar="docs"
				nestedSidebar="web-reactivesearch"
				location={location}
			>
				<div className="bootstrap">{mounted ? <SearchboxShowcase /> : 'Loading'}</div>
			</ShowcaseLayout>
		);
	}
}

export default Showcase;
