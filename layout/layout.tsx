import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout: React.FC<{ children: React.ReactNode, style?: any, scroll?: boolean }> = ({ children, style, scroll = false }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar style='light' />
            {scroll ? <ScrollView>{children}</ScrollView> : children}
        </SafeAreaView>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#2C3639',
    }
})