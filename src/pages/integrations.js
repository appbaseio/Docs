import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Spirit } from '../styles/spirit-styles';
import { Layout } from '../components/common/layout';
import { APICard } from '../components/api';

const APIPage = () => {
	const sectionStyles = {
		headingContainer: `col-12 col-4-ns mr10-ns`,
		cardContainer: `col-12 col-8-ns mt-vw4 mt0-ns grid-icon-boxes`,
	};

	return (
		<>
			<Layout mainClass="bg-whitegrey-l2" bodyClass="bg-white">
				<section className="bg-api-reference">
					<div className={`${Spirit.page.xl} tc-ns pt-vw6 pt-vw5-ns pb-vw5 white`}>
						<h1 className={`${Spirit.sectionHeading} gh-integration-header-shadow`}>
							APIs and Integrations
						</h1>
						<p className={Spirit.sectionSubHeading}>
							Clients, tools and libraries for working with appbase.io
						</p>
					</div>
				</section>

				<div className={`${Spirit.page.l} pb-vw4 pb-vw3-ns pt-vw4 pt-vw3-ns`}>
					<div className="grid-12 mt-vw4 mt20-ns">
						<div className={sectionStyles.headingContainer}>
							<h2 id="client-libraries" className={`${Spirit.h3} pt20 nt18`}>
								ReactiveSearch
							</h2>
							<p className={`${Spirit.small} midgrey-l2 mt2`}>
								UI components library for ElasticSearch
							</p>
						</div>
						<div className={sectionStyles.cardContainer}>
							<APICard
								to="/docs/reactivesearch/v3/overview/quickstart/"
								img="data:image/png;base64,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"
							>
								React
							</APICard>
							<APICard
								to="/docs/reactivesearch/vue/overview/QuickStart/"
								img="https://vuejs.org/images/logo.png"
							>
								Vue
							</APICard>
							<APICard
								to="/docs/reactivesearch/native/overview/QuickStart/"
								img="data:image/png;base64,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"
							>
								React Native
							</APICard>
						</div>
					</div>

					<div className="grid-12 mt-vw4 mt20-ns">
						<div className={sectionStyles.headingContainer}>
							<h2 id="client-libraries" className={`${Spirit.h3} pt20 nt18`}>
								Searchbox
							</h2>
							<p className={`${Spirit.small} midgrey-l2 mt2`}>
								Lightweight and performance focused searchbox UI component to query
								and display results from your ElasticSearch app (aka index).
							</p>
						</div>
						<div className={sectionStyles.cardContainer}>
							<APICard
								to="/docs/reactivesearch/searchbox/Quickstart/"
								icon="javascript-logo"
							>
								Vanilla
							</APICard>
							<APICard
								to="/docs/reactivesearch/react-searchbox/quickstart/"
								img="data:image/png;base64,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"
							>
								React
							</APICard>
						</div>
					</div>

					<div className="grid-12 mt-vw4 mt20-ns">
						<div className={sectionStyles.headingContainer}>
							<h2 id="client-libraries" className={`${Spirit.h3} pt20 nt18`}>
								Clients
							</h2>
							<p className={`${Spirit.small} midgrey-l2 mt2`}>
								Specific libraries for interacting with the appbase.io API directly
							</p>
						</div>
						<div className={sectionStyles.cardContainer}>
							<APICard to="/api/javascript/quickstart/" icon="javascript-logo">
								JavaScript
							</APICard>
							<APICard to="/api/go/quickstart/" icon="ruby-logo">
								Golang
							</APICard>
							<APICard
								href="https://github.com/appbaseio/appbase-swift"
								icon="apple-logo"
							>
								Swift
							</APICard>
							<APICard
								href="https://github.com/appbaseio/appbase-droid"
								icon="android-logo"
							>
								Android
							</APICard>
							<APICard to="/api/rest/quickstart/" icon="content-api-logo">
								REST API
							</APICard>
						</div>
					</div>

					<div className="grid-12 mt-vw4 mt20-ns">
						<div className={sectionStyles.headingContainer}>
							<h2 id="client-libraries" className={`${Spirit.h3} pt20 nt18`}>
								Interactive Examples
							</h2>
						</div>
						<div className={sectionStyles.cardContainer}>
							<APICard to="/api/examples/js/" icon="javascript-logo">
								JavaScript
							</APICard>
							<APICard to="/api/examples/go/" icon="ruby-logo">
								Golang
							</APICard>
							<APICard to="/api/examples/php/" icon="php-logo">
								PHP
							</APICard>
							<APICard to="/api/examples/python/" icon="python-logo">
								Python
							</APICard>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

APIPage.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			siteMetadata: PropTypes.shape({
				siteUrl: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
};

export default APIPage;

export const pageQuery = graphql`
	query {
		site {
			...SiteMetaFields
		}
	}
`;
