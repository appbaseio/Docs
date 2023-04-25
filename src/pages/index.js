import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { graphql, navigate } from 'gatsby';
import loadable from '@loadable/component'
import PropTypes from 'prop-types';
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
		title: "Reactivesearch.io Docs - Build powerful search apps powered by Elasticsearch",
		description: "Docs home page"
	}

	if (typeof window !== 'undefined' && !localStorage.getItem('recentSuggestions'))
		localStorage.setItem('recentSuggestions', JSON.stringify([]));


	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="title" content="Reactivesearch.io Docs - Home Page" />
				<meta name="description" content="Reactivesearch.io Docs Reference - Search APIs and UI components for React, Vue, React Native, Flutter, JavaScript - powered by Elasticsearch." />
				<link rel="canonical" href="https://docs.reactivesearch.io" />
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
							Reactivesearch.io features organized by guides and chapters
						</p>
						<div className="mt5 timeline-steps">
							<TimelineOption
								onClick={info => navigate(info.link)}
								primaryColor="#3eb0ef"
								theme={themeType}
								items={{
									'1': {
										title: 'Getting Started',
										subtitle: 'Overview and Quickstart with reactivesearch.io',
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
													'Overview and Quickstart with reactivesearch.io',
												link: '/docs/gettingstarted/quickstart/',
												duration: 3,
											}
										],
									},
									'2': {
										title: 'Managing Data',
										subtitle:
											"Reactivesearch's data schema, data browser and how to import data to Elasticsearch.",
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
													'Take a look at the data model of reactivesearch.io',
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
													'/docs/reactivesearch/react/overview/quickstart/',
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
									'4': {
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
									'5': {
										title: 'AI Search',
										subtitle: 'Use AI to supercharge search with one-to-one interaction, vector search with the power of ChatGPT',
										icon: (
											<Icon
												name="ai"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: "AI Answer",
												link: "/docs/ai/ai-answer/",
												description: "Learn how to use AI Answer to support 1-1 interaction with users and keep the user in the loop",
												duration: 4,
											},
											{
												title: "kNN",
												link: "/docs/ai/knn/",
												description: "Learn how to index vectors and use them for vector searching",
												duration: 4,
											},
											{
												title: "Metadata Enrichment",
												link: "/docs/ai/metadata/",
												description: "Learn how to enrich metadata for already existing data to improve search reliability",
												duration: 3,
											},
										],
									},
									'6': {
										title: 'ReactiveSearch Pipelines',
										subtitle: 'Configure search and indexing routes, and author data processing stages with JavaScript',
										icon: (
											<Icon
												name="pipeline"
												className="dropdown-content-icon"
											/>
										),
										chapters: [
											{
												title: "ReactiveSearch Pipelines: Concepts",
												link: "/docs/pipelines/concepts/",
												description: "Learn about core concepts of ReactiveSearch pipelines and how to use them",
												duration: 12,
											},
											{
												title: 'How to guides',
												link: '/docs/pipelines/how-to/',
												description: 'See actionable guides for building search with ReactiveSearch pipelines',
												duration: 1,
											},
											{
												title: "Developing/Debugging Pipelines",
												link: "/docs/pipelines/developing/",
												description: "Learn how to develop and debug pipelines before deploying them",
												duration: 12
											},
											{
												title: "Pipeline Integrations",
												link: "/docs/pipelines/integrations/open-ai",
												description: "Learn about integrations that work with pipelines",
												duration: 10,
											},
										]
									},
									'7': {
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
												description: 'Quick overview of reactivesearch.io analytics'
											},
											{
												title: 'Implement Analytics',
												link: '/docs/analytics/implement/',
												duration: 9,
												description: 'Learn how to implement reactivesearch.io analytics for your stack'
											},
											{
												title: 'Querying Analytics',
												link: '/docs/analytics/querying-analytics/',
												duration: 1,
												description: 'Learn how to query reactivesearch.io analytics via REST APIs'
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
									'8': {
										title: 'Speed',
										subtitle: 'Blazing ⚡️ fast search performance',
										icon: <Icon name="zap" className="dropdown-content-icon" />,
										chapters: [
											{
												title: 'Cache Management',
												link: '/docs/speed/cache-management/',
												duration: 3,
												description:
													'Blazing ⚡️ fast search performance with reactivesearch.io cache',
											},
										],
									},
									'9': {
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
												description: 'Add teammates with scoped access to reactivesearch.io dashboard'
											},
											{
												title: 'Role Based Access',
												link: '/docs/security/role/',
												duration: 6,
												description: 'Build secure and access controled search experiences with RBAC using JWTs'
											},
										],
									},
									'10': {
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
													'Deploy Elasticsearch with reactivesearch.io for all your app search needs',
											},
											{
												title: 'Bring your own Cluster',
												link: '/docs/hosting/byoc/',
												duration: 11,
												description:
													'Deploy reactivesearch.io with your own Elasticsearch cluster hosted anywhere',
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
								to="/docs/reactivesearch/react/overview/quickstart/"
								className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc"
								elevation="2"
								radius="4"
							>
								<img
									className="w10 mb1"
									src="/images/react.png"
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
									src="/images/react.png"
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
								<img
									className="w10 mb1"
									src="/images/rest-api.png"
									alt="React Native"
									style={{ width: 90 }}
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
							Resources to get help with reactivesearch.io
						</p>
						<Grid
							size={3}
							lgSize={3}
							smSize={1}
							gutter="20px"
							lgGutter="12px"
							smGutter="0px"
							className="mt5 font-classes"
						>
							<Card href="https://medium.appbase.io/tagged/appbase" theme={themeType}>
								<img src={`${imagePrefix}/Tutorials.svg`} alt="Tutorials" width="120px" height="120px" />
								<h3>Tutorials</h3>
								<p>Go from scratch to a full app with these tutorial guides</p>
							</Card>
							<Card href="https://www.reactivesearch.io/contact/" theme={themeType}>
								<img src={`${imagePrefix}/Support.png`} alt="Support" width="120px" height="120px" />
								<h3>Support</h3>
								<p>
									Get dedicated support from our engineering team
								</p>
							</Card>
							<Card href="https://github.com/appbaseio/reactivesearch/discussions" theme={themeType}>
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
