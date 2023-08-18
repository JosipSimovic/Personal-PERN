import React from "react";

import Card from "../shared/components/UI/Card";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <div className="row text-center p-2">
        <h1>Admin</h1>
      </div>
      <div className="row">
        <div className="col-12 col-xl-4">
          <Link
            className={`option-card ${
              location.pathname === "/adminDashboard/" ? "active-panel" : ""
            }`}
            to="./"
          >
            <Card
              class={`card-panel ${
                location.pathname === "/adminDashboard/" ? "active-panel" : ""
              }`}
            >
              <h3>
                <i class="fa-solid fa-rectangle-list"></i> Products
              </h3>
            </Card>
          </Link>
        </div>
        <div className="col-12 col-xl-4">
          <Link className={`option-card`} to="./users">
            <Card
              class={`card-panel ${
                location.pathname === "/adminDashboard/users"
                  ? "active-panel"
                  : ""
              }`}
            >
              <h3>
                <i class="fa-solid fa-users"></i> Users
              </h3>
            </Card>
          </Link>
        </div>
      </div>
      <hr />
      <div className="panel-content">
        <Routes>
          <Route path="/" element={<h1>Products</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
