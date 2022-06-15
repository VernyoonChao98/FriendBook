import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

import {
  getAllFriends,
  getAllPendingSentFQ,
  getAllPendingReceivedFQ,
} from "../store/friend";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllFriends({ userId: sessionUser.id }));
    dispatch(getAllPendingSentFQ({ userId: sessionUser.id }));
    dispatch(getAllPendingReceivedFQ({ userId: sessionUser.id }));
  });

  return (
    <nav className="nav__container">
      <div className="logo"></div>
      <div className="navlinks">
        <NavLink
          className="home"
          to="/home"
          exact={true}
          activeClassName="home__active"
        ></NavLink>
        <NavLink
          className="friends"
          to="/friends"
          exact={true}
          activeClassName="friends__active"
        ></NavLink>
        <NavLink
          className="profile"
          to={`/profile/${sessionUser.id}`}
          exact={true}
          activeClassName="profile__active"
        ></NavLink>
      </div>
      <div className="logout__container">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;
