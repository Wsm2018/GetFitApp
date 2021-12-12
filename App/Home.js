import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Icon, Header } from "react-native-elements";
import db from "../db";
import WorkModal from "./Modals/WorkModal";
import { StatusBar } from "expo-status-bar";
import RestModal from "./Modals/RestModal";
import RepeatModal from "./Modals/RepeatModal";
// import ExerciseModal from "./Modals/ExerciseModal"
import colors from "../colors.json";
import ExerciseModal from "./Modals/ExercisesModal";
const { height, width } = Dimensions.get("screen");

export default function Home(props) {
  const [selectedWorkTime, setSelectedWorkTime] = useState(30);
  const [openWorkModal, setOpenWorkModal] = useState(false);

  const [selectedRestTime, setSelectedRestTime] = useState(30);
  const [openRestModal, setOpenRestModal] = useState(false);

  const [selectedSet, setSelectedSets] = useState(1);
  const [openSetsModal, setOpenSetsModal] = useState(false);

  const [exercises, setExercises] = useState([]);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [selectedEx, setSelectedEx] = useState(null);

  const [totalTime, setTotalTime] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = db
      .firestore()
      .collection("Exercises")
      .onSnapshot((querySnapshot) => {
        const workouts = [];
        querySnapshot.forEach((doc) => {
          workouts.push({ id: doc.id, ...doc.data(), isSelected: false, started: false });
        });
        setExercises([...workouts]);
      });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (selectedEx && selectedEx.length > 0) exSelected();
    else noExSelection();
  }, [selectedEx, selectedSet, selectedRestTime, selectedWorkTime]);

  const getUser = async () => {
    const userRef = await db
      .firestore()
      .collection("Users")
      .doc(db.auth().currentUser.uid)
      .get();
    const userData = userRef.data();
    setUser(userData);
  };

  const exSelected = () => {
    // console.log("selected", selectedEx);
    let total = Number(selectedWorkTime) * selectedEx.length;
    console.log("1", total);
    total += Number(selectedRestTime);
    console.log("2", total);
    total *= selectedSet;
    console.log("3", total);
    let mins = 0;
    let secs = 0;
    mins = (total / 60).toString().split(".")[0];
    console.log("mins", mins);
    secs = (total % 60).toFixed(0);
    console.log("secs", secs);

    mins = formatNumber(mins, "min");
    secs = formatNumber(secs.toString(), "secs");

    setTotalTime(`${mins}:${secs}`);
  };

  const noExSelection = () => {
    console.log("selected work", selectedWorkTime, " rest ", selectedRestTime);
    let total =
      (Number(selectedWorkTime) + Number(selectedRestTime)) * selectedSet;
    console.log("total", total);
    let mins = 0;
    let secs = 0;
    mins = (total / 60).toString().split(".")[0];
    console.log("mins", mins);

    secs = total % 60;

    mins = formatNumber(mins, "min");
    secs = formatNumber(secs.toString(), "secs");
    // console.log("secs", secs);
    setTotalTime(`${mins}:${secs}`);
  };

  const formatNumber = (num, type) => {
    if (type === "min") {
      if (num.length === 1) return `0${num}`;
      else return num;
    } else {
      if (num.length === 1) return `${num}0`;
      else return num;
    }
  };

  const handleAdd = (item) => {
    const tempExercises = [...exercises];

    tempExercises.map((exercise) => {
      if (exercise.name === item.name) {
        if (exercise.isSelected) {
          exercise.isSelected = false;
        } else {
          exercise.isSelected = true;
        }
      }
    });
    setExercises([...tempExercises]);
    // console.log(item)
  };

  const startExercise = () => {
    if (!selectedEx) {
      Alert.alert("Please choose your workouts");
      return;
    }

    db.firestore()
      .collection("Workouts")
      .add({ ...user, totalTime, selectedEx })
      .then((data) => {
        props.navigation.navigate("Start", {
          selectedWorkTime,
          selectedRestTime,
          selectedSet,
          user,
          selectedEx,
          workoutId: data.id,
        });
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
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
      <View
        style={{
          flex: 2,
          backgroundColor: colors.main,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Montserrat-Bold",
            // fontWeight: "bold",
            fontSize: 64,
          }}
        >
          {totalTime ? totalTime : "00:00"}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity
          style={{
            width: "70%",
            backgroundColor: colors.main,
            borderRadius: 10,
          }}
          onPress={() => startExercise()}
        >
          <Icon
            name="controller-play"
            type="entypo"
            color="white"
            size={width / 6.5}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setOpenWorkModal(true)}
          style={{
            width: "80%",
            height: "18%",
            backgroundColor: colors.homeWork1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.homeWork2,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Icon
                color={colors.homeWork2}
                name="play-circle-outline"
                type="ionicon"
                size={35}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Montserrat-Bold",
                  // fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Work
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 23,
                color: colors.homeWork2,
                fontFamily: "Montserrat-Bold",
                // fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              {`00:${selectedWorkTime}`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenRestModal(true)}
          style={{
            width: "80%",
            height: "18%",
            backgroundColor: colors.homeRest1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.homeRest2,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Icon
                color={colors.homeRest2}
                name="pause-circle-outline"
                type="material"
                size={35}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Montserrat-Bold",
                  // fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Rest
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 23,
                color: colors.homeRest2,
                fontFamily: "Montserrat-Bold",
                // fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              {`00:${selectedRestTime}`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenSetsModal(true)}
          style={{
            width: "80%",
            height: "18%",
            backgroundColor: colors.homeSets1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.homeSets2,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Icon
                color={colors.homeSets2}
                name="repeat"
                type="font-awesome"
                size={30}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Montserrat-Bold",
                  // fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Repeat
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 23,
                color: colors.homeSets2,
                fontFamily: "Montserrat-Bold",
                // fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              {selectedSet}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenExerciseModal(true)}
          style={{
            width: "80%",
            height: "18%",
            backgroundColor: colors.homeExer1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.homeExer2,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Icon
                color={colors.homeExer2}
                name="lightning-bolt"
                type="material-community"
                size={30}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Montserrat-Bold",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Exercises
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: "5%",
            }}
          ></View>
        </TouchableOpacity>
      </View>

      <WorkModal
        openWorkModal={openWorkModal}
        setOpenWorkModal={setOpenWorkModal}
        selectedWorkTime={selectedWorkTime}
        setSelectedWorkTime={setSelectedWorkTime}
      />

      <RestModal
        openRestModal={openRestModal}
        setOpenRestModal={setOpenRestModal}
        selectedRestTime={selectedRestTime}
        setSelectedRestTime={setSelectedRestTime}
      />

      <RepeatModal
        openSetsModal={openSetsModal}
        setOpenSetsModal={setOpenSetsModal}
        selectedSet={selectedSet}
        setSelectedSets={setSelectedSets}
      />

      <ExerciseModal
        openExerciseModal={openExerciseModal}
        setOpenExerciseModal={setOpenExerciseModal}
        selectedEx={selectedEx}
        setSelectedEx={setSelectedEx}
        exercises={exercises}
        setExercises={setExercises}
        handleAdd={handleAdd}
      />
      <StatusBar style="light" backgroundColor={colors.main} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  modal: {
    flex: 1,
    backgroundColor: "red",
    height: height,
    width: width,
  },
});
