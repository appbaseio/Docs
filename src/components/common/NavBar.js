import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ThemeSwitch from './themeSwitch';
import Button from '@appbaseio/designkit/lib/atoms/Button';
import { Spirit } from '../../styles/spirit-styles';
import Logo from './ReactivesearchLogo';
import DropdownLink from './DropdownLink';
import Icon from './Icon';
import Search from './search/HomeSearch';
import MobileNav from './MobileNav';
import AnnouncementBanner from '../AnnouncementBanner';

const NavBar = ({ theme, setThemeType, themeType }) => {
	// Theme definitions
	const themeClasses = {
		dark: {
			menuItem: ` link hover-blue nowrap`,
			logoTheme: `light`,
			docsTitleClass: `blue`,
			searchBox: `bg-darkgrey-searchbar middarkgrey dark-placeholder`,
			icon: `fill-midlightgrey`,
		},
		light: {
			menuItem: Spirit.link.white,
			logoTheme: `dark`,
			docsTitleClass: `white`,
			searchBox: `bg-white-10 white white-placeholder`,
			icon: `fill-white`,
		},
	};

	const [mockWindow, setMockWindow] = useState();
	const [showBanner, setShowBanner] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('announcementBanner') === 'true' : false,
	);

	if (typeof window !== 'undefined' && localStorage.getItem('announcementBanner') === null) {
		localStorage.setItem('announcementBanner', 'true');
		setShowBanner(true);
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMockWindow(window);
		}
	}, []);

	useEffect(() => {
		if(mockWindow)
			setThemeType(localStorage.getItem('theme'));
	}, [mockWindow])

	return (
		<div>
			<AnnouncementBanner showBanner={showBanner}  setShowBanner={setShowBanner}/>
			<nav className="shadow-3 on-white">
				<div
					className={`${Spirit.page.xl} flex flex-auto flex-nowrap items-center justify-between pt2 pb2`}
					style={{ height: 75 }}
					data-cy="header-navigation"
				>
					<div className="flex items-center pt3 pb3 nudge-bottom--2 w-sidebar-l pr8 nav-logo">
						<Link to="/" className="nudge-top--3">
							<Logo theme={themeType} />
						</Link>
					</div>
					{/* navbar-container wrapper element and bottom padding is needed to hide the horizontal scrollbar on smaller screensizes */}
					<div className="navbar-container">
						<div className="dn flex-ns flex-auto items-center overflow-x-auto mr12 mr0-l ml5 ml0-l pb20">
							<DropdownLink>
								<DropdownLink.Item>
									{value => (
										<React.Fragment>
											<span
												className={`${
													themeClasses[theme].menuItem
												} nowrap f8 pa3 mr1 mr3-l nl3 ${
													value.selectedKey === 'guides'
														? 'fw6'
														: 'fw3'
												} cursor-pointer`}
												onMouseEnter={() => {
													value.handleKey('guides');
												}}
											>
												Guides
											</span>

											{value.selectedKey === 'guides' ? (
												<div
													className="dropdown-content"
													style={{
														background:
															typeof window !== 'undefined'
																? localStorage.getItem(
																		'theme',
																	) === 'dark'
																	? '#082429'
																	: 'white'
																: 'white',
														top: showBanner
															? '105px'
															: '75px',
													}}
													onMouseLeave={() => value.handleKey(null)}
												>
													<div
														className={`${Spirit.page.xl} pt2 pb2 grid-dropdown grid-dropdown-4`}
													>
														<div>
															<h2 className="f2 lh-h5 lh-h4-l fw6 ma0 pa0  mt0 mt2-ns">
																Guides
															</h2>
															<p className="f5 lh-h5 lh-h4-l fw4 ma0 pa0 mt0 mt2-ns mb2">
																Step wise guide from making your
																search app to securing it.
															</p>
														</div>
														<div>
															{/* <h2 className="f3 lh-h5 lh-h4-l fw6 ma0 pa0  mt0 mt2-ns middarkgrey mb2">
														Clients
													</h2> */}
															<Link
																to="/docs/gettingstarted/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="gettingStarted"
																	className="dropdown-content-icon mr2"
																/>
																Getting Started
															</Link>
															<Link
																to="/docs/data/model/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="importData"
																	className="dropdown-content-icon mr2"
																/>
																Managing Data
															</Link>
															<Link
																to="/docs/hosting/clusters/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="rocket"
																	className="dropdown-content-icon mr2"
																/>
																Hosting
															</Link>
														</div>
														<div>
															<Link
																to="/docs/search/relevancy/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="searchRelevancy"
																	className="dropdown-content-icon mr2"
																/>
																Search Relevancy
															</Link>
															<Link
																to="/docs/reactivesearch/v3/overview/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="buildingUI"
																	className="dropdown-content-icon mr2"
																/>
																Building Search UI
															</Link>
															<Link
																to="/docs/speed/cache-management/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="zap"
																	className="dropdown-content-icon mr2"
																/>
																Speed
															</Link>
														</div>
														<div>
															<Link
																to="/docs/analytics/overview/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="analytics"
																	className="dropdown-content-icon mr2"
																/>
																Actionable Analytics
															</Link>
															<Link
																to="/docs/security/credentials/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="security"
																	className="dropdown-content-icon mr2"
																/>
																Access Control
															</Link>
														</div>
													</div>
												</div>
											) : null}
										</React.Fragment>
									)}
								</DropdownLink.Item>
								<DropdownLink.Item>
									{value => (
										<React.Fragment>
											<span
												className={`${
													themeClasses[theme].menuItem
												} nowrap f8 pa3 mr1 mr3-l nl3 cursor-pointer ${
													value.selectedKey === 'api' ? 'fw6' : 'fw3'
												}`}
												onMouseEnter={() => {
													value.handleKey('api');
												}}
											>
												APIs and Integrations
											</span>

											{value.selectedKey === 'api' ? (
												<div
													className="dropdown-content"
													style={{
														background:
															localStorage.getItem('theme') === 'dark'
																? '#082429'
																: 'white',
														top: showBanner
															? '105px'
															: '75px',
													}}
													onMouseLeave={() => value.handleKey(null)}
												>
													<div
														className={`${Spirit.page.xl} pt2 pb2 grid-dropdown grid-dropdown-4`}
													>
														<div>
															<h3 className="f3 lh-h5 lh-h4-l fw6 ma0 pa0  mt0 mt2-ns">
																APIs and Integrations
															</h3>
															<p className="f5 lh-h5 lh-h4-l fw4 ma0 pa0 mt0 mt2-ns mb2">
																UI Libraries, clients and
																interactive examples for working
																with reactivesearch.io
															</p>
															<Link
																style={{ textDecoration: 'none' }}
																to="/integrations"
															>
																<Button
																	className="btn"
																	style={{
																		background: '#3eb0ef',
																		color: 'white',
																		fontSize: '16px',
																		textDecoration: 'none',
																	}}
																>
																	Explore More
																</Button>
															</Link>
														</div>
														<div>
															<h2 className="f4 lh-h5 lh-h4-l fw6 ma0 pa0 mt0 mt2-ns mb2">
																UI Libraries
															</h2>

															<h3 className="f5 lh-h5 lh-h4-l fw6 ma0 pa0 mt0 mt2-ns mb2">
																ReactiveSearch UI Kit
															</h3>
															<Link
																to="/docs/reactivesearch/v3/overview/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="react-bw"
																	className="dropdown-content-icon mr2"
																/>
																React
															</Link>
															<Link
																to="/docs/reactivesearch/vue/overview/QuickStart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="vue-bw"
																	className="dropdown-content-icon mr2"
																/>
																Vue
															</Link>
															<Link
																to="/docs/reactivesearch/native/overview/QuickStart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="react-bw"
																	className="dropdown-content-icon mr2"
																/>
																Native
															</Link>

															<h3 className="f5 lh-h5 lh-h4-l fw6 ma0 pa0 mt0 mt2-ns mb2">
																Searchbox
															</h3>
															<Link
																to="/docs/reactivesearch/searchbox/Quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="js-bw"
																	className="dropdown-content-icon mr2"
																/>
																JavaScript
															</Link>
															<Link
																to="/docs/reactivesearch/react-searchbox/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="react-bw"
																	className="dropdown-content-icon mr2"
																/>
																React
															</Link>
															<Link
																to="/docs/reactivesearch/vue-searchbox/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="vue-bw"
																	className="dropdown-content-icon mr2"
																/>
																Vue
															</Link>
															<Link
																to="/docs/reactivesearch/react-native-searchbox/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="react-bw"
																	className="dropdown-content-icon mr2"
																/>
																React Native
															</Link>
															<Link
																to="/docs/reactivesearch/flutter-searchbox/quickstart"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="flutter"
																	className="dropdown-content-icon mr2"
																/>
																Flutter
															</Link>
														</div>
														<div>
															<h2 className="f4 lh-h5 lh-h4-l fw6 ma0 pa0  mt0 mt2-ns mb2">
																REST API
															</h2>
															<Link
																to="/api/rest/overview/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="rest"
																	className="dropdown-content-icon mr2"
																/>
																Overview
															</Link>
															<h2 className="f4 lh-h5 lh-h4-l fw6 ma0 pa0  mt0 mt2-ns mb2">
																Clients
															</h2>

															<Link
																to="/api/javascript/quickstart/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="js-bw"
																	className="dropdown-content-icon mr2"
																/>
																Javascript
															</Link>
															<a
																href="https://github.com/appbaseio/appbase-droid"
																target="_blank"
																rel="noopener noreferrer"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="android-logo"
																	style={{
																		filter: 'grayscale(1)',
																	}}
																	className="dropdown-content-icon mr2"
																/>
																Android
															</a>
															<a
																href="https://github.com/appbaseio/appbase-swift"
																target="_blank"
																rel="noopener noreferrer"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<img
																	style={{
																		filter: 'grayscale(1)',
																	}}
																	className="dropdown-content-icon mr2"
																	src="/images/swift-logo.webp"
																	alt="Swift"
																/>
																Swift
															</a>
														</div>
														<div>
															<h2 className="f4 lh-h5 lh-h4-l fw6 ma0 pa0  mt0 mt2-ns mb2">
																Interactive Examples
															</h2>
															<Link
																to="/api/examples/rest/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="rest"
																	className="dropdown-content-icon mr2"
																/>
																REST
															</Link>
															<Link
																to="/api/examples/python/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="python-bw"
																	className="dropdown-content-icon mr2"
																/>
																Python
															</Link>
															<Link
																to="/api/examples/js/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="js-bw"
																	className="dropdown-content-icon mr2"
																/>
																Javascript
															</Link>
															<Link
																to="/api/examples/go/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="go-bw"
																	className="dropdown-content-icon mr2"
																/>
																Go
															</Link>
															<Link
																to="/api/examples/php/"
																className={`${themeClasses[theme].menuItem} nowrap f5 pa3 mr1 mr3-l nl3 dropdown-link link-container`}
															>
																<Icon
																	name="php-bw"
																	className="dropdown-content-icon mr2"
																/>
																PHP
															</Link>
														</div>
													</div>
												</div>
											) : null}
										</React.Fragment>
									)}
								</DropdownLink.Item>
							</DropdownLink>
						</div>
					</div>
					<div className="relative home-search-container" style={{ marginRight: 10 }}>
						<Search />
					</div>
					{mockWindow?.innerWidth > 768 ? (
						<ThemeSwitch setThemeType={setThemeType} />
					) : null}
					<MobileNav setThemeType={setThemeType} />
				</div>
			</nav>
		</div>
	);
};

NavBar.defaultProps = {
	theme: `dark`,
	setThemeType: () => {},
};

NavBar.propTypes = {
	theme: PropTypes.oneOf([`dark`, `light`]),
	setThemeType: PropTypes.func,
};

export default NavBar;
