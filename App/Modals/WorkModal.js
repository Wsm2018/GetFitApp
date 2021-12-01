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

import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

export default function WorkModal(props) {
	const {
		openWorkModal,
		setOpenWorkModal,
		selectedWorkTime,
		setSelectedWorkTime,
	} = props;
	const [value, setValue] = useState("");

	const seconds = [
		"0",
		"5",
		"10",
		"15",
		"20",
		"25",
		"30",
		"35",
		"40",
		"45",
		"50",
		"55",
		"60",
	];

	const setWorkTime = (val) => {
		if (val.toString().length === 1) {
			setSelectedWorkTime("00:05");
		} else {
			setSelectedWorkTime(`00:${val.toString()}`);
		}
		setValue(val);

		setTimeout(() => {
			setOpenWorkModal(false);
		}, 1500);
	};

	return (
		<Modal
			isVisible={openWorkModal}
			onSwipeComplete={() => setOpenWorkModal(false)}
			swipeDirection={["down"]}
			style={styles.view}
		>
			<View style={styles.modal}>
				<View style={{ flex: 1, alignItems: "center" }}>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ justifyContent: "center" }}>
							<Icon
								color="white"
								name="play-circle-outline"
								type="ionicon"
								size={40}
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
									fontSize: 30,
									fontFamily: "Montserrat-Regular",
									fontWeight: "bold",
									letterSpacing: 1,
									color: "white",
								}}
							>
								Work
							</Text>
						</View>
					</View>
				</View>
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Text style={{ color: "white", fontSize: 50, fontWeight: "bold" }}>
						{selectedWorkTime.length === 0 ? "00:00" : selectedWorkTime}
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
						{seconds.map((item) => (
							<Text style={{ color: "white", fontSize: 20 }}>{item}</Text>
						))}
					</View>
					<View
						style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
					>
						<Slider
							value={value}
							// onValueChange={(value) => setWorkTime(value)}
							maximumValue={60}
							minimumValue={0}
							orientation="vertical"
							step={5}
							style={{ height: height / 1.4 }}
							// thumbTintColor="red"
							onSlidingComplete={setWorkTime}
							maximumTrackTintColor="#fff"
							minimumTrackTintColor="#fff"
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
										color="#BEBEBE"
									/>
								),
							}}
						/>
					</View>
				</View>
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
