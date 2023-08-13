import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{ backgroundColor: props.bgcolor }}
      className="button"
    >
      {props.children}
    </button>
  );
};

export default Button;
