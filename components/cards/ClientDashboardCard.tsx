import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/Colors'
import Buttons from '../button/button'
import { FontAwesome6 } from '@expo/vector-icons'

const ClientDashboardCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sexy stadium</Text>
            <Image height={200} style={{ objectFit: 'cover', borderRadius: 10 }} source={{ uri: 'https://picsum.photos/200/300' }} />
            <Text style={styles.description}>Sexy stadium</Text>
            <View style={styles.btnContainer}>
                <View style={{ width: '82%' }}>
                    <Buttons title='Записаться' />
                </View>
                <TouchableOpacity style={styles.locationBtn}>
                    <FontAwesome6 name="location-dot" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ClientDashboardCard

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
        width: 50,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})  