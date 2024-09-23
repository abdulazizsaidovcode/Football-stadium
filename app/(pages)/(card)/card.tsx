import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import Buttons from '@/components/button/button'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CreditCard from '@/components/cards/credit-card'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { card } from '@/helpers/api/api'
import CenteredModal from '@/components/modal/sentralmodal'

const Cards = () => {
    const navigation = useNavigation<any>();
    const [cardId, setCardId] = useState('')
    const [isDelModal, setIsDelModal] = useState(false);
    const cards = useGlobalRequest(card.split('/api/v1').join(''), 'GET');
    const deleteCard = useGlobalRequest(`${card.split('/api/v1').join('')}/${cardId}`, 'DELETE');

    useFocusEffect(
        useCallback(() => {
            cards.globalDataFunc()
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            if (deleteCard.response) {
                alert('aaaaaaaaaaaaaaaaaa')
                cards.globalDataFunc();
                toggleDelModal();
            }
        }, [deleteCard.response])
    );

    const toggleDelModal = () => setIsDelModal(!isDelModal)

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 10 }}>
                <Text style={{ color: colors.white, fontSize: 25 }}>Kartalar</Text>
            </View>
            <ScrollView style={{ paddingHorizontal: 16 }}>
                <View>
                    {cards.response && cards.response.map((item: { cardExpire: string, cardNumber: string, id: string, main: boolean, owner: string }, index: number) => (
                        <CreditCard
                            key={index}
                            cardExpiry={item.cardExpire}
                            cardNumber={item.cardNumber}
                            main={item.main}
                            owner={item.owner}
                            delOnPress={() => {
                                toggleDelModal()
                                setCardId(item.id)
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, paddingHorizontal: 16, width: '100%', backgroundColor: colors.darkGreen, paddingVertical: 10 }}>
                <Buttons icon={<Entypo name="plus" size={24} color="white" />} title="Karta qo'shish" onPress={() => navigation.navigate('(pages)/(card)/(add-card)/add-card')} />
            </View>
            <CenteredModal
                btnRedText="O'chirish"
                btnWhiteText='Orqaga'
                isFullBtn
                isModal={isDelModal}
                toggleModal={toggleDelModal}
                onConfirm={deleteCard.globalDataFunc}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <MaterialCommunityIcons name="cancel" size={100} color={colors.lightGreen} />
                    <Text
                        style={{ fontSize: 17, color: '#fff', textAlign: "center" }}
                    >
                        Siz aniq bu kartani o'chirmoqchimisiz?
                    </Text>
                </View>
            </CenteredModal>
        </SafeAreaView>
    )
}

export default Cards

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen
    }
})