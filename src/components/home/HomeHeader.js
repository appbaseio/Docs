import React from 'react';
import Modal from 'react-responsive-modal';

import { Button } from '@appbaseio/designkit';
import { NavBar } from '../common';
import { Spirit } from '../../styles/spirit-styles';

class HomeHeader extends React.Component {
	state = {
		open: false,
	};

	handleModal = () => {
		this.setState(prevState => ({
			open: !prevState.open,
		}));
	};

	render() {
		const { open } = this.state;
		return (
			<div className="gh-bg-home bb b--whitegrey">
				<header className="top-0 left-0 right-0 bg-white fixed z-999">
					<NavBar theme="dark" />
				</header>
				<div
					className={`${
						Spirit.page.xl
					} pb5 pt10 pt15-ns pt20-l pb10-ns pb15-l flex items-between bt bn-ns b--white-10 home-header`}
				>
					<div className="pr3">
						<h1 className="ma0 mt0 pt0 pa0 f2 lh-1-65 f1-ns f-headline-l darkgrey header-heading-shadow header-title">
							Appbase.io Docs
						</h1>
						<p
							className={`${Spirit.sectionSubHeading} lh-1-65 f1 darkgrey`}
							style={{ lineHeight: '1.6' }}
						>
							Appbase.io offers the search stack for building modern apps. Import data
							instantly from your favorite sources. Deploy in minutes with a fully
							managed backend. Build amazing search Ux with reactive UI components.
						</p>
						<div className="mt8">
							<Button
								success
								uppercase
								shadow
								href="https://dashboard.appbase.io/signup"
								target="_blank"
								style={{ background: '#00f68e' }}
								className="signup-btn"
							>
								SignUp for free
							</Button>
							<Button
								ghost
								uppercase
								onClick={this.handleModal}
								className="video-btn"
							>
								1 Min Overview
							</Button>
							<Modal
								open={open}
								classNames={{modal: "home-modal", closeIcon: 'close-icon'}}
								onClose={this.handleModal}
								center
							>
								<iframe
									title="1 Min Overview"
									className="iframe"
									src="https://www.youtube.com/embed/EvsORhwWgdA?autoplay=1"
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								/>
							</Modal>
						</div>
					</div>
					<div className="home-header-graphics">
						<div className="graphic">
							<img src="images/app-cluster@3x.png" />
							<p className={`${Spirit.p} middarkgrey text-center`}>
								Host an App or a Cluster
							</p>
						</div>
						<div className="graphic">
							<img src="images/home-search-relevancy@3x.png" />
							<p className={`${Spirit.p} middarkgrey text-center`}>
								Set Search relevancy
							</p>
						</div>
						<div className="graphic">
							<img src="images/home-search@3x.png" />
							<p className={`${Spirit.p} middarkgrey text-center`}>Build Search UI</p>
						</div>
						<div className="graphic">
							<img src="images/home-analytics@3x.png" />
							<p className={`${Spirit.p} middarkgrey text-center`}>
								Actionable Analytics
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeHeader;
