import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'

const Login = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.title}>Ваш номер телефона</Text>
          <Text style={styles.des}>Мы отправили вам SMS с кодом подтверждения.</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.phoneCard}>
              <Image source={require('../../../../assets/images/uzb.png')} />
              <Text style={{ fontSize: 17, color: colors.white }}>+998</Text>
            </View>
            <View>
              <TextInput style={styles.phoneInput} placeholder='Номер телефона' />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 16
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
    backgroundColor: '#4B4B64',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '30%'
  },
  phoneInput: {
    backgroundColor: '#4B4B64',
    paddingVertical: 15,
    borderRadius: 10,
  }
})