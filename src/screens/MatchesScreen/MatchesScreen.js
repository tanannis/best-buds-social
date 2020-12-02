import React, { useState } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from "./styles";

export default function MatchesScreen({ navigation }) {
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
        </View>
    )
}

//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html
//Search Bar must be updated when data is in this component.
