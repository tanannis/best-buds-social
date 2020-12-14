import { StyleSheet, Dimensions } from "react-native";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};

const { height } = Dimensions.get("window");

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
  // card: {
  //   flex: 0.75,
  //   borderRadius: 8,
  //   shadowRadius: 25,
  //   shadowColor: colors.black,
  //   shadowOpacity: 0.08,
  //   shadowOffset: { width: 0, height: 0 },
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   backgroundColor: colors.white,
  // },
  // cardImage: {
  //   flex: 1,
  //   aspectRatio: 1,
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: 8,
  //   shadowRadius: 25,
  //   resizeMode: "cover",
  // },
  // cardDetails: {
  //   alignItems: "center",
  //   backgroundColor: "white",
  //   borderRadius: 8,
  //   shadowRadius: 25,
  // },
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    height: height - 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#d8ecf3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },

  cardImage: {
    borderRadius: 15,
    flex: 1,
    height: "100%",
    width: "100%",
  },

  cardDetails: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
    // height: "100%",
    // position: "absolute",
    // left: 10,
    // bottom: 10,
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.white,
    fontFamily: "Avenir",
    textShadowColor: colors.black,
    textShadowRadius: 10,
  },

  // text: {
  //   textAlign: "center",
  //   fontSize: 50,
  //   backgroundColor: "transparent",
  // },
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
    fontFamily: "System",
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  endtext: {
    fontFamily: "System",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  text: { fontFamily: "System" },
  heading: {
    fontSize: 30,
    marginBottom: 2,
    color: "#0b2f64",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  userBio: {
    fontSize: 15,
    marginBottom: 10,
    color: "#0b2f64",
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 20,
  },
  price: { color: colors.blue, fontSize: 32, fontWeight: "500" },
});
