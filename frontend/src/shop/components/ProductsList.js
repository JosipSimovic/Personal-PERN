import React from "react";
import ProductItem from "./ProductItem";

import "./ProductsList.css";

const ProductsList = (props) => {
  return (
    <React.Fragment>
      {props.items.length === 0 && <h1>No items found.</h1>}
      <ul className="products-list">
        {props.items.map((item) => (
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
    </React.Fragment>
  );
};

export default ProductsList;
