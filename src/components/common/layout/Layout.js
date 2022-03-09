import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './Header';
import Footer from './Footer';

// Additional styles
import '../../../styles/app.css';
import '../../../styles/prism.css';

const DefaultLayout = ({ children, bodyClass, mainClass, header, headerDividerStyle }) => {
	useEffect(() => {
		const recentSuggestionsArr = JSON.parse(localStorage.getItem('recentSuggestions')) || [];
		if(!recentSuggestionsArr.includes(window.location.pathname)) {
			if(recentSuggestionsArr.length && recentSuggestionsArr.length >= 5)
				recentSuggestionsArr.pop();
			recentSuggestionsArr.unshift(window.location.pathname);
			localStorage.setItem('recentSuggestions', JSON.stringify(recentSuggestionsArr));
		} else {
			let newArr = recentSuggestionsArr.filter(e => e !== window.location.pathname);
			newArr.unshift(window.location.pathname);
			localStorage.setItem('recentSuggestions', JSON.stringify(newArr));
		}
	}, []);

	return (
		<>
			<Helmet>
				<html lang="en" className="fs-base" />
				<title>Appbase.io Docs - Search stack for Elasticsearch</title>
				<body className={`${bodyClass} flex flex-column whitney f7 fw4 darkgrey readability`} />
			</Helmet>

			{header || <Header dividerStyle={headerDividerStyle} />}

			<main className={mainClass || `bg-whitegrey-l2 pb5 pb10-ns`}>{children}</main>

			<Footer />
		</>
	);
}

DefaultLayout.defaultProps = {
	headerDividerStyle: `shadow`,
	bodyClass: `bg-white`,
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	bodyClass: PropTypes.string,
	mainClass: PropTypes.string,
	header: PropTypes.element,
	headerDividerStyle: PropTypes.oneOf([`hairline`, `shadow`]),
};

export default DefaultLayout;
