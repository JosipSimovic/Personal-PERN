import React from "react";
import ProductItem from "./ProductItem";

import "./ProductsList.css";

const ProductsList = () => {
  return (
    <React.Fragment>
      <ul className="products-list">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </ul>
    </React.Fragment>
  );
};

export default ProductsList;
