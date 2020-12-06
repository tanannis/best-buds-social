import React, { useState } from "react";
import { View, Text } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';

export default function SingleChatRoom() {
    const [messages, setMessages] = useState([
        /**
     * Mock message data
     */
    // example of system message
    {
        _id: 0,
        text: 'New room created.',
        createdAt: new Date().getTime(),
        system: true
      },
      // example of chat message
      {
        _id: 1,
        text: 'Henlo!',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'Test User'
        }
      }
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
