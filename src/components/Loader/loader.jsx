import React from "react";
import loaderGif from "./loader.gif";

const Loader = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 9999,
            }}
        >
            <img src={loaderGif} alt="Loading..." />
        </div>
    );
};

export default Loader;
