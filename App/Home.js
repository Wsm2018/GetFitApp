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
} from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import Modal from "react-native-modal";
import db from "../db";
import WorkModal from "./Modals/WorkModal";
import { StatusBar } from "expo-status-bar";
import RestModal from "./Modals/RestModal";
import RepeatModal from "./Modals/RepeatModal";
// import ExerciseModal from "./Modals/ExerciseModal"

const { height, width } = Dimensions.get("screen");

export default function Home(props) {
	const [selectedWorkTime, setSelectedWorkTime] = useState("");
	const [openWorkModal, setOpenWorkModal] = useState(false);

	const [selectedRestTime, setSelectedRestTime] = useState("");
	const [openRestModal, setOpenRestModal] = useState(false);

	const [selectedSet, setSelectedSets] = useState(1);
	const [openSetsModal, setOpenSetsModal] = useState(false);

	const [exercises, setExercises] = useState([]);
	const [openExerciseModal, setOpenExerciseModal] = useState(false);
	const [selectedEx, setSelectedEx] = useState(null);

	const [totalTime, setTotalTime] = useState(null);

	useEffect(() => {
		const unsub = db
			.firestore()
			.collection("Exercises")
			.onSnapshot((querySnapshot) => {
				const workouts = [];
				querySnapshot.forEach((doc) => {
					workouts.push({ id: doc.id, ...doc.data() });
				});
				setExercises([...workouts]);
			});

		return () => {
			unsub();
		};
	}, []);

	const handleAdd = (item) => {
		const tempSelected = [...selectedEx];
		tempSelected.push({ ...item });
		setSelectedEx([...tempSelected]);
	};

	const Item = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => handleAdd(item)}>
			{/* <Text style={styles.title}>{title}</Text> */}
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => <Item item={item} />;

	return (
		<View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
			<View
				style={{
					flex: 3,
					backgroundColor: "#FF7070",
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
						fontWeight: "bold",
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
					style={{ width: "70%", backgroundColor: "#FF7070", borderRadius: 10 }}
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
						backgroundColor: "rgba(99, 255, 4, 0.2)",
						borderRadius: 10,
						borderWidth: 1,
						borderColor: "rgba(99, 255, 4, 1)",
						justifyContent: "center",
						flexDirection: "row",
					}}
				>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Icon
								color="rgba(99, 255, 4, 1)"
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
									fontFamily: "Montserrat-Regular",
									fontWeight: "bold",
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
								color: "rgba(99, 255, 4, 1)",
								fontFamily: "Montserrat",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							{selectedWorkTime.length !== 0 ? selectedWorkTime : "00:30"}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setOpenRestModal(true)}
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(255, 0, 0, 0.2)",
						borderRadius: 10,
						borderWidth: 1,
						borderColor: "red",
						justifyContent: "center",
						flexDirection: "row",
					}}
				>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Icon
								color="red"
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
									fontFamily: "Montserrat",
									fontWeight: "bold",
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
								color: "red",
								fontFamily: "Montserrat",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							{selectedRestTime.length !== 0 ? selectedRestTime : "00:30"}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setOpenSetsModal(true)}
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(0, 41, 255, 0.2)",
						borderRadius: 10,
						borderWidth: 1,
						borderColor: "rgb(0, 41, 255)",
						justifyContent: "center",
						flexDirection: "row",
					}}
				>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Icon
								color="rgb(0, 41, 255)"
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
									fontFamily: "Montserrat",
									fontWeight: "bold",
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
								color: "rgb(0, 41, 255)",
								fontFamily: "Montserrat",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							{selectedSet}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(255, 199, 0, 0.2)",
						borderRadius: 10,
						borderWidth: 1,
						borderColor: "rgb(255, 199, 0)",
						justifyContent: "center",
						flexDirection: "row",
					}}
				>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Icon
								color="rgb(255, 199, 0)"
								name="lightning-bolt"
								type="material-community"
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
									fontFamily: "Montserrat",
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
					>
						{/* <Text
							style={{
								fontSize: 23,
								color: "rgb(0, 41, 255)",
								fontFamily: "Montserrat",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							{sets}
						</Text> */}
					</View>
				</TouchableOpacity>
			</View>
			{/* <Text>Home</Text>
			<TouchableHighlight onPress={() => firebase.auth().signOut()}>
				<Text>Logout</Text>
			</TouchableHighlight>

		*/}

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
				selectedSet={selectedRestTime}
				setSelectedSets={setSelectedRestTime}
			/>

			{/* <Modal
        isVisible={openWorkModal}
        onSwipeComplete={() => setOpenWorkModal(false)}
        swipeDirection={["down"]}
        style={styles.view}
      >
        <View style={styles.modal}>
          <Text>sdfs</Text>
        </View>
      </Modal> */}

			{/* <Modal
				testID={"modal"}
				isVisible={openExerciseModal}
				onSwipeComplete={() => setOpenExerciseModal(false)}
				swipeDirection={["down"]}
				style={styles.view}
			>
				<SafeAreaView style={styles.view}>
					<FlatList
						data={exercises}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</Modal> */}
			<StatusBar style="light" backgroundColor="#FF7070" />
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
