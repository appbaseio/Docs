const { createRedirects, createMarkdownPages } = require(`./gatsby/createPages`);
const onCreateNode = require(`./gatsby/onCreateNode`);
const { parse } = require('./utils/auto-schema');
const parseRSSchema = require('./utils/auto-schema');

exports.onPreBootstrap = ({ reporter }) => {
	reporter.info('generating the schema files for ReactiveSearch API');
	parseRSSchema.parse();
	reporter.info('generating the schema for the Pipelines API');
	parseRSSchema.parsePipeline();
};

exports.createPages = ({ graphql, actions }) => {
	const { createRedirect, createPage } = actions;
	return Promise.all([
		createRedirects({ createRedirect }),
		createMarkdownPages(graphql, { createPage, createRedirect }),
	]);
};

exports.onCreateNode = async ({ node, getNode, actions }) =>
	onCreateNode.createMarkdownNodeFields({ node, getNode, actions });
