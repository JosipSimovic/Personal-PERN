import React, { useContext } from "react";

import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import "./TopBar.css";

const TopBar = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <h1 className="topbar-username">Web App</h1>
          </div>
          <div className="col-8"></div>
          <div className="col-2 text-end">
            {!auth.isLoggedIn && (
              <Link to={"/login"}>
                <Button>Sign in</Button>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Button onClick={() => auth.logout()}>
                Log out <i className="fa-solid fa-right-from-bracket"></i>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
