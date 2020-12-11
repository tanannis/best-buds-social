import { StyleSheet } from "react-native";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d8ecf3",
    },

    text: {
        fontFamily: "Courier",
        color: colors.black
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },

    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    }

  });