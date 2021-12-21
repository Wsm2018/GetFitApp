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
import db from "../db";
import { StatusBar } from "expo-status-bar";
import colors from "../colors.json";
const { height, width } = Dimensions.get("screen");
import DatePicker from "react-native-datepicker";
import moment from "moment";
import DatePickerModal from "./Modals/DatePickerModal";

export default function Peformance(props) {
	const [startDate, setStartDate] = useState(moment().format("MMM DD, YYYY"));
	const [endDate, setEndDate] = useState(moment().format("MMM DD, YYYY"));
	const [openModal, setOpenModal] = useState(false);

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
			<View style={styles.bottomView}></View>
			<DatePickerModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				startDate={startDate}
				setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
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
		backgroundColor: colors.homeExer1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	bottomView: {
		flex: 7,
		backgroundColor: colors.homeExer2,
	},
	dateText: {
		color: "black",
		fontFamily: "Montserrat-SemiBold",
		fontSize: 20,
		marginLeft: "5%",
	},
});
