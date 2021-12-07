import firebase from 'firebase'
import React, {useState, useEffect} from 'react'
import {View, Text, Button} from "react-native"

export default function Profile(props) {
    return (
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
            <Text>Profile</Text>
            <Button title="Logout" onPress={() => firebase.auth().signOut()} />
        </View>
    )
}