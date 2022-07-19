import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Button } from '@appbaseio/designkit';

const Tutorial = () => {
	return (
		<>
			<Helmet>
				<html lang="en" className="fs-base" />
				<title>Appbase.io Docs - Interactive tutorial to build a search app in under a minute</title>
                <meta name="description" content="Follow this interactive tutorial to learn how to build a SaaS, E-Commerce and Geo search app in under a minute. Import data, configure search, facets and export code." />
				<body />
			</Helmet>
			<div>
				<div style={{ position: 'absolute', right: 30, top: 30, textDecoration: 'none' }}>
					<Link to="/">
						<Button style={{ backgroundColor: '#e4faff' }}>
							◀ Back to docs
							{/* <LeftOutlined style={{ marginRight: 10 }} /> Back to docs */}
						</Button>
					</Link>
				</div>
				<iframe
					title="Interactive Tutorial"
					src="https://dashboard-tutorial.netlify.app/"
					frameBorder="0"
					width="100%"
					height="100vh"
					style={{
						height: '100vh',
					}}
				/>
			</div>
		</>
	);
};

export default Tutorial;
