import React, { useContext, useState } from "react";

import "./CartList.css";
import CartListItem from "./CartListItem";

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
