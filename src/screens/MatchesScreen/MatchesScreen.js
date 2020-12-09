import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import styles, { chatStyles } from "./styles";
import { List, Divider } from "react-native-paper";
import { firebase } from "../../firebase/config";


export default function MatchesScreen({ navigation }) {

	const [searchTerm, setSearchTerm] = useState("");
	const onChangeSearch = (query) => setSearchTerm(query);
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [toUserName, setToUserName] = useState("")

	//map/display all chats for only the logged-in user
	// async function getToUserName () {
	// 	const userName = await firebase
	// 	.firestore()
	// 	.collection('ChatRooms')
	// 	.doc()	
	// }

	useEffect(() => {
		let user = firebase.auth().currentUser;
	
		//get currently signed-in user's information. You can access the user's uid from this object, which is used for querying in the .where() method.
		//let user = firebase.auth().currentUser;

		const unsubscribe = firebase
			.firestore()
			.collection('ChatRooms')
			.where('Users', 'array-contains', user.uid)
			.onSnapshot((querySnapshot) => {
				//mapping the chats array to get each chatRoom (doc in firestore). The variable chats is an array of chats for a given user.
				const chats = querySnapshot.docs.map((documentSnapshot) => {
					return {
						_id: documentSnapshot.id,
						// give defaults
						Chats: [],
						Users: [],
						...documentSnapshot.data(),
					};
				})

				setChats(chats)

				if (loading) {
					setLoading(false);
				}
			});

		/**
		 * unsubscribe listener
		 */
		return () => unsubscribe();
	}, []);

	//found the toUserId inside nested chats array
	// console.log('WWWWWW', chats[0].Chats[0].ToUserId)

	// const ToUserId = chats[0].Chats[0].ToUserId

	// console.log('YYYYYYY', ToUserId)

	async function getToUserName () {
		const toUserId = chats[0].Chats[0].ToUserId
		const userName = await firebase
		.firestore()
		.collection('users')
		.doc(toUserId)
		.get()
		.then(doc => {
			// console.log('DATTAAAASSSSS', doc.data())
			return doc.data()
		})
		const toUserFullName = userName.fullName
		// console.log('SET FULL NAME', toUserFullName)
		setToUserName(toUserFullName)
	}
	getToUserName()

	
	//here we are passing in item, which is information for a single chatroom. It is passed in Touchable Opacity onPress in the return. This item will be accessible through "route" in SingleChatRoom view.
	const selectChat = (item) => {
		navigation.navigate("SingleChat", {
			chatInfo: item
		 });
	};

	if (loading) {
		return (
			<>
				<Text>Loading Messages...</Text>
			</>
		);
	}

	return (
		<>
			<View style={chatStyles.container}>
				<SearchBar
					style={styles.searchbar}
					placeholder="Type Here to Search..."
					onChangeText={onChangeSearch}
					value={searchTerm}
				/>
				<FlatList
					data={chats}
					keyExtractor={(item) => item._id}
					ItemSeparatorComponent={() => <Divider />}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => selectChat(item)}>
							<List.Item
								title={item.name}
								description={toUserName}
								chatroomId={item._id}
								chats={item.Chats}
								users={item.Users}
								titleNumberOfLines={1}
								titleStyle={chatStyles.listTitle}
								descriptionStyle={chatStyles.listDescription}
								descriptionNumberOfLines={1}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		</>
	);
}

//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html

