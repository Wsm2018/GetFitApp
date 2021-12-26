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
const { height, width } = Dimensions.get("screen");
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function Start(props) {
  const { navigation } = props;
  const selectedWorkTime = navigation.getParam("selectedWorkTime", 3);
  const selectedRestTime = navigation.getParam("selectedRestTime", 30);
  const selectedSet = navigation.getParam("selectedSet", 3);
  const user = navigation.getParam("user", "No user");
  //   const selectedEx = navigation.getParam("selectedEx", "No selected Exercises");
  const workoutId = navigation.getParam("workoutId", "No workout ID");
  const [timer, setTimer] = useState(selectedWorkTime);
  const [completedSets, setCompletedSets] = useState(0);
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [selectedEx, setSelectedEx] = useState([
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fsquat.png?alt=media&token=2b4673aa-5a5f-438f-b2dd-95568cf17d7b",
      id: "5fBVuMMzw3mKJ7mtzR9S",
      isSelected: true,
      started: true,
      name: "Squats",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsquat.png?alt=media&token=a1457a51-297b-4a56-bb60-0d72593196ee",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fdip-removebg-preview.png?alt=media&token=89b59df9-dbad-49de-b6bc-bdfdf4f52b9a",
      id: "7HtUc7MxV612iv7fLsDx",
      isSelected: true,
      started: false,
      name: "Chest Dip",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fdip-removebg-preview.png?alt=media&token=f93aca3b-577d-4267-af38-74cbaf759622",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fbicyclekicks.png?alt=media&token=38f63606-1698-495c-ad37-6817d20f040d",
      id: "8egRpbgMCfpZOZzm3yGX",
      isSelected: true,
      started: false,
      name: "Bicycle Kicks",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fbicyclekicks.png?alt=media&token=8bea5fbb-1615-46ed-8790-7f16e32bf4fd",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fsprint.png?alt=media&token=23233fa9-163e-47a6-a0af-f925290bedb5",
      id: "8wN4zrnJ0HxbZWdigg7Z",
      isSelected: true,
      started: false,
      name: "Sprint 1",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsprint.png?alt=media&token=3d01e6be-5b04-4095-80c0-e6ea0fddc5e6",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fsprint.png?alt=media&token=23233fa9-163e-47a6-a0af-f925290bedb5",
      id: "ergergergfdf23534",
      isSelected: true,
      started: false,
      name: "Sprint 2",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsprint.png?alt=media&token=3d01e6be-5b04-4095-80c0-e6ea0fddc5e6",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fsprint.png?alt=media&token=23233fa9-163e-47a6-a0af-f925290bedb5",
      id: "345dfzgerg",
      isSelected: true,
      started: false,
      name: "Sprint 3",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsprint.png?alt=media&token=3d01e6be-5b04-4095-80c0-e6ea0fddc5e6",
    },
  ]);

  useEffect(() => {
    let time = null;
    if (timer > 0) {
      console.log("timer -------------> ", timer);
      time = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      if (start) {
        console.log("in here -------------------------------", counter);
        if (counter < selectedEx.length) {
          changeExercise();
          setCounter(counter + 1);
          setTimer(10);
        } else {
          if (completedSets < selectedSet) {
            setCompletedSets(completedSets + 1);
            reset();
          }
        }
      } else {
        console.log("counter 1", counter);
        setCounter(counter + 1);
        setTimer(10);
        setStart(true);
        console.log("counter 2", counter);
      }
    }
    return () => clearTimeout(time);
  }, [timer]);

  useEffect(() => {
    if (start) {
      let per = timer / 10;
      setPercentage(per * 100);
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
    let tempSelected = [...selectedEx];
    tempSelected.map((item) => (item.started = false));
    tempSelected[0].started = true;
    setCounter(1);
    setTimer(10);
    setSelectedEx(tempSelected);
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
            {console.log(
              "line 178",
              counter >= 0 ? selectedEx[counter - 1].name : null,
              " current ",
              counter,
              " previous ",
              counter - 1,
              " length ",
              selectedEx.length
            )}
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
            tintColor={colors.homeWork2}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor={colors.homeWork1}
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
