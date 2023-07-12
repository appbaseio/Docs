import React, { useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import { Spirit } from '../styles/spirit-styles';
import { Layout } from '../components/common/layout';
import { Icon } from '../components/common';

const NotFoundPage = () => {
	return (
		<Layout headerDividerStyle="shadow">
			<div className={`${Spirit.page.m} pt-vw5 pb-vw5 flex flex-column items-center`}>
				<Icon name="four-o-four-icon" className="w15 h-auto stroke-lightgrey" />
				<h1 className={Spirit.h1}>404</h1>
				<p className={`${Spirit.p} midgrey`}>
					"404 Error: It looks like this page has been set to &#39;undefined&#39;.
					<br />
					Maybe it was removed because we didn&#39;t &#39;use strict&#39;;
					<br />
					In the meantime, let&#39;s get you back to somewhere more familiar."
				</p>
				<div className="flex mt5">
					<Link to="/" className="pa2 dib blue hover-darkgrey link br b--whitegrey">
						Docs Home 🏡
					</Link>
					<a
						href="https://reactivesearch.io"
						className="pa2 dib blue hover-darkgrey link"
					>
						Reactivesearch.io Website
					</a>
				</div>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
