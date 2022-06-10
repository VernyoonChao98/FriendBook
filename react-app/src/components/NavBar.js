import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
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
          className="profile"
          to="/profile/1"
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
