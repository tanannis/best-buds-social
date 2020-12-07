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

	//map/display all chats for only the logged-in user
	useEffect(() => {
		//get currently signed-in user's information - to see what the user object looks like, console.log(user). You can access the user's uid from this object, which is used for querying in the .where() method.
		let user = firebase.auth().currentUser;

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

	if (loading) {
		return (
			<>
				<Text>Loading Messages...</Text>
			</>
		);
	}
  //here we are passing in item, which is information for a single chatroom. It is passed in Touchable Opacity onPress in the return. This item will be accessible through "route" in SingleChatRoom view.
	const selectChat = (item) => {
		navigation.navigate("SingleChat", {
			chatInfo: item
		 });
	};



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
								description="chatRoom"
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

