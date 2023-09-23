import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "../shared/components/UI/Card";
import { useSendRequest } from "../shared/hooks/http-request-hook";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/auth-context";
import {
  removeProductFromCart,
  setCartProductAmount,
} from "../features/cart/cartSlice";
import ErrorModal from "../shared/components/UI/ErrorModal";
import LoadingSpinner from "../shared/components/UI/LoadingSpinner";

const CartListItem = (props) => {
  const item = props.item;
  const auth = useContext(AuthContext);

  const [itemAmount, setItemAmount] = useState(item.amount);
  const { isLoading, sendRequest, error, clearError } = useSendRequest();
  const initialRender = useRef(true);

  const dispatch = useDispatch();

  const removeFromCart = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_USER_URL}/${item.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      dispatch(removeProductFromCart(item.id));
    } catch (e) {}
  };

  const changeAmountHandler = async (id, type) => {
    try {
      let payload = {
        id,
        type,
        amount: 1,
      };
      dispatch(setCartProductAmount(payload));
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (!initialRender.current) {
      const updateAmountDb = async () => {
        try {
          await sendRequest(
            `${process.env.REACT_APP_USER_URL}/updateCart`,
            "PATCH",
            JSON.stringify({
              uid: auth.userId,
              pid: item.id,
              amount: itemAmount,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
        } catch (e) {}
      };

      updateAmountDb();
    } else {
      initialRender.current = false;
    }
  }, [auth.token, auth.userId, item.id, itemAmount, sendRequest]);

  return (
    <Card key={item.id}>
      {isLoading && <LoadingSpinner />}
      <ErrorModal error={error} onCancel={clearError} />
      <div className="row">
        <div className="col-6 col-sm-3 col-xl-2">
          <img className="product-image" src={item.image} alt={item.name}></img>
        </div>
        <div className="col-6 col-sm-3 col-xl-4">
          <h4>{item.name}</h4>
          <p>
            Color: {item.color_name.toUpperCase()}{" "}
            <span
              style={{
                display: "inline-block",
                width: "0.7em",
                height: "0.7em",
                backgroundColor: item.hex,
                marginLeft: "5px",
              }}
            ></span>
          </p>
          <p>
            Price: <b>{item.price} €</b>
          </p>
        </div>
        <div className="col-6 col-sm-3 col-xl-3">
          <h5>Amount:</h5>
          <div className="amount">
            <button
              onClick={() => {
                setItemAmount((itemAmount) => itemAmount - 1);
                changeAmountHandler(item.id, "minus");
              }}
              disabled={item.amount <= 1}
            >
              -
            </button>
            <span className="counter">{itemAmount}</span>
            <button
              onClick={() => {
                setItemAmount((itemAmount) => itemAmount + 1);
                changeAmountHandler(item.id, "plus");
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="col-6 col-sm-3 col-xl-3">
          <h5>Total:</h5>
          <h4>{(item.amount * Number(item.price)).toFixed(2)} €</h4>
          <div className="buttons">
            <button onClick={removeFromCart} className="delete-button">
              <i className="fa-solid fa-trash"></i> Remove from cart
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartListItem;
