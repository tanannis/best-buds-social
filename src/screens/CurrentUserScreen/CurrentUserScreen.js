import React, { useEffect, useState } from "react";
import {
    Button,
    Text,
    Image,
    TextInput,
    ScrollView,
    View,
    SafeAreaView,
    FlatList,
  } from "react-native";
import styles from "./styles"
import { firebase } from "../../firebase/config";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";


export default function CurrentUserScreen() {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {

    const current = firebase.auth().currentUser;
    console.log("this is current", current)

        return current.onSnapshot((querySnapshot) => {
          const userInfo = [];
          querySnapshot.forEach((doc) => {
            const { fullName, userBio, image } = doc.data();
            userInfo.push({
              id: doc.id,
              fullName,
              userBio,
              image,
            });
          });
    
          setCurrentUser(userInfo);
          setLoading(false);
        });
      }, []);

      const currentUserDetails= ({ current }) => (
        <View key={current.uid} style={{ alignItems: "center" }}>
          <Text style={[styles.text, styles.heading]} numberOfLines={2}>
            {current.fullName}
          </Text>
          <Text style={[styles.text, styles.userBio]}>{current.userBio}</Text>
        </View>
      );
    


    return (
          <SafeAreaView style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleBar}>
                  <Ionicons
                      name="ios-arrow-back" size={24} colors="#EC2379">
                  </Ionicons>
                  <Ionicons
                      name="md-more" size={24} colors="#EC2379">
                  </Ionicons>

                  <View style={{ alignSelf: "center" }}>
                  <View style={styles.profileImage}>
                        <Image source={currentUser.image} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

              </View>
              </ScrollView>
             

          </SafeAreaView>
         
    )
      
  }