import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '@/constants/Colors';
import { useAuthStore } from '@/helpers/stores/auth/auth-store';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { auth_check_code } from '@/helpers/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getConfig } from '@/helpers/api/token';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '@/types/root/root';
import { NavigationProp } from '@react-navigation/native';

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(pages)/(auth)/(check-code)/check-code"
>;

const CheckCode = () => {
    const { phoneNumber, setPhoneNumber } = useAuthStore()
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const checkCode = useGlobalRequest(auth_check_code, 'POST', { phone: "+998" + phoneNumber.split(' ').join(''), code: +code.join('') })

    const handleInputChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        if (text === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    console.log(+code.join(''));


    useEffect(() => {
        const confirm = async () => {
            if (checkCode.response !== false) {
                const token = checkCode.response.token;
                const role = checkCode.response.role;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('role', role);
                checkCode.response.role === 'ROLE_CLIENT' ? navigation.navigate('(tabs)/(client)') : navigation.navigate('(tabs)/(master)')
                setPhoneNumber('');
                setCode(['', '', '', ''])
            }
        }

        confirm();
    }, [checkCode.response])

    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            checkCode.globalDataFunc();
        }
    }, [code]);

    console.log(checkCode.error);
    console.log(checkCode.response);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.title}>Подтверждение номера</Text>
                    <Text style={[styles.title, { fontWeight: '500', marginTop: 30 }]}>+998 {phoneNumber}</Text>
                    <Text style={styles.des}>Мы отправим вам SMS с кодом подтверждения.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 40 }}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                value={digit}
                                onChangeText={(text) => handleInputChange(text, index)}
                                maxLength={1}
                                keyboardType="numeric"
                                style={styles.input}
                                ref={(el) => (inputRefs.current[index] = el)} // Assigning refs
                                returnKeyType="next"
                            />
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CheckCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 25,
        color: colors.white,
        textAlign: 'center'
    },
    des: {
        fontSize: 16.5,
        color: '#828282',
        textAlign: 'center',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        width: 65,
        height: 65,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 5,
        borderRadius: 10,
        color: colors.white,
        backgroundColor: colors.inDarkGreen
    },
})
