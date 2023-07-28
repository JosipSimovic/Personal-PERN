import React, { useState } from "react";
import Card from "../../shared/components/UI/Card";

import "./ProductItem.css";

const ProductItem = () => {
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
            src="https://fastly.picsum.photos/id/630/1000/500.jpg?hmac=Gqq2vKu-mwHkWYw-s6bk2XzaGJ25DxGy8cqZMFvhBuA"
            alt="alt"
          />
        </div>
        <div className="product-info">
          <h4>Test</h4>
          <p>Test info about the product.</p>
          <hr />
          <div className="price-div">
            <p style={{ float: "left" }}>Price:</p>
            <p className="price">20.00</p>
          </div>
          <div className="product-footer">
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
