import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div
      style={{ height: "100%", backgroundColor: "var(--primary-color" }}
      className="container-fluid d-flex align-items-center justify-content-center"
    >
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
                  {...register("usernameRequired", { required: true })}
                />
              </React.Fragment>
            )}
            {!isLogin && errors.usernameRequired && <span>Username is required.</span>}

            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              {...register("emailRequired", { required: true })}
            />
            {errors.emailRequired && <span>email is required.</span>}

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              {...register("passwordRequired", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.passwordRequired && <span>Password is required.</span>}
            <br />

            <input className="submit-button" type="submit" value={isLogin ? "Sign in" : "Sign up"}/>
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
