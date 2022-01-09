import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { Icon, Header } from "react-native-elements";
import db from "../db";
import { StatusBar } from "expo-status-bar";
import colors from "../colors.json";
const { width } = Dimensions.get("screen");
import { AnimatedCircularProgress } from "react-native-circular-progress";
import uuid from "react-native-uuid";

export default function Start(props) {
  const { navigation } = props;
  const selectedWorkTime = navigation.getParam("selectedWorkTime", 3);
  const selectedRestTime = navigation.getParam("selectedRestTime", 30);
  const selectedSet = navigation.getParam("selectedSet", 3);
  const user = navigation.getParam("user", "No user");
  const selectedExer = navigation.getParam("selectedEx", "No selected Exercises");
  const workoutId = navigation.getParam("workoutId", "No workout ID");
  const [timer, setTimer] = useState(3);
  const [completedSets, setCompletedSets] = useState(0);
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [selectedEx, setSelectedEx] = useState([...selectedExer]);

  useEffect(() => {
    let time = null;
    if (timer > 0) {
      // console.log("timer -------------> ", timer);
      time = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      if (start) {
        console.log("in here -------------------------------", counter);
        if (counter < selectedEx.length) {
          changeExercise();
          setCounter(counter + 1);
          if (selectedEx[counter].name === "Rest") {
            setTimer(selectedRestTime);
          } else {
            setTimer(selectedWorkTime);
          }
        } else {
          if (completedSets < selectedSet) {
            setCompletedSets(completedSets + 1);
            reset();
          } else {
            props.navigation.navigate("Completed");
          }
        }
      } else {
        console.log("counter 1", counter);
        setCounter(counter + 1);
        setTimer(selectedWorkTime);
        setStart(true);
        console.log("counter 2", counter);
      }
    }
    return () => clearTimeout(time);
  }, [timer]);

  useEffect(() => {
    console.log("agrflkAENMRFL;AEKMF", counter);
    if (start) {
      if (selectedEx[counter - 1].name === "Rest") {
        let per = timer / selectedRestTime;
        setPercentage(per * 100);
      } else {
        let per = timer / selectedWorkTime;
        setPercentage(per * 100);
      }
    }
  }, [timer]);

  const changeExercise = () => {
    let tempSelected = [...selectedEx];
    if (counter > 0) {
      tempSelected[counter - 1].started = false;
      tempSelected[counter].started = true;
    }

    setSelectedEx(tempSelected);
  };

  const reset = () => {
    console.log("completedSets", completedSets);
    if (completedSets + 1 === selectedSet) {
      props.navigation.navigate("Completed");
    } else {
      let tempSelected = [...selectedEx];
      tempSelected.map((item) => (item.started = false));
      tempSelected[0].started = true;
      setCounter(1);
      setTimer(selectedWorkTime);
      setSelectedEx(tempSelected);
    }
  };

  const renderItem = ({ item }) => <Item item={item} />;

  const Item = ({ item }) => (
    <TouchableOpacity
      style={
        item.started
          ? [styles.item, styles.started]
          : [styles.item, styles.notStarted]
      }
      onPress={() => handleAdd(item)}
    >
      <Image
        source={item.started ? { uri: item.whiteImg } : { uri: item.blackImg }}
        style={{ height: 50, width: 50 }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1.5 }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selectedEx}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {start && (
          <Text style={{ fontFamily: "Montserrat-MediumItalic", fontSize: 20 }}>
            {counter >= 0 ? selectedEx[counter - 1].name : null}
            {/* {console.log(
              "line 178",
              counter >= 0 ? selectedEx[counter - 1].name : null,
              " current ",
              counter,
              " previous ",
              counter - 1,
              " length ",
              selectedEx.length
            )} */}
          </Text>
        )}
      </View>
      <View style={styles.progressBarContainer}>
        {start && (
          <AnimatedCircularProgress
            size={width / 1.2}
            rotation={0}
            width={15}
            lineCap="round"
            fill={percentage}
            tintColor={
              selectedEx[counter - 1].name === "Rest"
                ? colors.homeRest2
                : colors.homeWork2
            }
            // onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor={
              selectedEx[counter - 1].name === "Rest"
                ? colors.homeRest1
                : colors.homeWork1
            }
          >
            {() => <Text style={{ fontSize: 30 }}>{timer}</Text>}
          </AnimatedCircularProgress>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.textStyle}>Sets Completed:</Text>
        <Text style={styles.textStyle}>
          {`${completedSets} / ${selectedSet}`}
        </Text>
      </View>

      <StatusBar style="dark" backgroundColor={colors.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  item: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 19,
  },
  started: {
    backgroundColor: colors.main,
    borderWidth: 1,
    borderColor: colors.gray,
    borderStyle: "dashed",
  },
  notStarted: {
    backgroundColor: colors.notStarted,
    borderWidth: 1,
    borderColor: colors.black,
    borderStyle: "dashed",
  },
  progressBarContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
  },
});
