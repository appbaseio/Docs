import { SEARCH_COMPONENT_ID } from './constants';

function removeHashFromURL(url) {
	if (url) {
		return url.replace(/#.*$/, '');
	}
	return url;
}

function filterDuplicatesByTitle(array) {
	const uniqueValues = {};
	return array.filter(item => {
		if (!uniqueValues[removeHashFromURL(item._source.url)]) {
			uniqueValues[removeHashFromURL(item._source.url)] = 1;
			return true;
		}
		if (uniqueValues[removeHashFromURL(item._source.url)] < 2) {
			uniqueValues[removeHashFromURL(item._source.url)] += 1;
			return true;
		}
		return false;
	});
}

// eslint-disable-next-line
export async function transformResponse(res, componentId) {
	if (componentId === SEARCH_COMPONENT_ID) {
		const { hits } = res;
		const filteredHits = filterDuplicatesByTitle(hits && hits.hits ? hits.hits : []);
		return {
			...res,
			hits: { hits: filteredHits },
		};
	}
	return res;
}
