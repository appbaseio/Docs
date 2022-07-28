import React from 'react';
import { AppFooter } from '@appbaseio/designkit';

const Footer = () => (
	<div className="footer">
		<AppFooter
			linksConfig={[
				{
					title: 'Product',
					list: [
						{
							title: 'Relevant Search',
							openWithTab: true,
							href: 'https://reactivesearch.io/product/search',
						},
						{
							title: 'Actionable Analytics',
							openWithTab: true,
							href: 'https://reactivesearch.io/product/analytics',
						},
						{
							title: 'Access Control',
							openWithTab: true,
							href: 'https://reactivesearch.io/product/access-control',
						},
						{
							title: 'Search UI',
							openWithTab: true,
							href: 'https://reactivesearch.io/product/search-ui/',
						},

					],
				},
				{
					title: 'Integrations',
					list: [
						{
							title: 'AWS Elasticsearch',
							openWithTab: true,
							href: 'https://reactivesearch.io/solutions/aws-elasticsearch',
						},
						{
							title: 'Heroku',
							openWithTab: true,
							href: 'https://reactivesearch.io/solutions/heroku-elasticsearch',
						},
						{
							title: 'Docker',
							openWithTab: true,
							href: 'https://reactivesearch.io/solutions/elasticsearch-with-docker',
						},
						{
							title: 'Kubernetes',
							openWithTab: true,
							href: 'https://reactivesearch.io/solutions/elasticsearch-with-kubernetes',
						},
					],
				},
				{
					title: 'Use Cases',
					list: [
						{
							title: 'E-Commerce',
							openWithTab: true,
							href: 'https://reactivesearch.io/solutions/ecommerce-search',
						},
						{
							title: 'SaaS Search',
							openWithTab: true,
							href: 'https://reactivesearch.io/solutions/saas-search/',
						},
						{
							title: 'Geo Apps',
							openWithTab: true,
							href: 'https://reactivesearch.io/usecases/geo-apps',
						},
						{
							title: 'Mobile Search',
							openWithTab: true,
							href: 'https://reactivesearch.io/usecases/mobile-search/',
						},
						{
							title: 'Realtime Search',
							openWithTab: true,
							href: 'https://reactivesearch.io/usecases/realtime-search',
						},

					],
				},
				{
					title: 'Company',
					list: [
						{
							title: 'Terms of Service',
							openWithTab: true,
							href: 'https://reactivesearch.io/tos',
						},
						{
							title: 'Privacy Policy',
							openWithTab: true,
							href: 'https://reactivesearch.io/privacy',
						},
						{
							title: 'Cookies Policy',
							openWithTab: true,
							href: 'https://reactivesearch.io/cookie',
						},
					],
				},
			]}
		/>
	</div>
);

export default Footer;
