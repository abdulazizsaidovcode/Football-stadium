import { Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { NavigationProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { file_get, stadium_get_freetime, stadium_get_one } from '@/helpers/api/api'
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

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(pages)/(client)/(dashboard)/dashboard"
>;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const OrderSave = () => {
    const route = useRoute();
    const { id } = route.params as { id: string | number };
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { freeTime, setFreeTime } = useOrderStory()
    const [activeTime, setActiveTime] = useState('');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);



    const stadium = useGlobalRequest(`${stadium_get_one}/${id}`, 'GET');
    const freeTimeRes = useGlobalRequest(`${stadium_get_freetime}?stadiumId=${id}`, 'GET');

    useFocusEffect(
        useCallback(() => {
            stadium.globalDataFunc();
            freeTimeRes.globalDataFunc()
        }, [])
    )
    console.log(freeTimeRes.response);


    if (stadium.loading) {
        return <Loading />
    }
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

    const renderItem = ({ item }: any) => (
        < TouchableOpacity
            style={[styles.timeButton, activeTime === item && styles.activeTimeButton]}
            onPress={() => handleTimeSelect(item)}
        >
            <Text style={[styles.timeText, activeTime === item && styles.activeTimeText]}>
                {item.slice(0, 5)}
            </Text>
        </ TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name={stadium.response ? stadium.response.name : ''} />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <OrderDetailsCard icon={<Entypo name="shopping-cart" size={24} color="white" />} />
                    <OrderDetailsCard icon={<MaterialIcons name="shower" size={24} color="white" />} />
                    <OrderDetailsCard icon={<FontAwesome6 name="toilet-portable" size={24} color="white" />} />
                </View>
                <View style={styles.imageRow}>
                    {stadium.response && stadium.response.attechmentIds.map((item: string, index: number) => (
                        // <Image key={index} source={item ? file_get + item : require('../../../../assets/images/defaultImg.jpeg')} />
                        <Text>{item}</Text>
                    ))}
                </View>
                <CalendarGrafficEdit />
                <Text style={styles.timeTitle}>Vaqtni tanlash</Text>
                <View style={styles.timeContainer}>
                    {
                        freeTimeRes.response && freeTimeRes.response.length > 0 ? (
                            <FlatList
                                numColumns={4}
                                data={freeTimeRes.response}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                            <Text style={styles.placeholderText}>Нет свободного времени</Text>
                        )
                    }
                </View>
                <View style={styles.timeListContainer}>
                    {freeTime.map((time, index) => (
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
                <Buttons title='Bron qilish' onPress={() => navigation.navigate('(pages)/(auth)/(login)/login')} />
            </View>
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
      },
})