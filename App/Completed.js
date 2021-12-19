import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { Icon, Header } from "react-native-elements";
import db from "../db";
import { StatusBar } from "expo-status-bar";
// import ExerciseModal from "./Modals/ExerciseModal"
import colors from "../colors.json";
const { height, width } = Dimensions.get("screen");
const success = require("../assets/success.png");

export default function Completed(props) {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Image source={success} style={{ width: width / 2 }} />
        <Text style={styles.textStyle}>Workout Completed</Text>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Settings")}>
          <Icon
            name="clipboard-notes"
            type="foundation"
            size={24}
            color={colors.main}
          />
          <Text style={styles.buttonText}>summary</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" backgroundColor={colors.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    width: width,
  },
  topView: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  bottomView: {
    flex: 2,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Montserrat-BoldItalic",
    fontSize: 40,
    textAlign: "center",
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 10,
    width: "80%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // boxSizing: "border-box"
  },
  buttonText: {
    marginLeft: "2%",
    fontFamily: "Montserrat-Bold",
    color: colors.main,
    textTransform: "uppercase",
  },
});
