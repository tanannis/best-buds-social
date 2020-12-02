import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text } from "react-native";

export default function SignedOutScreen() {
  return (
    <View>
      <Text style={styles.text}>Goodbye!</Text>
    </View>
  );
}
