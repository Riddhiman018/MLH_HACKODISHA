import * as React from "react";
import { View, Text } from "react-native";

import * as ImagePicker from "expo-image-picker";

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
      console.log(response);
      return response;
    });
};
export default function CameraPic() {
  React.useEffect(() => {
    takeAndUploadPhotoAsync();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "black" }}>Thanks for uploading the photo</Text>
    </View>
  );
}
