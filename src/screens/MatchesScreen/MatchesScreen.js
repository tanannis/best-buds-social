import React, { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import styles from "./styles";
//Newly Added
// import { SingleChatRoom } from "../index";
import SingleChatRoom from '../SingleChatRoom/SingleChatRoom'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();


export default function MatchesScreen() {
	const [searchTerm, setSearchTerm] = useState("");
  const onChangeSearch = (query) => setSearchTerm(query);
  
    return (
        <>
        <View >
            <SearchBar
            style={styles.searchbar}
            placeholder="Type Here to Search..."
            onChangeText={onChangeSearch}
            value={searchTerm}
            />
        </View>
        <Tab.Navigator>
        <Tab.Screen name="Settings" component={SettingsScreen} />
     </Tab.Navigator>
     </>
    )

}

//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html
//Search Bar must be updated when data is in this component.

//Chat Room Documentation: https://amanhimself.dev/blog/chat-app-with-react-native-part-3
//https://edisondevadoss.medium.com/react-native-chat-using-firebase-d4c0ef1ab0b5
