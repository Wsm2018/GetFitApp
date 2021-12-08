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
import colors from "../colors.json";
import Toast from 'react-native-toast-message';

import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import { RadioButton } from "react-native-paper";

const { height, width } = Dimensions.get("window");

export default function ExerciseModal(props) {
	const {
		openExerciseModal,
		setOpenExerciseModal,
		selectedEx,
		setSelectedEx,
		exercises,
		setExercises,
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
		// if (val.toString().length === 1) {
		// 	setSelectedEx("00:05");
		// } else {
		// 	setSelectedEx(`00:${val.toString()}`);
		// }
		// setValue(val);
		// setTimeout(() => {
		// 	setOpenExerciseModal(false);
		// }, 1500);
		const selectedExercises = exercises.filter(item => item.isSelected)
		if(selectedExercises.length === 0) {
			
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
				{/* <View style={{ flex: 1, alignItems: "center" }}>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ justifyContent: "center" }}>
							<Icon
								color="white"
								name="lightning-bolt"
								type="material-community"
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
								Exercises
							</Text>
						</View>
					</View>
				</View> */}
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
										fontFamily: "Montserrat-Regular",
										fontWeight: "bold",
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
							<Icon name="checkcircleo" type="antdesign" color="white" size={30} />
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
			<Toast type="error" position="bottom" text1="Hello" text2="World" autoHide={true} />
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
	},
});
