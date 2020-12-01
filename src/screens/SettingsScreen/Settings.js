import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function SettingsScreen({ navigation }) {
	// const [updateEmail, setUpdateEmail] = useState("");
    // const [updatepassword, setUpdatePassword] = useState("");
    
    const onSignOutPress = () => {
		firebase
			.auth.signOut()
			.then((response) => {
            navigation.navigate("Login");
					})
			.catch((error) => {
				alert(error);
			});
	};


    return (
        <div>
            <TouchableOpacity style={styles.button} onPress={() => onSignOutPress()}>
					<Text style={styles.buttonTitle}>Log Out</Text>
			</TouchableOpacity>
        </div>
    )
}