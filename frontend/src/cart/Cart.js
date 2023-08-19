import React from "react";
import { useSelector } from "react-redux";
import CartList from "./CartList";

import OrderSummary from "./OrderSummary";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center p-4">
          <h1>
            <i className="fa-solid fa-cart-shopping"></i> MY CART
          </h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-xl-8">
          <CartList cart={cart} />
        </div>
        <div className="col-sm-12 col-xl-4 text-center">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
