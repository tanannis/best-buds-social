import React, { useState } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from "./styles";
//Newly Added
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { SingleChatRoom } from "../SingleChatRoom"

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function MatchesScreen() {
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}
    >
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          )
        })}
      />
      {/* Add this */}
      <ChatAppStack.Screen name="Room" component={RoomScreen} />
    </ChatAppStack.Navigator>
  );
}

// rest of the code remains same

    //searchbar code below
    // const [searchTerm, setSearchTerm] = useState("");
    // const onChangeSearch = query => setSearchTerm(query);

    // return (
        //Search bar code below
        // <View >
        //     <SearchBar
        //     style={styles.searchbar}
        //     placeholder="Type Here to Search..."
        //     onChangeText={onChangeSearch}
        //     value={searchTerm}
        //     />
        // </View>
    // )
// }

//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html
//Search Bar must be updated when data is in this component.

//Chat Room Documentation: https://amanhimself.dev/blog/chat-app-with-react-native-part-3
//https://edisondevadoss.medium.com/react-native-chat-using-firebase-d4c0ef1ab0b5
