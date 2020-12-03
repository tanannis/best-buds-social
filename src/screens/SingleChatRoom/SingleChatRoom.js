import React, { useState } from 'react';
//GiftedChat is a built in chat UI from React Native
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native'

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

  // helper method that sends a message
  // below we are adding messages to the newMessages array using the setMessages function to change the state
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <View >
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1 }}
    />
    </View>
  );
}
