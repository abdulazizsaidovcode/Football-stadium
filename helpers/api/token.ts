import AsyncStorage from "@react-native-async-storage/async-storage";

export const getConfig = async () => {
    try {
        // const token = await AsyncStorage.getItem("token");
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4NTA4ODkwMDM3IiwiaWF0IjoxNzI2NTQ4NTM4LCJleHAiOjE4MTI5NDg1Mzh9.RdhkkQQeq7Yv6S1jFj-vvGc2mMnt9sj_2p41Qu4rYV6RBBOZ5Aoy7eJUvGM0pimmLvBGkRPT4lcaYf4NLP19Wg";
        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            // console.log("Token not found");
            return null;
        }
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