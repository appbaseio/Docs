import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import searchIndexData from '../../../data/search.index.json';
import Header from './Header';
import Footer from './Footer';

// Additional styles
import '../../../styles/app.css';
import '../../../styles/prism.css';

const DefaultLayout = ({ children, bodyClass, mainClass, header, headerDividerStyle }) => {
	useEffect(() => {
		console.log();
		const recentSuggestionsArr = JSON.parse(localStorage.getItem('recentSuggestions') || '[]');
		if(window.location.pathname !== '/') {
			let obj = recentSuggestionsArr.find(o => o.url === window.location.pathname);
			if(!obj) {
				if(recentSuggestionsArr.length && recentSuggestionsArr.length >= 5)
					recentSuggestionsArr.pop();
				let newVal = searchIndexData.find(o => o.url === window.location.pathname);
				if(newVal) {
					recentSuggestionsArr.unshift(newVal);
					localStorage.setItem('recentSuggestions', JSON.stringify(recentSuggestionsArr));
				}							
			} else {
				let newVal = searchIndexData.find(o => o.url === window.location.pathname);
				if(newVal) {
					let newArr = recentSuggestionsArr.filter(o => o.url !== window.location.pathname);
					newArr.unshift(newVal);
					localStorage.setItem('recentSuggestions', JSON.stringify(newArr));
				}				
			}
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
