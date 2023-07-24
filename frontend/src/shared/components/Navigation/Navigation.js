import React from "react";

import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="sidenav">
      <NavLink to="/">Naslovna</NavLink>
      <NavLink to="/profil">Profil</NavLink>
    </div>
  );
};

export default Navigation;
