import React from 'react';
import {
	ReactiveBase,
	DataSearch,
	MultiList,
	SingleDropdownList,
	SingleList,
	DynamicRangeSlider,
	ToggleButton,
	ReactiveList,
} from '@appbaseio/reactivesearch';
import Helmet from 'react-helmet';

import PostLayout from '../../../../../components/PostLayout';
import ShowcaseComponent from '../../../../../components/ShowcaseComponent';

const settings = {
	app: 'clone-airbeds',
	credentials: '3f7ed293fbe0:47ff004a-4722-49fe-bc48-0ff0286e4de0',
	url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
	enableAppbase: true,
	mapKey: 'AIzaSyA9JzjtHeXg_C_hh_GdTBdLxREWdj3nsOU',
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
	dataField: 'accommodates',
	componentId: 'multilist',
	react: {
		and: ['search', 'togglebutton',
			'ratingfilter',
			'rangeslider',
			'search',
			'singledropdownlist',
			'singlelist']
	},
	className: 'showcase-list',
	showSearch: false,
	placeholder: 'Select Accommodates',
};

const singleListProps = {
	dataField: 'property_type.keyword',
	componentId: 'singlelist',
	react: {
		and: ['search', 'togglebutton',
			'ratingfilter',
			'rangeslider',
			'search',
			'singledropdownlist',
			'multilist']
	},
	className: 'showcase-list',
	showSearch: false,
	placeholder: 'Select Property Type',
};

const singleDropdownProps = {
	dataField: 'property_type.keyword',
	componentId: 'singledropdownlist',
	className: 'dropdown-list',
	react: {
		and: ['search', 'togglebutton',
			'ratingfilter',
			'rangeslider',
			'search',
			'singelist',
			'multilist']
	},
	showSearch: false,
};

const rangeSliderProps = {
	dataField: 'price',
	componentId: 'rangeslider',
	react: {
		and: ['search', 'togglebutton',
			'ratingfilter',
			'multilist',
			'search',
			'singledropdownlist',
			'singlelist']
	},
	showHistogram: true,
	tooltipTrigger: 'hover',
	rangeLabels: (min, max) => ({
		start: `$${min}`,
		end: `$${max}`,
	}),
};

const dateRangeProps = {
	componentId: 'date',
	dataField: 'date_from',
	numberOfMonths: 2,
	customQuery: value => {
		let query = null;
		if (value) {
			query = [
				{
					range: {
						date_from: {
							gte: moment(value.start).format('YYYYMMDD'),
						},
					},
				},
				{
					range: {
						date_to: {
							lte: moment(value.end).format('YYYYMMDD'),
						},
					},
				},
			];
		}
		return query ? { query: { bool: { must: query } } } : null;
	},
	initialMonth: new Date('04/01/2017'),
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
	dataField: 'room_type.keyword',
	data: [
		{ label: 'Entire home/apt', value: 'Entire home/apt' },
		{ label: 'Private Room', value: 'Private room' },
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
			'date',
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
				nestedSidebar="vue-reactivesearch"
				location={location}
				post={{ title: 'Showcase' }}
			>
				{mounted ? (
					<ReactiveBase {...settings}>
						<div className="showcase">
							<div className="w-100">
								<ShowcaseComponent
									title="DataSearch"
									link="/docs/reactivesearch/vue/search/DataSearch/"
								>
									<DataSearch {...dataSearchProps} />
								</ShowcaseComponent>
							</div>
							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="MultiList - Accommodates"
									link="/docs/reactivesearch/vue/list/MultiList/"
								>
									<MultiList {...multilistProps} />
								</ShowcaseComponent>

								<ShowcaseComponent
									title="SingleList - Property Type"
									link="/docs/reactivesearch/vue/list/SingleList/"
								>
									<SingleList {...singleListProps} />
								</ShowcaseComponent>
							</div>

							<div className="showcase-grid">
								<ShowcaseComponent
									title="DynamicRangeSlider - Price"
									link="/docs/reactivesearch/vue/range/DynamicRangeSlider/"
								>
									<DynamicRangeSlider {...rangeSliderProps} />
								</ShowcaseComponent>
							</div>

							<div className="showcase-grid grid-2">
								<ShowcaseComponent
									title="SingleDropdownList - Property Type"
									link="/docs/reactivesearch/vue/list/SingleDropdownList/"
								>
									<SingleDropdownList {...singleDropdownProps} />
								</ShowcaseComponent>
								<ShowcaseComponent
									title="ToggleButton - Room Type"
									link="/docs/reactivesearch/vue/list/ToggleButton/"
								>
									<ToggleButton {...toggleButtonProps} />
								</ShowcaseComponent>
							</div>
							<div className="showcase-grid">
								<ShowcaseComponent
									title="ReactiveList"
									link="/docs/reactivesearch/vue/result/ReactiveList/"
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
