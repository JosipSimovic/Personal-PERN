import React, { useContext, useEffect, useState } from "react";
import Card from "../../shared/components/UI/Card";
import { AuthContext } from "../../context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  setCartProductAmount,
} from "../../features/cart/cartSlice";
import { useSendRequest } from "../../shared/hooks/http-request-hook";

import "./ProductItem.css";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);

  const { isLoading, sendRequest } = useSendRequest();
  const dispatch = useDispatch();

  const [itemAmount, setItemAmount] = useState(1);

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    let foundItem = cart.find((item) => item.id === props.item.id);

    if (foundItem) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cart, props.item.id]);

  const addToCart = async () => {
    if (!auth.isLoggedIn) {
      props.setErrorModal("You must be logged in to buy products.");
    } else {
      let alreadyInCart = false;
      let cartAmount = 0;
      cart.forEach((element) => {
        if (element.id === props.item.id) {
          alreadyInCart = true;
          cartAmount = element.amount;
        }
      });
      try {
        if (alreadyInCart) {
          await sendRequest(
            `${process.env.REACT_APP_USER_URL}/updateCart`,
            "PATCH",
            JSON.stringify({
              uid: auth.userId,
              pid: props.item.id,
              amount: itemAmount + cartAmount,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
          let payload = {
            id: props.item.id,
            type: "plus",
            amount: itemAmount,
          };
          dispatch(setCartProductAmount(payload));
          window.toast.success(
            `${itemAmount} '${props.item.name}' added to existing cart.`
          );
        } else {
          await sendRequest(
            `${process.env.REACT_APP_USER_URL}/addToCart`,
            "POST",
            JSON.stringify({
              uid: auth.userId,
              pid: props.item.id,
              amount: itemAmount,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
          let payload = {
            product: props.item,
            amount: itemAmount,
          };
          dispatch(addProductToCart(payload));
          window.toast.success(
            `${itemAmount} '${props.item.name}' added to cart.`
          );
        }
      } catch (e) {
        props.setErrorModal(e.message);
      }
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
            <div>
              {isLoading && (
                <LoadingSpinner message="Adding to cart..." asOverlay />
              )}
              <button onClick={addToCart} className="buy-button">
                {inCart ? "ADD AMOUNT" : "BUY"}{" "}
                <i className="fa-solid fa-bag-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
