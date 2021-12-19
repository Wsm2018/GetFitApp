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
import AuthContainer from "./Navigators/AuthNav";
import colors from "./colors.json";
import AppContainer from "./Navigators/AppNav";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	let [fontsLoaded] = useFonts({
		"Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
		"Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
		"Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
		"Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
		"Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
		"Montserrat-MediumItalic": require("./assets/fonts/Montserrat-MediumItalic.ttf"),
		"Montserrat-BoldItalic": require("./assets/fonts/Montserrat-BoldItalic.ttf")
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
