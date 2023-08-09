import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendRequest } from "../shared/hooks/http-request-hook";
import LoadingSpinner from "../shared/components/UI/LoadingSpinner";

import "./Login.css";

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, error, sendRequest, clearError] = useSendRequest();

  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_USER_URL}/`,
        "POST"
      );
    } catch (e) {}
  };

  return (
    <div
      style={{ height: "100%", backgroundColor: "var(--primary-color" }}
      className="container-fluid d-flex align-items-center justify-content-center"
    >
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="row login-form-div">
        <div className="col-12">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1>{isLogin ? "Login" : "Sign up"}</h1>
            <hr />

            {!isLogin && (
              <React.Fragment>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  {...register("username", {
                    required: "Username is required.",
                    validate: {
                      specialChars: (s) =>
                        !specialChars.test(s) ||
                        "Username must not contain special characters.",
                      minLength: (s) =>
                        s.length >= 5 ||
                        "Username has to be at least 5 letters.",
                    },
                  })}
                />
              </React.Fragment>
            )}
            {!isLogin && errors.username && (
              <React.Fragment>
                <span>{errors.username.message}</span>
                <span>{errors.username.validate}</span>
              </React.Fragment>
            )}

            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              {...register("email", {
                required: "E-mail is required.",
                validate: {
                  isEmail: (s) => isValidEmail(s) || "E-mail is not valid.",
                },
              })}
            />
            {errors.email && (
              <React.Fragment>
                <span>{errors.email.message}</span>
                <span>{errors.email.validate}</span>
              </React.Fragment>
            )}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required.",
                validate: {
                  minLength: (s) =>
                    s.length >= 5 || "Password has to be at least 5 letters.",
                },
              })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <React.Fragment>
                <span>{errors.password.message}</span>
                <span>{errors.password.validate}</span>
              </React.Fragment>
            )}
            <br />

            <input
              className="submit-button"
              type="submit"
              value={isLogin ? "Sign in" : "Sign up"}
            />
          </form>
          <br />
          {isLogin ? (
            <p>Don't have an account?</p>
          ) : (
            <p>Already have an account?</p>
          )}
          <button onClick={() => setIsLogin(!isLogin)} className="mode-button">
            {isLogin ? "Sign up!" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
