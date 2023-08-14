import React from "react";
import Card from "../shared/components/UI/Card";

import "./CartList.css";
import { useDispatch } from "react-redux";
import { setCartProductAmount } from "../features/cart/cartSlice";

const CartList = (props) => {
  const cart = props.cart;

  const dispatch = useDispatch();

  const changeAmountHandler = (id, type) => {
    let payload = {
      id,
      type,
    };
    dispatch(setCartProductAmount(payload));
  };

  return (
    <React.Fragment>
      {cart.map((item) => {
        return (
          <Card key={item.id}>
            <div className="row">
              <div className="col-sm-4 col-xl-2">
                <img
                  className="product-image"
                  src={item.product.image}
                  alt={item.product.name}
                ></img>
              </div>
              <div className="col-sm-8 col-xl-4">
                <h4>{item.product.name}</h4>
                <p>
                  Color: {item.product.color_name.toUpperCase()}{" "}
                  <span
                    style={{
                      display: "inline-block",
                      width: "0.7em",
                      height: "0.7em",
                      backgroundColor: item.product.hex,
                      marginLeft: "5px",
                    }}
                  ></span>
                </p>
                <p>
                  Price: <b>{item.product.price} €</b>
                </p>
              </div>
              <div className="col-sm-12 col-xl-3">
                <h5>Amount:</h5>
                <div className="amount">
                  <button
                    onClick={() =>
                      changeAmountHandler(item.product.id, "minus")
                    }
                    disabled={item.amount <= 1}
                  >
                    -
                  </button>
                  <span className="counter">{item.amount}</span>
                  <button
                    onClick={() => changeAmountHandler(item.product.id, "plus")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-12 col-xl-3">
                <h5>Total:</h5>
                <h4>
                  {(item.amount * Number(item.product.price)).toFixed(2)} €
                </h4>
              </div>
            </div>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default CartList;
