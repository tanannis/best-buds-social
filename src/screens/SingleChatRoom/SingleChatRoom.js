import React, { useEffect, useState } from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import styles, { loadingStyles } from "./styles";
import { ActivityIndicator, View, Text } from "react-native";
import { firebase } from "../../firebase/config";

export default function SingleChatRoom({ route }) {
    const [messages, setMessages] = useState([
    ]);
    // const [loading, setLoading] = useState(true);

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
    const messages = await firebase
    .firestore()
    .collection('ChatRooms')
    .doc(route.params.chatInfo._id)
    .get('Chats')

    setMessages(messages)
  }

  useEffect(() => {
    fetchMessages()
  })
  console.log(messages)

  //hook allows you to add side effects to functional component such as fetching data.
  // useEffect(() => {
  //   const messages = firebase
  //   .firestore()
  //   .collection('ChatRooms')
  //   .doc(route.params.chatInfo._id)
  //   // // .documentSnapshot()
  //   .get()

  //       console.log("This is messages", messages)

  //       if (loading) {
	// 				setLoading(false);
	// 			}

  //   // //   }
    // // })
    // const chatroomRef = firebase
    // .firestore()
    // .collection("ChatRooms")
    // .doc("UvBpiiWrMT0qJo5nsXhQ");
    //     const doc = chatroomRef.get();if (!doc.exists) {      console.log("No such document!");    } else {     console.log("Document data:", doc.data()); }
  // })
  // setMessages(messages)


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

  // if (loading) {
	// 	return (
	// 		<>
	// 			<Text>Loading Messages...</Text>
	// 		</>
	// 	);
	// }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: fromUserId, name: userName }}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}
