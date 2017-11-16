import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import * as JsSearch from 'js-search';
import {navigateTo} from 'gatsby-link';

import data from 'data/search.index.json';
import {colors, media} from 'theme';

import { nav } from 'utils/sectionList';
import SearchSvg from '../LayoutHeader/SearchSvg';
import './styles.css';

const search = new JsSearch.Search('url');
search.tokenizer =
new JsSearch.StopWordsTokenizer(
    new JsSearch.SimpleTokenizer());
search.addIndex('title');
search.addIndex('heading');
search.addIndex('tokens');
search.addDocuments(data);
console.log(nav)
const getSection = value => {
  let currentSection = null;
  console.log(value)
  nav.forEach(section => {
    if (section.items.some(item => item.title === value)) {
      currentSection = section.title;
    }
  });
  return currentSection;
};

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let topResults = search.search(inputValue).slice(0, 8);
  const exactMatchIndex = topResults.findIndex(
    item => item.title.toLowerCase() === inputValue && !item.heading.length,
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

const getSuggestionValue = suggestion =>
  `${suggestion.heading}${suggestion.heading.length
    ? ' in '
    : ''}${suggestion.title}`;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      outlineBottom: '1px solid #ddd',
    }}
  >
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        css={{
          color: colors.darker,
          fontWeight: 'bold',
          paddingBottom: 5,
        }}>
        {suggestion.heading}
      </span>
      <span
        css={{
          color: colors.subtle,
        }}>
        {suggestion.title}
      </span>
    </div>
    <div
      css={{
        borderLeft: `2px solid ${colors.brand}`,
        paddingLeft: 5,
        color: colors.darker,
        flexShrink: 0,
        flexBasis: 100,

        [media.lessThan('small')]: {
          display: 'none',
        },
      }}
    >
      {getSection(suggestion.title)}
    </div>
  </div>
);

const renderInputComponent = inputProps => (
  <div>
    <div
      css={{
        position: 'absolute',
        padding: 17,
        color: colors.darker,

        [media.lessThan('xlarge')]: {
          padding: 12,
        },

        [media.lessThan('medium')]: {
          padding: 10,
        },
      }}
    >
      <SearchSvg />
    </div>
    <input {...inputProps} />
  </div>
);

class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (e, {suggestion}) => {
    const prefix = this.props.prefixSlash ? '/' : '';
    navigateTo(prefix + suggestion.url);
  };

  render() {
    const {value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search Docs',
      value,
      onChange: this.onChange,
      autoFocus: true,
      onBlur: () => {
        if (this.props.handleBlur) {
          this.props.handleBlur();
        }
      },
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

SearchBox.defaultProps = {
  prefixSlash: false,
};

export default SearchBox;
