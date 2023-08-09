import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import "./Navigation.css";
import { useSelector } from "react-redux";

const Navigation = (props) => {
  const auth = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);

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
        <i className="fa-solid fa-shop"></i> <span>Webshop</span>
      </NavLink>
      {auth.isLoggedIn && (
        <React.Fragment>
          <NavLink to="/cart" className="cart">
            <i className="fa-solid fa-cart-shopping"></i> <span>Cart </span>{" "}
            {cart.length > 0 && (
              <span className="cart-number">{cart.length}</span>
            )}
          </NavLink>
          <NavLink to="/profile">
            <i className="fa-solid fa-user"></i> <span>Profile</span>
          </NavLink>
        </React.Fragment>
      )}
    </div>
  );
};

export default Navigation;
