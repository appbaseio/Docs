import React from 'react';

import { object } from 'prop-types';

import { BsClock, BsLightningCharge } from 'react-icons/bs';

export const Suggestion = ({ suggestion }) => {
	let type = suggestion._suggestion_type || 'normal';
	let Icon;
	if (type === 'recent') {
		Icon = BsClock;
	} else if (type === 'popular') {
		Icon = BsLightningCharge;
	}
	return (
		<div className="d-flex justify-content-center align-items-center">
			{Icon ? <Icon className="me-2" /> : null}
			<span>{suggestion.label}</span>
		</div>
	);
};

Suggestion.propTypes = {
	suggestion: object,
};
