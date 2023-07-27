import React from "react";

import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="sidenav">
      <NavLink className="shop" to="/">
        <i className="fa-solid fa-cart-shopping"></i> Webshop
      </NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <button className="logout" to="/">Log out <i className="fa-solid fa-right-from-bracket"></i></button>
    </div>
  );
};

export default Navigation;
