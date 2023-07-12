const { createRedirects, createMarkdownPages } = require(`./gatsby/createPages`);
const onCreateNode = require(`./gatsby/onCreateNode`);
const parseRSSchema = require('./utils/auto-schema');

exports.onPreBootstrap = ({ reporter }) => {
	reporter.info('generating the schema files for ReactiveSearch API');
	parseRSSchema.parse();
	reporter.info('generating the schema for the Pipelines API');
	parseRSSchema.parsePipeline();
};

exports.createPages = ({ graphql, actions }) =>
	Promise.all([createRedirects({ actions }), createMarkdownPages({ graphql, actions })]);

exports.onCreateNode = async ({ node, getNode, actions }) =>
	onCreateNode.createMarkdownNodeFields({ node, getNode, actions });
