module.exports.createMarkdownPages = async ({ graphql, actions }) => {
	const { createPage, createRedirect } = actions;
	const queryPromises = [];

	queryPromises.push(
		new Promise((resolve, reject) => {
			graphql(allMarkdownPosts()).then(result => {
				if (result.errors) {
					return reject(result.errors);
				}

				return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
					const DocTemplate = path.resolve(`./src/templates/markdown/post.js`);
					const lowerCaseSlug = node.fields.slug.toLowerCase();

					const options = {
						path: lowerCaseSlug,
						component: DocTemplate,
						context: {
							// Data passed to context is available
							// in page queries as GraphQL variables.
							slug: node.fields.slug,
							section: node.fields.section,
						},
					};

					if (node.fields.slug !== lowerCaseSlug) {
						// Create a redirect from the original (potentially mixed case) slug to the lower-case version
						createRedirect({
							fromPath: node.fields.slug,
							toPath: lowerCaseSlug,
							isPermanent: true,
							force: true,  // "force: true" avoids conflict with existing paths
						});
					}

					if (
						node &&
						node.fields &&
						node.fields.slug &&
						node.fields.slug.toLowerCase().startsWith('/docs/reactivesearch/v4')
					) {
						// Create a page with /v4 and one with /react
						createPage({
							...options,
							path: lowerCaseSlug.replace('/v4', '/react'),
						});

						// Redirect from the /v4 version to the /react version
						createRedirect({
							fromPath: lowerCaseSlug,
							toPath: lowerCaseSlug.replace('/v4', '/react'),
							isPermanent: true,
						});
					} else {
						// Create the page with the lower-case slug
						createPage(options);
					}

					return resolve();
				});
			});
		}),
	);

	return Promise.all(queryPromises);
};
