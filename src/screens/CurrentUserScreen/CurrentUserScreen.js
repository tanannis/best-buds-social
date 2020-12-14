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
import MatchesScreen from "../MatchesScreen/MatchesScreen";
import SingleChatRoom from "../SingleChatRoom/SingleChatRoom";
import { TouchableOpacity } from "react-native-gesture-handler";

// import EditButton from "react-edit-button"

export default function CurrentUserScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [dogInfo, setDogInfo] = useState([]);

  const currentPerson = firebase.auth().currentUser.uid;

  const onChatPress = () => {
    console.log("being clicked", onChatPress);
  };

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

      setCurrentUser(snapshot);
      setDogInfo(snapshot.dogData);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.titleBar}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              colors="#EC2379"
            ></Ionicons>
            <Ionicons name="ios-happy" size={24} colors="#EC2379"></Ionicons>
          </View> */}
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={{ uri: currentUser.image }}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
            {/* <View style={styles.chat}> */}
            {/* <TouchableOpacity>
                <MaterialIcons
                  name="chat"
                  size={18}
                  color="#DFD8C8"
                  onPress={() => console.log("inside chat icon")}
                ></MaterialIcons>
              </TouchableOpacity> */}
            {/* </View> */}
            {/* <View style={styles.active}></View> */}
            {/* <View style={styles.add}>
              <Ionicons
                name="ios-add"
                size={48}
                color="#DFD8C8"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Ionicons>
            </View> */}
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>
              {currentUser.fullName}
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              Best Buds Dog Lover
            </Text>
          </View>
          <View style={styles.userBio}>
            <Text
              style={[
                styles.text,
                { fontSize: 18, marginBottom: 18, alignSelf: "flex-start" },
              ]}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  marginTop: 5,
                  marginBottom: 5,
                  alignSelf: "flex-start",
                },
              ]}
            >
              My Bio
            </Text>
            <Text style={[styles.text, { fontSize: 14, marginBottom: 40 }]}>
              {currentUser.userBio}
            </Text>
          </View>
          <View style={styles.dogData}>
            <Text
              style={[
                styles.text,
                { fontSize: 18, marginBottom: 5, alignSelf: "flex-start" },
              ]}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              My Dog
            </Text>
            <View style={[styles.text, { fontSize: 14 }]}>
              <Text style={styles.text}>
                Dog Name: {dogInfo.dogName}
                {"\n"}Dog Breed: {dogInfo.dogBreed}
                {"\n"}Dog Gender: {dogInfo.dogGender}
                {"\n"}Dog Size: {dogInfo.dogSize}
                {"\n"}Dog Temperament: {dogInfo.dogTemperament}
              </Text>
              <Text style={[styles.text, { fontSize: 14, marginBottom: 16 }]}></Text>
            </View>
          </View>
        </ScrollView>
      {/* ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              colors="#EC2379"
            ></Ionicons>
            <Ionicons name="ios-happy" size={24} colors="#EC2379"></Ionicons>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={{ uri: currentUser.image }}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
            <View style={styles.chat}>
              <TouchableOpacity>
                <MaterialIcons
                  name="chat"
                  size={18}
                  color="#DFD8C8"
                  onPress={() => console.log("inside chat icon")}
                ></MaterialIcons>
              </TouchableOpacity>
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
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>
              {currentUser.fullName}
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              Best Buds Dog Lover
            </Text>
          </View>
          <View style={styles.userBio}>
            <Text
              style={[
                styles.text,
                { fontSize: 18, marginBottom: 5, alignSelf: "flex-start" },
              ]}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  marginTop: 25,
                  marginBottom: 5,
                  alignSelf: "flex-start",
                },
              ]}
            >
              My Bio
            </Text>
            <Text style={[styles.text, { fontSize: 14 }]}>
              {currentUser.userBio}
            </Text>
          </View>
          <View style={styles.dogData}>
            <Text
              style={[
                styles.text,
                { fontSize: 18, marginBottom: 5, alignSelf: "flex-start" },
              ]}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  alignSelf: "flex-start",
                  marginTop: 20,
                  marginBottom: 5,
                },
              ]}
            >
              My Dog
            </Text>
            <View style={[styles.text, { fontSize: 14 }]}>
              <Text style={styles.text}>
                Dog Name: {dogInfo.dogName}
                {"\n"}Dog Breed: {dogInfo.dogBreed}
                {"\n"}Dog Gender: {dogInfo.dogGender}
                {"\n"}Dog Size: {dogInfo.dogSize}
                {"\n"}Dog Temperament: {dogInfo.dogTemperament}
              </Text>
              <Text style={[styles.text, { fontSize: 14 }]}></Text>
            </View>
            </View> */}
        {/* </ScrollView> */}
    </SafeAreaView>
  );
}
