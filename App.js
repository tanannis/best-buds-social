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
  MapScreen,
  CurrentUserScreen,
  SingleMatchProfile,
} from "./src/screens";

import {
  HomeStackNavigator,
  MainStackNavigator,
  MatchesStackNavigator,
  SettingsStackNavigator,
  RegistrationScreenNavigator,
} from "./src/navigation/StackNavigator";

import { Text, View } from "react-native";
import { decode, encode } from "base-64";
import { FontAwesome } from "@expo/vector-icons";

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
  // const currentUser = firebase.auth().currentUser

  //Persist Login Credentials, so user doesn't have to login again after quit the app.

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    const query = firebase.auth().onAuthStateChanged((user) => {
      console.log("onauthstate triggered");
      if (user) {
        console.log("user", user);
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            // setLoading(false);
            alert(error);
          });
      } else {
        setUser(false);
        setLoading(false);
      }
    });
    return () => query()
  }, []);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [user])

  if (loading) {
    return (
      <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
      </>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          {user ? (
            <>
              <Tab.Screen
                name="Home"
                // component={MatchesStackNavigator}
                options={{
                  tabBarIcon: () => (
                    <FontAwesome name="home" size={40} color="gray" />
                  ),
                }}
              >
                {(props) => <HomeStackNavigator {...props} extraData={user} />}
              </Tab.Screen>

              <Tab.Screen
                name="Profile"
                options={{
                  tabBarIcon: () => (
                    <FontAwesome name="user" size={40} color="gray" />
                  ),
                }}
              >
                {(props) => <CurrentUserScreen {...props} extraData={user} />}
              </Tab.Screen>

              <Tab.Screen
                name="Matches"
                component={MatchesStackNavigator}
                options={{
                  tabBarIcon: () => (
                    <FontAwesome name="comment" size={30} color="gray" />
                  ),
                }}
              />

              <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                  tabBarIcon: () => (
                    <FontAwesome name="map" size={27} color="gray" />
                  ),
                }}
              />

              <Tab.Screen
                name="Settings"
                component={SettingsStackNavigator}
                options={{
                  tabBarIcon: () => (
                    <FontAwesome name="cog" size={35} color="grey" />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Login"
                component={MainStackNavigator}
                options={{ tabBarVisible: false }}
              />

              <Tab.Screen
                name="Registration"
                component={MainStackNavigator}
                options={{ tabBarVisible: false }}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
