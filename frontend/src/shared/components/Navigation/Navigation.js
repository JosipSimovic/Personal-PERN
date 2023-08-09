import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import "./Navigation.css";

const Navigation = (props) => {
  const auth = useContext(AuthContext);

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
      {auth.isLoggedIn && (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};

export default Navigation;
