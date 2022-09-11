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
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const SignUp = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

  const [values, setValues] = useState({
    username: "",
    name: "",
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
            <Text style={styles.textStyle}>Create {"\n"}Account</Text>
          </View>

          <View style={{ paddingTop: 10 }}>
            <View style={{ width: width - 35, left: 20 }}>
              <TextInput
                activeOutlineColor="#00D37F"
                label="Name"
                placeholder="Enter your Name"
                value={values.name}
                onChangeText={(text) => setValues({ ...values, name: text })}
                mode="outlined"
              />
            </View>
            <View style={{ marginTop: 20, width: width - 35, left: 20 }}>
              <TextInput
                label="Email"
                activeOutlineColor="#00D37F"
                placeholder="Enter your EmailId"
                value={values.email}
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
                if (
                  values.username.trim() &&
                  values.password.trim() &&
                  values.name.trim()
                ) {
                  axios
                    .post("https://mlhriddhiman.herokuapp.com/register", values)
                    .then((res) => {
                      console.log(res);
                      if (res.status === 200) {
                        navigation.navigate("Home");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  try {
                    await AsyncStorage.setItem("username", values.username);
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  alert("Please fill all the fields");
                }
              }}
              labelStyle={{
                fontSize: 20,
                paddingTop: 7,
                color: "white",
                fontFamily: "Poppins-Light",
              }}
              mode="contained"
              buttonColor="#00D37F"
              style={styles.btnStyle}
            >
              Sign Up
            </Button>
            <Text style={{ textAlign: "center", padding: 5, color: "black" }}>
              Already have an account ?{" "}
              <Text
                onPress={() => {
                  navigation.navigate("Login");
                }}
                style={{
                  color: "#00D37F",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  fontFamily: "Poppins-Light",
                }}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  img: {
    resizeMode: "stretch",
    height: height - 380,
    width: width,
  },

  imageStyle: {
    top: 175,
    left: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 38,
    fontWeight: "500",
    fontFamily: "Poppins-Light",
    color: "white",
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
