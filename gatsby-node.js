const {resolve} = require('path');
const webpack = require('webpack');

exports.modifyWebpackConfig = ({config, stage}) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/));

  config.merge({
    resolve: {
      root: resolve(__dirname, './src'),
      extensions: ['', '.js', '.jsx', '.json'],
    },
  });
  return config;
};

exports.createPages = async ({graphql, boundActionCreators}) => {
  const {createPage, createRedirect} = boundActionCreators;

  // Used to detect and prevent duplicate redirects
  const redirectToSlugMap = {};

  const communityTemplate = resolve('./src/templates/community.js');
  const docsTemplate = resolve('./src/templates/docs.js');
  const tutorialTemplate = resolve('./src/templates/tutorial.js');
  const homeTemplate = resolve('./src/templates/home.js');

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                redirect
                slug
              }
            }
          }
        }
      }
    `,
  );

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);

    throw Error(allMarkdown.errors);
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug;

    if (slug === '/index.html') {
      createPage({
        path: '/',
        component: homeTemplate,
        context: {
          slug,
        },
      });
    } else {
      console.log("slug", slug);
      const createArticlePage = path =>
        createPage({
          path: path,
          component: docsTemplate,
          context: {
            slug,
          },
        });

      // Register primary URL.
      createArticlePage(slug);

      // Register redirects as well if the markdown specifies them.
      if (edge.node.fields.redirect) {
        let redirect = JSON.parse(edge.node.fields.redirect);
        if (!Array.isArray(redirect)) {
          redirect = [redirect];
        }

        redirect.forEach(fromPath => {
          if (redirectToSlugMap[fromPath] != null) {
            console.error(
              `Duplicate redirect detected from "${fromPath}" to:\n` +
                `* ${redirectToSlugMap[fromPath]}\n` +
                `* ${slug}\n`,
            );
            process.exit(1);
          }

          // A leading "/" is required for redirects to work,
          // But multiple leading "/" will break redirects.
          // For more context see github.com/reactjs/reactjs.org/pull/194
          const toPath = slug.startsWith('/') ? slug : `/${slug}`;

          redirectToSlugMap[fromPath] = slug;
          createRedirect({
            fromPath: `/${fromPath}`,
            redirectInBrowser: true,
            toPath,
          });
        });
      }
    }
  });
};

// Add custom fields to MarkdownRemark nodes.
exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  const {createNodeField} = boundActionCreators;

  switch (node.internal.type) {
    case 'MarkdownRemark':
      const {permalink, redirect_from} = node.frontmatter;
      const {relativePath} = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '.html')}`;

        // This should (probably) only happen for the index.md,
        // But let's log it in case it happens for other files also.
        console.warn(
          `Warning: No slug found for "${relativePath}". Falling back to default "${slug}".`,
        );
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });

      // Used to generate a GitHub edit link.
      createNodeField({
        node,
        name: 'path',
        value: relativePath,
      });

      // Used by createPages() above to register redirects.
      createNodeField({
        node,
        name: 'redirect',
        value: redirect_from ? JSON.stringify(redirect_from) : '',
      });
      return;
  }
};

exports.onCreatePage = async ({page, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return new Promise(resolvePromise => {
    // page.matchPath is a special key that's used for matching pages only on the client.
    // Explicitly wire up all error code wildcard matches to redirect to the error code page.
    if (page.path.includes('docs/error-decoder.html')) {
      page.matchPath = 'docs/error-decoder:path?';
      page.context.slug = 'docs/error-decoder.html';

      createPage(page);
    }

    resolvePromise();
  });
};
