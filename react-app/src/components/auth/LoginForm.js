import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  const demoLogin = (e) => {
    const email = "friendbookclone@aa.com";
    const password = "password";
    dispatch(login(email, password));
  };

  return (
    <>
      <form onSubmit={onLogin}>
        <div className="errors__login">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login__input__container">
          <input
            className="login__input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login__input__container">
          <input
            className="login__input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
      </form>
      <button className="login__button" onClick={onLogin}>
        Log in
      </button>
      <button className="demo__button" onClick={demoLogin}>
        Demo?
      </button>
      <div className="border__line">
        Hello to you good person! Congratz if you find this :D
      </div>
    </>
  );
};

export default LoginForm;
