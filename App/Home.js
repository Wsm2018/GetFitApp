import React, {useState, useEffect} from 'react'
import {View, Text, TouchableHighlight} from "react-native"
import firebase from "firebase";

export default function Home(props) {
    return (
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
            <Text>Home</Text>
            <TouchableHighlight onPress={() => firebase.auth().signOut()}>
                <Text>Logout</Text>
            </TouchableHighlight>
        </View>
    )
}