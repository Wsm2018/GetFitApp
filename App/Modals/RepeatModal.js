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
  Animated,
} from "react-native";
import { Icon, Slider } from "react-native-elements";
import colors from "../colors.json";

import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

export default function RepeatModal(props) {
  const { selectedSet, setSelectedSets, openSetsModal, setOpenSetsModal } =
    props;
  const [value, setValue] = useState("");

  const sets = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const setWorkTime = (val) => {
    setSelectedSets(val.toString());
    setValue(val);

    setTimeout(() => {
      setOpenSetsModal(false);
    }, 1500);
  };

  return (
    <Modal
      isVisible={openSetsModal}
      onSwipeComplete={() => setOpenSetsModal(false)}
      swipeDirection={["down"]}
      style={styles.view}
    >
      <View style={styles.modal}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Icon color="white" name="repeat" type="font-awesome" size={35} />
            </View>
            <View
              style={{
                justifyContent: "center",
                marginLeft: "1%",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "Montserrat-Regular",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  color: "white",
                }}
              >
                Repeat
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 50, fontWeight: "bold" }}>
            {`${selectedSet}X`}
          </Text>
        </View>
        <View style={{ flex: 8, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {sets.map((item) => (
              <Text style={{ color: "white", fontSize: 20 }}>{item}</Text>
            ))}
          </View>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Slider
              value={value}
              // onValueChange={(value) => setWorkTime(value)}
              maximumValue={10}
              minimumValue={1}
              orientation="vertical"
              step={1}
              style={{ height: height / 1.4 }}
              // thumbTintColor="red"
              onSlidingComplete={setWorkTime}
              maximumTrackTintColor={colors.sets}
              minimumTrackTintColor={colors.sets}
              thumbStyle={{
                // height: 20,
                // width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="select-arrows"
                    type="entypo"
                    reverse
                    size={25}
                    containerStyle={{ bottom: 20, right: 15 }}
                    color={colors.sets}
                  />
                ),
              }}
            />
          </View>
        </View>
      </View>
      <StatusBar style="dark" backgroundColor={colors.sets} />
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
    backgroundColor: colors.sets,
    // height: height,
    // width: width,
  },
});
