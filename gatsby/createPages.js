const path = require(`path`);
const { allMarkdownPosts } = require(`../utils/node-queries`);

exports.createRedirects = ({ createRedirect }) => {
	createRedirect({
		fromPath: `/concepts`,
		isPermanent: true,
		redirectInBrowser: true,
		toPath: `/concepts/introduction/`,
	});
};

exports.createMarkdownPages = async (graphql, { createPage, createRedirect }) => {
	const queryPromises = [];

	queryPromises.push(
		new Promise((resolve, reject) => {
			graphql(allMarkdownPosts()).then(result => {
				if (result.errors) {
					return reject(result.errors);
				}

				result.data.allMarkdownRemark.edges.forEach(({ node }) => {
					const DocTemplate = path.resolve(`./src/templates/markdown/post.js`);
					const lowerCaseSlug = node.fields.slug.toLowerCase();

					const options = {
						path: lowerCaseSlug,
						component: DocTemplate,
						context: {
							slug: node.fields.slug,
							section: node.fields.section,
						},
					};

					if (node.fields.slug !== lowerCaseSlug) {
						createRedirect({
							fromPath: node.fields.slug,
							toPath: lowerCaseSlug,
							isPermanent: true,
							force: true,
						});
					}

					if (
						node &&
						node.fields &&
						node.fields.slug &&
						node.fields.slug.toLowerCase().startsWith('/docs/reactivesearch/v4')
					) {
						createPage({
							...options,
							path: lowerCaseSlug.replace('/v4', '/react'),
						});

						createRedirect({
							fromPath: lowerCaseSlug,
							toPath: lowerCaseSlug.replace('/v4', '/react'),
							isPermanent: true,
						});
					} else {
						createPage(options);
					}

					resolve();
				});
			});
		})
	);

	await Promise.all(queryPromises);
};
