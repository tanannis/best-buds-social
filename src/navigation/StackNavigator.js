import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {MatchesScreen, SingleChatRoom} from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
};


export default function StackNavigator() {
  //"SingChat" is nested inside "Matches", so can navigate from "Matches" to "SingleChatRoom"
  return (
    <>
    <NavigationContainer independent={true}>
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="SingleChat" component={SingleChatRoom} />
    </Stack.Navigator>
    </NavigationContainer>
</>
  );
};

