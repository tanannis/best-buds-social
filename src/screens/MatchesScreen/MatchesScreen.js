import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import styles, { chatStyles } from "./styles";
import { List, Divider } from "react-native-paper";
import { firebase } from "../../firebase/config";
import  StackNavigator  from "../../navigation/StackNavigator"



export default function MatchesScreen({ navigation }) {
    
	const [searchTerm, setSearchTerm] = useState("");
	const onChangeSearch = (query) => setSearchTerm(query);
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);


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
    
    const selectChat = (chatRoom) => {
	 //if current chatRoom id is the selected chatRoom id 
       navigation.navigate('SingleChat', {chatRoom});
    };

	//then make all chats clickable (define by id)
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
					<TouchableOpacity
						onPress={() => selectChat()}
					>
						<List.Item
							title={item.name}
							description="chatRoom"
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
//Search Bar must be updated when data is in this component.
