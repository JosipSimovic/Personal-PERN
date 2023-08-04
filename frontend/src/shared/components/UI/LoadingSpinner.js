import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`loading-spinner__overlay ${props.asOverlay}`}>
        <div className="ring-spinner"></div>
        {props.message && <p className="message">{props.message}</p>}
    </div>
  );
};

export default LoadingSpinner;
