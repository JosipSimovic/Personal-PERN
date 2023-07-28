import React from "react";
import ProductsList from "./components/ProductsList";
import FilterBar from "./components/FilterBar";

import './Shop.css';

const Naslovna = () => {
  return (
    <div className="shop-div">
      <FilterBar />
      <ProductsList />
    </div>
  );
};

export default Naslovna;
