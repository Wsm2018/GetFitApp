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
		<View style={{ flex: 1 }}>
			<ScrollView
				horizontal={true}
				contentContainerStyle={{
					flex: 1,
					// backgroundColor: "red",
					justifyContent: "space-evenly",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>
				
				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						backgroundColor: "#5c5454",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="add" type="ionicon" size={24} color="white" />
				</TouchableOpacity>
				
				{/* <TouchableOpacity onPress={() => setOpenModal(true)}>
					<Text>Show Exercises</Text>
				</TouchableOpacity> */}
			</ScrollView>
			<View style={{ flex: 1, backgroundColor: "green" }}></View>
			<View style={{ flex: 4, backgroundColor: "blue" }}></View>
			<View style={{ flex: 1, backgroundColor: "yellow" }}></View>
			<View
				style={{
					flex: 1,
					backgroundColor: "black",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: "#ff3333",
						borderRadius: 50,
						width: width / 6,
						height: "30%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: "5%",
					}}
				>
					<Icon name="play" type="ionicon" size={24} color="white" />
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
