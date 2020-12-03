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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function SettingsScreen({ navigation }) {
  // const [updateEmail, setUpdateEmail] = useState("");
  // const [updatepassword, setUpdatePassword] = useState("");

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
    <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => onSignOutPress()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
    <Tab.Navigator>
    <Tab.Screen name="Settings" component={SettingsScreen} />
 </Tab.Navigator>
 </>
  );
}
