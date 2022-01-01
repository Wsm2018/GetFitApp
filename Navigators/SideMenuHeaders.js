import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../colors.json";

//make a compontent
const { height, width } = Dimensions.get("window");

const SideMenuHeaders = ({ headerStyle, user }) => {
  return (
    <View style={[styles.viewStyle, headerStyle]}>
      <View style={{ backgroundColor: colors.white, borderRadius: 100 }}>
        <Image
          style={{
            aspectRatio: 1 / 1,
            height: height / 8,
          }}
          source={{ uri: user && user.profilePic }}
        />
      </View>
      <View style={styles.headerTextStyle}>
        <Text style={{ color: colors.white,fontFamily: "Montserrat-Bold", fontSize: 18 }}>
          {user ? user.displayName : "loading.."}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight,
    borderBottomColor: colors.white,
    borderBottomWidth: 0.2,
    position: "relative",
    flexDirection: "column",
    // marginLeft: height / 50,
    // marginRight: height / 50,
    height: height / 4.5,
    backgroundColor: colors.main,
  },
  textStyle: {
    fontSize: 20,
    color: colors.white,
  },
  headerTextStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  iconStyle: {},
  userImageView: {
    width: height / 9,
    height: height / 9,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ProfileNameStyle: {
    fontWeight: "bold",
    color: colors.WHITE,
    fontSize: 15,
  },
  iconViewStyle: {
    width: 150,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  emailStyle: {
    color: colors.white,
    fontSize: 13,
    marginLeft: 4,
    textAlign: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
};
//make the component available to other parts of the app
export default SideMenuHeaders;
