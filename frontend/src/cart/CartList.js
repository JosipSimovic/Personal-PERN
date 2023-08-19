import React from "react";

import CartListItem from "./CartListItem";

import "./CartList.css";

const CartList = (props) => {
  const cart = props.cart;

  return (
    <React.Fragment>
      {cart.map((item) => {
        return <CartListItem key={item.id} item={item} />;
      })}
    </React.Fragment>
  );
};

export default CartList;
