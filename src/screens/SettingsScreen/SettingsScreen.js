import React, { useEffect, useState } from "react";
import {
	FlatList,
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button,
	Alert,
} from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";

export default function SettingsScreen({ navigation }) {
  const user = firebase.auth().currentUser
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const onSetLocationPress = () => {
		navigation.navigate("SetLocation");
	};

	const onUpdateEmailPress = () => {
    user.updateEmail(newEmail)
			.then(() => {
				Alert.alert("Your email has been changed.");
			})
			.catch((error) => {
				alert(error);
			});
  };
  
  const onUpdatePasswordPress = () => {
    user.updatePassword(newPassword)
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

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Button
				title="Set Location"
				onPress={() => onSetLocationPress()}
			></Button>

			<TextInput
				style={styles.input}
				placeholder={user.email}
				placeholderTextColor="#aaaaaa"
				onChangeText={(text) => setNewEmail(text)}
				value={newEmail}
				underlineColorAndroid="transparent"
				autoCapitalize="none"
				textContentType={"oneTimeCode"}
			/>
			<Button
				title="Update Email"
				onPress={() => onUpdateEmailPress()}
			></Button>

			<TextInput
				style={styles.input}
				placeholder="new password"
				placeholderTextColor="#aaaaaa"
				onChangeText={(text) => setNewPassword(text)}
				value={newPassword}
				underlineColorAndroid="transparent"
				autoCapitalize="none"
				textContentType={"oneTimeCode"}
			/>
			<Button title="Update Password" onPress={() => onUpdatePasswordPress()}></Button>

			<TouchableOpacity onPress={() => onSignOutPress()}>
				<Text>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
}
