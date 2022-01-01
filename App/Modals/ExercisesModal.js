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
  Image,
  Alert,
} from "react-native";
import { Icon, Slider, Header } from "react-native-elements";
import colors from "../../colors.json";

import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import { RadioButton } from "react-native-paper";
import uuid from "react-native-uuid";

const { height, width } = Dimensions.get("window");

export default function ExerciseModal(props) {
  const {
    openExerciseModal,
    setOpenExerciseModal,
    setSelectedEx,
    exercises,
    handleAdd,
  } = props;

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleAdd(item)}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <RadioButton
          status={item.isSelected ? "checked" : "unchecked"}
          color={colors.exercises}
        />

        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View>
        <Image
          source={{ uri: item.blackImg }}
          style={{ height: 50, width: 50 }}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  const confirm = () => {
    const selectedExercises = exercises.filter((item) => item.isSelected);
    if (selectedExercises.length === 0) {
      Alert.alert("Please select an exercise");
    } else {
      console.log("before  ", selectedExercises);

      for (let i = 0; i < selectedExercises.length; i++) {
        const rest = {
          blackImg:
            "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Frest.png?alt=media&token=765e9789-d8dc-4308-8a16-91478d4a23f2",
          id: uuid.v4(),
          isSelected: true,
          name: "Rest",
          started: false,
          whiteImg:
            "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Frest-white.png?alt=media&token=1bfd23d5-4248-42ad-a6b1-0b740b47a224",
        };

        if (i % 2 === 1) {
          selectedExercises.splice(i, 0, rest);
        }
      }

    //   console.log("after  ", selectedExercises);
        setSelectedEx(selectedExercises);
        setOpenExerciseModal(false);
    }
  };

  return (
    <Modal
      isVisible={openExerciseModal}
      onSwipeComplete={() => setOpenExerciseModal(false)}
      swipeDirection={["down"]}
      style={styles.view}
    >
      <View style={styles.modal}>
        <Header
          backgroundColor={colors.exercises}
          centerComponent={
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <Icon
                  color="white"
                  name="lightning-bolt"
                  type="material-community"
                  size={30}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Montserrat-Bold",
                    // fontWeight: "bold",
                    letterSpacing: 1,
                    color: "white",
                  }}
                >
                  Exercises
                </Text>
              </View>
            </View>
          }
          rightComponent={
            <TouchableOpacity onPress={() => confirm()}>
              <Icon
                name="checkcircleo"
                type="antdesign"
                color="white"
                size={30}
              />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 8 }}>
          <FlatList
            data={exercises}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      <StatusBar style="dark" backgroundColor={colors.exercises} />
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
    backgroundColor: colors.exercises,
    // height: height,
    // width: width,
  },
  item: {
    backgroundColor: colors.exerciseBg,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 19,
    fontFamily: "Montserrat-Medium",
  },
});
