import React from "react";

import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="sidenav">
      <NavLink className="shop" to="/">
        <i className="fa-solid fa-shop"></i> Webshop
      </NavLink>
      <NavLink to="/cart" className="cart">
        <i className="fa-solid fa-cart-shopping"></i> Cart
      </NavLink>
      <NavLink to="/profile">
        <i className="fa-solid fa-user"></i> Profile
      </NavLink>
      <button className="logout" to="/">
        Log out <i className="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  );
};

export default Navigation;
