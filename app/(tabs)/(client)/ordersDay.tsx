import { colors } from '@/constants/Colors';
import { order_today } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import Layout from '@/layout/layout'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function OrdersDay() {
    const getOrdersTodey = useGlobalRequest(order_today, 'GET',);
    useEffect(() => {
        getOrdersTodey.globalDataFunc()
    }, [])
    return (
        <Layout scroll>
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
        paddingHorizontal: 16,
    },
    listContainer: {
        paddingTop: 16,
    },
    itemContainer: {
        backgroundColor: '#698474',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 8,
    },
    orderTime: {
        color: "white",
        fontSize: 14,
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 14,
        color: "white",
        marginBottom: 4,
    },
    orderStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "white",
    },
});