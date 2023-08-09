import React from "react";
import ProductItem from "./ProductItem";

import "./ProductsList.css";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";

const ProductsList = (props) => {
  return (
    <React.Fragment>
      {props.isLoading && (
        <LoadingSpinner asOverlay message="Loading products..." />
      )}
      {!props.isLoading && props.products.length === 0 && (
        <div className="error-div">
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <h1>No items found.</h1>
          </div>
        </div>
      )}
      {!props.isLoading && (
        <ul className="products-list">
          {props.products.map((item) => (
            <ProductItem item={item} setErrorModal={props.setErrorModal} />
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default ProductsList;
