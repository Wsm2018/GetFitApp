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

const { height, width } = Dimensions.get("screen");

export default function Home(props) {
	const [exercises, setExercises] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [selectedEx, setSelectedEx] = useState(null);
	const [selectedWorkTime, setSelectedWorkTime] = useState("");
	const [selectedRestTime, setSelectedRestTime] = useState("");
	const [sets, setSets] = useState(1);

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
						fontFamily: "Montserrat",
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
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(99, 255, 4, 0.3)",
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
									fontFamily: "Montserrat",
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
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(255, 0, 0, 0.3)",
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
							{selectedWorkTime.length !== 0 ? selectedWorkTime : "00:30"}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(0, 41, 255, 0.3)",
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
							{sets}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: "80%",
						height: "18%",
						backgroundColor: "rgba(255, 199, 0, 0.3)",
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

			<Modal
				testID={"modal"}
				isVisible={openModal}
				onSwipeComplete={() => setOpenModal(false)}
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
			</Modal>
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
});
