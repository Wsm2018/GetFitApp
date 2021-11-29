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

			<View style={{ flex: 3, justifyContent:"space-evenly" }}>
				<TouchableOpacity
					style={{ width: "80%", height: "18%", backgroundColor: "rgba(99, 255, 4, 0.3)", borderRadius: 10 }}
				>
					<Text>1</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ width: "80%", height: "18%", backgroundColor: "rgba(255, 0, 0, 0.3)", borderRadius: 10 }}
				>
					<Text>1</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ width: "80%", height: "18%", backgroundColor: "rgba(0, 41, 255, 0.3)", borderRadius: 10 }}
				>
					<Text>1</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ width: "80%", height: "18%", backgroundColor: "rgba(255, 199, 0, 0.3)", borderRadius: 10 }}
				>
					<Text>1</Text>
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
