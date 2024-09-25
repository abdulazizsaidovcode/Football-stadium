import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import Buttons from '@/components/button/button'
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CreditCard from '@/components/cards/credit-card'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { card } from '@/helpers/api/api'
import CenteredModal from '@/components/modal/sentralmodal'
import { Loading } from '@/components/loading/loading'

const { height: screenHeight } = Dimensions.get('window')

const Cards = () => {
    const navigation = useNavigation<any>();
    const [cardId, setCardId] = useState('')  // For deletion modal
    const [selectedMainId, setSelectedMainId] = useState('')  // To track selected main card ID
    const [currentMainId, setCurrentMainId] = useState('')  // To track the existing main card before change
    const [isDelModal, setIsDelModal] = useState(false);
    
    const cards = useGlobalRequest(card.split('/api/v1').join(''), 'GET');
    const deleteCard = useGlobalRequest(`${card.split('/api/v1').join('')}/${cardId}`, 'DELETE');
    const updateMainCard = useGlobalRequest(`${card.split('/api/v1').join('')}/update/main/${selectedMainId}?isMain=true`, 'PUT');

    // Fetch cards and set the current main card
    useFocusEffect(
        useCallback(() => {
            cards.globalDataFunc();
        }, [])
    );

    // Update main card state when cards are loaded
    useFocusEffect(
        useCallback(() => {
            if (cards.response) {
                const mainCard = cards.response.find((item: { main: boolean }) => item.main);
                if (mainCard) {
                    setCurrentMainId(mainCard.id);
                    setSelectedMainId(mainCard.id);
                }
            }
        }, [cards.response])
    );

    useFocusEffect(
        useCallback(() => {
            if (deleteCard.response) {
                cards.globalDataFunc();
                toggleDelModal();
            }
        }, [deleteCard.response])
    );

    useFocusEffect(
        useCallback(() => {
            if (updateMainCard.response) {
                cards.globalDataFunc();
                setCurrentMainId('')
            }
        }, [updateMainCard.response])
    );

    const toggleDelModal = () => setIsDelModal(!isDelModal)

    const handleSaveMainCard = () => {
        if (selectedMainId && selectedMainId !== currentMainId) {
            updateMainCard.globalDataFunc();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 10 }}>
                <Text style={{ color: colors.white, fontSize: 25 }}>Kartalar</Text>
            </View>
            <ScrollView>
                <View>
                    {cards.loading ? (
                        <View style={{ height: screenHeight / 1.5 }}>
                            <Loading />
                        </View>
                    ) : (
                        cards.response && cards.response.length > 0 ? (
                            cards.response.map((item: { cardExpire: string, cardNumber: string, id: string, main: boolean, owner: string }, index: number) => (
                                <CreditCard
                                    key={index}
                                    cardExpiry={item.cardExpire}
                                    cardNumber={item.cardNumber}
                                    main={item.id === selectedMainId}  // Reflect the selected main card
                                    owner={item.owner}
                                    delOnPress={() => {
                                        toggleDelModal();
                                        setCardId(item.id);
                                    }}
                                    onMainSelect={() => setSelectedMainId(item.id)}  // Set selected card as main
                                />
                            ))
                        ) : (
                            <View style={{ height: screenHeight / 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Feather name="credit-card" size={70} color="white" />
                                <Text style={{ color: colors.white, fontSize: 20 }}>Siz toʻlov kartasini qoʻshmagansiz</Text>
                                <Text style={{ color: '#828282', fontSize: 14, textAlign: 'center' }}>
                                    Ilova orqali tez va oson toʻlovlarni amalga oshirish uchun karta qoʻshing
                                </Text>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>

            {selectedMainId !== currentMainId && (
                <View style={styles.saveButtonContainer}>
                    <Buttons
                        title="Saqlash"
                        onPress={handleSaveMainCard}  // Save the new main card
                    />
                </View>
            )}

            <View style={styles.addButtonContainer}>
                <Buttons
                    icon={<Entypo name="plus" size={24} color="white" />}
                    title="Karta qo'shish"
                    onPress={() => navigation.navigate('(pages)/(card)/(add-card)/add-card')}
                />
            </View>

            <CenteredModal
                btnRedText="O'chirish"
                btnWhiteText="Orqaga"
                isFullBtn
                isModal={isDelModal}
                toggleModal={toggleDelModal}
                onConfirm={deleteCard.globalDataFunc}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialCommunityIcons name="cancel" size={100} color={colors.lightGreen} />
                    <Text style={{ fontSize: 17, color: '#fff', textAlign: 'center' }}>
                        Siz aniq bu kartani o'chirmoqchimisiz?
                    </Text>
                </View>
            </CenteredModal>
        </SafeAreaView>
    );
}

export default Cards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
    },
    saveButtonContainer: {
        position: 'absolute',
        bottom: 60,
        left: 16,
        right: 16,
        backgroundColor: colors.darkGreen,
        paddingVertical: 10,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: colors.darkGreen,
        paddingVertical: 10,
    },
});
