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

const AppNavigator = createStackNavigator(
  {
    Login,
    Register,
    Forgot
  },
  {
    headerMode: null,
  }
);

const AuthContainer = createAppContainer(AppNavigator);
const AppContainer = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Home: { screen: Home },
      Profile: {screen: Profile}
    },
    {
      initialRouteName: "Home",
      activeColor: "#f0edf6",
      inactiveColor: "#3e2465",
      barStyle: { backgroundColor: "#694fad" },
    }
  )
);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, [loggedIn]);

  return loggedIn ? <AppContainer /> : <AuthContainer />;
}
