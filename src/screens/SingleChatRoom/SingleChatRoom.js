import React, { useState } from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import styles, { loadingStyles } from "./styles";
import { ActivityIndicator, View } from "react-native";
import { firebase } from "../../firebase/config";

export default function SingleChatRoom({ route }) {
    const [messages, setMessages] = useState([
    ]);


// helper method that sends a message in a particular chatroom
//The newMessage is concatenated with previous or the initial messages using GiftedChat.append() method.
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }
  //Yael's additions


  async function handleSend(messages) {
    //selects newest message in chatroom
    const text = messages[0].text;
    //gets user id of logged in user
    const fromUserId = firebase.auth().currentUser.uid;
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


// console.log(route)

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

