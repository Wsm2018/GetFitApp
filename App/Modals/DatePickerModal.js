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
import { Icon, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import colors from "../../colors.json";
const { height, width } = Dimensions.get("screen");
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Modal from "react-native-modal";

export default function DatePickerModal(props) {
  const {
    openModal,
    setOpenModal,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setChanged,
    changed,
  } = props;

  const dateChange = (date, type) => {
    console.log(date, type);
    if (type === "startDate") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleConfirm = () => {
    const num = moment(endDate).subtract(7, "d").format("YYYY-MM-DD");
    if (moment(startDate).isBefore(endDate)) {
      if (moment(startDate).isSame(num)) {
        setChanged(!changed);
        setOpenModal(false);
      } else {
        Alert.alert("Please select within one week range");
      }
    } else {
      Alert.alert("Start Date cannot be greater than End Date");
    }
  };

  return (
    <Modal
      isVisible={openModal}
      onSwipeComplete={() => setOpenModal(false)}
      swipeDirection={["down"]}
      onBackdropPress={() => setOpenModal(false)}
      style={styles.view}
    >
      {/* Title Container */}
      <View style={styles.modal}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Date Range</Text>
          <TouchableOpacity onPress={() => setOpenModal(false)}>
            <Icon
              name="close-circle-outline"
              type="ionicon"
              size={width / 12}
              style={{ marginRight: "3%" }}
            />
          </TouchableOpacity>
        </View>

        {/* Dates Container */}
        <View
          style={{
            flex: 2,
            // backgroundColor: "blue",
            justifyContent: "flex-start",
            marginLeft: "3%",
          }}
        >
          <View>
            <Text style={styles.labelStyle}>Start Date:</Text>
            <DatePicker
              placeholder="Start Date:"
              mode="date"
              date={moment(startDate).format("YYYY-MM-DD")}
              format="YYYY-MM-DD"
              confirmBtnText="CONFIRM"
              onDateChange={(date) => dateChange(date, "startDate")}
              maxDate={moment().format("YYYY-MM-DD")}
              //   showIcon={false}
              style={{ width: "100%" }}
              customStyles={{
                dateInput: {
                  borderRadius: 5,
                },
                // ... You can check the source to find the other keys.
              }}
            />
          </View>

          <View style={{ marginTop: "5%" }}>
            <Text style={styles.labelStyle}>End Date:</Text>
            <DatePicker
              //   showIcon={false}
              placeholder="End Date:"
              mode="date"
              date={moment(endDate).format("YYYY-MM-DD")}
              format="YYYY-MM-DD"
              confirmBtnText="CONFIRM"
              onDateChange={(date) => dateChange(date, "endDate")}
              maxDate={moment().format("YYYY-MM-DD")}
              style={{ width: "100%" }}
              customStyles={{
                dateInput: {
                  borderRadius: 5,
                },
                // ... You can check the source to find the other keys.
              }}
            />
          </View>
        </View>

        {/* Confirm Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleConfirm()}
          >
            <Icon
              name="checkmark-circle-outline"
              type="ionicon"
              size={width / 14}
              color={colors.main}
              style={{ marginRight: "3%" }}
            />
            <Text style={styles.confirmTextStyle}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
    // height: height / 3,
  },
  modal: {
    flex: 0.5,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.main,
    width: "80%",
    height: "65%",
    borderRadius: 10,
  },
  confirmTextStyle: {
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    color: colors.main,
    textTransform: "uppercase",
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: "3%",
    color: "black",
  },
  titleContainer: {
    flex: 0.75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelStyle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
  },
});
