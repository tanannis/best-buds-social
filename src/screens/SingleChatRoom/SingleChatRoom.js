import React, { useEffect, useState } from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import styles, { loadingStyles } from "./styles";
import { ActivityIndicator, View } from "react-native";
import { firebase } from "../../firebase/config";

//Next Steps: key/index bug, render messages on screen.

export default function SingleChatRoom({ route }) {
    const [messages, setMessages] = useState([
    ]);

// helper method that sends a message in a particular chatroom
//The newMessage is concatenated with previous or the initial messages using GiftedChat.append() method.
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }
  //gets user id of logged in user
  const userName = firebase.auth().currentUser.fullName
  const fromUserId = firebase.auth().currentUser.uid;

  async function handleSend(messages) {
    //selects newest message in chatroom
    const text = messages[0].text;
    //gets other user id that shares this chatroom
    function getToUserId() {
      const fetchUsersArray = route.params.chatInfo.Users
      const toUserId = fetchUsersArray.filter(user => user != fromUserId).join()
      return toUserId
    }


    firebase.firestore()
      .collection('ChatRooms')
      //pass in to .doc() the chatroom's unique id
      .doc(route.params.chatInfo._id)
      .update({
        Chats: firebase.firestore.FieldValue.arrayUnion({
          FromUserId: fromUserId,
          ToUserId: getToUserId(),
          message: text,
          timestamp: firebase.firestore.Timestamp.now()
        })
      })
  };

  const fetchMessages = async () => {
    const chatroomDoc = await firebase
    .firestore()
    .collection('ChatRooms')
    .doc(route.params.chatInfo._id)
    .get()
    .then(doc => {
      // console.log("this is doccc", doc.data())
      return doc.data()
    })
    const messages = chatroomDoc.Chats

    setMessages(messages)
  }
  //hook allows you to add side effects to functional component such as fetching data.
  useEffect(() => {
    fetchMessages()
  }, [])


  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }

  function renderLoading() {
    return (
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      // onSend={newMessage => handleSend(newMessage)}
      user={{ _id: fromUserId}}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}
