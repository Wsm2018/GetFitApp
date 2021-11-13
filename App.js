import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Forgot from "./Auth/ForgotPassword";
import Home from "./App/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import db from "./db";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, [loggedIn]);

  return loggedIn ? (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
      <StatusBar translucent backgroundColor="transparent" />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar translucent backgroundColor="transparent" />
    </NavigationContainer>
  );
}

