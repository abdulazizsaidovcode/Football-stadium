import { StyleSheet, View } from 'react-native'
import React from 'react'

const OrderDetailsCard: React.FC<{ icon: any }> = ({ icon }) => {
    return (
        <View style={styles.container}>
            {icon}
        </View>
    )
}

export default OrderDetailsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#698474',
        padding: 20,
        borderRadius: 10
    },
})