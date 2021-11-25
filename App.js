import React, { useState, useEffect } from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Forgot from "./Auth/ForgotPassword";
import Home from "./App/Home";
import Profile from "./App/Profile";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import db from "./db";
import AuthContainer from "./Auth/AuthNav";

const AppContainer = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Home: { screen: Home },
      Profile: { screen: Profile },
    },
    {
      initialRouteName: "Home",
      activeColor: "#000",
      inactiveColor: "#ff3333",
      barStyle: { backgroundColor: "black" },
    }
  )
);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, [loggedIn]);

  return loggedIn !== false ? (
    loggedIn !== null ? (
      <AppContainer />
    ) : (
      <AuthContainer />
    )
  ) : null;
}
