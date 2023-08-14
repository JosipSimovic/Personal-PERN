import React, { useContext, useState } from "react";
import Card from "../../shared/components/UI/Card";
import { AuthContext } from "../../context/auth-context";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cart/cartSlice";

import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);

  const dispatch = useDispatch();

  const [itemAmount, setItemAmount] = useState(1);

  const addToCart = () => {
    if (!auth.isLoggedIn) {
      props.setErrorModal("You must be logged in to buy products.");
    } else {
      let payload = {
        product: props.item,
        amount: itemAmount,
      };
      dispatch(addProductToCart(payload));
      window.toast.success(`${itemAmount} '${props.item.name}' added to cart.`);
    }
  };

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
          <img src={props.item.image} alt="alt" />
        </div>
        <div className="product-info">
          <h4>{props.item.name}</h4>
          <p className="description">{props.item.description}</p>
          <hr />
          <div className="product-footer">
            <div className="price-div">
              <p style={{ float: "left" }}>Color:</p>
              <p className="price">{props.item.color_name.toUpperCase()}</p>
            </div>
            <div className="price-div">
              <p style={{ float: "left" }}>Price:</p>
              <p className="price">{props.item.price} €</p>
            </div>
            <div className="amount">
              <button onClick={amountMinusHandler} disabled={itemAmount <= 1}>
                -
              </button>
              <span className="counter">{itemAmount}</span>
              <button onClick={amountPlusHandler}>+</button>
            </div>
            <button onClick={addToCart} className="buy-button">
              BUY <i className="fa-solid fa-bag-shopping"></i>
            </button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
