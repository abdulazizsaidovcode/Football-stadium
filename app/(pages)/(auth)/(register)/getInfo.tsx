import Buttons from '@/components/button/button';
import { auth_register } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { useAuthStore } from '@/helpers/stores/auth/auth-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UserInfo: React.FC = () => {
    const [isFild, setIsFild] = useState(false)
    const [pending, setPending] = React.useState(false);
    const { role, firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber } = useAuthStore();
    const navigate = useNavigation<any>();

    let info = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
    }
    
    const register = useGlobalRequest(`${auth_register}?ROLE_NAME=${role}`, 'POST', info)

    const handleFirstNameChange = (name: string): void => {
        setFirstName(name);
    };

    const handleLastNameChange = (name: string): void => {
        setLastName(name);

    };
    const handlePhoneNumberChange = (number: string): void => {
        setPhoneNumber(number);
    };

    useEffect(() => {
        let check = lastName.trim() !== '' && firstName.trim() !== '' && phoneNumber.trim() !== ''
        setIsFild(check);
    }, [firstName, lastName, phoneNumber])

    useEffect(() => {
        if (register.response) {
            if (register.response.role === 'ROLE_MASTER') navigate.navigate('(tabs)/(master)');
            if (register.response.role === 'ROLE_CLIENT') navigate.navigate('(tabs)/(client)');

            async function setToken() {
                await AsyncStorage.setItem('token', register.response.token)
            }
            setToken()
        }
    }, [register.response])

    console.log(register.response);
    console.log(register.error);


    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={styles.topSection}>
                <Text style={styles.label}>{"Malumotingizni kiriting"}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={("ismingiz")}
                    placeholderTextColor="#8A8A8A"
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                />
                {/* {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null} */}
                <TextInput
                    style={styles.input}
                    placeholder={("familiyangiz")}
                    placeholderTextColor="#8A8A8A"
                    value={lastName}
                    onChangeText={handleLastNameChange}
                />
                {/* {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null} */}
                <TextInput
                    style={styles.input}
                    placeholder={("phoneNuber")}
                    placeholderTextColor="#8A8A8A"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                />
            </ScrollView>
            <View style={styles.bottomSection}>
                {!pending ?
                    <Buttons title={("Continue")}
                        isDisebled={isFild}
                        onPress={() => {
                            register.globalDataFunc()
                        }}
                    /> :
                    <Buttons
                        title={("Continue")}
                    />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
        paddingTop: 30,
    },
    progressBar: {
        flexDirection: 'row',
        height: 5,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 100,

    },
    progressIndicator: {
        flex: 1,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    input: {
        height: 55,
        borderColor: '#4B4B64',
        backgroundColor: '#4B4B64',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
    bottomSection: {
        justifyContent: 'flex-end',
        backgroundColor: '#21212E',
        paddingTop: 15
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    errorText: {
        color: '#FF0000',
        marginTop: 5,
    },
    skipButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    skipButtonText: {
        color: '#9C0A35',
        fontSize: 16,
    },
});

export default UserInfo;
