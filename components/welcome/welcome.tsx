import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, BackHandler, Dimensions } from "react-native";
// import { useTranslation } from "react-i18next";
// import "../../i18next";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/root/root";
// import {langstore} from "@/helpers/state_managment/lang/lang";
// import Toast from "react-native-simple-toast";
import Buttons from "../button/button";
import { FontAwesome } from "@expo/vector-icons";
// import * as SecureStore from "expo-secure-store";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/helpers/stores/auth/auth-store";
import { getSize } from "@/constants/sizes";

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "index"
>;
const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
const isTablet = screenWidth > 768;

const Welcome: React.FC = () => {
    // const {t, i18n} = useTranslation();
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    // const {language, setLanguage} = langstore();
    const { setIsLoginModal } = useAuthStore()
    const [backPressCount, setBackPressCount] = useState(0);


    const changeLanguage = async (lng: string) => {
        // i18n.changeLanguage(lng);
        // await SecureStore.setItemAsync("selectedLanguage", lng);
        // setLanguage(lng);
    };

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (backPressCount === 0) {
                    setBackPressCount(backPressCount + 1);
                    // Toast.show('Orqaga qaytish uchun yana bir marta bosing', Toast.SHORT);
                    setTimeout(() => {
                        setBackPressCount(0);
                    }, 2000); // 2 soniya ichida ikkinchi marta bosilmasa, holatni qayta boshlaydi
                    return true; // Orqaga qaytishni bloklaydi
                } else {
                    BackHandler.exitApp(); // Ilovadan chiqish
                    return false;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [backPressCount])
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.logo}>
                <FontAwesome name="soccer-ball-o" size={50 + (isTablet ? 60 : 0)} color="black" />
            </View>
            <Text style={styles.title}>Soccer Bookers</Text>
            <Text style={styles.welcome}> </Text>
            <Text style={styles.selectLanguage}>Bu app orqali o'zngizga yoqan stadionlaringizni bron qiling</Text>
            <View style={styles.button}>
                <Buttons
                    title="Kirish"
                    onPress={() => {
                        navigation.navigate("(pages)/(client)/(dashboard)/dashboard");
                        changeLanguage("ru");
                        setIsLoginModal(true)
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 100 + (isTablet ? 100 : 0),
        height: 100 + (isTablet ? 100 : 0),
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: getSize('mediumText') + (isTablet ? 12 : 5),
        fontWeight: "600",
        color: "#ffffff",
        marginBottom: 10,
    },
    welcome: {
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 5,
    },
    selectLanguage: {
        fontSize: getSize('smallText'),
        color: "#ffffff",
        marginBottom: 20,
        textAlign: "center",
        paddingHorizontal: 10
    },
    button: {
        width: isTablet ? "80%" : "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 16,
    },
});

export default Welcome;
