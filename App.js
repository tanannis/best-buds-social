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
  MatchesScreen,
  SignedOutScreen,
} from "./src/screens";

import { Text } from "react-native";
import { decode, encode } from "base-64";
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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user ? (
          <>
            <Tab.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Tab.Screen>
            <Tab.Screen name="Matches" component={MatchesScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
