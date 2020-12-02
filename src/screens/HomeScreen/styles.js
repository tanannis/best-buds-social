import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        position: "absolute",
        backgroundColor: "white",
        width: 600,
        padding: 20,
        maxWidth: 85,
        height: 75,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
    },
    
    cardContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
    },
    
    swipe: {
        position: "absolute",
    },
    
    cardContent: {
        width: 100,
        height: 100,
    },
    
    cardH3: {
        position: "absolute",
        bottom: 0,
        margin: 10,
        color: "white",
    }
})