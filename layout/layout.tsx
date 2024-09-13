import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Layout: React.FC<{ children: React.ReactNode, style?: any }> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar style='light' />
            <ScrollView>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
        position: 'relative'
    }
})