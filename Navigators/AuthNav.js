import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Forgot from "../Auth/ForgotPassword";

LogBox.ignoreAllLogs();

const AuthContainer = () => {
  const [authScreen, setAuthScreen] = useState("login");

  return authScreen === "login" ? (
    <Login setAuthScreen={setAuthScreen} />
  ) : authScreen === "register" ? (
    <Register setAuthScreen={setAuthScreen} />
  ) : (
    <Forgot setAuthScreen={setAuthScreen} />
  );
};

export default AuthContainer;
