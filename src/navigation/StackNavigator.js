import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from 'react-native'

import {SingleChatRoom} from "../screens/index";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
};


export default function StackNavigator({navigation}) {
  console.log("This is navigation", navigation)
  return (
    <>
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SingleChat" component={SingleChatRoom} />
    </Stack.Navigator>
    <TouchableOpacity onPress={() => navigation.navigate('SingleChat')}>
    <Text>SingleChatRoom</Text>
</TouchableOpacity>
</>
    // <Stack.Navigator screenOptions={screenOptionStyle}>
    //   <Stack.Screen name="SingleChat" onPress={() => navigation.navigate('SingleChat')}component={SingleChatRoom} />
    //   {/* <TouchableOpacity >
    //                 <Text>SingleChatRoom</Text>
    //             </TouchableOpacity> */}
    // </Stack.Navigator>
  );
};

