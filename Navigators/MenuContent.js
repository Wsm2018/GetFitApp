import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import SideMenuHeaders from "./SideMenuHeaders";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import db from "../db";
import colors from "../colors.json";

const { width, height } = Dimensions.get("window");

export default function SideMenu(props) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const user = (
      await db
        .firestore()
        .collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .get()
    ).data();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const sideMenuListUser = [
    { name: "Home", navigationName: "Home", icon: "home", type: "ant-design" },
    {
      name: "Settings",
      navigationName: "Settings",
      icon: "settings",
      type: "feather",
    },
    { name: "Logout", icon: "logout", type: "material" },
  ];

  //navigation to screens from side menu
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };

  return (
    <View style={styles.mainViewStyle}>
      <SideMenuHeaders
        headerStyle={styles.myHeader}
        user={user && user}
      ></SideMenuHeaders>
      <View style={styles.compViewStyle}>
        <FlatList
          data={user && sideMenuListUser}
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          renderItem={({ item, index }) => {
            return item.name === "Logout" ? (
              <TouchableOpacity
                onPress={() => firebase.auth().signOut()}
                style={[styles.menuItemView]}
              >
                <View style={styles.viewIcon}>
                  <Icon
                    name={item.icon}
                    type={item.type}
                    color={colors.main}
                    size={20}
                    containerStyle={styles.iconStyle}
                  />
                </View>
                <Text style={styles.menuName}>{item.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={navigateToScreen(item.navigationName)}
                style={[styles.menuItemView]}
              >
                <View style={styles.viewIcon}>
                  <Icon
                    name={item.icon}
                    type={item.type}
                    color={colors.main}
                    size={20}
                    containerStyle={styles.iconStyle}
                  />
                </View>
                <Text style={styles.menuName}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  myHeader: {
    marginTop: 0,
  },
  vertialLine: {
    width: 1,
    backgroundColor: colors.gray,
    position: "absolute",
    left: 22,
    top: 24,
  },
  menuItemView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: height / 70,
    paddingBottom: height / 70,
    borderBottomColor: colors.white,
    borderBottomWidth: 0.2,
    marginLeft: height / 50,
    marginRight: height / 50,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 70,
    // backgroundColor:"red"
  },
  viewIcon: {
    width: 28,
    // height: 24,
    aspectRatio: 1 / 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.main,
    // borderColor: colors.white,
    // borderWidth: 1,
    left: 1,
  },
  menuName: {
    color: colors.main,
    // fontWeight: 'bold',
    fontSize:18,
    marginLeft: 8,
    width: "100%",
  },
  mainViewStyle: {
    backgroundColor: colors.background,
    height: "100%",
    // height: height,
    //justifyContent:'space-between'
  },
  compViewStyle: {
    position: "relative",

    // flex: 10,
    // height: height-180-80,
    // backgroundColor:"blue"
  },
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
