import NavigationMenu from '@/components/navigation/NavigationMenu';
import { colors } from '@/constants/Colors';
import { getSize } from '@/constants/sizes';
import { order_today } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import Layout from '@/layout/layout'
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const isTablet = screenWidth > 768;

export default function OrdersDay() {
    const getOrdersTodey = useGlobalRequest(order_today, 'GET',);

    useFocusEffect(
        useCallback(() => {
            getOrdersTodey.globalDataFunc()
        }, [])
    )
    return (
        <Layout scroll style={styles.container}>
            {/* <NavigationMenu name='History' /> */}
            <Text style={styles.title}>
                Bugungi qilingan orderlar
            </Text>
            {getOrdersTodey.response && getOrdersTodey.response.map((item: { orderNumber: number, id: number | string, startTime: string, endTime: string, date: string, orderStatus: string }) => (
                <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
                    <Text style={styles.orderTime}>Time: {item.startTime} - {item.endTime}</Text>
                    <Text style={styles.orderDate}>Date: {item.date}</Text>
                    <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>
                </View>
            ))}
        </Layout>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        // color: "white",
        paddingHorizontal: getSize('defaultPadding'),
    },
    listContainer: {
        paddingTop: 16,
    },
    title: {
        fontSize: getSize('mediumText') + (isTablet ? 10 : 5),
        fontWeight: 'bold',
        marginTop: 20,
        color: "white",
        marginBottom: 16,
    },
    itemContainer: {
        backgroundColor: '#698474',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    orderNumber: {
        fontSize: getSize('smallText') + (isTablet ? 6 : 5),
        fontWeight: 'bold',
        color: "white",
        marginBottom: 8,
    },
    orderTime: {
        color: "white",
        fontSize: getSize('smallText') + (isTablet ? 2 : 0),
        marginBottom: 4,
    },
    orderDate: {
        fontSize: getSize('smallText') + (isTablet ? 2 : 0),
        color: "white",
        marginBottom: 4,
    },
    orderStatus: {
        fontSize: getSize('smallText') + (isTablet ? 2 : 0),
        fontWeight: 'bold',
        color: "white",
    },
});