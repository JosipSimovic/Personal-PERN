import React from "react";
import { useSelector } from "react-redux";
import CartList from "./CartList";
import Card from "../shared/components/UI/Card";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const totalAmountCalc = () => {
    let totalAmount = 0;
    cart.forEach((element) => {
      totalAmount += element.product.price * element.amount;
    });
    return totalAmount.toFixed(2);
  };

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
          <Card>
            <h5>ORDER</h5>
            <hr />
            <div className="container-fluid">
              <div className="row">
                <div className="col-6 text-start">
                  <p>Number of items:</p>
                </div>
                <div className="col-6 text-end">
                  <h5>{cart.length}</h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 text-center">
                  <p>Total amount: </p>
                  <h3>{totalAmountCalc()} €</h3>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
