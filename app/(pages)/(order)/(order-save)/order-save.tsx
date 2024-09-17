import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { NavigationProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { stadium_get_one } from '@/helpers/api/api'
import { Loading } from '@/components/loading/loading'
import OrderUSerCard from '@/components/cards/OrderUSerCard'
import { StadiumTypes } from '@/types/stadium/stadium'
import { RootStackParamList } from '@/types/root/root'
import { useNavigation } from 'expo-router'
import Buttons from '@/components/button/button'

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(pages)/(client)/(dashboard)/dashboard"
>;

const OrderSave = () => {
    const route = useRoute();
    const { id } = route.params as { id: string | number };
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const stadium = useGlobalRequest(`${stadium_get_one}/${id}`, 'GET');

    useFocusEffect(
        useCallback(() => {
            stadium.globalDataFunc();
        }, [])
    )

    if (stadium.loading) {
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name={stadium.response ? stadium.response.name : ''} />
            <View>
                <OrderUSerCard />
                <View>
                    {stadium.response && stadium.response.attechmentIds.map((item: string, index: number) => (
                        <Image />
                    ))}
                </View>
                <Buttons title='Login' onPress={() => navigation.navigate('(pages)/(auth)/(login)/login')}/>
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
    }
})