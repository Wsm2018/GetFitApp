import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
    FlatList,
    SafeAreaView,
	Dimensions,
} from "react-native";
import firebase from "firebase";
import Modal from "react-native-modal";
import db from "../db";

const { height, width } = Dimensions.get("screen");

const Item = ({ title }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{title}</Text>
	</View>
);

export default function Home(props) {
	const [exercises, setExercises] = useState([]);
	const [openModal, setOpenModal] = useState(false);
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

	const renderItem = ({ item }) => <Item title={item.name} />;

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Home</Text>
			<TouchableHighlight onPress={() => firebase.auth().signOut()}>
				<Text>Logout</Text>
			</TouchableHighlight>

			<TouchableHighlight onPress={() => setOpenModal(true)}>
				<Text>Show Exercises</Text>
			</TouchableHighlight>

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
