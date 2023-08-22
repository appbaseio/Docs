import React from 'react';
import { object } from 'prop-types';
import { navigate } from 'gatsby';

import './DocumentSuggestions.css';
import { URLIcon } from './URLIcon';
import { getBreadcrumbText } from './getBreadcrumbText';

import * as styles from './DocumentSuggestions.module.css';

function sanitizeHTMLAndCombineStrings(inputStrings) {
	// Combine all input strings into a single string
	const combinedString = inputStrings.join(' ');
	// Remove HTML tags using a regular expression
	const withoutTags = combinedString.replace(/<[^>]+>/g, '');

	// Remove multiple consecutive spaces and newlines
	let finalString = withoutTags.replace(/\s{2,}/g, ' ').trim();

	if (finalString && finalString.startsWith('#')) {
		finalString = finalString
			.split('&gt;')
			.slice(1)
			.join('&gt;');
	}
	return finalString;
}

// eslint-disable-next-line
export const DocumentSuggestion = ({ source, docId }) => {
	const breadcrumbText = getBreadcrumbText(source.url);
	const isMobileWidth = window.innerWidth < 500;
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<a
			className={`search__suggestion ${styles.suggestion}`}
			onClick={e => {
				// to stop the search from populating value
				e.stopPropagation();
				navigate(`${source.url}` || '#', { state: { docId } });
			}}
		>
			<div className="row">
				<div className="flex items-center">
					<div className={`me-3 rounded search__suggestionIcon ${styles.suggestionIcon}`}>
						<URLIcon
							url={source.url}
							style={{ marginBottom: 0 }}
							size={isMobileWidth ? 25 : 30}
						/>
					</div>
					<div className="flex-1 w-75">
						<div title={source.value} className={styles.suggestionTitle}>
							{source.title || source.meta_title}
						</div>
						{breadcrumbText && isMobileWidth ? null : (
							<div>
								<span
									title={breadcrumbText}
									className={styles.suggestionBreadcrumb}
								>
									{breadcrumbText}
								</span>
							</div>
						)}
						<div
							title={source.meta_description}
							className={styles.suggestionDescription}
						>
							{source.meta_description ? (
								source.meta_description
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: sanitizeHTMLAndCombineStrings(source.tokens),
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

DocumentSuggestion.defaultProps = {
	source: {},
};

DocumentSuggestion.propTypes = {
	source: object,
};
