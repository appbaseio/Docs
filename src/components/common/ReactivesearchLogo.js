import React, { useEffect, useState } from 'react';

const Logo = ({ theme, isMobile }) => {
	const [srcUrl, setSrcUrl] = useState('https://cdn.jsdelivr.net/gh/appbaseio/cdn@dev/appbase/logos/reactivesearch-black.svg');
	
	useEffect(() => {
		if(isMobile) {
			setSrcUrl('/images/reactivesearch_small.png');
		} else {
			if(theme === 'dark') {
				setSrcUrl('https://cdn.jsdelivr.net/gh/appbaseio/cdn@dev/appbase/logos/reactivesearch-white.svg')
			} else {
				setSrcUrl('https://cdn.jsdelivr.net/gh/appbaseio/cdn@dev/appbase/logos/reactivesearch-black.svg')
			}
		}
	}, [theme, isMobile]);

	return (
		<img
			src={srcUrl}
			alt="Reactivesearch logo"
			className='reactivesearch-logo'
		/>
	);
};

export default Logo;
