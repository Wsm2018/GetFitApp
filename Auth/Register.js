import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import { Input, Icon, Divider } from "react-native-elements";
import joi from "react-native-joi";
import firebase from "firebase";

const { height, width } = Dimensions.get("screen");

const schema = joi.object().keys({
  email: joi.string().email(),
  password: joi.string().regex(/^[A-Za-z0-9]{8,30}$/),
});

export default function Register(props) {
  const { setAuthScreen } = props;
  const [email, setEmail] = useState("");
  const [showEmailErr, setShowEmailErr] = useState(false);
  const [username, setUserName] = useState("");
  const [showUserNameErr, setUserNameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordErr, setShowPasswordErr] = useState(false);

  const register = () => {
    if (username === "" || email === "" || password === "") {
      setShowEmailErr(true);
      setUserNameErr(true);
      setShowPasswordErr(true);
      return;
    }

    if (
      !new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
      ).test(password)
    ) {
      setShowPasswordErr(true);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.firestore().collection("User").add({
          email: email,
          displayName: username,
          profilePic:
            "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={background}
        style={{
          width: width,
          height: height,
          backgroundColor: "black",
          flex: 1,
        }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.4 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%",
          }}
        >
          <Image source={logo} style={{ width: 150, height: 200 }} />
        </View>
        <View style={{ flex: 2, marginTop: "15%" }}>
          <View
            style={{
              flex: 1,
              marginLeft: "10%",
              justifyContent: "center",
            }}
          >
            <Input
              placeholder="Email"
              inputStyle={{ color: "white" }}
              leftIconContainerStyle={{ marginRight: "5%" }}
              inputContainerStyle={{ width: "90%" }}
              onChangeText={(v) => {
                setEmail(v);
                if (showEmailErr) setShowEmailErr(false);
              }}
              leftIcon={
                <Icon
                  name="email"
                  type="material-community"
                  size={24}
                  color="white"
                />
              }
            />
          </View>
          {showEmailErr ? (
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <Text style={{ color: "red", fontSize: 15 }}>
                * Invalid Email
              </Text>
            </View>
          ) : null}

          <View
            style={{
              flex: 1,
              marginLeft: "10%",
              justifyContent: "center",
            }}
          >
            <Input
              inputStyle={{ color: "white" }}
              placeholder="UserName"
              secureTextEntry={true}
              onChangeText={(v) => {
                if (showUserNameErr) setUserNameErr(false);
                setUserName(v);
              }}
              inputContainerStyle={{ width: "90%" }}
              leftIconContainerStyle={{ marginRight: "5%" }}
              leftIcon={
                <Icon name="user" type="entypo" size={24} color="white" />
              }
            />
          </View>
          {showUserNameErr ? (
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <Text style={{ color: "red", fontSize: 15 }}>
                * Invalid UserName
              </Text>
            </View>
          ) : null}

          <View
            style={{
              flex: 1,
              marginLeft: "10%",
              justifyContent: "center",
            }}
          >
            <Input
              inputStyle={{ color: "white" }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(v) => {
                setPassword(v);
                if (showPasswordErr) setShowPasswordErr(false);
              }}
              inputContainerStyle={{ width: "90%" }}
              leftIconContainerStyle={{ marginRight: "5%" }}
              leftIcon={
                <Icon name="lock" type="entypo" size={24} color="white" />
              }
            />
          </View>
          {showPasswordErr ? (
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <Text style={{ color: "red", fontSize: 15 }}>
                * Invalid Password
              </Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 0.4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={register}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ff5758",
              width: "80%",
              height: "100%",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: "10%" }}>
          <View style={{ flex: 1, alignItems: "center", marginTop: "10%" }}>
            <Divider
              orientation="horizontal"
              color="white"
              style={{ width: "80%" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10%",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => setAuthScreen("login")}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
