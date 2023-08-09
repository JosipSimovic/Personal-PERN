import React from "react";
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

import "./App.css";
import "./style-constants.css";

window.toast = toast;

function App() {
  const [userId, token, login, logout] = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
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
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <TopBar />
        <ToastContainer />
        <div className="dashboard">
          <div className={`sidebar sidebar-open`}>
            <Navigation expanded={true} />
          </div>
          <div className="content">{routes}</div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
