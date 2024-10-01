import {
    BackHandler,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { colors } from "@/constants/Colors";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
    NavigationProp,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { getUserLocation } from "@/helpers/global_functions/user_functions/user-functions";
import { useUserStore } from "@/helpers/stores/user/user-store";
import { useGlobalRequest } from "@/helpers/global_functions/global-response/global-response";
import { stadium_get, stadium_search } from "@/helpers/api/api";
import { RootStackParamList } from "@/types/root/root";
import { StadiumTypes } from "@/types/stadium/stadium";
import { Loading } from "@/components/loading/loading";
import StadiumCard from "@/components/cards/StadiumCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "@/components/input/input";
import CenteredModal from "@/components/modal/sentralmodal";
import { useAuthStore } from "@/helpers/stores/auth/auth-store";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList>;


const ClientDashboard = () => {
    const { userLocation, setUserLocation } = useUserStore();
    const [token, setToken] = useState<string | null>("");
    const [stadiumData, setstadiumData] = useState<StadiumTypes[] | null>(null);
    const [inputValue, setinputValue] = useState<string | null>("");
    const { isLoginModal, setIsLoginModal } = useAuthStore();
    const [backPressCount, setBackPressCount] = useState(0);
    const [role, setRole] = useState<string | null>("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [locationLoading, setLocationLoading] = useState(false)

    const staduims = useGlobalRequest(
        inputValue && inputValue.trim() !== ""
            ? `${stadium_search}?name=${inputValue}`
            : `${stadium_get}?lat=${userLocation?.coords.latitude}&lang=${userLocation?.coords.longitude}`,
        "GET"
    );

    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const [isModalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setLocationLoading(true)
            getUserLocation(setUserLocation);
            const getConfig = async () => {
                setToken(await AsyncStorage.getItem("token"));
                setRole(await AsyncStorage.getItem("role"));
            };

            getConfig();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (backPressCount === 0) {
                    setBackPressCount(backPressCount + 1);
                    alert("Orqaga qaytish uchun yana bir marta bosing");
                    setTimeout(() => {
                        setBackPressCount(0);
                    }, 2000);
                    return true;
                } else {
                    BackHandler.exitApp();
                    return false;
                }
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [backPressCount])
    );

    useFocusEffect(
        useCallback(() => {
            if (staduims.response) {
                setstadiumData(staduims.response);
                setLocationLoading(false)
            } else if (staduims.error) {
                setstadiumData(null);
            }
        }, [staduims.error, staduims.response, userLocation?.coords?.latitude])
    );

    useFocusEffect(
        useCallback(() => {
            if (inputValue && inputValue.trim() !== "") {
                staduims.globalDataFunc();
            } else {
                staduims.globalDataFunc();
            }
        }, [inputValue, userLocation])
    );

    const logOut = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        navigation.navigate('(pages)/(client)/(dashboard)/dashboard')
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const confirmLogOut = () => {
        logOut();
        hideModal();
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        staduims.globalDataFunc();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView
                // contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing && !staduims.response} onRefresh={onRefresh} />
                }
                style={{ paddingHorizontal: 16 }}>
                {role && token && (
                    <View style={styles.header}>
                        <Text style={styles.title}>Главная</Text>
                        <View style={styles.headerIcon}>
                            <MaterialIcons
                                name="history"
                                onPress={() =>
                                    navigation.navigate("(pages)/(history)/(client)/history")
                                }
                                size={30}
                                color="white"
                            />
                            <View>
                                <MaterialIcons name="notifications" onPress={() => navigation.navigate('(pages)/(notification)/notification')} size={30} color="white" />
                            </View>
                            <FontAwesome
                                onPress={showModal}
                                name="sign-out"
                                size={30}
                                color="white"
                            />
                        </View>
                    </View>
                )}
                <View style={{ marginTop: 15 }}>
                    <View>
                        <Input
                            value={inputValue ? inputValue : ""}
                            placeholder="Поиск"
                            onChangeText={(text) => {
                                setinputValue(text);
                            }}
                            label="Поиск по имени"
                        />
                        <Text style={styles.subTitle}>
                            {role && token ? "Мои записи" : "Stadionlar"}
                        </Text>
                        <View style={{ marginVertical: 16, gap: 10 }}>
                            {/* {!locationLoading ?
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name="location-pin" size={44} color={colors.green} />
                                    <Text style={{ color: '#fff' }}>location olinmoqda ...</Text>
                                </View>
                                :
                                (<View>
                                    {staduims.loading ? (
                                        <View>
                                            {!refreshing && <Loading />}
                                        </View>
                                    ) : stadiumData && stadiumData.length > 0 ? (
                                        stadiumData.map((item: StadiumTypes, index: number) => (
                                            <StadiumCard
                                                key={index}
                                                fetchFunction={staduims.globalDataFunc}
                                                data={item}
                                                onMapPress={() =>
                                                    navigation.navigate(
                                                        "(pages)/(maps)/(stadium-locations)/stadium-locations",
                                                        { id: item.id }
                                                    )
                                                }
                                                onPress={() =>
                                                    navigation.navigate(
                                                        "(pages)/(order)/(order-save)/order-save",
                                                        { id: item.id }
                                                    )
                                                }
                                            />
                                        ))
                                    ) : (
                                        <Text style={styles.noDataText}>Стадион не найден</Text>
                                    )}
                                </View>)
                            } */}
                            {locationLoading ?
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name="location-pin" size={44} color={colors.green} />
                                    <Text style={{ color: '#fff' }}>location olinmoqda ...</Text>
                                </View>
                                :
                                <View style={{ marginBottom: 5 }}>
                                    {
                                        staduims.loading ? (
                                            <View>
                                                {!refreshing && <Loading />}
                                            </View>
                                        ) : stadiumData && stadiumData.length > 0 ? (
                                            stadiumData.map((item: StadiumTypes, index: number) => (
                                                <View style={{ marginBottom: 10 }}>
                                                    <StadiumCard
                                                        key={index}
                                                        fetchFunction={staduims.globalDataFunc}
                                                        data={item}
                                                        onMapPress={() =>
                                                            navigation.navigate(
                                                                "(pages)/(maps)/(stadium-locations)/stadium-locations",
                                                                { id: item.id }
                                                            )
                                                        }
                                                        onPress={() =>
                                                            navigation.navigate(
                                                                "(pages)/(order)/(order-save)/order-save",
                                                                { id: item.id }
                                                            )
                                                        }
                                                    />
                                                </View>
                                            ))
                                        ) : (
                                            <Text style={styles.noDataText}>Стадион не найден</Text>
                                        )
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <CenteredModal
                isModal={isModalVisible}
                isFullBtn
                btnRedText='Logout'
                btnWhiteText='Cancel'
                toggleModal={hideModal}
                onConfirm={confirmLogOut}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <MaterialCommunityIcons name="cancel" size={100} color={colors.lightGreen} />
                    <Text
                        style={{ fontSize: 17, color: '#fff', textAlign: "center" }}
                    >
                        Siz aniq tizimdan chiqmoqchimisz ?
                    </Text>
                </View>
            </CenteredModal>
            <CenteredModal
                btnRedText="Ro'yhatda o'tish"
                btnWhiteText="Keyinroq"
                isFullBtn
                isModal={isLoginModal}
                toggleModal={() => setIsLoginModal(false)}
                onConfirm={() => {
                    navigation.navigate('(pages)/(auth)/(login)/login')
                    setIsLoginModal(false)
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <AntDesign name="login" size={80} color={colors.lightGreen} />
                    <Text
                        style={{ fontSize: 17, color: '#fff', textAlign: "center", marginTop: 10 }}
                    >
                        Tizmdan foydalanish uchun ro'yhatsan o'ting
                    </Text>
                </View>
            </CenteredModal>
        </SafeAreaView>
    );
};
export default ClientDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: colors.darkGreen,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: "white",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: 'red',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    headerIcon: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        color: colors.white
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
    subTitle: {
        fontSize: 18,
        color: colors.white
    }
})