import React from 'react';
import {colors} from '@/constants/Colors'
import {useNavigation} from 'expo-router';
import {StyleSheet, SafeAreaView} from 'react-native';

const UserOffer: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserOffer;
