import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


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
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth / 5,
        height: screenWidth / 5,
    },
})