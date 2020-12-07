import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Dropdown } from "react-native-material-dropdown-v2";
import * as ImagePicker from "expo-image-picker";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Newly added userBio input
  const [userBio, setUserBio] = useState("");
  //Newly added dog information

  // could this be condensed to one object? This is also true for the user info above
  // const [dog, setDog] = useState({})
  const [dogName, setDogName] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogTemperament, setDogTemperament] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    //It creates a new account that will show up in Firebase Console -> Authentication table.
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
          //Newly add field
          userBio,
          image,
        };
        const dogData = {
          dogName,
          dogSize,
          dogGender,
          dogBreed,
          dogTemperament,
        };
        //If the account registration was successful, we also store the user data in Firebase Firestore. This is necessary for storing extra user information, such as full name, profile photo URL, and so on, which cannot be stored in the Authentication table.
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            //creating sub collection dogs with fields
            firebase
              .firestore()
              .collection("users")
              .doc(uid)
              .collection("dogs")
              .add(dogData);
            navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const dogSizeOptions = [
    { value: "Extra Small" },
    { value: "Small" },
    { value: "Medium" },
    { value: "Large" },
    { value: "Extra Large" },
  ];

  const dogTemperamentOptions = [
    { value: "Calm" },
    { value: "Energetic" },
    { value: "Feisty" },
  ];

  const dogGenderOptions = [{ value: "Male" }, { value: "Female" }];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/BestBudsSocialLogo.png")}
        />
        <View style={{ alignItems: "center" }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: 5, margin: 20 }}
            />
          )}
        </View>
        <TouchableOpacity onPress={pickImage}>
          <View
            onPress={pickImage}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#788eec",
              height: 48,
              marginLeft: 45,
              marginRight: 45,
              borderRadius: 5,
            }}
          >
            <Text style={styles.buttonTitle}>
              Choose an image for your profile picture
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <TextInput
          //Newly Added UserBioSection
          style={styles.largeinput}
          placeholder="Tell us about you & your dog here...you can include your favorite places to walk and/or anything special about your best bud :)"
          placeholderTextColor="#aaaaaa"
          multiline={true}
          onChangeText={(text) => setUserBio(text)}
          value={userBio}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <TextInput
          //Newly Added Dog Section - Name
          style={styles.input}
          placeholder="Dog Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDogName(text)}
          value={dogName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <TextInput
          //Newly Added Dog Section - Name
          style={styles.input}
          placeholder="Dog Breed"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDogBreed(text)}
          value={dogBreed}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType={"oneTimeCode"}
        />
        <Dropdown
          //Newly Added Dog Section - Size
          label="Choose Dog Gender"
          data={dogGenderOptions}
          style={styles.dropdown}
          // placeholderTextColor="#aaaaaa"
          onChangeText={(value) => setDogGender(value)}
          // value={dogSize}
          // underlineColorAndroid="transparent"
          // autoCapitalize="none"
          // textContentType={'oneTimeCode'}
        />
        <Dropdown
          //Newly Added Dog Section - Size
          label="Choose Dog Size"
          data={dogSizeOptions}
          style={styles.dropdown}
          // placeholder="dog size"
          // placeholderTextColor="#aaaaaa"
          onChangeText={(value) => setDogSize(value)}
          // value={dogSize}
          // underlineColorAndroid="transparent"
          // autoCapitalize="none"
          // textContentType={'oneTimeCode'}
        />
        <Dropdown
          //Newly Added Dog Section - Size
          label="Choose Dog Temperament"
          data={dogTemperamentOptions}
          style={styles.dropdown}
          // placeholder="dog size"
          // placeholderTextColor="#aaaaaa"
          onChangeText={(value) => setDogTemperament(value)}
          // value={dogTemperament}
          // underlineColorAndroid="transparent"
          // autoCapitalize="none"
          // textContentType={'oneTimeCode'}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
