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
import styles from "./styles"

export default function SettingsScreen({ navigation }) {
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatepassword, setUpdatePassword] = useState("");

  const onSetLocationPress = () => {
    navigation.navigate("SetLocation");
  };

  onUpdateEmailPress = () => {
    firebase
    .auth()
    .updateEmail()
    .then((response) => {
      const 
    })
  }

  const onSignOutPress = () => {
    firebase
      .auth()
      .signOut()
      // .then((response) => {
      //   navigation.navigate("Login");
      // })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Set Location" onPress={() => onSetLocationPress()}>
      </Button> 

      <TextInput
          style={styles.input}
          placeholder="email@email.com"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUpdateEmail(text)}
          value={updateEmail}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        /><Button title="Update Email"></Button>
        <TextInput
          style={styles.input}
          placeholder="new password"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUpdatePassword(text)}
          value={updateEmail}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        /><Button title="Update Password"></Button>

      <TouchableOpacity onPress={() => onSignOutPress()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
