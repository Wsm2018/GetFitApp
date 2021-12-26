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
import { Icon, Header, Divider, Input, Avatar } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import colors from "../../colors.json";
const { height, width } = Dimensions.get("screen");

export default function NonEdit(props) {
  const { user, setEditMode } = props;

  return (
    <>
      <Avatar
        rounded
        size={width / 2.75}
        icon={{ name: "adb", type: "material" }}
        source={{ uri: user && user.profilePic }}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.textStyle}>{user && user.displayName}</Text>
        <TouchableOpacity
          style={{ marginLeft: "2%" }}
          onPress={() => setEditMode(true)}
        >
          <Icon name="edit" type="feather" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "3%",
  },
  textStyle: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
  },
});
