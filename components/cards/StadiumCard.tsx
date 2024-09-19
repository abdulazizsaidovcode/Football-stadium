import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/Colors'
import Buttons from '../button/button'
import { FontAwesome6 } from '@expo/vector-icons'
import { StadiumTypes } from '@/types/stadium/stadium'
import { file_get } from '@/helpers/api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'
import { haveOrNot } from '@/helpers/global_functions/favourite/favourite'

const StadiumCard: React.FC<{ disabled?: boolean, data: StadiumTypes, onMapPress: () => void, onPress: () => void, iconColor?: string | any, setFavouriteOrders: (val: StadiumTypes[]) => void, setIsLoading: (val: boolean) => void }> = ({ data, onMapPress, onPress, favouriteOrders, setFavouriteOrders, setIsLoading }) => {
    const [role, setRole] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchUserData = async () => {
            const storedRole = await AsyncStorage.getItem('role');
            const storedToken = await AsyncStorage.getItem('token');
            setRole(storedRole);
            setToken(storedToken);
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.priceTitle}>{data.price} sum</Text>
            </View>
            <Image
                height={200}
                style={{ objectFit: 'cover', borderRadius: 10, width: '100%' }}
                source={data.isMainAttachmentId
                    ? { uri: file_get + data.isMainAttachmentId }
                    : require('../../assets/images/defaultImg.jpeg')
                }
            />
            <Text style={styles.description}>{data.description}</Text>
            <View style={styles.btnContainer}>
                <View style={{ width: '70%' }}>
                    <Buttons onPress={onPress} title='Записаться' />
                </View>
                <TouchableOpacity onPress={onMapPress} activeOpacity={.8} style={styles.locationBtn}>
                    <FontAwesome6 name="location-dot" size={24} color="white" />
                </TouchableOpacity>
                {data.id && haveOrNot(data.favourite, data.id, setFavouriteOrders, setIsLoading)}
            </View>
        </View>
    )
}

export default StadiumCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#698474',
        padding: 10,
        borderRadius: 10
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
