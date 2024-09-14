import AsyncStorage from "@react-native-async-storage/async-storage";

export const getConfig = async () => {
    try {
        // const token = await AsyncStorage.getItem("token");
        // if (!token) {
            return {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTE5NTE3MzM1IiwiaWF0IjoxNzI2MzEwMzExLCJleHAiOjE4MTI3MTAzMTF9.XWnuu6XPzdmv5r4h93f1ZF0g24uWJOVqxdERPuaOPNU8-z5CqMYowaLJH_slhIDy3GA9l-gN6iUEMyrShvxDIA`,
                },
            };
        // } else {
        //     console.log("Token not found");
        //     return null;
        // }
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