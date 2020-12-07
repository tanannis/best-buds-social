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
<<<<<<< HEAD
  MatchesScreen,
  SignedOutScreen,
} from "./src/screens";
=======
  SignedOutScreen,
} from "./src/screens";
import StackNavigator from "./src/navigation/StackNavigator"
>>>>>>> 6507e9e0e3cb40f1be0b87c6a6513b137fe6e475
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

<<<<<<< HEAD
//this will create tab navigation
const Tab = createBottomTabNavigator();
=======
const Tab = createBottomTabNavigator();

>>>>>>> 6507e9e0e3cb40f1be0b87c6a6513b137fe6e475

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
<<<<<<< HEAD

=======
  
  //"Matches" component={StackNavigator} because it needs to have another screen nested inside it in order to navigate.
>>>>>>> 6507e9e0e3cb40f1be0b87c6a6513b137fe6e475
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user ? (
          <>
<<<<<<< HEAD
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
=======
          
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
>>>>>>> 6507e9e0e3cb40f1be0b87c6a6513b137fe6e475
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
