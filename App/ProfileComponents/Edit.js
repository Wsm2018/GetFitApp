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
import db from "../../db";
export default function Edit(props) {
  const { user, setEditMode } = props;
  const [updatedName, setUpdatedName] = useState(user.displayName);

  const handleChangeText = async () => {
    if (updatedName.length === 0) {
      Alert.alert("Username cannot be empty");
    } else {
      await db
        .firestore()
        .collection("Users")
        .doc(db.auth().currentUser.uid)
        .update({ displayName: updatedName });

      setEditMode(false);
    }
  };

  return (
    <>
      <Avatar
        source={{ uri: user && user.profilePic }}
        rounded
        size={width / 2.75}
        icon={{ name: "adb", type: "material" }}
        source={{ uri: user && user.profilePic }}
      />
      <View style={styles.nameContainer}>
        <Input
          placeholder="Username"
          value={updatedName}
          onChangeText={setUpdatedName}
          containerStyle={{ width: width / 2 }}
          underlineColorAndroid={colors.white}
          style={{ color: colors.white }}
        />
        <TouchableOpacity
          style={{ marginLeft: "2%" }}
          onPress={() => handleChangeText()}
        >
          <Icon
            name="checkmark-done"
            type="ionicon"
            color={colors.white}
            size={24}
          />
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
});
