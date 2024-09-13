import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
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