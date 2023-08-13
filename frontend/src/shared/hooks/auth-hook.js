/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../features/cart/cartSlice";

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpDate, setTokenExpDate] = useState();
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);

  const dispatch = useDispatch();

  var logoutTimer;

  const login = useCallback((uid, token, username, expirationDate) => {
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
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    dispatch(emptyCart());
    localStorage.removeItem("userData");
    setUserId(null);
    window.toast.info("Logged out.");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      userData.username &&
      new Date(userData.expiration) > new Date()
    ) {
      login(
        userData.uid,
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

  return [userId, token, username, login, logout];
};

export default useAuth;
