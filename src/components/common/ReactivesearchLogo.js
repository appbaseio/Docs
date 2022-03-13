import React from "react";

const Logo = () => {
    return (
        <div style={{ display: 'flex', fontSize: 'large', gap: 5}}>
            <img 
                width="20px"
                height="20px"
                src={require("../../images/reactiveseach-logo.png")}
            />
            REACTIVESEARCH
        </div>
    )
}

export default Logo;