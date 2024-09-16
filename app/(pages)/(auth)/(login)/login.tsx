import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import Buttons from '@/components/button/button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/root/root';
import { useAuthStore } from '@/helpers/stores/auth/auth-store';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { auth_send_code } from '@/helpers/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(pages)/(auth)/(login)/login"
>;


const Login = () => {
  const { phoneNumber, setPhoneNumber } = useAuthStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const sendCode = useGlobalRequest(auth_send_code, 'POST', { phoneNumber: '+998' + phoneNumber.split(' ').join('') });

  useEffect(() => {
    if (sendCode.response === 'Success') {
      navigation.navigate('(pages)/(auth)/(check-code)/check-code');
    }
  }, [sendCode.response]);

  const formatPhoneNumber = (text: string) => {
    let cleaned = ('' + text).replace(/\D/g, '');

    if (cleaned.length > 9) {
      cleaned = cleaned.slice(0, 9);
    }
    const formattedNumber = cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

    setPhoneNumber(formattedNumber);
  };



  console.log('+998' + phoneNumber.split(' ').join(''));
  console.log(sendCode.error);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.title}>Ваш номер телефона</Text>
          <Text style={styles.des}>Мы отправим вам SMS с кодом подтверждения.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={styles.phoneCard}>
              <Image source={require('../../../../assets/images/uzb.png')} />
              <Text style={{ fontSize: 17, color: colors.white }}>+998</Text>
            </View>
            <View style={{ width: '69%' }}>
              <TextInput
                style={styles.phoneInput}
                placeholder='Номер телефона'
                value={phoneNumber}
                keyboardType='numeric'
                onChangeText={formatPhoneNumber}
                maxLength={12}
              />
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', width: '100%', bottom: 0, marginBottom: 25, alignSelf: 'center' }}>
          <Buttons
            title="Войти"
            onPress={() => sendCode.globalDataFunc()}
            loading={sendCode.loading}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 16,
    position: 'relative'
  },
  title: {
    fontSize: 25,
    color: colors.white,
    textAlign: 'center'
  },
  des: {
    fontSize: 15,
    color: '#828282',
    textAlign: 'center',
    marginTop: 10
  },
  phoneCard: {
    backgroundColor: colors.inDarkGreen,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '29%'
  },
  phoneInput: {
    backgroundColor: colors.inDarkGreen,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: colors.white,
    fontSize: 17,
  }
});
