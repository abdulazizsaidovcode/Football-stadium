import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, colors } from '@/constants/Colors'
import { Entypo, FontAwesome, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { getUserLocation } from '@/helpers/global_functions/user_functions/user-functions'
import { useUserStore } from '@/helpers/stores/user/user-store'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { favourite_add, stadium_get, stadium_search } from '@/helpers/api/api'
import { RootStackParamList } from '@/types/root/root'
import { StadiumTypes } from '@/types/stadium/stadium'
import { Loading } from '@/components/loading/loading'
import StadiumCard from '@/components/cards/StadiumCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '@/components/input/input'
import useFavoutiteOrders from '@/helpers/stores/favourite/favourite'

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(pages)/(client)/(dashboard)/dashboard"
>;

const ClientDashboard = () => {
    const { userLocation, setUserLocation } = useUserStore();
    const [token, setToken] = useState<string | null>('')
    const [stadiumData, setstadiumData] = useState<any>(null)
    const [inputValue, setinputValue] = useState<string | null>('')
    const [backPressCount, setBackPressCount] = useState(0);
    const [role, setRole] = useState<string | null>('')
    const staduims = useGlobalRequest(inputValue ? `${stadium_search}?name=${inputValue}` : `${stadium_get}?lat=${userLocation?.coords.latitude}&lang=${userLocation?.coords.longitude}`, 'GET');
    const navigation = useNavigation<SettingsScreenNavigationProp | any>();

    useFocusEffect(
        useCallback(() => {
            getUserLocation(setUserLocation);
            const getConfig = async () => {
                setToken(await AsyncStorage.getItem('token'))
                setRole(await AsyncStorage.getItem('role'))
            }

            getConfig()
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
                setstadiumData(staduims.response)
            } else if (staduims.error) {
                setstadiumData(null)
            }
        }, [staduims.error, staduims.response])
    );
    useFocusEffect(
        useCallback(() => {
            staduims.globalDataFunc();
        }, [userLocation])
    );

    useFocusEffect(
        useCallback(() => {
            inputValue && staduims.globalDataFunc();
        }, [inputValue])
    );

    const logOut = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <ScrollView>
                {role && token && <View style={styles.header}>
                    <Text style={styles.title}>Главная</Text>
                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="bookmarks-sharp"
                            size={24}
                            color="white"
                            onPress={() => navigation.navigate("(pages)/(favourity)/favourite")}
                        />
                        <MaterialIcons name="history" onPress={() => navigation.navigate('(pages)/(history)/(client)/history')} size={30} color="white" />
                        <FontAwesome onPress={logOut} name="sign-out" size={30} color="white" />
                    </View>
                </View>}
                <View style={{ marginTop: 15 }}>
                    <View>
                        <Input value={inputValue ? inputValue : ""} placeholder='Поиск' onChangeText={(text) => {
                            setinputValue(text);
                        }} label='Поиск по имени' />
                        <Text style={styles.subTitle}>{role && token ? "Мои записи" : "Stadionlar"}</Text>
                        <View style={{ marginTop: 16, gap: 10 }}>
                            {staduims.loading ? (
                                <Loading />
                            ) : stadiumData && stadiumData.length > 0 ? (
                                stadiumData.map((item: StadiumTypes, index: number) => (
                                    <StadiumCard
                                        key={index}
                                        fetchFunction={staduims.globalDataFunc}
                                        data={item}
                                        onMapPress={() => navigation.navigate('(pages)/(maps)/(stadium-locations)/stadium-locations', { id: item.id })}
                                        onPress={() => navigation.navigate('(pages)/(order)/(order-save)/order-save', { id: item.id })}
                                    />
                                ))) : (
                                <Text style={styles.noDataText}>Стадион не найден</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ClientDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.darkGreen,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
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
    subTitle: {
        fontSize: 18,
        color: colors.white
    }
})