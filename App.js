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
  CurrentUserScreen,
  SingleMatchProfile,
} from "./src/screens";

import {
  HomeStackNavigator,
  MainStackNavigator,
  MatchesStackNavigator,
  SettingsStackNavigator,
  RegistrationScreenNavigator,
  CurrentUserNavigator,
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

  //Persist Login Credentials, so user doesn't have to login again after quit the app.

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
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
  }, []);
}, [])

  //clean up use effect for memory leak
  useEffect(() => {
    return () => {
      setLoading(false);
    }
  }, [user])

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
                    <FontAwesome name="user" size={35} color="gray" />
                  ),
                }}
              >
                {(props) => <CurrentUserNavigator {...props} extraData={user} />}
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

