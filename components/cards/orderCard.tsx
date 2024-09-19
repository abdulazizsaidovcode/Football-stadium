import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/Colors'
import Buttons from '../button/button'
import { FontAwesome6 } from '@expo/vector-icons'
import { StadiumTypes } from '@/types/stadium/stadium'
import { file_get } from '@/helpers/api/api'
import { useNavigation } from 'expo-router'
import CenteredModal from '../modal/sentralmodal'
import OrderStore from '@/helpers/stores/order/orderStore'

interface OrderTofay {
    "clientFirstName": string,
    "clientLastName": string,
    "stadiumNumber": number,
    "date": string,
    "startTime": string,
    "endTime": string,
    "startPrice": number,
    orderStatus: string | null,
    isMainAttachmentId: any,
    fileId: string | null
}
const OrderCard: React.FC<{ data: OrderTofay, onPress: () => void, boxOnPress?: () => void, iconColor?: string | any }> = ({ data, onPress, boxOnPress, iconColor = 'white' }) => {
    const navigation = useNavigation<any>();

    const { OrderData, setOrderData } = OrderStore()
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(data);


    const openModal = () => OrderData?.id ? setIsModalVisible(!isModalVisible) : {};

    return (
        <>
            <Pressable
                onPress={boxOnPress ? boxOnPress : () => { }}
                style={styles.container}>
                <Image
                    height={200}
                    style={{ objectFit: 'cover', borderRadius: 10, width: '100%' }}
                    source={data?.fileId
                        ? { uri: file_get + data?.fileId }
                        : require('../../assets/images/defaultImg.jpeg')
                    }
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>{data.clientFirstName} {data.clientFirstName}</Text>
                    <Text style={styles.priceTitle}>{data.startPrice} sum</Text>
                </View>
                <Text style={styles.priceTitle}>{data.date}</Text>
                <Text style={[styles.priceTitle, { color: '#fff' }]}>{data.startTime && data.startTime.slice(0, 5)} - {data.endTime.slice(0, 5)}</Text>

                <View style={styles.btnContainer}>
                    <View style={{ width: '100%' }}>
                        <Buttons isDisebled={data?.orderStatus !== "CANCELED"} onPress={data?.orderStatus === "CANCELED" ? () => { } : onPress} title={data?.orderStatus === "CANCELED" ? 'Rad etilgan' : "Rad etish"} />
                    </View>
                </View>
            </Pressable>

        </>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#698474',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: colors.white,
        marginVertical: 5
    },
    priceTitle: {
        fontSize: 15,
        color: colors.lightGreen,
        marginVertical: 5
    },
    description: {
        fontSize: 13,
        color: colors.white,
        marginVertical: 5
    },
    locationBtn: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green,
        borderRadius: 50,
        width: 46,
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'space-between'
    }
})  