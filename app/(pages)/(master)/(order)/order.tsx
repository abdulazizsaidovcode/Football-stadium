import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { order_day_master, statistics_for_year, user_me, user_update } from '@/helpers/api/api';

export default function MasterOrder() {
    const userMee = useGlobalRequest(user_me, 'GET');
    const OrdersDay = useGlobalRequest(order_day_master, 'GET');

    useEffect(() => {
        OrdersDay.globalDataFunc();
    }, []);

    return (
        <Layout scroll>
            <View style={styles.Container}>
                <Text style={styles.title}>Bugungi qilinga bronlaringiz</Text>

                {
                    OrdersDay.response && OrdersDay.response.length > 0 ? (
                        OrdersDay.response.map((item: { clientFirstName: string, clientLastName: string, endTime: string, stadiumNumber: string, date: string, startTime: string, startPrice: string, }) => (
                            <TouchableOpacity style={styles.order} activeOpacity={1}>
                                <Text style={styles.orderTitle}>
                                    {item.clientFirstName} {item.clientLastName}

                                </Text>
                                <Text style={styles.OrderText}>
                                    cdhybuj
                                    Stadium: {item.stadiumNumber}
                                </Text>
                                <Text style={styles.OrderText}>
                                    Date: {item.date}
                                </Text>
                                <Text style={styles.OrderText}>
                                    Time: {item.startTime && item.startTime.slice(0, 5)} - {item.endTime.slice(0, 5)}
                                </Text>
                                <Text style={styles.OrderText}>
                                    Price: ${item.startPrice}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={{ marginTop: 20, textAlign: 'center', color: "white" }}>order Mavjut emas</Text>
                    )
                }
            </View>
        </Layout>
    );
}


const styles = StyleSheet.create({
    Container: {
        marginTop: 30,
        marginBottom: 40,
        borderBottomColor: "#000",
        paddingHorizontal: 16
    },
    Buttons: {
        display: "flex",
    },
    title: {
        fontSize: 22,
        color: 'white',
        marginBottom: 10,
    },
    OrderText: {
        fontSize: 15,
        color: 'white',
        marginBottom: 5,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 10,
        paddingHorizontal: 20,
    },
    order: {
        backgroundColor: '#698474',
        borderRadius: 10,
        padding: 15, // paddingni o'zgartirdim
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // shadow qo'shdim
    },
    orderTitle: {
        fontSize: 20, // o'lchamni kichraytirdim
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center', // matnni markazlashtirdim
    },
    cardDefText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center', // matnni markazlashtirdim
    },
    profile: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 14,
        color: '#fff',
    },
    editButton: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#698474',
        color: '#fff',
        borderRadius: 10,
    },
    input: {
        borderBottomWidth: 1,
        color: '#fff',
        borderBottomColor: '#ccc',
        marginBottom: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});




