import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const SidebarLink = ({ link, title, linkClasses }) => {
	if (link) {
		console.log('link: ', link, 'title: ', title);
		if (link.match(/^\s?http(s?)/gi)) {
			// use anchor links for external links
			return (
				<a
					href={link}
					className={`link db pv6px pr2 lh-1-5 pl0 ${linkClasses}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{title}
				</a>
			);
		}
		return (
			<Link to={link} className={`link db pv6px pr2 lh-1-5 pl0 ${linkClasses}`}>
				{title}
			</Link>
		);
	}
	return <>{title}</>;
};

SidebarLink.propTypes = {
	link: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	linkClasses: PropTypes.string.isRequired,
};

export default SidebarLink;
