import React, { useState } from "react";
import Card from "../../shared/components/UI/Card";

import "./ProductItem.css";

const ProductItem = (props) => {
  const [itemAmount, setItemAmount] = useState(1);

  const amountMinusHandler = () => {
    setItemAmount(itemAmount - 1);
  };

  const amountPlusHandler = () => {
    setItemAmount(itemAmount + 1);
  };

  return (
    <li>
      <Card>
        <div className="image-div">
          <img
            src={props.image}
            alt="alt"
          />
        </div>
        <div className="product-info">
          <h4>{props.name}</h4>
          <p className="description">{props.description}</p>
          <hr />
          <div className="product-footer">
          <div className="price-div">
            <p style={{ float: "left" }}>Color:</p>
            <p className="price">{props.color.toUpperCase()}</p>
          </div>
          <div className="price-div">
            <p style={{ float: "left" }}>Price:</p>
            <p className="price">{props.price}</p>
          </div>
            <div className="amount">
              <button onClick={amountMinusHandler} disabled={itemAmount <= 1}>
                -
              </button>
              <span className="counter">{itemAmount}</span>
              <button onClick={amountPlusHandler}>+</button>
            </div>
            <button className="buy-button">
              BUY <i className="fa-solid fa-bag-shopping"></i>
            </button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
