import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from "./styles";
import StackNavigtor from "../../navigation/StackNavigator";


export default function MatchesScreen() {
    const [searchTerm, setSearchTerm] = useState("");
    const onChangeSearch = query => setSearchTerm(query);

    return (
        <View >
            <SearchBar
            style={styles.searchbar}
            placeholder="Type Here to Search..."
            onChangeText={onChangeSearch}
            value={searchTerm}
            />
            <StackNavigtor/>
        </View>
    )
}

//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html
//Search Bar must be updated when data is in this component.
