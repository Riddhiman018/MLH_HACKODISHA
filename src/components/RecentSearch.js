import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function RecentSearch(props) {
  return (
    <View
      style={[
        // { width: props.width },
        styles.recentSearchButton,
        styles.shadowProp,
      ]}
    >
      <Text style={styles.recentSearch}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recentSearchButton: {
    backgroundColor: "#fff",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 50,
    // width: 100,
    marginTop: 10,
  },
  recentSearch: {
    fontSize: 15,
    textAlign: "center",
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default RecentSearch;
