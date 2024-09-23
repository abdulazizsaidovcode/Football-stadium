import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const CheckCard = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>ccc</Text>
        </SafeAreaView>
    )
}

export default CheckCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen
    }
})