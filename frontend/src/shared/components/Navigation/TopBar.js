import React from "react";

import "./TopBar.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <h1 className="topbar-username">Web App</h1>
          </div>
          <div className="col-8"></div>
          <div className="col-2 text-end">
            <Link to={"/login"}>
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
