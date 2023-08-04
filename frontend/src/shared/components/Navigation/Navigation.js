import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

const Navigation = (props) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (props.expanded) {
      setTimeout(() => {
        setShowText(!showText);
      }, 100);
    } else {
      setShowText(false);
    }
  }, [props.expanded]);

  return (
    <div className="sidenav">
      <NavLink className="shop" to="/">
        <i className="fa-solid fa-shop"></i>{" "}
        <span
          style={
            !showText
              ? { fontSize: 0, opacity: 0 }
              : { visibility: "visible", opacity: 1 }
          }
        >
          Webshop
        </span>
      </NavLink>
      <NavLink to="/cart" className="cart">
        <i className="fa-solid fa-cart-shopping"></i>{" "}
        <span
          style={
            !showText
              ? { fontSize: 0, opacity: 0 }
              : { visibility: "visible", opacity: 1 }
          }
        >
          Cart
        </span>
      </NavLink>
      <NavLink to="/profile">
        <i className="fa-solid fa-user"></i>{" "}
        <span
          style={
            !showText
              ? { fontSize: 0, opacity: 0 }
              : { visibility: "visible", opacity: 1 }
          }
        >
          Profile
        </span>
      </NavLink>
      <button
        className="logout"
        style={!props.expanded ? { left: "1%" } : {}}
        to="/"
      >
        <span
          style={
            !showText
              ? { fontSize: 0, opacity: 0 }
              : { visibility: "visible", opacity: 1 }
          }
        >
          Log out
        </span>{" "}
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  );
};

export default Navigation;
