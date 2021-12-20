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
import { Icon, Header, Divider } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import colors from "../../colors.json";
const { height, width } = Dimensions.get("screen");
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Modal from "react-native-modal";

export default function DatePickerModal(props) {
  const { openModal, setOpenModal } = { props };

  return (
    <Modal
      isVisible={openModal}
      onSwipeComplete={() => setOpenModal(false)}
      swipeDirection={["down"]}
      style={styles.view}
    >
      {console.log("hello")}
      <View style={styles.modal}>
        <Text>Hello</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modal: {
    flex: 1,
    backgroundColor: colors.rest,
    height: height,
    width: width,
  },
});
