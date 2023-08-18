import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { useSelector } from "react-redux";
import Button from "../UI/Button";

import "./Navigation.css";

const Navigation = (props) => {
  const auth = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);

  return (
    <div className="sidenav">
      <div id="close-nav-button" style={{ float: "right" }}>
        <Button bgcolor="transparent" onClick={props.sidebarOpenHandler}>
          <i
            style={{ color: "black", fontSize: "2em" }}
            className="fa-solid fa-xmark"
          ></i>
        </Button>
      </div>
      <div className="links-div">
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
            {auth.isAdmin && (
              <NavLink to="/adminDashboard/">
                <i className="fa-solid fa-lock"></i> <span>Admin</span>
              </NavLink>
            )}
          </React.Fragment>
        )}
        <div className="login-logout-mobile">
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
  );
};

export default Navigation;
