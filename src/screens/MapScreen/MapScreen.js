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
	const [latitude, setLatitude] = useState(null)
	const [longitude, setLongitude] = useState(null)

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setLatitude(location.coords.latitude)
			setLongitude(location.coords.longitude)
			
		})();
	}, []);

	console.log('<<<<<', location)
	console.log('Latitude', latitude)
	console.log('Longtitute', longitude)

	return (
		<>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				
				<MapView
					style={styles.mapStyle}
					provider={PROVIDER_GOOGLE}
					showsUserLocation
					initialRegion={{
						// latitude: 37.78825,
						// longitude: -122.4324,
						latitude: latitude,
						longitude: longitude,
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
