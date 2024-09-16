import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IButton } from "@/types/button/button";

const Buttons: React.FC<IButton> = ({ title, backgroundColor = '#41B06E', bordered = false, icon, textColor = 'white', textSize = 18, onPress, isDisebled = true }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: !isDisebled ? 'gray' : backgroundColor, borderWidth: bordered ? 1.5 : 0, borderColor: '#9C0A35' }
            ]}
            onPress={onPress}
            activeOpacity={.8}
            disabled={!isDisebled}
        >
            {icon ? icon : ''}
            <Text style={[styles.buttonText, { color: textColor }, { fontSize: textSize }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    },
    buttonText: {
        fontWeight: '500',
    },
});

export default Buttons;
