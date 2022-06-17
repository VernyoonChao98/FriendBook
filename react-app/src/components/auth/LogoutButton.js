import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

import { io } from "socket.io-client";

let socket;

const LogoutButton = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const onLogout = async (e) => {
    socket = io();
    socket.emit("offline", sessionUser);
    await dispatch(logout());
    return () => {
      socket.disconnect();
    };
  };

  return <button className="logout_door" onClick={onLogout}></button>;
};

export default LogoutButton;
