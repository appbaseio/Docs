import { SEARCH_COMPONENT_ID } from './constants';

/*
 * Assumptions:
 * 1. uses index `unified_reactivesearch`
 * 2. Wants to filter only for documentation
 */

// eslint-disable-next-line import/prefer-default-export
export const transformRequest = req => {
	const body = JSON.parse(req.body);

	body.query = body.query.map(componentQuery => {
		// handle when no search value is there. The component is making a suggestion query
		if (componentQuery.id === SEARCH_COMPONENT_ID) {
			return {
				...componentQuery,
				react: {
					and: ['term'],
				},
			};
		}
		return componentQuery;
	});
	if (body.query) {
		body.query.push({
			id: 'term',
			type: 'term',
			execute: false,
			dataField: ['source.keyword'],
			value: 'docs',
		});
	}
	const newReq = { ...req, body: JSON.stringify(body) };
	return newReq;
};
