import React, { useState } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from "./styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function MatchesScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState("");
    const onChangeSearch = query => setSearchTerm(query);

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
