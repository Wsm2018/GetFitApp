import React, { useState, useEffect } from "react";
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

export default function Start(props) {
  const { navigation } = props;
  const selectedWorkTime = navigation.getParam(
    "selectedWorkTime",
    "No Workout time"
  );
  const selectedRestTime = navigation.getParam(
    "selectedRestTime",
    "No Rest time"
  );
  const selectedSet = navigation.getParam("selectedSet", "No Sets");
  const user = navigation.getParam("user", "No user");
  //   const selectedEx = navigation.getParam("selectedEx", "No selected Exercises");
  const workoutId = navigation.getParam("workoutId", "No workout ID");

  const [count, setCount] = useState(0);

  const selectedEx = [
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
      name: "Sprint",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsprint.png?alt=media&token=3d01e6be-5b04-4095-80c0-e6ea0fddc5e6",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fsprint.png?alt=media&token=23233fa9-163e-47a6-a0af-f925290bedb5",
      id: "8wN4zrnJ0HxbZWdigg7Z",
      isSelected: true,
      started: false,
      name: "Sprint",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsprint.png?alt=media&token=3d01e6be-5b04-4095-80c0-e6ea0fddc5e6",
    },
    {
      blackImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/black%2Fsprint.png?alt=media&token=23233fa9-163e-47a6-a0af-f925290bedb5",
      id: "8wN4zrnJ0HxbZWdigg7Z",
      isSelected: true,
      started: false,
      name: "Sprint",
      whiteImg:
        "https://firebasestorage.googleapis.com/v0/b/getfit-df50e.appspot.com/o/white%2Fsprint.png?alt=media&token=3d01e6be-5b04-4095-80c0-e6ea0fddc5e6",
    },
  ];

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
      <View
        style={{
          flex: 1.5,
          // justifyContent: 'center',
          // alignItems: 'center'
          // flexDirection: "row",
        }}
      >
        <FlatList
          // numColumns={5}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selectedEx}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>

      {/* </View> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Montserrat-MediumItalic", fontSize: 20 }}>
          {`Exercise Name`.toUpperCase()}
        </Text>
      </View>
      <View style={{ flex: 4, backgroundColor: "blue" }}>
        <Text> 3</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 20 }}>
          Sets Completed:
        </Text>
        <Text
          style={{ fontFamily: "Montserrat-SemiBold", fontSize: 20 }}
        >{`${count} / ${selectedEx.length}`}</Text>
      </View>

      <StatusBar style="dark" backgroundColor={colors.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // justifyContent: "center",
    // alignItems: "center",
  },
  item: {
    // backgroundColor: colors.gray,
    padding: 10,
    // marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 100,
    // width: width / 4,
    // height: "50%",
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
});
