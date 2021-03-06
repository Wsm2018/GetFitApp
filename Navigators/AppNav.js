import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox, Dimensions } from "react-native";
import Home from "../App/Home";
import Settings from "../App/Profile";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import MenuContent from "./MenuContent";
const { width, height } = Dimensions.get("window");
import Start from "../App/Start";
import Completed from "../App/Completed";
import Performance from "../App/Performance";
import FAQ from "../App/FAQ";
const HomeStack = createStackNavigator(
  {
    Home,
    Start,
    Completed,
  },
  {
    headerMode: null,
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings,
    Performance,
    FAQ,
  },
  {
    headerMode: null,
  }
);

const DrawerRoutes = {
  Home: {
    name: "Home",
    screen: HomeStack,
  },
  Settings: {
    name: "Settings",
    screen: SettingsStack,
  },
};

const DrawerNav = createDrawerNavigator(DrawerRoutes, {
  drawerWidth: width - width / 4,
  initialRouteName: "Home",
  contentComponent: MenuContent,
});

const AppContainer = createAppContainer(DrawerNav);

export default AppContainer;
