import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CurrentUserScreen() {
  const [currentUser, setCurrentUser] = useState([]);

  const currentPerson = firebase.auth().currentUser.uid;

  useEffect(() => {
    (async () => {
      //query gets loggedin user doc from firestore
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(currentPerson)
        .get()
        .then((doc) => {
          return doc.data();
        });
      //select fullName field from the doc

      setCurrentUser(snapshot);
    })();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} colors="#EC2379"></Ionicons>
          <Ionicons name="md-more" size={24} colors="#EC2379"></Ionicons>

          <View style={{ alignSelf: "center" }}>
            <View style={styles.text}>
              <Text> {currentUser.fullName}</Text>
            </View>

            <View style={styles.profileImage}>
              {/* <Image
                source={{ uri: currentUser.image }}
                style={styles.image}
                resizeMode="center"
              ></Image> */}
              <Text style={styles.text, styles.userBio}>
                {currentUser.userBio}
              </Text>
            </View>

            <View style={styles.chat}>
              {/* Enter on-click to go to message room with other person. */}
              <MaterialIcons
                name="chat"
                size={18}
                color="#DFD8C8"
              ></MaterialIcons>
            </View>

            <View style={styles.active}></View>
            <View style={styles.add}>
              <Ionicons
                name="ios-add"
                size={48}
                color="#DFD8C8"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Ionicons>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
