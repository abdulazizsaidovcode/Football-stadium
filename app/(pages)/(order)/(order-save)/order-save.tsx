import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { NavigationProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { file_get, stadium_get_one } from '@/helpers/api/api'
import { Loading } from '@/components/loading/loading'
import OrderDetailsCard from '@/components/cards/OrderDetailsCard'
import { StadiumTypes } from '@/types/stadium/stadium'
import { RootStackParamList } from '@/types/root/root'
import { useNavigation } from 'expo-router'
import Buttons from '@/components/button/button'
import { Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons'

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(pages)/(client)/(dashboard)/dashboard"
>;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

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
                <View>
                    <View></View>
                </View>
                <Buttons title='Login' onPress={() => navigation.navigate('(pages)/(auth)/(login)/login')} />
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
    image: {
        width: screenWidth / 3 - 25,
        height: screenHeight / 7,
        borderRadius: 15,
    },
    imageRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})