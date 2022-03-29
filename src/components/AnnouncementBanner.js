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
					appbase.io is now reactivesearch.io{' '}
					<a href="#" style={{ color: ' #1890ff'}}>&nbsp;Read the announcement</a>
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
