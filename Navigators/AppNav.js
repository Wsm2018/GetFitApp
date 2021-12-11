import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox, Dimensions } from "react-native";
import Home from "../App/Home";
import Settings from "../App/Profile"
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import MenuContent from "./MenuContent"
const { width, height } = Dimensions.get("window");


const DrawerRoutes = {
  Home: {
    name: "Home",
    screen: Home,
  },
  Settings: {
      name: "Settings",
      screen: Settings,
  }
};

const DrawerNav = createDrawerNavigator(DrawerRoutes, {
  drawerWidth: width - width / 4,
  initialRouteName: "Home",
  contentComponent: MenuContent,

});

const AppContainer = createAppContainer(DrawerNav);

export default AppContainer;