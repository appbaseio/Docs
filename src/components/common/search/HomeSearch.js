import React from 'react';
import { navigate, Link } from 'gatsby';
import * as JsSearch from 'js-search';
import Autosuggest from 'react-autosuggest';
import data from '../../../data/search.index.json';
import { Spirit } from '../../../styles/spirit-styles';
import Icon from '../Icon';
import sidebar from '../../../data/sidebars/all-sidebar';

const search = new JsSearch.Search('url');
search.tokenizer = new JsSearch.StopWordsTokenizer(new JsSearch.SimpleTokenizer());

search.addIndex('title');
search.addIndex('heading');
search.addIndex('meta_description');
search.addIndex('meta_title');
search.addIndex('tokens');

search.addDocuments(data);

const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	const searchValue = search
		.search(inputValue)
		.filter(item => !item.url.startsWith('/docs/reactivesearch/v2'))
		.filter(item => item.url !== '/data-schema/');
	let topResults = searchValue.filter(item => !item.heading).slice(0, 20);
	const withHeading = searchValue.filter(item => item.heading);
	if (topResults.length < 8) {
		topResults = [...topResults, ...withHeading.slice(0, 20 - topResults.length)];
	}
	const exactMatchIndex = topResults.findIndex(
		item => item.title.toLowerCase() === inputValue && !item.heading,
	);
	if (exactMatchIndex > 0) {
		topResults = [
			topResults[exactMatchIndex],
			...topResults.slice(0, exactMatchIndex),
			...topResults.slice(exactMatchIndex + 1),
		];
	}
	return inputLength === 0 ? [] : topResults;
};

const getSection = url => {
	const isHavingHash = url.indexOf('#');
	let link = url;
	let subSection = '';
	if (isHavingHash) {
		link = url.split('#')[0];
		subSection = url.split('#')[1];
	}
	if (link.startsWith('/docs/reactivesearch')) {
		const linkTags = link.split('/');
		const sectionName = linkTags[linkTags.length - 3];
		let techName = linkTags[linkTags.length - 4];

		switch (techName) {
			case 'v2':
				techName = 'React v2';
				break;
			case 'v3':
				techName = 'React v3';
				break;
			default:
		}

		if (['components', 'advanced', 'overview'].indexOf(sectionName.toLowerCase()) !== -1) {
			return subSection
				? `${techName} > ${sectionName} > ${subSection}`
				: `${techName} > ${sectionName}`;
		}

		return subSection
			? `${techName} > ${sectionName} Components > ${subSection}`
			: `${techName} > ${sectionName} Components`;
	}
	const foundItem = sidebar.find(item => item.link === link || link.startsWith(item.link));

	if (foundItem) {
		return subSection ? `${foundItem.topic} > ${subSection}` : foundItem.topic;
	}

	return '';
};

const getValue = url => {
	if (url.startsWith('/docs/reactivesearch/v2')) {
		return 'react-bw';
	}
	if (url.startsWith('/docs/reactivesearch/v3')) {
		return 'react-bw';
	}
	if (url.startsWith('/docs/reactivesearch/vue')) {
		return 'vue-bw';
	}
	if (url.startsWith('/docs/reactivesearch/native')) {
		return 'native-bw';
	}
	if (url.startsWith('/docs/gettingstarted')) {
		return 'gettingStarted';
	}
	if (url.startsWith('/docs/analytics')) {
		return 'analytics';
	}
	if (url.startsWith('/api/js')) {
		return 'js-bw';
	}
	if (url.startsWith('/api/rest')) {
		return 'rest';
	}
	if (url.startsWith('/docs/data')) {
		return 'importData';
	}
	if (url.startsWith('/docs/security')) {
		return 'security';
	}

	return 'buildingUI';
};

const HitTemplate = ({ hit, currentValue }) => {
	const sectionName = getSection(hit.url);

	const highlightedTitle = hit.title.replace(new RegExp(currentValue, 'ig'), matched => {
		return `<mark>${matched}</mark>`;
	});
	const tokens = hit.tokens.filter(item => item.includes(currentValue));
	let highlightedToken =
		tokens[0] &&
		tokens[0].replace(new RegExp(currentValue, 'ig'), matched => {
			return `<mark>${matched}</mark>`;
		});
	if (highlightedToken && highlightedToken.startsWith('#')) {
		highlightedToken = highlightedToken
			.split('&gt;')
			.slice(1)
			.join('&gt;');
	}

	return (
		<Link
			to={hit.url}
			className="tdn db pt3 pb3 blue search-result pl5 pr5 br3 br--left suggestion break-word"
		>
			<div className="suggestion-container">
				<div className="suggestion-content-icon">
					<Icon name={getValue(hit.url)} />
				</div>

				<div className="full-width">
					<div className="wrap-between mb2">
						<div
							className={`${Spirit.h5} dib`}
							dangerouslySetInnerHTML={{ __html: highlightedTitle }}
						/>
						{sectionName ? (
							<div
								className={`${Spirit.small} midgrey capitalize suggestion-section`}
								dangerouslySetInnerHTML={{ __html: getSection(hit.url) }}
							/>
						) : null}
					</div>
					<p
						className={`${Spirit.small} midgrey mt1 truncate-3`}
						dangerouslySetInnerHTML={{ __html: highlightedToken }}
					/>
				</div>
			</div>
		</Link>
	);
};

class AutoComplete extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			hits: [],
		};

		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.getSuggestionValue = this.getSuggestionValue.bind(this);
	}

	onChange(event, { newValue }) {
		this.setState(() => {
			return { value: newValue };
		});
	}

	onSuggestionsFetchRequested({ value }) {
		const suggestions = getSuggestions(value);
		this.setState({
			hits: suggestions,
		});
	}

	onSuggestionsClearRequested() {
		this.setState({
			hits: [],
		});
	}

	getSuggestionValue = hit => {
		return hit.title;
	};

	suggestionSelected = (event, { suggestion }) => {
		if (event.key === 'Enter') {
			navigate(suggestion.url);
		}
	};

	renderSuggestion = hit => {
		const { value } = this.state;
		return <HitTemplate hit={hit} currentValue={value} />;
	};

	render() {
		// Don't show sections with no results
		const { hits, value } = this.state;

		const inputProps = {
			placeholder: `Search documentation...`,
			onChange: this.onChange,
			value,
			'data-cy': `search-input`,
		};

		const inputTheme = `input-reset form-text b--transparent search-modal-field-bg br-pill flex-auto whitney lh-normal pa2 pl8 plr3 w-100 dark-placeholder`;

		const theme = {
			input: `${inputTheme} home-input`,
			inputOpen: inputTheme,
			inputFocused: inputTheme,
			suggestionsContainerOpen: `fixed home-search`,
			suggestionHighlighted: 'highlighted-suggestion',
			suggestionsList: `list pa0 ma0 pt1 flex-auto`,
			sectionContainer: `pb4 mb4`,
			sectionTitle: `f8 lh-h4 fw5 midgrey w30 tr mt2 sticky top-2 pr2`,
		};

		return (
			<>
				<Icon name="search" className="w3 absolute top-3 right-3" />
				<Autosuggest
					suggestions={hits}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={this.getSuggestionValue}
					onSuggestionSelected={this.suggestionSelected}
					renderSuggestion={this.renderSuggestion}
					inputProps={inputProps}
					theme={theme}
				/>
			</>
		);
	}
}

export default AutoComplete;
