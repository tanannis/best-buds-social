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
// import EditButton from "react-edit-button"

export default function SingleMatchProfile({navigation}) {
  const [matchUser, setMatchUser] = useState([]);
  const [dogInfo, setDogInfo] = useState([])
  const [index, setIndex] = React.useState(0);
  const currentUser = firebase.auth().currentUser;


  const user = firebase.firestore().collection("users")

  useEffect(() => {
    (async () => {
      //query gets loggedin user doc from firestore
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(user)
        .get()
        .then((doc) => {
          return doc.data();
        });

      setMatchUser(snapshot);
      setDogInfo(snapshot.dogData)
    })();
  }, []);

  const onChatPress = (item) => {
		navigation.navigate("SingleChat", {
			chatInfo: item
		 });
  };
  
  const onAddUser = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("userLikes")
      .add({
        fullName: matchUser[index].fullName,
        id: matchUser[index].id,
        match: true,
      });

    createChatRoom();
  };

  async function createChatRoom() {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(user[index].id)
      .collection("userLikes")
      .where("id", "==", currentUser.uid)
      .get();

    if (snapshot.empty) {
    } else {
      Alert.alert(
        "Congrats! It's a match!",
        "Head to your matches to start chatting!",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );

      const createChat = firebase.firestore().collection("ChatRooms");
      createChat.add({
        //fields created within Chatroom collection documents
        names: `${user[index].fullName} & ${currentUserName}`,
        Users: [currentUser.uid, user[index].id],
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} colors="#EC2379"></Ionicons>
          <Ionicons name="md-more" size={24} colors="#EC2379"></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: matchedUser.image }}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>

          <View style={styles.chat}>
            <TouchchableOpacity>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
              onPress={() => onChatPress()}
            ></MaterialIcons>
            </TouchchableOpacity>
          </View>

          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
              onPress={() => onChatPress()}
            ></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>
            {matchedUser.fullName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Best Buds Dog Lover
          </Text>
        </View>

        <View style={styles.userBio}>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 5 }]}>My Bio</Text>

          <Text style={[styles.text, { fontSize: 14 }]}>
            {matchedUser.userBio}
          </Text>
        </View>

        <View style={styles.dogData}>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 5}]}>My Dog</Text>

          <Text style={[styles.text, { fontSize: 14 }]}>
             <Text>Dog Name: {dogInfo.dogName}{"\n"}Dog Breed: {dogInfo.dogBreed}{"\n"}Dog Gender: {dogInfo.Gender}{"\n"}Dog Size: {dogInfo.dogSize}{"\n"}Dog Temperament: {dogInfo.dogTemperament}</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}