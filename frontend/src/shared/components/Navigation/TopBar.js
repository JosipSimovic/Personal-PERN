import React, { useContext } from "react";

import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import "./TopBar.css";

const TopBar = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <h1 className="topbar-username">
              <i
                onClick={props.sidebarOpenHandler}
                id="nav-bars-button"
                className="fa-solid fa-bars"
              ></i>{" "}
              Web App
            </h1>
          </div>
          <div className="col-2 text-end">
            <div className="login-logout-button">
              {!auth.isLoggedIn && (
                <Link className="" to={"/login"}>
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
    </div>
  );
};

export default TopBar;
