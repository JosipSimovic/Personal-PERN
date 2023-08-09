import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item) => {
        console.log(item.product);
        return (
          <h1>
            {item.product.name} {item.amount} {item.product.price}€
          </h1>
        );
      })}
    </div>
  );
};

export default Cart;
