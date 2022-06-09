import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
  return (
    <nav className="nav__container">
      <div>friendbook logo</div>
      <div>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>placeholder for friends</div>
        <div>
          <NavLink to="/profile/1" exact={true} activeClassName="active">
            My Profile
          </NavLink>
          <NavLink to="/profile/2" exact={true} activeClassName="active">
            Profile 2
          </NavLink>
          <NavLink to="/profile/3" exact={true} activeClassName="active">
            Profile 3
          </NavLink>
        </div>
      </div>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;
