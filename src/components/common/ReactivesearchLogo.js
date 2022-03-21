import React from "react";

const Logo = ({ theme }) => {
    return (
        <img 
            src={`${theme === 'dark' ? 'https://cdn.jsdelivr.net/gh/appbaseio/cdn@dev/appbase/logos/reactivesearch-white.svg' : 'https://cdn.jsdelivr.net/gh/appbaseio/cdn@dev/appbase/logos/reactivesearch-black.svg'}`}
        />
    )
}

export default Logo;