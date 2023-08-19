import React from "react";
import Card from "../shared/components/UI/Card";
import { useSelector } from "react-redux";

import "./OrderSummary.css";

const OrderSummary = (props) => {
  const cart = useSelector((state) => state.cart);

  const totalAmountCalc = () => {
    let totalAmount = 0;
    cart.forEach((element) => {
      totalAmount += element.price * element.amount;
    });
    return totalAmount.toFixed(2);
  };

  const totalQuantityCalc = () => {
    let quantity = 0;
    cart.forEach((element) => {
      quantity += element.amount;
    });
    return quantity;
  };

  return (
    <div className="sticky-order">
      <Card>
        <h4>ORDER</h4>
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
          <div className="row">
            <div className="col-6 text-start">
              <p>Quantity of items:</p>
            </div>
            <div className="col-6 text-end">
              <h5>{totalQuantityCalc()}</h5>
            </div>
          </div>
          <div className="summary-div">
            <div className="row">
              <div className="col-12">
                <h5>Summary</h5>
              </div>
            </div>
            <hr />
            <div className="summary-div-items">
              {cart.map((product) => {
                return (
                  <div className="row">
                    <div className="col-6 text-start">
                      <p>{product.name}</p>
                    </div>
                    <div className="col-6 text-end">
                      <p>{product.amount}</p>
                    </div>
                  </div>
                );
              })}
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
  );
};

export default OrderSummary;
