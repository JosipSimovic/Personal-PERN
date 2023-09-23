import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navigation from "./shared/components/Navigation/Navigation";
import TopBar from "./shared/components/Navigation/TopBar";
import Shop from "./shop/Shop";
import Profile from "./profile/Profile";
import Cart from "./cart/Cart";
import Login from "./login/Login";
import { AuthContext } from "./context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import { ToastContainer, toast } from "react-toastify";
import AdminDashboard from "./admin/AdminDashboard";

import "./App.css";
import "./style-constants.css";

window.toast = toast;

function App() {
  const [userId, isAdmin, token, username, login, logout] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarOpenHandler = () => {
    if (document.getElementById("nav-bars-button").checkVisibility()) {
      setSidebarOpen((prevState) => !prevState);
    }
  };

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        {isAdmin && (
          <Route path="/adminDashboard/*" element={<AdminDashboard />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        isAdmin: isAdmin,
        userId: userId,
        username: username,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <TopBar sidebarOpenHandler={sidebarOpenHandler} />
        <ToastContainer />

        <div className="dashboard">
          {sidebarOpen && (
            <div
              className="sidebar-backdrop"
              onClick={sidebarOpenHandler}
            ></div>
          )}
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <Navigation sidebarOpenHandler={sidebarOpenHandler} />
          </div>
          <div className="content">{routes}</div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
