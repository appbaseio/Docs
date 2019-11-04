import React from 'react';
import { Link } from 'gatsby';

const ShowcaseComponent = ({ title, link, children }) => (
	<div className="showcase-component">
		<div className="showcase-title">
			<span>{title}</span>

			<Link className="link" to={link}>
				Go to Docs
			</Link>
		</div>
		{children}
	</div>
);

export default ShowcaseComponent;
