import React, { useState } from 'react';
import { css } from 'emotion';

const AnnouncementBanner = ({ showBanner, setShowBanner }) => {
	return (
		<div>
			{showBanner ? (
				<div className="announcement-banner">
					appbase.io is now reactivesearch.io{' '}
					<a
						href="https://blog.reactivesearch.io/appbase-io-announcement"
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
