import { colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CreditCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.topRow}>
                {/* <Image source={{ uri: 'https://path/to/chip-image.png' }} style={styles.chip} />
                <Image source={{ uri: 'https://path/to/delete-icon.png' }} style={styles.deleteIcon} /> */}
            </View>
            <Text style={styles.cardNumber}>5614 6814 0000 0000</Text>
            <View style={styles.cardDetails}>
                <Text style={styles.expiryDate}>01/27</Text>
                <Text style={styles.cardHolder}>CARD HOLDER</Text>
            </View>
            {/* <Image source={{ uri: 'https://path/to/uzcard-logo.png' }} style={styles.logo} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        height: 200,
        borderRadius: 16,
        padding: 20,
        backgroundColor: colors.lightGreen,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        position: 'relative',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chip: {
        width: 40,
        height: 30,
    },
    deleteIcon: {
        width: 25,
        height: 25,
    },
    cardNumber: {
        fontSize: 24,
        color: '#fff',
        letterSpacing: 2,
        fontWeight: 'bold',
        marginTop: 20,
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    expiryDate: {
        fontSize: 18,
        color: '#fff',
    },
    cardHolder: {
        fontSize: 18,
        color: '#fff',
        textTransform: 'uppercase',
    },
    logo: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 60,
        height: 30,
    },
});

export default CreditCard;
