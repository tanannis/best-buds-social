import React, { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import styles from "./styles";
//Newly Added
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
// import { SingleChatRoom } from "../index";
import SingleChatRoom from '../SingleChatRoom/SingleChatRoom'

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function MatchesScreen({navigation}) {
	const [searchTerm, setSearchTerm] = useState("");
  const onChangeSearch = (query) => setSearchTerm(query);
  
	return (
		<View>
			<SearchBar
				style={styles.searchbar}
				placeholder="Type Here to Search..."
				onChangeText={onChangeSearch}
				value={searchTerm}
			/>
			<ChatAppStack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "#6646ee",
					},
					headerTintColor: "black",
					headerTitleStyle: {
						fontSize: 22,
					},
				}}
			>
				<ChatAppStack.Screen
					name="SingleChatRoom"
					component={SingleChatRoom}
					options={({ navigation }) => ({
						headerRight: () => (
							<IconButton
								icon="message-plus"
								size={28}
								color="black"
								onPress={() => {navigation.navigate("SingleChatRoom")}}
							/>
						),
					})}
				/>
			</ChatAppStack.Navigator>
		</View>
	);
}

//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html
//Search Bar must be updated when data is in this component.

//Chat Room Documentation: https://amanhimself.dev/blog/chat-app-with-react-native-part-3
//https://edisondevadoss.medium.com/react-native-chat-using-firebase-d4c0ef1ab0b5
