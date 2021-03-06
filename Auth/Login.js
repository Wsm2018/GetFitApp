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
import "firebase/auth";
const { height, width } = Dimensions.get("screen");
import db from "../db";
const schema = joi.object().keys({
  email: joi.string().email(),
  password: joi.string().regex(/^[A-Za-z0-9]{8,30}$/),
});

function Login(props) {
  const { setAuthScreen } = props;
  const [email, setEmail] = useState("");
  const [showEmailErr, setShowEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordErr, setShowPasswordErr] = useState(false);

  const login = () => {
    joi.validate({ email: email, password: password }, schema, (err, value) => {
      if (err) {
        Alert.alert(err.details[0].message);
      } else {
        db.auth().signInWithEmailAndPassword(email, password);
      }
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
              inputStyle={{ color: "white", fontFamily: "Montserrat-Regular" }}
              leftIconContainerStyle={{ marginRight: "5%" }}
              inputContainerStyle={{ width: "90%" }}
              onChangeText={(v) => setEmail(v)}
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
              inputStyle={{ color: "white", fontFamily: "Montserrat-Regular" }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(v) => setPassword(v)}
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

          <TouchableOpacity
            style={{ flex: 0.5, alignItems: "flex-end", marginRight: "15%" }}
            onPress={() => setAuthScreen("forgot")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Montserrat-Bold",
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => login()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ff5758",
              width: "80%",
              height: "100%",
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}
            >
              Log In
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
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}
            >
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => setAuthScreen("register")}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default Login;
