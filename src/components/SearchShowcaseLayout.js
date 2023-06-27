import React from 'react';

import { Layout } from './common/layout';
import { Spirit } from '../styles/spirit-styles';
import { SidebarNav } from './common/sidebar';
import { Icon, TOC } from './common';

import '../styles/showcase.css';

class PostLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isToggleOn: false,
		};

		this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
	}

	toggleMobileMenu() {
		this.setState(state => {
			return { isToggleOn: !state.isToggleOn };
		});
	}

	render() {
		const { location, path, sidebar, nestedSidebar, toc, post } = this.props;

		const sideBarLayout = {};

		if (sidebar && toc) {
			// Layout #1: navigation left and right: sidebar and TOC

			sideBarLayout.leftSidebar = (
				<div className="nr3 sticky top-20">
					<SidebarNav
						location={location}
						sidebar={sidebar}
						style={{ overflow: 'scroll', height: '86vh' }}
						nestedSidebar={nestedSidebar}
					/>
				</div>
			);
			sideBarLayout.rightSidebar = (
				<div className="nr3 sticky top-25">
					<TOC className="pr4" listClasses="mt2" />
				</div>
			);
			sideBarLayout.justification = `justify-between`;
		} else if (sidebar || toc) {
			// Layout #2: navigation left only, either TOC or sidebar

			sideBarLayout.leftSidebar = sidebar ? (
				<SidebarNav location={location} sidebar={sidebar} nestedSidebar={nestedSidebar} />
			) : (
				<div className="nr3 sticky top-25">
					<TOC
						listClasses="lefty"
						className="mt5 mb5 mt10-ns mb0-ns"
						showHeading={false}
					/>
				</div>
			);
			sideBarLayout.justification = `justify-start`;
		} else {
			// Layout #3: no sidebar navigation
			sideBarLayout.justification = `justify-center`;
		}

		return (
			<>
				<Layout>
					<div
						className={`${Spirit.page.xl} flex flex-column flex-row-ns ${sideBarLayout.justification} relative`}
					>
						<button
							onClick={() => this.toggleMobileMenu()}
							className="bg-transparent bn appearance-none absolute right-7 db dn-ns"
							style={{ top: `-40px` }}
							type="button"
						>
							<Icon name="hamburger" className="w6 h-auto stroke-white db dn-ns" />
						</button>

						{sideBarLayout.leftSidebar ? (
							<div
								className={`${
									this.state.isToggleOn ? `mobile-nav-open` : ``
								} w-100 w-sidebar-ns pr10 pl5 pl0-ns flex-shrink-0-l relative left-sidebar`}
							>
								{sideBarLayout.leftSidebar}
							</div>
						) : null}
						<div className="w-75">
							<div
								className={`w-100 shadow-2 br4 ${
									this.state.isToggleOn ? `` : ` br--bottom`
								}`}
							>
								<article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
									{this.props.children}
								</article>
							</div>
						</div>
						{sideBarLayout.rightSidebar ? (
							<div className="order-3 w-sidebar flex-shrink-0 dn db-l pt10 pl7">
								{sideBarLayout.rightSidebar}
							</div>
						) : null}
					</div>
				</Layout>
			</>
		);
	}
}

export default PostLayout;
