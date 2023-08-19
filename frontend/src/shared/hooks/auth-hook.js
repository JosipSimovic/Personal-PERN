/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { emptyCart, setCartState } from "../../features/cart/cartSlice";
import { useSendRequest } from "./http-request-hook";

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpDate, setTokenExpDate] = useState();
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { sendRequest } = useSendRequest();

  const dispatch = useDispatch();

  var logoutTimer;

  const login = useCallback(async (uid, token, username, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUsername(username);
    const tokenExpDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpDate(tokenExpDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        username: username,
        token: token,
        expiration: new Date(
          tokenExpDate.getTime() - tokenExpDate.getTimezoneOffset() * 60000
        ).toISOString(),
      })
    );
    try {
      const adminCheck = await sendRequest(
        `${process.env.REACT_APP_USER_URL}/checkAdmin`,
        "POST",
        JSON.stringify({
          uid: uid,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setIsAdmin(adminCheck.isAdmin);
    } catch (e) {
      alert(e);
    }

    try {
      const resultData = await sendRequest(
        `${process.env.REACT_APP_USER_URL}/cart/${uid}`,
        "GET",
        null,
        {
          authorization: `Bearer ${token}`,
        }
      );
      if (resultData.products.length > 0) {
        dispatch(setCartState(resultData.products));
      }
    } catch (e) {
      alert(e);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    setUserId(null);
    dispatch(emptyCart());
    localStorage.removeItem("userData");
    window.toast.info("Logged out.");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.userId &&
      userData.token &&
      userData.username &&
      new Date(userData.expiration) > new Date()
    ) {
      login(
        userData.userId,
        userData.token,
        userData.username,
        new Date(userData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpDate]);

  return [userId, isAdmin, token, username, login, logout];
};

export default useAuth;
