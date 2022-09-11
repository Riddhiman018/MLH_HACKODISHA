import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const { height, width } = Dimensions.get("screen");

const Header = ({ title }) => {
  const [fontsLoaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontFamily: "PoppinsSemiBold",
    letterSpacing: 1,
  },
});
