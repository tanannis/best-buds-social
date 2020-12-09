import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { firebase } from '../../firebase/config';

export default function SingleChatRoom({ route }) {
  const [messages, setMessages] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const ChatRoomId = route.params.chatInfo._id;
  const fromUserId = firebase.auth().currentUser.uid;

  //useCallback is a hook used on state change
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
      );
      // console.log("This is previous message", previousMessages)
    // setMessages(() =>
    //   GiftedChat.append(messages)
    // );

  }, []);


  async function handleSend(messages) {
    const text = messages[0].text;
    await firebase
      .firestore()
      .collection('ChatRooms')
      //pass in to .doc() the chatroom’s unique id
      .doc(ChatRoomId)
      .collection('Messages')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });
    // onSend(messages);
  }

  useEffect(() => {
    const messagesListener = firebase
      .firestore()
      .collection('ChatRooms')
      .doc(ChatRoomId)
      .collection('Messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }
          return data;
        });
        setMessages(messages);
      });
    return () => messagesListener();
  }, []);

    function renderBubble(props) {
    // console.log("in render bubble", props)
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#9AC4F8',
          }, 
          left: {
            backgroundColor: 'silver'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
        textProps={{
          style: {
            color: 'black'
          }
        }}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: fromUserId,
      }}
      renderBubble={renderBubble}
    />
  );
}
