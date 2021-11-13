import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import { Input, Icon } from "react-native-elements";

const { height, width } = Dimensions.get("screen");
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [showEmailErr, setShowEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordErr, setShowPasswordErr] = useState(false);

  return (
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
          marginTop: "10%",
        }}
      >
        <Image source={logo} style={{ width: 200, height: 250 }} />
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
            leftIconContainerStyle={{ marginRight: "5%" }}
            inputContainerStyle={{ width: "90%" }}
            onChangeText={setEmail}
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
            <Text style={{ color: "red", fontSize: 15 }}>* Invalid Email</Text>
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
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
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
        >
          <Text style={{ color: "white", fontSize: 15 }}>
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
            Log In
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: "10%" }}></View>
    </ImageBackground>
  );
}
