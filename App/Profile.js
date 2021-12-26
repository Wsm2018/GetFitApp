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
import { Icon, Header, Divider, Input } from "react-native-elements";
import db from "../db";
import { StatusBar } from "expo-status-bar";
import colors from "../colors.json";
const { height, width } = Dimensions.get("screen");
import NonEdit from "./ProfileComponents/NonEdit";
import Edit from "./ProfileComponents/Edit";
const settings = [
  "Weekly Peformance",
  "FAQ",
  "Support",
  "Terms and Conditions",
];

export default function Profile(props) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const unsub = db
      .firestore()
      .collection("Users")
      .doc(db.auth().currentUser.uid)
      .onSnapshot((doc) => {
        const userData = doc.data();
        setUser({ ...userData, id: doc.id });
      });
    return () => {
      unsub();
    };
  }, []);

  const handleMove = (index) => {
    index === 0
      ? props.navigation.navigate("Performance")
      : index === 1
      ? props.navigation.navigate("FAQ")
      : null;
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          borderBottomColor: colors.main,
          borderBottomWidth: 1,
        }}
        backgroundColor={colors.main}
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" type="feather" color={colors.white} size={25} />
          </TouchableOpacity>
        }
      />
      <View style={styles.topView}>
        {!editMode ? (
          <NonEdit user={user} setEditMode={setEditMode} />
        ) : (
          <Edit user={user} setEditMode={setEditMode} />
        )}
      </View>
      <View style={styles.bottomView}>
        {settings.map((item, index) => (
          <TouchableOpacity
            style={styles.settingItem}
            key={index}
            onPress={() => handleMove(index)}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 18 }}>
                {item}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                name="chevron-small-right"
                type="entypo"
                size={30}
                style={{ justifyContent: "flex-end" }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <StatusBar style="light" backgroundColor={colors.main} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topView: {
    flex: 2,
    backgroundColor: colors.main,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    flex: 3,
  },
  settingItem: {
    flex: 1,
    flexDirection: "row",
    width: width,
    alignItems: "center",
    marginLeft: "5%",
  },
});
