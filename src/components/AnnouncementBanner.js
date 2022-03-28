import React, { useState } from 'react';
import { css } from 'emotion';

const AnnouncementBanner = () => {
	const [showBanner, setShowBanner] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('announcementBanner') === 'true' : false,
	);
	if (typeof window !== 'undefined' && localStorage.getItem('announcementBanner') === null) {
		localStorage.setItem('announcementBanner', 'true');
		setShowBanner(true);
	}

	return (
		<div>
			{showBanner ? (
				<div className="announcement-banner">
					<a
						className="banner-link-container"
						href="https://www.appbase.io/"
					>
						appbase.io
					</a>
					&nbsp; is now &nbsp;
					<a
						className="banner-link-container"
						href="https://www.reactivesearch.io/"
					>
						reactivesearch.io
					</a>{' '}
					<a href="#" style={{ color: ' #1890ff'}}>&nbsp;[Read the announcement]</a>
					<img
						src="/images/close.svg"
						width={20}
						alt="close-icon"
						className="close-icon"
						onClick={() => {
							localStorage.setItem('announcementBanner', 'false');
							setShowBanner(false);
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

export default AnnouncementBanner;
