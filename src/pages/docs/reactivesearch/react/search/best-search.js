import React from 'react';
import loadable from '@loadable/component';

import ShowcaseLayout from '../../../../../components/SearchShowcaseLayout';

import '../../../../../styles/best-search.css';

const SearchboxShowcase = loadable(() => import('best-search-reactivesearch'));

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
				post={{ title: 'Best Search' }}
				sidebar="docs"
				nestedSidebar="web-reactivesearch"
				location={location}
			>
				<div className="bootstrap best-search">
					{mounted ? <SearchboxShowcase /> : 'Loading'}
				</div>
			</ShowcaseLayout>
		);
	}
}

export default Showcase;
