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
  Alert
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { multiply } from "react-native-reanimated";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
// import EditButton from "react-edit-button"

export default function SingleMatchProfile({route, navigation}) {
  const [matchUser, setMatchUser] = useState([]);
  const [dogInfo, setDogInfo] = useState([])
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = firebase.auth().currentUser;


  const userId = route.params.userID.id
  console.log("in singlematch", userId)


  useEffect(() => {
    (async () => {
      //query gets loggedin user doc from firestore
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          return doc.data();
        });
      setMatchUser(snapshot);
      setDogInfo(snapshot.dogData)
    })();
  }, []);

 // Need a function that checks where "id" "=="

  // const onAddUser = () => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("userLikes")
  //     .add({
  //       fullName: matchUser.fullName,
  //       id: matchUser.id,
  //       match: true,
  //     });
  //     Alert.alert(
  //       `${matchUser.fullName} has been added to your likes! A chat room will automatically be generated if they add you too!`,
  //       [
  //         {
  //           text: "OK",
  //         },
  //       ],
  //       { cancelable: false }
  //     )

  //     createChatRoom()

  //     async function createChatRoom() {
  //       const snapshot = await firebase
  //         .firestore()
  //         .collection("users")
  //         .doc(matchUser.id)
  //         .collection("userLikes")
  //         .where("id", "==", currentUser.uid)
  //         .get();

  //         if (snapshot.empty) {
  //       } else {
  //         Alert.alert(
  //           "Congrats! It's a match!",
  //           "Head to your matches to start chatting!",
  //           [
  //             {
  //               text: "OK",
  //             },
  //           ],
  //           { cancelable: false }
  //         );

  //         const createChat = firebase.firestore().collection("ChatRooms");
  //         createChat.add({
  //           //fields created within Chatroom collection documents
  //           names: `${matchUser.fullName} & ${currentUser.fullName}`,
  //           Users: [currentUser.uid, matchUser.id],
  //         });
  //       }
  //     }

  // };

  function onArrowPress() {
    return (
      navigation.navigate("Home")
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
        <TouchableHighlight onPress={() => onArrowPress()}>
          <Ionicons name="ios-arrow-back" size={24} colors="#EC2379"></Ionicons>
          </TouchableHighlight>
          <Ionicons name="ios-happy" size={24} colors="#EC2379"></Ionicons>
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: matchUser.image }}
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
              //onPress={() => onChatPress()}
            >
              </MaterialIcons>
            </TouchableOpacity>
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
              onPress={() => onAddUser()}
            ></Ionicons>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>
            {matchUser.fullName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Best Buds Dog Lover
          </Text>
        </View>
        <View style={styles.userBio}>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 5 }]}>My Bio</Text>
          <Text style={[styles.text, { fontSize: 14 }]}>
            {matchUser.userBio}
          </Text>
        </View>
        <View style={styles.dogData}>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 5 }]}>
            My Dog
          </Text>
          <Text style={[styles.text, { fontSize: 14 }]}>
            <Text>
              Dog Name: {dogInfo.dogName}
              {"\n"}Dog Breed: {dogInfo.dogBreed}
              {"\n"}Dog Gender: {dogInfo.dogGender}
              {"\n"}Dog Size: {dogInfo.dogSize}
              {"\n"}Dog Temperament: {dogInfo.dogTemperament}
            </Text>

          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

