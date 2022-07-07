import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import Search from "./Search";

import {
  getAllFriends,
  getAllPendingSentFQ,
  getAllPendingReceivedFQ,
  cleanFriends,
} from "../store/friend";

import { getAllUsers } from "../store/users";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllFriends({ userId: sessionUser.id }));
    dispatch(getAllPendingSentFQ({ userId: sessionUser.id }));
    dispatch(getAllPendingReceivedFQ({ userId: sessionUser.id }));
    // dispatch(getAllUsers());

    return () => {
      dispatch(cleanFriends());
    };
  });

  return (
    <nav className="nav__container">
      <div>
        <div className="logo"></div>
        {/* <div>search</div> */}
      </div>
      <Search />
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
        >
          <img
            className="nav_avatar"
            src={sessionUser.avatar_url}
            alt="createCommentAvatar"
          />
        </NavLink>
      </div>
      <div className="navbar__right__side">
        <img
          className="home__create__comment__avatar"
          src={sessionUser.avatar_url}
          alt="createCommentAvatar"
        />
        <div className="nav__profile">{sessionUser.username}</div>
        <div className="logout__container">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
