import * as React from "react";
import { View, Text, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

export default function CameraPic() {
  const [user, setUser] = React.useState();
  const [responseData, setResponseData] = React.useState();

  const takeAndUploadPhotoAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }
    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });

    return await fetch("https://mlhriddhiman.herokuapp.com/uploadImage", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setResponseData(response.url);
        console.log(response.url);
        return response;
      });
  };

  React.useEffect(() => {
    // takeAndUploadPhotoAsync();
    getData();
  }, []);

  async function getData() {
    try {
      let value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUser(value);
        return value;
      }
    } catch (e) {
      console.log(e);
    }

    heart;
  }
  const url = `${responseData}?username=${user}`;

  async function model() {
    await Linking.openURL(url);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => model()}>
        Your Model is ready please click to view
      </Button>
    </View>
  );
}
