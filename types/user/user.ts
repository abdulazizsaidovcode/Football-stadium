import * as Location from 'expo-location';

export interface UserMeeTypes {
    firstName: string,
    id: string,
    lastName: string,
    password: string | null,
    phoneNumber: string,
    role: string
}

export interface UserStoreTypes {
    userLocation: Location.LocationObject| null;
    setUserLocation: (val: Location.LocationObject| null) => void;
}