import React, { useState } from "react";
import { GiftedChat } from 'react-native-gifted-chat';

export default function SingleChatRoom() {
    const [messages, setMessages] = useState([
       
  
    ]);

// helper method that sends a message in a particular chatroom
//The newMessage is concatenated with previous or the initial messages using GiftedChat.append() method.
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1 }}
    />
  );
}
