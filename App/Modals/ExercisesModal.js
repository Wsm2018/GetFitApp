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
import { Icon, Slider, Header } from "react-native-elements";
import colors from "../colors.json";

import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import { color } from "react-native-reanimated";

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
			<Text style={styles.title}>{item.name}</Text>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => <Item item={item} />;

	const [value, setValue] = useState("");

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
	};

	return (
		<Modal
			isVisible={openExerciseModal}
			onSwipeComplete={() => setOpenExerciseModal(false)}
			swipeDirection={["down"]}
			style={styles.view}
		>
			<View style={styles.modal}>
				<View style={{ flex: 1, alignItems: "center" }}>
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
				</View>

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
	},
    title:{
        fontSize: 19
    }
});
