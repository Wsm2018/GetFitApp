import React, { useState, useEffect } from "react";
import Home from "./App/Home";
import Profile from "./App/Profile";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import db from "./db";
import AuthContainer from "./Auth/AuthNav";
import colors from "./App/colors.json";

const AppContainer = createAppContainer(
	createMaterialBottomTabNavigator(
		{
			Home: { screen: Home },
			Profile: { screen: Profile },
		},
		{
			initialRouteName: "Home",
			activeColor: colors.main,
			inactiveColor: colors.inactive,
			barStyle: { backgroundColor: colors.background },
			defaultNavigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ focused, horizontal, tintColor }) => {
					const { routeName } = navigation.state;
					let IconComponent = FontAwesome;
					let iconName;
					let tintColorColor;
					if (routeName === "Home") {
						iconName = "home";
						tintColorColor = focused ? colors.main : colors.inactive;
					} else if (routeName === "Profile") {
						iconName = "user";
						tintColorColor = focused ? colors.main : colors.inactive;
					}

					// You can return any component that you like here!
					return (
						<IconComponent name={iconName} size={25} color={tintColorColor} />
					);
				},
			}),
		}
	)
);

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	let [fontsLoaded] = useFonts({
		"Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
		"Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
		"Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
		"Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
		"Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
	});

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(setLoggedIn);
	}, [loggedIn]);

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return loggedIn !== false ? (
			loggedIn !== null ? (
				<AppContainer />
			) : (
				<AuthContainer />
			)
		) : null;
	}
}
