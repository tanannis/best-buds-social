import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../../firebase/config";

export default function SingleChatRoom() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatroomRef = firebase
      .firestore()
      .collection("ChatRooms")
      .doc("UvBpiiWrMT0qJo5nsXhQ");
    const doc = chatroomRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data());
    }
  });

  // helper method that sends a message in a particular chatroom
  //The newMessage is concatenated with previous or the initial messages using GiftedChat.append() method.
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{ _id: 1 }}
    />
  );
}
