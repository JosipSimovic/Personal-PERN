import React, { useContext, useState } from "react";
import Card from "../shared/components/UI/Card";

import "./CartList.css";
import CartListItem from "./CartListItem";

const CartList = (props) => {
  const cart = props.cart;

  return (
    <React.Fragment>
      {cart.map((item) => {
        return <CartListItem item={item} />;
      })}
    </React.Fragment>
  );
};

export default CartList;
