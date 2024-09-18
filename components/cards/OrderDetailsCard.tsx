import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


const OrderDetailsCard: React.FC<{ icon: any, bac?: string }> = ({ icon, bac }) => {
    return (
        <View style={[styles.container, { backgroundColor: bac ? bac : '#828282' }]}>
            {icon}
        </View>
    )
}

export default OrderDetailsCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth / 5,
        height: screenWidth / 5,
    },
})