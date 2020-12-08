/* function to set your location here */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import * as Location from "expo-location";

export default function SetLocationScreen() {
	const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [place, setPlace] = useState(null)
    const [zipCode, setZipCode] = useState(null)

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            
            let place = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }); setPlace(place);

            place.find(place=>{
                setZipCode(place.postalCode)
            })
		})();
	}, []);

   
	let text = "Loading location info...";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text>Location: {zipCode}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
