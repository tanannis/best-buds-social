import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  SettingsScreen,
  SignedOutScreen,
} from "./src/screens";
import StackNavigator from "./src/navigation/StackNavigator"
import { Text } from "react-native";
import { decode, encode } from "base-64";
import { FontAwesome } from "@expo/vector-icons"
import { color } from "react-native-reanimated";


if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Tab = createBottomTabNavigator();


export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //Persist Login Credentials, so user doesn't have to login again after quit the app.

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setUser(false);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <>
        <Text>Loading Messages...</Text>
      </>
    );
  }
  
  //"Matches" component={StackNavigator} because it needs to have another screen nested inside it in order to navigate.
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user ? (
          <>
          
            <Tab.Screen name="Home" options={{tabBarIcon:()=> <FontAwesome name="home" size={40} color='gray'/>}}>
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Tab.Screen>
            <Tab.Screen name="Matches" component={StackNavigator}
            options={{tabBarIcon:()=> <FontAwesome name="comment" size={30} color='gray'/>}} />
            <Tab.Screen name="Settings" component={SettingsScreen} 
            options={{tabBarIcon:()=> <FontAwesome name="cog" size={35} color='grey' 
            />}}/>
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={LoginScreen} options={{tabBarVisible: false}}/>
            <Tab.Screen name="Registration" component={RegistrationScreen} options={{tabBarVisible: false}}/>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
