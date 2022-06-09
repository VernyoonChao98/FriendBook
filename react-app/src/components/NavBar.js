import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/1" exact={true} activeClassName="active">
            My Profile
          </NavLink>
          <NavLink to="/profile/2" exact={true} activeClassName="active">
            Profile 2
          </NavLink>
          <NavLink to="/profile/3" exact={true} activeClassName="active">
            Profile 3
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
