import { colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CreditCard: React.FC<{ main: boolean, cardNumber: string, cardExpiry: string, owner: string, delOnPress: () => void }> = ({ cardExpiry, cardNumber, main, owner, delOnPress }) => {
    // Format the card number: 0000000000000000 -> 0000 0000 0000 0000
    const formatCardNumber = (number: string) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    // Format the expiry date: 0000 -> 00/00
    const formatExpiryDate = (expiry: string) => {
        return expiry.replace(/(\d{2})(\d{2})/, '$2/$1');
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.topRow}>
                {cardNumber.startsWith('8600') || cardNumber.startsWith('5614') ? <Image source={require('@/assets/images/uzcard.jpg')} style={styles.deleteIcon} /> :
                    <Image source={require('@/assets/images/humo.jpg')} style={styles.deleteIcon} />}
                <AntDesign onPress={delOnPress} name="delete" size={25} color="white" />
            </View>
            <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
            <View style={styles.cardDetails}>
                <Text style={styles.expiryDate}>{formatExpiryDate(cardExpiry)}</Text>
                <Text style={styles.cardHolder}>{owner}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 200,
        borderRadius: 16,
        padding: 20,
        backgroundColor: colors.inDarkGreen,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        position: 'relative',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteIcon: {
        width: 50,
        height: 50,
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