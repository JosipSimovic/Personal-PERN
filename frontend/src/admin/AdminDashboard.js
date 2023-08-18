import React, { useCallback, useContext, useEffect, useState } from "react";

import Card from "../shared/components/UI/Card";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useSendRequest } from "../shared/hooks/http-request-hook";
import ErrorModal from "../shared/components/UI/ErrorModal";
import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "../shared/components/UI/LoadingSpinner";
import AllProducts from "./admin-panels/products/AllProducts";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const location = useLocation();

  const auth = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);

  const [isLoading, error, sendRequest, clearError] = useSendRequest();

  const loadAllProducts = useCallback(async () => {
    try {
      const resultData = await sendRequest(
        `${process.env.REACT_APP_WEBSHOP_URL}/getAll`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      setAllProducts(resultData);
    } catch (e) {}
  });

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column vh-90">
      {isLoading && <LoadingSpinner message="Loading products..." />}
      <ErrorModal error={error} onCancel={clearError} />
      <div className="row text-center p-2">
        <h1>Admin</h1>
      </div>
      <div className="row">
        <div className="col-12 col-xl-4">
          <Link to="./" className={`option-card`}>
            <Card
              class={`card-panel ${
                location.pathname === "/adminDashboard/" ? "active-panel" : ""
              }`}
            >
              <h3>
                <i className="fa-solid fa-rectangle-list"></i> Products
              </h3>
            </Card>
          </Link>
        </div>
        <div className="col-12 col-xl-4">
          <Link to="./users" className={`option-card`}>
            <Card
              class={`card-panel ${
                location.pathname === "/adminDashboard/users"
                  ? "active-panel"
                  : ""
              }`}
            >
              <h3>
                <i className="fa-solid fa-users"></i> Users
              </h3>
            </Card>
          </Link>
        </div>
      </div>
      <hr />
      <div className="panel-content flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <AllProducts
                reloadProducts={loadAllProducts}
                products={allProducts}
              />
            }
          />
          <Route path="/users" element={<h1>Users</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
