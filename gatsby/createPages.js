const path = require(`path`);
const _ = require(`lodash`);
const { allMarkdownPosts } = require(`../utils/node-queries`);

module.exports.createRedirects = ({ actions }) => {
	const { createRedirect } = actions;

	// The /concepts page doesn't exist, we need to redirect to
	// the first post of this section
	createRedirect({
		fromPath: `/concepts`,
		isPermanent: true,
		redirectInBrowser: true,
		toPath: `/concepts/introduction/`,
	});
};

module.exports.createMarkdownPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const queryPromises = [];

	queryPromises.push(
		new Promise((resolve, reject) => {
			graphql(allMarkdownPosts()).then(result => {
				if (result.errors) {
					return reject(result.errors);
				}

				return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
					const DocTemplate = path.resolve(`./src/templates/markdown/post.js`);
					const options = {
						path: node.fields.slug,
						component: DocTemplate,
						context: {
							// Data passed to context is available
							// in page queries as GraphQL variables.
							slug: node.fields.slug,
							section: node.fields.section,
						},
					};

					// Convert URLs accessed at "/reactivesearch/vue/SearchBox" -> "/reactivesearch/vue/searchbox"
					if (
						node &&
						node.fields &&
						node.fields.slug &&
						node.fields.slug.toLowerCase().startsWith('/docs/reactivesearch/v4')
					) {
						// Create a page with /v4 and one with /react
						createPage({
							...options,
							path: node.fields.slug.toLowerCase().replace('/v4', '/react'),
						});
						createPage(options);
					} else if (
						node.fields.slug &&
						node.fields.slug.toLowerCase().startsWith('/docs/reactivesearch')
					) {
						// Create a lower case route for "/docs/reactivesearch/", i.e. Search UI pages
						const optionsForLowerCaseRoute = {
							...options,
							path: node.fields.slug.toLowerCase(),
						};
						createPage(optionsForLowerCaseRoute);
						createPage(options);
					} else {
						createPage(options);
					}
					return resolve();
				});
			});
		}),
	);

	return Promise.all(queryPromises);
};
