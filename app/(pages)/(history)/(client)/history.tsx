import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import NavigationMenu from '@/components/navigation/NavigationMenu'

const ClientHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationMenu name='History'/>
    </SafeAreaView>
  )
}

export default ClientHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: 16
    }
})