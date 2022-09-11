import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { useFonts } from "expo-font";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  return (
    <ScrollView>
      <SafeAreaView>
        <StatusBar backgroundColor="#00D37F" style="light" />
        <View>
          <Image
            style={styles.img}
            source={require("../assets/images/background.png")}
          />
          <View style={styles.imageStyle}>
            <Text style={styles.textStyle}>Welcome {"\n"}Back</Text>
          </View>

          <View style={{ paddingTop: 15 }}>
            <View style={{ width: width - 35, left: 20 }}>
              <TextInput
                activeOutlineColor="#00D37F"
                label="Email"
                placeholder="Enter your email"
                theme={{ fonts: { regular: "Poppins-Light" } }}
                value={values.username}
                keyboardType="email-address"
                onChangeText={(text) =>
                  setValues({ ...values, username: text })
                }
                mode="outlined"
              />
            </View>
            <View style={{ marginTop: 20, width: width - 35, left: 20 }}>
              <TextInput
                label="Password"
                activeOutlineColor="#00D37F"
                placeholder="Enter your password"
                value={values.password}
                secureTextEntry={true}
                onChangeText={(text) =>
                  setValues({ ...values, password: text })
                }
                mode="outlined"
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <Button
              onPress={async () => {
                if (values.username && values.password) {
                  axios
                    .post("https://mlhriddhiman.herokuapp.com/login", values)
                    .then((res) => {
                      console.log(res.data);
                      if (res.data.Message === "User verified") {
                        AsyncStorage.setItem("username", values.username);
                        navigation.navigate("Home");
                      }
                    })

                    .catch((err) => {
                      alert(err.response.data.Message);
                    });
                } else if (values.username === "") {
                  alert("Please enter your email");
                } else if (values.password === "") {
                  alert("Please enter your password");
                } else {
                  alert("Please enter your email and password");
                }
              }}
              labelStyle={{
                fontSize: 20,
                paddingTop: 8,
                fontFamily: "Poppins-Light",
              }}
              mode="contained"
              buttonColor="#00D37F"
              style={styles.btnStyle}
            >
              Login
            </Button>
            <Text
              style={{
                textAlign: "center",
                padding: 6,
                fontFamily: "Poppins-Light",
              }}
            >
              OR
            </Text>
            <Button
              onPress={() => navigation.navigate("SignUp")}
              labelStyle={{
                fontFamily: "Poppins-Light",
                fontSize: 20,
                paddingTop: 7,
                color: "black",
              }}
              mode="outlined"
              style={styles.btnStyle}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    resizeMode: "stretch",
    height: height - 350,
    width: width,
  },

  imageStyle: {
    top: 190,
    left: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 35,
    color: "white",
    fontFamily: "Poppins-Light",
  },

  btnContainer: {
    paddingTop: 25,
    width: width - 35,
    left: 20,
  },

  btnStyle: {
    borderRadius: 8,
    height: 50,
  },
});

export default Login;
