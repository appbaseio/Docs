const createPages = require(`./gatsby/createPages`);
const onCreateNode = require(`./gatsby/onCreateNode`);

exports.createPages = ({ graphql, actions }) =>
	Promise.all([
		createPages.createRedirects({ actions }),
		createPages.createMarkdownPages({ graphql, actions }),
	]);

exports.onCreateNode = async ({ node, getNode, actions }) =>
	await onCreateNode.createMarkdownNodeFields({ node, getNode, actions });


exports .onCreateWebpackConfig = ({
	stage,
	rules,
	loaders,
	plugins,
	actions,
  }) => {
	  actions.setWebpackConfig({
		optimization: {
			splitChunks: {
				name: false,
				chunks: `all`,
				cacheGroups: {
					default: false,
					vendors: false,
					commons: {
					  name: `vendors`,
					  chunks: `all`,
					  // if a chunk is used more than half the components count,
					  // we can assume it's pretty global
					  minChunks: 2,
					},
				}
			}
		}
	  })
  }