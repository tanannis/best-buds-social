import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { FlatList, Keyboard, Text, Image, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen() {
    const [people, setPeople] = useState([]);
    const db = firebase.firestore().collection("users")
  
    useEffect(() => {
        let usersArray = [];
        async function getUsers() {
        const users = await firebase.firestore().collection("users").get();
        users.forEach(doc => {
            usersArray.push({id: doc.id, data: doc.data()})
        })
        return usersArray
      }
      getUsers();
    }, [])
  
  
    const swiped = (direction, nameToDelete) => {
      console.log("removing: " + nameToDelete);
      // setLastDirection(direction)
    };
  
    const outOfFrame = (name) => {
      console.log(name + " left the screen!");
    };
  
    return (
        <View style={styles.card}>
        <View style={styles.cardContainer}>
          {people.map((person) => (
            <TinderCard
              style={styles.swipe}
              key={person.name}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, person.name)}
              onCardLeftScreen={() => outOfFrame(person.name)}
            >
              <Image
                style={{ backgroundImage: `url(${person.imgUrl})` }}
                className="card"
              >
                <Text>{person.name}</Text>
              </Image>
            </TinderCard>
          ))}
        </View>
      </View>
     
    );
}
