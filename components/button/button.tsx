import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { IButton } from "@/types/button/button";
import { getSize } from '@/constants/sizes';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const isTablet = screenWidth > 768;

const Buttons: React.FC<IButton> = ({ title, backgroundColor = '#41B06E', bordered = false, icon, textColor = 'white', textSize = getSize('smallText') + (isTablet ? 5 : 0), onPress, isDisebled = true, loading = false }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: !isDisebled || loading ? 'gray' : backgroundColor, borderWidth: bordered ? 1.5 : 0, borderColor: '#9C0A35' }
            ]}
            onPress={onPress}
            activeOpacity={.8}
            disabled={!isDisebled}
        >
            {icon ? icon : ''}
            <Text style={[styles.buttonText, { color: textColor }, { fontSize: textSize }]}>
                {title}
            </Text>
            {loading && <ActivityIndicator size="small" color={textColor} style={styles.loader} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: getSize('marginBottom'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    },
    buttonText: {
        fontWeight: '500',
    },
    loader: {
        marginLeft: 20,
    },
});

export default Buttons;
