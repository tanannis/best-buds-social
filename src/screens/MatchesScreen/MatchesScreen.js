import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import styles, {chatStyles} from "./styles";
import { List, Divider } from "react-native-paper";
// import firestore from "@react-native-firebase/firestore";
import { firebase } from "../../firebase/config";

export default function MatchesScreen() {
	const [searchTerm, setSearchTerm] = useState("");
	const onChangeSearch = (query) => setSearchTerm(query);
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);

	//fetch all matches/chats
	//map all matches/chats below return
	useEffect(() => {
		//get currently signed-in user's id info
		let user = firebase.auth().currentUser;
		let uid;
		if (user !== null) {
			uid = user.id;
		}
		const unsubscribe = firebase
			.firestore()
			.collection("ChatRooms")
			//   .where().get()
			//   .where('FromUserId', '==', uid).get()
			//   .where('ToUserId', '==', uid).get()
			.onSnapshot((querySnapshot) => {
				//mapping the chats array to get each chatRoom (doc in firestore)
				const chats = querySnapshot.docs.map((documentSnapshot) => {
					return {
						_id: documentSnapshot.id,
						// give defaults
						messages: "",
						...documentSnapshot.data(),
					};
				});

				setChats(chats);

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

	//then make all chats clickable (define by id)
	return (
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
					<List.Item
						title={item.name}
						description="chatRoom"
						titleNumberOfLines={1}
						titleStyle={chatStyles.listTitle}
						descriptionStyle={chatStyles.listDescription}
						descriptionNumberOfLines={1}
					/>
				)}
			/>
		</View>
	);
}



//Search Bar Documentation: https://callstack.github.io/react-native-paper/searchbar.html
//Search Bar must be updated when data is in this component.
