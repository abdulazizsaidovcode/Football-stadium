import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/components/input/input'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import Buttons from '@/components/button/button'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { card } from '@/helpers/api/api'
import { useAuthStore } from '@/helpers/stores/auth/auth-store'

const AddCard = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpire, setEardExpire] = useState('');
    const { } = useAuthStore()
    const addCard = useGlobalRequest(card.split('/api/v1').join(''), 'POST', { cardNumber: cardNumber.split(' ').join(''), cardExpire: cardExpire.split('/').reverse().join(''), main: true })
    const formatCardNumber = (text: string) => {
        return text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (text: string) => {
        return text
            .replace(/\//g, '')
            .replace(/(\d{2})(\d{2})/, '$1/$2');
    };

    useEffect(() => {
        if (addCard.response) {
            console.log(addCard.response);
        } else {
            console.log(addCard.error);
        }
    }, [addCard.response, addCard.error])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <NavigationMenu name="Karta qo'shish" />
                <View>
                    <View style={{ marginTop: 100 }}>
                        <Text style={{ color: colors.white, fontSize: 20 }}>Karta ma'lumotlarini kiriting</Text>
                        <Input
                            placeholder='0000 0000 0000 0000'
                            maxLength={19}
                            type='numeric'
                            value={cardNumber}
                            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                        />
                        <Input
                            placeholder='MM/YY'
                            maxLength={5}
                            type='numeric'
                            value={cardExpire}
                            onChangeText={(text) => setEardExpire(formatExpiryDate(text))}
                        />
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Buttons loading={addCard.loading} isDisebled={cardExpire.length === 5 && cardNumber.length === 19} title="Maydon qo'shish" onPress={addCard.globalDataFunc} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default AddCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: 16,
        position: 'relative'
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.darkGreen,
        paddingVertical: 30,
        alignSelf: 'center'
    }
});
