import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <h1 className="topbar-username">Username</h1>
      <button className="topbar-button">Log out</button>
    </div>
  );
};

export default TopBar;
