import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/ProfilePage/User";

import SplashPage from "./components/SplashPage/SplashPage";
import Home from "./components/Home/Home";
import FriendsPage from "./components/FriendsPage/FriendsPage";

import { authenticate } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          <NavBar />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/friends" exact={true}>
          <NavBar />
          <FriendsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:userId" exact={true}>
          <NavBar />
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
