import React, { useState } from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import styles, { loadingStyles } from "./styles";
import { ActivityIndicator, View } from "react-native";
import { firebase } from "../../firebase/config";

export default function SingleChatRoom({ route }) {
  //how to I get chats from Matches Screen?
  //how do I get a single chat information from the matches screen?
    // const { chats } = route.params
    const [messages, setMessages] = useState([
    ]);

// helper method that sends a message in a particular chatroom
//The newMessage is concatenated with previous or the initial messages using GiftedChat.append() method.
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }
  //Yael's additions
  async function handleSend(messages) {
    const text = messages[0].text;

    firebase.firestore()
      .collection('ChatRooms')
      //needs to be a single doc id
      .doc(chats._id)
      .update({
        Chats: firebase.firestore.FieldValue.arrayUnion({
          FromUserId: '',
          ToUserId: '',
          message: text,
          timestamp: new Date().getTime()
        })
      })
  }

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
// console.log ("This is chats on single", chats)
console.log ("This is route", route)
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1, name: 'User Test' }}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}
