import { ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode, style?: any, scroll: boolean }> = ({ children, style, scroll = false }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle='light-content' />
            {scroll ? <ScrollView>{children}</ScrollView> : children}
        </SafeAreaView>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3639',
        padding: 16,
    }
})