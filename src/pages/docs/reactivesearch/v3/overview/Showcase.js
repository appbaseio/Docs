import React from 'react';
import {
	ReactiveBase,
	DataSearch,
	MultiList,
	RatingsFilter,
	SingleDropdownList,
	SingleList,
	DynamicRangeSlider,
	ToggleButton,
	ReactiveList,
} from '@appbaseio/reactivesearch';

import PostLayout from '../../../../../components/PostLayout';
import ShowcaseComponent from '../../../../../components/ShowcaseComponent';

const settings = {
	app: 'airbnb-dev',
	credentials: 'cd2sqkk0X:fb65de54-2eab-48cf-a9f0-7fead80647d7',
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
	dataField: ['name', 'name.autosuggest', 'name.keyword', 'name.search'],
	className: 'showcase-search',
	componentId: 'search',
};

const multilistProps = {
	dataField: 'city.keyword',
	componentId: 'multilist',
	react: { and: ['search'] },
	className: 'showcase-list',
	showSearch: false,
	placeholder: 'Select City',
};

const singleListProps = {
	dataField: 'state.keyword',
	componentId: 'singlelist',
	react: { and: ['search'] },
	className: 'showcase-list',
	showSearch: false,
	placeholder: 'Select State',
};

const singleDropdownProps = {
	dataField: 'propertyType.keyword',
	componentId: 'singledropdownlist',
	className: 'dropdown-list',
	react: { and: ['search'] },
	showSearch: false,
};

const rangeSliderProps = {
	dataField: 'accommodates',
	componentId: 'rangeslider',
	react: { and: ['search'] },
	showHistogram: true,
	tooltipTrigger: 'hover',
	rangeLabels: (min, max) => ({
		start: min + ' Accommodates',
		end: max + ' Accommodates',
	}),
};

const ratingsFilterProps = {
	componentId: 'ratingfilter',
	dataField: 'beds',
	dimmedIcon: (
		<img
			style={{ width: 22, height: 22, marginLeft: 5 }}
			alt="Inactive Bed"
			src="https://img.icons8.com/pastel-glyph/2x/bed--v2.png"
		/>
	),
	icon: (
		<img
			style={{ width: 22, height: 22, marginLeft: 5 }}
			alt="Active Bed"
			src="https://img.icons8.com/cotton/2x/bed--v2.png"
		/>
	),
	data: [
		{ start: 4, end: 5, label: '4 & up' },
		{ start: 3, end: 5, label: '3 & up' },
		{ start: 2, end: 5, label: '2 & up' },
		{ start: 1, end: 5, label: '> 1 vote' },
	],
};

const toggleButtonProps = {
	componentId: 'togglebutton',
	dataField: 'bedType.keyword',
	data: [
		{ label: 'Real Bed', value: 'Real Bed' },
		{ label: 'Single', value: 'Single' },
		{ label: 'Futon', value: 'Futon' },
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
	renderItem: res => <pre key={res._id}>{res.name}</pre>,
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
									title="MultiList - Cities"
									link="/docs/reactivesearch/v3/list/multilist/"
								>
									<MultiList {...multilistProps} />
								</ShowcaseComponent>

								<ShowcaseComponent
									title="SingleList - State"
									link="/docs/reactivesearch/v3/list/singlelist/"
								>
									<SingleList {...singleListProps} />
								</ShowcaseComponent>
							</div>

							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="RangeSlider - Accommodates"
									link="/docs/reactivesearch/v3/range/rangeslider/"
								>
									<DynamicRangeSlider {...rangeSliderProps} />
								</ShowcaseComponent>

								<ShowcaseComponent
									title="RatingsFilter - Beds"
									link="/docs/reactivesearch/v3/range/ratingsfilter/"
								>
									<RatingsFilter {...ratingsFilterProps} />
								</ShowcaseComponent>
							</div>
							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="SingleDropdownList - Property Type"
									link="/docs/reactivesearch/v3/list/singledropdownlist/"
								>
									<SingleDropdownList {...singleDropdownProps} />
								</ShowcaseComponent>
								<ShowcaseComponent
									title="ToggleButton - Bed Type"
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
