import React from 'react';
import PropTypes from 'prop-types';
import tocbot from 'tocbot';

class TOC extends React.Component {
	componentDidMount() {
		const offset = 80;
		tocbot.init({
			// Where to render the table of contents.
			tocSelector: `.toc-list-container`,
			// Where to grab the headings to build the table of contents.
			contentSelector: `.post-content`,
			// Which headings to grab inside of the contentSelector element.
			headingSelector: `h2, h3`,
			headingsOffset: offset,
			scrollSmoothOffset: -1 * offset,
		});
	}

	render() {
		const { className, listClasses } = this.props;
		return (
			<nav className={`${className}`} data-cy="toc">
				<div className={`toc-list-container ${listClasses}`} />
			</nav>
		);
	}
}

TOC.propTypes = {
	headingsOffset: PropTypes.string,
	className: PropTypes.string,
	listClasses: PropTypes.string,
};

export default TOC;
