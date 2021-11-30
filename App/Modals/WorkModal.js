import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

export default function WorkModal(props) {
  const { openWorkModal, setOpenWorkModal } = props;
  return (
    <Modal
      isVisible={openWorkModal}
      onSwipeComplete={() => setOpenWorkModal(false)}
      swipeDirection={["down"]}
      style={styles.view}
    >
      <View style={styles.modal}>
        <View></View>
      </View>
      <StatusBar style="dark" backgroundColor="#8AFFAB" />
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
    backgroundColor: "#8AFFAB",
    // height: height,
    // width: width,
  },
});
