import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";

export default function MapScreen() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [place, setPlace] = useState(null);
	const [zipCode, setZipCode] = useState(null);

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
			});
			setPlace(place);

			place.find((place) => {
				setZipCode(place.postalCode);
			});
		})();
	}, []);

	console.log("LOCATION", location);
	console.log("PLACE", place);
	// 	console.log("ZIPCODE", zipCode);

	return (
		<>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>
					<FontAwesome name="map-marker" size={20} color="blue" /> {zipCode}
				</Text>
				<MapView
					style={styles.mapStyle}
					provider={PROVIDER_GOOGLE}
					showsUserLocation
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapStyle: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
