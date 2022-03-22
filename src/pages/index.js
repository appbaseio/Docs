import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { graphql, navigate } from 'gatsby';
import loadable from '@loadable/component'
import PropTypes from 'prop-types';
// import TimelineOption from '@appbaseio/designkit/lib/molecules/TimelineOption';
// import Grid from '@appbaseio/designkit/lib/atoms/Grid';
// import Card from '@appbaseio/designkit/lib/atoms/Card';
import { Icon, Box } from '../components/common';
import { Layout } from '../components/common/layout';
import { HomeHeader } from '../components/home';
import { Spirit } from '../styles/spirit-styles';
import { StaticImage } from "gatsby-plugin-image"

const TimelineOption = loadable(() => import('@appbaseio/designkit/lib/molecules/TimelineOption'));
const Grid = loadable(() => import('@appbaseio/designkit/lib/atoms/Grid'));
const Card = loadable(() => import('@appbaseio/designkit/lib/atoms/Card'));
const imagePrefix = 'https://opensource.appbase.io/reactivesearch/images/support';

const HomePage = ({ data, location }) => {
	const [themeType, setThemeType] = useState(typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light');

	// Add meta title and description for this page here to overwrite the site meta data as set in the config
	data.site.siteMetadata = {
		title: "Appbase.io Docs - Build powerful search apps powered by Elasticsearch",
		description: "Docs home page"
	}
// testing
	if(typeof window !== 'undefined' && !localStorage.getItem('recentSuggestions'))
		localStorage.setItem('recentSuggestions', JSON.stringify([]));

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="title" content="Appbase.io Docs - Home Page" />
				<meta name="description" content="Appbase.io Docs Reference - Search APIs and UI components for React, Vue, React Native, Flutter, JavaScript - powered by Elasticsearch." />
				<link rel="canonical" href="https://docs.appbase.io" />
			</Helmet>
			<Layout
				headerDividerStyle="shadow"
				bodyClass="bg-white"
				mainClass="bg-whitegrey-l2 pb-vw6 pb-vw3-ns"
				header={
					<HomeHeader 
						setThemeType={(val) => setThemeType(val)}
						themeType={themeType}
					/>
				}
			>
				<div className="pt-vw3 ">
					<div className={`${Spirit.page.xl} col-12 home-section`}>
						<span className={`${Spirit.h3} fw6 link home-title`}>Guides</span>
						<p
							className={`${Spirit.h4} mt2 flex flex-column flex-row-ns justify-between items-center-ns`}
						>
							Appbase.io features organized by guides and chapters
						</p>
						<div className="mt5 timeline-steps">
							<TimelineOption
								onClick={info => navigate(info.link)}
								primaryColor="#3eb0ef"
								theme={themeType}
								items={{
									'1': {
										title: 'Getting Started',
										subtitle: 'Overview and Quickstart with appbase.io',
										icon: (
											<Icon
												name="gettingStarted"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: 'Overview',
												description:
													'Overview and Quickstart with appbase.io',
												link: '/docs/gettingstarted/quickstart/',
												duration: 3,
											}
										],
									},
									'2': {
										title: 'Managing Data',
										subtitle:
											"Appbase's data schema, data browser and how to import data to Elasticsearch.",
										icon: (
											<Icon
												name="importData"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: 'Data Model',
												description:
													'Take a look at the data model of appbase.io',
												link: '/docs/data/model/',
												duration: 2,
											},
											{
												title: 'Data Browser',
												description:
													'Data Browser is a WYSIWYG GUI for adding, modifying and viewing your search data.',
												link: '/docs/data/browser/',
												duration: 4,
											},
											{
												title: 'Importing Data',
												description:
													'Import through GUI and command line sources such as Dashboard, ABC CLI, Rest APIs, and Zapier.',
												link: '/docs/data/import/',
												duration: 9,
											},
											{
												title: 'Search Preview',
												description: 'Visually create, update and manage results for your Search.',
												link: '/docs/data/search-preview/',
												duration: 3,
										   },
											{
											 	title: 'Stored Queries',
											 	description: 'Use stored queries to prevent script injections',
											 	link: '/docs/data/stored-queries/',
											 	duration: 4,
											},
										],
									},
									'3': {
										title: 'Search Relevancy',
										subtitle:
											'Visually create, update and manage results for your Search.',
										icon: (
											<Icon
												name="searchRelevancy"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: 'Search Relevancy',
												description: 'Controls for search relevancy.',
												link: '/docs/search/relevancy/',
												duration: 16,
											},
											{
												title: 'ReactiveSearch API',
												description:
													'A declarative API based on ReactiveSearch library to query Elasticsearch securely by protecting against security concerns around query injection.',
												link: '/docs/search/reactivesearch-api/',
												duration: 10,
											},
											{
												title: 'Query Rules',
												description:
													'Query Rules are If-This-Then-That kind of rules that can be tailored to your business use-case.',
												link: '/docs/search/rules/',
												duration: 7,
											},
											{
												title: 'ReactiveSearch Scripts',
												description:
													'User defined JavaScript functions to tailor search relevance, transform indexing documents or apply security trimming',
												link: '/docs/search/scripts/',
												duration: 10,
											},
										],
									},
									'4': {
										title: 'Building Search UI',
										subtitle: 'UI Components for making your Search Experience',
										icon: (
											<Icon
												name="buildingUI"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: 'Choose your UI Library',
												link: '/docs/reactivesearch/gettingstarted',
												description: 'Choose from NoCode, React, Vue, React Native, Flutter, Vanilla JavaScript',
												duration: 1,
											},
											{
												title: 'UI Customization',
												link: '/docs/reactivesearch/ui-customization',
												description: 'Customization guide for UI libraries',
												duration: 3,
											},
											{
												title: 'ReactiveSearch QuickStart',
												link:
													'/docs/reactivesearch/v3/overview/quickstart/',
													description: 'Get started with the React version of ReactiveSearch',
												duration: 6,
											},
											{
												title: 'Vue ReactiveSearch QuickStart',
												link:
													'/docs/reactivesearch/vue/overview/QuickStart/',
													description: 'Get started with the Vue version of ReactiveSearch',
												duration: 8,
											},
											{
												title: 'Searchbox Native QuickStart',
												description: '',
												link:
													'/docs/reactivesearch/react-native-searchbox/quickstart/',
													description: 'Get started with the React Native version of Searchbox, a lightweight alternative to ReactiveSearch',
												duration: 6,
											},
											{
												title: 'Flutter Searchbox QuickStart',
												description: '',
												link:
													'/docs/reactivesearch/flutter-searchbox/quickstart/',
													description: 'Get started with the Flutter version of Searchbox, a lightweight alternative to ReactiveSearch',
												duration: 6,
											},
											{
												title: 'No-code Search UI Builder',
												description: '',
												link:
													'/docs/reactivesearch/ui-builder/search/',
													description: 'Get started with the no-code UI builder for site search, e-commerce search, geo search and recommendations',
												duration: 6,
											},
										],
									},
									'5': {
										title: 'Actionable Analytics',
										subtitle:
											'Analytics offers actionable insights into how your search is performing.',
										icon: (
											<Icon
												name="analytics"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: 'Analytics',
												link: '/docs/analytics/overview/',
												duration: 5,
												description: 'Quick overview of appbase.io analytics'
											},
											{
												title: 'Implement Analytics',
												link: '/docs/analytics/implement/',
												duration: 9,
												description: 'Learn how to implement appbase.io analytics for your stack'
											},
											{
												title: 'Querying Analytics',
												link: '/docs/analytics/querying-analytics/',
												duration: 1,
												description: 'Learn how to query appbase.io analytics via REST APIs'
											},
											{
												title: 'Suggestions',
												link: '/docs/analytics/popular-recent-suggestions/',
												duration: 4,
												description: 'Leverage popular, recent suggestions via APIs and UI components'
											},
											{
												title: 'Analytics Insights',
												link: '/docs/analytics/insights/',
												duration: 2,
												description: 'Get actionable insights to improve your search KPIs'
											},
										],
									},
									'6': {
										title: 'Speed',
										subtitle: 'Blazing ⚡️ fast search performance',
										icon: <Icon name="zap" className="dropdown-content-icon" />,
										chapters: [
											{
												title: 'Cache Management',
												link: '/docs/speed/cache-management/',
												duration: 3,
												description:
													'Blazing ⚡️ fast search performance with appbase.io cache',
											},
										],
									},
									'7': {
										title: 'Access Control',
										subtitle: 'Out-of-the-box access control for search',
										icon: (
											<Icon
												name="security"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: 'API Credentials',
												link: '/docs/security/credentials/',
												duration: 6,
												description: 'Build access controled search experiences with API credentials'
											},
											{
												title: 'User Management',
												link: '/docs/security/user-management/',
												duration: 2,
												description: 'Add teammates with scoped access to appbase.io dashboard'
											},
											{
												title: 'Role Based Access',
												link: '/docs/security/role/',
												duration: 6,
												description: 'Build secure and access controled search experiences with RBAC using JWTs'
											},
										],
									},
									'8': {
										title: 'Hosting',
										icon: (
											<Icon name="rocket" className="dropdown-content-icon" />
										),
										chapters: [
											{
												title: 'Clusters',
												link: '/docs/hosting/clusters/',
												duration: 3,
												description:
													'Deploy Elasticsearch with appbase.io for all your app search needs',
											},
											{
												title: 'Bring your own Cluster',
												link: '/docs/hosting/byoc/',
												duration: 11,
												description:
													'Deploy appbase.io with your own Elasticsearch cluster hosted anywhere',
											},
											{
												title: 'Deploy OpenSearch',
												link: '/docs/hosting/opensearch/',
												duration: 1,
												description:
													'Deploy OpenSearch with appbase for all your app search needs',
											},
										],
									},
								}}
							/>
						</div>
					</div>

					<section
						className={`${Spirit.page.xl} col-12 mt8 pt5 home-section integration-home`}
					>
						<h3 className={`${Spirit.h3} fw6 link home-title`}>
							Integrations
						</h3>
						<p
							className={`${Spirit.h4} mt2 flex flex-column flex-row-ns justify-between items-center-ns`}
						>
							Getting started guides for your favorite libraries and frameworks
						</p>
						<div className="grid-integrations-index mt4 mt6-l f8">
							<Box
								to="/docs/reactivesearch/v3/overview/quickstart/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<img
									className="w10 mb1"
									src="data:image/png;base64,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"
									alt="React"									
									width={40}
									height={40}
								/>								
								React
							</Box>
							<Box
								to="/docs/reactivesearch/vue/overview/QuickStart/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<StaticImage
									className="w10 mb1"
									src="https://vuejs.org/images/logo.png"
									alt="Vue"									
									width={40}
									height={40}
								/>								
								Vue
							</Box>
							<Box
								to="/docs/reactivesearch/react-native-searchbox/quickstart/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<img
									className="w10 mb1"
									src="data:image/png;base64,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"
									alt="React Native"									
									width={40}
									height={40}
								/>								
								React Native
							</Box>
							<Box
								to="/api/javascript/quickstart/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<StaticImage
									className="w10 mb1"
									src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
									alt="Javascript"									
									width={40}
									height={40}
								/>									
								Javascript
							</Box>
							<Box
								href="https://github.com/appbaseio/appbase-droid"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<Icon name="android-logo" className="w10 mb1" />
								Android
							</Box>
							<Box
								to="/api/rest/overview/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<StaticImage
									className="w10 mb1"
									src="https://miro.medium.com/max/790/1*uHzooF1EtgcKn9_XiSST4w.png"
									alt="REST API"									
									width={40}
									height={40}
								/>								
								REST API
							</Box>
							<Box
								href="https://github.com/appbaseio/appbase-swift"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<img
									className="w10 mb1"
									src="/images/swift-logo.webp"
									alt="Swift" 									
									width={40}
									height={40}
								/>									
								Swift
							</Box>
							<Box
								to="/integrations/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn"
								elevation="2"
								radius="4"
							>
								<Icon name="more" className="w8 nudge-top--6" />
								View All Integrations
							</Box>
						</div>
					</section>
					<section className={`${Spirit.page.xl} col-12 mt10 pt8 home-section`}>
						<h3 className={`${Spirit.h3} fw6 link home-title`}>Need Help?</h3>
						<p
							className={`${Spirit.h4} mt2 flex flex-column flex-row-ns justify-between items-center-ns`}
						>
							Resources to get help with appbase.io
						</p>
						<Grid
							size={3}
							lgSize={3}
							smSize={1}
							gutter="20px"
							lgGutter="12px"
							smGutter="0px"
							className="mt5"
						>
							<Card href="https://medium.appbase.io/tagged/appbase">
								<img src={`${imagePrefix}/Tutorials.svg`} alt="Tutorials" width="120px" height="120px" />
								<h3>Tutorials</h3>
								<p>Go from scratch to a full app with these tutorial guides</p>
							</Card>
							<Card href="https://www.appbase.io/contact/">
								<img src={`${imagePrefix}/Support.png`} alt="Support" width="120px" height="120px" />
								<h3>Support</h3>
								<p>
									Get dedicated support from our engineering team
								</p>
							</Card>
							<Card href="https://github.com/appbaseio/reactivesearch/discussions">
								<img src={`${imagePrefix}/Gitter.svg`} alt="Gitter" width="120px" height="120px" />
								<h3>Community</h3>
								<p>Ask other ReactiveSearch users</p>
								<div className="community-icons pr-3 pl-3">
									<a
										href="https://github.com/appbaseio"
										target="_blank"
										title="Github"
										rel="noopener noreferrer"
									>
										<Icon name="github-outline" />
									</a>
									<a
										href="https://stackoverflow.com/questions/tagged/reactivesearch"
										target="_blank"
										title="StackOverflow"
										rel="noopener noreferrer"
									>
										<Icon name="stackoverflow" />
									</a>
									<a
										href="https://github.com/appbaseio/reactivesearch/discussions"
										target="_blank"
										title="Github Discussions"
										rel="noopener noreferrer"
									>
										<Icon name="chat-double-bubble" />
									</a>
								</div>
							</Card>
						</Grid>
					</section>
				</div>
			</Layout>
		</>
	);
};

HomePage.propTypes = {
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

export default HomePage;

export const pageQuery = graphql`
	query {
		site {
			...SiteMetaFields
		}
	}
`;
