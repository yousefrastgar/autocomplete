import React from "react";
import "./container.css";

const Container = ({className = '', style = {}, children}) => {
    return (
        <div className={`container ${className}`} style={style}>{children}</div>
    );
}

export default Container;
