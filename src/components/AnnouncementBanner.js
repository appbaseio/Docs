import React, { useEffect, useState } from 'react';
import { css } from 'emotion';

const AnnouncementBanner = ({ showBanner, setShowBanner }) => {
	useEffect(() => {
		const bodyElement = document.querySelector('body');
		// Change styles/post-content.css if changing class below
		if (showBanner) {
			// Class used by heading anchor tags
			bodyElement.classList.add('announcement-banner-active');
		} else {
			// Class used by heading anchor tags
			bodyElement.classList.remove('announcement-banner-active');
		}
	}, [showBanner]);
	return (
		<div>
			{showBanner ? (
				<div className="announcement-banner">
					appbase.io is now reactivesearch.io{' '}
					<a
						href="https://blog.reactivesearch.io/appbaseio-is-reactivesearch"
						target="_blank"
						style={{ color: ' #1890ff' }}
					>
						&nbsp;Read the announcement
					</a>
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
