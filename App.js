import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Login";
import SignUp from "./src/SignUp";
import Home from "./src/Home";
import Header from "./src/components/Header";
import CameraPic from "./src/Camera";
import SavedNotes from "./src/SavedNotes";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraPic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#00D37F",
            },
            headerTitle: () => <Header title="Saved Notes" />,
            headerBackVisible: false,
            headerRight: () => (
              <FontAwesome5 name="user-circle" size={30} color="white" />
            ),
          }}
          name="Notes"
          component={SavedNotes}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#00D37F",
            },
            headerTitle: () => <Header title="Imagine 3D" />,
            headerBackVisible: false,
            headerRight: () => (
              <FontAwesome5 name="user-circle" size={30} color="white" />
            ),
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
