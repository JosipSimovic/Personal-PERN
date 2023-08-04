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
      {props.products.length === 0 && (
        <div className="container-fluid d-flex align-items-center justify-content-center">
          <h1>No items found.</h1>
        </div>
      )}
      {!props.isLoading && (
        <ul className="products-list">
          {props.products.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              color={item.color}
            />
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default ProductsList;
