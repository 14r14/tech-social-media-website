import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Login() {
  const [err, setErr] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = () => {
    const email = getValues("email");
    const password = getValues("password");

    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
          authCtx.login(data.token, expirationTime, data.username);
          navigate("/");
        } else {
          if (data.errType === "lgnfail") {
            setError("email", { type: "lgnfail" });
          } else if (data.errType === "dberr") {
            setErr(data.msg);
          }
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email?.type === "required" && <p>Please type in an email.</p>}
        {errors.email?.type === "pattern" && <p>Please enter a valid email.</p>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p>Please enter a password.</p>
        )}
        {errors.email?.type === "lgnfail" && (
          <p>Invalid username or password.</p>
        )}
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default Login;
