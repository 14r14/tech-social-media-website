import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Register() {
  const [err, setErr] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const submitHandler = () => {
    const email = getValues("email");
    const password = getValues("password");
    const username = getValues("username");
    const confirmPassword = getValues("confirmPassword");

    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
          authCtx.login(data.token, expirationTime, data.username);
          console.log(authCtx.username);
          navigate("/");
        } else {
          if (data.errType === "dberr") {
            setErr(
              "There was a problem on our side, contact the website owner, or try again later."
            );
          } else if (data.errType === "pwdmm") {
            console.log("pwdmm");
            setError("confirmPassword", { type: "pwdmm" });
          }
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input
        type="text"
        placeholder="Username"
        {...register("username", { required: true })}
      />
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", { required: true })}
      />
      {errors.confirmPassword?.type === "pwdmm" && (
        <p>Passwords don't match.</p>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;
