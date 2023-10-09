const matchComponents = url => {
	let breadcrumbText = '';
	if (url.match('/list')) {
		breadcrumbText = ' > List Components';
	} else if (url.match('/range')) {
		breadcrumbText = ' > Range Components';
	} else if (url.match('/search')) {
		breadcrumbText = ' > Search Components';
	} else if (url.match('/result')) {
		breadcrumbText = ' > Result Components';
	} else if (url.match('/map')) {
		breadcrumbText = ' > Map Components';
	} else if (url.match('/overview')) {
		breadcrumbText = ' > Overview';
	}
	return breadcrumbText;
};

// eslint-disable-next-line import/prefer-default-export
export function getBreadcrumbText(url) {
	let breadcrumbText = '';
	try {
		if (url.match('/docs/')) {
			if (url.match('/docs/reactivesearch/')) {
				if (url.match('/react/v3')) {
					breadcrumbText += 'React V3';
					breadcrumbText += matchComponents(url);
				} else if (url.match('/reactivesearch/vue/v1')) {
					breadcrumbText += 'Vue V1';
					breadcrumbText += matchComponents(url);
				} else if (url.match('/react/')) {
					breadcrumbText += 'React';
					breadcrumbText += matchComponents(url);
				} else if (url.match('/vue/')) {
					breadcrumbText += 'Vue';
					breadcrumbText += matchComponents(url);
				}
			} else if (url.match('/docs/ai-search')) {
				breadcrumbText += 'AI Search';
			} else if (url.match('/docs/data')) {
				breadcrumbText += 'Managing Data';
			} else if (url.match('/docs/search/relevancy')) {
				breadcrumbText += 'Search Relevancy';
			} else if (url.match('/docs/speed')) {
				breadcrumbText += 'Speed';
			} else if (url.match('/docs/hosting')) {
				breadcrumbText += 'Hosting';
			} else if (url.match('/docs/security')) {
				breadcrumbText += 'Security';
			} else if (url.match('/docs/search/')) {
				breadcrumbText += 'Search';
			} else if (url.match('/docs/analytics/')) {
				breadcrumbText += 'Analytics';
			} else if (url.match('/docs/pipelines/')) {
				breadcrumbText += 'Pipelines';
			}
		} else if (url.match('https://www.reactivesearch.io/')) {
			breadcrumbText = 'Website';
		} else if (url.match('https://blog.reactivesearch.io')) {
			breadcrumbText = 'Blog';
		}
	} catch {
		console.error('Parsing error: Error forming breadcrumb');
		breadcrumbText = '';
	} finally {
		if (!breadcrumbText) {
			breadcrumbText = 'Reactivesearch';
		}
	}
	return breadcrumbText;
}
