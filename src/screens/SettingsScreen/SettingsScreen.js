import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { firebase } from "../../firebase/config";
import { Login } from "../LoginScreen/LoginScreen";

export default function SettingsScreen({ navigation }) {
  // const [updateEmail, setUpdateEmail] = useState("");
  // const [updatepassword, setUpdatePassword] = useState("");

  const onSignOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        // const user = firestoreDocument.data();
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => onSignOutPress()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
