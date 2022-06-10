import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { months, years } from "./Utils";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="header__of__form">
        <div className="text__one">Sign Up</div>
        <div className="text__two">It’s quick and easy.</div>
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div>
          <label>Birthday</label>
          <select
            className="month__select"
            // style={{ color: monthColor }}
            // onFocus={() => setMonthColor("#dcddde")}
            // onChange={() => setMonthColor("#dcddde")}
            required
          >
            <option
              className="option__placeholder"
              value=""
              disabled
              selected
              hidden
            >
              Select
            </option>
            {months.map((month) => {
              return (
                <option className="option__drop__down" key={month}>
                  {month}
                </option>
              );
            })}
          </select>
          <select
            className="day__select"
            // style={{ color: dayColor }}
            // onFocus={() => setDayColor("#dcddde")}
            // onChange={() => setDayColor("#dcddde")}
            required
          >
            <option
              className="option__placeholder"
              value=""
              disabled
              selected
              hidden
            >
              Select
            </option>
            {Array.apply(null, Array(31)).map(function (x, i) {
              return (
                <option className="option__drop__down" key={i}>
                  {(i += 1)}
                </option>
              );
            })}
          </select>
          <select
            className="year__select"
            // style={{ color: yearColor }}
            // onFocus={() => setYearColor("#dcddde")}
            // onChange={() => setYearColor("#dcddde")}
            required
          >
            <option
              className="option__placeholder"
              value=""
              disabled
              selected
              hidden
            >
              Select
            </option>
            {years.map((year) => {
              return (
                <option className="option__drop__down" key={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
