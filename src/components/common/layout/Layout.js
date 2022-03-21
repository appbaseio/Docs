import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './Header';
import Footer from './Footer';

// Additional styles
import '../../../styles/app.css';
import '../../../styles/prism.css';

const DefaultLayout = ({ children, bodyClass, mainClass, header, headerDividerStyle }) => (
	<>
		<Helmet>
			<html lang="en" className="fs-base" />
			<title>Reactivesearch.io Docs - Search stack for Elasticsearch</title>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
			<body className={`${bodyClass} flex flex-column f7 fw4 darkgrey readability font-link`}/>
		</Helmet>

		{header || <Header dividerStyle={headerDividerStyle} />}

		<main className={mainClass || `bg-whitegrey-l2 pb5 pb10-ns`}>{children}</main>

		<Footer />
	</>
);

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
