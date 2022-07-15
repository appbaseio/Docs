const createPages = require(`./gatsby/createPages`);
const onCreateNode = require(`./gatsby/onCreateNode`);
const parseRSSchema = require(`./utils/auto-schema`);


exports.onPreBootstrap = ({ reporter }) => {
	reporter.info("generating the schema files for ReactiveSearch API");
	parseRSSchema.parse()
  };
  

exports.createPages = ({ graphql, actions }) =>
	Promise.all([
		createPages.createRedirects({ actions }),
		createPages.createMarkdownPages({ graphql, actions }),
	]);

exports.onCreateNode = async ({ node, getNode, actions }) =>
	await onCreateNode.createMarkdownNodeFields({ node, getNode, actions });
