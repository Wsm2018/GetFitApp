import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const { height, width } = Dimensions.get("screen");

import { Icon, Header, Divider } from "react-native-elements";
import db from "../db";
import colors from "../colors.json";
import moment from "moment";
import DatePickerModal from "./Modals/DatePickerModal";

export default function Peformance(props) {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "d").format("MMM DD, YYYY")
  );
  const [endDate, setEndDate] = useState(moment().format("MMM DD, YYYY"));
  const [changed, setChanged] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => colors.main,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    const unsub = db
      .firestore()
      .collection("Workouts")
      .where("user", "==", db.auth().currentUser.uid)
      .where("date", ">=", moment(startDate).format("YYYY-MM-DD"))
      .where("date", "<=", moment(endDate).format("YYYY-MM-DD"))
      .onSnapshot((query) => {
        const workouts = [];
        query.forEach((doc) => {
          let totalTime = doc.data().totalTime;
          const split = totalTime.split(":");
          const min = Number(split[0]);
          const seconds = Number(split[1]) / 60;
          totalTime = min + seconds;
          workouts.push(totalTime);
        });

        if (workouts.length != 7) {
          const length = 7 - workouts.length;
          for (let i = 0; i < length; i++) {
            workouts.push(0);
          }
        }
        setData({
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              data: workouts,
            },
          ],
        });
      });
    return () => {
      unsub();
    };
  }, [changed]);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          borderBottomColor: colors.main,
          borderBottomWidth: 1,
        }}
        backgroundColor={colors.main}
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              name="arrow-back"
              type="ionicon"
              color={colors.white}
              size={25}
            />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.textStyle}>Performance</Text>}
      />
      <View style={styles.topView}>
        <Text style={styles.dateText}>{`${startDate} - ${endDate}`}</Text>
        <TouchableOpacity
          style={{ marginRight: "5%" }}
          onPress={() => setOpenModal(!openModal)}
        >
          <Icon name="filter" type="font-awesome" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        {data ? (
          <BarChart
            data={data}
            width={width}
            height={height / 1.5}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            fromZero={true}
            withInnerLines={false}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.main} />
          </View>
        )}
      </View>
      <DatePickerModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setChanged={setChanged}
        changed={changed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textStyle: {
    fontFamily: "Montserrat-Medium",
    color: colors.white,
    fontSize: 20,
  },
  topView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomView: {
    flex: 7,
  },
  dateText: {
    color: "black",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    marginLeft: "5%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
