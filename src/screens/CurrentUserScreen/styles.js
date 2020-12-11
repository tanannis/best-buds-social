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
        width: 200,
        height: 200,
    },

    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },

    profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      // overflow: "hidden"
    },

    chat: {
      backgroundColor: colors.white,
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
    },

    active: {
      backgroundColor: colors.white,
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      borderRadius: 10,
    }, 

    add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },



  });