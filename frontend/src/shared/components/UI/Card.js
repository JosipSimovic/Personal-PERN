import React from "react";

import "./Card.css";

const Card = (props) => {
  return <div className={`card ${props.class}`}>{props.children}</div>;
};

export default Card;
