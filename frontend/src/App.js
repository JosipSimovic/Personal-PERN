import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./shared/components/Navigation/Navigation";
import TopBar from "./shared/components/Navigation/TopBar";
import Shop from "./shop/Shop";
import Profile from "./profile/Profile";
import Cart from "./cart/Cart";

import "./App.css";
import "./style-constants.css";

function App() {
  const [navExpanded, setNavExpanded] = useState(false);

  const expandNavHandler = () => {
    setNavExpanded(!navExpanded);
  };

  let routes = (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );

  return (
    <Router>
      <div className="topbar">
        <TopBar />
      </div>
      <div className="dashboard">
        <div
          onMouseEnter={expandNavHandler}
          onMouseLeave={expandNavHandler}
          className={`sidebar ${navExpanded ? "sidebar-open" : ""}`}
        >
          <Navigation expanded={navExpanded} />
        </div>
        <div className="content">{routes}</div>
      </div>
    </Router>
  );
}

export default App;
