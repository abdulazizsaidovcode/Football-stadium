import * as Location from "expo-location";

export const getUserLocation = async (setLocation: (val: Location.LocationObject) => void) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        alert("Please grant location permissions");
        return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
};