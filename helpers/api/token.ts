import AsyncStorage from "@react-native-async-storage/async-storage";

export const getConfig = async () => {
    try {
        // const token = await AsyncStorage.getItem("token");
        // if (!token) {
            return {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4NTA4ODkwMDM3IiwiaWF0IjoxNzI2NDY0MTIyLCJleHAiOjE4MTI4NjQxMjJ9.48Q_WTG6DAz1lYI2N7R_JyZ4cYrTOxT3mBw9-veAK0QRW2-fz9uAYCZdn6o00fy1ACMeQpEg-NmY_3M_7oBzJA`,
                },
            };
        // } else {
        //     console.log("Token not found");
        //     return null;
        // }a
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getConfigImg = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            return {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            console.log("Token not found");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};