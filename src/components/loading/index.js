import React from "react";
import "./loading.css";

const Loading = ({title = ""}) => {
    return (
        <>
            <div className="loading">
                <div/>
                <div/>
                <div/>
            </div>
            <span>{title}</span>
        </>
    );
}

export default Loading;
