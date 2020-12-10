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

  // titlecontainer: {
  //   justifyContent: "flex-start",
  //   alignContent: "center",
  //   alignItems: "center",
  // },
  // apptext: {
  //   fontFamily: "Courier",
  //   fontSize: 24,
  //   textAlign: "center",
  //   marginTop: 20,
  //   marginBottom: 5,
  // },
  swiperContainer: {
    flex: 0.99,
    alignContent: "center",
    alignItems: "center",
  },
  bottomContainerMeta: {
    alignItems: "center",
    alignContent: "flex-end",
    margin: 25,
  },
  bottomContainerButtons: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 0.75,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  cardImage: {
    width: "90%",
    height: "90%",
    flex: 1.25,
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },
  nonmainpage: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 24,
  },
  endtexttitle: {
    fontFamily: "Courier",
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  endtext: {
    fontFamily: "Courier",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  text: { fontFamily: "Courier" },
  heading: { fontSize: 24, marginBottom: 10, color: colors.gray },
  price: { color: colors.blue, fontSize: 32, fontWeight: "500" },
});
