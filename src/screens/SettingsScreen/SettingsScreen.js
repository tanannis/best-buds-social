import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
 FlatList
} from "react-native";
import { List, Divider } from "react-native-paper";
import { firebase } from "../../firebase/config";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const user = firebase.auth().currentUser;
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSetLocationPress = () => {
    navigation.navigate("SetLocation");
  };

  const onUpdateEmailPress = () => {
    //only updates to firebase auth
    user
      .updateEmail(newEmail)
      .then(() => {
        Alert.alert("Your email has been changed.");
      })
      .catch((error) => {
        alert(error);
      });

    //also updates to the firestore
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({ email: newEmail });
  };

  const onUpdatePasswordPress = () => {
    user
      .updatePassword(newPassword)
      .then(() => {
        Alert.alert("Your password has been changed.");
      })
      .catch((error) => {
        alert(error);
      });
  };

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

const SettingsData = [
{
  title: "My Location",

},
{
  title: "Account Settings",

},
{
  title: "Log Out",

}
]

const Item = ({ title }) => (
  <View >
    <Text >{title}</Text>
  </View>
);



  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {/* <FlatList data={SettingsData}
    renderItem={Item}> */}
      <FontAwesome
        name="map-marker"
        size={20}
        color="blue"
        onPress={() => onSetLocationPress()}
      > Set Location
      </FontAwesome>

      <TextInput
        style={styles.input}
        placeholder={user.email}
        clearTextOnFocus={true}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setNewEmail(text)}
        value={newEmail}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        textContentType={"oneTimeCode"}
      />
      <FontAwesome
        name="envelope"
        size={20}
        color="blue"
        onPress={() => onUpdateEmailPress()}
      > Update Email </FontAwesome>

      <TextInput
        style={styles.input}
        placeholder="new password"
        clearTextOnFocus={true}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        textContentType={"oneTimeCode"}
      />
      <FontAwesome
        name="lock"
        size={20}
        color="blue"
        onPress={() => onUpdatePasswordPress()}
      > Update Password</FontAwesome>

      <TouchableOpacity onPress={() => onSignOutPress()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      {/* </FlatList> */}
    </View>
  );
}
