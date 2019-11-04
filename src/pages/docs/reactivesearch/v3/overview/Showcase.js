import React from 'react';
import {
	ReactiveBase,
	DataSearch,
	MultiList,
	RatingsFilter,
	SingleDropdownList,
	SingleList,
	RangeSlider,
	ToggleButton,
	ReactiveList,
} from '@appbaseio/reactivesearch';

import PostLayout from '../../../../../components/PostLayout';
import ShowcaseComponent from '../../../../../components/ShowcaseComponent';

const settings = {
	app: 'movies-store-app',
	credentials: 'ctWRp9QBE:fece5752-b478-452b-8173-00b278e5e0b0',
	theme: {
		colors: {
			textColor: '#738a94',
			primaryTextColor: '#fff',
			primaryColor: '#3eb0ef',
			titleColor: '#343f44',
			alertColor: '#d9534f',
		},
	},
};

const dataSearchProps = {
	dataField: [
		'original_title',
		'original_title.autosuggest',
		'original_title.keyword',
		'original_title.search',
	],
	componentId: 'search',
};

const multilistProps = {
	dataField: 'genres_data.keyword',
	componentId: 'multilist',
	react: { and: ['search'] },
	showSearch: false,
};

const singleListProps = {
	dataField: 'original_language.keyword',
	componentId: 'singlelist',
	react: { and: ['search'] },
	showSearch: false,
};

const singleDropdownProps = {
	dataField: 'genres_data.keyword',
	componentId: 'singledropdownlist',
	react: { and: ['search'] },
	showSearch: false,
};

const rangeSliderProps = {
	dataField: 'vote_average',
	componentId: 'rangeslider',
	react: { and: ['search'] },
	showHistogram: true,
	tooltipTrigger: 'hover',
	rangeLabels: {
		start: '0 Votes',
		end: '10 Votes',
	},
};

const ratingsFilterProps = {
	componentId: 'ratingfilter',
	dataField: 'vote_average',
	data: [
		{ start: 4, end: 5, label: '4 & up' },
		{ start: 3, end: 5, label: '3 & up' },
		{ start: 2, end: 5, label: '2 & up' },
		{ start: 1, end: 5, label: '> 1 vote' },
	],
};

const toggleButtonProps = {
	componentId: 'togglebutton',
	dataField: 'genres_data.keyword',
	data: [
		{ label: 'Drama', value: 'Drama' },
		{ label: 'Comedy', value: 'Comedy' },
		{ label: 'Thriller', value: 'Thriller' },
	],
};

const reactiveListProps = {
	componentId: 'result',
	react: {
		and: [
			'togglebutton',
			'ratingfilter',
			'rangeslider',
			'search',
			'singledropdownlist',
			'singlelist',
			'multilist',
		],
	},
	size: 5,
	pagination: true,
	dataField: '_score',
	renderItem: res => <pre key={res._id}>{res.original_title}</pre>,
	scrollOnChange: false,
};

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
			<PostLayout
				sidebar="docs"
				nestedSidebar="web-reactivesearch"
				location={location}
				post={{ title: 'Showcase' }}
			>
				{mounted ? (
					<ReactiveBase {...settings}>
						<div className="showcase">
							<div className="w-100">
								<ShowcaseComponent
									title="DataSearch"
									link="/docs/reactivesearch/v3/search/datasearch/"
								>
									<DataSearch {...dataSearchProps} />
								</ShowcaseComponent>
							</div>
							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="MultiList"
									link="/docs/reactivesearch/v3/list/multilist/"
								>
									<MultiList {...multilistProps} />
								</ShowcaseComponent>

								<ShowcaseComponent
									title="SingleList"
									link="/docs/reactivesearch/v3/list/singlelist/"
								>
									<SingleList {...singleListProps} />
								</ShowcaseComponent>
							</div>

							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="RangeSlider"
									link="/docs/reactivesearch/v3/range/rangeslider/"
								>
									<RangeSlider {...rangeSliderProps} />
								</ShowcaseComponent>

								<ShowcaseComponent
									title="RatingsFilter"
									link="/docs/reactivesearch/v3/range/ratingsfilter/"
								>
									<RatingsFilter {...ratingsFilterProps} />
								</ShowcaseComponent>
							</div>
							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="SingleDropdownList"
									link="/docs/reactivesearch/v3/list/singledropdownlist/"
								>
									<SingleDropdownList {...singleDropdownProps} />
								</ShowcaseComponent>
								<ShowcaseComponent
									title="ToggleButton"
									link="/docs/reactivesearch/v3/list/togglebutton/"
								>
									<ToggleButton {...toggleButtonProps} />
								</ShowcaseComponent>
							</div>
							<div className="showcase-grid">
								<ShowcaseComponent
									title="ReactiveList"
									link="/docs/reactivesearch/v3/result/reactivelist/"
								>
									<ReactiveList {...reactiveListProps} />
								</ShowcaseComponent>
							</div>
						</div>
					</ReactiveBase>
				) : (
					'Loading'
				)}
			</PostLayout>
		);
	}
}

export default Showcase;
