import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import Header from "./components/Header";
import AppLoading from "expo-app-loading";
import {
  MaterialCommunityIcons,
  Foundation,
  FontAwesome5,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

const { height, width } = Dimensions.get("screen");

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  return (
    <SafeAreaView>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              left: 20,
              paddingTop: 5,
            }}
          >
            <MaterialCommunityIcons name="line-scan" size={85} color="white" />
            <Text style={[styles.btnText, { left: 10 }]}>Scan</Text>
            <Text style={[styles.innertxt, { left: width / 4.1 }]}>
              Scan a text to get a 3D view
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.btnContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              left: 20,
              paddingTop: 5,
            }}
          >
            <Foundation name="clipboard-pencil" size={85} color="white" />
            <Text style={styles.btnText}>Saved Notes</Text>
            <Text style={[styles.innertxt, { left: width / 4.6 }]}>
              View saved notes
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.btnContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              left: 20,
              paddingTop: 5,
            }}
          >
            <FontAwesome5 name="tasks" size={85} color="white" />
            <Text style={styles.btnText}>Quizzes</Text>
            <Text style={[styles.innertxt, { left: width / 3.7 }]}>
              Take quizzes
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#00D37F",
    height: height / 8,
    width: width - 40,
    left: 18,
    borderRadius: 3,
    elevation: 5,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 30,
    marginTop: 10,
    left: 20,
    fontFamily: "Poppins-Light",
    color: "white",
  },
  innertxt: {
    fontSize: 13,
    color: "white",
    position: "absolute",
    top: height / 16.5,
    left: width / 3.7,
    fontFamily: "Poppins-Light",
  },
});
