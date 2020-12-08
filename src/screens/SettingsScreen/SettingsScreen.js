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

  //OnPress to set your location -> navigate to SetLocationScreen 
  //Display user location by zip code

  const onSetLocationPress = () => {
    navigation.navigate("SetLocation")
  }


  const onSignOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => onSetLocationPress()}>
        <Text>Set Location</Text>
      </TouchableOpacity>
   
      <TouchableOpacity onPress={() => onSignOutPress()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
