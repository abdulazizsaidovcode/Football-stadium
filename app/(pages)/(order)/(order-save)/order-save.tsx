import { Button, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { NavigationProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { file_get, order_create, stadium_get_freetime, stadium_get_one } from '@/helpers/api/api'
import { Loading } from '@/components/loading/loading'
import OrderDetailsCard from '@/components/cards/OrderDetailsCard'
import { StadiumTypes } from '@/types/stadium/stadium'
import { RootStackParamList } from '@/types/root/root'
import { useNavigation } from 'expo-router'
import Buttons from '@/components/button/button'
import { Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useOrderStory } from '@/helpers/stores/order/order-store'
import CalendarGrafficEdit from '@/components/calendar/calendar'
import TimesCard from '@/components/cards/timesCard'
import calenderStory from '@/helpers/stores/order/graficWorkStore'
import { useAuthStore } from '@/helpers/stores/auth/auth-store'
import LoadingButtons from '@/components/button/loadingButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(pages)/(client)/(dashboard)/dashboard"
>;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const OrderSave = () => {
    const route = useRoute();
    const { id } = route.params as { id: string | number };
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { freeTime, setFreeTime, pay, setPay } = useOrderStory()
    const [activeTime, setActiveTime] = useState('');
    const [creasePay, setCreasePay] = useState(1)
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const { calendarDate } = calenderStory()
    const { phoneNumber } = useAuthStore()

    let data = {
        "stadiumId": id,
        "startTimeHour": selectedTimeSlots[0] && selectedTimeSlots[0].slice(0, 2),
        "startTimeMinute": selectedTimeSlots[0] && +(selectedTimeSlots[0].slice(3, 5) == '00' ? 0 : (selectedTimeSlots[0].slice(3, 5))),
        "endTimeHour": selectedTimeSlots[1] && selectedTimeSlots[1].slice(0, 2),
        "endTimeMinute": selectedTimeSlots[1] && +(selectedTimeSlots[1].slice(3, 5) == '00' ? 0 : (selectedTimeSlots[1].slice(3, 5))),
        "date": calendarDate,
        "paySum": +pay,
        "cardNumber": null,
        "clientPhoneNumber": phoneNumber ? phoneNumber : null
    }


    const stadium = useGlobalRequest(`${stadium_get_one}/${id}`, 'GET');
    const freeTimeRes = useGlobalRequest(`${stadium_get_freetime}?stadiumId=${id}`, 'GET');
    const CreateOreder = useGlobalRequest(`${order_create}`, 'POST', data);
    console.log(id, freeTimeRes);

    useFocusEffect(
        useCallback(() => {
            if (selectedTimeSlots.length < 2) {
                setCreasePay(1);
                console.log("Less than 2 time slots selected");
            } else if (selectedTimeSlots.length === 2) {
                let a = selectedTimeSlots[0].slice(0, 2);
                let b = selectedTimeSlots[1].slice(0, 2);
                console.log(`Time slots: ${a}, ${b}`);
                let c = Number(b) - Number(a);
                if (!isNaN(c)) {
                    setCreasePay(c);
                    console.log(`Calculated crease pay: ${c}`);
                } else {
                    setCreasePay(1);
                    console.log("Calculation resulted in NaN");
                }
            }
        }, [selectedTimeSlots, freeTime])
    )
    async function isLogin() {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    useFocusEffect(
        useCallback(() => {
            freeTimeRes.globalDataFunc()
        }, [calendarDate])
    )

    useFocusEffect(
        useCallback(() => {
            stadium.globalDataFunc();
            freeTimeRes.globalDataFunc()
        }, [])
    )
    useEffect(() => {
        if (CreateOreder.response === 'Stadium has been successfully reserved') {
            alert(CreateOreder.response.response)
            setPay('')
            setSelectedTimeSlots([])
        }
    }, [CreateOreder.response])

    if (stadium.loading) {
        return <Loading />
    }
    console.log(stadium.response);


    const handleTimeSelect = (time: string) => {
        setActiveTime(time);
        setFreeTime(time);
    };

    const sortSelectedTimeSlots = (slots: string[]): string[] => {
        return slots.sort((a, b) => freeTime.indexOf(a) - freeTime.indexOf(b));
    };

    const toggleTimeSlotSelection = (time: string) => {
        setSelectedTimeSlots((prevSelectedTimeSlots) => {
            if (prevSelectedTimeSlots.includes(time)) {
                return prevSelectedTimeSlots.filter((slot) => slot !== time);
            } else {
                if (prevSelectedTimeSlots.length < 2) {
                    return sortSelectedTimeSlots([...prevSelectedTimeSlots, time]);
                } else {
                    const closestIndex = prevSelectedTimeSlots.reduce((closest, slot) => {
                        const currentIndex = freeTime.indexOf(slot);
                        const newIndex = freeTime.indexOf(time);
                        const closestIndex = freeTime.indexOf(closest);
                        return Math.abs(newIndex - currentIndex) < Math.abs(newIndex - closestIndex) ? slot : closest;
                    }, prevSelectedTimeSlots[0]);
                    return sortSelectedTimeSlots(prevSelectedTimeSlots.map((slot) =>
                        slot === closestIndex ? time : slot
                    ));
                }
            }
        });
    };

    const getRangeIndices = () => {
        if (selectedTimeSlots.length < 2) return [];

        const indices = selectedTimeSlots
            .map((slot) => freeTime.indexOf(slot))
            .sort((a, b) => a - b);
        const [start, end] = [indices[0], indices[indices.length - 1]];

        return freeTime.slice(start, end + 1);
    };


    const rangeIndices = getRangeIndices();

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name={stadium.response ? stadium.response.name : ''} />
            <View>
                <Text style={{ fontSize: 20, color: '#fff', marginBottom: 10 }}>Mavjud xizmatlar</Text>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ paddingBottom: 10, gap: 5 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {stadium.response && stadium.response.shower &&
                        <OrderDetailsCard icon={<MaterialIcons name="shower" size={34} color="white" />} />
                    }
                    {stadium.response && stadium.response.toilet &&
                        <OrderDetailsCard icon={<FontAwesome6 name="toilet-portable" size={34} color="white" />} />
                    }
                    {stadium.response && stadium.response.shopping &&
                        <OrderDetailsCard icon={<Entypo name="shopping-cart" size={34} color="white" />} />
                    }
                </ScrollView>
                <View style={styles.imageRow}>
                    {stadium.response && stadium.response.attechmentIds && stadium.response.attechmentIds.map((item: string, index: number) => (
                        <Image key={index} source={item ? file_get + item : require('../../../../assets/images/defaultImg.jpeg')} />
                    ))}
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 30 }}>
                <Text style={styles.timeTitle}>Kunni tanlash</Text>
                <CalendarGrafficEdit />
                <Text style={styles.timeTitle}>Soatni tanlash</Text>
                <View style={styles.timeListContainer}>
                    {freeTimeRes.response && freeTimeRes.response.length > 0 && freeTimeRes.response.map((time: any, index: any) => (
                        <TimesCard
                            key={index}
                            title={time}
                            onSelect={() => toggleTimeSlotSelection(time)}
                            isSelected={selectedTimeSlots.includes(time)}
                            isInRange={rangeIndices.includes(time)}
                            disabled={false}
                        />
                    ))}
                </View>
                <View style={styles.payCard}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.timeTitle}>Kutilayotgan to'lov: {stadium.response && stadium.response.initialPay * creasePay} so'm </Text>
                        {creasePay > 1 &&
                            <Text style={[styles.timeTitle, { color: colors.inDarkGreen }]}> jami: {creasePay} soat uchun  </Text>
                        }
                    </View>
                    {pay ?
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.timeTitle}>to'lanmoqda: {pay} so'm</Text>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('(pages)/(order)/(payment)/payment')
                                }}>
                                <Text style={[styles.timeText, { marginTop: 25, textDecorationLine: 'underline' }]}>edit</Text>
                            </Pressable>
                        </View>
                        :
                        <Text style={styles.timeTitle}>to'lov so'mini kirting</Text>
                    }
                </View>
                {!pay && <Buttons
                    title="To'lovni so'mmani kiritish" onPress={() => {
                        navigation.navigate('(pages)/(order)/(payment)/payment')
                    }} />}
                <View style={{ marginBottom: 10 }}></View>
                {CreateOreder.loading ?
                    <LoadingButtons title='Bron qilish' />
                    :
                    <Buttons
                        isDisebled={selectedTimeSlots.length == 2 && !!calendarDate && !!id && pay !== ''}
                        title='Bron qilish' onPress={async () => {
                            let isLogining = await isLogin().then((res) => res)
                            if (isLogining) {
                                CreateOreder.globalDataFunc()
                            } else {
                                navigation.navigate('(pages)/(auth)/(login)/login')
                            }
                        }} />
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderSave

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: 16
    },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        gap: 8,
    },
    image: {
        width: screenWidth / 3 - 25,
        height: screenHeight / 7,
        borderRadius: 15,
    },
    imageRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    timeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: screenWidth / 4.7,
        borderRadius: 5,
        alignItems: 'center',
        margin: 3
    },
    payCard: {
        width: "100%",
        padding: 10,
        backgroundColor: colors.green,
        borderRadius: 10,
        marginBottom: 10,
    },
    activeTimeButton: {
        backgroundColor: colors.inDarkGreen,
    },
    timeTitle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
    },
    timeText: {
        color: colors.inDarkGreen,
    },
    activeTimeText: {
        color: '#fff',
    },
    placeholderText: {
        color: 'gray',
    },
    timeListContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
})