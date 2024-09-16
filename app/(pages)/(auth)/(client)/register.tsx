import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'

const ClientRegister = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text></Text>
    </SafeAreaView>
  )
}

export default ClientRegister;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: 16
    }
})