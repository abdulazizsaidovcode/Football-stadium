import React from 'react';
import {colors} from '@/constants/Colors'
import {useNavigation} from 'expo-router';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const PolicyOffer: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <Text>salom</Text>
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

export default PolicyOffer;
