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
import Swiper from "react-native-deck-swiper";
import { Transitioning, Transition } from "react-native-reanimated";
import styles from "./styles";
import { firebase } from "../../firebase/config";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};

const stackSize = 1;
const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

export default function HomeScreen() {
  const [user, setUser] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const user = firebase.auth().currentUser;
  const users = firebase.firestore().collection("users");
  const chatRooms = firebase.firestore().collection("ChatRooms"); //Access and create chatrooms

  // Need to add to users: "usersILike" and "usersWhoLikeMe"

  //Set match=true in both user's liked_by_people collection for the other user

  const onSwiped = (onSwipedLeft, onSwipedRight) => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % user.length);
    
    if (onSwipedLeft){
      user.collection("userDislikes").doc(userId).add({
        fullName,
        id,
        match: false,
        merge: false,
      });
    };

    if (onSwipedRight){
      user.collection("userLikes").doc(userId).add({
      fullName,
      id,
      match: true,
    });

    async function createChatRoom (userId){
      if (await (user).collection("userLikes").doc(userId)==(users).collection("userLikes").doc(userId)){
        const createChat = firebase.firestore().collection("Chatrooms")
        createChat
        .firestore()
        .collection("ChatRooms")
        .doc(route.params.chatInfo._id)
        .add({
          Chats:firebase.firestore.FieldValue
        })
      } 
    } return createChatRoom
    }
  };

  useEffect(() => {
    return users.onSnapshot((querySnapshot) => {
      const userList = [];
      querySnapshot.forEach((doc) => {
        const { fullName, userBio, image } = doc.data();
        userList.push({
          id: doc.id,
          fullName,
          userBio,
          image,
        });
      });

      setUser(userList);
      setLoading(false);
    });
  }, []);

  // const Card = ({ card }) => (
  //   <View style={styles.card}>
  //     <Image source={{ uri: card.image }} style={styles.cardImage} />
  //   </View>
  // );

  const CardDetails = ({ index }) => (
    <View key={user[index].uid} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {user[index].fullName}
      </Text>
      <Text style={[styles.text, styles.userBio]}>{user[index].userBio}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View>
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            Loading
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              cards={user}
              cardIndex={index}
              renderCard={(card) => {
                return (
                  <View style={styles.card}>
                    <Image
                      source={{ uri: card.image }}
                      style={styles.cardImage}
                    />
                    <Text
                      style={[styles.text, styles.heading]}
                      numberOfLines={2}
                    >
                      {user[index].fullName}
                    </Text>
                  </View>
                );
              }}
              infinite
              backgroundColor={"transparent"}
              onSwiped={onSwiped(onSwipedLeft) && onSwiped(onSwipedRight)}
              onSwipedRight={onSwipedRight}
              onTapCard={() => swiperRef.current.onSwiped()}
              cardVerticalMargin={50}
              stackSize={stackSize}
              stackScale={10}
              stackSeparation={14}
              animateOverlayLabelsOpacity
              animateCardOpacity
              disableTopSwipe
              disableBottomSwipe
              overlayLabels={{
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      backgroundColor: colors.red,
                      borderColor: colors.red,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: -20,
                    },
                  },
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      backgroundColor: colors.blue,
                      borderColor: colors.blue,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: 20,
                    },
                  },
                },
              }}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Transitioning.View
              ref={transitionRef}
              transition={transition}
              style={styles.bottomContainerMeta}
            >
              <CardDetails index={index} />
            </Transitioning.View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
